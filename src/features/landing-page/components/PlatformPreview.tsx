import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Compass,
  FolderOpen,
  GraduationCap,
  Leaf,
  MoreHorizontal,
  PanelLeft,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    name: "CampusConnect",
    description:
      "Platform kurasi riset interdisipliner mahasiswa dan repositori karya.",
    icon: GraduationCap,
    iconColor: "bg-light-blue text-blue-muted",
    slots: "2 Slot",
    slotColor: "bg-green-light/70 text-green-dark",
    tags: ["React", "TypeScript"],
    owner: "Naufal (PM)",
    initials: "N",
    avatarColor: "bg-avatar-sand text-avatar-sand-text",
    status: "Aktif",
    statusColor: "text-status-green",
  },
  {
    name: "StudySpace",
    description: "Timer Pomodoro sinkronis dengan virtual coworking room BCC.",
    icon: BookOpen,
    iconColor: "bg-orange-light text-amber-dark",
    slots: "1 Slot",
    slotColor: "bg-orange-light text-amber-dark",
    tags: ["Vue 3", "Firebase"],
    owner: "Rizki (Lead)",
    initials: "R",
    avatarColor: "bg-avatar-gold text-avatar-gold-text",
    status: "Sprint 2",
    statusColor: "text-status-amber",
  },
  {
    name: "EcoTrack",
    description:
      "Audit emisi karbon digital dan pelacak efisiensi hosting aplikasi.",
    icon: Leaf,
    iconColor: "bg-green-light text-green-dark",
    slots: "3 Slot",
    slotColor: "bg-secondary-bg text-text-secondary",
    tags: ["Next.js", "Tailwind"],
    owner: "Farhan (Dev)",
    initials: "F",
    avatarColor: "bg-primary-blue text-white",
    status: "Perancangan",
    statusColor: "text-primary-blue",
  },
];

export default function PlatformPreview() {
  return (
    <section
      aria-label="Pratinjau ruang kolaborasi ProjectHub"
      className="bg-primary-bg px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <div className="relative mx-auto max-w-6xl">
        <Image
          src="/people.svg"
          alt=""
          width={96}
          height={96}
          className="pointer-events-none absolute -top-12 -right-3 z-10 size-20 sm:-top-14 sm:-right-5 sm:size-24"
        />

        <div className="overflow-hidden rounded-xl border border-preview-border bg-white shadow-platform-preview">
          <PreviewTitleBar />

          <div className="flex min-h-100 lg:min-h-120">
            <PreviewSidebar />

            <div className="flex min-w-0 flex-1 flex-col px-4 py-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                    Katalog Project Aktif
                  </h2>
                  <p className="mt-1 max-w-sm text-xs leading-relaxed text-text-secondary">
                    Inisiatif produk semester ini yang membutuhkan kolaborator
                    tambahan.
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 text-[11px] font-medium"
                  aria-hidden="true"
                >
                  <span className="inline-flex items-center gap-1.5 rounded bg-secondary-bg px-2.5 py-1.5 text-text-secondary">
                    <SlidersHorizontal size={12} />
                    Filter
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-primary-blue px-2.5 py-1.5 text-white">
                    <Plus size={12} />
                    Buat Project
                  </span>
                </div>
              </div>

              <div className="mt-8 grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto pb-4 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 sm:overflow-visible lg:mt-12">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-10 text-[10px] text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck
                    size={14}
                    className="shrink-0 text-status-green"
                    aria-hidden="true"
                  />
                  Sinkronisasi otomatis dengan Discord &amp; GitHub BCC
                </span>
                <span className="inline-flex items-center gap-1">
                  Lihat riwayat pembaruan
                  <ArrowRight size={12} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewTitleBar() {
  return (
    <div className="flex h-12 items-center gap-5 bg-secondary-bg px-4 sm:px-5">
      <div className="flex shrink-0 gap-2" aria-hidden="true">
        <span className="size-3 rounded-full bg-window-close" />
        <span className="size-3 rounded-full bg-window-minimize" />
        <span className="size-3 rounded-full bg-window-maximize" />
      </div>
      <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary sm:text-xs">
        <FolderOpen size={14} className="shrink-0" aria-hidden="true" />
        <span className="truncate">Katalog Project / CampusConnect</span>
      </div>
      <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-status-green-light px-2.5 py-1 text-[11px] font-medium text-status-green sm:inline-flex">
        <span className="size-1.5 rounded-full bg-status-green" />
        Recruiting Open
      </span>
      <MoreHorizontal
        size={18}
        className="mr-3 hidden shrink-0 text-text-secondary sm:block"
        aria-hidden="true"
      />
    </div>
  );
}

function PreviewSidebar() {
  return (
    <aside className="hidden w-55 shrink-0 bg-secondary-bg/90 p-6 md:block lg:w-64">
      <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-text-primary">
        <PanelLeft size={16} className="text-primary-blue" aria-hidden="true" />
        Ruang Kolaborasi
      </div>
      <p className="mb-2 text-[10px] font-medium tracking-widest text-text-secondary">
        KANAL UTAMA
      </p>
      <ul className="space-y-1 text-xs text-text-secondary">
        <li className="flex items-center gap-2 rounded-md bg-preview-selected px-2 py-2 text-text-primary">
          <Compass size={14} aria-hidden="true" />
          Katalog Project
          <span className="ml-auto text-[10px]">14</span>
        </li>
        <li className="flex items-center gap-2 px-2 py-2">
          <Users size={14} aria-hidden="true" /> Direktori Talenta
        </li>
        <li className="flex items-center gap-2 px-2 py-2">
          <ShieldCheck size={14} aria-hidden="true" /> Tugas &amp; Pengajuan
        </li>
      </ul>
      <p className="mt-8 mb-3 text-[10px] font-medium tracking-widest text-text-secondary">
        PROJECT SAYA
      </p>
      <ul className="space-y-3 text-xs text-text-secondary">
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-status-green" />
          CampusConnect
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-status-amber" />
          EcoTrack BCC
        </li>
      </ul>
    </aside>
  );
}

type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-preview-border bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span
          className={`inline-flex size-8 items-center justify-center rounded-lg ${project.iconColor}`}
        >
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span
          className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${project.slotColor}`}
        >
          {project.slots}
        </span>
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-text-primary">
        {project.name}
      </h3>
      <p className="mt-1.5 mb-5 text-[11px] leading-relaxed text-text-secondary">
        {project.description}
      </p>
      <ul className="mt-auto flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded bg-secondary-bg px-1.5 py-1 text-[9px] text-text-secondary"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px]">
        <span className="inline-flex items-center gap-1.5 text-text-secondary">
          <span
            className={`inline-flex size-4 items-center justify-center rounded-full text-[8px] font-semibold ${project.avatarColor}`}
          >
            {project.initials}
          </span>
          {project.owner}
        </span>
        <span className={`font-medium ${project.statusColor}`}>
          {project.status}
        </span>
      </div>
    </article>
  );
}
