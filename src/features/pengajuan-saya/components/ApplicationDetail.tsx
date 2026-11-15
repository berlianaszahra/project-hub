import {
  Check,
  ExternalLink,
  Flag,
  Link2,
  MessageSquare,
  ScanEye,
} from "lucide-react";
import type { Application } from "../types/application";
import ApplicationStatus from "./ApplicationStatus";

export default function ApplicationDetail({
  application: a,
}: {
  application: Application;
}) {
  const steps = [
    { title: "Pengajuan Dikirim", caption: a.date, done: true },
    {
      title: "Diterima oleh Project Lead",
      caption:
        a.status === "pending"
          ? "Menunggu pemeriksaan project lead"
          : `${a.lead} telah menerima berkas`,
      done: a.status !== "pending" && a.status !== "withdrawn",
    },
    {
      title: "Tinjauan Teknis & Portofolio",
      caption:
        a.status === "review"
          ? "Sedang berlangsung oleh tim kurasi"
          : a.status === "accepted"
            ? "Tinjauan selesai"
            : "Menunggu tinjauan tim",
      done: a.status === "accepted",
      active: a.status === "review",
    },
    {
      title: "Keputusan Final",
      caption:
        a.status === "accepted"
          ? "Selamat, kamu diterima!"
          : a.status === "withdrawn"
            ? "Pengajuan telah dibatalkan"
            : "Menunggu penyelesaian review",
      done: a.status === "accepted",
    },
  ];
  return (
    <aside
      aria-label={`Rincian pengajuan ${a.name}`}
      className="rounded-xl bg-[#F6F3F2] p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] tracking-wider text-[#555965]">
          RINCIAN PENGAJUAN
        </p>
        <ApplicationStatus status={a.status} />
      </div>
      <h2 className="text-lg font-semibold">{a.name}</h2>
      <p className="text-xs text-[#555965]">
        Dipimpin oleh {a.lead} (Project Lead)
      </p>
      <div className="my-3 border-t border-[#EAE7E7]" />
      <p className="text-[10px] tracking-wider text-[#555965]">
        POSISI YANG DIAJUKAN
      </p>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">{a.role}</h3>
        <span className="rounded bg-[#EFEBEB] px-2 py-1 text-[10px]">
          Kuota: 1 posisi terbuka
        </span>
      </div>
      <p className="mb-2 mt-4 text-[10px] tracking-wider text-[#555965]">
        STATUS PROGRES KURASI
      </p>
      <ol className="space-y-2">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`flex gap-2 ${step.active ? "text-[#0076D3]" : step.done ? "text-[#1C1B1B]" : "text-[#929296]"}`}
          >
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-[#19785F] text-white" : step.active ? "bg-[#0076D3] text-white" : "bg-[#EAE7E7]"}`}
            >
              {step.done ? (
                <Check size={13} />
              ) : index === 2 ? (
                <ScanEye size={13} />
              ) : (
                <Flag size={12} />
              )}
            </span>
            <div>
              <p className="text-xs">{step.title}</p>
              <p className="text-[10px] text-[#717784]">{step.caption}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mb-2 mt-5 text-[10px] tracking-wider text-[#555965]">
        KEMAMPUAN YANG DISERTAKAN
      </p>
      <div className="flex flex-wrap gap-1.5">
        {a.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-[#EFEBEB] px-2 py-1 text-[11px]"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="mb-2 mt-5 text-[10px] tracking-wider text-[#555965]">
        TAUTAN BERKAS & PORTOFOLIO
      </p>
      <div className="space-y-1.5">
        {a.portfolio.length ? (
          a.portfolio.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded bg-[#EFEBEB] p-2 text-xs hover:bg-[#E5E0E0]"
            >
              <Link2 size={13} className="shrink-0 text-[#717784]" />
              <span className="min-w-0 flex-1 break-all">{link.label}</span>
              <ExternalLink size={12} className="shrink-0 text-[#717784]" />
            </a>
          ))
        ) : (
          <p className="text-xs text-[#717784]">
            Tidak ada tautan yang disertakan.
          </p>
        )}
      </div>
      <p className="mb-2 mt-5 text-[10px] tracking-wider text-[#555965]">
        ALASAN INGIN BERGABUNG
      </p>
      <blockquote className="rounded bg-[#EFEBEB] p-2.5 text-xs leading-5">
        “{a.motivation}”
      </blockquote>
      <p className="mt-4 flex items-start gap-1 rounded bg-white p-2 text-[10px] text-[#717784]">
        <MessageSquare size={13} className="shrink-0" />
        Pertanyaan seputar proses? Hubungi panitia via Discord internal BCC.
      </p>
    </aside>
  );
}
