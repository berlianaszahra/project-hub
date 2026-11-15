import { AlignLeft, CalendarDays, Users } from "lucide-react";
import type { ProjectDetail } from "../types/project-detail";

export function ProjectSummary({ project }: { project: ProjectDetail }) {
  const open = project.positions.filter(
    (position) => position.filled < position.capacity,
  ).length;
  const slots = project.positions.reduce(
    (sum, position) => sum + position.capacity - position.filled,
    0,
  );
  return (
    <section
      aria-label="Informasi project"
      className="mt-6 grid gap-5 rounded-xl bg-[#F6F3F2] p-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {[
        {
          title: "PROJECT LEAD",
          content: (
            <>
              <span className="flex size-5 items-center justify-center rounded-full bg-[#D4E3FF] text-[10px]">
                {project.owner[0]}
              </span>
              {project.owner}
              <span className="rounded bg-[#EAE7E7] px-1 text-[10px]">
                Lead
              </span>
            </>
          ),
        },
        {
          title: "STATUS PEREKRUTAN",
          content: (
            <>
              <span
                className={`size-1.5 rounded-full ${open ? "bg-[#0076D3]" : "bg-[#717784]"}`}
              />
              {open} Posisi Terbuka{" "}
              <span className="text-[10px] text-[#717784]">
                (tersisa {slots} slot)
              </span>
            </>
          ),
        },
        {
          title: "ANGGOTA TIM",
          content: (
            <>
              <Users size={14} />
              {project.memberCount} Anggota Aktif
            </>
          ),
        },
        {
          title: "PERIODE PELAKSANAAN",
          content: (
            <>
              <CalendarDays size={14} />
              {project.period}
            </>
          ),
        },
      ].map((item) => (
        <div key={item.title}>
          <h2 className="text-[10px] font-medium tracking-wider text-[#555965]">
            {item.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
            {item.content}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function ProjectOverview({
  project,
}: {
  project: ProjectDetail;
}) {
  return (
    <section
      id="ringkasan"
      className="scroll-mt-20"
      aria-labelledby="overview-title"
    >
      <h2
        id="overview-title"
        className="flex items-center gap-1.5 text-xl font-semibold"
      >
        <AlignLeft size={16} className="text-[#717784]" />
        Tentang Project
      </h2>
      <div className="mt-4 pl-6">
        <h3 className="text-base font-medium">Tujuan Project</h3>
        <p className="mt-2 text-sm leading-6 text-[#414752]">
          {project.purpose}
        </p>
        <h3 className="mb-2 mt-5 text-base font-medium">
          Tech Stack & Tooling
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, index) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded bg-[#F0EEEE] px-2 py-1 text-[11px]"
            >
              <span
                className={`size-1.5 rounded-full ${["bg-[#0076D3]", "bg-[#278676]", "bg-[#86641F]"][index % 3]}`}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
