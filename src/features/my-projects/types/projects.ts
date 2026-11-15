export type MyProjectRole = "Lead" | "Member";

export type MyProjectStatus = "Recruiting" | "Aktif" | "Selesai" | "Ditunda";

export type ApplicationStatus = "Menunggu Review" | "Diterima" | "Ditolak";

export interface BaseMyProject {
  id: string;
  name: string;
  initial: string;
  description: string;
  technologies: string[];
  status: MyProjectStatus;
  updatedAt: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface ManagedProject extends BaseMyProject {
  role: "Lead";
  memberCount: number;
  memberCapacity: number;
  pendingApplicants: number;
  metrics: ProjectMetric[];
}

export interface JoinedProject extends BaseMyProject {
  role: "Member";
  leadName: string;
  memberCount: number;
  progress: number;
  taskCompleted: number;
  taskTotal: number;
  teamInitials: string[];
}

export interface ProjectApplication {
  id: string;
  projectName: string;
  appliedRole: string;
  appliedAt: string;
  status: ApplicationStatus;
}
