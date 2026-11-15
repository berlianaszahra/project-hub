import type {
  JoinedProject,
  ManagedProject,
  ProjectApplication,
} from "../types/projects";

export const managedProject: ManagedProject[] = [
  {
    id: "campus-connect",
    name: "CampusConnect",
    initial: "C",
    role: "Lead",
    description:
      "Platform komunitas untuk kolaborasi dan berbagi referensi akademik antar mahasiswa. Menghubungkan ide, sumber belajar, dan anggota komunitas dalam satu ruang.",
    technologies: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    status: "Recruiting",
    updatedAt: "2026-11-12",
    memberCount: 3,
    memberCapacity: 5,
    pendingApplicants: 4,
    metrics: [
      {
        label: "Anggota Tim",
        value: "3 / 5",
        description: "Anggota aktif",
      },
      {
        label: "Posisi Terbuka",
        value: "2",
        description: "Slot tersedia",
      },
      {
        label: "Perlu Review",
        value: "4",
        description: "Pengajuan menunggu",
      },
    ],
  },
];

export const joinedProject: JoinedProject[] = [
  {
    id: "eco-track",
    name: "EcoTrack",
    initial: "E",
    role: "Member",
    description:
      "Aplikasi pemantauan kebiasaan ramah lingkungan dan jejak karbon harian untuk mendukung gaya hidup berkelanjutan.",
    technologies: ["Flutter", "Firebase", "Dart"],
    status: "Aktif",
    updatedAt: "2026-11-10",
    leadName: "Dimas Aditya",
    memberCount: 4,
    progress: 65,
    taskCompleted: 13,
    taskTotal: 20,
    teamInitials: ["D", "N", "K", "A"],
  },
];

export const projectApplication: ProjectApplication[] = [
  {
    id: "application-001",
    projectName: "StudySpace",
    appliedRole: "Frontend Developer",
    appliedAt: "2026-11-11",
    status: "Menunggu Review",
  },
];
