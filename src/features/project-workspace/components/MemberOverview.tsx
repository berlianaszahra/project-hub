import {
  ExternalLink,
  Info,
  Link2,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { MemberWorkspace } from "../types/workspace";
import WorkspaceMembers from "./WorkspaceMembers";
export default function MemberOverview({
  workspace: w,
  onLeave,
}: {
  workspace: MemberWorkspace;
  onLeave: () => void;
}) {
  const lead = w.members.find((m) => m.role === "Project Lead");
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#F0EEEE] p-4">
        <div className="flex gap-3">
          <span className="h-fit rounded-lg bg-[#D4E3FF] p-2 text-[#34567E]">
            <ShieldCheck size={20} />
          </span>
          <div>
            <p className="text-xs text-[#555965]">
              Peran Anda di Proyek ini:{" "}
              <span className="rounded bg-[#D4E3FF] px-2 py-1 font-medium text-[#34567E]">
                Member • {w.contribution}
              </span>
            </p>
            <p className="mt-2 text-[11px] text-[#717784]">
              Akses mengikuti keanggotaan dan posisi kontribusi Anda di proyek
              ini.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLeave}
          className="rounded bg-white px-3 py-2 text-xs text-red-600"
        >
          Tinggalkan Proyek...
        </button>
      </div>
      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_250px]">
        <div>
          <span className="rounded bg-[#A3F2D7] px-2 py-1 text-[10px] text-[#087663]">
            Fase Pengerjaan (Aktif)
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {w.name}
          </h1>
          <p className="mt-3 text-base leading-7 text-[#555965]">
            {w.description}
          </p>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-white p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#FCDEA0] text-sm">
              {lead?.name[0]}
            </span>
            <div>
              <p className="text-xs font-semibold">
                {lead?.name}{" "}
                <span className="ml-1 rounded bg-[#FCDEA0] px-1 py-0.5 text-[10px] font-normal">
                  Project Lead
                </span>
              </p>
              <p className="mt-1 text-[10px] text-[#717784]">
                Penanggung jawab utama tim {w.name}
              </p>
            </div>
          </div>
        </div>
        <section className="rounded-xl bg-white p-5">
          <h2 className="text-[10px] tracking-wider text-[#717784]">
            KONDISI TIM AKTIF
          </h2>
          <p className="mt-6 text-3xl font-semibold">
            {w.members.length}
            <span className="ml-2 text-xs font-normal text-[#717784]">
              Anggota
            </span>
          </p>
          <p className="mt-2 text-xs leading-5 text-[#717784]">
            Kolaborasi berdasarkan posisi kontribusi masing-masing.
          </p>
          <p className="mt-6 text-xs font-medium">Tech Stack Utama</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {[...new Set(w.positions.flatMap((p) => p.skills))].map((skill) => (
              <span
                key={skill}
                className="rounded bg-[#F6F3F2] px-2 py-1 text-[10px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
      <div className="my-8 grid gap-4 md:grid-cols-3">
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
          <Palette
            size={22}
            className="mb-4 rounded bg-[#D4E3FF] p-1 text-[#34567E]"
          />
          <h2 className="text-base font-semibold">Fokus Kontribusi Saya</h2>
          <p className="mt-2 text-xs leading-6 text-[#555965]">{w.focus}</p>
          <span className="mt-5 inline-block rounded bg-[#F6F3F2] px-2 py-1 text-[10px]">
            Posisi: {w.contribution}
          </span>
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
          <Link2
            size={22}
            className="mb-4 rounded bg-[#F0EEEE] p-1 text-[#717784]"
          />
          <h2 className="text-base font-semibold">Tech Stack & Berkas Kerja</h2>
          <p className="mb-4 mt-2 text-xs leading-6 text-[#555965]">
            Akses cepat dokumen dan pustaka desain untuk koordinasi bersama tim.
          </p>
          <div className="space-y-2">
            {w.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-1 rounded bg-[#F6F3F2] px-2 py-2 text-[11px] hover:text-[#005DA9]"
              >
                {link.label}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
          <p className="mt-4 text-right text-[10px] text-[#929296]">
            Dikelola oleh Lead
          </p>
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
          <Users
            size={22}
            className="mb-4 rounded bg-[#FCDEA0] p-1 text-[#705C2A]"
          />
          <h2 className="text-base font-semibold">Koordinasi Tim</h2>
          <p className="mt-2 text-xs leading-6 text-[#555965]">
            Diskusikan target kontribusi dan jadwal pertemuan bersama Project
            Lead.
          </p>
          <p className="mt-5 rounded bg-[#F6F3F2] p-2 text-[11px] text-[#717784]">
            Perubahan posisi atau kebutuhan anggota dikelola oleh Lead.
          </p>
        </section>
      </div>
      <WorkspaceMembers members={w.members} />
      <aside className="mt-6 flex gap-3 rounded-xl bg-[#F0EEEE] p-5">
        <Info size={18} className="shrink-0 text-[#717784]" />
        <div>
          <h2 className="text-xs font-semibold">
            Informasi Hak Akses & Privasi Proyek
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#717784]">
            Anda tergabung sebagai Member kontributor. Menu Pengajuan Pelamar,
            konfigurasi Posisi Terbuka, dan Pengaturan Proyek hanya dapat
            dikelola oleh Project Lead ({lead?.name}). Untuk perubahan peran
            atau posisi kontribusi, hubungi Lead proyek.
          </p>
        </div>
      </aside>
    </>
  );
}
