
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type KatalogSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function KatalogSidebar({
  open,
  onClose,
}: KatalogSidebarProps) {
  const pathname = usePathname();

  // Menentukan halaman yang sedang aktif
  const isKatalogActive = pathname.startsWith("/katalog");

  const isMyProjectsActive =
    pathname === "/projek-saya" ||
    pathname.startsWith("/projek-saya/");

  const isProfileActive =
    pathname === "/profil" ||
    pathname.startsWith("/profil/");

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
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#EAE7E7] bg-white transition-transform lg:translate-x-0 ${
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
        <nav
          aria-label="Navigasi utama"
          className="flex-1 px-4 py-7"
        >
          <p className="px-3 text-[11px] font-semibold tracking-[0.12em] text-[#717784]">
            EKSPLORASI
          </p>

          {/* Katalog Project */}
          <Link
            href="/katalog"
            aria-current={isKatalogActive ? "page" : undefined}
            onClick={onClose}
            className={`mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isKatalogActive
                ? "bg-[#EAF4FF] text-[#005DA9]"
                : "text-[#414752] hover:bg-[#F6F3F2] hover:text-[#005DA9]"
            }`}
          >
            <span
              aria-hidden="true"
              className="text-lg"
            >
              ▦
            </span>

            Katalog Project
          </Link>

          {/* Project Saya */}
          <Link
            href="/projek-saya"
            aria-current={isMyProjectsActive ? "page" : undefined}
            onClick={onClose}
            className={`mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isMyProjectsActive
                ? "bg-[#EAF4FF] text-[#005DA9]"
                : "text-[#414752] hover:bg-[#F6F3F2] hover:text-[#005DA9]"
            }`}
          >
            <span
              aria-hidden="true"
              className="text-lg"
            >
              ▤
            </span>

            Project Saya
          </Link>
        </nav>

        {/* User Profile - Klik untuk membuka halaman Profil */}
        <div className="border-t border-[#EAE7E7] p-4">
          <Link
            href="/profil"
            aria-current={isProfileActive ? "page" : undefined}
            onClick={onClose}
            className={`flex items-center gap-3 rounded-lg px-2 py-2 transition ${
              isProfileActive
                ? "bg-[#EAF4FF]"
                : "hover:bg-[#F6F3F2]"
            }`}
          >
            {/* Avatar */}
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-sm font-semibold text-[#001C39]">
              N
            </div>

            {/* User Information */}
            <div className="min-w-0">
              <p
                className={`text-sm font-medium ${
                  isProfileActive
                    ? "text-[#005DA9]"
                    : "text-[#1C1B1B]"
                }`}
              >
                Nadia
              </p>

              <p className="text-xs text-[#717784]">
                Lihat Profil Saya
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
