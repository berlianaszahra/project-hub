
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Format email tidak valid")
    .trim()
    .min(1, "Email wajib diisi"),

  password: z
    .string()
    .min(1, "Password wajib diisi"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
