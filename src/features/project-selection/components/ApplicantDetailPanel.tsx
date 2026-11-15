"use client";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  ExternalLink,
  Link2,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import type {
  LeadWorkspace,
  WorkspaceApplicant,
} from "@/features/project-workspace/types/workspace";
import type { SelectionDecision } from "../schemas/selection.schema";
import { portfolioUrl } from "./ApplicantCard";
import SelectionStatusBadge from "./SelectionStatusBadge";
export default function ApplicantDetailPanel({
  workspace: w,
  applicant: a,
  onDecision,
  onClose,
}: {
  workspace: LeadWorkspace;
  applicant: WorkspaceApplicant;
  onDecision: (decision: SelectionDecision) => void;
  onClose: () => void;
}) {
  const [rejecting, setRejecting] = useState(false),
    [confirming, setConfirming] = useState(false),
    [note, setNote] = useState(""),
    [error, setError] = useState("");
  const position = w.positions.find((p) => p.name === a.position);
  const slots = position ? position.capacity - position.filled : 0;
  const pending = a.status === "Submitted" || a.status === "Reviewing";
  const canAccept =
    a.status === "Reviewing" &&
    slots > 0 &&
    w.status !== "Completed" &&
    !w.members.some((m) => m.id === (a.userId ?? a.id));
  const portfolio = portfolioUrl(a.portfolio);
  function decide(decision: SelectionDecision) {
    try {
      onDecision(decision);
      setRejecting(false);
      setConfirming(false);
      setNote("");
      setError("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Keputusan tidak dapat disimpan.",
      );
    }
  }
  return (
    <aside
      aria-label={`Detail pelamar ${a.name}`}
      className="rounded-xl border border-[#F0EEEE] bg-white p-5 shadow-sm xl:sticky xl:top-20"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide">
          <ClipboardList size={16} className="text-[#0076D3]" />
          DETAIL PELAMAR
        </h2>
        <button
          type="button"
          aria-label="Tutup detail pelamar"
          onClick={onClose}
          className="rounded p-1 text-[#717784]"
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[#F6F3F2] p-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-sm font-semibold text-[#34567E]">
          {a.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </span>
        <div>
          <h3 className="text-sm font-semibold">{a.name}</h3>
          <p className="mt-1 text-xs text-[#0076D3]">{a.position}</p>
          <p className="mt-1 break-all text-[10px] text-[#717784]">
            {a.email ?? "Email belum tersedia"}
            {a.affiliation ? ` · ${a.affiliation}` : ""}
          </p>
        </div>
      </div>
      <div className="my-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[#F0EEEE] p-2">
          <p className="mb-1 text-[9px] tracking-wide text-[#929296]">
            STATUS SELEKSI
          </p>
          <SelectionStatusBadge status={a.status} />
        </div>
        <div className="rounded-lg bg-[#F0EEEE] p-2">
          <p className="mb-1 text-[9px] tracking-wide text-[#929296]">
            KUOTA POSISI
          </p>
          <p className="text-[10px]">
            {position
              ? `${position.filled} dari ${position.capacity} terisi`
              : "Posisi tidak tersedia"}
            <span className="ml-1 rounded bg-[#A3F2D7] px-1 text-[#08634F]">
              {Math.max(0, slots)} Slot
            </span>
          </p>
        </div>
      </div>
      <h4 className="mb-2 flex items-center gap-1 text-[11px] font-medium">
        <ClipboardList size={12} />
        Motivasi & Komitmen
      </h4>
      <blockquote className="rounded-xl bg-[#F6F3F2] p-4 text-xs leading-6">
        “{a.motivation}”
      </blockquote>
      <h4 className="mb-2 mt-5 text-[11px] font-medium">
        &lt; &gt; Keahlian & Repositori
      </h4>
      <div className="flex flex-wrap gap-1">
        {a.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-[#F0EEEE] px-2 py-1 text-[10px]"
          >
            {skill}
          </span>
        ))}
      </div>
      {portfolio ? (
        <a
          href={portfolio}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex items-center gap-2 rounded bg-[#F6F3F2] p-2 text-[10px] text-[#555965]"
        >
          <Link2 size={14} className="shrink-0" />
          <span className="min-w-0 flex-1 break-all">
            {a.portfolioLabel ?? portfolio}
          </span>
          <ExternalLink size={12} className="shrink-0" />
        </a>
      ) : (
        <p className="mt-2 text-[10px] text-[#929296]">
          Tidak ada tautan portofolio yang disertakan.
        </p>
      )}
      {a.note && (
        <div className="mt-4 rounded-lg bg-[#F6F3F2] p-3">
          <h4 className="text-[10px] font-medium">Catatan Hasil Seleksi</h4>
          <p className="mt-1 text-xs leading-5 text-[#717784]">{a.note}</p>
        </div>
      )}
      {pending ? (
        <div className="mt-6">
          <h4 className="mb-2 text-[10px] tracking-wide text-[#929296]">
            KEPUTUSAN PROJECT LEAD
          </h4>
          <button
            type="button"
            disabled={!canAccept}
            onClick={() => {
              setConfirming(true);
              setRejecting(false);
              setError("");
            }}
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#0076D3] p-3 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <UserPlus size={14} />
            Terima Pengajuan (Tambahkan ke Tim)
          </button>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              disabled={a.status !== "Submitted"}
              onClick={() => decide({ action: "review", applicantId: a.id })}
              className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#EAE7E7] px-2 py-2 text-[10px] disabled:opacity-40"
            >
              <Clock3 size={12} />
              Tandai Ditinjau
            </button>
            <button
              type="button"
              disabled={a.status !== "Reviewing"}
              onClick={() => {
                setRejecting(true);
                setConfirming(false);
                setError("");
              }}
              className="rounded-lg bg-red-50 px-2 py-2 text-[10px] text-red-600 disabled:opacity-40"
            >
              ⊗ Tolak Berkas
            </button>
          </div>
          {a.status === "Submitted" && (
            <p className="mt-2 text-[10px] leading-5 text-[#929296]">
              Tandai sedang ditinjau sebelum menerima atau menolak pengajuan.
            </p>
          )}
          {a.status === "Reviewing" && slots <= 0 && (
            <p className="mt-2 text-[10px] text-red-600">
              Kuota posisi penuh atau posisi tidak tersedia.
            </p>
          )}
          {confirming && (
            <div className="mt-3 rounded-lg bg-[#EAF4FF] p-3">
              <p className="text-xs leading-5">
                Terima {a.name} sebagai Member pada posisi {a.position}? Satu
                slot akan terisi.
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    decide({ action: "accept", applicantId: a.id })
                  }
                  className="rounded bg-[#005DA9] px-2 py-2 text-[11px] text-white"
                >
                  Ya, Terima
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="text-[11px]"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
          {rejecting && (
            <form
              className="mt-3 rounded-lg bg-red-50 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (note.trim().length < 10) {
                  setError("Catatan penolakan minimal 10 karakter.");
                  return;
                }
                decide({ action: "reject", applicantId: a.id, note });
              }}
            >
              <label
                htmlFor="rejection-note"
                className="mb-2 block text-xs font-medium"
              >
                Catatan Penolakan <span className="text-red-600">*</span>
              </label>
              <textarea
                id="rejection-note"
                required
                minLength={10}
                maxLength={2000}
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Jelaskan hasil seleksi untuk pelamar..."
                className="w-full rounded border border-red-100 bg-white p-2 text-xs outline-none focus:border-red-400"
              />
              <div className="mt-3 flex gap-3">
                <button
                  type="submit"
                  className="rounded bg-red-600 px-2 py-2 text-[11px] text-white"
                >
                  Konfirmasi Penolakan
                </button>
                <button
                  type="button"
                  onClick={() => setRejecting(false)}
                  className="text-[11px]"
                >
                  Batal
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p className="mt-5 flex items-center gap-1 rounded-lg bg-[#F6F3F2] p-3 text-[11px] text-[#717784]">
          <CheckCircle2 size={14} />
          Pengajuan telah selesai diproses.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 text-xs text-red-600">
          {error}
        </p>
      )}
    </aside>
  );
}
