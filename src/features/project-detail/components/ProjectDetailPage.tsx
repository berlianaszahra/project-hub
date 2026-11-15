"use client";

import { ArrowLeft, Bookmark, GraduationCap, Link2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import KatalogHeader from "@/features/product-katalog/components/KatalogHeader";
import ProjectSidebar from "@/shared/components/ProjectSidebar";
import type { OpenPosition, ProjectDetail } from "../types/project-detail";
import ApplyPositionModal from "./ApplyPositionModal";
import ProjectAside from "./ProjectAside";
import ProjectOverview, { ProjectSummary } from "./ProjectOverview";
import ProjectPositions from "./ProjectPositions";

export default function ProjectDetailPage({
  project,
}: {
  project: ProjectDetail;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [position, setPosition] = useState<OpenPosition | null>(null);
  const recruiting = project.positions.some((p) => p.filled < p.capacity);
  useEffect(() => {
    try {
      const ids: unknown = JSON.parse(
        localStorage.getItem("projecthub:saved-projects") ?? "[]",
      );
      setSaved(Array.isArray(ids) && ids.includes(project.id));
    } catch {
      setSaved(false);
    }
  }, [project.id]);
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Tautan project berhasil disalin.");
    } catch {
      setNotice(
        "Tautan tidak dapat disalin. Salin alamat halaman dari browser.",
      );
    }
  }
  function toggleSaved() {
    try {
      const raw: unknown = JSON.parse(
        localStorage.getItem("projecthub:saved-projects") ?? "[]",
      );
      const ids = Array.isArray(raw)
        ? raw.filter((id): id is string => typeof id === "string")
        : [];
      const next = !ids.includes(project.id);
      localStorage.setItem(
        "projecthub:saved-projects",
        JSON.stringify(
          next ? [...ids, project.id] : ids.filter((id) => id !== project.id),
        ),
      );
      setSaved(next);
      setNotice(
        next
          ? "Project disimpan di perangkat ini."
          : "Project dihapus dari daftar tersimpan.",
      );
    } catch {
      setNotice("Daftar tersimpan tidak dapat diperbarui.");
    }
  }
  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1B1B]">
      <ProjectSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="min-w-0 lg:pl-60">
        <KatalogHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-[1280px] px-5 pb-16 pt-5 sm:px-6 lg:px-8">
          <Link
            href="/katalog"
            className="mb-4 inline-flex items-center gap-2 rounded py-1 text-sm font-medium text-[#005DA9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076D3]"
          >
            <ArrowLeft size={17} />
            Kembali ke Katalog Project
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="text-xs text-[#555965]">
              Ruang Kerja /{" "}
              <Link href="/katalog" className="hover:underline">
                Katalog Project
              </Link>{" "}
              / <span className="text-[#1C1B1B]">{project.name}</span>
            </nav>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1 rounded bg-[#F6F3F2] px-2 py-2 text-xs"
              >
                <Link2 size={13} />
                Bagikan
              </button>
              <button
                type="button"
                onClick={toggleSaved}
                aria-pressed={saved}
                className="inline-flex items-center gap-1 rounded bg-[#F6F3F2] px-2 py-2 text-xs"
              >
                <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
                {saved ? "Tersimpan" : "Simpan"}
              </button>
            </div>
          </div>
          {notice && (
            <output className="mt-3 block text-xs text-[#087663]">
              {notice}
            </output>
          )}
          <div className="mt-7 flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F0EEEE]">
              <GraduationCap size={30} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[30px] font-semibold leading-tight tracking-tight sm:text-[32px]">
                  {project.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] ${recruiting ? "bg-[#DDF8EE] text-[#087663]" : "bg-[#EAE7E7] text-[#717784]"}`}
                >
                  <span className="size-1 rounded-full bg-current" />
                  {recruiting ? "Perekrutan Aktif" : project.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#555965]">
                {project.description}
              </p>
            </div>
          </div>
          <ProjectSummary project={project} />
          <div className="mt-10 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_290px]">
            <div>
              <ProjectOverview project={project} />
              <ProjectPositions
                positions={project.positions}
                updatedAt={project.updatedAt}
                onApply={(value) => {
                  setPosition(value);
                }}
              />
            </div>
            <ProjectAside project={project} />
          </div>
        </main>
      </div>
      {position && (
        <ApplyPositionModal
          key={position.id}
          projectName={project.name}
          lead={project.owner}
          position={position}
          onClose={() => setPosition(null)}
        />
      )}
    </div>
  );
}
