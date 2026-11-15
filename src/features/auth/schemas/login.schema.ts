import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email wajib diisi")
  .pipe(z.email("Format email tidak valid"));

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
