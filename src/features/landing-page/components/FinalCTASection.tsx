import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="grid min-h-[22rem] place-items-center bg-primary-bg px-5 py-16 text-center sm:min-h-[28.5rem] sm:px-8"
    >
      <div>
        <h2
          id="final-cta-title"
          className="text-balance text-4xl leading-[1.12] font-bold tracking-tight text-text-primary sm:text-5xl"
        >
          <span className="block">Project berikutnya</span>
          <span className="block">dimulai di sini.</span>
        </h2>

        <Link
          href="/register"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue"
        >
          Mulai Sekarang Gratis
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
