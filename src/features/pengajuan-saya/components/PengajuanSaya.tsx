"use client";

import { Compass, Info, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProfileLink from "@/shared/components/ProfileLink";
import ProjectSidebar from "@/shared/components/ProjectSidebar";
import { applications as sampleApplications } from "../data/applications";
import type { Application } from "../types/application";
import ApplicationCard from "./ApplicationCard";
import ApplicationDetail from "./ApplicationDetail";

const filters = [
  "Semua",
  "Menunggu & Ditinjau",
  "Diterima",
  "Riwayat / Selesai",
] as const;
type Filter = (typeof filters)[number];
function matches(a: Application, filter: Filter) {
  return (
    filter === "Semua" ||
    (filter === "Menunggu & Ditinjau" &&
      ["review", "pending"].includes(a.status)) ||
    (filter === "Diterima" && a.status === "accepted") ||
    (filter === "Riwayat / Selesai" && a.status === "withdrawn")
  );
}

export default function PengajuanSaya() {
  const [applications, setApplications] = useState(sampleApplications);
  const [selectedId, setSelectedId] = useState(sampleApplications[0].id);
  const [filter, setFilter] = useState<Filter>("Semua");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [withdrawId, setWithdrawId] = useState<string | null>(null);
  const filtered = applications.filter((a) => matches(a, filter));
  const selected = filtered.find((a) => a.id === selectedId) ?? filtered[0];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1B1B]">
      <ProjectSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="min-w-0 lg:pl-60">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-[#EAE7E7] px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu"
              className="rounded p-1 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <p className="text-xs sm:text-sm">Eksplorasi / Pengajuan Saya</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/projek-saya/buat"
              className="inline-flex items-center gap-1 rounded bg-[#0076D3] px-3 py-2 text-xs text-white"
            >
              <Plus size={14} /> Buat
            </Link>
            <ProfileLink />
          </div>
        </header>
        <main className="mx-auto max-w-[1280px] px-5 pb-10 pt-5 sm:px-6">
          <p className="text-[10px] tracking-widest text-[#555965]">
            PORTAL KOMUNITAS • BCC FILKOM
          </p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[30px] font-semibold leading-tight tracking-tight">
                Pengajuan Saya
              </h1>
              <p className="mt-1.5 text-sm text-[#555965]">
                Pantau status pengajuan bergabung dan riwayat aplikasi project
                komunitas BCC secara real-time.
              </p>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-1.5 rounded bg-[#F6F3F2] px-3 py-2 text-xs hover:bg-[#EAE7E7]"
            >
              <Compass size={14} />
              Jelajahi Project
            </Link>
          </div>
          <fieldset
            aria-label="Filter status pengajuan"
            className="mt-5 flex gap-5 overflow-x-auto border-b border-[#EAE7E7]"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setFilter(item);
                  setWithdrawId(null);
                }}
                aria-pressed={filter === item}
                className={`shrink-0 border-b-2 pb-2.5 text-xs ${filter === item ? "border-[#1C1B1B] font-medium" : "border-transparent text-[#555965]"}`}
              >
                {item} ({applications.filter((a) => matches(a, item)).length})
              </button>
            ))}
          </fieldset>
          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.42fr)_minmax(320px,1fr)]">
            <section aria-label="Daftar pengajuan">
              <div className="mb-2 flex justify-between px-2 text-[10px] tracking-wider text-[#555965]">
                <span>BERKAS & POSISI TERDAFTAR</span>
                <span>AKSI CEPAT</span>
              </div>
              <div className="space-y-2">
                {filtered.map((a) => (
                  <ApplicationCard
                    key={a.id}
                    application={a}
                    selected={selected?.id === a.id}
                    onSelect={() => setSelectedId(a.id)}
                    onWithdraw={() => setWithdrawId(a.id)}
                  />
                ))}
              </div>
              {!filtered.length && (
                <p className="rounded-lg border border-dashed border-[#EAE7E7] p-10 text-center text-sm text-[#717784]">
                  Belum ada pengajuan pada kategori ini.
                </p>
              )}
              {withdrawId && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-[#FCDEA0] bg-[#FFF8E8] p-4 text-xs"
                >
                  <p>
                    Batalkan pengajuan ke{" "}
                    {applications.find((a) => a.id === withdrawId)?.name}?
                  </p>
                  <div className="mt-3 flex gap-4">
                    <button
                      type="button"
                      className="font-medium text-red-600"
                      onClick={() => {
                        setApplications((items) =>
                          items.map((a) =>
                            a.id === withdrawId
                              ? {
                                  ...a,
                                  status: "withdrawn",
                                  message: "Pengajuan telah dibatalkan.",
                                }
                              : a,
                          ),
                        );
                        setWithdrawId(null);
                      }}
                    >
                      Ya, batalkan
                    </button>
                    <button type="button" onClick={() => setWithdrawId(null)}>
                      Kembali
                    </button>
                  </div>
                </div>
              )}
              <aside className="mt-6 flex gap-2 rounded bg-[#F6F3F2] p-4">
                <Info size={16} className="shrink-0 text-[#717784]" />
                <div>
                  <h2 className="text-xs font-medium">
                    Kebijakan Pengajuan Proyek BCC
                  </h2>
                  <p className="mt-1 text-[11px] leading-5 text-[#717784]">
                    Maksimal pengajuan aktif adalah 3 project sekaligus untuk
                    menjamin komitmen belajar anggota. Pengajuan yang ditolak
                    atau dibatalkan akan mengembalikan kuota aplikasi secara
                    instan.
                  </p>
                </div>
              </aside>
            </section>
            {selected && <ApplicationDetail application={selected} />}
          </div>
        </main>
      </div>
    </div>
  );
}
