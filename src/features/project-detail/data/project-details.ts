import { projects } from "@/features/product-katalog/data/project";
import type { ProjectDetail } from "../types/project-detail";

export function getProjectDetail(id: string): ProjectDetail | undefined {
  const project = projects.find((project) => project.id === id);
  if (!project) return undefined;
  const campus = id === "1";
  const recruiting =
    project.status === "Aktif" || project.status === "Dalam Pengembangan";
  return {
    ...project,
    technologies: campus
      ? [
          "React",
          "TypeScript",
          "Node.js",
          "Tailwind CSS",
          "PostgreSQL",
          "Figma",
          "GitHub",
        ]
      : project.technologies,
    purpose: campus
      ? "Membangun ekosistem belajar bersama yang menghubungkan mahasiswa BCC dari berbagai fakultas untuk saling berbagi catatan kuliah, kurasi materi praktikum, dan diskusi kelompok secara terpusat. Solusi ini ditargetkan menghilangkan friksi pertukaran materi akademik yang selama ini tersebar secara sporadis di berbagai kanal pesan instan."
      : project.description,
    period: "Ganjil 2026 / 2027",
    positions: !recruiting
      ? []
      : [
          {
            id: "frontend",
            title: "Frontend Developer",
            filled: 1,
            capacity: 2,
            priority: true,
            description:
              "Mengembangkan komponen antarmuka web, integrasi API sistem autentikasi, serta memastikan performa akses cepat pada katalog referensi.",
            skills: ["React", "TypeScript", "Tailwind CSS"],
          },
          {
            id: "backend",
            title: "Backend Developer",
            filled: 1,
            capacity: 2,
            description:
              "Merancang arsitektur database relasional, caching layer, dan endpoint RESTful yang terproteksi untuk sinkronisasi dokumen mahasiswa.",
            skills: ["Node.js", "Express", "PostgreSQL", "Prisma"],
          },
          {
            id: "designer",
            title: "UI/UX Designer",
            filled: 0,
            capacity: 1,
            description:
              "Membuat wireframe, interactive prototype, dan sistem desain dengan token bersama tim engineering untuk pengalaman riset yang konsisten.",
            skills: ["Figma", "Wireframing", "User Research"],
          },
        ],
    members: campus
      ? [
          {
            id: "lead",
            name: project.owner,
            role: "Project Lead • PM",
            owner: true,
          },
          { id: "frontend", name: "Farhan", role: "Frontend Developer" },
          { id: "backend", name: "Rizky", role: "Backend Developer" },
        ]
      : [
          {
            id: "lead",
            name: project.owner,
            role: "Project Lead",
            owner: true,
          },
        ],
    milestones: [
      {
        title: "Brainstorming & PRD",
        caption: "Selesai • 12 Nov 2026",
        status: "done",
      },
      {
        title: "Perekrutan & Onboarding",
        caption: recruiting ? "Sedang Berlangsung • Batas: 28 Nov" : "Selesai",
        status: recruiting ? "active" : "done",
      },
      {
        title: "Sprint 1 MVP Development",
        caption: "Target pengerjaan 2 minggu",
        status: "upcoming",
      },
      {
        title: "Internal Demo & Review",
        caption: "Evaluasi bersama mentor BCC",
        status: "upcoming",
      },
    ],
  };
}
