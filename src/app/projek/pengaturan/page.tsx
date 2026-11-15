
import ProjectSettingsPage from "@/features/project-settings/components/ProjectSettingsPage";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function PengaturanProjectPage({
  params,
}: PageProps) {
  const { projectId } = await params;

  return <ProjectSettingsPage projectId={projectId} />;
}
