
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterProps = {
  onRegister?: (data: RegisterData) => void | Promise<void>;
  loginHref?: string;
  logoSrc?: string;
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

export default function Register({
  onRegister,
  loginHref = "/login",
  logoSrc = "/images/BCC horizontal.png",
}: RegisterProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 8) {
      setError("Kata sandi harus terdiri dari minimal 8 karakter.");
      return;
    }

    if (!onRegister) {
      setError("Layanan registrasi belum terhubung.");
      return;
    }

    try {
      setSubmitting(true);

      await onRegister({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      setSuccess(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Registrasi gagal. Silakan coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <section
        className="register-card"
        aria-labelledby="register-title"
      >
        {/* BCC Logo */}
        <div className="register-brand">
          <Image
            className="register-logo"
            src={logoSrc}
            alt="BCC ProjectHub"
            width={180}
            height={70}
            priority
          />
        </div>

        {/* Header */}
        <header className="register-heading">
          <h1 id="register-title">Buat akun baru</h1>
          <p>Daftar untuk mulai berkolaborasi di BCC.</p>
        </header>

        {/* Register Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Nama Lengkap */}
          <div className="register-field">
            <label htmlFor="full-name">Nama Lengkap</label>
            <input
              id="full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Berlin"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="register-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="berlian@bcc.id"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="register-field">
            <div className="register-password-label">
              <label htmlFor="register-password">Password</label>
              <span>Min. 8 karakter</span>
            </div>

            <div className="register-password-input">
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
              />

              <button
                type="button"
                className="register-eye"
                aria-label={
                  showPassword
                    ? "Sembunyikan kata sandi"
                    : "Tampilkan kata sandi"
                }
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>
          </div>

          {/* Password Hint */}
          <p className="register-hint">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m6 10 2.5 2.5L14 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              Gunakan kata sandi minimal 8 karakter untuk menjaga
              keamanan akun Anda.
            </span>
          </p>

          {/* Feedback */}
          {error && (
            <p
              className="register-feedback register-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              className="register-feedback register-success"
              role="status"
            >
              Pendaftaran berhasil.
            </p>
          )}

          {/* Submit Button */}
          <button
            className="register-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Memproses..." : "Daftar Akun"}
            {!submitting && (
              <span aria-hidden="true">→</span>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="register-login">
          Sudah punya akun?{" "}
          <Link href={loginHref}>Masuk</Link>
        </p>

        {/* Footer */}
        <p className="register-trust">
          <svg
            viewBox="0 0 16 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2.5" y="8" width="11" height="9" rx="2" />
            <path d="M5 8V5a3 3 0 0 1 6 0v3" />
          </svg>
          <span>Ruang kerja aman untuk kolaborasi tim.</span>
        </p>
      </section>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
          background: #fcf9f8;
          font-family: Inter, Arial, sans-serif;
          box-sizing: border-box;
        }

        .register-page * {
          box-sizing: border-box;
        }

        .register-card {
          width: 100%;
          max-width: 420px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .register-brand {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-bottom: 24px;
        }

        .register-brand :global(.register-logo) {
          display: block;
          width: 180px;
          height: auto;
          object-fit: contain;
        }

        .register-heading {
          width: 100%;
          text-align: center;
          margin-bottom: 32px;
        }

        .register-heading h1 {
          margin: 0 0 8px;
          color: #1c1b1b;
          font-size: 22px;
          font-weight: 600;
          line-height: 28px;
          letter-spacing: -0.55px;
        }

        .register-heading p {
          margin: 0;
          color: #414752;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }

        .register-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .register-field {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .register-field label {
          color: #1c1b1b;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
        }

        .register-field input {
          display: block;
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border: 1px solid #e2e5e9;
          border-radius: 8px;
          background: #ffffff;
          color: #1c1b1b;
          font-family: inherit;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .register-field input::placeholder {
          color: #717784;
          opacity: 1;
        }

        .register-field input:focus {
          border-color: #005da9;
          box-shadow: 0 0 0 3px rgba(0, 93, 169, 0.1);
        }

        .register-password-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .register-password-label span {
          color: #717784;
          font-size: 11px;
          line-height: 14px;
          letter-spacing: 0.22px;
        }

        .register-password-input {
          position: relative;
          width: 100%;
        }

        .register-password-input input {
          padding-right: 44px;
        }

        .register-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          padding: 4px;
          border: none;
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
        }

        .register-eye:hover {
          background: #f6f3f2;
        }

        .register-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          margin: 0;
          padding: 8px 12px;
          border-radius: 8px;
          background: #f6f3f2;
          color: #414752;
          font-size: 11px;
          line-height: 14px;
          letter-spacing: 0.22px;
        }

        .register-hint svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          color: #0c6854;
        }

        .register-feedback {
          margin: 0;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 18px;
        }

        .register-error {
          background: #fff0f0;
          color: #b42318;
        }

        .register-success {
          background: #eaf7f0;
          color: #087443;
        }

        .register-submit {
          width: 100%;
          height: 44px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 8px;
          background: #005da9;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: background 0.2s;
        }

        .register-submit:hover:not(:disabled) {
          background: #004b89;
        }

        .register-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .register-submit span {
          font-size: 17px;
          line-height: 1;
        }

        .register-login {
          margin: 32px 0 0;
          color: #414752;
          text-align: center;
          font-size: 14px;
          line-height: 22px;
        }

        .register-login :global(a) {
          color: #005da9;
          font-weight: 500;
          text-decoration: none;
        }

        .register-login :global(a:hover) {
          text-decoration: underline;
        }

        .register-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          margin: 40px 0 0;
          padding-top: 24px;
          color: #717784;
          font-size: 11px;
          line-height: 14px;
          letter-spacing: 0.22px;
          text-align: center;
        }

        .register-trust svg {
          width: 10px;
          height: 13px;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .register-page {
            padding: 24px 16px;
            align-items: flex-start;
          }

          .register-card {
            padding: 32px 24px;
          }

          .register-heading h1 {
            font-size: 21px;
          }
        }
      `}</style>
    </main>
  );
}
