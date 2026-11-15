import type { ReactNode } from "react";

type FormSectionProps = {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FormSection({
  number,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-xl bg-[#F6F3F2] p-4 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center rounded bg-[#FCF9F8] text-xs font-semibold text-[#005DA9]">
          {number}
        </span>

        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#1C1B1B]">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm leading-6 text-[#414752]">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-5">{children}</div>
    </section>
  );
}
