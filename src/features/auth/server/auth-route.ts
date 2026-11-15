import "server-only";

import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { sessionCookieName, sessionCookieOptions } from "./session-cookie";

const loginResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ access_token: z.string().min(1) }),
});

const registerResponseSchema = z.object({ success: z.literal(true) });
const upstreamErrorSchema = z.object({
  message: z.string().optional(),
  errors: z
    .object({
      name: z.string().max(200).optional(),
      email: z.string().max(200).optional(),
      password: z.string().max(200).optional(),
    })
    .optional(),
});

type AuthAction = "login" | "register";

function reply(message: string, status: number) {
  return NextResponse.json(
    { success: status < 400, message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function upstreamFailure(error: unknown, action: AuthAction) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const payload = upstreamErrorSchema.safeParse(error.response?.data).data;

    if (
      action === "login" &&
      status === 404 &&
      payload?.message === "User tidak ditemukan"
    ) {
      return reply("Email atau password salah.", 401);
    }

    if (status === 429) {
      return reply("Terlalu banyak percobaan. Coba lagi sebentar.", 429);
    }

    if (status === 401 || status === 403) {
      return action === "login"
        ? reply("Email atau password salah.", 401)
        : reply("Registrasi tidak dapat diproses.", 403);
    }

    if (action === "register" && status === 409) {
      return reply("Email ini sudah terdaftar. Silakan masuk.", 409);
    }

    if (status === 400 || status === 422) {
      const errors = payload?.errors;
      const fieldMessage =
        action === "register"
          ? errors?.name || errors?.email || errors?.password
          : undefined;
      return reply(
        fieldMessage ||
          (action === "login"
            ? "Email atau password salah."
            : "Periksa kembali data registrasi."),
        status,
      );
    }

    console.error("[auth] Backend request failed", {
      action,
      status,
      code: error.code,
    });
  }

  return reply(
    "Layanan autentikasi sedang tidak tersedia. Silakan coba lagi.",
    502,
  );
}

function usesJson(request: Request) {
  return (
    request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() ===
    "application/json"
  );
}

function authBackend() {
  return axios.create({
    baseURL: process.env.API_BASE_URL?.trim() || "http://localhost:8080/api/v1",
    timeout: 8_000,
    maxRedirects: 0,
    headers: { Accept: "application/json" },
  });
}

export async function handleAuth(request: Request, action: AuthAction) {
  if (!usesJson(request)) {
    return reply("Permintaan harus memakai format JSON.", 415);
  }

  const body: unknown = await request.json().catch(() => null);
  const schema = action === "login" ? loginSchema : registerSchema;
  const input = schema.safeParse(body);

  if (!input.success) {
    return reply(input.error.issues[0]?.message ?? "Data tidak valid.", 400);
  }

  try {
    const { data } = await authBackend().post<unknown>(
      `/auth/${action}`,
      input.data,
    );

    if (action === "register") {
      return registerResponseSchema.safeParse(data).success
        ? reply("Registrasi berhasil.", 201)
        : reply("Respons registrasi dari backend tidak sesuai.", 502);
    }

    const login = loginResponseSchema.safeParse(data);
    if (!login.success) {
      return reply("Respons login dari backend tidak sesuai.", 502);
    }

    const response = reply("Login berhasil.", 200);
    response.cookies.set(
      sessionCookieName,
      login.data.data.access_token,
      sessionCookieOptions,
    );
    return response;
  } catch (error) {
    return upstreamFailure(error, action);
  }
}

export async function handleLogout(request: NextRequest) {
  if (!usesJson(request)) {
    return reply("Permintaan harus memakai format JSON.", 415);
  }

  const token = request.cookies.get(sessionCookieName)?.value;
  if (token) {
    try {
      await authBackend().post("/auth/logout", undefined, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error("[auth] Backend logout failed", {
          status: error.response?.status,
          code: error.code,
        });
      }
    }
  }

  const response = reply("Sesi browser berhasil diakhiri.", 200);
  response.cookies.set(sessionCookieName, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
  return response;
}
