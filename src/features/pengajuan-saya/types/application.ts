export type ApplicationStatus = "review" | "pending" | "accepted" | "withdrawn";

export type Application = {
  id: string;
  workspaceId?: string;
  name: string;
  lead: string;
  role: string;
  date: string;
  status: ApplicationStatus;
  message: string;
  skills: string[];
  portfolio: { label: string; href: string }[];
  motivation: string;
};
