"use client";

import { ArrowLeft, ExternalLink, Menu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { positionDefaults } from "@/features/project-positions/lib/positions";
import {
  type RecruitmentPosition,
  recruitmentPositionSchema,
} from "@/features/project-positions/schemas/position.schema";
import { applySelectionDecision } from "@/features/project-selection/lib/selection";
import {
  type SelectionDecision,
  selectionSnapshotSchema,
} from "@/features/project-selection/schemas/selection.schema";
import {
  type LeadWorkspace,
  type Workspace,
  type WorkspaceTab,
  workspaceTabs,
} from "../types/workspace";
import LeadOverview from "./LeadOverview";
import MemberOverview from "./MemberOverview";
import ProjectMembersPage from "./ProjectMembersPage";
import WorkspaceLeadTabs from "./WorkspaceLeadTabs";
import WorkspaceSidebar from "./WorkspaceSidebar";
export default function ProjectWorkspace({
  workspace: initialWorkspace,
  tab,
}: {
  workspace: Workspace;
  tab: WorkspaceTab;
}) {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const workspaceRef = useRef(initialWorkspace);
  useEffect(() => {
    let next = initialWorkspace;
    try {
      const raw = localStorage.getItem(
        `projecthub:positions:${initialWorkspace.id}`,
      );
      if (raw) {
        const parsed = recruitmentPositionSchema
          .array()
          .safeParse(JSON.parse(raw));
        if (parsed.success) next = { ...next, positions: parsed.data };
      }
      if (next.role === "Project Lead") {
        const snapshot = localStorage.getItem(
          `projecthub:selection:${next.id}`,
        );
        if (snapshot) {
          const parsed = selectionSnapshotSchema.safeParse(
            JSON.parse(snapshot),
          );
          if (parsed.success) next = { ...next, ...parsed.data };
        }
      }
    } catch {
      /* Retain valid demo data when browser storage is unavailable. */
    }
    workspaceRef.current = next;
    setWorkspace(next);
  }, [initialWorkspace]);
  function persistLead(next: LeadWorkspace) {
    const snapshot = selectionSnapshotSchema.parse({
      positions: next.positions.map(positionDefaults),
      members: next.members,
      applicants: next.applicants,
    });
    try {
      localStorage.setItem(
        `projecthub:selection:${next.id}`,
        JSON.stringify(snapshot),
      );
    } catch {
      throw new Error(
        "Penyimpanan perangkat tidak tersedia. Perubahan belum disimpan.",
      );
    }
    const updated = { ...next, ...snapshot };
    workspaceRef.current = updated;
    setWorkspace(updated);
  }
  function savePositions(positions: RecruitmentPosition[]) {
    const current = workspaceRef.current;
    if (current.role !== "Project Lead")
      throw new Error("Hanya Project Lead yang dapat mengelola posisi.");
    persistLead({
      ...current,
      positions: recruitmentPositionSchema.array().parse(positions),
    });
  }
  function selectApplicant(decision: SelectionDecision) {
    const next = applySelectionDecision(
      workspaceRef.current,
      decision,
      new Date().toISOString().slice(0, 10),
    );
    persistLead(next);
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const label = workspaceTabs.find((t) => t.id === tab)?.label;
  return (
    <div className="min-h-screen bg-[#FAF8F7] font-sans text-[#1C1B1B]">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b border-[#EAE7E7] bg-white px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Buka navigasi ruang kerja"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu size={20} />
          </button>
          <Link
            href="/projek-saya"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <span className="rounded bg-[#005DA9] p-1.5 text-white">
              <ShieldCheck size={19} />
            </span>
            BCC ProjectHub
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#005DA9] text-xs text-white">
            N
          </span>
          <div>
            <p className="text-xs">Nadia</p>
            <p className="text-[10px] text-[#717784]">{workspace.role}</p>
          </div>
        </div>
      </header>
      <WorkspaceSidebar
        workspace={workspace}
        tab={tab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="mx-auto min-w-0 px-5 pb-12 pt-6 lg:ml-60 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1 text-[11px] text-[#717784]"
            >
              <Link
                href="/projek-saya"
                className="inline-flex items-center gap-1 hover:text-[#005DA9]"
              >
                <ArrowLeft size={12} />
                Kembali ke Project Saya
              </Link>
              <span>
                / Ruang Kerja / {workspace.name} / {label}
              </span>
            </nav>
            <Link
              href={`/katalog/${workspace.catalogId}`}
              className="inline-flex items-center gap-1 rounded bg-white px-2 py-1.5 text-[11px] text-[#555965]"
            >
              <ExternalLink size={12} />
              Pratinjau Halaman Publik
            </Link>
          </div>
          {tab === "ringkasan" ? (
            workspace.role === "Project Lead" ? (
              <LeadOverview workspace={workspace} />
            ) : (
              <MemberOverview
                workspace={workspace}
                onLeave={() => dialog.current?.showModal()}
              />
            )
          ) : tab === "anggota" ? (
            <ProjectMembersPage workspace={workspace} />
          ) : workspace.role === "Project Lead" ? (
            <WorkspaceLeadTabs
              workspace={workspace}
              tab={tab}
              onPositionsChange={savePositions}
              onSelectionDecision={selectApplicant}
            />
          ) : null}
        </div>
      </main>
      <dialog
        ref={dialog}
        aria-labelledby="leave-title"
        className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-md rounded-xl bg-white p-6 shadow-xl backdrop:bg-black/40"
      >
        <h2 id="leave-title" className="text-lg font-semibold">
          Tinggalkan {workspace.name}?
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#717784]">
          Anda akan kehilangan akses internal dan tidak lagi menempati kuota
          posisi proyek ini.
        </p>
        {notice && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            {notice}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              dialog.current?.close();
              setNotice("");
            }}
            className="px-3 py-2 text-sm"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice(
                "Layanan keanggotaan belum terhubung. Anda belum keluar dari proyek.",
              )
            }
            className="rounded bg-red-600 px-3 py-2 text-sm text-white"
          >
            Ya, Tinggalkan
          </button>
        </div>
      </dialog>
    </div>
  );
}
