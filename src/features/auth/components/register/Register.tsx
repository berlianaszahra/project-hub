"use client";

import { useState, type FormEvent } from 'react';

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

export default function Register({
  onRegister,
  loginHref = '/login',
  logoSrc,
}: RegisterProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');setSuccess(false);
    if (password.length < 8) {
      setError('Kata sandi harus terdiri dari minimal 8 karakter.');
      return;
    }
    if (!onRegister) {
      setError('Hubungkan fungsi onRegister ke layanan registrasi terlebih dahulu.');
      return;
    }
    try {
      setSubmitting(true);
      await onRegister({ fullName: fullName.trim(), email: email.trim(), password });
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <main className="register-page">
      <section className="register-card" aria-labelledby="register-title">
        <div className="register-brand">
          {logoSrc ? (
            <img className="register-logo" src={logoSrc} alt="Logo BCC" />
          ) : (
            <div className="register-logo register-logo-fallback" aria-label="BCC">BCC</div>
          )}
        </div>

        <header className="register-heading">
          <h1 id="register-title">Buat akun baru</h1>
          <p>Daftar untuk mulai berkolaborasi di BCC.</p>
        </header>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="full-name">Nama Lengkap</label>
            <input
              id="full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Bagas Pratama"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="bagas@bcc.id"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>


          <div className="register-field">
            <div className="register-password-label">
              <label htmlFor="register-password">Password</label>
              <span>Min. 8 karakter</span>
            </div>
            <div className="register-password-input">
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
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
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.3A10.8 10.8 0 0 1 12 5c5 0 9 4.5 10 7a13.5 13.5 0 0 1-3.2 4.1M6.2 6.2C4.3 7.5 2.8 9.5 2 12c1 2.5 5 7 10 7 1.3 0 2.6-.3 3.7-.8"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          <p className="register-hint">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="m6 10 2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Gunakan kata sandi minimal 8 karakter untuk menjaga keamanan akun Anda.</span>
          </p>

          {error && <p className="register-feedback register-error" role="alert">{error}</p>}
          {success && <p className="register-feedback register-success" role="status">Pendaftaran berhasil.</p>}

          <button className="register-submit" type="submit" disabled={submitting}>
            {submitting ? 'Memproses...' : 'Daftar Akun'}
            {!submitting && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <p className="register-login">Sudah punya akun? <a href={loginHref}>Masuk</a></p>
        <p className="register-trust">
          <svg viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="8" width="11" height="9" rx="2"/><path d="M5 8V5a3 3 0 0 1 6 0v3"/></svg>
          <span>Ruang kerja aman untuk kolaborasi tim.</span>
        </p>
      </section>
      </main>
    </>
  );
}

