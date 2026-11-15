"use client";

import { AlertTriangle, Archive, Trash2 } from "lucide-react";
import { useState } from "react";

import type { ProjectActionHandler } from "../types/projectSettings";

type ProjectDangerZoneProps = {
  projectId: string;
  projectName: string;
  onArchive?: ProjectActionHandler;
  onDelete?: ProjectActionHandler;
};

type DangerAction = "archive" | "delete";

export default function ProjectDangerZone({
  projectId,
  projectName,
  onArchive,
  onDelete,
}: ProjectDangerZoneProps) {
  const [action, setAction] = useState<DangerAction | null>(null);
  const [confirmationText, setConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const closeDialog = () => {
    if (loading) return;

    setAction(null);
    setConfirmationText("");
  };

  const openDialog = (nextAction: DangerAction) => {
    setError("");
    setConfirmationText("");
    setAction(nextAction);
  };

  const handleConfirm = async () => {
    if (!action) return;

    if (action === "delete" && confirmationText !== projectName) {
      return;
    }

    const handler = action === "archive" ? onArchive : onDelete;

    if (!handler) {
      setError("Aksi ini belum terhubung ke layanan backend.");
      closeDialog();
      return;
    }

    try {
      setLoading(true);
      setError("");

      await handler(projectId);
      setAction(null);
      setConfirmationText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tindakan gagal diproses.");
      setAction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="zona-bahaya"
      className="scroll-mt-8 space-y-6 border-t border-[#E5E2E1] py-8"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-[#BA1A1A]">
          Bagian 04
        </p>

        <h2 className="mt-3 text-lg font-semibold">Zona Bahaya</h2>

        <p className="mt-1 text-sm text-[#414752]">
          Aksi yang memengaruhi status publikasi dan data proyek.
        </p>
      </div>

      <div className="divide-y divide-[#E5E2E1] overflow-hidden rounded-lg border border-[#E5E2E1]">
        {/* Archive */}
        <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Archive size={19} className="mt-0.5 shrink-0 text-[#705C2A]" />

            <div>
              <h3 className="text-sm font-semibold">Arsipkan Proyek</h3>

              <p className="mt-1 text-xs leading-5 text-[#414752]">
                Proyek dipindahkan ke status arsip dan tidak lagi menerima
                aktivitas baru.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openDialog("archive")}
            className="shrink-0 rounded border border-[#E5E2E1] px-4 py-2 text-xs font-medium hover:bg-[#FCF9F8]"
          >
            Arsipkan Proyek
          </button>
        </div>

        {/* Delete */}
        <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Trash2 size={19} className="mt-0.5 shrink-0 text-[#BA1A1A]" />

            <div>
              <h3 className="text-sm font-semibold text-[#BA1A1A]">
                Hapus Proyek Permanen
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#414752]">
                Menghapus proyek secara permanen. Tindakan ini tidak dapat
                dibatalkan.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openDialog("delete")}
            className="shrink-0 rounded border border-[#BA1A1A] px-4 py-2 text-xs font-medium text-[#BA1A1A] transition hover:bg-red-50"
          >
            Hapus Proyek
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Confirm Dialog */}
      {action && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="danger-dialog-title"
            aria-describedby="danger-dialog-description"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-red-50 text-[#BA1A1A]">
              <AlertTriangle size={22} />
            </div>

            <h3 id="danger-dialog-title" className="text-lg font-semibold">
              {action === "archive"
                ? "Arsipkan Proyek?"
                : "Hapus Proyek Permanen?"}
            </h3>

            <p
              id="danger-dialog-description"
              className="mt-3 text-sm leading-6 text-[#414752]"
            >
              {action === "archive"
                ? `Kamu akan mengarsipkan ${projectName}.`
                : `Kamu akan menghapus ${projectName} secara permanen. Tindakan ini tidak dapat dibatalkan.`}
            </p>

            {action === "delete" && (
              <div className="mt-5">
                <label
                  htmlFor="delete-confirmation"
                  className="mb-2 block text-sm font-medium"
                >
                  Ketik <strong>{projectName}</strong> untuk mengonfirmasi.
                </label>

                <input
                  id="delete-confirmation"
                  type="text"
                  value={confirmationText}
                  onChange={(event) => setConfirmationText(event.target.value)}
                  autoComplete="off"
                  className="w-full rounded border border-[#E5E2E1] px-3 py-2 text-sm outline-none focus:border-[#BA1A1A]"
                />
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={closeDialog}
                className="rounded border border-[#E5E2E1] px-4 py-2 text-sm"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={
                  loading ||
                  (action === "delete" && confirmationText !== projectName)
                }
                className="rounded bg-[#BA1A1A] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Memproses..."
                  : action === "archive"
                    ? "Ya, Arsipkan"
                    : "Hapus Permanen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
