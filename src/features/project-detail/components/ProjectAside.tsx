import { Check, Info, TrendingUp, Users } from "lucide-react";
import type { ProjectDetail } from "../types/project-detail";

export default function ProjectAside({ project }: { project: ProjectDetail }) {
  return (
    <aside className="space-y-6">
      <section
        id="anggota"
        className="scroll-mt-20 rounded-xl bg-[#F6F3F2] p-5"
        aria-labelledby="members-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="members-title" className="text-sm font-medium">
            Anggota Aktif ({project.memberCount})
          </h2>
          <Users size={16} className="text-[#717784]" />
        </div>
        <ul className="space-y-4">
          {project.members.map((member) => (
            <li key={member.id} className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-xs font-semibold text-[#34567E]">
                {member.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">{member.name}</p>
                <p className="mt-0.5 text-[10px] text-[#717784]">
                  {member.role}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${member.owner ? "bg-[#D4E3FF] text-[#34567E]" : "bg-[#EAE7E7] text-[#717784]"}`}
              >
                {member.owner ? "Owner" : "Anggota"}
              </span>
            </li>
          ))}
        </ul>
        {project.memberCount > project.members.length && (
          <p className="mt-4 text-[10px] text-[#717784]">
            +{project.memberCount - project.members.length} anggota lainnya
          </p>
        )}
      </section>
      <section
        className="rounded-xl bg-[#F6F3F2] p-5"
        aria-labelledby="milestones-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="milestones-title" className="text-sm font-medium">
            Jadwal & Milestone
          </h2>
          <TrendingUp size={16} className="text-[#717784]" />
        </div>
        <ol className="space-y-4">
          {project.milestones.map((step) => (
            <li key={step.title} className="flex gap-2">
              <span
                className={`mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full ${step.status === "done" ? "bg-[#19785F] text-white" : step.status === "active" ? "bg-[#0076D3] text-white" : "bg-[#E3E0E0] text-[#929296]"}`}
              >
                {step.status === "done" ? (
                  <Check size={10} />
                ) : (
                  <span className="size-1 rounded-full bg-current" />
                )}
              </span>
              <div>
                <h3
                  className={`text-xs ${step.status === "upcoming" ? "text-[#929296]" : ""}`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-1 text-[10px] ${step.status === "done" ? "text-[#087663]" : step.status === "active" ? "text-[#0076D3]" : "text-[#929296]"}`}
                >
                  {step.caption}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <div className="flex gap-2 rounded-xl bg-[#F0EEEE] p-4">
        <Info size={16} className="shrink-0 text-[#717784]" />
        <p className="text-[11px] leading-5 text-[#717784]">
          Pendaftaran akan ditutup otomatis ketika semua kuota posisi telah
          terisi dan dikonfirmasi oleh Project Lead. Pastikan profil BCC kamu
          sudah menyertakan tautan portofolio aktif.
        </p>
      </div>
    </aside>
  );
}
