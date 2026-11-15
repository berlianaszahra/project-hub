"use client";

import { ArrowRight, Code2, Info, Link2, Plus, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  applicationSchema,
  type PositionApplication,
} from "../schemas/application.schema";
import type { OpenPosition } from "../types/project-detail";

type Props = {
  projectName: string;
  lead: string;
  position: OpenPosition;
  onClose: () => void;
  onSubmit?: (data: PositionApplication) => Promise<void> | void;
};
const inputClass =
  "w-full rounded-lg border border-transparent bg-[#F6F3F2] px-3 py-2.5 text-xs outline-none placeholder:text-[#A3AAB5] focus:border-[#0076D3]";

export default function ApplyPositionModal({
  projectName,
  lead,
  position,
  onClose,
  onSubmit,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [skills, setSkills] = useState(position.skills);
  const [skill, setSkill] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [motivation, setMotivation] = useState("");
  const [commitment, setCommitment] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
  }, []);
  function close() {
    if (!submitting) dialog.current?.close();
  }
  function addSkill(value: string) {
    const next = value.trim();
    if (
      next &&
      !skills.some((item) => item.toLowerCase() === next.toLowerCase())
    )
      setSkills([...skills, next]);
    setSkill("");
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = applicationSchema.safeParse({
      skills,
      portfolio,
      motivation,
      commitment,
    });
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [
            String(issue.path[0]),
            issue.message,
          ]),
        ),
      );
      return;
    }
    setErrors({});
    if (!onSubmit) {
      setErrors({
        root: "Layanan pengajuan belum terhubung. Pengajuan belum dikirim.",
      });
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(result.data);
      dialog.current?.close();
    } catch (error) {
      setErrors({
        root:
          error instanceof Error
            ? error.message
            : "Pengajuan gagal dikirim. Silakan coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  }
  function errorFor(name: string) {
    return errors[name] ? (
      <p
        id={`${name}-error`}
        role="alert"
        className="mt-1 text-[11px] text-red-600"
      >
        {errors[name]}
      </p>
    ) : null;
  }
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onCancel={(event) => {
        if (submitting) event.preventDefault();
      }}
      aria-labelledby="apply-title"
      aria-describedby="apply-description"
      className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-[540px] overflow-y-auto rounded-xl border-t-[3px] border-[#0076D3] bg-white p-5 text-[#1C1B1B] shadow-2xl backdrop:bg-black/35 backdrop:backdrop-blur-[3px] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FCDEA0] px-2 py-0.5 text-[10px] text-[#705C2A]">
            <span className="size-1 rounded-full bg-current" />
            {projectName} · Perekrutan Terbuka
          </span>
          <h2
            id="apply-title"
            className="mt-2 text-xl font-semibold tracking-tight"
          >
            Ajukan Diri ke Project
          </h2>
        </div>
        <button
          type="button"
          aria-label="Tutup formulir pengajuan"
          onClick={close}
          disabled={submitting}
          className="rounded p-1 text-[#555965] hover:bg-[#F6F3F2]"
        >
          <X size={18} />
        </button>
      </div>
      <p
        id="apply-description"
        className="mt-1 text-xs leading-5 text-[#555965]"
      >
        Lengkapi data pengajuan untuk ditinjau oleh Project Lead ({lead}).
      </p>
      <form onSubmit={submit} noValidate className="mt-4">
        <fieldset
          disabled={submitting}
          className="space-y-4 disabled:opacity-60"
        >
          <legend className="sr-only">Data pengajuan posisi</legend>
          <div>
            <p className="mb-1.5 text-xs font-medium">Posisi yang Dituju</p>
            <div className="flex items-center gap-2 rounded-lg bg-[#F6F3F2] p-2.5">
              <span className="rounded bg-[#D4E3FF] p-1.5 text-[#0076D3]">
                <Code2 size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-medium">{position.title}</h3>
                <p className="mt-0.5 text-[10px] text-[#717784]">
                  {position.id === "designer"
                    ? "Departemen Desain Produk"
                    : "Departemen Teknis & Komputasi"}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#A3F2D7] px-1.5 py-1 text-[10px] text-[#08634F]">
                <Zap size={11} />
                {position.capacity - position.filled} slot tersisa
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="apply-skill"
                className="flex items-center gap-1 text-xs font-medium"
              >
                <Code2 size={13} className="text-[#0076D3]" />
                Kemampuan & Tech Stack
              </label>
              <span className="text-[10px] text-[#717784]">Wajib diisi</span>
            </div>
            <p className="mb-2 mt-1 text-[10px] text-[#717784]">
              Tambahkan keahlian teknis satu per satu atau pilih dari
              rekomendasi cepat.
            </p>
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F6F3F2] p-1.5">
              {skills.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded border border-[#EAE7E7] bg-white px-2 py-1 text-[11px]"
                >
                  {item}
                  <button
                    type="button"
                    aria-label={`Hapus keahlian ${item}`}
                    onClick={() =>
                      setSkills(skills.filter((value) => value !== item))
                    }
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <input
                id="apply-skill"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill(skill);
                  }
                }}
                aria-invalid={!!errors.skills}
                aria-describedby={errors.skills ? "skills-error" : undefined}
                placeholder="Ketik skill lalu Enter"
                className="min-w-24 flex-1 bg-transparent px-1 py-1 text-xs outline-none placeholder:text-[#A3AAB5]"
              />
              <button
                type="button"
                onClick={() => addSkill(skill)}
                className="rounded bg-[#EAE7E7] px-2 py-1 text-[11px]"
              >
                + Tambah
              </button>
            </div>
            {errorFor("skills")}
            <div className="mt-2 flex flex-wrap items-center gap-1">
              <span className="mr-1 text-[10px] text-[#717784]">
                Saran Cepat:
              </span>
              {[
                ...new Set([
                  ...position.skills,
                  "Next.js",
                  "Redux",
                  "REST API",
                  "Zustand",
                ]),
              ]
                .filter(
                  (item) =>
                    !skills.some(
                      (value) => value.toLowerCase() === item.toLowerCase(),
                    ),
                )
                .map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => addSkill(item)}
                    className="inline-flex items-center gap-0.5 rounded-full bg-[#F0EEEE] px-2 py-0.5 text-[10px] text-[#555965]"
                  >
                    <Plus size={10} />
                    {item}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between gap-2">
              <label
                htmlFor="apply-portfolio"
                className="flex items-center gap-1 text-xs font-medium"
              >
                <Link2 size={13} className="text-[#0076D3]" />
                Tautan Portofolio / Repositori Proyek
              </label>
              <span className="text-[10px] text-[#717784]">Wajib diisi</span>
            </div>
            <p className="mb-2 mt-1 text-[10px] text-[#717784]">
              Sertakan link GitHub, GitLab, tautan deploy demo, atau portofolio
              desain relevan.
            </p>
            <input
              id="apply-portfolio"
              type="url"
              required
              value={portfolio}
              onChange={(event) => setPortfolio(event.target.value)}
              placeholder="https://github.com/nama/proyek"
              aria-invalid={!!errors.portfolio}
              aria-describedby={
                errors.portfolio ? "portfolio-error" : undefined
              }
              className={inputClass}
            />
            {errorFor("portfolio")}
          </div>
          <div>
            <div className="flex justify-between gap-2">
              <label htmlFor="apply-motivation" className="text-xs font-medium">
                Alasan Ingin Bergabung
              </label>
              <span className="text-[10px] text-[#717784]">Wajib diisi</span>
            </div>
            <p className="mb-2 mt-1 text-[10px] text-[#717784]">
              Ceritakan singkat kontribusi yang ingin kamu bawa dan komitmen
              waktumu.
            </p>
            <textarea
              id="apply-motivation"
              required
              minLength={20}
              maxLength={2000}
              rows={3}
              value={motivation}
              onChange={(event) => setMotivation(event.target.value)}
              placeholder="Ceritakan motivasi dan pengalaman yang relevan..."
              aria-invalid={!!errors.motivation}
              aria-describedby={
                errors.motivation ? "motivation-error" : undefined
              }
              className={`${inputClass} resize-y leading-5`}
            />
            {errorFor("motivation")}
          </div>
          <div>
            <label className="flex cursor-pointer items-start gap-2 rounded-lg bg-[#FAF8F7] p-2.5">
              <input
                type="checkbox"
                required
                checked={commitment}
                onChange={(event) => setCommitment(event.target.checked)}
                aria-invalid={!!errors.commitment}
                aria-describedby={
                  errors.commitment ? "commitment-error" : undefined
                }
                className="mt-0.5 size-3.5 accent-[#005DA9]"
              />
              <span>
                <span className="block text-[11px] font-medium">
                  Siap mengikuti jadwal sync mingguan tim BCC
                </span>
                <span className="mt-0.5 block text-[10px] text-[#717784]">
                  Jadwal pertemuan dan durasi sprint akan dikonfirmasi bersama
                  Project Lead.
                </span>
              </span>
            </label>
            {errorFor("commitment")}
          </div>
          <div className="flex gap-1.5 rounded-lg bg-[#F0EEEE] p-2.5">
            <Info size={14} className="shrink-0 text-[#0076D3]" />
            <p className="text-[10px] leading-4 text-[#717784]">
              Pengajuan akan masuk ke antrean review Project Lead. Pantau
              notifikasi update status seleksi secara berkala pada menu
              Pengajuan Saya.
            </p>
          </div>
        </fieldset>
        {errorFor("root")}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={close}
            disabled={submitting}
            className="text-xs text-[#555965]"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1 rounded-lg bg-[#005DA9] px-4 py-3 text-xs text-white hover:bg-[#004B89] disabled:opacity-50"
          >
            {submitting ? "Mengirim..." : "Kirim Pengajuan"}
            <ArrowRight size={13} />
          </button>
        </div>
      </form>
    </dialog>
  );
}
