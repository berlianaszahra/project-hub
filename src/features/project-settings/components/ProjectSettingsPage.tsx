
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import KatalogSidebar from "@/features/product-katalog/components/KatalogSidebar";
import KatalogHeader from "@/features/product-katalog/components/KatalogHeader";

import {
  projectSettingsSchema,
  type ProjectSettingsFormData,
} from "../schemas/projectSettings.schema";

import { sampleProjectSettings } from "../data/projectSettingsData";

import type {
  ProjectSettingsData,
  ProjectActionHandler,
  SaveProjectSettingsHandler,
  TransferOwnershipHandler,
} from "../types/projectSettings";

import ProjectSettingsHeader from "./ProjectSettingsHeader";
import ProjectSettingsTabs from "./ProjectSettingsTabs";
import ProjectIdentityForm from "./ProjectIdentityForm";
import ProjectRecruitmentSettings from "./ProjectRecruitmentSettings";
import ProjectLeadershipSettings from "./ProjectLeadershipSettings";
import ProjectDangerZone from "./ProjectDangerZone";
import SettingsActionBar from "./SettingsActionBar";

type ProjectSettingsPageProps = {
  projectId: string;
  project?: ProjectSettingsData;
  onSaveSettings?: SaveProjectSettingsHandler;
  onTransferOwnership?: TransferOwnershipHandler;
  onArchiveProject?: ProjectActionHandler;
  onDeleteProject?: ProjectActionHandler;
};

export default function ProjectSettingsPage({
  projectId,
  project,
  onSaveSettings,
  onTransferOwnership,
  onArchiveProject,
  onDeleteProject,
}: ProjectSettingsPageProps) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [currentProject, setCurrentProject] =
    useState<ProjectSettingsData | null>(
      project ??
        (projectId === sampleProjectSettings.id
          ? sampleProjectSettings
          : null),
    );

  useEffect(() => {
    setCurrentProject(
      project ??
        (projectId === sampleProjectSettings.id
          ? sampleProjectSettings
          : null),
    );
  }, [projectId, project]);

  const methods = useForm<ProjectSettingsFormData>({
    resolver: zodResolver(projectSettingsSchema),
    mode: "onBlur",
    defaultValues:
      currentProject?.settings ?? {
        name: "",
        category: "",
        shortDescription: "",
        description: "",
        technologies: [],
        links: [],
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
    formState: {
      errors,
      isDirty,
      isSubmitting,
    },
  } = methods;

  useEffect(() => {
    if (currentProject) {
      reset(currentProject.settings);
    }
  }, [currentProject, reset]);

  const onSubmit = async (
    data: ProjectSettingsFormData,
  ) => {
    if (!currentProject) return;

    setSuccess(false);
    clearErrors("root");

    if (!onSaveSettings) {
      setError("root", {
        message:
          "Layanan penyimpanan pengaturan proyek belum terhubung ke backend.",
      });
      return;
    }

    if (data.maxMembers < currentProject.memberCount) {
      setError("maxMembers", {
        message:
          "Kuota tidak boleh lebih kecil dari jumlah anggota yang sudah bergabung.",
      });
      return;
    }

    try {
      await onSaveSettings(currentProject.id, data);

      setCurrentProject({
        ...currentProject,
        name: data.name,
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
              : "member",
        })),
      });
    }

    router.push("/projek-saya");
  };

  const handleArchive: ProjectActionHandler = async (
    id,
  ) => {
    if (!onArchiveProject) {
      throw new Error(
        "Layanan pengarsipan belum terhubung ke backend.",
      );
    }

    await onArchiveProject(id);
    router.push("/projek-saya");
  };

  const handleDelete: ProjectActionHandler = async (
    id,
  ) => {
    if (!onDeleteProject) {
      throw new Error(
        "Layanan penghapusan belum terhubung ke backend.",
      );
    }

    await onDeleteProject(id);
    router.push("/projek-saya");
  };

  if (!currentProject) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-xl font-semibold">
          Proyek tidak ditemukan
        </h1>

        <p className="mt-2 text-sm text-[#414752]">
          Data proyek dengan ID "{projectId}" belum
          tersedia pada frontend.
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1C1B1B]">
      {/* Shared Sidebar */}
      <KatalogSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 lg:pl-60">
        {/* Shared Header */}
        <KatalogHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto w-full max-w-[992px]">
            <ProjectSettingsHeader
              project={currentProject}
            />

            <div className="mt-6">
              <ProjectSettingsTabs />
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Section 1 */}
                <ProjectIdentityForm
                  iconUrl={currentProject.iconUrl}
                  bannerUrl={currentProject.bannerUrl}
                />

                {/* Section 2 */}
                <ProjectRecruitmentSettings
                  currentMemberCount={
                    currentProject.memberCount
                  }
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
                  <p
                    role="status"
                    className="mb-5 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-700"
                  >
                    Pengaturan proyek berhasil diperbarui.
                  </p>
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
        </main>
      </div>
    </div>
  );
}
