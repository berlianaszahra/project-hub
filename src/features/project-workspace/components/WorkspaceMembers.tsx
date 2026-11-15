import { Users } from "lucide-react";
import type { WorkspaceMember } from "../types/workspace";
export default function WorkspaceMembers({
  members,
  compact = false,
}: {
  members: WorkspaceMember[];
  compact?: boolean;
}) {
  return (
    <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
      <h2 className="mb-4 flex items-center gap-1.5 text-sm font-semibold">
        <Users size={15} />
        {compact ? "Anggota Terdaftar" : "Rekan Tim Aktif"} ({members.length})
      </h2>
      <div
        className={
          compact ? "space-y-2" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        }
      >
        {members.map((member) => (
          <div
            key={member.id}
            className={`rounded-lg p-3 ${member.id === "nadia" ? "bg-[#F0F7FF]" : "bg-[#F6F3F2]"}`}
          >
            <div className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-xs font-medium text-[#005DA9]">
                {member.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">
                  {member.name}
                  {member.id === "nadia" ? " (Anda)" : ""}
                </p>
                <p className="mt-0.5 text-[10px] text-[#717784]">
                  {member.position}
                </p>
              </div>
              {compact && member.role === "Project Lead" && (
                <span className="rounded bg-[#FCDEA0] px-1 text-[10px]">
                  Lead
                </span>
              )}
            </div>
            {!compact && (
              <>
                <p className="mt-3 text-[11px] leading-5 text-[#717784]">
                  {member.focus}
                </p>
                <p className="mt-3 text-[10px] text-[#087663]">{member.role}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
