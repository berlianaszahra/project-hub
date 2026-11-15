"use client";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Info,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { LeadWorkspace } from "@/features/project-workspace/types/workspace";
import {
  positionApplicantCount,
  positionDefaults,
  positionDeletionError,
} from "../lib/positions";
import type {
  PositionFormData,
  RecruitmentPosition,
} from "../schemas/position.schema";
import PositionCard from "./PositionCard";
import PositionFormModal from "./PositionFormModal";

type Props = {
  workspace: LeadWorkspace;
  onChange: (positions: RecruitmentPosition[]) => void;
};
export default function ProjectPositionsPage({
  workspace: w,
  onChange,
}: Props) {
  const [modal, setModal] = useState<"add" | string | null>(null);
  const [sort, setSort] = useState("priority");
  const [notice, setNotice] = useState("");
  const pending = w.applicants.filter(
    (a) => a.status === "Submitted" || a.status === "Reviewing",
  );
  const positions = w.positions.map(positionDefaults);
  const editing = positions.find((p) => p.id === modal);
  const filled = positions.reduce((sum, p) => sum + p.filled, 0);
  const capacity = positions.reduce((sum, p) => sum + p.capacity, 0);
  const recruiting = w.status === "Recruiting";
  const open = positions.filter(
    (p) => p.status === "open" && p.filled < p.capacity,
  );
  const sorted = [...positions].sort((a, b) =>
    sort === "name"
      ? a.name.localeCompare(b.name)
      : sort === "slots"
        ? b.capacity - b.filled - (a.capacity - a.filled)
        : Number(b.priority) - Number(a.priority),
  );
  function change(next: RecruitmentPosition[], message: string) {
    onChange(next);
    setNotice(message);
  }
  function action(next: RecruitmentPosition[], message: string) {
    try {
      change(next, message);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Perubahan tidak dapat disimpan.",
      );
    }
  }
  function save(data: PositionFormData) {
    if (
      positions.some(
        (p) =>
          p.id !== editing?.id &&
          p.name.toLowerCase() === data.name.toLowerCase(),
      )
    )
      throw Error("Nama posisi ini sudah digunakan pada proyek ini.");
    if (editing) {
      if (data.capacity < editing.filled)
        throw Error("Kuota tidak boleh kurang dari anggota aktif.");
      if (
        data.name !== editing.name &&
        (editing.filled > 0 || positionApplicantCount(w, editing.name) > 0)
      )
        throw Error(
          "Nama posisi yang memiliki anggota atau pengajuan aktif belum dapat diubah dalam demo ini.",
        );
      change(
        positions.map((p) => (p.id === editing.id ? { ...p, ...data } : p)),
        "Perubahan posisi disimpan di perangkat ini.",
      );
    } else
      change(
        [...positions, { ...data, id: crypto.randomUUID(), filled: 0 }],
        "Posisi baru disimpan di perangkat ini.",
      );
  }
  function remove() {
    if (!editing) return;
    const reason = positionDeletionError(
      editing,
      positionApplicantCount(w, editing.name),
    );
    if (reason) throw Error(reason);
    change(
      positions.filter((p) => p.id !== editing.id),
      "Posisi dihapus dari perangkat ini.",
    );
  }
  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#F0EEEE] bg-white p-6">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[10px] font-medium tracking-wide text-[#929296]">
            <span className="rounded bg-[#D4E3FF] p-1 text-[#0076D3]">
              <BriefcaseBusiness size={16} />
            </span>
            KONFIGURASI TIM REKRUTMEN
          </p>
          <h1 className="text-[28px] font-semibold tracking-tight">
            Kelola Posisi Rekrutmen
          </h1>
          <p className="mt-2 max-w-2xl text-xs leading-6 text-[#717784]">
            Atur kuota talenta, keahlian wajib, dan status buka/tutup rekrutmen
            per posisi di {w.name}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal("add")}
          className="inline-flex items-center gap-1 rounded-lg bg-[#005DA9] px-3 py-2.5 text-xs text-white"
        >
          <Plus size={15} />
          Tambah Posisi Baru
        </button>
      </header>
      <p className="mt-3 text-[10px] text-[#929296]">
        Mode demo · Perubahan posisi disimpan di perangkat ini. Sinkronisasi ke
        pengguna lain memerlukan layanan backend.
      </p>
      {notice && (
        <output className="mt-3 block rounded-lg bg-[#EAF4FF] p-3 text-xs text-[#005DA9]">
          {notice}
        </output>
      )}
      <div className="my-6 grid gap-4 md:grid-cols-3">
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <div className="flex justify-between text-xs text-[#717784]">
            <h2>Total Kuota Posisi</h2>
            <Users size={15} />
          </div>
          <p className="mt-5 text-xl font-semibold">
            {capacity}
            <span className="ml-1 text-xs font-normal text-[#717784]">
              Talenta Total
            </span>
          </p>
          <progress
            value={filled}
            max={Math.max(capacity, 1)}
            aria-label="Kuota posisi terisi"
            className="mt-3 h-1.5 w-full accent-[#087663]"
          />
          <div className="mt-2 flex justify-between text-[10px]">
            <span className="text-[#087663]">{filled} Terisi</span>
            <span className="text-[#86641F]">{capacity - filled} Tersisa</span>
          </div>
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <h2 className="text-xs text-[#717784]">Menunggu Seleksi</h2>
          <p className="mt-5 text-xl font-semibold">
            {pending.length}
            <span className="ml-1 text-xs font-normal text-[#717784]">
              Kandidat Aktif
            </span>
          </p>
          <p className="mt-2 text-[10px] text-[#929296]">
            {
              positions.filter((p) => positionApplicantCount(w, p.name) > 0)
                .length
            }{" "}
            posisi memiliki berkas yang perlu direview
          </p>
          <Link
            href={`/projek-saya/${w.id}/pengajuan`}
            className="mt-3 inline-block text-xs text-[#005DA9]"
          >
            Tinjau berkas seleksi →
          </Link>
        </section>
        <section className="rounded-xl border border-[#F0EEEE] bg-white p-4">
          <div className="flex justify-between text-xs text-[#717784]">
            <h2>Status Rekrutmen Terbuka</h2>
            <CheckCircle2 size={15} className="text-[#087663]" />
          </div>
          <p className="mt-5 text-base font-semibold">
            {recruiting && open.length
              ? "● Perekrutan Aktif"
              : "Perekrutan Ditutup"}
          </p>
          <p className="mt-2 text-[10px] leading-5 text-[#929296]">
            Pendaftaran dibuka untuk posisi dengan slot kuota tersedia pada
            proyek Recruiting.
          </p>
          <button
            type="button"
            disabled={!positions.length}
            onClick={() => {
              const pause = positions.some((p) => p.status === "open");
              action(
                positions.map((p) =>
                  pause && p.status === "open"
                    ? { ...p, status: "paused" }
                    : !pause && p.status === "paused"
                      ? { ...p, status: "open" }
                      : p,
                ),
                pause
                  ? "Semua posisi terbuka dijeda."
                  : "Posisi yang dijeda dibuka kembali.",
              );
            }}
            className="mt-2 text-[10px] text-red-600 disabled:opacity-40"
          >
            {positions.some((p) => p.status === "open")
              ? "⊗ Tutup Semua Rekrutmen Sementara"
              : "Buka Kembali Posisi yang Dijeda"}
          </button>
        </section>
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">
          Daftar Kebutuhan Peran{" "}
          <span className="ml-1 rounded bg-[#EAE7E7] px-2 py-0.5 text-[10px] font-normal text-[#717784]">
            {positions.length} Posisi Terdaftar
          </span>
        </h2>
        <label className="text-[10px] text-[#929296]">
          Urutkan:{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-[#555965]"
          >
            <option value="priority">Prioritas Kuota</option>
            <option value="slots">Slot Tersedia</option>
            <option value="name">Nama Posisi</option>
          </select>
        </label>
      </div>
      <div className="space-y-4">
        {sorted.map((p) => (
          <PositionCard
            key={p.id}
            position={p}
            members={w.members.filter((member) => member.position === p.name)}
            applicants={positionApplicantCount(w, p.name)}
            applicantsHref={`/projek-saya/${w.id}/pengajuan?posisi=${encodeURIComponent(p.name)}`}
            recruiting={recruiting}
            onEdit={() => setModal(p.id)}
            onToggle={() =>
              action(
                positions.map((item) =>
                  item.id === p.id
                    ? {
                        ...item,
                        status: item.status === "open" ? "paused" : "open",
                      }
                    : item,
                ),
                "Status posisi diperbarui pada perangkat ini.",
              )
            }
            onIncrease={() =>
              action(
                positions.map((item) =>
                  item.id === p.id
                    ? { ...item, capacity: Math.min(100, item.capacity + 1) }
                    : item,
                ),
                "Kuota posisi ditambahkan.",
              )
            }
          />
        ))}
        {!positions.length && (
          <p className="rounded-xl border border-dashed border-[#D4D8DF] p-10 text-center text-sm text-[#717784]">
            Belum ada posisi. Tambahkan kebutuhan peran pertama untuk proyek
            ini.
          </p>
        )}
      </div>
      <section className="my-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#F0EEEE] p-6">
        <div className="flex gap-3">
          <span className="h-fit rounded-lg bg-white p-2 text-[#0076D3]">
            <UserPlus size={22} />
          </span>
          <div>
            <h2 className="text-sm font-semibold">
              Butuh peran lain seperti QA Engineer atau Product Researcher?
            </h2>
            <p className="mt-1 text-xs text-[#717784]">
              Perluas lingkup proyek dengan spesialisasi baru kapan saja.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setModal("add")}
          className="rounded-lg bg-white px-3 py-2 text-xs text-[#005DA9]"
        >
          ⊕ Buka Form Posisi Baru
        </button>
      </section>
      <aside className="flex gap-2 rounded-lg bg-white p-4">
        <Info size={16} className="shrink-0 text-[#86641F]" />
        <div>
          <h2 className="text-xs font-medium">Catatan Tata Kelola Lead</h2>
          <p className="mt-1 text-[11px] leading-5 text-[#929296]">
            Menutup posisi menghentikan pendaftaran baru. Pengajuan yang sudah
            masuk tetap dapat ditinjau. Posisi hanya dapat dihapus jika tidak
            memiliki anggota aktif maupun pengajuan yang masih diproses.
          </p>
        </div>
      </aside>
      {modal && (
        <PositionFormModal
          key={modal}
          projectName={w.name}
          position={editing}
          deletionError={
            editing
              ? positionDeletionError(
                  editing,
                  positionApplicantCount(w, editing.name),
                )
              : null
          }
          onSave={save}
          onDelete={remove}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
