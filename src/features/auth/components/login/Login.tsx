"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type LoginFormData, loginSchema } from "../../schemas/login.schema";

type LoginProps = {
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onGoogleLogin?: () => Promise<void> | void;
};

export default function Login({ onLogin, onGoogleLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = isSubmitting || isGoogleLoading;

  // Login menggunakan email dan password
  const onSubmit = async (data: LoginFormData) => {
    clearErrors("root");

    if (!onLogin) {
      setError("root", {
        message: "Layanan login belum terhubung.",
      });
      return;
    }

    try {
      await onLogin(data.email, data.password);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Login gagal. Silakan coba lagi.",
      });
    }
  };

  // Login menggunakan Google
  const handleGoogleLogin = async () => {
    clearErrors("root");

    if (!onGoogleLogin) {
      setError("root", {
        message: "Login Google belum terhubung.",
      });
      return;
    }

    try {
      setIsGoogleLoading(true);
      await onGoogleLogin();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Login Google gagal. Silakan coba lagi.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F8FB] px-4 py-10">
      <div className="w-full max-w-[430px]">
        <section className="rounded-2xl border border-[#E9EDF2] bg-white px-6 py-9 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:px-9">
          {/* Logo BCC */}
          <div className="mb-8 flex flex-col items-center">
            <Image
              src="/images/BCC horizontal.png"
              alt="BCC ProjectHub"
              width={180}
              height={70}
              priority
              className="mb-4 h-auto w-[180px] object-contain"
            />

            <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
              Welcome Back
            </h1>

            <p className="mt-2 text-center text-sm text-[#7A8494]">
              Sign in to your ProjectHub account
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#344054]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:ring-2 disabled:opacity-60 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#DCE2E9] focus:border-[#005DA9] focus:ring-[#005DA9]/10"
                }`}
              />

              {errors.email && (
                <p
                  id="email-error"
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
                  htmlFor="password"
                  className="text-sm font-medium text-[#344054]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#005DA9] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={isLoading}
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

              {errors.password && (
                <p
                  id="password-error"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#005DA9] text-sm font-semibold text-white transition hover:bg-[#004D8C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E9EDF2]" />

            <span className="text-xs text-[#98A2B3]">Or continue with</span>

            <div className="h-px flex-1 bg-[#E9EDF2]" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#DCE2E9] bg-white text-sm font-medium text-[#344054] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Image
              src="/images/google-logo.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />

            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Register Link */}
          <p className="mt-7 text-center text-sm text-[#7A8494]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#005DA9] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </section>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#98A2B3]">
          © {new Date().getFullYear()} ProjectHub. All rights reserved.
        </p>
      </div>
    </main>
  );
}
