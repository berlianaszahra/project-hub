const steps = [
  {
    title: "Cari Project",
    description:
      "Telusuri katalog berdasarkan keahlian atau topik teknologi yang ingin kamu kuasai.",
  },
  {
    title: "Pilih Posisi",
    description:
      "Tentukan peran yang sesuai dengan kapasitas waktumu, mulai dari Lead, Dev, hingga Designer.",
  },
  {
    title: "Ajukan Diri",
    description:
      "Kirim ringkasan minat dan portofoliomu kepada Project Lead secara langsung melalui sistem.",
  },
  {
    title: "Bangun Bersama",
    description:
      "Dapatkan akses repository GitHub, channel Discord rahasia, dan mulai berkarya dalam sprint tim.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="how-it-works-title"
      className="scroll-mt-24 bg-primary-bg px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Langkah mudah
          </p>

          <h2
            id="how-it-works-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Mulai dari ide. Jadi karya.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
            Empat langkah lugas untuk membawa inovasi digitalmu dari konsep
            hingga peluncuran nyata.
          </p>
        </header>

        <ol
          role="list"
          className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl bg-secondary-bg p-6"
            >
              <span
                aria-hidden="true"
                className="block text-4xl leading-none font-bold tracking-tight text-text-secondary/25 sm:text-5xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-base font-semibold text-text-primary sm:text-lg">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}