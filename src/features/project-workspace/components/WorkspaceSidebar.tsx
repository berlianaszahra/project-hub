import {
  ArrowLeft,
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
  LockKeyhole,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  type Workspace,
  type WorkspaceTab,
  workspaceTabs,
} from "../types/workspace";

const icons = {
  ringkasan: LayoutDashboard,
  posisi: BriefcaseBusiness,
  pengajuan: ClipboardList,
  anggota: Users,
  pengaturan: Settings,
};
export function workspaceHref(id: string, tab: WorkspaceTab = "ringkasan") {
  return `/projek-saya/${id}${tab === "ringkasan" ? "" : `/${tab}`}`;
}
export default function WorkspaceSidebar({
  workspace,
  tab,
  open,
  onClose,
}: {
  workspace: Workspace;
  tab: WorkspaceTab;
  open: boolean;
  onClose: () => void;
}) {
  const lead = workspace.role === "Project Lead";
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-14 z-40 flex w-60 flex-col border-r border-[#EAE7E7] bg-[#F6F3F2] px-3 py-5 transition-transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Link
          href="/projek-saya"
          className="mb-5 inline-flex items-center gap-1.5 px-2 text-xs text-[#555965]"
        >
          <ArrowLeft size={13} />
          Kembali ke Project Saya
        </Link>
        <p className="px-2 text-[10px] tracking-wider text-[#929296]">
          RUANG KERJA
        </p>
        <div className="mb-4 mt-1 flex items-center justify-between gap-2 border-b border-[#EAE7E7] px-2 pb-4">
          <p className="font-semibold">{workspace.name}</p>
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] ${lead ? "bg-[#FCDEA0] text-[#705C2A]" : "bg-[#D4E3FF] text-[#34567E]"}`}
          >
            {workspace.role}
          </span>
        </div>
        <nav aria-label="Navigasi ruang kerja" className="space-y-1">
          {workspaceTabs
            .filter((item) => !item.leadOnly || lead)
            .map((item) => {
              const Icon = icons[item.id];
              return (
                <Link
                  key={item.id}
                  href={workspaceHref(workspace.id, item.id)}
                  onClick={onClose}
                  aria-current={tab === item.id ? "page" : undefined}
                  className={`flex items-center gap-2 rounded px-2 py-2.5 text-sm ${tab === item.id ? "bg-[#E5E1E1] font-medium" : "text-[#555965] hover:bg-[#EAE7E7]"}`}
                >
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
        </nav>
        <div className="mt-auto flex gap-2 rounded bg-white p-2 text-[11px]">
          {lead ? (
            <ShieldCheck size={15} className="text-[#087663]" />
          ) : (
            <LockKeyhole size={15} className="text-[#717784]" />
          )}
          <div>
            {lead ? "Akses Penuh Lead" : "Akses Terbatas"}
            {!lead && (
              <p className="text-[10px] text-[#929296]">Hanya Kontributor</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
