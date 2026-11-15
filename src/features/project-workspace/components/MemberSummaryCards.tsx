import {
  AlertTriangle,
  ChartPie,
  Laptop,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Workspace } from "../types/workspace";
export default function MemberSummaryCards({
  workspace: w,
}: {
  workspace: Workspace;
}) {
  const leads = w.members.filter((m) => m.role === "Project Lead");
  const contributors = w.members.filter((m) => m.role === "Member");
  const capacity =
    w.positions.reduce((sum, p) => sum + p.capacity, 0) +
    w.members.filter((m) => !w.positions.some((p) => p.name === m.position))
      .length;
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <section className="rounded-xl bg-[#F6F3F2] p-5">
        <div className="flex items-center justify-between text-[#717784]">
          <h2 className="text-[10px] font-medium tracking-wider">
            TOTAL ANGGOTA
          </h2>
          <Users size={16} />
        </div>
        <p className="mt-4 text-xl font-semibold">
          {w.members.length}
          <span className="text-xs font-normal text-[#717784]">
            {" "}
            / {capacity} Kuota Tim
          </span>
        </p>
        <progress
          aria-label="Penggunaan kuota tim"
          max={Math.max(capacity, 1)}
          value={w.members.length}
          className="mt-4 h-1.5 w-full accent-[#0076D3]"
        />
      </section>
      <section className="rounded-xl bg-[#F6F3F2] p-5">
        <div className="flex items-center justify-between text-[#717784]">
          <h2 className="text-[10px] font-medium tracking-wider">
            PROJECT LEAD
          </h2>
          <ShieldCheck size={16} />
        </div>
        <p className="mt-4 text-xl font-semibold">{leads.length} Orang</p>
        <p className="mt-3 text-[11px] leading-5 text-[#717784]">
          <span className="mr-1 text-[#087663]">●</span>
          {leads.map((m) => m.name).join(", ")}
        </p>
      </section>
      <section className="rounded-xl bg-[#F6F3F2] p-5">
        <div className="flex items-center justify-between text-[#717784]">
          <h2 className="text-[10px] font-medium tracking-wider">
            MEMBER KONTRIBUTOR
          </h2>
          <Laptop size={16} />
        </div>
        <p className="mt-4 text-xl font-semibold">
          {contributors.length} Orang
        </p>
        <p className="mt-3 text-[11px] leading-5 text-[#717784]">
          {contributors.map((m) => m.name).join(", ")}
        </p>
      </section>
      <section className="rounded-xl bg-[#F6F3F2] p-5">
        <div className="flex items-center justify-between text-[#717784]">
          <h2 className="text-[10px] font-medium tracking-wider">
            KEBUTUHAN POSISI
          </h2>
          <ChartPie size={16} />
        </div>
        <div className="mt-3 space-y-1.5">
          {w.positions.map((p) => (
            <p
              key={p.id}
              className={`flex items-center gap-1 text-[11px] ${p.filled === 0 ? "text-red-600" : "text-[#555965]"}`}
            >
              {p.filled === 0 && (
                <AlertTriangle size={12} className="shrink-0" />
              )}
              {p.name}: {p.filled}/{p.capacity}
              {p.filled === 0 ? " · masih kosong" : ""}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
