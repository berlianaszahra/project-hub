import { statusLabels } from "../data/applications";
import type { ApplicationStatus as Status } from "../types/application";

export default function ApplicationStatus({ status }: { status: Status }) {
  const colors =
    status === "review"
      ? "bg-[#FCDEA0] text-[#86641F]"
      : status === "accepted"
        ? "bg-[#E3EFEB] text-[#087663]"
        : "bg-[#E5E3E3] text-[#555965]";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] ${colors}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
