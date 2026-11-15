
import type { ProjectSettingsData } from "../types/projectSettings";

export const sampleProjectSettings: ProjectSettingsData = {
  id: "campusconnect",
  name: "CampusConnect",
  status: "active",

  leadId: "user-001",
  leadName: "Nadia Safira",
  memberCount: 8,

  members: [
    {
      id: "user-001",
      name: "Nadia Safira",
      role: "lead",
      status: "active",
    },
    {
      id: "user-002",
      name: "Raka Pratama",
      role: "member",
      status: "active",
    },
    {
      id: "user-003",
      name: "Alya Putri",
      role: "member",
      status: "active",
    },
    {
      id: "user-004",
      name: "Dimas Saputra",
      role: "member",
      status: "inactive",
    },
  ],

  settings: {
    name: "CampusConnect",

    category: "web-community",

    shortDescription:
      "Platform komunitas untuk menghubungkan mahasiswa, kolaborasi proyek, dan berbagai kegiatan kampus.",

    description:
      "CampusConnect merupakan platform digital yang membantu mahasiswa menemukan komunitas, bekerja sama dalam proyek, serta membangun pengalaman kolaborasi antaranggota kampus.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
    ],

    links: [
      {
        platform: "github",
        url: "https://github.com",
      },
      {
        platform: "figma",
        url: "https://www.figma.com",
      },
    ],

    isRecruiting: true,
    visibility: "public",
    maxMembers: 12,

    selectionAnnouncement:
      "Selamat bergabung di CampusConnect! Silakan lakukan sinkronisasi akun Discord BCC pada channel #campus-connect-dev dan periksa berkas Onboarding Checklist di Google Drive tim.",
  },
};

export const projectCategoryOptions = [
  {
    value: "web-community",
    label: "Web Development & Community Platform",
  },
  {
    value: "mobile-development",
    label: "Mobile Development",
  },
  {
    value: "ui-ux",
    label: "UI/UX Design",
  },
  {
    value: "ai-ml",
    label: "Artificial Intelligence & Machine Learning",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
  {
    value: "other",
    label: "Lainnya",
  },
];

export const linkPlatformOptions = [
  { value: "github", label: "GitHub" },
  { value: "figma", label: "Figma" },
  { value: "drive", label: "Google Drive" },
  { value: "notion", label: "Notion" },
  { value: "other", label: "Lainnya" },
];
