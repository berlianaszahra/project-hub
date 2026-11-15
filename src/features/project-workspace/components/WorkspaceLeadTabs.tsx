"use client";

import { useState } from "react";
import type { LeadWorkspace, WorkspaceTab } from "../types/workspace";
export default function WorkspaceLeadTabs({
  workspace: w,
  tab,
}: {
  workspace: LeadWorkspace;
  tab: WorkspaceTab;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const applicant = w.applicants.find((a) => a.id === selected);
  if (tab === "posisi")
    return (
      <>
        <h1 className="text-2xl font-semibold">Posisi & Kebutuhan Tim</h1>
        <p className="mt-2 text-sm text-[#717784]">
          Kuota dihitung dari anggota aktif yang menempati posisi.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {w.positions.map((p) => (
            <article key={p.id} className="rounded-xl bg-white p-5">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="mt-2 text-sm text-[#717784]">
                {p.filled} / {p.capacity} terisi · {p.capacity - p.filled} slot
                tersedia
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-[#F6F3F2] px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-[#717784]">
          Pengelolaan posisi akan tersedia setelah layanan backend terhubung.
        </p>
      </>
    );
  if (tab === "pengaturan")
    return (
      <>
        <h1 className="text-2xl font-semibold">Pengaturan Proyek</h1>
        <form
          className="mt-6 max-w-2xl space-y-5 rounded-xl bg-white p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(
              "Layanan pengaturan proyek belum terhubung. Perubahan belum disimpan.",
            );
          }}
        >
          <div>
            <label htmlFor="workspace-name" className="mb-2 block text-sm">
              Nama Proyek
            </label>
            <input
              id="workspace-name"
              required
              defaultValue={w.name}
              className="w-full rounded border border-[#EAE7E7] p-3 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="workspace-description"
              className="mb-2 block text-sm"
            >
              Deskripsi
            </label>
            <textarea
              id="workspace-description"
              required
              defaultValue={w.description}
              rows={4}
              className="w-full rounded border border-[#EAE7E7] p-3 text-sm"
            />
          </div>
          <div>
            <label htmlFor="workspace-status" className="mb-2 block text-sm">
              Status Proyek
            </label>
            <select
              id="workspace-status"
              defaultValue={w.status}
              className="w-full rounded border border-[#EAE7E7] p-3 text-sm"
            >
              <option value="Recruiting">Recruiting</option>
              <option value="Active">Active</option>
              <option value="Completed" disabled={w.applicants.length > 0}>
                Completed{" "}
                {w.applicants.length > 0
                  ? "— selesaikan seleksi terlebih dahulu"
                  : ""}
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded bg-[#005DA9] px-4 py-2 text-sm text-white"
          >
            Simpan Perubahan
          </button>
          {notice && (
            <p role="alert" className="text-xs text-[#717784]">
              {notice}
            </p>
          )}
        </form>
      </>
    );
  const filtered = w.applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || a.status === filter),
  );
  return (
    <>
      <h1 className="text-2xl font-semibold">Seleksi Pengajuan</h1>
      <p className="mt-2 text-sm text-[#717784]">
        Tinjau kemampuan dan motivasi pelamar untuk posisi di {w.name}.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <input
          aria-label="Cari nama pelamar"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama pelamar..."
          className="rounded-lg border border-[#EAE7E7] bg-white p-3 text-sm"
        />
        <select
          aria-label="Filter status pengajuan"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-[#EAE7E7] bg-white p-3 text-sm"
        >
          <option value="all">Semua Status</option>
          <option value="Submitted">Dikirim</option>
          <option value="Reviewing">Sedang Ditinjau</option>
        </select>
      </div>
      <div className="mt-5 overflow-x-auto rounded-xl bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#EAE7E7] text-xs text-[#717784]">
            <tr>
              {["Pelamar", "Posisi", "Status", "Tindakan"].map((h) => (
                <th key={h} className="p-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr id={a.id} key={a.id} className="border-b border-[#F6F3F2]">
                <td className="p-4">{a.name}</td>
                <td className="p-4">{a.position}</td>
                <td className="p-4">
                  <span className="rounded bg-[#FCDEA0] px-2 py-1 text-[11px]">
                    {a.status === "Submitted" ? "Dikirim" : "Sedang Ditinjau"}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => setSelected(a.id)}
                    className="text-xs text-[#005DA9] hover:underline"
                  >
                    Tinjau Berkas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <p className="p-6 text-center text-sm text-[#717784]">
            Tidak ada pelamar yang sesuai.
          </p>
        )}
      </div>
      {applicant && (
        <section
          aria-label={`Berkas ${applicant.name}`}
          className="mt-5 rounded-xl bg-white p-6"
        >
          <div className="flex justify-between gap-2">
            <h2 className="font-semibold">{applicant.name}</h2>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-xs text-[#717784]"
            >
              Tutup Detail
            </button>
          </div>
          <p className="mt-2 text-xs text-[#005DA9]">{applicant.position}</p>
          <p className="mt-4 text-sm">{applicant.motivation}</p>
          <p className="mt-3 text-xs text-[#717784]">
            Keahlian: {applicant.skills.join(", ")}
          </p>
          <p className="mt-5 rounded bg-[#F6F3F2] p-3 text-xs text-[#717784]">
            Tindakan seleksi akan tersedia setelah layanan backend terhubung.
          </p>
        </section>
      )}
    </>
  );
}
