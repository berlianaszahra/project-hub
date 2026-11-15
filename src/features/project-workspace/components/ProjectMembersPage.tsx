"use client";
import {
  Info,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Workspace, WorkspaceMember } from "../types/workspace";
import MemberManagementDialog from "./MemberManagementDialog";
import MemberSummaryCards from "./MemberSummaryCards";
import { workspaceHref } from "./WorkspaceSidebar";
export default function ProjectMembersPage({
  workspace: w,
}: {
  workspace: Workspace;
}) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [selected, setSelected] = useState<WorkspaceMember | null>(null);
  const lead = w.role === "Project Lead";
  const members = w.members.filter(
    (m) =>
      (role === "all" || m.role === role) &&
      [m.name, m.email ?? "", m.position]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="rounded-xl bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[28px] font-semibold tracking-tight">
              Anggota Project
            </h1>
            <span className="rounded-full bg-[#FBE9C5] px-2 py-1 text-[10px] text-[#705C2A]">
              •{" "}
              {w.status === "Recruiting"
                ? "Perekrutan Terbuka"
                : w.status === "Active"
                  ? "Project Aktif"
                  : "Project Selesai"}{" "}
              · {w.members.length} Anggota Aktif
            </span>
          </div>
          <p className="mt-1 text-sm text-[#717784]">
            {lead
              ? "Kelola peran kepemimpinan, posisi kontribusi, dan izin akses"
              : "Lihat peran kepemimpinan dan posisi kontribusi"}{" "}
            anggota tim {w.name}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-lg bg-[#F6F3F2] px-3 py-2 text-xs text-[#717784]">
            <SlidersHorizontal size={13} />
            <span className="sr-only">Filter Peran</span>
            <select
              aria-label="Filter peran anggota"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="max-w-40 bg-transparent text-xs outline-none"
            >
              <option value="all">Filter Peran · Semua</option>
              <option value="Project Lead">Project Lead</option>
              <option value="Member">Member Tim</option>
            </select>
          </label>
          {lead && (
            <Link
              href={workspaceHref(w.id, "pengajuan")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0076D3] px-3 py-2 text-xs text-white"
            >
              <UserPlus size={14} />
              Tambah Anggota
            </Link>
          )}
        </div>
      </div>
      <MemberSummaryCards workspace={w} />
      <section
        aria-labelledby="member-table-title"
        className="overflow-hidden rounded-xl border border-[#F0EEEE]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F7] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 id="member-table-title" className="text-sm font-medium">
              Daftar Personel Proyek
            </h2>
            <span className="text-[10px] text-[#717784]">
              Menampilkan {members.length} dari {w.members.length} anggota
            </span>
          </div>
          <label className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 text-[#929296]">
            <Search size={13} />
            <span className="sr-only">Cari nama atau posisi</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau posisi..."
              className="w-44 bg-transparent text-[11px] outline-none"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#FDFBFA] text-[10px] tracking-wide text-[#717784]">
              <tr>
                {[
                  "NAMA & AKUN",
                  "PERAN AKSES",
                  "POSISI KONTRIBUSI",
                  "BERGABUNG",
                  "STATUS",
                  ...(lead ? ["OPSI"] : []),
                ].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t border-[#F6F3F2]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-[11px] text-[#34567E]">
                        {m.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                      <div>
                        <p className="whitespace-nowrap text-xs font-medium">
                          {m.name}
                          {m.id === w.currentUserId && (
                            <span className="ml-1 rounded bg-[#F0EEEE] px-1 text-[10px] font-normal text-[#717784]">
                              Anda
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#717784]">
                          {m.email ?? "Email belum tersedia"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-1 text-[10px] ${m.role === "Project Lead" ? "bg-[#FBE9C5] text-[#705C2A]" : "bg-[#F0EEEE] text-[#717784]"}`}
                    >
                      {m.role === "Project Lead" ? (
                        <ShieldCheck size={11} />
                      ) : (
                        <Users size={11} />
                      )}
                      {m.role === "Project Lead"
                        ? "Project Lead"
                        : "Member Tim"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs">{m.position}</p>
                    <p className="mt-1 max-w-48 text-[10px] leading-4 text-[#929296]">
                      {m.focus}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-[10px] text-[#717784]">
                    {m.joinedAsCreator && <p>Pembuat Proyek</p>}
                    {m.joinedAt
                      ? new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        }).format(new Date(`${m.joinedAt}T00:00:00Z`))
                      : "Belum tersedia"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block whitespace-nowrap rounded px-1.5 py-1 text-[10px] ${m.newlyAccepted ? "bg-[#FCDEA0] text-[#705C2A]" : "bg-[#DDF8EE] text-[#087663]"}`}
                    >
                      {m.newlyAccepted ? "• Baru Diterima" : "• Aktif"}
                    </span>
                  </td>
                  {lead && (
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        aria-label={`Kelola anggota ${m.name}`}
                        onClick={() => setSelected(m)}
                        className="rounded bg-[#F6F3F2] px-3 py-2 text-[10px] hover:bg-[#EAE7E7]"
                      >
                        Kelola
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {members.length === 0 && (
          <p className="p-8 text-center text-sm text-[#717784]">
            Tidak ada anggota yang sesuai dengan pencarian dan filter.
          </p>
        )}
      </section>
      <aside className="mt-5 flex gap-2 rounded-xl bg-[#F6F3F2] p-4">
        <Info size={17} className="shrink-0 text-[#0076D3]" />
        <div>
          <h2 className="text-xs font-medium">
            Tata Kelola & Hak Akses Kepemimpinan
          </h2>
          <p className="mt-1 text-xs leading-6 text-[#717784]">
            Proyek harus selalu memiliki minimal satu{" "}
            <strong>Project Lead</strong> aktif untuk memastikan kontinuitas
            evaluasi dan moderasi tim. Setiap pelamar baru yang diterima pada
            menu <strong>Seleksi Pengajuan</strong> akan masuk ke daftar anggota
            sesuai posisi yang dilamar.
            {!lead &&
              " Perubahan role, posisi, dan keanggotaan hanya dapat dilakukan oleh Project Lead."}
          </p>
        </div>
      </aside>
      {lead && selected && (
        <MemberManagementDialog
          key={selected.id}
          workspace={w}
          member={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
