
import { z } from "zod";

export const recruitmentPositionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Nama posisi minimal 2 karakter."),

  quota: z
    .number()
    .int("Kuota harus bilangan bulat.")
    .min(1, "Minimal 1 anggota."),

  description: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter."),

  skills: z
    .string()
    .trim()
    .min(2, "Keahlian wajib diisi."),
});

export const projectLinkSchema = z.object({
  platform: z
    .string()
    .min(1, "Platform wajib dipilih."),

  url: z
    .string()
    .trim()
    .url("Masukkan URL yang valid.")
    .refine(
      (value) => value.startsWith("https://"),
      "Gunakan tautan HTTPS.",
    ),

  visibility: z.enum(["public", "team"]),
});

export const createProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Nama project minimal 3 karakter.")
      .max(100, "Nama project maksimal 100 karakter."),

    category: z
      .string()
      .min(1, "Kategori project wajib dipilih."),

    shortDescription: z
      .string()
      .trim()
      .min(10, "Deskripsi singkat minimal 10 karakter.")
      .max(140, "Deskripsi maksimal 140 karakter."),

    background: z
      .string()
      .trim()
      .min(20, "Tujuan project minimal 20 karakter.")
      .max(3000, "Maksimal 3000 karakter."),

    technologies: z
      .array(z.string().trim().min(1))
      .min(1, "Tambahkan minimal satu teknologi."),

    positions: z
      .array(recruitmentPositionSchema)
      .min(1, "Tambahkan minimal satu posisi."),

    isRecruiting: z.boolean(),

    recruitmentDeadline: z.string(),

    commitment: z
      .string()
      .trim()
      .max(2000, "Maksimal 2000 karakter."),

    links: z.array(projectLinkSchema),

    additionalNotes: z
      .string()
      .trim()
      .max(2000, "Maksimal 2000 karakter."),
  })
  .superRefine((data, context) => {
    if (data.isRecruiting) {
      if (!data.recruitmentDeadline) {
        context.addIssue({
          code: "custom",
          path: ["recruitmentDeadline"],
          message: "Batas waktu rekrutmen wajib diisi.",
        });
      } else {
        const selectedDate = new Date(
          `${data.recruitmentDeadline}T23:59:59`,
        );

        if (
          Number.isNaN(selectedDate.getTime()) ||
          selectedDate.getTime() < Date.now()
        ) {
          context.addIssue({
            code: "custom",
            path: ["recruitmentDeadline"],
            message: "Pilih tanggal hari ini atau setelahnya.",
          });
        }
      }
    }
  });

export type CreateProjectFormData = z.infer<
  typeof createProjectSchema
>;
