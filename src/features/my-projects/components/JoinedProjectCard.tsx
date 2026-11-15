import { ArrowRight, CheckCircle2, Users } from "lucide-react";

import type { JoinedProject } from "../types/projects";

type JoinedProjectCardProps = {
  project: JoinedProject;
  onOpen?: (project: JoinedProject) => void;
  onViewTasks?: (project: JoinedProject) => void;
};

export default function JoinedProjectCard({
  project,
  onOpen,
  onViewTasks,
}: JoinedProjectCardProps) {
  const progress = Math.min(100, Math.max(0, project.progress));

  return (
    <article className="overflow-hidden rounded-xl border border-[#EAE7E7] bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        {/* Project Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#FCDFA1] text-[22px] font-bold text-[#251A00]">
              {project.initial}
            </div>

            <div>
              <h3 className="text-[22px] font-semibold leading-7 tracking-tight text-[#1C1B1B]">
                {project.name}
              </h3>

              <p className="text-[11px] text-[#717784]">
                Lead: {project.leadName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="rounded bg-[#F9DD9E]/60 px-2.5 py-1 text-xs font-medium text-[#574414]">
              Member
            </span>

            <span className="inline-flex items-center gap-1.5 rounded bg-[#A3F2D7] px-2.5 py-1 text-xs font-medium text-[#005140]">
              <span className="size-1.5 rounded-full bg-[#0C6854]" />
              {project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 max-w-3xl text-sm leading-[23px] text-[#414752]">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded bg-[#F0EDED] px-2 py-0.5 text-xs font-medium text-[#414752]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-5 rounded-lg bg-[#F6F3F2] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-[#1C1B1B]">
                Progres Tim
              </p>

              <p className="mt-0.5 text-xs text-[#717784]">
                Perkembangan pengerjaan project
              </p>
            </div>

            <span className="text-lg font-semibold text-[#005DA9]">
              {progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label={`Progres project ${project.name}`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#E5E2E1]"
          >
            <div
              className="h-full rounded-full bg-[#005DA9] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#414752]">
              <CheckCircle2 size={14} aria-hidden="true" />
              {project.taskCompleted} dari {project.taskTotal} tugas selesai
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs text-[#414752]">
              <Users size={14} aria-hidden="true" />
              {project.memberCount} anggota
            </span>
          </div>
        </div>

        {/* Team Members */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center">
            {project.teamInitials.map((initial, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: This static avatar preview has no member identifiers and may contain duplicate initials.
                key={`${initial}-${index}`}
                title={`Anggota tim ${index + 1}`}
                className="-ml-1 first:ml-0 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#D4E3FF] text-xs font-semibold text-[#001C39]"
              >
                {initial}
              </div>
            ))}
          </div>

          <p className="text-xs text-[#717784]">Kolaborasi bersama tim</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F6F3F2]/40 px-5 py-4 sm:px-6">
        <p className="text-[11px] text-[#414752]">
          Anda tergabung sebagai Member.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onViewTasks?.(project)}
            disabled={!onViewTasks}
            className="h-8 rounded bg-[#F0EDED] px-4 text-xs font-medium text-[#1C1B1B] hover:bg-[#E5E2E1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Fokus Kontribusi Saya
          </button>

          <button
            type="button"
            onClick={() => onOpen?.(project)}
            disabled={!onOpen}
            className="inline-flex h-8 items-center gap-1.5 rounded bg-[#005DA9] px-4 text-xs font-medium text-white hover:bg-[#004B89] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buka Workspace
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
