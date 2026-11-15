import Image from "next/image";
import { Quote } from "lucide-react";



export default function TestimonialSection() {
  return (
    <section
      id="testimoni"
      aria-label="Testimoni pengguna ProjectHub"
      className="scroll-mt-24 border-t border-preview-border bg-primary-bg px-5 py-16 sm:px-8 sm:py-20"
    >
      <figure className="mx-auto max-w-3xl text-center">
        <Quote
          aria-hidden="true"
          className="mx-auto size-6 text-text-secondary"
          strokeWidth={2}
        />

        <blockquote className="mt-6">
          <p className="text-balance text-2xl leading-snug font-semibold tracking-wider text-text-primary sm:text-3xl lg:text-[2rem]">
            “ProjectHub bukan sekadar tempat mengelola proyek, tetapi ruang di mana ide berkembang, kolaborasi menjadi lebih mudah, dan setiap anggota tim dapat berkontribusi secara maksimal."
          </p>
        </blockquote>

      </figure>
    </section>
  );
}