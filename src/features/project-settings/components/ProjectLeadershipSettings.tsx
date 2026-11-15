"use client";

import { ArrowRightLeft, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";

import type {
  ProjectMember,
  TransferOwnershipHandler,
} from "../types/projectSettings";

type ProjectLeadershipSettingsProps = {
  projectId: string;
  leadName: string;
  members: ProjectMember[];
  onTransfer?: TransferOwnershipHandler;
};

export default function ProjectLeadershipSettings({
  projectId,
  leadName,
  members,
  onTransfer,
}: ProjectLeadershipSettingsProps) {
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const candidates = members.filter(
    (member) => member.role === "member" && member.status === "active",
  );

  const selectedMember = candidates.find(
    (member) => member.id === selectedMemberId,
  );

  const handleTransfer = async () => {
    if (!selectedMemberId) return;

    if (!onTransfer) {
      setError("Layanan transfer kepemilikan belum terhubung ke backend.");
      setConfirmOpen(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onTransfer(projectId, selectedMemberId);

      setConfirmOpen(false);
      setSelectedMemberId("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Transfer kepemilikan gagal.",
      );
      setConfirmOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kepemimpinan"
      className="scroll-mt-8 space-y-6 border-t border-[#E5E2E1] py-8"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-[#005DA9]">
          Bagian 03
        </p>

        <h2 className="mt-3 text-lg font-semibold">
          Hak Akses & Kepemimpinan Proyek
        </h2>

        <p className="mt-1 text-sm leading-6 text-[#414752]">
          Kelola kepemilikan proyek dan hak akses pemimpin tim.
        </p>
      </div>

      <div className="space-y-5 rounded-lg border border-[#E5E2E1] bg-[#FCF9F8] p-5">
        {/* Current Lead */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#005DA9]">
            <UserRound size={20} />
          </div>

          <div>
            <p className="text-xs text-[#414752]">Project Lead Saat Ini</p>

            <p className="text-sm font-semibold">{leadName}</p>
          </div>

          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#A3F2D7] px-2 py-1 text-[11px] font-medium text-[#005140]">
            <ShieldCheck size={12} />
            Lead
          </span>
        </div>

        <div className="border-t border-[#E5E2E1]" />

        {/* Transfer Ownership */}
        <div>
          <h3 className="text-sm font-semibold">Transfer Kepemilikan</h3>

          <p className="mt-1 text-xs leading-5 text-[#414752]">
            Pilih anggota aktif yang akan menerima kepemilikan proyek. Tindakan
            ini memerlukan konfirmasi.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedMemberId}
              disabled={loading}
              onChange={(event) => {
                setSelectedMemberId(event.target.value);
                setError("");
              }}
              aria-label="Pilih calon Project Lead"
              className="h-10 min-w-0 flex-1 rounded border border-[#E5E2E1] bg-white px-3 text-sm outline-none focus:border-[#005DA9]"
            >
              <option value="">
                Pilih anggota aktif penerima kepemilikan...
              </option>

              {candidates.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={!selectedMemberId || loading}
              onClick={() => setConfirmOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded border border-[#E5E2E1] bg-white px-4 text-xs font-medium hover:bg-[#F6F3F2] disabled:opacity-50"
            >
              <ArrowRightLeft size={15} />
              Transfer Kepemilikan
            </button>
          </div>

          {error && (
            <p role="alert" className="mt-3 text-xs text-red-600">
              {error}
            </p>
          )}
        </div>

        <p className="text-xs leading-5 text-[#705C2A]">
          Hanya Project Lead yang berwenang mentransfer kepemilikan. Pengalihan
          hak tidak dapat dibatalkan secara sepihak.
        </p>
      </div>

      {/* Confirmation Dialog */}
      {confirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="transfer-dialog-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <h3 id="transfer-dialog-title" className="text-lg font-semibold">
              Konfirmasi Transfer Kepemilikan
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#414752]">
              Apakah kamu yakin ingin memindahkan kepemilikan proyek kepada{" "}
              <strong>{selectedMember?.name}</strong>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => setConfirmOpen(false)}
                className="rounded border border-[#E5E2E1] px-4 py-2 text-sm"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleTransfer}
                className="rounded bg-[#005DA9] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Ya, Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
