
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "1",
    name: "CampusConnect",
    initial: "C",
    description:
      "Platform komunitas untuk kolaborasi dan sharing referensi akademik antar mahasiswa.",
    status: "Aktif",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    owner: "Nadia",
    memberCount: 8,
    updatedAt: "2026-11-12",
  },
  {
    id: "2",
    name: "StudySpace",
    initial: "S",
    description:
      "Ruang belajar digital kolaboratif berbasis virtual room dan live timer.",
    status: "Aktif",
    technologies: ["Next.js", "Firebase", "TypeScript"],
    owner: "Rizky",
    memberCount: 6,
    updatedAt: "2026-11-10",
  },
  {
    id: "3",
    name: "DesignNest",
    initial: "D",
    description:
      "Platform untuk berbagi inspirasi desain dan mengelola portofolio kreatif.",
    status: "Dalam Pengembangan",
    technologies: ["Figma", "React", "Supabase"],
    owner: "Alya",
    memberCount: 5,
    updatedAt: "2026-11-08",
  },
  {
    id: "4",
    name: "EcoTrack",
    initial: "E",
    description:
      "Aplikasi untuk memantau kebiasaan ramah lingkungan dan jejak karbon harian.",
    status: "Selesai",
    technologies: ["Flutter", "Firebase", "Dart"],
    owner: "Farhan",
    memberCount: 4,
    updatedAt: "2026-11-05",
  },
  {
    id: "5",
    name: "DevLibrary",
    initial: "D",
    description:
      "Perpustakaan digital untuk berbagi dokumentasi, tutorial, dan resource developer.",
    status: "Diarsipkan",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    owner: "Dimas",
    memberCount: 3,
    updatedAt: "2026-11-01",
  },
];
