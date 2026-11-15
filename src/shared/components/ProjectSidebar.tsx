"use client";

import {
  BriefcaseBusiness,
  Compass,
  FolderOpen,
  LayoutDashboard,
  Send,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ProjectSidebarProps = {
  open: boolean;
  onClose: () => void;
  workspaceProjectId?: string;
};

export default function ProjectSidebar({
  open,
  onClose,
  workspaceProjectId,
}: ProjectSidebarProps) {
  const pathname = usePathname();
  const links = workspaceProjectId
    ? [
        {
          href: `/katalog/${workspaceProjectId}#ringkasan`,
          label: "Ringkasan",
          icon: LayoutDashboard,
        },
        {
          href: `/katalog/${workspaceProjectId}#posisi`,
          label: "Posisi",
          icon: BriefcaseBusiness,
        },
        { href: "/pengajuan-saya", label: "Pengajuan", icon: Send },
        {
          href: `/katalog/${workspaceProjectId}#anggota`,
          label: "Anggota",
          icon: Users,
        },
      ]
    : [
        { href: "/katalog", label: "Katalog Project", icon: Compass },
        { href: "/projek-saya", label: "Project Saya", icon: FolderOpen },
        { href: "/pengajuan-saya", label: "Pengajuan Saya", icon: Send },
      ];
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#EAE7E7] bg-[#F6F3F2] transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center border-b border-[#EAE7E7] px-6">
          <Image
            src="/images/BCC horizontal.png"
            alt="BCC ProjectHub"
            width={160}
            height={55}
            priority
            className="h-auto max-h-12 w-auto max-w-full object-contain"
          />
        </div>

        {/* Navigation */}
        <nav aria-label="Navigasi project" className="flex-1 px-4 py-7">
          <p className="px-3 text-[11px] font-semibold tracking-[0.12em] text-[#717784]">
            {workspaceProjectId ? "RUANG KERJA" : "EKSPLORASI"}
          </p>

          <div className="mt-4 space-y-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-[#EAE7E7] ${active ? "bg-[#EAE7E7] font-medium text-[#1C1B1B]" : "text-[#414752]"}`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-[#EAE7E7] p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            {/* Avatar */}
            <div className="flex size-9 items-center justify-center rounded-full bg-[#D4E3FF] text-sm font-semibold text-[#001C39]">
              N
            </div>

            {/* User Information */}
            <div>
              <p className="text-sm font-medium text-[#1C1B1B]">Nadia</p>

              <p className="text-xs text-[#717784]">Frontend Member</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
