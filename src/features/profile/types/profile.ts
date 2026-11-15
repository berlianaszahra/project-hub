import type { ProfileFormData } from "../schemas/profile.schema";

export type MemberStatus = "active" | "inactive";

export type ApplicationStatus = "pending" | "accepted" | "rejected" | "none";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  memberStatus: MemberStatus;
  joinedAt: string;
  joinedProjectCount: number;
  applicationStatus: ApplicationStatus;
}

export type UpdateProfilePayload = ProfileFormData;

export type UpdateProfileHandler = (
  data: UpdateProfilePayload,
) => Promise<void> | void;
