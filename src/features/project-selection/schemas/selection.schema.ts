import { z } from "zod";
import { recruitmentPositionSchema } from "@/features/project-positions/schemas/position.schema";

export const selectionDecisionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("review"), applicantId: z.string().min(1) }),
  z.object({
    action: z.literal("accept"),
    applicantId: z.string().min(1),
    note: z.string().trim().max(2000).optional(),
  }),
  z.object({
    action: z.literal("reject"),
    applicantId: z.string().min(1),
    note: z
      .string()
      .trim()
      .min(10, "Catatan penolakan minimal 10 karakter.")
      .max(2000, "Maksimal 2000 karakter."),
  }),
]);
export type SelectionDecision = z.infer<typeof selectionDecisionSchema>;
export const selectionSnapshotSchema = z.object({
  positions: z.array(recruitmentPositionSchema),
  members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.enum(["Project Lead", "Member"]),
      position: z.string(),
      focus: z.string(),
      email: z.string().optional(),
      joinedAt: z.string().optional(),
      joinedAsCreator: z.boolean().optional(),
      newlyAccepted: z.boolean().optional(),
    }),
  ),
  applicants: z.array(
    z.object({
      id: z.string(),
      userId: z.string().optional(),
      name: z.string(),
      position: z.string(),
      status: z.enum([
        "Submitted",
        "Reviewing",
        "Accepted",
        "Rejected",
        "Cancelled",
      ]),
      skills: z.array(z.string()),
      motivation: z.string(),
      email: z.string().optional(),
      affiliation: z.string().optional(),
      submittedAt: z.string().optional(),
      portfolio: z.string().optional(),
      portfolioLabel: z.string().optional(),
      note: z.string().optional(),
    }),
  ),
});
