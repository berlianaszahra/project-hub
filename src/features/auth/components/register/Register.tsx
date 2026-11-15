"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterProps = {
  onRegister?: (data: RegisterData) => Promise<void> | void;
  loginHref?: string;
  logoSrc?: string;
};

export default function Register({
  onRegister,
  loginHref = "/login",
  logoSrc = "/images/BCC horizontal.png",
}: RegisterProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!fullName.trim() || !email.trim() || !password) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password harus terdiri dari minimal 8 karakter.");
      return;
    }

    if (!onRegister) {
      setError("Layanan registrasi belum terhubung.");
      return;
    }

    try {
      setIsLoading(true);

      await onRegister({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      setSuccess(true);
      setPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registrasi gagal. Silakan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F8FB] px-4 py-10">
      <div className="w-full max-w-[430px]">
        <section
          aria-labelledby="register-title"
          className="rounded-2xl border border-[#E9EDF2] bg-white px-6 py-9 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:px-9"
        >
          {/* Logo BCC */}
          <div className="mb-8 flex flex-col items-center">
            <Image
              src={logoSrc}
              alt="BCC Logo"
              width={180}
              height={70}
              priority
              className="mb-4 h-auto w-[180px] object-contain"
            />

            <h1
              id="register-title"
              className="text-[25px] font-semibold tracking-tight text-[#172033]"
            >
              Buat Akun Baru
            </h1>

            <p className="mt-2 text-center text-sm text-[#7A8494]">
              Daftar untuk mulai berkolaborasi di BCC.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-[#344054]"
              >
                Nama Lengkap
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Masukkan nama lengkap"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                disabled={isLoading}
                className="h-11 w-full rounded-lg border border-[#DCE2E9] bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10 disabled:opacity-60"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-[#344054]"
              >
                Email Address
              </label>

              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isLoading}
                className="h-11 w-full rounded-lg border border-[#DCE2E9] bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10 disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="register-password"
                  className="text-sm font-medium text-[#344054]"
                >
                  Password
                </label>

                <span className="text-xs text-[#98A2B3]">Min. 8 karakter</span>
              </div>

              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 w-full rounded-lg border border-[#DCE2E9] bg-white px-3.5 pr-12 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10 disabled:opacity-60"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-3 flex items-center justify-center"
                >
                  <Image
                    src={
                      showPassword
                        ? "/images/open-eye.png"
                        : "/images/close-eye.png"
                    }
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>
              </div>

              {/* Password Hint */}
              <p className="mt-2 text-xs leading-5 text-[#7A8494]">
                Gunakan password minimal 8 karakter untuk menjaga keamanan akun
                Anda.
              </p>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <output className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
                Pendaftaran berhasil. Silakan masuk menggunakan akun Anda.
              </output>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#005DA9] text-sm font-semibold text-white transition hover:bg-[#004D8C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Memproses..." : "Daftar Akun"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-[#7A8494]">
            Sudah punya akun?{" "}
            <Link
              href={loginHref}
              className="font-semibold text-[#005DA9] hover:underline"
            >
              Masuk
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
