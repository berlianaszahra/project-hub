
import type { ProjectSettingsFormData } from "../schemas/projectSettings.schema";

export type ProjectStatus =
  | "active"
  | "archived"
  | "completed";

export interface ProjectMember {
  id: string;
  name: string;
  role: "lead" | "member";
  status: "active" | "inactive";
}

export interface ProjectSettingsData {
  id: string;
  name: string;
  status: ProjectStatus;
  leadId: string;
  leadName: string;
  memberCount: number;
  members: ProjectMember[];
  iconUrl?: string;
  bannerUrl?: string;
  settings: ProjectSettingsFormData;
}

export type SaveProjectSettingsHandler = (
  projectId: string,
  data: ProjectSettingsFormData,
) => Promise<void>;

export type TransferOwnershipHandler = (
  projectId: string,
  targetMemberId: string,
) => Promise<void>;

export type ProjectActionHandler = (
  projectId: string,
) => Promise<void>;
