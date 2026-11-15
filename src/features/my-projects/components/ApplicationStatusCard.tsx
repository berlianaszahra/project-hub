
import {
  ArrowRight,
  Clock3,
  FileClock,
} from "lucide-react";

import type { ProjectApplication } from "../types/projects";

type ApplicationStatusCardProps = {
  applications: ProjectApplication[];
  onViewApplications?: () => void;
};

const statusStyles: Record<
  ProjectApplication["status"],
  string
> = {
  "Menunggu Review": "bg-[#F9DD9E] text-[#574414]",
  Diterima: "bg-[#A3F2D7] text-[#005140]",
  Ditolak: "bg-[#FCE8E6] text-[#B42318]",
};

export default function ApplicationStatusCard({
  applications,
  onViewApplications,
}: ApplicationStatusCardProps) {
  if (applications.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="application-heading"
      className="overflow-hidden rounded-xl border border-[#EAE7E7] bg-[#F6F3F2]/70"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#005DA9]">
            <FileClock size={20} aria-hidden="true" />
          </div>

          <div>
            <h2
              id="application-heading"
              className="text-lg font-semibold text-[#1C1B1B]"
            >
              Status Pengajuan Aktif
            </h2>

            <p className="mt-1 text-sm text-[#414752]">
              Pantau perkembangan pengajuan bergabung ke project.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewApplications}
          disabled={!onViewApplications}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#005DA9] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Lihat Semua
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-2 px-5 pb-5 sm:px-6 sm:pb-6">
        {applications.map((application) => (
          <div
            key={application.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#EAE7E7] bg-white p-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1C1B1B]">
                {application.projectName}
              </p>

              <p className="mt-1 text-xs text-[#414752]">
                Posisi: {application.appliedRole}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#717784]">
                <Clock3 size={12} aria-hidden="true" />
                Diajukan pada {new Intl.DateTimeFormat("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(`${application.appliedAt}T00:00:00Z`))}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusStyles[application.status]
              }`}
            >
              {application.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
