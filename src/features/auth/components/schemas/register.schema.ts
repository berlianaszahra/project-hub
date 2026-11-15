
import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),

  email: z
    .email("Format email tidak valid")
    .trim()
    .min(1, "Email wajib diisi"),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
