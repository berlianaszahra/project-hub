"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { sampleProjectSettings } from "../data/projectSettingsData";
import {
  type ProjectSettingsFormData,
  projectSettingsSchema,
} from "../schemas/projectSettings.schema";

import type {
  ProjectActionHandler,
  ProjectSettingsData,
  SaveProjectSettingsHandler,
  TransferOwnershipHandler,
} from "../types/projectSettings";
import ProjectDangerZone from "./ProjectDangerZone";
import ProjectIdentityForm from "./ProjectIdentityForm";
import ProjectLeadershipSettings from "./ProjectLeadershipSettings";
import ProjectRecruitmentSettings from "./ProjectRecruitmentSettings";
import ProjectSettingsHeader from "./ProjectSettingsHeader";
import ProjectSettingsTabs from "./ProjectSettingsTabs";
import SettingsActionBar from "./SettingsActionBar";

type ProjectSettingsPageProps = {
  projectId: string;
  pendingApplicationCount?: number;
  project?: ProjectSettingsData;
  onSaveSettings?: SaveProjectSettingsHandler;
  onTransferOwnership?: TransferOwnershipHandler;
  onArchiveProject?: ProjectActionHandler;
  onDeleteProject?: ProjectActionHandler;
};

export default function ProjectSettingsPage({
  projectId,
  pendingApplicationCount = 0,
  project,
  onSaveSettings,
  onTransferOwnership,
  onArchiveProject,
  onDeleteProject,
}: ProjectSettingsPageProps) {
  const router = useRouter();

  const [success, setSuccess] = useState(false);

  const [currentProject, setCurrentProject] =
    useState<ProjectSettingsData | null>(
      project ??
        (projectId === sampleProjectSettings.id ? sampleProjectSettings : null),
    );

  useEffect(() => {
    setCurrentProject(
      project ??
        (projectId === sampleProjectSettings.id ? sampleProjectSettings : null),
    );
  }, [projectId, project]);

  const methods = useForm<ProjectSettingsFormData>({
    resolver: zodResolver(projectSettingsSchema),
    mode: "onBlur",
    defaultValues: currentProject?.settings ?? {
      name: "",
      category: "",
      shortDescription: "",
      description: "",
      technologies: [],
      links: [],
      status: "Active",
      isRecruiting: false,
      visibility: "private",
      maxMembers: 1,
      selectionAnnouncement: "",
    },
  });

  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isDirty, isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentProject) {
      reset(currentProject.settings);
    }
  }, [currentProject, reset]);

  const onSubmit = async (data: ProjectSettingsFormData) => {
    if (!currentProject) return;

    setSuccess(false);
    clearErrors("root");

    if (data.maxMembers < currentProject.memberCount) {
      setError("maxMembers", {
        message:
          "Kuota tidak boleh lebih kecil dari jumlah anggota yang sudah bergabung.",
      });
      return;
    }

    if (data.status === "Completed" && pendingApplicationCount > 0) {
      setError("status", {
        message:
          "Selesaikan seluruh pengajuan yang masih diproses sebelum menyelesaikan proyek.",
      });
      return;
    }

    if (!onSaveSettings) {
      setError("root", {
        message:
          "Layanan penyimpanan pengaturan proyek belum terhubung ke backend.",
      });
      return;
    }

    try {
      await onSaveSettings(currentProject.id, data);

      setCurrentProject({
        ...currentProject,
        name: data.name,
        status:
          data.status === "Recruiting"
            ? "recruiting"
            : data.status === "Completed"
              ? "completed"
              : "active",
        settings: data,
      });

      reset(data);
      setSuccess(true);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Gagal menyimpan perubahan proyek.",
      });
    }
  };

  const handleTransfer: TransferOwnershipHandler = async (
    id,
    targetMemberId,
  ) => {
    if (!onTransferOwnership) {
      throw new Error(
        "Layanan transfer kepemilikan belum terhubung ke backend.",
      );
    }

    const candidate = currentProject?.members.find(
      (item) =>
        item.id === targetMemberId &&
        item.status === "active" &&
        item.role === "member",
    );
    if (!candidate || id !== currentProject?.id)
      throw new Error(
        "Pilih anggota aktif pada proyek ini sebagai Lead pengganti.",
      );
    await onTransferOwnership(id, targetMemberId);

    const member = currentProject?.members.find(
      (item) => item.id === targetMemberId,
    );

    if (currentProject && member) {
      setCurrentProject({
        ...currentProject,
        leadId: member.id,
        leadName: member.name,
        members: currentProject.members.map((item) => ({
          ...item,
          role:
            item.id === member.id
              ? "lead"
              : item.id === currentProject.leadId
                ? "member"
                : item.role,
        })),
      });
    }

    router.push("/projek-saya");
  };

  const handleArchive: ProjectActionHandler = async (id) => {
    if (!onArchiveProject) {
      throw new Error("Layanan pengarsipan belum terhubung ke backend.");
    }

    await onArchiveProject(id);
    router.push("/projek-saya");
  };

  const handleDelete: ProjectActionHandler = async (id) => {
    if (!onDeleteProject) {
      throw new Error("Layanan penghapusan belum terhubung ke backend.");
    }

    await onDeleteProject(id);
    router.push("/projek-saya");
  };

  if (!currentProject) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-xl font-semibold">Proyek tidak ditemukan</h1>

        <p className="mt-2 text-sm text-[#414752]">
          Data proyek dengan ID "{projectId}" belum tersedia pada frontend.
        </p>
      </main>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[992px]">
      <ProjectSettingsHeader project={currentProject} />

      <div className="mt-6">
        <ProjectSettingsTabs />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Section 1 */}
          <ProjectIdentityForm
            iconUrl={currentProject.iconUrl}
            bannerUrl={currentProject.bannerUrl}
          />

          {/* Section 2 */}
          <ProjectRecruitmentSettings
            currentMemberCount={currentProject.memberCount}
            pendingApplicationCount={pendingApplicationCount}
          />

          {/* API Error */}
          {errors.root?.message && (
            <p
              role="alert"
              className="mb-5 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {errors.root.message}
            </p>
          )}

          {/* Success */}
          {success && (
            <output className="mb-5 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Pengaturan proyek berhasil diperbarui.
            </output>
          )}

          {/* Save / Cancel */}
          <SettingsActionBar
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            onCancel={() => {
              reset(currentProject.settings);
              clearErrors();
              setSuccess(false);
            }}
          />
        </form>
      </FormProvider>

      {/* Section 3 - Separate Action */}
      <ProjectLeadershipSettings
        projectId={currentProject.id}
        leadName={currentProject.leadName}
        members={currentProject.members}
        onTransfer={handleTransfer}
      />

      {/* Section 4 - Separate Actions */}
      <ProjectDangerZone
        projectId={currentProject.id}
        projectName={currentProject.name}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />
    </div>
  );
}
