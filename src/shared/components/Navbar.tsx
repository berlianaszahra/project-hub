"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Platform", url: "#platform" },
  { name: "Fitur", url: "#fitur" },
  { name: "Cara Kerja", url: "#carakerja" },
  { name: "FAQ", url: "#FAQ" },
];

const focusStyles =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Navigasi utama"
      className="border-b border-black/10 bg-primary-bg text-text-primary"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:gap-6 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link
          href="/"
          className={`flex w-fit min-w-0 items-center gap-2 text-base font-semibold tracking-tight sm:gap-2.5 sm:text-lg ${focusStyles}`}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/bcclogo.png"
            width={40}
            height={40}
            alt=""
            className="size-12 shrink-0 object-contain sm:size-20"
          />
          <span className="whitespace-nowrap">ProjectHub</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.url}>
              <Link
                href={item.url}
                className={`text-sm transition-colors hover:text-primary-blue ${index === 0 ? "font-medium text-primary-blue" : "text-text-primary"} ${focusStyles}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center justify-end gap-6 lg:flex">
          <Link
            href="/profile"
            className={`text-sm hover:text-primary-blue ${focusStyles}`}
          >
            Profil Saya
          </Link>
          <Link
            href="/login"
            className={`text-sm hover:text-primary-blue ${focusStyles}`}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className={`rounded-lg bg-primary-blue px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-blue/90 ${focusStyles}`}
          >
            Mulai Sekarang
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-secondary-bg lg:hidden ${focusStyles}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-black/10 px-4 pb-5 sm:px-8 lg:hidden"
      >
        <ul className="flex flex-col py-3">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.url}>
              <Link
                href={item.url}
                className={`block rounded-lg py-3 text-sm hover:text-primary-blue ${index === 0 ? "font-medium text-primary-blue" : "text-text-primary"} ${focusStyles}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/profile"
          onClick={() => setMenuOpen(false)}
          className={`mb-3 block rounded-lg bg-secondary-bg px-4 py-3 text-center text-sm ${focusStyles}`}
        >
          Profil Saya
        </Link>
        <div className="grid grid-cols-2 gap-3 border-t border-black/10 pt-4 text-center text-sm font-medium">
          <Link
            href="/login"
            className={`rounded-lg bg-secondary-bg px-4 py-3 ${focusStyles}`}
            onClick={() => setMenuOpen(false)}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className={`rounded-lg bg-primary-blue px-4 py-3 text-white hover:bg-primary-blue/90 ${focusStyles}`}
            onClick={() => setMenuOpen(false)}
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
