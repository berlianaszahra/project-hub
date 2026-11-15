
"use client";

import { useState } from "react";
import {
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { X } from "lucide-react";

import type { CreateProjectFormData } from "../schemas/project.schema";
import {
  projectCategories,
  technologyOptions,
} from "../data/projectOptions";
import FormSection from "./FormSection";

const inputClass =
  "h-10 w-full rounded-lg border border-[#E0E3E8] bg-white px-3 text-sm text-[#1C1B1B] outline-none transition placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10";

const labelClass =
  "mb-1.5 block text-sm font-medium text-[#1C1B1B]";

export default function ProjectBasicInfo() {
  const [techInput, setTechInput] = useState("");

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateProjectFormData>();

  const shortDescription =
    useWatch({ control, name: "shortDescription" }) ?? "";

  return (
    <FormSection
      number="1"
      title="Informasi Dasar Project"
    >
      {/* Nama Project */}
      <div>
        <label htmlFor="project-name" className={labelClass}>
          Nama Project <span className="text-red-600">*</span>
        </label>

        <input
          id="project-name"
          type="text"
          placeholder="Contoh: CampusConnect, StudySpace Platform..."
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          {...register("name")}
          className={inputClass}
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Kategori */}
      <div>
        <label htmlFor="project-category" className={labelClass}>
          Kategori & Klaster Spesialisasi{" "}
          <span className="text-red-600">*</span>
        </label>

        <select
          id="project-category"
          disabled={isSubmitting}
          aria-invalid={!!errors.category}
          {...register("category")}
          className={inputClass}
        >
          <option value="">Pilih kategori project</option>

          {projectCategories.map((category) => (
            <option
              key={category.value}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Deskripsi Singkat */}
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label
            htmlFor="short-description"
            className="text-sm font-medium text-[#1C1B1B]"
          >
            Deskripsi Singkat{" "}
            <span className="text-red-600">*</span>
          </label>

          <span className="text-xs text-[#717784]">
            {shortDescription.length}/140
          </span>
        </div>

        <input
          id="short-description"
          type="text"
          maxLength={140}
          placeholder="Jelaskan esensi produkmu untuk ringkasan katalog..."
          disabled={isSubmitting}
          aria-invalid={!!errors.shortDescription}
          {...register("shortDescription")}
          className={inputClass}
        />

        {errors.shortDescription && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Latar Belakang */}
      <div>
        <label htmlFor="project-background" className={labelClass}>
          Tujuan & Latar Belakang Project{" "}
          <span className="text-red-600">*</span>
        </label>

        <textarea
          id="project-background"
          rows={5}
          placeholder="Masalah spesifik apa yang ingin diselesaikan? Apa tujuan utama dan hasil akhir project?"
          disabled={isSubmitting}
          aria-invalid={!!errors.background}
          {...register("background")}
          className="w-full resize-y rounded-lg border border-[#E0E3E8] bg-white px-3 py-3 text-sm leading-6 text-[#1C1B1B] outline-none transition placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10"
        />

        {errors.background && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.background.message}
          </p>
        )}
      </div>

      {/* Tech Stack */}
      <div>
        <label
          htmlFor="technology-input"
          className={labelClass}
        >
          Tech Stack & Tooling Utama{" "}
          <span className="text-red-600">*</span>
        </label>

        <Controller
          name="technologies"
          control={control}
          render={({ field }) => {
            const addTechnology = (value: string) => {
              const technology = value.trim();

              if (!technology) return;

              const alreadyExists = field.value.some(
                (item) =>
                  item.toLowerCase() === technology.toLowerCase(),
              );

              if (!alreadyExists) {
                field.onChange([...field.value, technology]);
              }

              setTechInput("");
            };

            return (
              <div
                className="rounded-lg border border-[#E0E3E8] bg-white p-2.5 focus-within:border-[#005DA9]"
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget,
                    )
                  ) {
                    field.onBlur();
                  }
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {field.value.map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex items-center gap-1.5 rounded bg-[#F0EDED] px-2.5 py-1 text-xs font-medium text-[#1C1B1B]"
                    >
                      {technology}

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          field.onChange(
                            field.value.filter(
                              (item) => item !== technology,
                            ),
                          )
                        }
                        aria-label={`Hapus ${technology}`}
                        className="rounded hover:text-red-600"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}

                  <input
                    id="technology-input"
                    type="text"
                    list="technology-suggestions"
                    placeholder="+ Tambah teknologi"
                    value={techInput}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setTechInput(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addTechnology(techInput);
                      }
                    }}
                    className="h-7 min-w-36 flex-1 bg-transparent px-2 text-xs outline-none placeholder:text-[#717784]"
                  />

                  <datalist id="technology-suggestions">
                    {technologyOptions.map((tech) => (
                      <option key={tech} value={tech} />
                    ))}
                  </datalist>
                </div>
              </div>
            );
          }}
        />

        <p className="mt-1.5 text-[11px] leading-5 text-[#414752]">
          Ketik nama teknologi, lalu tekan Enter untuk
          menambahkannya.
        </p>

        {errors.technologies && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.technologies.message}
          </p>
        )}
      </div>
    </FormSection>
  );
}
