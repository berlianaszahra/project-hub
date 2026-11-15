
"use client";

import {
  useFormContext,
  useWatch,
} from "react-hook-form";
import type { ProjectSettingsFormData } from "../schemas/projectSettings.schema";

type ProjectRecruitmentSettingsProps = {
  currentMemberCount: number;
};

const inputClass =
  "w-full rounded border border-[#E5E2E1] bg-white px-3 py-2 text-sm outline-none focus:border-[#005DA9]";

export default function ProjectRecruitmentSettings({
  currentMemberCount,
}: ProjectRecruitmentSettingsProps) {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<ProjectSettingsFormData>();

  const isRecruiting = useWatch({
    control,
    name: "isRecruiting",
  });

  const maxMembers = useWatch({
    control,
    name: "maxMembers",
  });

  const belowCurrentCount =
    Number.isFinite(Number(maxMembers)) &&
    Number(maxMembers) < currentMemberCount;

  return (
    <section
      id="perekrutan"
      className="scroll-mt-8 space-y-6 border-t border-[#E5E2E1] py-8"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-[#005DA9]">
          Bagian 02
        </p>

        <h2 className="mt-3 text-lg font-semibold">
          Pengaturan Perekrutan & Visibilitas
        </h2>

        <p className="mt-1 text-sm text-[#414752]">
          Atur kesiapan penerimaan anggota baru, batasan
          kuota tim, serta kurasi pelamar.
        </p>
      </div>

      <div className="space-y-6 rounded-lg border border-[#E5E2E1] bg-[#FCF9F8] p-5">
        {/* Recruitment Toggle */}
        <label className="flex cursor-pointer items-start justify-between gap-5">
          <span>
            <span className="block text-sm font-medium">
              Status Rekrutmen
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#414752]">
              Izinkan mahasiswa mengirim pengajuan untuk
              bergabung ke proyek ini.
            </span>

            <span className="mt-2 block text-xs font-medium text-[#005DA9]">
              {isRecruiting
                ? "Rekrutmen sedang dibuka"
                : "Rekrutmen sedang ditutup"}
            </span>
          </span>

          <span className="relative shrink-0">
            <input
              type="checkbox"
              disabled={isSubmitting}
              {...register("isRecruiting")}
              className="peer sr-only"
            />

            <span className="block h-6 w-11 rounded-full bg-[#D4D8DF] transition peer-checked:bg-[#005DA9] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#005DA9]" />

            <span className="pointer-events-none absolute left-1 top-1 size-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
        </label>

        <div className="border-t border-[#E5E2E1]" />

        {/* Visibility */}
        <div>
          <label
            htmlFor="settings-visibility"
            className="mb-2 block text-sm font-medium"
          >
            Visibilitas Proyek
          </label>

          <select
            id="settings-visibility"
            disabled={isSubmitting}
            {...register("visibility")}
            className={inputClass}
          >
            <option value="public">
              Publik — Tampil pada katalog
            </option>

            <option value="private">
              Privat — Hanya anggota proyek
            </option>
          </select>

          <p className="mt-2 text-xs text-[#414752]">
            Proyek publik dapat ditemukan melalui
            katalog ProjectHub.
          </p>
        </div>
      </div>

      {/* Quota */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="settings-max-members"
            className="mb-2 block text-sm font-medium"
          >
            Kuota Maksimal Anggota
          </label>

          <input
            id="settings-max-members"
            type="number"
            min={1}
            max={100}
            disabled={isSubmitting}
            {...register("maxMembers")}
            className={`${inputClass} max-w-60`}
          />

          <p className="mt-2 text-xs text-[#414752]">
            Anggota saat ini: {currentMemberCount} orang.
          </p>

          {belowCurrentCount && (
            <p className="mt-2 text-xs text-amber-700">
              Kuota yang dimasukkan lebih kecil dari jumlah
              anggota saat ini.
            </p>
          )}

          {errors.maxMembers && (
            <p
              role="alert"
              className="mt-2 text-xs text-red-600"
            >
              {errors.maxMembers.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="settings-announcement"
            className="mb-2 block text-sm font-medium"
          >
            Pengumuman Seleksi Internal
          </label>

          <textarea
            id="settings-announcement"
            rows={4}
            disabled={isSubmitting}
            placeholder="Tuliskan pesan untuk calon anggota atau anggota yang diterima..."
            {...register("selectionAnnouncement")}
            className={`${inputClass} resize-y leading-6`}
          />

          {errors.selectionAnnouncement && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.selectionAnnouncement.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
