import axios from "axios";

import type { LoginFormData } from "../schemas/login.schema";
import type { RegisterFormData } from "../schemas/register.schema";

const authClient = axios.create({
  baseURL: "/api/auth",
  timeout: 12_000,
});

export async function login(data: LoginFormData) {
  await authClient.post("/login", data);
}

export async function registerAccount(data: RegisterFormData) {
  await authClient.post("/register", data);
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<{ message?: unknown }>(error)) return fallback;

  const message = error.response?.data?.message;
  if (typeof message === "string" && message.trim()) return message;

  if (!error.response) {
    return "Tidak dapat menghubungi layanan autentikasi. Silakan coba lagi.";
  }

  return fallback;
}
