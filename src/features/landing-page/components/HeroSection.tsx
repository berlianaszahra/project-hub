import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import RotatingHeroWord from "./RotatingHeroWord";

export default function HeroSection() {
  return (
    <section
      id="platform"
      aria-labelledby="hero-heading"
      className="flex scroll-mt-6 flex-col items-center px-5 pb-24 pt-20 text-center sm:px-8 sm:pb-32 sm:pt-28 lg:pt-36"
    >
      <h1
        id="hero-heading"
        className="w-full max-w-6xl text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.16] font-bold tracking-[-0.045em] text-text-primary"
      >
        <span className="flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-[0.12em]">
          <span>Ide</span> <RotatingHeroWord /> <span>dimulai</span>
        </span>{" "}
        <span className="mt-[0.12em] block text-balance">
          dari tim yang tepat
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-base leading-relaxed text-text-secondary sm:mt-10 sm:text-lg">
        Temukan project, gabung dengan tim, dan bangun sesuatu yang berarti
      </p>

      <div className="mt-7 flex w-full max-w-sm flex-col items-stretch justify-center gap-4 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row">
        <Link
          href="/projects"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue"
        >
          Jelajahi Project
          <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </Link>
        <Link
          href="/register"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-secondary-bg px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue"
        >
          <Users size={20} strokeWidth={1.75} aria-hidden="true" />
          Mulai Bangun Tim
        </Link>
      </div>
    </section>
  );
}
