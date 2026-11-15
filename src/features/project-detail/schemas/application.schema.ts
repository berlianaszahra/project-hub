import { z } from "zod";

export const applicationSchema = z.object({
  skills: z
    .array(z.string().trim().min(1))
    .min(1, "Tambahkan minimal satu keahlian."),
  portfolio: z
    .url("Masukkan URL portofolio yang valid.")
    .refine(
      (url) => /^https?:\/\//i.test(url),
      "Gunakan tautan HTTP atau HTTPS.",
    ),
  motivation: z
    .string()
    .trim()
    .min(20, "Ceritakan alasan bergabung minimal 20 karakter.")
    .max(2000, "Maksimal 2000 karakter."),
  commitment: z
    .boolean()
    .refine((value) => value, "Konfirmasi kesediaan mengikuti jadwal tim."),
});
export type PositionApplication = z.infer<typeof applicationSchema>;
