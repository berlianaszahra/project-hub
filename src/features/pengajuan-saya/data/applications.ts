import type { Application } from "../types/application";

export const applications: Application[] = [
  {
    id: "APP-2409-082",
    name: "StudySpace",
    lead: "Raka",
    role: "UI/UX Designer",
    date: "16 Sep 2024 (3 hari lalu)",
    status: "review",
    message: "Raka telah melihat portofolio Figma kamu.",
    skills: ["Figma", "Wireframing", "User Research", "Design System"],
    portfolio: [
      {
        label: "figma.com/@nadia-studyspace-case",
        href: "https://figma.com/@nadia-studyspace-case",
      },
      { label: "behance.net/nadiaui", href: "https://behance.net/nadiaui" },
    ],
    motivation:
      "Saya memiliki ketertarikan mendalam dalam merancang ruang belajar virtual yang inklusif dan bebas distraksi. Pengalaman saya riset UX mahasiswa di BCC dapat membantu tim StudySpace memvalidasi alur kolaborasi.",
  },
  {
    id: "APP-2409-114",
    name: "DesignNest",
    lead: "Sinta",
    role: "UI/UX Specialist",
    date: "Hari ini, 09:20 WIB",
    status: "pending",
    message: "Berkas masuk dalam antrean kurasi tim.",
    skills: ["Figma", "UI Design", "Prototyping"],
    portfolio: [],
    motivation:
      "Saya ingin berkontribusi merancang pengalaman pengguna yang mudah dipahami bersama tim DesignNest.",
  },
  {
    id: "APP-2408-019",
    workspaceId: "eco-track",
    name: "EcoTrack",
    lead: "Farhan",
    role: "Frontend Engineer",
    date: "15 Agu 2024",
    status: "accepted",
    message: "Resmi bergabung ke dalam tim! Lihat ruang kerja.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    portfolio: [],
    motivation:
      "Saya ingin menggunakan kemampuan frontend untuk membantu membangun solusi yang berdampak bagi lingkungan.",
  },
];

export const statusLabels = {
  review: "Sedang Ditinjau",
  pending: "Menunggu Review",
  accepted: "Diterima",
  withdrawn: "Dibatalkan",
};
