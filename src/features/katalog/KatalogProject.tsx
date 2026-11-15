"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Status = "Aktif" | "Selesai" | "Arsip";
type Project = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  status: Status;
  owner: string;
  initial: string;
  updated: string;
  members: number;
};

const projects: Project[] = [
  { id: 1, name: "CampusConnect", description: "Platform komunitas untuk kolaborasi dan sharing referensi akademik.", technologies: ["React", "TypeScript", "Node.js"], status: "Aktif", owner: "Nadia", initial: "N", updated: "2 hari lalu", members: 5 },
  { id: 2, name: "StudySpace", description: "Ruang belajar digital kolaboratif berbasis virtual room dan live timer.", technologies: ["Next.js", "Firebase", "Tailwind"], status: "Aktif", owner: "Rafi", initial: "R", updated: "5 hari lalu", members: 4 },
  { id: 3, name: "DesignNest", description: "Platform kurasi portofolio kreatif dan review desain sesama anggota.", technologies: ["React", "Figma", "Supabase"], status: "Aktif", owner: "Dina", initial: "D", updated: "1 minggu lalu", members: 6 },
  { id: 4, name: "EcoTrack", description: "Aplikasi pelacakan jejak karbon dan gaya hidup berkelanjutan di kampus.", technologies: ["Flutter", "Firebase", "Dart"], status: "Selesai", owner: "Sarah", initial: "S", updated: "2 minggu lalu", members: 3 },
  { id: 5, name: "DevLibrary", description: "Pustaka dokumentasi dan modul reusable internal engineer BCC.", technologies: ["Vue.js", "TypeScript", "Vite"], status: "Arsip", owner: "Bima", initial: "B", updated: "1 bulan lalu", members: 4 },
];

const statuses = ["Semua Project", "Sedang Aktif", "Selesai", "Diarsipkan"] as const;
type Filter = (typeof statuses)[number];

function Icon({ name, className = "" }: { name: "search" | "plus" | "grid" | "folder" | "users" | "arrow" | "chevron" | "bell" | "lightbulb" | "menu"; className?: string }) {
  const paths: Record<typeof name, React.ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1" /></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    lightbulb: <><path d="M9 18h6m-5 3h4M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

export default function Katalog() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("Semua Project");
  const [technology, setTechnology] = useState("Semua Teknologi");
  const [mobileMenu, setMobileMenu] = useState(false);
  const techOptions = [...new Set(projects.flatMap((project) => project.technologies))].sort();
  const counts = { "Semua Project": projects.length, "Sedang Aktif": projects.filter(p => p.status === "Aktif").length, "Selesai": projects.filter(p => p.status === "Selesai").length, "Diarsipkan": projects.filter(p => p.status === "Arsip").length };
  const visible = useMemo(() => projects.filter((project) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || `${project.name} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(q);
    const matchStatus = filter === "Semua Project" || project.status === ({ "Sedang Aktif": "Aktif", "Selesai": "Selesai", "Diarsipkan": "Arsip" } as Record<string, Status>)[filter];
    return matchSearch && matchStatus && (technology === "Semua Teknologi" || project.technologies.includes(technology));
  }), [search, filter, technology]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1B1B]">
      <aside className={`${mobileMenu ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 w-60 flex-col justify-between border-r border-[#E5E2E1] bg-[#F6F3F2] md:flex`}>
        <div>
          <Link href="/katalog" className="flex h-14 items-center gap-2 border-b border-[#E5E2E1] px-4 text-sm font-semibold"><span className="rounded bg-[#005DA9] px-2 py-1 text-xs font-bold text-white">BCC</span> ProjectHub</Link>
          <nav className="p-2" aria-label="Navigasi utama">
            <p className="px-2 py-3 text-[11px] font-semibold tracking-widest text-[#717784]">EKSPLORASI</p>
            <Link href="/katalog" className="flex h-9 items-center gap-2 rounded-md bg-[#EAE7E7] px-3 text-sm font-medium"><Icon name="grid" className="h-4 w-4" /> Katalog Project</Link>
            <Link href="/projects" className="mt-1 flex h-9 items-center gap-2 rounded-md px-3 text-sm text-[#414752] hover:bg-[#EAE7E7]"><Icon name="folder" className="h-4 w-4" /> Project Saya</Link>
            <Link href="/members" className="mt-1 flex h-9 items-center gap-2 rounded-md px-3 text-sm text-[#414752] hover:bg-[#EAE7E7]"><Icon name="users" className="h-4 w-4" /> Direktori Anggota</Link>
          </nav>
        </div>
        <div className="border-t border-[#E5E2E1] p-3"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4E3FF] text-xs font-semibold">N</span><div><p className="text-sm font-medium">Nadia</p><p className="text-[11px] text-[#717784]">BCC Member</p></div></div></div>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#E5E2E1] bg-white px-4">
          <div className="flex items-center gap-3 text-sm"><button type="button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Buka navigasi" className="md:hidden"><Icon name="menu" className="h-5 w-5" /></button><span className="text-[#717784]">Workspace</span><span className="text-[#C0C7D4]">/</span><span className="font-medium">Katalog Project</span></div>
          <div className="flex items-center gap-2"><span className="hidden rounded border border-[#E5E2E1] px-2 py-1 text-xs sm:inline">BCC</span><button type="button" aria-label="Notifikasi" className="rounded p-2 text-[#414752]"><Icon name="bell" className="h-4 w-4" /></button><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4E3FF] text-xs font-semibold">N</span></div>
        </header>

        <main className="mx-auto max-w-[1040px] px-5 pb-12 pt-8 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 text-xs font-medium text-[#005DA9]">Workspace / Katalog Project</p><h1 className="text-[32px] font-bold tracking-tight">Katalog Project</h1><p className="mt-1 text-sm leading-6 text-[#414752]">Jelajahi project dan temukan ruang untuk berkolaborasi.</p></div><Link href="/projects/new" className="inline-flex h-9 items-center gap-1 rounded-lg bg-[#0076D3] px-4 text-sm font-medium text-white hover:bg-[#005DA9]"><Icon name="plus" className="h-4 w-4" /> Buat Project</Link></div>

          <section aria-label="Filter katalog" className="mb-6 rounded-xl bg-[#F6F3F2] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><label className="relative block w-full max-w-md flex-1"><Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717784]" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama project atau teknologi..." className="h-9 w-full rounded-lg border border-transparent bg-white pl-9 pr-3 text-sm outline-none focus:border-[#0076D3]" /></label><div className="flex flex-wrap gap-2"><select aria-label="Filter teknologi" value={technology} onChange={e => setTechnology(e.target.value)} className="h-9 max-w-48 rounded-lg bg-white px-3 text-sm outline-none"><option>Semua Teknologi</option>{techOptions.map(tech => <option key={tech}>{tech}</option>)}</select><button type="button" onClick={() => { setSearch(""); setFilter("Semua Project"); setTechnology("Semua Teknologi"); }} className="h-9 rounded-lg bg-white px-3 text-sm font-medium hover:bg-[#EAE7E7]">Reset Filter</button></div></div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAE7E7] pt-3"><div className="flex flex-wrap gap-1">{statuses.map(status => <button key={status} type="button" onClick={() => setFilter(status)} className={`rounded-md px-3 py-1.5 text-sm ${filter === status ? "bg-[#E5E2E1] font-medium text-[#1C1B1B]" : "text-[#414752] hover:bg-[#EAE7E7]"}`}>{status} <span className="ml-1 text-[11px]">{counts[status]}</span></button>)}</div><p className="flex items-center gap-2 text-[11px] text-[#414752]"><span className="h-1.5 w-1.5 rounded-full bg-[#0C6854]" /> Menampilkan {visible.length} dari {projects.length} project</p></div>
          </section>

          <section aria-label="Daftar project" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">{visible.map(project => <article key={project.id} className="flex min-h-[303px] flex-col justify-between rounded-xl border border-[#F0EDED] bg-white p-6 transition-shadow hover:shadow-sm"><div><div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAE7E7] font-serif text-lg">{project.name.charAt(0)}</div><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${project.status === "Aktif" ? "bg-[#A3F2D7] text-[#005140]" : project.status === "Selesai" ? "bg-[#FCDFA1] text-[#251A00]" : "bg-[#F0EDED] text-[#414752]"}`}><span className={`h-1.5 w-1.5 rounded-full ${project.status === "Aktif" ? "bg-[#0C6854]" : project.status === "Selesai" ? "bg-[#705C2A]" : "bg-[#717784]"}`} />{project.status}</span></div><h2 className="mt-4 text-lg font-semibold tracking-tight">{project.name}</h2><p className="mt-2 line-clamp-2 min-h-11 text-sm leading-[22px] text-[#414752]">{project.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{project.technologies.map(tech => <span key={tech} className="rounded bg-[#F0EDED] px-2 py-0.5 text-[11px] text-[#414752]">{tech}</span>)}</div></div><div className="mt-6 border-t border-[#EAE7E7] pt-4"><div className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4E3FF] text-[10px] font-semibold">{project.initial}</span><span className="font-medium">{project.owner}</span></div><span className="text-[#0C6854]">{project.members} anggota</span></div><div className="mt-2 flex items-center justify-between"><span className="text-[11px] text-[#414752]">Diperbarui {project.updated}</span><Link href={`/projects/${project.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-[#005DA9] hover:underline">Lihat Detail <Icon name="arrow" className="h-3 w-3" /></Link></div></div></article>)}</section>
          {visible.length === 0 && <div className="rounded-xl border border-dashed border-[#E5E2E1] py-16 text-center"><h2 className="font-semibold">Project tidak ditemukan</h2><p className="mt-2 text-sm text-[#717784]">Coba kata kunci atau filter lainnya.</p></div>}
          <aside className="mt-10 flex max-w-2xl gap-4 rounded-xl bg-[#F6F3F2] p-4"><Icon name="lightbulb" className="mt-0.5 h-5 w-5 shrink-0 text-[#005DA9]" /><div><h2 className="text-sm font-semibold">Punya ide project baru?</h2><p className="mt-1 text-sm leading-6 text-[#414752]">Mulai project dan ajak anggota BCC untuk berkolaborasi mengembangkan idemu.</p></div></aside>
        </main>
      </div>
    </div>
  );
}
