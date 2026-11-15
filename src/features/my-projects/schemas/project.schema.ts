import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nama project minimal 3 karakter.")
    .max(100, "Nama project maksimal 100 karakter."),

  description: z
    .string()
    .trim()
    .min(20, "Deskripsi minimal 20 karakter.")
    .max(1000, "Deskripsi maksimal 1000 karakter."),

  category: z.string().min(1, "Pilih kategori project."),

  technologies: z.array(z.string()).min(1, "Pilih minimal satu teknologi."),

  maxMembers: z.coerce
    .number<number>()
    .int("Jumlah anggota harus bilangan bulat.")
    .min(2, "Minimal 2 anggota.")
    .max(50, "Maksimal 50 anggota."),

  isRecruiting: z.boolean(),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
