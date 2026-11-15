import { z } from "zod";

export const positionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama posisi minimal 2 karakter.")
    .max(100, "Maksimal 100 karakter."),
  category: z.enum(["Engineering", "Design", "Product", "Data & AI"]),
  capacity: z
    .number()
    .int("Kuota harus bilangan bulat.")
    .min(1, "Minimal 1 talenta.")
    .max(100, "Maksimal 100 talenta."),
  description: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter.")
    .max(3000, "Maksimal 3000 karakter."),
  skills: z
    .array(z.string().trim().min(1))
    .min(1, "Tambahkan minimal satu keahlian."),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  status: z.enum(["open", "paused", "closed"]),
  tasks: z.array(
    z.object({
      id: z.string().min(1),
      text: z.string().trim().min(1, "Tanggung jawab tidak boleh kosong."),
    }),
  ),
  priority: z.boolean(),
});
export const recruitmentPositionSchema = positionFormSchema
  .extend({ id: z.string().min(1), filled: z.number().int().min(0) })
  .refine((position) => position.capacity >= position.filled, {
    path: ["capacity"],
    message: "Kuota tidak boleh kurang dari anggota aktif pada posisi ini.",
  });
export type PositionFormData = z.infer<typeof positionFormSchema>;
export type RecruitmentPosition = z.infer<typeof recruitmentPositionSchema>;
