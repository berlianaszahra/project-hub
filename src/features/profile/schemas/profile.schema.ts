import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Nama lengkap minimal 3 karakter.")
    .max(100, "Nama lengkap maksimal 100 karakter.")
    .regex(/.*\S.*/, "Nama lengkap tidak boleh kosong."),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
