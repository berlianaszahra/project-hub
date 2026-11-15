import "server-only";

import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

const loginResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ access_token: z.string().min(1) }),
});

const registerResponseSchema = z.object({ success: z.literal(true) });
const validationErrorsSchema = z.object({
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
      const parsed = validationErrorsSchema.safeParse(error.response?.data);
      const errors = parsed.data?.errors;
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
  }

  return reply(
    "Layanan autentikasi sedang tidak tersedia. Silakan coba lagi.",
    502,
  );
}

export async function handleAuth(request: Request, action: AuthAction) {
  const mediaType = request.headers
    .get("content-type")
    ?.split(";")[0]
    ?.trim()
    .toLowerCase();

  if (mediaType !== "application/json") {
    return reply("Permintaan harus memakai format JSON.", 415);
  }

  const body: unknown = await request.json().catch(() => null);
  const schema = action === "login" ? loginSchema : registerSchema;
  const input = schema.safeParse(body);

  if (!input.success) {
    return reply(input.error.issues[0]?.message ?? "Data tidak valid.", 400);
  }

  const baseURL =
    process.env.API_BASE_URL?.trim() || "http://localhost:8080/api/v1";

  try {
    const { data } = await axios.post<unknown>(`/auth/${action}`, input.data, {
      baseURL,
      timeout: 8_000,
      maxRedirects: 0,
      headers: { Accept: "application/json" },
    });

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
      "projecthub_access_token",
      login.data.data.access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    );
    return response;
  } catch (error) {
    return upstreamFailure(error, action);
  }
}
