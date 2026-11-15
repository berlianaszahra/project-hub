import Link from "next/link";

const footerLinks = [
  { label: "Platform", href: "/#platform" },
  { label: "Fitur", href: "/#fitur" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
] as const;

const pendingLabels = [
  "FAQ",
  "Syarat & Ketentuan",
  "Kebijakan Privasi",
] as const;

const focusClass =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue";

export default function Footer() {
  return (
    <footer className="border-t border-preview-border bg-primary-bg px-5 py-7 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:gap-6">
        <Link
          href="/"
          className={`shrink-0 text-sm font-semibold text-text-primary ${focusClass}`}
        >
          BCC ProjectHub
        </Link>

        <nav aria-label="Navigasi footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-text-secondary">
            {footerLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={`underline-offset-4 hover:text-primary-blue hover:underline ${focusClass}`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {pendingLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </nav>

        <p className="text-xs leading-5 text-text-secondary lg:text-right">
          © 2024 Basic Computing Community. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}