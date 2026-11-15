import { Check, ShieldCheck } from "lucide-react";

const benefits = [
  "Status perekrutan yang diperbarui secara langsung",
  "Tag keahlian yang disesuaikan kurikulum BCC",
  "Tautan langsung ke repositori GitHub & dokumen produk",
];

const projects = [
  {
    name: "CampusConnect Hub",
    initials: "CC",
    role: "Dicari: 1 UI/UX Researcher · 1 Front-end Dev",
    status: "Buka Seleksi",
    avatarClass: "bg-light-blue text-blue-muted",
    statusClass: "bg-green-light text-green-dark",
  },
  {
    name: "Algoritmik Trader Bot",
    initials: "AR",
    role: "Dicari: Python Dev (FastAPI) · Quant Analyst",
    status: "Interview",
    avatarClass: "bg-orange-light text-amber-dark",
    statusClass: "bg-orange-light text-amber-dark",
  },
  {
    name: "BCC Internal Design System",
    initials: "ID",
    role: "Dicari: Figma Tokens Specialist",
    status: "Buka Seleksi",
    avatarClass: "bg-preview-selected text-text-primary",
    statusClass: "bg-green-light text-green-dark",
  },
];

const applicants = [
  {
    name: "Dimas Setiawan",
    initials: "DS",
    description: "Melamar posisi: Front-end (React/Next) · Mahasiswa TI '23",
    avatarClass: "bg-avatar-sand text-avatar-sand-text",
  },
  {
    name: "Siti Nurhaliza",
    initials: "SN",
    description: "Melamar posisi: Product Designer · Portofolio Behance disertakan",
    avatarClass: "bg-avatar-gold text-avatar-gold-text",
  },
];

function ProjectBoardPreview() {
  return (
    <div className="min-w-0 rounded-2xl border border-preview-border bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-xs font-semibold text-text-primary sm:text-sm">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-primary-blue"
          />
          Papan Eksplorasi Cepat
        </h3>

        <p className="text-[10px] text-text-secondary sm:text-xs">
          Menampilkan 3 dari 28 project
        </p>
      </div>

      <ul className="mt-5 space-y-3">
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex flex-wrap items-center gap-3 rounded-lg bg-secondary-bg/60 p-3"
          >
            <span
              aria-hidden="true"
              className={`flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-bold ${project.avatarClass}`}
            >
              {project.initials}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-text-primary">
                {project.name}
              </p>

              <p className="mt-1 text-[10px] leading-4 text-text-secondary">
                {project.role}
              </p>
            </div>

            <span
              className={`shrink-0 rounded px-2 py-1 text-[10px] font-medium ${project.statusClass}`}
            >
              {project.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApplicantsPreview() {
  return (
    <div className="min-w-0 rounded-2xl border border-preview-border bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-semibold text-text-primary sm:text-sm">
          Pengajuan Kolaborator Masuk
        </h3>

        <span className="rounded bg-secondary-bg px-2 py-1 text-[10px] text-text-secondary">
          2 Menunggu Tindakan
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {applicants.map((applicant) => (
          <li
            key={applicant.name}
            className="flex flex-wrap items-center gap-3 rounded-xl bg-secondary-bg p-3"
          >
            <span
              aria-hidden="true"
              className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${applicant.avatarClass}`}
            >
              {applicant.initials}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-text-primary">
                {applicant.name}
              </p>

              <p className="mt-1 text-[10px] leading-4 text-text-secondary">
                {applicant.description}
              </p>
            </div>

            {/* Label visual untuk mockup, bukan tombol aktif. */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <span className="rounded bg-preview-selected px-2.5 py-1.5 text-[10px] font-medium text-text-primary">
                Profil
              </span>

              <span className="rounded bg-primary-blue px-2.5 py-1.5 text-[10px] font-medium text-white">
                Terima
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      aria-label="Fitur kolaborasi ProjectHub"
      className="bg-secondary-bg px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-16 lg:space-y-24">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-blue">
              01 / Transparansi penuh
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
              Eksplorasi Project Beragam
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
              Setiap inisiatif dilengkapi dengan ringkasan arsitektur
              teknis, target peluncuran, dan kejelasan ekspektasi
              kontribusi. Tak ada lagi project menggantung tanpa
              kejelasan arah.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-xs leading-5 text-text-secondary sm:text-sm"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary-blue"
                    strokeWidth={2}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ProjectBoardPreview />
          </div>
        </div>

        <div
          id="review-pengajuan"
          className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:order-2 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
              02 / Pengambilan keputusan cepat
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
              Review Pengajuan Tanpa Hambatan
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
              Project Lead dapat memeriksa profil kandidat, melihat
              portofolio relevan, dan menyetujui kolaborator hanya dalam
              satu klik dengan pemberitahuan otomatis.
            </p>

            <div className="mt-5 flex items-start gap-2 rounded-lg bg-white px-3 py-3">
              <ShieldCheck
                aria-hidden="true"
                className="size-4 shrink-0 text-amber-dark"
                strokeWidth={1.8}
              />

              <p className="text-[11px] leading-4 text-text-secondary">
                Semua akun anggota diverifikasi melalui akun resmi BCC.
              </p>
            </div>
          </div>

          <div className="min-w-0 lg:order-1 lg:col-span-7">
            <ApplicantsPreview />
          </div>
        </div>
      </div>
    </section>
  );
}