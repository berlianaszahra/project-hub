export type ProjectStatus =
  | "Aktif"
  | "Dalam Pengembangan"
  | "Selesai"
  | "Diarsipkan";

export interface Project {
  id: string;
  name: string;
  initial: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  owner: string;
  memberCount: number;
  updatedAt: string;
}
