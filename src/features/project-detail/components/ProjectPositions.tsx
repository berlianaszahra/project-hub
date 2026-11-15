import { ArrowRight, UserPlus } from "lucide-react";
import type { OpenPosition } from "../types/project-detail";

type Props = {
  positions: OpenPosition[];
  updatedAt: string;
  onApply: (position: OpenPosition) => void;
};
export default function ProjectPositions({
  positions,
  updatedAt,
  onApply,
}: Props) {
  return (
    <section
      id="posisi"
      className="mt-10 scroll-mt-20"
      aria-labelledby="positions-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="positions-title"
          className="flex items-center gap-1.5 text-xl font-semibold"
        >
          <UserPlus size={17} className="text-[#717784]" />
          Posisi yang Dibutuhkan
        </h2>
        <span className="text-[10px] text-[#717784]">
          Diperbarui{" "}
          {new Intl.DateTimeFormat("id-ID", {
            dateStyle: "medium",
            timeZone: "UTC",
          }).format(new Date(`${updatedAt}T00:00:00Z`))}
        </span>
      </div>
      <div className="mt-4 pl-0 sm:pl-6">
        <p className="mb-4 text-sm leading-6 text-[#555965]">
          Pilih posisi yang sesuai dengan keahlian dan minat kontribusimu. Klik
          ajukan diri untuk mengisi formulir komitmen singkat.
        </p>
        <div className="space-y-3">
          {positions.map((position) => (
            <article key={position.id} className="rounded-xl bg-[#F6F3F2] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold">{position.title}</h3>
                <span
                  className={`rounded px-1.5 py-1 text-[10px] ${position.filled === 0 ? "bg-[#DDF8EE] text-[#087663]" : "bg-[#EAE7E7] text-[#555965]"}`}
                >
                  {position.filled} dari {position.capacity} posisi terisi
                  {position.filled === 0 ? " (Slot Penuh Terbuka)" : ""}
                </span>
                {position.priority && (
                  <span className="rounded bg-[#FBE9C5] px-2 py-1 text-[9px] text-[#705C2A]">
                    PRIORITAS UTAMA
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="max-w-md text-sm leading-6 text-[#555965]">
                  {position.description}
                </p>
                <button
                  type="button"
                  disabled={position.filled >= position.capacity}
                  onClick={() => onApply(position)}
                  className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md bg-[#005DA9] px-3 py-2.5 text-xs text-white hover:bg-[#004B89] disabled:opacity-50"
                >
                  Ajukan Diri
                  <ArrowRight size={13} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1 text-[10px]">
                <span className="mr-1 text-[#717784]">Keahlian:</span>
                {position.skills.map((skill) => (
                  <span key={skill} className="rounded bg-white px-1.5 py-0.5">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
          {!positions.length && (
            <p className="rounded-lg bg-[#F6F3F2] p-6 text-sm text-[#717784]">
              Rekrutmen untuk project ini telah ditutup.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
