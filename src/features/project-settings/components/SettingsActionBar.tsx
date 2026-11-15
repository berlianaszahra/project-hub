"use client";

import { RotateCcw, Save } from "lucide-react";

type SettingsActionBarProps = {
  isDirty: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
};

export default function SettingsActionBar({
  isDirty,
  isSubmitting,
  onCancel,
}: SettingsActionBarProps) {
  return (
    <div className="sticky bottom-0 z-20 flex flex-col gap-4 border-t border-[#E5E2E1] bg-white/95 px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs text-[#414752]">
        <span
          className={`size-2 rounded-full ${
            isDirty ? "bg-amber-500" : "bg-[#0C6854]"
          }`}
        />

        {isDirty
          ? "Ada perubahan yang belum disimpan"
          : "Semua isian sesuai data terakhir"}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={!isDirty || isSubmitting}
          onClick={onCancel}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded border border-[#E5E2E1] px-4 text-sm font-medium hover:bg-[#FCF9F8] disabled:opacity-50 sm:flex-none"
        >
          <RotateCcw size={15} />
          Batal
        </button>

        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded bg-[#005DA9] px-5 text-sm font-medium text-white hover:bg-[#004B89] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          <Save size={15} />
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}
