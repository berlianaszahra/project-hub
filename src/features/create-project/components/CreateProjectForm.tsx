"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  type CreateProjectFormData,
  createProjectSchema,
} from "../schemas/project.schema";

import type { CreateProjectHandler } from "../types/create.project";

import ProjectBasicInfo from "./ProjectBasicInfo";
import ProjectCommitment from "./ProjectCommitment";
import ProjectLinks from "./ProjectLinks";
import ProjectRecruitment from "./ProjectRecruitment";

type CreateProjectFormProps = {
  onCreateProject?: CreateProjectHandler;
};

const defaultValues: CreateProjectFormData = {
  name: "",
  category: "",
  shortDescription: "",
  background: "",
  technologies: [],

  positions: [
    {
      title: "",
      quota: 1,
      description: "",
      skills: "",
    },
  ],

  isRecruiting: true,
  recruitmentDeadline: "",
  commitment: "",
  links: [],
  additionalNotes: "",
};

export default function CreateProjectForm({
  onCreateProject,
}: CreateProjectFormProps) {
  const [success, setSuccess] = useState(false);

  const methods = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    mode: "onBlur",
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateProjectFormData) => {
    clearErrors("root");
    setSuccess(false);

    if (!onCreateProject) {
      setError("root", {
        message: "Layanan pembuatan project belum terhubung ke backend.",
      });
      return;
    }

    try {
      await onCreateProject(data);

      setSuccess(true);
      reset(defaultValues);
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
    <div className="mx-auto w-full max-w-[860px] pb-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-7 flex flex-wrap items-center gap-2 text-sm"
      >
        <Link href="/katalog" className="text-[#414752] hover:text-[#005DA9]">
          Eksplorasi
        </Link>

        <span className="text-[#C0C7D4]">/</span>

        <Link
          href="/projek-saya"
          className="text-[#414752] hover:text-[#005DA9]"
        >
          Project Saya
        </Link>

        <span className="text-[#C0C7D4]">/</span>

        <span className="font-medium text-[#1C1B1B]">Buat Project Baru</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#A3F2D7] px-3 py-1 text-xs font-medium text-[#002018]">
            <span className="size-1.5 rounded-full bg-[#0C6854]" />
            Mulai Kolaborasi Baru
          </span>

          <span className="text-[11px] uppercase tracking-wider text-[#414752]">
            BCC ProjectHub
          </span>
        </div>

        <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.8px] text-[#1C1B1B] sm:text-[32px]">
          Buat Project Baru
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#414752] sm:text-base">
          Bagikan ide project, tentukan kebutuhan tim, dan mulai membangun
          kolaborasi bersama komunitas BCC.
        </p>
      </header>

      {/* React Hook Form Provider */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <ProjectBasicInfo />

          <ProjectRecruitment />

          <ProjectCommitment />

          <ProjectLinks />

          {/* API Error */}
          {errors.root?.message && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {errors.root.message}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <output className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Project berhasil dibuat.
            </output>
          )}

          {/* Form Actions */}
          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#EAE7E7] pt-6 sm:flex-row sm:items-center">
            <Link
              href="/projek-saya"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DCE2E9] bg-white px-5 text-sm font-medium text-[#414752] transition hover:bg-[#F6F3F2]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Batal
            </Link>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  reset(defaultValues);
                  setSuccess(false);
                }}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-[#DCE2E9] bg-white px-5 text-sm font-medium text-[#414752] hover:bg-[#F6F3F2] disabled:opacity-50 sm:flex-none"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting || success}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#005DA9] px-5 text-sm font-medium text-white transition hover:bg-[#004B89] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                <Plus size={16} aria-hidden="true" />
                {isSubmitting ? "Menyimpan..." : "Buat Project"}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
