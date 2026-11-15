import { z } from "zod";

export const projectLinkSchema = z.object({
  type: z.enum(["GitHub", "Figma", "Google Drive", "Notion", "Lainnya"]),
  label: z.string().trim().min(1, "Nama tautan wajib diisi."),
  url: z
    .url("Masukkan URL yang valid.")
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "Gunakan URL HTTP atau HTTPS.",
    ),
  visibility: z.enum(["members", "lead"]),
});

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
    .max(140, "Deskripsi maksimal 140 karakter."),
  purpose: z.string().trim().max(3000, "Tujuan maksimal 3000 karakter."),
  category: z.string().min(1, "Pilih kategori project."),
  technologies: z
    .array(z.string().trim().min(1))
    .min(1, "Pilih minimal satu teknologi."),
  positions: z
    .array(
      z.object({
        title: z.string().trim().min(1, "Nama posisi wajib diisi."),
        division: z.string().trim().min(1, "Divisi wajib diisi."),
        count: z
          .number()
          .int()
          .min(1, "Minimal 1 orang.")
          .max(50, "Maksimal 50 orang."),
        description: z.string().trim().min(1, "Deskripsi posisi wajib diisi."),
        skills: z.string().trim().min(1, "Keahlian wajib diisi."),
      }),
    )
    .min(1, "Tambahkan minimal satu posisi."),
  links: z.array(projectLinkSchema),
  isRecruiting: z.boolean(),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type ProjectLink = z.infer<typeof projectLinkSchema>;

// Drafts allow incomplete fields while preserving the form's data structure.
export const projectDraftSchema = createProjectSchema.extend({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  technologies: z.array(z.string()),
  positions: z.array(
    z.object({
      title: z.string(),
      division: z.string(),
      count: z.number(),
      description: z.string(),
      skills: z.string(),
    }),
  ),
});
