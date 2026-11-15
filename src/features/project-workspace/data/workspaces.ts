import type { Workspace } from "../types/workspace";

// Demo membership for Nadia. Replace this lookup with authenticated server data.
export const workspaces: Workspace[] = [
  {
    id: "campus-connect",
    catalogId: "1",
    currentUserId: "nadia",
    name: "CampusConnect",
    role: "Project Lead",
    status: "Recruiting",
    description:
      "Platform komunitas untuk kolaborasi dan sharing referensi akademik mahasiswa lintas jurusan BCC.",
    contribution: "Project Lead",
    focus:
      "Mengatur kebutuhan tim dan menyeleksi anggota sesuai posisi kontribusi.",
    members: [
      {
        id: "nadia",
        name: "Nadia",
        email: "nadia@bcc.id",
        joinedAt: "2026-08-01",
        role: "Project Lead",
        position: "Lead & Product Strategy",
        joinedAsCreator: true,
        focus: "Mengatur arah produk dan kebutuhan tim.",
      },
      {
        id: "farhan",
        name: "Farhan",
        email: "farhan@bcc.id",
        joinedAt: "2026-08-15",
        role: "Member",
        position: "Frontend Developer",
        focus: "Mengembangkan antarmuka dan integrasi API.",
      },
      {
        id: "rizky",
        name: "Rizky Maulana",
        email: "rizky@bcc.id",
        joinedAt: "2026-09-18",
        newlyAccepted: true,
        role: "Member",
        position: "Backend Developer",
        focus: "Merancang database dan layanan API.",
      },
    ],
    positions: [
      {
        id: "frontend",
        name: "Frontend Developer",
        filled: 1,
        capacity: 2,
        skills: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        id: "design",
        name: "UI/UX Designer",
        filled: 0,
        capacity: 1,
        skills: ["Figma", "User Research"],
      },
      {
        id: "backend",
        name: "Backend Developer",
        filled: 1,
        capacity: 1,
        skills: ["Node.js", "PostgreSQL"],
      },
    ],
    links: [],
    applicants: [
      {
        id: "bagas",
        email: "bagas@bcc.id",
        submittedAt: "2026-11-15",
        affiliation: "Mahasiswa BCC",
        portfolio: "https://github.com/bagas/campus-feed",
        name: "Bagas Pratama",
        position: "UI/UX Designer",
        status: "Submitted",
        skills: ["Figma", "Wireframing"],
        motivation:
          "Saya ingin membantu merancang pengalaman pengguna yang inklusif bagi mahasiswa BCC.",
      },
      {
        id: "citra",
        email: "citra@bcc.id",
        submittedAt: "2026-11-14",
        affiliation: "Mahasiswa BCC",
        portfolio: "https://github.com/citra/portfolio",
        name: "Citra Lestari",
        position: "Frontend Developer",
        status: "Reviewing",
        skills: ["React", "Tailwind CSS"],
        motivation:
          "Saya ingin berkontribusi dalam pengembangan antarmuka dan integrasi API untuk komunitas.",
      },
      {
        id: "andi",
        email: "andi@bcc.id",
        submittedAt: "2026-11-13",
        affiliation: "Mahasiswa BCC",
        portfolio: "",
        name: "Andi Saputra",
        position: "Frontend Developer",
        status: "Submitted",
        skills: ["React", "TypeScript"],
        motivation:
          "Saya ingin mengembangkan kemampuan frontend melalui kolaborasi dalam tim BCC.",
      },
      {
        id: "salsa",
        email: "salsa@bcc.id",
        submittedAt: "2026-11-12",
        affiliation: "Mahasiswa BCC",
        portfolio: "https://www.behance.net/",
        name: "Salsa Putri",
        position: "UI/UX Designer",
        status: "Submitted",
        skills: ["Figma", "User Research"],
        motivation:
          "Saya tertarik melakukan riset pengguna untuk membantu tim memvalidasi desain.",
      },
    ],
  },
  {
    id: "eco-track",
    catalogId: "4",
    currentUserId: "nadia",
    name: "EcoTrack",
    role: "Member",
    status: "Active",
    description:
      "Solusi Manajemen Jejak Karbon Komunitas. Aplikasi pelacakan emisi harian dan penukaran poin aksi hijau mahasiswa di lingkungan kampus FILKOM.",
    contribution: "UI/UX Specialist",
    focus:
      "Merancang wireframe alur kalkulator jejak karbon dan profil pengguna di Figma, serta menyelaraskan desain bersama tim Frontend.",
    members: [
      {
        id: "dimas",
        name: "Dimas Aditya",
        role: "Project Lead",
        position: "Project Lead",
        focus: "Arsitektur sistem, koordinasi sprint dan alokasi tugas umum.",
      },
      {
        id: "nadia",
        name: "Nadia",
        role: "Member",
        position: "UI/UX Specialist",
        focus:
          "Perancangan UI Design System, prototipe kalkulator dan riset pengguna.",
      },
      {
        id: "kevin",
        name: "Kevin Sanjaya",
        role: "Member",
        position: "Frontend Developer",
        focus: "Implementasi komponen dan integrasi REST API.",
      },
      {
        id: "alifah",
        name: "Alifah",
        role: "Member",
        position: "Data Analyst",
        focus: "Formula komputasi emisi karbon dan metrik visualisasi agregat.",
      },
    ],
    positions: [
      {
        id: "design",
        name: "UI/UX Specialist",
        filled: 1,
        capacity: 1,
        skills: ["Figma", "User Research"],
      },
      {
        id: "frontend",
        name: "Frontend Developer",
        filled: 1,
        capacity: 2,
        skills: ["React", "TypeScript"],
      },
    ],
    links: [
      { label: "Figma EcoTrack Workspace", url: "https://www.figma.com/" },
      { label: "Google Drive Aset Riset", url: "https://drive.google.com/" },
    ],
  },
];
export function getWorkspace(id: string) {
  return workspaces.find((workspace) => workspace.id === id);
}
