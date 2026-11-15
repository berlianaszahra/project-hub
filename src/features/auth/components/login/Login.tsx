
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type LoginProps = {
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onGoogleLogin?: () => Promise<void> | void;
};

export default function Login({
  onLogin,
  onGoogleLogin,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (!onLogin) {
      setError("Layanan login belum terhubung.");
      return;
    }

    try {
      setIsLoading(true);
      await onLogin(email.trim(), password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login gagal. Silakan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    if (!onGoogleLogin) {
      setError("Login Google belum terhubung.");
      return;
    }

    try {
      setIsLoading(true);
      await onGoogleLogin();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login Google gagal. Silakan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F8FB] px-4 py-10">
      <div className="w-full max-w-[430px]">
        <div className="rounded-2xl border border-[#E9EDF2] bg-white px-6 py-9 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:px-9">

          {/* Logo BCC */}
          <div className="mb-8 flex flex-col items-center">
            <Image
              src="/images/BCC horizontal.png"
              alt="BCC Logo"
              width={68}
              height={68}
              priority
              className="mb-4 h-[68px] w-[68px] object-contain"
            />

            <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
              Welcome Back
            </h1>

            <p className="mt-2 text-center text-sm text-[#7A8494]">
              Sign in to your ProjectHub account
            </p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-5">

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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 w-full rounded-lg border border-[#DCE2E9] bg-white px-3.5 pr-12 text-sm text-[#172033] outline-none transition placeholder:text-[#A3AAB5] focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10 disabled:opacity-60"
                />

                {/* Eye Icon dari public/images */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
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

            {/* Sign In */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#005DA9] text-sm font-semibold text-white transition hover:bg-[#004D8C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E9EDF2]" />

            <span className="text-xs text-[#98A2B3]">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-[#E9EDF2]" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#DCE2E9] bg-white text-sm font-medium text-[#344054] transition hover:bg-[#F8FAFC] disabled:opacity-60"
          >
            <Image
              src="/images/google-logo.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />

            Continue with Google
          </button>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-[#7A8494]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#005DA9] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        
      </div>
    </main>
  );
}
