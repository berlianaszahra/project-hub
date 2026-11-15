import { ArrowRight, CheckCircle2, Clock3, Eye } from "lucide-react";
import Link from "next/link";
import type { Application } from "../types/application";
import ApplicationStatus from "./ApplicationStatus";

type Props = {
  application: Application;
  selected: boolean;
  onSelect: () => void;
  onWithdraw: () => void;
};
export default function ApplicationCard({
  application: a,
  selected,
  onSelect,
  onWithdraw,
}: Props) {
  const accepted = a.status === "accepted";
  const Icon = accepted ? CheckCircle2 : a.status === "review" ? Eye : Clock3;
  const avatar =
    a.name === "StudySpace"
      ? "bg-[#D4E3FF] text-[#0076D3]"
      : a.name === "DesignNest"
        ? "bg-[#FCDEA0] text-[#86641F]"
        : "bg-[#A3F2D7] text-[#087663]";
  return (
    <article
      className={`rounded-lg p-4 ${selected ? "bg-[#F6F3F2]" : "bg-white"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-2.5">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded font-semibold ${avatar}`}
          >
            {a.name[0]}
          </div>
          <div>
            <h2 className="font-semibold">
              {a.name}{" "}
              <span className="text-xs font-normal text-[#555965]">
                · Lead: {a.lead}
              </span>
            </h2>
            <p className="mt-0.5 text-xs">
              <span className={selected ? "text-[#0076D3]" : ""}>{a.role}</span>
              <span className="text-[11px] text-[#717784]"> · {a.date}</span>
            </p>
          </div>
        </div>
        <ApplicationStatus status={a.status} />
      </div>
      <p
        className={`my-3 flex items-center gap-1.5 rounded px-2 py-1.5 text-xs ${accepted ? "bg-[#E1FBF1] text-[#006B57]" : selected ? "bg-white text-[#555965]" : "bg-[#F0EEEE] text-[#555965]"}`}
      >
        <Icon size={14} className="shrink-0" />
        {a.message}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EAE7E7] pt-2 text-[11px]">
        <span className="text-[#717784]">ID Aplikasi: #{a.id}</span>
        <div className="flex items-center gap-3">
          {accepted ? (
            <>
              <button
                type="button"
                onClick={onSelect}
                className="text-[#005DA9] hover:underline"
              >
                Lihat Detail
              </button>
              <Link
                href={
                  a.workspaceId
                    ? `/projek-saya/${a.workspaceId}`
                    : "/projek-saya"
                }
                className="inline-flex items-center gap-1 rounded bg-[#0076D3] px-2 py-1.5 text-white"
              >
                Buka Ruang Kerja <ArrowRight size={12} />
              </Link>
            </>
          ) : (
            <>
              {a.status !== "withdrawn" && (
                <button
                  type="button"
                  onClick={onWithdraw}
                  className="text-red-600 hover:underline"
                >
                  Batalkan Pengajuan
                </button>
              )}
              <button
                type="button"
                onClick={onSelect}
                aria-pressed={selected}
                className="rounded bg-[#EAE7E7] px-2 py-1.5 hover:bg-[#DFDBDB]"
              >
                Lihat Detail
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
