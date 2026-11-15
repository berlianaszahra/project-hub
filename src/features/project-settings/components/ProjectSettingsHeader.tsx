import Link from "next/link";
import type { ProjectSettingsData } from "../types/projectSettings";

type ProjectSettingsHeaderProps = {
  project: ProjectSettingsData;
};

const statusLabels = {
  recruiting: "Perekrutan Terbuka",
  active: "Proyek Aktif",
  archived: "Diarsipkan",
  completed: "Selesai",
};

export default function ProjectSettingsHeader({
  project,
}: ProjectSettingsHeaderProps) {
  return (
    <header className="border-b border-[#E5E2E1] pb-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex flex-wrap items-center gap-2 text-sm"
      >
        <Link
          href="/projek-saya"
          className="text-[#414752] hover:text-[#005DA9]"
        >
          Project Saya
        </Link>

        <span className="text-[#C0C7D4]">/</span>

        <Link
          href={`/projek-saya/${project.id}`}
          className="text-[#414752] hover:text-[#005DA9]"
        >
          {project.name}
        </Link>

        <span className="text-[#C0C7D4]">/</span>

        <span className="font-medium text-[#1C1B1B]">Pengaturan</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[32px] font-semibold tracking-[-0.8px] text-[#1C1B1B]">
            Pengaturan Proyek
          </h1>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#A3F2D7] px-3 py-1 text-xs font-medium text-[#005140]">
            <span className="size-1.5 rounded-full bg-[#0C6854]" />
            {statusLabels[project.status]}
          </span>
        </div>

        <span className="text-xs text-[#717784]">BCC ProjectHub</span>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#414752]">
        Kelola identitas, visibilitas, perekrutan, dan kepemimpinan proyek{" "}
        {project.name}.
      </p>
    </header>
  );
}
