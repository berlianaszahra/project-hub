"use client";

import { Info } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { CreateProjectFormData } from "../schemas/project.schema";
import FormSection from "./FormSection";

export default function ProjectCommitment() {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateProjectFormData>();

  const isRecruiting = useWatch({
    control,
    name: "isRecruiting",
  });

  return (
    <FormSection
      number="3"
      title="Pengaturan Perekrutan & Komitmen"
      description="Atur proses pendaftaran dan ekspektasi kolaborasi tim."
    >
      {/* Rekrutmen */}
      <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-white p-4">
        <input
          type="checkbox"
          disabled={isSubmitting}
          {...register("isRecruiting")}
          className="mt-1 size-4 shrink-0 accent-[#005DA9]"
        />

        <span>
          <span className="block text-sm font-medium text-[#1C1B1B]">
            Buka Perekrutan Anggota
          </span>

          <span className="mt-1 block text-xs leading-5 text-[#414752]">
            Pengguna lain dapat mengajukan diri untuk bergabung ke posisi yang
            tersedia.
          </span>
        </span>
      </label>

      {/* Deadline */}
      {isRecruiting && (
        <div>
          <label
            htmlFor="recruitment-deadline"
            className="mb-1.5 block text-sm font-medium text-[#1C1B1B]"
          >
            Batas Waktu Pendaftaran *
          </label>

          <input
            id="recruitment-deadline"
            type="date"
            disabled={isSubmitting}
            aria-invalid={!!errors.recruitmentDeadline}
            {...register("recruitmentDeadline")}
            className="h-10 w-full rounded-lg border border-[#E0E3E8] bg-white px-3 text-sm text-[#1C1B1B] outline-none focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10"
          />

          {errors.recruitmentDeadline && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.recruitmentDeadline.message}
            </p>
          )}
        </div>
      )}

      {/* Komitmen */}
      <div>
        <label
          htmlFor="project-commitment"
          className="mb-1.5 block text-sm font-medium text-[#1C1B1B]"
        >
          Komitmen & Ekspektasi Tim
        </label>

        <textarea
          id="project-commitment"
          rows={4}
          placeholder="Contoh: Pertemuan mingguan, pembagian tugas, kolaborasi remote, dan komunikasi aktif..."
          disabled={isSubmitting}
          aria-invalid={!!errors.commitment}
          {...register("commitment")}
          className="w-full resize-y rounded-lg border border-[#E0E3E8] bg-white px-3 py-3 text-sm leading-6 text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10"
        />

        {errors.commitment && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.commitment.message}
          </p>
        )}
      </div>

      {/* Informasi */}
      <div className="flex items-start gap-3 rounded-lg border border-[#F0DEB1] bg-[#FFF7E5] p-4">
        <Info
          size={18}
          className="mt-0.5 shrink-0 text-[#946200]"
          aria-hidden="true"
        />

        <p className="text-xs leading-6 text-[#6F530F]">
          Pastikan kebutuhan anggota dan ekspektasi kolaborasi dijelaskan dengan
          jelas agar calon anggota memahami tanggung jawabnya.
        </p>
      </div>
    </FormSection>
  );
}
