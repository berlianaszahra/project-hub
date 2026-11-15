"use client";

import { Suspense, useMemo } from "react";
import ProjectPositionsPage from "@/features/project-positions/components/ProjectPositionsPage";
import type { RecruitmentPosition } from "@/features/project-positions/schemas/position.schema";
import ProjectSelectionPage from "@/features/project-selection/components/ProjectSelectionPage";
import { isPending } from "@/features/project-selection/lib/selection";
import type { SelectionDecision } from "@/features/project-selection/schemas/selection.schema";
import ProjectSettingsPage from "@/features/project-settings/components/ProjectSettingsPage";
import { settingsFromWorkspace } from "@/features/project-settings/data/workspaceSettings";
import type { LeadWorkspace, WorkspaceTab } from "../types/workspace";

export default function WorkspaceLeadTabs({
  workspace: w,
  tab,
  onPositionsChange,
  onSelectionDecision,
}: {
  workspace: LeadWorkspace;
  tab: WorkspaceTab;
  onPositionsChange: (positions: RecruitmentPosition[]) => void;
  onSelectionDecision: (decision: SelectionDecision) => void;
}) {
  const settingsProject = useMemo(() => settingsFromWorkspace(w), [w]);
  if (tab === "posisi")
    return <ProjectPositionsPage workspace={w} onChange={onPositionsChange} />;
  if (tab === "pengaturan")
    return (
      <Suspense fallback={<output>Memuat pengaturan proyek…</output>}>
        <ProjectSettingsPage
          key={w.id}
          projectId={w.id}
          pendingApplicationCount={
            w.applicants.filter((a) => isPending(a.status)).length
          }
          project={settingsProject}
        />
      </Suspense>
    );
  return (
    <ProjectSelectionPage workspace={w} onDecision={onSelectionDecision} />
  );
}
