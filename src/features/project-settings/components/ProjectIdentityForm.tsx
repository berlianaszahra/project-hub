"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  linkPlatformOptions,
  projectCategoryOptions,
} from "../data/projectSettingsData";
import type { ProjectSettingsFormData } from "../schemas/projectSettings.schema";
import ProjectMediaSettings from "./ProjectMediaSettings";

type ProjectIdentityFormProps = {
  iconUrl?: string;
  bannerUrl?: string;
  onIconChange?: (file: File | null) => void;
  onBannerChange?: (file: File | null) => void;
};

const inputClass =
  "w-full rounded border border-[#E5E2E1] bg-white px-3 py-2 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10";

const labelClass = "mb-1.5 block text-sm font-medium text-[#1C1B1B]";

export default function ProjectIdentityForm({
  iconUrl,
  bannerUrl,
  onIconChange,
  onBannerChange,
}: ProjectIdentityFormProps) {
  const [techInput, setTechInput] = useState("");

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<ProjectSettingsFormData>();

  const shortDescription =
    useWatch({ control, name: "shortDescription" }) || "";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <section id="identitas" className="scroll-mt-8 space-y-6 py-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-[#005DA9]">
          Bagian 01
        </p>

        <h2 className="mt-3 text-lg font-semibold text-[#1C1B1B]">
          Informasi Dasar & Identitas Proyek
        </h2>

        <p className="mt-1 text-sm text-[#414752]">
          Tampilan profil proyek pada katalog publik BCC ProjectHub dan ruang
          kerja kolaborator.
        </p>
      </div>

      <ProjectMediaSettings
        iconUrl={iconUrl}
        bannerUrl={bannerUrl}
        onIconChange={onIconChange}
        onBannerChange={onBannerChange}
      />

      {/* Nama & Kategori */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="settings-name" className={labelClass}>
            Nama Proyek *
          </label>

          <input
            id="settings-name"
            disabled={isSubmitting}
            {...register("name")}
            className={inputClass}
          />

          {errors.name && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="settings-category" className={labelClass}>
            Klaster / Kategori Proyek *
          </label>

          <select
            id="settings-category"
            disabled={isSubmitting}
            {...register("category")}
            className={inputClass}
          >
            <option value="">Pilih kategori</option>

            {projectCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {errors.category && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Deskripsi Singkat */}
      <div>
        <div className="mb-1.5 flex justify-between gap-3">
          <label
            htmlFor="settings-short-description"
            className="text-sm font-medium"
          >
            Deskripsi Singkat *
          </label>

          <span className="text-xs text-[#717784]">
            {shortDescription.length}/140
          </span>
        </div>

        <textarea
          id="settings-short-description"
          rows={2}
          maxLength={140}
          disabled={isSubmitting}
          {...register("shortDescription")}
          className={`${inputClass} resize-y`}
        />

        <p className="mt-1 text-xs text-[#717784]">
          Teks ini muncul di kartu pratinjau halaman Katalog Proyek utama.
        </p>

        {errors.shortDescription && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Deskripsi */}
      <div>
        <label htmlFor="settings-description" className={labelClass}>
          Deskripsi Lengkap & Tujuan Proyek *
        </label>

        <textarea
          id="settings-description"
          rows={5}
          disabled={isSubmitting}
          {...register("description")}
          className={`${inputClass} resize-y leading-6`}
        />

        {errors.description && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Tech Stack */}
      <div>
        <label htmlFor="settings-technology" className={labelClass}>
          Tech Stack & Tooling *
        </label>

        <Controller
          name="technologies"
          control={control}
          render={({ field }) => {
            const addTechnology = () => {
              const value = techInput.trim();

              if (!value) return;

              if (
                !field.value.some(
                  (item) => item.toLowerCase() === value.toLowerCase(),
                )
              ) {
                field.onChange([...field.value, value]);
              }

              setTechInput("");
            };

            return (
              <div className="rounded border border-[#E5E2E1] bg-white p-3">
                <div className="flex flex-wrap gap-2">
                  {field.value.map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex items-center gap-2 rounded bg-[#F0EDED] px-2.5 py-1 text-xs"
                    >
                      {technology}

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          field.onChange(
                            field.value.filter((item) => item !== technology),
                          )
                        }
                        aria-label={`Hapus ${technology}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  id="settings-technology"
                  type="text"
                  value={techInput}
                  disabled={isSubmitting}
                  onChange={(event) => setTechInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTechnology();
                    }
                  }}
                  onBlur={field.onBlur}
                  placeholder="Ketik teknologi lalu tekan Enter"
                  className="mt-3 w-full bg-transparent text-sm outline-none"
                />
              </div>
            );
          }}
        />

        {errors.technologies && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.technologies.message}
          </p>
        )}
      </div>

      {/* External Links */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[#1C1B1B]">
            Tautan Eksternal Proyek
          </h3>

          <p className="mt-1 text-xs text-[#414752]">
            Repository, desain, dokumentasi, dan sumber daya proyek.
          </p>
        </div>

        <div className="overflow-hidden rounded border border-[#E5E2E1]">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-3 border-b border-[#E5E2E1] p-3 last:border-b-0 sm:grid-cols-[150px_1fr_auto]"
            >
              <div>
                <label
                  htmlFor={`settings-platform-${index}`}
                  className="mb-1 block text-xs"
                >
                  Platform
                </label>

                <select
                  id={`settings-platform-${index}`}
                  disabled={isSubmitting}
                  {...register(`links.${index}.platform`)}
                  className={inputClass}
                >
                  {linkPlatformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`settings-url-${index}`}
                  className="mb-1 block text-xs"
                >
                  URL
                </label>

                <input
                  id={`settings-url-${index}`}
                  type="url"
                  placeholder="https://..."
                  disabled={isSubmitting}
                  {...register(`links.${index}.url`)}
                  className={inputClass}
                />

                {errors.links?.[index]?.url && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.links[index]?.url?.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => remove(index)}
                aria-label={`Hapus tautan ${index + 1}`}
                className="self-end rounded p-2 text-[#717784] hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() =>
            append({
              platform: "github",
              url: "",
            })
          }
          className="inline-flex items-center gap-2 rounded border border-[#005DA9] px-3 py-2 text-xs font-medium text-[#005DA9] hover:bg-[#EAF4FF]"
        >
          <Plus size={14} />
          Tambah Tautan
        </button>
      </div>
    </section>
  );
}
