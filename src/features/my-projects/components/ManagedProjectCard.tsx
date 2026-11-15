
import {
  ArrowRight,
  ClipboardList,
  Users,
  UserPlus,
} from "lucide-react";

import type { ManagedProject } from "../types/projects";

type ManagedProjectCardProps = {
  project: ManagedProject;
  onManage?: (project: ManagedProject) => void;
  onReview?: (project: ManagedProject) => void;
};

export default function ManagedProjectCard({
  project,
  onManage,
  onReview,
}: ManagedProjectCardProps) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-[#EAE7E7] bg-white shadow-sm">

      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#005DA9]/5 blur-3xl"
      />

      <div className="relative p-5 sm:p-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#D4E3FF] text-[22px] font-bold text-[#001C39]">
              {project.initial}
            </div>

            <div>
              <h3 className="text-[22px] font-semibold leading-7 tracking-tight text-[#1C1B1B]">
                {project.name}
              </h3>

              <p className="text-[11px] text-[#717784]">
                Project yang Anda pimpin
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded bg-[#D4E3FF]/60 px-2.5 py-1 text-xs font-medium text-[#004884]">
              Lead Project
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

        {/* Technology Tags */}
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

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {project.metrics.map((metric, index) => {
            const MetricIcon = [
              Users,
              UserPlus,
              ClipboardList,
            ][index] ?? ClipboardList;

            const pending = index === 2;

            return (
              <div
                key={metric.label}
                className={`flex min-w-0 items-center gap-2 rounded-lg p-2 ${
                  pending
                    ? "bg-[#F9DD9E]/30"
                    : "bg-[#F6F3F2]"
                }`}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    pending
                      ? "bg-[#F9DD9E] text-[#75602D]"
                      : "bg-[#F0EDED] text-[#717784]"
                  }`}
                >
                  <MetricIcon size={16} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`truncate text-xs font-semibold ${
                    pending
                      ? "text-[#574414]"
                      : "text-[#1C1B1B]"
                  }`}>
                    {metric.label}: {metric.value}
                  </p>

                  <p className={`truncate text-[11px] ${
                    pending
                      ? "text-[#574414]"
                      : "text-[#414752]"
                  }`}>
                    {metric.description}
                  </p>
                </div>

                {pending && project.pendingApplicants > 0 && (
                  <span
                    aria-label="Ada pengajuan yang perlu ditinjau"
                    className="size-2.5 shrink-0 rounded-full bg-[#705C2A]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F6F3F2]/40 px-5 py-4 sm:px-6">
        <p className="inline-flex items-center gap-2 text-[11px] text-[#414752]">
          <Users size={14} aria-hidden="true" />
          Anda mengelola project ini sebagai Lead.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onReview?.(project)}
            disabled={!onReview}
            className="h-8 rounded bg-[#F0EDED] px-4 text-xs font-medium text-[#1C1B1B] transition hover:bg-[#E5E2E1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Kelola Pengajuan
          </button>

          <button
            type="button"
            onClick={() => onManage?.(project)}
            disabled={!onManage}
            className="inline-flex h-8 items-center gap-1.5 rounded bg-[#005DA9] px-4 text-xs font-medium text-white transition hover:bg-[#004B89] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Dashboard Lead
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
