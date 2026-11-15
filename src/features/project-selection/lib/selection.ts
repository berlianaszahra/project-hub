import { positionDefaults } from "@/features/project-positions/lib/positions";
import type {
  LeadWorkspace,
  Workspace,
} from "@/features/project-workspace/types/workspace";
import {
  type SelectionDecision,
  selectionDecisionSchema,
} from "../schemas/selection.schema";

export function isPending(status: string) {
  return status === "Submitted" || status === "Reviewing";
}
export function applySelectionDecision(
  workspace: Workspace,
  input: SelectionDecision,
  joinedAt: string,
): LeadWorkspace {
  if (workspace.role !== "Project Lead")
    throw new Error("Hanya Project Lead yang dapat menyeleksi pengajuan.");
  const decision = selectionDecisionSchema.parse(input);
  const applicant = workspace.applicants.find(
    (item) => item.id === decision.applicantId,
  );
  if (!applicant || !isPending(applicant.status))
    throw new Error(
      "Pengajuan ini sudah selesai diproses atau tidak ditemukan.",
    );
  if (decision.action === "review") {
    if (applicant.status !== "Submitted")
      throw new Error("Pengajuan ini sudah ditandai sedang ditinjau.");
    return {
      ...workspace,
      applicants: workspace.applicants.map((item) =>
        item.id === applicant.id ? { ...item, status: "Reviewing" } : item,
      ),
    };
  }
  if (applicant.status !== "Reviewing")
    throw new Error(
      "Tandai pengajuan Sedang Ditinjau sebelum memberikan keputusan.",
    );
  if (decision.action === "reject")
    return {
      ...workspace,
      applicants: workspace.applicants.map((item) =>
        item.id === applicant.id
          ? { ...item, status: "Rejected", note: decision.note }
          : item,
      ),
    };
  if (workspace.status === "Completed")
    throw new Error("Proyek yang selesai tidak dapat menerima anggota baru.");
  const memberId = applicant.userId ?? applicant.id;
  if (workspace.members.some((member) => member.id === memberId))
    throw new Error("Pelamar sudah menjadi anggota aktif proyek ini.");
  const position = workspace.positions.find(
    (item) => item.name === applicant.position,
  );
  if (!position) throw new Error("Posisi yang dilamar tidak lagi tersedia.");
  if (position.filled >= position.capacity)
    throw new Error(
      "Kuota posisi sudah penuh. Tambahkan kuota atau tinjau pelamar lain.",
    );
  return {
    ...workspace,
    applicants: workspace.applicants.map((item) =>
      item.id === applicant.id
        ? { ...item, status: "Accepted", note: decision.note }
        : item,
    ),
    members: [
      ...workspace.members,
      {
        id: memberId,
        name: applicant.name,
        role: "Member",
        position: applicant.position,
        focus: positionDefaults(position).description,
        email: applicant.email,
        joinedAt,
        newlyAccepted: true,
      },
    ],
    positions: workspace.positions.map((item) =>
      item.id === position.id ? { ...item, filled: item.filled + 1 } : item,
    ),
  };
}
