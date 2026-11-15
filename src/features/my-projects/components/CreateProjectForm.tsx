"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Code2,
  Palette,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { projectCategories, technologyOptions } from "../data/projectOptions";
import {
  type CreateProjectFormData,
  createProjectSchema,
  projectDraftSchema,
} from "../schemas/project.schema";
import ProjectLinksEditor from "./ProjectLinksEditor";

type Props = {
  onCreateProject?: (data: CreateProjectFormData) => Promise<void> | void;
};
const inputClass =
  "w-full rounded-md border border-transparent bg-white px-3 py-2.5 text-xs text-[#1C1B1B] outline-none placeholder:text-[#9298A3] focus:border-[#0076D3]";
const labelClass = "mb-1.5 block text-xs font-medium";
const defaults: CreateProjectFormData = {
  name: "",
  category: "web",
  description: "",
  purpose: "",
  technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Figma"],
  isRecruiting: true,
  links: [],
  positions: [
    {
      title: "Frontend Developer",
      division: "Engineering",
      count: 2,
      description:
        "Mengembangkan antarmuka web, integrasi API sistem autentikasi, serta memastikan performa akses responsif.",
      skills: "React, TypeScript, Tailwind CSS",
    },
    {
      title: "UI/UX Designer",
      division: "Product Design",
      count: 1,
      description:
        "Merancang alur wireframe, prototipe interaktif Figma, dan panduan desain konten terintegrasi.",
      skills: "Figma, User Research, Wireframing",
    },
  ],
};
function ErrorText({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  ) : null;
}

export default function CreateProjectForm({ onCreateProject }: Props) {
  const [technology, setTechnology] = useState("");
  const [notice, setNotice] = useState("");
  const [linksVersion, setLinksVersion] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    mode: "onBlur",
    defaultValues: defaults,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions",
  });
  const description = useWatch({ control, name: "description" });
  const recruiting = useWatch({ control, name: "isRecruiting" });
  async function submit(data: CreateProjectFormData) {
    setNotice("");
    clearErrors("root");
    if (!onCreateProject) {
      setError("root", {
        message:
          "Layanan pembuatan project belum terhubung. Kamu dapat menyimpan formulir sebagai draf di perangkat ini.",
      });
      return;
    }
    try {
      await onCreateProject(data);
      setNotice("Project berhasil dibuat.");
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Gagal membuat project. Silakan coba lagi.",
      });
    }
  }
  function saveDraft() {
    clearErrors("root");
    try {
      localStorage.setItem(
        "projecthub:create-project-draft",
        JSON.stringify(getValues()),
      );
      setNotice("Draf disimpan di perangkat ini.");
    } catch {
      setError("root", {
        message: "Draf gagal disimpan. Periksa penyimpanan browser kamu.",
      });
    }
  }
  function restoreDraft() {
    try {
      const raw = localStorage.getItem("projecthub:create-project-draft");
      if (!raw) {
        setNotice("Belum ada draf tersimpan.");
        return;
      }
      const parsed = projectDraftSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) {
        setNotice(
          "Format draf tidak valid. Formulir saat ini tetap dipertahankan.",
        );
        return;
      }
      reset(parsed.data);
      setLinksVersion((version) => version + 1);
      setTechnology("");
      setNotice("Draf berhasil dimuat.");
    } catch {
      setNotice("Draf tidak dapat dibaca.");
    }
  }
  return (
    <div className="mx-auto w-full max-w-[880px]">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-[#555965]">
        Ruang Kerja /{" "}
        <Link href="/projek-saya" className="hover:underline">
          Project Saya
        </Link>{" "}
        / <span className="text-[#1C1B1B]">Buat Project Baru</span>
      </nav>
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <label className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[#A3F2D7] px-2 py-1 text-[10px] text-[#08634F]">
            <input
              type="checkbox"
              {...register("isRecruiting")}
              className="size-3 accent-[#087663]"
            />
            Status Awal: Rekrutmen {recruiting ? "Terbuka" : "Ditutup"}
          </label>
          <span className="text-[10px] tracking-wider text-[#717784]">
            DOKUMEN PERENCANAAN
          </span>
        </div>
        <h1 className="text-[30px] font-semibold tracking-tight">
          Buat Project Baru
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-[#555965]">
          Mulai dari ide, lalu bangun timmu bersama talenta komunitas BCC. Buat
          ruang kerja dan buka posisi rekrutmen terarah.
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-8">
        <fieldset
          disabled={isSubmitting}
          className="space-y-8 disabled:opacity-70"
        >
          <legend className="sr-only">Perencanaan project baru</legend>
          <section
            className="space-y-4 rounded-xl bg-[#F6F3F2] p-5 sm:p-6"
            aria-labelledby="info-title"
          >
            <div className="flex justify-between gap-3">
              <h2 id="info-title" className="text-base font-semibold">
                <span className="mr-2 text-xs text-[#0076D3]">1</span>Informasi
                Project
              </h2>
              <span className="text-[10px] text-[#717784]">
                Informasi dasar
              </span>
            </div>
            <div>
              <label htmlFor="name" className={labelClass}>
                Nama Project <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                {...register("name")}
                aria-invalid={!!errors.name}
                placeholder="Contoh: CampusConnect, StudySpace Platform..."
                className={inputClass}
              />
              <ErrorText message={errors.name?.message} />
            </div>
            <div>
              <label htmlFor="category" className={labelClass}>
                Kategori & Klaster Spesialisasi{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                {...register("category")}
                className={inputClass}
              >
                {projectCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.value === "web"
                      ? "Web Development & Community Platform"
                      : category.label}
                  </option>
                ))}
              </select>
              <ErrorText message={errors.category?.message} />
            </div>
            <div>
              <div className="flex justify-between gap-2">
                <label htmlFor="description" className={labelClass}>
                  Deskripsi Singkat <span className="text-red-600">*</span>
                </label>
                <span className="text-[10px] text-[#717784]">
                  {description.length} / 140 karakter
                </span>
              </div>
              <input
                id="description"
                maxLength={140}
                {...register("description")}
                aria-invalid={!!errors.description}
                placeholder="Jelaskan esensi produkmu dalam maksimal 140 karakter untuk ringkasan katalog..."
                className={inputClass}
              />
              <ErrorText message={errors.description?.message} />
            </div>
            <div>
              <label htmlFor="purpose" className={labelClass}>
                Tujuan & Latar Belakang Project
              </label>
              <textarea
                id="purpose"
                {...register("purpose")}
                rows={4}
                placeholder="Masalah spesifik apa yang ingin kamu selesaikan? Apa tujuan utama kolaborasi dan hasil deliverable akhir tim?"
                className={`${inputClass} resize-y leading-6`}
              />
              <ErrorText message={errors.purpose?.message} />
            </div>
            <Controller
              control={control}
              name="technologies"
              render={({ field }) => (
                <div>
                  <label htmlFor="technology" className={labelClass}>
                    Tech Stack & Tooling Utama
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 rounded-md bg-white p-2">
                    {field.value.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded bg-[#F0EEEE] px-2 py-1 text-[11px]"
                      >
                        {tech}
                        <button
                          type="button"
                          aria-label={`Hapus ${tech}`}
                          onClick={() =>
                            field.onChange(
                              field.value.filter((value) => value !== tech),
                            )
                          }
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                    <input
                      id="technology"
                      list="technology-options"
                      placeholder="+ Tambah Keahlian"
                      value={technology}
                      onChange={(event) => setTechnology(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          const value = technology.trim();
                          if (value && !field.value.includes(value))
                            field.onChange([...field.value, value]);
                          setTechnology("");
                        }
                      }}
                      className="min-w-32 flex-1 px-2 py-1 text-xs outline-none"
                    />
                    <datalist id="technology-options">
                      {technologyOptions.map((tech) => (
                        <option key={tech} value={tech} />
                      ))}
                    </datalist>
                  </div>
                  <p className="mt-2 text-[10px] text-[#717784]">
                    Tekan Enter pada kolom teks untuk menambahkan keahlian atau
                    perkakas teknis baru.
                  </p>
                  <ErrorText message={errors.technologies?.message} />
                </div>
              )}
            />
          </section>
          <section
            aria-labelledby="positions-title"
            className="rounded-xl bg-[#F6F3F2] p-5 sm:p-6"
          >
            <div className="flex justify-between gap-3">
              <h2 id="positions-title" className="text-base font-semibold">
                <span className="mr-2 text-xs text-[#0076D3]">2</span>Kebutuhan
                Tim & Posisi Terbuka
              </h2>
              <span className="shrink-0 text-[10px] text-[#717784]">
                {fields.length} Posisi Aktif
              </span>
            </div>
            <p className="mb-4 mt-1 text-xs text-[#555965]">
              Tentukan peran dan keahlian yang dibutuhkan untuk bergabung ke
              dalam tim proyekmu.
            </p>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <fieldset key={field.id} className="rounded-lg bg-white p-4">
                  <legend className="sr-only">Posisi {index + 1}</legend>
                  <div className="flex items-start gap-2">
                    {field.division === "Product Design" ? (
                      <Palette
                        size={18}
                        className="mt-2 shrink-0 text-[#0076D3]"
                      />
                    ) : (
                      <Code2
                        size={18}
                        className="mt-2 shrink-0 text-[#0076D3]"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <input
                        aria-label={`Nama posisi ${index + 1}`}
                        {...register(`positions.${index}.title`)}
                        className="w-full rounded border border-transparent px-1 py-1 text-xs font-medium outline-none focus:border-[#0076D3]"
                      />
                      <input
                        aria-label={`Divisi posisi ${index + 1}`}
                        {...register(`positions.${index}.division`)}
                        className="w-full rounded border border-transparent px-1 text-[10px] text-[#717784] outline-none focus:border-[#0076D3]"
                      />
                    </div>
                    <label className="flex items-center gap-1 rounded bg-[#F0EEEE] px-2 py-1 text-[10px]">
                      <input
                        type="number"
                        min={1}
                        max={50}
                        aria-label={`Jumlah anggota posisi ${index + 1}`}
                        {...register(`positions.${index}.count`, {
                          valueAsNumber: true,
                        })}
                        className="w-8 bg-transparent outline-none"
                      />
                      Orang
                    </label>
                    <button
                      type="button"
                      aria-label={`Hapus posisi ${index + 1}`}
                      onClick={() => remove(index)}
                      className="p-1 text-[#717784]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    aria-label={`Deskripsi posisi ${index + 1}`}
                    {...register(`positions.${index}.description`)}
                    rows={2}
                    className="mt-2 w-full resize-y rounded border border-transparent p-1 text-xs leading-5 text-[#555965] outline-none focus:border-[#0076D3]"
                  />
                  <label className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#717784]">
                    Keahlian Wajib:
                    <input
                      {...register(`positions.${index}.skills`)}
                      className="min-w-40 flex-1 rounded bg-[#F6F3F2] px-2 py-1 text-[11px] text-[#1C1B1B] outline-none focus:ring-1 focus:ring-[#0076D3]"
                    />
                  </label>
                  {(
                    [
                      "title",
                      "division",
                      "count",
                      "description",
                      "skills",
                    ] as const
                  ).map((key) => (
                    <ErrorText
                      key={key}
                      message={errors.positions?.[index]?.[key]?.message}
                    />
                  ))}
                </fieldset>
              ))}
            </div>
            <ErrorText
              message={
                errors.positions?.root?.message ?? errors.positions?.message
              }
            />
            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  division: "",
                  count: 1,
                  description: "",
                  skills: "",
                })
              }
              className="mt-4 flex w-full items-center justify-center gap-1 rounded-md bg-[#EDE9E9] px-3 py-3 text-xs"
            >
              <PlusCircle size={14} className="text-[#0076D3]" />
              Tambah Kebutuhan Posisi Lainnya
            </button>
          </section>
          <Controller
            control={control}
            name="links"
            render={({ field }) => (
              <ProjectLinksEditor
                key={linksVersion}
                links={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            )}
          />
        </fieldset>
        {errors.root?.message && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {errors.root.message}
          </p>
        )}
        {notice && (
          <output className="block rounded-lg bg-[#E1FBF1] p-3 text-sm text-[#08634F]">
            {notice}
          </output>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 pt-2">
          <Link href="/projek-saya" className="px-3 text-xs hover:underline">
            Batal
          </Link>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={restoreDraft}
              className="px-2 text-xs text-[#005DA9] hover:underline"
            >
              Muat Draf
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={saveDraft}
              className="rounded-md bg-[#F6F3F2] px-4 py-2.5 text-xs"
            >
              Simpan sebagai Draf
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 rounded-md bg-[#0076D3] px-4 py-2.5 text-xs text-white disabled:opacity-50"
            >
              {isSubmitting
                ? "Menyimpan..."
                : recruiting
                  ? "Buat & Buka Rekrutmen"
                  : "Buat Project"}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
