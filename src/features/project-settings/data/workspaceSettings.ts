import type { LeadWorkspace } from "@/features/project-workspace/types/workspace";
import type { ProjectSettingsData } from "../types/projectSettings";

export function settingsFromWorkspace(
  workspace: LeadWorkspace,
): ProjectSettingsData {
  const lead =
    workspace.members.find(
      (member) =>
        member.id === workspace.currentUserId && member.role === "Project Lead",
    ) ?? workspace.members.find((member) => member.role === "Project Lead");
  return {
    id: workspace.id,
    name: workspace.name,
    status:
      workspace.status === "Recruiting"
        ? "recruiting"
        : workspace.status === "Completed"
          ? "completed"
          : "active",
    leadId: lead?.id ?? "",
    leadName: lead?.name ?? "",
    memberCount: workspace.members.length,
    members: workspace.members.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role === "Project Lead" ? "lead" : "member",
      status: "active",
    })),
    settings: {
      name: workspace.name,
      category: "web-community",
      shortDescription: workspace.description.slice(0, 140),
      description: workspace.description,
      technologies: [
        ...new Set(workspace.positions.flatMap((position) => position.skills)),
      ],
      links: workspace.links.map((link) => ({
        platform: "other",
        url: link.url,
      })),
      status: workspace.status,
      isRecruiting: workspace.status === "Recruiting",
      visibility: "public",
      maxMembers:
        workspace.positions.reduce(
          (sum, position) => sum + position.capacity,
          0,
        ) +
        workspace.members.filter(
          (member) =>
            !workspace.positions.some(
              (position) => position.name === member.position,
            ),
        ).length,
      selectionAnnouncement: "",
    },
  };
}
