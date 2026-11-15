export type WorkspaceTab =
  | "ringkasan"
  | "posisi"
  | "pengajuan"
  | "anggota"
  | "pengaturan";
export type WorkspaceMember = {
  id: string;
  name: string;
  role: "Project Lead" | "Member";
  position: string;
  focus: string;
  email?: string;
  joinedAt?: string;
  joinedAsCreator?: boolean;
  newlyAccepted?: boolean;
};
export type WorkspacePosition = {
  id: string;
  name: string;
  filled: number;
  capacity: number;
  skills: string[];
};
type BaseWorkspace = {
  id: string;
  catalogId: string;
  currentUserId: string;
  name: string;
  description: string;
  status: "Recruiting" | "Active" | "Completed";
  contribution: string;
  focus: string;
  members: WorkspaceMember[];
  positions: WorkspacePosition[];
  links: { label: string; url: string }[];
};
export type SelectionStatus =
  | "Submitted"
  | "Reviewing"
  | "Accepted"
  | "Rejected"
  | "Cancelled";
export type WorkspaceApplicant = {
  id: string;
  userId?: string;
  name: string;
  position: string;
  status: SelectionStatus;
  skills: string[];
  motivation: string;
  email?: string;
  affiliation?: string;
  submittedAt?: string;
  portfolio?: string;
  portfolioLabel?: string;
  note?: string;
};
export type LeadWorkspace = BaseWorkspace & {
  role: "Project Lead";
  applicants: WorkspaceApplicant[];
};
export type MemberWorkspace = BaseWorkspace & { role: "Member" };
export type Workspace = LeadWorkspace | MemberWorkspace;
export const workspaceTabs: {
  id: WorkspaceTab;
  label: string;
  leadOnly?: boolean;
}[] = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "posisi", label: "Posisi", leadOnly: true },
  { id: "pengajuan", label: "Pengajuan", leadOnly: true },
  { id: "anggota", label: "Anggota" },
  { id: "pengaturan", label: "Pengaturan", leadOnly: true },
];
