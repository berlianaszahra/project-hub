"use client";
import { CheckCircle2, ClipboardList, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  LeadWorkspace,
  SelectionStatus,
} from "@/features/project-workspace/types/workspace";
import type { SelectionDecision } from "../schemas/selection.schema";
import ApplicantCard from "./ApplicantCard";
import ApplicantDetailPanel from "./ApplicantDetailPanel";
import { selectionLabels } from "./SelectionStatusBadge";

const tabs: (SelectionStatus | "all")[] = [
  "all",
  "Submitted",
  "Reviewing",
  "Accepted",
  "Rejected",
  "Cancelled",
];
export default function ProjectSelectionPage({
  workspace: w,
  onDecision,
}: {
  workspace: LeadWorkspace;
  onDecision: (decision: SelectionDecision) => void;
}) {
  const [status, setStatus] = useState<SelectionStatus | "all">("all"),
    [query, setQuery] = useState(""),
    [position, setPosition] = useState("all"),
    [selected, setSelected] = useState<string | null>(
      w.applicants[0]?.id ?? null,
    ),
    [notice, setNotice] = useState("");
  useEffect(() => {
    setPosition(
      new URLSearchParams(window.location.search).get("posisi") ?? "all",
    );
    if (window.location.hash)
      setSelected(decodeURIComponent(window.location.hash.slice(1)));
  }, []);
  const filtered = w.applicants.filter(
    (a) =>
      (status === "all" || a.status === status) &&
      (position === "all" || a.position === position) &&
      [a.name, a.email ?? "", ...a.skills]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const applicant = filtered.find((a) => a.id === selected);
  const remaining = w.positions.reduce(
    (sum, p) => sum + p.capacity - p.filled,
    0,
  );
  function decide(decision: SelectionDecision) {
    onDecision(decision);
    setNotice(
      decision.action === "accept"
        ? "Pelamar diterima. Daftar anggota dan kuota posisi diperbarui pada perangkat ini."
        : decision.action === "reject"
          ? "Pengajuan ditolak dan catatan hasil seleksi disimpan pada perangkat ini."
          : "Pengajuan ditandai sedang ditinjau.",
    );
  }
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#005DA9]">
            {w.name} / SELEKSI PENGAJUAN
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[28px] font-semibold tracking-tight">
              Seleksi Pengajuan
            </h1>
            <span className="rounded-full bg-[#FBE9C5] px-2 py-1 text-[10px] text-[#86641F]">
              •{" "}
              {w.status === "Recruiting"
                ? "Perekrutan Terbuka"
                : "Perekrutan Ditutup"}{" "}
              · {remaining} Slot Tersisa
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-xs leading-6 text-[#717784]">
            Tinjau calon kontributor dan tentukan keputusan penerimaan tim{" "}
            {w.name} secara kolaboratif.
          </p>
        </div>
        <Link
          href={`/projek-saya/${w.id}/posisi`}
          className="rounded-lg bg-[#F0EEEE] px-3 py-2 text-xs"
        >
          Atur Kuota Posisi
        </Link>
      </header>
      <p className="mt-3 text-[10px] text-[#929296]">
        Mode demo · Keputusan disimpan di perangkat ini. Sinkronisasi dengan
        pelamar memerlukan layanan backend.
      </p>
      {notice && (
        <output className="mt-3 block rounded-lg bg-[#EAF4FF] p-3 text-xs text-[#005DA9]">
          {notice}
        </output>
      )}
      <div className="my-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            status: "all",
            label: "TOTAL PENGAJUAN",
            caption: "berkas",
            Icon: ClipboardList,
          },
          {
            status: "Submitted",
            label: "MENUNGGU REVIEW",
            caption: "perlu respons",
            Icon: ClipboardList,
          },
          {
            status: "Reviewing",
            label: "SEDANG DITINJAU",
            caption: "dalam peninjauan",
            Icon: Eye,
          },
          {
            status: "Accepted",
            label: "DITERIMA",
            caption: "hasil seleksi diterima",
            Icon: CheckCircle2,
          },
        ].map((metric) => (
          <section
            key={metric.status}
            className="rounded-xl border border-[#F0EEEE] bg-white p-4"
          >
            <div className="flex justify-between gap-2 text-[10px] tracking-wide text-[#717784]">
              <h2>{metric.label}</h2>
              <metric.Icon size={14} />
            </div>
            <p className="mt-2 text-3xl font-semibold">
              {metric.status === "all"
                ? w.applicants.length
                : w.applicants.filter((a) => a.status === metric.status).length}
              <span className="ml-1 text-[10px] font-normal text-[#929296]">
                {metric.caption}
              </span>
            </p>
          </section>
        ))}
      </div>
      <section
        aria-label="Filter pengajuan"
        className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F0EEEE] bg-white p-2"
      >
        <div className="flex max-w-full gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={status === tab}
              onClick={() => {
                setStatus(tab);
                setSelected(null);
              }}
              className={`shrink-0 rounded px-2 py-2 text-[10px] ${status === tab ? "bg-[#EAE7E7] font-medium" : "text-[#717784]"}`}
            >
              {tab === "all" ? "Semua" : selectionLabels[tab]} (
              {tab === "all"
                ? w.applicants.length
                : w.applicants.filter((a) => a.status === tab).length}
              )
            </button>
          ))}
        </div>
        <div className="flex max-w-full flex-wrap gap-2">
          <label className="flex items-center gap-1 rounded-lg bg-[#F6F3F2] px-2 py-2 text-[#929296]">
            <Search size={12} />
            <span className="sr-only">Cari nama atau kemampuan</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau kemampuan..."
              className="w-40 bg-transparent text-[10px] outline-none"
            />
          </label>
          <select
            aria-label="Filter posisi pengajuan"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              setSelected(null);
            }}
            className="max-w-full rounded-lg bg-[#F6F3F2] px-2 py-2 text-[10px]"
          >
            <option value="all">Semua Posisi</option>
            {[
              ...new Set([
                ...w.positions.map((p) => p.name),
                ...w.applicants.map((a) => a.position),
              ]),
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <div
        className={`grid items-start gap-4 ${applicant ? "xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,1fr)]" : ""}`}
      >
        <section aria-label="Daftar pelamar" className="space-y-2">
          {filtered.map((a) => (
            <ApplicantCard
              key={a.id}
              applicant={a}
              selected={applicant?.id === a.id}
              onSelect={() => setSelected(a.id)}
            />
          ))}
          {!filtered.length && (
            <div className="rounded-xl border border-dashed border-[#D4D8DF] bg-white p-10 text-center">
              <p className="text-sm text-[#717784]">
                Tidak ada pengajuan yang sesuai dengan filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setPosition("all");
                  setStatus("all");
                }}
                className="mt-3 text-xs text-[#005DA9]"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>
        {applicant && (
          <ApplicantDetailPanel
            key={applicant.id}
            workspace={w}
            applicant={applicant}
            onDecision={decide}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </>
  );
}
