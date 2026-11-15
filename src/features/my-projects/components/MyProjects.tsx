"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";

import KatalogHeader from "@/features/product-katalog/components/KatalogHeader";
import KatalogSidebar from "@/features/product-katalog/components/KatalogSidebar";

import {
  managedProject as sampleManagedProjects,
  joinedProject as sampleJoinedProjects,
  projectApplication as sampleApplications,
} from "../data/myProjects";

import type {
  ManagedProject,
  JoinedProject,
  ProjectApplication,
} from "../types/projects";

import ProjectSection from "./ProjectSection";
import ManagedProjectCard from "./ManagedProjectCard";
import JoinedProjectCard from "./JoinedProjectCard";
import ApplicationStatusCard from "./ApplicationStatusCard";

type MyProjectsProps = {
  managedProjects?: ManagedProject[];
  joinedProjects?: JoinedProject[];
  applications?: ProjectApplication[];

  onManageProject?: (project: ManagedProject) => void;
  onReviewApplicants?: (project: ManagedProject) => void;
  onOpenWorkspace?: (project: JoinedProject) => void;
  onViewTasks?: (project: JoinedProject) => void;
  onViewApplications?: () => void;
};

export default function MyProjects({
  managedProjects = sampleManagedProjects,
  joinedProjects = sampleJoinedProjects,
  applications = sampleApplications,
  onManageProject,
  onReviewApplicants,
  onOpenWorkspace,
  onViewTasks,
  onViewApplications,
}: MyProjectsProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1B1B]">
      {/* Shared Sidebar */}
      <KatalogSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-w-0 lg:pl-60">
        {/* Shared Header */}
        <KatalogHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-8 sm:px-6 lg:pt-10">
          {/* Page Header */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mb-2 flex items-center gap-1.5 text-sm"
              >
                <Link
                  href="/katalog"
                  className="text-[#414752] transition hover:text-[#005DA9]"
                >
                  Eksplorasi
                </Link>

                <span className="text-[#C0C7D4]">/</span>

                <span
                  aria-current="page"
                  className="font-medium text-[#1C1B1B]"
                >
                  Project Saya
                </span>
              </nav>

              <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.8px] sm:text-[32px]">
                Project Saya
              </h1>

              <p className="mt-2 text-sm leading-[22px] text-[#414752]">
                Kelola kontribusi dan kolaborasi project Anda.
              </p>
            </div>

            {/* Create Project Button */}
            <Link
              href="/project-saya/buat"
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#005DA9] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#004B89] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005DA9]"
            >
              <Plus size={16} aria-hidden="true" />
              Buat Project Baru
            </Link>
          </div>

          {/* Project Sections */}
          <div className="space-y-10">
            {/* Managed Projects */}
            <ProjectSection
              title="Project yang Saya Kelola"
              badge={`${managedProjects.length} Project`}
              subtitle="Sebagai Lead"
            >
              {managedProjects.length > 0 ? (
                <div className="space-y-4">
                  {managedProjects.map((project) => (
                    <ManagedProjectCard
                      key={project.id}
                      project={project}
                      onManage={onManageProject}
                      onReview={onReviewApplicants}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#EAE7E7] bg-[#FAF9F8] p-8 text-center">
                  <p className="text-sm font-semibold text-[#1C1B1B]">
                    Belum ada project yang dikelola
                  </p>

                  <p className="mt-2 text-xs text-[#717784]">
                    Project yang Anda pimpin akan muncul di sini.
                  </p>

                  <Link
                    href="/project-saya/buat"
                    className="mt-4 inline-block text-sm font-medium text-[#005DA9] hover:underline"
                  >
                    Buat Project Pertama
                  </Link>
                </div>
              )}
            </ProjectSection>

            {/* Joined Projects */}
            <ProjectSection
              title="Project yang Saya Ikuti"
              badge={`${joinedProjects.length} Project`}
              subtitle="Sebagai Member"
            >
              {joinedProjects.length > 0 ? (
                <div className="space-y-4">
                  {joinedProjects.map((project) => (
                    <JoinedProjectCard
                      key={project.id}
                      project={project}
                      onOpen={onOpenWorkspace}
                      onViewTasks={onViewTasks}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#EAE7E7] bg-[#FAF9F8] p-8 text-center">
                  <p className="text-sm font-semibold text-[#1C1B1B]">
                    Belum mengikuti project
                  </p>

                  <p className="mt-2 text-xs text-[#717784]">
                    Temukan project untuk mulai berkolaborasi.
                  </p>

                  <Link
                    href="/katalog"
                    className="mt-4 inline-block text-sm font-medium text-[#005DA9] hover:underline"
                  >
                    Jelajahi Katalog
                  </Link>
                </div>
              )}
            </ProjectSection>

            {/* Application Status */}
            <ApplicationStatusCard
              applications={applications}
              onViewApplications={onViewApplications}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
