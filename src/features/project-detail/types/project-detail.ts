import type { Project } from "@/features/product-katalog/types/project";

export type OpenPosition = {
  id: string;
  title: string;
  filled: number;
  capacity: number;
  priority?: boolean;
  description: string;
  skills: string[];
};
export type ProjectDetail = Project & {
  purpose: string;
  period: string;
  positions: OpenPosition[];
  members: { id: string; name: string; role: string; owner?: boolean }[];
  milestones: {
    title: string;
    caption: string;
    status: "done" | "active" | "upcoming";
  }[];
};
