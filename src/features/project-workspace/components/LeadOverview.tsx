import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Info,
  PlusCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { LeadWorkspace } from "../types/workspace";
import WorkspaceMembers from "./WorkspaceMembers";
import { workspaceHref } from "./WorkspaceSidebar";
export default function LeadOverview({
  workspace: w,
}: {
  workspace: LeadWorkspace;
}) {
  const capacity = w.positions.reduce((sum, p) => sum + p.capacity, 0) + 1;
  const open = w.positions.filter((p) => p.filled < p.capacity);
  const occupancy = Math.round((w.members.length / capacity) * 100);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Ringkasan Proyek: {w.name}
            </h1>
            <span className="rounded-full bg-[#DDF8EE] px-2 py-1 text-[10px] text-[#087663]">
              • Perekrutan Terbuka
            </span>
          </div>
          <span className="mt-2 inline-block rounded bg-[#FCDEA0] px-2 py-0.5 text-[10px] text-[#705C2A]">
            Project Lead
          </span>
          <p className="mt-2 text-sm leading-6 text-[#555965]">
            {w.description}
          </p>
        </div>
        <Link
          href={workspaceHref(w.id, "posisi")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#005DA9] px-4 py-3 text-xs text-white"
        >
          <PlusCircle size={15} />
          Buka Posisi Baru
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <p className="text-[10px] tracking-wider text-[#717784]">
            MENUNGGU SELEKSI
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {w.applicants.length}
            <span className="ml-2 text-xs font-normal text-[#555965]">
              Berkas
            </span>
          </p>
          <Link
            href={workspaceHref(w.id, "pengajuan")}
            className="mt-5 inline-flex items-center gap-1 text-[11px] text-[#005DA9]"
          >
            Buka Seleksi Pengajuan
            <ArrowRight size={12} />
          </Link>
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <div className="flex justify-between text-[10px]">
            <span className="tracking-wider text-[#717784]">
              KAPASITAS TIM AKTIF
            </span>
            <span>{occupancy}%</span>
          </div>
          <p className="mt-2 text-3xl font-semibold">
            {w.members.length}
            <span className="text-xs font-normal text-[#555965]">
              {" "}
              / {capacity} Anggota
            </span>
          </p>
          <progress
            value={w.members.length}
            max={capacity}
            aria-label="Kapasitas tim aktif"
            className="mt-2 h-1.5 w-full accent-[#087663]"
          />
          <p className="mt-2 text-[10px] text-[#717784]">
            {capacity - w.members.length} slot posisi tersisa untuk tim
          </p>
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <p className="text-[10px] tracking-wider text-[#717784]">
            POSISI TERBUKA
          </p>
          <p className="my-2 text-3xl font-semibold">
            {open.length}
            <span className="ml-2 text-xs font-normal text-[#555965]">
              Posisi Aktif
            </span>
          </p>
          {open.map((p) => (
            <p
              key={p.id}
              className="mt-1 flex justify-between text-[10px] text-[#555965]"
            >
              <span>{p.name}</span>
              <span>
                {p.filled}/{p.capacity} Terisi
              </span>
            </p>
          ))}
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <p className="text-[10px] tracking-wider text-[#717784]">
            KATALOG PROYEK BCC
          </p>
          <p className="mt-3 text-base font-medium">Publik Aktif</p>
          <p className="mt-5 text-[10px] text-[#717784]">
            Menerima pendaftaran melalui posisi yang tersedia.
          </p>
          <Link
            href={`/katalog/${w.catalogId}`}
            className="mt-2 inline-block text-[11px] text-[#005DA9]"
          >
            Pratinjau halaman publik →
          </Link>
        </section>
      </div>
      <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
            <div className="mb-5 flex items-center gap-2">
              <span className="rounded bg-[#D4E3FF] p-1.5 text-[#0076D3]">
                <ClipboardList size={17} />
              </span>
              <div>
                <h2 className="text-base font-semibold">
                  Antrean Seleksi Pelamar
                </h2>
                <p className="text-[10px] text-[#717784]">
                  Tinjau kemampuan dan motivasi pelamar sebelum menentukan
                  hasil.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {w.applicants.slice(0, 2).map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center gap-3 rounded-lg bg-[#FAF8F7] p-3"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#FCDEA0] text-xs">
                    {a.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="mt-1 text-[10px] text-[#717784]">
                      {a.position} ·{" "}
                      {a.status === "Submitted" ? "Dikirim" : "Sedang Ditinjau"}
                    </p>
                  </div>
                  <Link
                    href={`${workspaceHref(w.id, "pengajuan")}#${a.id}`}
                    className="rounded bg-white px-3 py-2 text-[11px] text-[#005DA9]"
                  >
                    Tinjau Berkas
                  </Link>
                </div>
              ))}
            </div>
            <Link
              href={workspaceHref(w.id, "pengajuan")}
              className="mt-5 block text-right text-xs font-medium text-[#005DA9]"
            >
              Lihat Semua Pengajuan ({w.applicants.length} berkas) →
            </Link>
          </section>
          <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Info size={17} />
              Kondisi Rekrutmen Proyek
            </h2>
            <p className="mt-1 text-xs text-[#717784]">
              Ringkasan dihitung dari seluruh posisi dan pengajuan proyek.
            </p>
            <ul className="mt-5 space-y-4">
              {w.positions.map((p) => (
                <li key={p.id} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#0076D3]" />
                  <div>
                    <p className="text-xs">
                      {p.name}: {p.capacity - p.filled} kuota tersedia
                    </p>
                    <p className="mt-1 text-[10px] text-[#717784]">
                      Kebutuhan skill: {p.skills.join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="space-y-5">
          <WorkspaceMembers members={w.members} compact />
          <section className="rounded-xl border border-[#F0EEEE] bg-white p-5">
            <h2 className="text-sm font-semibold">Target Rekrutmen</h2>
            <p className="mt-4 flex gap-2 text-xs">
              <CheckCircle2 size={15} className="text-[#087663]" />
              Informasi proyek dan posisi tersedia
            </p>
            <p className="mt-3 text-xs text-[#717784]">
              Tinjau pengajuan dan lengkapi tim sesuai kebutuhan skill.
            </p>
          </section>
          <section className="space-y-2 rounded-xl border border-[#F0EEEE] bg-white p-4">
            <h2 className="mb-3 text-[10px] tracking-wider text-[#717784]">
              AKSI CEPAT LEAD
            </h2>
            <Link
              href={workspaceHref(w.id, "posisi")}
              className="flex items-center gap-2 rounded bg-[#F6F3F2] p-3 text-xs"
            >
              <PlusCircle size={14} />
              Buka Kebutuhan Posisi Baru
            </Link>
            <Link
              href={workspaceHref(w.id, "pengaturan")}
              className="flex items-center gap-2 rounded bg-[#F6F3F2] p-3 text-xs"
            >
              <Settings size={14} />
              Ubah Pengaturan Proyek
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
