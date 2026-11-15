"use client";

type KatalogHeaderProps = {
  onMenuClick: () => void;
};

export default function KatalogHeader({ onMenuClick }: KatalogHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#EAE7E7] bg-white/95 px-5 backdrop-blur lg:pl-8">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Buka menu"
          className="rounded-lg border border-[#EAE7E7] px-3 py-1.5 text-sm lg:hidden"
        >
          ☰
        </button>

        {/* Brand */}
        <span className="text-sm font-medium text-[#414752]">
          BCC ProjectHub
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div
          className="flex size-8 items-center justify-center rounded-full bg-[#D4E3FF] text-xs font-semibold text-[#001C39]"
          role="img"
          aria-label="Akun contoh Nadia"
        >
          N
        </div>
      </div>
    </header>
  );
}
