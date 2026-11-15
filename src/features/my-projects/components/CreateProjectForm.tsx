
"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Plus } from "lucide-react";

import {
  createProjectSchema,
  type CreateProjectFormData,
} from "../schemas/project.schema";

import {
  projectCategories,
  technologyOptions,
} from "../data/projectOptions";

type CreateProjectFormProps = {
  onCreateProject?: (
    data: CreateProjectFormData,
  ) => Promise<void> | void;
};

const inputClass =
  "h-11 w-full rounded-lg border border-[#DCE2E9] bg-white px-3.5 text-sm text-[#1C1B1B] outline-none transition placeholder:text-[#A3AAB5] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10";

const labelClass =
  "mb-2 block text-sm font-medium text-[#344054]";

export default function CreateProjectForm({
  onCreateProject,
}: CreateProjectFormProps) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      category: "",
      technologies: [],
      maxMembers: 5,
      isRecruiting: true,
    },
  });

  const onSubmit = async (data: CreateProjectFormData) => {
    clearErrors("root");
    setSuccess(false);

    if (!onCreateProject) {
      setError("root", {
        message: "Layanan pembuatan project belum terhubung.",
      });
      return;
    }

    try {
      await onCreateProject(data);
      setSuccess(true);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Gagal membuat project. Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Breadcrumb */}
      <Link
        href="/project-saya"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#414752] transition hover:text-[#005DA9]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Kembali ke Project Saya
      </Link>

      {/* Page Heading */}
      <div className="mb-7">
        <h1 className="text-[30px] font-semibold tracking-[-0.8px] text-[#1C1B1B] sm:text-[32px]">
          Buat Project Baru
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#414752]">
          Lengkapi informasi project untuk memulai
          kolaborasi bersama komunitas BCC.
        </p>
      </div>

      {/* Form Card */}
      <section className="rounded-xl border border-[#EAE7E7] bg-white shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-7 p-5 sm:p-8"
        >
          {/* Section: Basic Information */}
          <div className="border-b border-[#EAE7E7] pb-5">
            <h2 className="text-lg font-semibold text-[#1C1B1B]">
              Informasi Dasar
            </h2>

            <p className="mt-1 text-sm text-[#717784]">
              Berikan identitas dan gambaran umum project.
            </p>
          </div>

          {/* Project Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Nama Project
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              placeholder="Contoh: CampusConnect"
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={
                errors.name ? "name-error" : undefined
              }
              {...register("name")}
              className={`${inputClass} ${
                errors.name ? "border-red-500" : ""
              }`}
            />

            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-xs text-red-600"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Deskripsi Project
              <span className="ml-1 text-red-500">*</span>
            </label>

            <textarea
              id="description"
              rows={5}
              placeholder="Ceritakan tujuan, manfaat, dan gambaran project..."
              disabled={isSubmitting}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description
                  ? "description-error"
                  : undefined
              }
              {...register("description")}
              className={`w-full resize-y rounded-lg border border-[#DCE2E9] bg-white px-3.5 py-3 text-sm leading-6 text-[#1C1B1B] outline-none transition placeholder:text-[#A3AAB5] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10 ${
                errors.description ? "border-red-500" : ""
              }`}
            />

            <p className="mt-1 text-xs text-[#717784]">
              Minimal 20 karakter dan maksimal 1000 karakter.
            </p>

            {errors.description && (
              <p
                id="description-error"
                role="alert"
                className="mt-1.5 text-xs text-red-600"
              >
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Kategori Project
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              id="category"
              disabled={isSubmitting}
              aria-invalid={!!errors.category}
              {...register("category")}
              className={`${inputClass} ${
                errors.category ? "border-red-500" : ""
              }`}
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
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Technology */}
          <div>
            <div className="mb-3">
              <h2 className="text-sm font-medium text-[#344054]">
                Teknologi yang Digunakan
                <span className="ml-1 text-red-500">*</span>
              </h2>

              <p className="mt-1 text-xs text-[#717784]">
                Pilih satu atau lebih teknologi.
              </p>
            </div>

            <Controller
              name="technologies"
              control={control}
              render={({ field }) => (
                <div
                  role="group"
                  aria-label="Pilihan teknologi"
                  aria-invalid={!!errors.technologies}
                  className="flex flex-wrap gap-2"
                >
                  {technologyOptions.map((tech) => {
                    const selected = field.value.includes(tech);

                    return (
                      <button
                        key={tech}
                        type="button"
                        disabled={isSubmitting}
                        aria-pressed={selected}
                        onClick={() => {
                          const next = selected
                            ? field.value.filter(
                                (item) => item !== tech,
                              )
                            : [...field.value, tech];

                          field.onChange(next);
                          field.onBlur();
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition disabled:opacity-50 ${
                          selected
                            ? "border-[#005DA9] bg-[#EAF4FF] text-[#005DA9]"
                            : "border-[#EAE7E7] bg-white text-[#414752] hover:border-[#005DA9]/40"
                        }`}
                      >
                        {selected && (
                          <Check size={13} aria-hidden="true" />
                        )}
                        {tech}
                      </button>
                    );
                  })}
                </div>
              )}
            />

            {errors.technologies && (
              <p role="alert" className="mt-2 text-xs text-red-600">
                {errors.technologies.message}
              </p>
            )}
          </div>

          {/* Team Settings */}
          <div className="border-b border-[#EAE7E7] pb-5">
            <h2 className="text-lg font-semibold text-[#1C1B1B]">
              Pengaturan Tim
            </h2>

            <p className="mt-1 text-sm text-[#717784]">
              Tentukan kapasitas dan status rekrutmen.
            </p>
          </div>

          {/* Maximum Members */}
          <div>
            <label htmlFor="maxMembers" className={labelClass}>
              Maksimal Anggota Tim
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="maxMembers"
              type="number"
              min={2}
              max={50}
              step={1}
              disabled={isSubmitting}
              aria-invalid={!!errors.maxMembers}
              {...register("maxMembers", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />

            <p className="mt-1 text-xs text-[#717784]">
              Jumlah anggota termasuk Lead Project.
            </p>

            {errors.maxMembers && (
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.maxMembers.message}
              </p>
            )}
          </div>

          {/* Recruiting Toggle */}
          <div className="rounded-lg bg-[#F6F3F2] p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                disabled={isSubmitting}
                {...register("isRecruiting")}
                className="mt-0.5 size-4 accent-[#005DA9]"
              />

              <span>
                <span className="block text-sm font-medium text-[#1C1B1B]">
                  Buka Rekrutmen Anggota
                </span>

                <span className="mt-1 block text-xs leading-5 text-[#717784]">
                  Izinkan anggota komunitas untuk mengajukan
                  permintaan bergabung ke project ini.
                </span>
              </span>
            </label>
          </div>

          {/* API Error */}
          {errors.root?.message && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {errors.root.message}
            </p>
          )}

          {/* Success */}
          {success && (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
            >
              Project berhasil dibuat.
            </p>
          )}

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#EAE7E7] pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/project-saya"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DCE2E9] bg-white px-5 text-sm font-medium text-[#414752] transition hover:bg-[#F6F3F2]"
            >
              Batal
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#005DA9] px-5 text-sm font-medium text-white transition hover:bg-[#004B89] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={16} aria-hidden="true" />
              {isSubmitting
                ? "Menyimpan..."
                : "Buat Project"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
