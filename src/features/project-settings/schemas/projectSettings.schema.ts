import { z } from "zod";

export const externalLinkSchema = z.object({
  platform: z.string().min(1, "Pilih platform."),
  url: z
    .string()
    .trim()
    .url("URL tidak valid.")
    .refine((value) => value.startsWith("https://"), "Gunakan tautan HTTPS."),
});

export const projectSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nama proyek minimal 3 karakter.")
    .max(100, "Nama proyek maksimal 100 karakter."),

  category: z.string().min(1, "Pilih kategori proyek."),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter.")
    .max(140, "Deskripsi maksimal 140 karakter."),

  description: z
    .string()
    .trim()
    .min(20, "Deskripsi proyek minimal 20 karakter."),

  technologies: z
    .array(z.string().min(1))
    .min(1, "Tambahkan minimal satu teknologi."),

  links: z.array(externalLinkSchema),

  status: z.enum(["Recruiting", "Active", "Completed"]),
  isRecruiting: z.boolean(),

  visibility: z.enum(["public", "private"]),

  maxMembers: z.coerce
    .number<number>()
    .int("Kuota harus bilangan bulat.")
    .min(1, "Minimal 1 anggota.")
    .max(100, "Maksimal 100 anggota."),

  selectionAnnouncement: z.string().trim().max(2000, "Maksimal 2000 karakter."),
});

export type ProjectSettingsFormData = z.infer<typeof projectSettingsSchema>;
