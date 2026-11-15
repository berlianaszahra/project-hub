
"use client";

import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

import type { CreateProjectFormData } from "../schemas/project.schema";
import { platformOptions } from "../data/ProjectOptions";
import FormSection from "./FormSection";

const inputClass =
  "h-10 w-full rounded-lg border border-[#E0E3E8] bg-white px-3 text-sm text-[#1C1B1B] outline-none focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10";

export default function ProjectLinks() {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateProjectFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <FormSection
      number="4"
      title="Tautan & Dokumentasi Project"
      description="Tambahkan repository, desain, dan dokumen pendukung."
    >
      {fields.map((link, index) => (
        <div
          key={link.id}
          className="space-y-4 rounded-xl border border-[#EAE7E7] bg-white p-4"
        >
          {/* Link Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ExternalLink
                size={17}
                className="text-[#005DA9]"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold text-[#1C1B1B]">
                Tautan {index + 1}
              </h3>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => remove(index)}
              aria-label={`Hapus tautan ${index + 1}`}
              className="rounded-md p-2 text-[#717784] hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Platform & Visibility */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`link-platform-${index}`}
                className="mb-1.5 block text-xs font-medium text-[#1C1B1B]"
              >
                Platform *
              </label>

              <select
                id={`link-platform-${index}`}
                disabled={isSubmitting}
                {...register(`links.${index}.platform`)}
                className={inputClass}
              >
                {platformOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              {errors.links?.[index]?.platform && (
                <p
                  role="alert"
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.links[index]?.platform?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`link-visibility-${index}`}
                className="mb-1.5 block text-xs font-medium text-[#1C1B1B]"
              >
                Visibilitas *
              </label>

              <select
                id={`link-visibility-${index}`}
                disabled={isSubmitting}
                {...register(`links.${index}.visibility`)}
                className={inputClass}
              >
                <option value="team">Hanya Tim</option>
                <option value="public">Publik</option>
              </select>
            </div>
          </div>

          {/* URL */}
          <div>
            <label
              htmlFor={`link-url-${index}`}
              className="mb-1.5 block text-xs font-medium text-[#1C1B1B]"
            >
              URL *
            </label>

            <input
              id={`link-url-${index}`}
              type="url"
              placeholder="https://github.com/..."
              disabled={isSubmitting}
              aria-invalid={!!errors.links?.[index]?.url}
              {...register(`links.${index}.url`)}
              className={inputClass}
            />

            {errors.links?.[index]?.url && (
              <p
                role="alert"
                className="mt-1 text-xs text-red-600"
              >
                {errors.links[index]?.url?.message}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Tambah Tautan */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() =>
          append({
            platform: "github",
            url: "",
            visibility: "team",
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#B8BDC6] bg-white px-4 py-3 text-sm font-medium text-[#005DA9] transition hover:border-[#005DA9] disabled:opacity-50"
      >
        <Plus size={16} aria-hidden="true" />
        Tambah Tautan
      </button>

      {/* Catatan */}
      <div>
        <label
          htmlFor="additional-notes"
          className="mb-1.5 block text-sm font-medium text-[#1C1B1B]"
        >
          Catatan Tambahan
        </label>

        <textarea
          id="additional-notes"
          rows={4}
          placeholder="Tambahkan informasi lain yang perlu diketahui calon anggota..."
          disabled={isSubmitting}
          aria-invalid={!!errors.additionalNotes}
          {...register("additionalNotes")}
          className="w-full resize-y rounded-lg border border-[#E0E3E8] bg-white px-3 py-3 text-sm leading-6 text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10"
        />

        {errors.additionalNotes && (
          <p
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.additionalNotes.message}
          </p>
        )}
      </div>
    </FormSection>
  );
}
