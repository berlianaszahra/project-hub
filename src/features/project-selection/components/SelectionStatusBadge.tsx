import type { SelectionStatus } from "@/features/project-workspace/types/workspace";
export const selectionLabels: Record<SelectionStatus, string> = {
  Submitted: "Menunggu Review",
  Reviewing: "Sedang Ditinjau",
  Accepted: "Diterima",
  Rejected: "Ditolak",
  Cancelled: "Dibatalkan",
};
export default function SelectionStatusBadge({
  status,
}: {
  status: SelectionStatus;
}) {
  const colors =
    status === "Accepted"
      ? "bg-[#A3F2D7] text-[#08634F]"
      : status === "Reviewing"
        ? "bg-[#D4E3FF] text-[#005DA9]"
        : status === "Rejected"
          ? "bg-red-50 text-red-600"
          : status === "Cancelled"
            ? "bg-[#EAE7E7] text-[#717784]"
            : "bg-[#FBE9C5] text-[#86641F]";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] ${colors}`}
    >
      <span className="size-1 rounded-full bg-current" />
      {selectionLabels[status]}
    </span>
  );
}
