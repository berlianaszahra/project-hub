import { notFound } from "next/navigation";
import ProjectWorkspace from "@/features/project-workspace/components/ProjectWorkspace";
import {
  getWorkspace,
  workspaces,
} from "@/features/project-workspace/data/workspaces";
import { workspaceTabs } from "@/features/project-workspace/types/workspace";

export function generateStaticParams() {
  return workspaces.flatMap((w) =>
    workspaceTabs
      .filter((tab) => !tab.leadOnly || w.role === "Project Lead")
      .map((tab) => ({
        projectId: w.id,
        section: tab.id === "ringkasan" ? [] : [tab.id],
      })),
  );
}
export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string; section?: string[] }>;
}) {
  const { projectId, section = [] } = await params;
  const workspace = getWorkspace(projectId);
  if (!workspace || section.length > 1) notFound();
  const tab = workspaceTabs.find(
    (tab) => tab.id === (section[0] ?? "ringkasan"),
  );
  if (!tab || (tab.leadOnly && workspace.role !== "Project Lead")) notFound();
  return (
    <ProjectWorkspace key={workspace.id} workspace={workspace} tab={tab.id} />
  );
}
