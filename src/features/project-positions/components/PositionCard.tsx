import {
  Code2,
  Database,
  Edit3,
  LockKeyhole,
  Palette,
  PauseCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { WorkspaceMember } from "@/features/project-workspace/types/workspace";
import type { RecruitmentPosition } from "../schemas/position.schema";

type Props = {
  position: RecruitmentPosition;
  members: WorkspaceMember[];
  applicants: number;
  applicantsHref: string;
  recruiting: boolean;
  onEdit: () => void;
  onToggle: () => void;
  onIncrease: () => void;
};
export default function PositionCard({
  position: p,
  members,
  applicants,
  applicantsHref,
  recruiting,
  onEdit,
  onToggle,
  onIncrease,
}: Props) {
  const full = p.filled >= p.capacity;
  const open = !full && p.status === "open" && recruiting;
  const Icon =
    p.category === "Design"
      ? Palette
      : /backend/i.test(p.name)
        ? Database
        : Code2;
  return (
    <article className="rounded-xl border border-[#F0EEEE] bg-white p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex gap-3">
          <span
            className={`h-fit rounded-lg p-2 ${p.category === "Design" ? "bg-[#FFF0D2] text-[#86641F]" : "bg-[#EAF4FF] text-[#0076D3]"}`}
          >
            <Icon size={22} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold">{p.name}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${open ? "bg-[#A3F2D7] text-[#08634F]" : "bg-[#EAE7E7] text-[#717784]"}`}
              >
                •{" "}
                {full
                  ? "Kuota Penuh"
                  : p.status === "paused"
                    ? "Ditutup Sementara"
                    : p.status === "closed"
                      ? "Ditutup Permanen"
                      : !recruiting
                        ? "Proyek Tidak Merekrut"
                        : "Buka Rekrutmen"}
              </span>
              <span
                className={`rounded px-2 py-0.5 text-[10px] ${p.priority ? "bg-[#FFF0D2] text-[#86641F]" : "bg-[#F6F3F2] text-[#717784]"}`}
              >
                {p.priority ? "Prioritas Tinggi" : p.category}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[#717784]">
              {p.description}
            </p>
          </div>
        </div>
        <div className="h-fit shrink-0 rounded-lg bg-[#FAF8F7] p-3 text-[10px]">
          <p className="text-[#717784]">
            Keterisian:{" "}
            <span className="text-[#1C1B1B]">
              {p.filled} / {p.capacity} Slot{full ? " (Penuh)" : ""}
            </span>
          </p>
          <progress
            value={p.filled}
            max={p.capacity}
            aria-label={`Keterisian ${p.name}`}
            className="my-1 h-1 w-full accent-[#005DA9]"
          />
          <p
            className={
              full
                ? "text-[#717784]"
                : p.filled === 0
                  ? "text-[#86641F]"
                  : "text-[#087663]"
            }
          >
            {full
              ? "Rekrutmen Ditutup Otomatis"
              : p.filled === 0
                ? "Posisi Masih Kosong"
                : `${p.capacity - p.filled} Slot Masih Terbuka`}
          </p>
        </div>
      </div>
      <div className="my-5 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] text-[#929296]">KEAHLIAN WAJIB:</span>
        {p.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-[#F0EEEE] px-2 py-1 text-[10px]"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#FAF8F7] p-2.5">
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          <span className="text-[#929296]">ANGGOTA AKTIF:</span>
          {members.length ? (
            members.map((member) => (
              <span
                key={member.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-[#D4E3FF] text-[#005DA9]">
                  {member.name[0]}
                </span>
                {member.name}
                <span className="text-[#929296]">({member.position})</span>
              </span>
            ))
          ) : (
            <span className="rounded-full bg-[#FFF0D2] px-2 py-1 text-[#86641F]">
              Belum ada anggota ditugaskan
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {full && (
            <button
              type="button"
              onClick={onIncrease}
              disabled={p.capacity >= 100}
              className="rounded bg-[#EAF4FF] px-2 py-1.5 text-[10px] text-[#005DA9] disabled:opacity-40"
            >
              +1 Tambah Kuota
            </button>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-1 text-[10px] text-[#717784]"
          >
            {p.status === "open" ? (
              <PauseCircle size={12} />
            ) : (
              <LockKeyhole size={12} />
            )}
            {p.status === "open" ? "Tutup Sementara" : "Buka Lagi"}
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1 rounded bg-[#EAE7E7] px-2 py-1.5 text-[10px]"
          >
            <Edit3 size={12} />
            Edit Posisi
          </button>
          <Link
            href={applicantsHref}
            className="inline-flex items-center gap-1 rounded bg-[#005DA9] px-2 py-1.5 text-[10px] text-white"
          >
            <Users size={12} />
            Kelola Pelamar
            <span className="ml-1 rounded bg-white px-1 text-[#005DA9]">
              {applicants}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
