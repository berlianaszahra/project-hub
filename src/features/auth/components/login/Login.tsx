
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

type LoginData = {
  email: string;
  password: string;
};

type LoginProps = {
  onLogin?: (data: LoginData) => void | Promise<void>;
  onGoogleLogin?: () => void | Promise<void>;
};

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <Image
      src={hidden ? "/images/open-eye.png" : "/images/close-eye.png"}
      alt=""
      width={18}
      height={18}
      className="h-[18px] w-[18px] object-contain"
    />
  );
}

function GoogleIcon() {
  return (
    <Image
      src="/images/google-logo.png"
      alt=""
      width={18}
      height={18}
      className="h-[18px] w-[18px] object-contain"
    />
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
      await onLogin({ email: email.trim(), password });
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
      <section
        aria-label="Login ProjectHub"
        className="w-full max-w-[400px]"
      >
        {/* BCC Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/BCC horizontal.png"
            alt="BCC ProjectHub"
            width={180}
            height={70}
            className="h-auto w-[180px] object-contain"
            priority
          />
        </div>

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.55px]">
            Masuk ke ProjectHub
          </h1>
          <p className="mt-2 text-sm leading-[22px] text-[#717784]">
            Masuk untuk melanjutkan ke workspace.
          </p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-medium leading-4 tracking-[0.12px] text-[#414752]"
            >
              Email
            </label>

            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="berlian@bcc.id"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#E9E9E7] bg-white px-3 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/15"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label
                htmlFor="login-password"
                className="text-xs font-medium leading-4 tracking-[0.12px] text-[#414752]"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-[11px] leading-[14px] tracking-[0.22px] text-[#005DA9] hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full rounded-lg border border-[#E9E9E7] bg-white py-2.5 pl-3 pr-11 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/15"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword
                    ? "Sembunyikan sandi"
                    : "Tampilkan sandi"
                }
                aria-pressed={showPassword}
                className="absolute right-2.5 top-2 flex h-7 w-7 items-center justify-center rounded text-[#717784] hover:bg-[#F6F3F2] focus-visible:outline-2 focus-visible:outline-[#005DA9]"
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#005DA9] text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#004D8D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005DA9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Memproses..." : "Masuk"}
          </button>

          {error && (
            <p role="alert" className="mt-3 text-xs text-red-700">
              {error}
            </p>
          )}
        </form>

        {/* Workspace Information */}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] leading-[14px] tracking-[0.22px] text-[#717784]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0C6854]" />
          Akses khusus anggota workspace BCC
        </p>

        {/* Separator */}
        <div className="relative my-7 h-px bg-[#E5E2E1]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FCF9F8] px-3 text-[11px] uppercase leading-[14px] tracking-[0.55px] text-[#717784]">
            atau
          </span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-[#E9E9E7] bg-white px-4 text-sm font-medium text-[#1C1B1B] transition-colors hover:bg-[#F9F8F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005DA9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleIcon />
          Lanjutkan dengan Google
        </button>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm leading-[22px] text-[#717784]">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-medium text-[#005DA9] hover:underline"
          >
            Daftar
          </Link>
        </p>

        {/* Footer */}
        <footer className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-[#E5E2E1] pt-4 text-[11px] leading-[14px] tracking-[0.22px] text-[#717784]">
          <span>© BCC ProjectHub</span>
          <span aria-hidden="true">·</span>
          <span>Workspace internal</span>
          <span aria-hidden="true">·</span>
          <span>2026</span>
        </footer>
      </section>
    </main>
  );
}
