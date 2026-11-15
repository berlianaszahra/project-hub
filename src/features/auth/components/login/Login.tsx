"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type LoginData = { email: string; password: string };
type LoginProps = {
  onLogin?: (data: LoginData) => void | Promise<void>;
  onGoogleLogin?: () => void | Promise<void>;
};

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.3A10.8 10.8 0 0 1 12 5c5 0 9 4.5 10 7-.4 1-1.4 2.4-2.8 3.7M6.6 6.6C4.4 8 2.7 10.3 2 12c1 2.5 5 7 10 7a10 10 0 0 0 4.4-.9" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.37 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.24 5.48-4.73 7.18l7.73 6C44.45 38.03 46.98 31.89 46.98 24.55Z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.92-2.13 15.89-5.8l-7.73-6C30.02 37.65 27.34 38.5 24 38.5c-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  );
}

export default function Login({ onLogin, onGoogleLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!onLogin) {
      setError("Login belum terhubung ke layanan autentikasi.");
      return;
    }
    try {
      setSubmitting(true);
      await onLogin({ email, password });
    } catch {
      setError("Gagal masuk. Periksa kembali akun atau coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    if (!onGoogleLogin) {
      setError("Login Google belum dikonfigurasi.");
      return;
    }
    try {
      setSubmitting(true);
      await onGoogleLogin();
    } catch {
      setError("Login Google gagal. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF9F8] px-4 py-12 font-sans text-[#1C1B1B]">
      <section aria-label="Login ProjectHub" className="w-full max-w-[400px]">
        <div className="mb-6 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0EDED] shadow-sm" aria-label="BCC ProjectHub">
            <svg viewBox="0 0 28 28" width="28" height="28" fill="none" aria-hidden="true">
              <rect x="4" y="4" width="9" height="9" rx="2" fill="#005DA9" />
              <rect x="15" y="4" width="9" height="9" rx="2" fill="#0C6854" />
              <rect x="4" y="15" width="9" height="9" rx="2" fill="#0C6854" />
              <rect x="15" y="15" width="9" height="9" rx="2" fill="#005DA9" />
            </svg>
          </div>
        </div>

        <header className="mb-8 text-center">
          <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.55px]">Masuk ke ProjectHub</h1>
          <p className="mt-2 text-sm leading-[22px] text-[#717784]">Masuk untuk melanjutkan ke workspace.</p>
        </header>

        
        <form onSubmit={handleSubmit} noValidate={false}>
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium leading-4 tracking-[0.12px] text-[#414752]">Email</label>
            <input id="login-email" type="email" name="email" autoComplete="email" required placeholder="nadia@bcc.id" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-[#E9E9E7] bg-white px-3 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/15" />
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="login-password" className="text-xs font-medium leading-4 tracking-[0.12px] text-[#414752]">Password</label>
              <Link href="/forgot-password" className="text-[11px] leading-[14px] tracking-[0.22px] text-[#005DA9] hover:underline">Lupa password?</Link>
            </div>
            <div className="relative">
              <input id="login-password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" required placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-lg border border-[#E9E9E7] bg-white py-2.5 pl-3 pr-11 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/15" />
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"} aria-pressed={showPassword} className="absolute right-2.5 top-2 flex h-7 w-7 items-center justify-center rounded text-[#717784] hover:bg-[#F6F3F2] focus-visible:outline-2 focus-visible:outline-[#005DA9]">
                <EyeIcon hidden={showPassword} />
              </button>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#005DA9] text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#004D8D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005DA9] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Memproses..." : "Masuk"}
          </button>
          {error && <p role="alert" className="mt-3 text-xs text-red-700">{error}</p>}
        </form>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] leading-[14px] tracking-[0.22px] text-[#717784]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0C6854]" />
          Akses khusus anggota workspace BCC
        </p>

        <div className="relative my-7 h-px bg-[#E5E2E1]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FCF9F8] px-3 text-[11px] uppercase leading-[14px] tracking-[0.55px] text-[#717784]">atau</span>
        </div>

        <button type="button" onClick={handleGoogleLogin} disabled={submitting} className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-[#E9E9E7] bg-white px-4 text-sm font-medium text-[#1C1B1B] transition-colors hover:bg-[#F9F8F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005DA9] disabled:cursor-not-allowed disabled:opacity-60">
          <GoogleIcon />
          Lanjutkan dengan Google
        </button>

        <p className="mt-8 text-center text-sm leading-[22px] text-[#717784]">
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-[#005DA9] hover:underline">Daftar</Link>
        </p>

        <footer className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-[#E5E2E1] pt-4 text-[11px] leading-[14px] tracking-[0.22px] text-[#717784]">
          <span>© BCC ProjectHub</span>
          <span aria-hidden="true">·</span>
          <span>Workspace internal</span>
          <span aria-hidden="true">·</span>
          <span>2026</span>
          <span></span>
        </footer>
      </section>
    </main>
  );
}
