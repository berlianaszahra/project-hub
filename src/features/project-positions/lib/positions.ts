import type {
  LeadWorkspace,
  WorkspacePosition,
} from "@/features/project-workspace/types/workspace";
import type { RecruitmentPosition } from "../schemas/position.schema";

export function positionDefaults(
  position: WorkspacePosition,
): RecruitmentPosition {
  const design = /design|ui\/ux/i.test(position.name);
  return {
    category: design ? "Design" : "Engineering",
    description: design
      ? "Merancang user flow, wireframing, prototipe interaktif, dan standardisasi design system bersama tim proyek."
      : "Mengembangkan dan memelihara sistem proyek sesuai kebutuhan tim, serta berkolaborasi dalam integrasi fitur dan pengujian.",
    experience: "intermediate",
    status: "open",
    tasks: [],
    priority: design,
    ...position,
  };
}
export function positionApplicantCount(workspace: LeadWorkspace, name: string) {
  return workspace.applicants.filter(
    (applicant) =>
      applicant.position === name &&
      (applicant.status === "Submitted" || applicant.status === "Reviewing"),
  ).length;
}
export function positionDeletionError(
  position: RecruitmentPosition,
  pending: number,
) {
  if (position.filled > 0)
    return "Posisi masih ditempati anggota aktif. Pindahkan anggota terlebih dahulu.";
  if (pending > 0)
    return "Selesaikan pengajuan yang masih diproses sebelum menghapus posisi.";
  return null;
}
