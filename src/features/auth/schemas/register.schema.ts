import { z } from "zod";

import { emailSchema } from "./login.schema";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Nama lengkap wajib diisi"),
  email: emailSchema,
  password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
