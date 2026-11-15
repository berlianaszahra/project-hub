
import type { ReactNode } from "react";

type ProjectSectionProps = {
  title: string;
  badge: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ProjectSection({
  title,
  badge,
  subtitle,
  children,
}: ProjectSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold tracking-[-0.18px] text-[#1C1B1B]">
            {title}
          </h2>

          <span className="rounded-full bg-[#EAE7E7] px-2 py-0.5 text-xs font-medium text-[#414752]">
            {badge}
          </span>
        </div>

        {subtitle && (
          <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-[#717784]">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
