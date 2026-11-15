"use client";

import { Menu, X } from "lucide-react";
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
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className={`w-fit text-lg font-semibold tracking-tight ${focusStyles}`}
          onClick={() => setMenuOpen(false)}
        >
          BCC ProjectHub
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
          className={`inline-flex size-11 items-center justify-center rounded-lg hover:bg-secondary-bg lg:hidden ${focusStyles}`}
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
        className="border-t border-black/10 px-5 pb-5 sm:px-8 lg:hidden"
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
