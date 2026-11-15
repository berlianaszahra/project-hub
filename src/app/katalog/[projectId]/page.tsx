import { notFound } from "next/navigation";
import { projects } from "@/features/product-katalog/data/project";
import ProjectDetailPage from "@/features/project-detail/components/ProjectDetailPage";
import { getProjectDetail } from "@/features/project-detail/data/project-details";

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectDetail(projectId);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
