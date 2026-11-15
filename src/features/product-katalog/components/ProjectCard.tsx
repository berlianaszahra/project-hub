import Link from "next/link";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
  onOpen?: (project: Project) => void;
};

const statusClass: Record<Project["status"], string> = {
  Aktif: "bg-[#A3F2D7] text-[#005140]",
  "Dalam Pengembangan": "bg-[#FFF0C2] text-[#805B00]",
  Selesai: "bg-[#D4E3FF] text-[#005DA9]",
  Diarsipkan: "bg-[#EAE7E7] text-[#414752]",
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${project.updatedAt}T00:00:00Z`));

  return (
    <article className="relative flex min-h-[303px] flex-col justify-between rounded-xl border border-[#EAE7E7] bg-white p-6 transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
      {/* Project Information */}
      <div>
        {/* Icon and Status */}
        <div className="flex items-start justify-between gap-2">
          {/* Project Initial */}
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAE7E7] font-serif text-lg text-[#1C1B1B]"
          >
            {project.initial}
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex max-w-[190px] items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClass[project.status]}`}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            {project.status}
          </span>
        </div>

        {/* Project Name */}
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-[#1C1B1B]">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-[22px] text-[#414752]">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded bg-[#F0EDED] px-2 py-0.5 text-[11px] text-[#414752]"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-[#EAE7E7] pt-4">
        {/* Owner and Members */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Owner */}
          <span className="inline-flex items-center gap-2 text-[#1C1B1B]">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#D4E3FF] text-[10px] font-semibold text-[#001C39]">
              {project.owner.charAt(0)}
            </span>

            {project.owner}
          </span>

          {/* Member Count */}
          <span className="text-[#0C6854]">{project.memberCount} anggota</span>
        </div>

        {/* Updated Date and Detail */}
        <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
          <span className="text-[#414752]">Diperbarui {formattedDate}</span>

          {onOpen ? (
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-label={`Lihat detail ${project.name}`}
              className="font-medium text-[#005DA9] after:absolute after:inset-0 after:rounded-xl hover:underline focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#0076D3] focus-visible:after:ring-offset-2"
            >
              Lihat Detail →
            </button>
          ) : (
            <Link
              href={`/katalog/${project.id}`}
              aria-label={`Lihat detail ${project.name}`}
              className="font-medium text-[#005DA9] after:absolute after:inset-0 after:rounded-xl hover:underline focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#0076D3] focus-visible:after:ring-offset-2"
            >
              Lihat Detail →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
