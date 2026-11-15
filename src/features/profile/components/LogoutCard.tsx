"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

import { getAuthErrorMessage, logout } from "@/features/auth/api/auth-client";

export default function LogoutCard() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    setPending(true);

    try {
      await logout();
      window.location.replace("/login");
    } catch (error) {
      setError(getAuthErrorMessage(error, "Gagal keluar. Silakan coba lagi."));
      setPending(false);
    }
  }

  return (
    <section
      aria-labelledby="logout-title"
      className="rounded-xl bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
    >
      <h2 id="logout-title" className="text-sm font-semibold text-text-primary">
        Sesi akun
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
        Keluar dari ProjectHub di perangkat ini.
      </p>
      <button
        type="button"
        onClick={handleLogout}
        disabled={pending}
        aria-busy={pending}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-wait disabled:opacity-60"
      >
        <LogOut size={16} aria-hidden="true" />
        {pending ? "Sedang keluar…" : "Keluar dari akun"}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}
