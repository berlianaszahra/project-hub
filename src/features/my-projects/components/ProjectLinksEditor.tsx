"use client";

import { Link2, LockKeyhole, Pencil, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { type ProjectLink, projectLinkSchema } from "../schemas/project.schema";

const inputClass =
  "min-w-0 w-full rounded-md border border-[#EAE7E7] bg-[#F6F3F2] px-3 py-2.5 text-xs outline-none focus:border-[#0076D3]";
const emptyLink: ProjectLink = {
  type: "GitHub",
  label: "",
  url: "",
  visibility: "members",
};

type Props = {
  links: ProjectLink[];
  onChange: (links: ProjectLink[]) => void;
  disabled: boolean;
};
export default function ProjectLinksEditor({
  links,
  onChange,
  disabled,
}: Props) {
  const [draft, setDraft] = useState<ProjectLink>(emptyLink);
  const [editing, setEditing] = useState<number | null>(null);
  const [error, setError] = useState("");
  const labelRef = useRef<HTMLInputElement>(null);
  function save() {
    if (disabled) return;
    const result = projectLinkSchema.safeParse({
      ...draft,
      url: draft.url.trim(),
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    if (
      links.some(
        (link, index) => index !== editing && link.url === result.data.url,
      )
    ) {
      setError("Tautan ini sudah ditambahkan.");
      return;
    }
    onChange(
      editing === null
        ? [...links, result.data]
        : links.map((link, index) => (index === editing ? result.data : link)),
    );
    setDraft(emptyLink);
    setEditing(null);
    setError("");
  }
  return (
    <section
      className="rounded-xl bg-[#F6F3F2] p-5 sm:p-6"
      aria-labelledby="links-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="links-title" className="text-base font-semibold">
            <span className="mr-2 text-xs text-[#0076D3]">3</span>Tautan Penting
            & Berkas Kerja Tim{" "}
            <span className="text-xs font-normal text-[#717784]">
              (Opsional)
            </span>
          </h2>
          <p className="mt-1 max-w-md text-xs leading-5 text-[#555965]">
            Tautan ini otomatis disinkronkan dan muncul di kartu ‘Tech Stack &
            Berkas Kerja’ pada halaman Ringkasan seluruh anggota tim.
          </p>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => labelRef.current?.focus()}
          className="flex items-center gap-1 rounded-md border border-[#EAE7E7] bg-white px-3 py-2 text-xs"
        >
          <Plus size={13} className="text-[#0076D3]" />
          Tambah Tautan Penting Baru
        </button>
      </div>
      <div className="my-4 flex gap-2 rounded-lg border border-[#FCDEA0] bg-[#FFF0D2] p-3 text-[#705C2A]">
        <LockKeyhole size={15} className="shrink-0" />
        <div>
          <h3 className="text-xs font-medium">Berkas Privat Internal</h3>
          <p className="mt-1 text-xs leading-5">
            Hanya dapat diakses oleh anggota tim yang sudah diterima dan
            terverifikasi di proyek ini. Tautan ini disembunyikan total dari
            publik, pelamar, dan katalog umum.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div
            key={link.url}
            className="flex items-center gap-2 rounded-lg bg-white p-3"
          >
            <Link2 size={17} className="shrink-0 text-[#717784]" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium">{link.label}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${link.visibility === "members" ? "bg-[#A3F2D7] text-[#08634F]" : "bg-[#FCDEA0] text-[#705C2A]"}`}
                >
                  {link.visibility === "members"
                    ? "Khusus Member Tim"
                    : "Internal Project Only"}
                </span>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-[11px] text-[#0076D3] hover:underline"
              >
                {link.url}
              </a>
            </div>
            <span className="hidden rounded bg-[#F0EEEE] px-2 py-1 text-[10px] sm:block">
              {link.type}
            </span>
            <button
              type="button"
              disabled={disabled}
              aria-label={`Edit ${link.label}`}
              onClick={() => {
                setDraft(link);
                setEditing(index);
                setError("");
                labelRef.current?.focus();
              }}
              className="p-1 text-[#717784]"
            >
              <Pencil size={14} />
            </button>
            <button
              type="button"
              disabled={disabled}
              aria-label={`Hapus ${link.label}`}
              onClick={() => {
                onChange(links.filter((_, i) => i !== index));
                setEditing(null);
                setDraft(emptyLink);
                setError("");
              }}
              className="p-1 text-[#717784]"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <fieldset
        disabled={disabled}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.nativeEvent.isComposing &&
            event.target instanceof HTMLInputElement
          ) {
            event.preventDefault();
            save();
          }
        }}
        className="mt-4 rounded-lg border border-[#EAE7E7] bg-white p-3"
      >
        <legend className="sr-only">
          {editing === null ? "Tambah tautan" : "Edit tautan"}
        </legend>
        <div className="mb-3 flex flex-wrap justify-between gap-2 text-xs">
          <span className="flex items-center gap-1">
            <Link2 size={14} className="text-[#0076D3]" />
            {editing === null ? "+ Tambah Tautan Cepat" : "Edit Tautan"}
          </span>
          <span className="text-[10px] text-[#717784]">
            Tautan privat hanya muncul di halaman anggota aktif.
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <select
            aria-label="Jenis tautan"
            value={draft.type}
            onChange={(e) =>
              setDraft({
                ...draft,
                type: e.target.value as ProjectLink["type"],
              })
            }
            className={inputClass}
          >
            {["GitHub", "Figma", "Google Drive", "Notion", "Lainnya"].map(
              (type) => (
                <option key={type}>{type}</option>
              ),
            )}
          </select>
          <input
            ref={labelRef}
            aria-label="Nama tautan"
            placeholder="Label Nama (mis: Dokumen Riset)"
            value={draft.label}
            onChange={(e) => setDraft({ ...draft, label: e.target.value })}
            className={inputClass}
          />
          <input
            type="url"
            aria-label="URL tautan"
            placeholder="URL (https://...)"
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            className={inputClass}
          />
          <select
            aria-label="Visibilitas tautan"
            value={draft.visibility}
            onChange={(e) =>
              setDraft({
                ...draft,
                visibility: e.target.value as ProjectLink["visibility"],
              })
            }
            className={inputClass}
          >
            <option value="members">Khusus Member Aktif (Privat)</option>
            <option value="lead">Internal Project Only (Lead)</option>
          </select>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {error}
          </p>
        )}
        <div className="mt-3 flex justify-end gap-3">
          {editing !== null && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setDraft(emptyLink);
                setError("");
              }}
              className="text-xs"
            >
              Batal Edit
            </button>
          )}
          <button
            type="button"
            onClick={save}
            className="rounded-md bg-[#005DA9] px-3 py-2 text-xs text-white"
          >
            {editing === null ? "+ Tambah Tautan" : "Simpan Tautan"}
          </button>
        </div>
      </fieldset>
    </section>
  );
}
