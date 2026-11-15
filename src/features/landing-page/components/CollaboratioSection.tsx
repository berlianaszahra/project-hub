import { ArrowRight, Compass, PanelsTopLeft, UsersRound } from "lucide-react";
import Link from "next/link";

const collaborationItems = [
  {
    title: "Temukan peluang",
    description:
      "Jelajahi project lintas bidang seperti Front-end, Back-end, UI/UX Design, dan Product Research yang sesuai dengan minat dan portofoliomu.",
    label: "Filter berdasar tech stack",
    href: "/projects",
    icon: Compass,
    color: "text-primary-blue",
  },
  {
    title: "Bangun tim",
    description:
      "Punya ide produk cemerlang? Buka rekrutmen tim secara transparan, tetapkan jumlah slot peran, dan temukan rekan kerja yang antusias.",
    label: "Panduan pembentukan tim",
    href: "/register",
    icon: UsersRound,
    color: "text-amber-dark",
  },
  {
    title: "Kelola bersama",
    description:
      "Pantau status kandidat, kelola anggota aktif, serta sinkronkan milestone tugas dalam satu kanvas terintegrasi tanpa gesekan.",
    label: "Alur persetujuan instan",
    href: "#review-pengajuan",
    icon: PanelsTopLeft,
    color: "text-green-dark",
  },
];

export default function CollaborationSection() {
  return (
    <section
      aria-labelledby="collaboration-heading"
      className="bg-primary-bg px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-blue">
            Ekosistem kolaboratif
          </p>

          <h2
            id="collaboration-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Semua dimulai dari satu project.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            Tempat ide bertemu orang yang tepat. Tanpa birokrasi rumit, fokus
            langsung pada karya nyata.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {collaborationItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-preview-border bg-primary-bg p-7 sm:p-8"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-xl bg-secondary-bg ${item.color}`}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-text-primary">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className={`mt-auto inline-flex w-fit items-center gap-2 pt-8 text-xs font-medium underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue ${item.color}`}
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
