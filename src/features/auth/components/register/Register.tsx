
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

type RegisterProps = {
  onRegister?: (
    data: RegisterFormData,
  ) => Promise<void> | void;
  loginHref?: string;
  logoSrc?: string;
};

export default function Register({
  onRegister,
  loginHref = "/login",
  logoSrc = "/images/BCC horizontal.png",
}: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Handle Register
  const onSubmit = async (data: RegisterFormData) => {
    clearErrors("root");
    setSuccess(false);

    if (!onRegister) {
      setError("root", {
        message: "Layanan registrasi belum terhubung.",
      });
      return;
    }

    try {
      await onRegister(data);

      setSuccess(true);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Registrasi gagal. Silakan coba lagi.",
      });
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
              alt="BCC ProjectHub"
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
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
                type="text"
                autoComplete="name"
                placeholder="Masukkan nama lengkap"
                disabled={isSubmitting || success}
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName
                    ? "fullName-error"
                    : undefined
                }
                {...register("fullName")}
                className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:ring-2 disabled:opacity-60 ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#DCE2E9] focus:border-[#005DA9] focus:ring-[#005DA9]/10"
                }`}
              />

              {errors.fullName && (
                <p
                  id="fullName-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-600"
                >
                  {errors.fullName.message}
                </p>
              )}
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
                type="email"
                autoComplete="email"
                placeholder="Masukkan email"
                disabled={isSubmitting || success}
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email
                    ? "register-email-error"
                    : undefined
                }
                {...register("email")}
                className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:ring-2 disabled:opacity-60 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#DCE2E9] focus:border-[#005DA9] focus:ring-[#005DA9]/10"
                }`}
              />

              {errors.email && (
                <p
                  id="register-email-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-600"
                >
                  {errors.email.message}
                </p>
              )}
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

                <span className="text-xs text-[#98A2B3]">
                  Min. 8 karakter
                </span>
              </div>

              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  disabled={isSubmitting || success}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password
                      ? "register-password-error"
                      : "register-password-hint"
                  }
                  {...register("password")}
                  className={`h-11 w-full rounded-lg border bg-white px-3.5 pr-12 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:ring-2 disabled:opacity-60 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                      : "border-[#DCE2E9] focus:border-[#005DA9] focus:ring-[#005DA9]/10"
                  }`}
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  disabled={isSubmitting || success}
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-3 flex items-center justify-center disabled:opacity-60"
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
              <p
                id="register-password-hint"
                className="mt-2 text-xs leading-5 text-[#7A8494]"
              >
                Gunakan password minimal 8 karakter untuk
                menjaga keamanan akun Anda.
              </p>

              {errors.password && (
                <p
                  id="register-password-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-600"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* API Error */}
            {errors.root?.message && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600"
              >
                {errors.root.message}
              </p>
            )}

            {/* Success Message */}
            {success && (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700"
              >
                Pendaftaran berhasil. Silakan masuk
                menggunakan akun Anda.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#005DA9] text-sm font-semibold text-white transition hover:bg-[#004D8C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Memproses..."
                : success
                  ? "Pendaftaran Berhasil"
                  : "Daftar Akun"}
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

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#98A2B3]">
          © {new Date().getFullYear()} ProjectHub.
          All rights reserved.
        </p>
      </div>
    </main>
  );
}
