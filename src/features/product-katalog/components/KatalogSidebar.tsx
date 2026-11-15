
"use client";

import Image from "next/image";
import Link from "next/link";

type KatalogSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function KatalogSidebar({
  open,
  onClose,
}: KatalogSidebarProps) {
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
          aria-label="Navigasi katalog"
          className="flex-1 px-4 py-7"
        >
          <p className="px-3 text-[11px] font-semibold tracking-[0.12em] text-[#717784]">
            EKSPLORASI
          </p>

          {/* Katalog Project */}
          <Link
            href="/katalog"
            aria-current="page"
            onClick={onClose}
            className="mt-4 flex items-center gap-3 rounded-lg bg-[#EAF4FF] px-3 py-2.5 text-sm font-medium text-[#005DA9]"
          >
            <span
              aria-hidden="true"
              className="text-lg"
            >
              ▦
            </span>

            Katalog Project
          </Link>
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
              <p className="text-sm font-medium text-[#1C1B1B]">
                Nadia
              </p>

              <p className="text-xs text-[#717784]">
                Profil contoh desain
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
