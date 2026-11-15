import Link from "next/link";

type Props = {
  name?: string;
  subtitle?: string;
  showDetails?: boolean;
  onNavigate?: () => void;
};
export default function ProfileLink({
  name = "Nadia",
  subtitle,
  showDetails = false,
  onNavigate,
}: Props) {
  return (
    <Link
      href="/profile"
      aria-label={`Buka profil ${name}`}
      title="Profil Saya"
      onClick={onNavigate}
      className="inline-flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-[#EAE7E7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076D3]"
    >
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-xs font-semibold text-[#001C39]"
      >
        {name.charAt(0)}
      </span>
      {showDetails && (
        <span className="text-left">
          <span className="block text-xs font-medium text-[#1C1B1B]">
            {name}
          </span>
          <span className="mt-0.5 block text-[10px] text-[#717784]">
            {subtitle ?? "Profil Saya"}
          </span>
        </span>
      )}
    </Link>
  );
}
