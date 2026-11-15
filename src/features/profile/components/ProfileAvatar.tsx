"use client";

import { Pencil } from "lucide-react";

type ProfileAvatarProps = {
  fullName: string;
  onEdit?: () => void;
};

export default function ProfileAvatar({
  fullName,
  onEdit,
}: ProfileAvatarProps) {
  const initial = fullName.trim().charAt(0).toUpperCase() || "?";

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35px] text-[#1C1B1B]/70">
          Avatar Profil
        </h2>

        <span className="rounded bg-[#0C6854]/10 px-2 py-1 text-[11px] font-medium text-[#0C6854]">
          Otomatis
        </span>
      </div>

      <div className="flex flex-col items-start gap-5 rounded-lg bg-[#F6F3F2]/60 p-4 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#005DA9] text-[32px] font-bold text-white shadow-sm">
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium text-[#1C1B1B]">Inisial Nama</h3>

          <p className="mt-1 text-[11px] leading-[18px] tracking-[0.22px] text-[#414752]">
            Inisial nama depan Anda digunakan secara otomatis sebagai identitas
            profil agar tetap praktis dan bebas repot.
          </p>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#F0EDED] px-3 py-1.5 text-[11px] font-medium text-[#1C1B1B] transition hover:bg-[#E5E0DF]"
            >
              <Pencil size={12} aria-hidden="true" />
              Ubah Nama Profil
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
