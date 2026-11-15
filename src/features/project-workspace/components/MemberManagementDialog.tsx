"use client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Workspace, WorkspaceMember } from "../types/workspace";
export default function MemberManagementDialog({
  workspace: w,
  member,
  onClose,
}: {
  workspace: Workspace;
  member: WorkspaceMember;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [role, setRole] = useState(member.role);
  const [notice, setNotice] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(false);
  const lastLead =
    member.role === "Project Lead" &&
    w.members.filter((m) => m.role === "Project Lead").length === 1;
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  if (w.role !== "Project Lead") return null;
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-labelledby="manage-member-title"
      className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl backdrop:bg-black/35"
    >
      <div className="flex items-center justify-between">
        <h2 id="manage-member-title" className="text-lg font-semibold">
          Kelola Anggota
        </h2>
        <button
          type="button"
          aria-label="Tutup kelola anggota"
          onClick={() => dialog.current?.close()}
          className="p-1"
        >
          <X size={18} />
        </button>
      </div>
      <p className="mt-2 text-sm text-[#717784]">
        {member.name} · {w.name}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(
            "Layanan keanggotaan belum terhubung. Perubahan belum disimpan.",
          );
        }}
        className="mt-6 space-y-5"
      >
        <div>
          <label
            htmlFor="member-role"
            className="mb-2 block text-xs font-medium"
          >
            Peran Akses
          </label>
          <select
            id="member-role"
            value={role}
            onChange={(e) => setRole(e.target.value as WorkspaceMember["role"])}
            className="w-full rounded-lg border border-[#EAE7E7] p-3 text-sm"
          >
            <option value="Project Lead">Project Lead</option>
            <option value="Member" disabled={lastLead}>
              Member{lastLead ? " — harus ada Lead pengganti" : ""}
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor="member-position"
            className="mb-2 block text-xs font-medium"
          >
            Posisi Kontribusi
          </label>
          <select
            id="member-position"
            defaultValue={member.position}
            className="w-full rounded-lg border border-[#EAE7E7] p-3 text-sm"
          >
            <option value={member.position}>{member.position}</option>
            {w.positions
              .filter((p) => p.name !== member.position)
              .map((p) => (
                <option
                  key={p.id}
                  value={p.name}
                  disabled={p.filled >= p.capacity}
                >
                  {p.name} ({p.capacity - p.filled} slot tersedia)
                </option>
              ))}
          </select>
          <p className="mt-2 text-[11px] text-[#717784]">
            Perubahan role tidak otomatis mengubah posisi atau penggunaan kuota.
          </p>
        </div>
        {lastLead && (
          <p className="rounded-lg bg-[#FFF0D2] p-3 text-xs leading-5 text-[#705C2A]">
            Lead terakhir harus menunjuk Lead lain sebelum turun menjadi Member
            atau keluar dari proyek.
          </p>
        )}
        {notice && (
          <p role="alert" className="text-xs text-[#717784]">
            {notice}
          </p>
        )}
        <div className="flex flex-wrap justify-between gap-3">
          <button
            type="button"
            disabled={lastLead}
            onClick={() => setConfirmRemove(true)}
            className="text-xs text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Keluarkan Anggota
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#005DA9] px-4 py-2 text-xs text-white"
          >
            Simpan Perubahan
          </button>
        </div>
        {confirmRemove && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-xs leading-5">
              Keluarkan {member.name}? Anggota akan kehilangan akses internal
              dan melepas kuota posisinya.
            </p>
            <div className="mt-3 flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setNotice(
                    "Layanan keanggotaan belum terhubung. Anggota belum dikeluarkan.",
                  );
                  setConfirmRemove(false);
                }}
                className="text-xs font-medium text-red-600"
              >
                Ya, keluarkan
              </button>
              <button
                type="button"
                onClick={() => setConfirmRemove(false)}
                className="text-xs"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </form>
    </dialog>
  );
}
