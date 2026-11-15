"use client";

import { Plus, Trash2, Users } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { defaultRecruitmentPosition } from "../data/projectOptions";
import type { CreateProjectFormData } from "../schemas/project.schema";
import FormSection from "./FormSection";

const inputClass =
  "w-full rounded-lg border border-[#E0E3E8] bg-white px-3 py-2.5 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10";

export default function ProjectRecruitment() {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateProjectFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions",
  });

  return (
    <FormSection
      number="2"
      title="Kebutuhan Tim & Posisi Rekrutmen"
      description="Tentukan peran dan jumlah anggota yang dibutuhkan untuk membangun project."
    >
      {fields.map((position, index) => (
        <div
          key={position.id}
          className="space-y-4 rounded-xl border border-[#EAE7E7] bg-white p-4 shadow-sm"
        >
          {/* Header Posisi */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#005DA9]" aria-hidden="true" />

              <div>
                <h3 className="text-sm font-semibold text-[#1C1B1B]">
                  Posisi {index + 1}
                </h3>

                <p className="text-xs text-[#717784]">Kebutuhan anggota tim</p>
              </div>
            </div>

            <button
              type="button"
              disabled={fields.length <= 1 || isSubmitting}
              onClick={() => remove(index)}
              aria-label={`Hapus posisi ${index + 1}`}
              className="rounded-md p-2 text-[#717784] transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Nama Posisi dan Kuota */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_130px]">
            <div>
              <label
                htmlFor={`position-title-${index}`}
                className="mb-1.5 block text-xs font-medium"
              >
                Nama Posisi *
              </label>

              <input
                id={`position-title-${index}`}
                placeholder="Frontend Developer"
                disabled={isSubmitting}
                aria-invalid={!!errors.positions?.[index]?.title}
                {...register(`positions.${index}.title`)}
                className={inputClass}
              />

              {errors.positions?.[index]?.title && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.positions[index]?.title?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`position-quota-${index}`}
                className="mb-1.5 block text-xs font-medium"
              >
                Kuota *
              </label>

              <input
                id={`position-quota-${index}`}
                type="number"
                min={1}
                step={1}
                disabled={isSubmitting}
                aria-invalid={!!errors.positions?.[index]?.quota}
                {...register(`positions.${index}.quota`, {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />

              {errors.positions?.[index]?.quota && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.positions[index]?.quota?.message}
                </p>
              )}
            </div>
          </div>

          {/* Tanggung Jawab */}
          <div>
            <label
              htmlFor={`position-description-${index}`}
              className="mb-1.5 block text-xs font-medium"
            >
              Deskripsi Tanggung Jawab *
            </label>

            <textarea
              id={`position-description-${index}`}
              rows={3}
              placeholder="Jelaskan tugas yang akan dilakukan pada posisi ini..."
              disabled={isSubmitting}
              aria-invalid={!!errors.positions?.[index]?.description}
              {...register(`positions.${index}.description`)}
              className={`${inputClass} resize-y`}
            />

            {errors.positions?.[index]?.description && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.positions[index]?.description?.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label
              htmlFor={`position-skills-${index}`}
              className="mb-1.5 block text-xs font-medium"
            >
              Keahlian yang Dibutuhkan *
            </label>

            <input
              id={`position-skills-${index}`}
              type="text"
              placeholder="React, TypeScript, Tailwind CSS"
              disabled={isSubmitting}
              aria-invalid={!!errors.positions?.[index]?.skills}
              {...register(`positions.${index}.skills`)}
              className={inputClass}
            />

            {errors.positions?.[index]?.skills && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.positions[index]?.skills?.message}
              </p>
            )}
          </div>
        </div>
      ))}

      {errors.positions?.root?.message && (
        <p role="alert" className="text-xs text-red-600">
          {errors.positions.root.message}
        </p>
      )}

      {/* Tambah Posisi */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => append({ ...defaultRecruitmentPosition })}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#B8BDC6] bg-white px-4 py-3 text-sm font-medium text-[#005DA9] transition hover:border-[#005DA9] disabled:opacity-50"
      >
        <Plus size={16} aria-hidden="true" />
        Tambah Posisi Lain
      </button>
    </FormSection>
  );
}
