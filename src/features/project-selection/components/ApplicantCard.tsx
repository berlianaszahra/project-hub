import { BriefcaseBusiness, Clock3, ExternalLink } from "lucide-react";
import type { WorkspaceApplicant } from "@/features/project-workspace/types/workspace";
import SelectionStatusBadge from "./SelectionStatusBadge";
export function portfolioUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export default function ApplicantCard({
  applicant: a,
  selected,
  onSelect,
}: {
  applicant: WorkspaceApplicant;
  selected: boolean;
  onSelect: () => void;
}) {
  const portfolio = portfolioUrl(a.portfolio);
  return (
    <article
      id={a.id}
      className={`rounded-xl border bg-white p-4 ${selected ? "border-[#B5D9FF] border-l-[3px] border-l-[#0076D3]" : "border-[#F0EEEE]"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`flex size-9 items-center justify-center rounded-full text-xs font-semibold ${a.status === "Accepted" ? "bg-[#A3F2D7] text-[#08634F]" : "bg-[#D4E3FF] text-[#34567E]"}`}
          >
            {a.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div>
            <h2 className="text-sm font-semibold">{a.name}</h2>
            <p className="mt-0.5 text-[10px] text-[#717784]">
              {a.email ?? "Email belum tersedia"}
            </p>
          </div>
        </div>
        <SelectionStatusBadge status={a.status} />
      </div>
      <div className="my-4 flex flex-wrap items-center gap-1">
        <span className="mr-1 inline-flex items-center gap-1 rounded bg-[#EAF4FF] px-1.5 py-1 text-[10px] text-[#005DA9]">
          <BriefcaseBusiness size={12} />
          {a.position}
        </span>
        {a.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-[#F0EEEE] px-1.5 py-0.5 text-[10px]"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#929296]">
          <span className="inline-flex items-center gap-1">
            <Clock3 size={12} />
            {a.submittedAt
              ? new Intl.DateTimeFormat("id-ID", {
                  dateStyle: "medium",
                  timeZone: "UTC",
                }).format(new Date(`${a.submittedAt}T00:00:00Z`))
              : "Tanggal belum tersedia"}
          </span>
          {portfolio && (
            <a
              href={portfolio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#0076D3] hover:underline"
            >
              {a.portfolioLabel ?? "Portofolio"}
              <ExternalLink size={10} />
            </a>
          )}
        </div>
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          className={`rounded px-3 py-1.5 text-[10px] ${selected ? "bg-[#0076D3] text-white" : "bg-[#F0EEEE]"}`}
        >
          Tinjau Detail ›
        </button>
      </div>
    </article>
  );
}
