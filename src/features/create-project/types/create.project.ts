import type { CreateProjectFormData } from "../schemas/project.schema";

export type CreateProjectPayload = CreateProjectFormData;

export type RecruitmentPosition = CreateProjectFormData["positions"][number];

export type ProjectResourceLink = CreateProjectFormData["links"][number];

export type CreateProjectHandler = (
  data: CreateProjectPayload,
) => Promise<void> | void;
