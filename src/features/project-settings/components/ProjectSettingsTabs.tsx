import { AlertTriangle, FolderKanban, ShieldCheck, Users } from "lucide-react";

const tabs = [
  {
    id: "identitas",
    label: "Informasi Dasar",
    icon: FolderKanban,
  },
  {
    id: "perekrutan",
    label: "Perekrutan & Visibilitas",
    icon: Users,
  },
  {
    id: "kepemimpinan",
    label: "Hak Akses & Kepemimpinan",
    icon: ShieldCheck,
  },
  {
    id: "zona-bahaya",
    label: "Zona Bahaya",
    icon: AlertTriangle,
  },
];

export default function ProjectSettingsTabs() {
  return (
    <nav
      aria-label="Bagian pengaturan proyek"
      className="flex gap-1 overflow-x-auto border-b border-[#E5E2E1]"
    >
      {tabs.map(({ id, label, icon: Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm font-medium text-[#414752] transition hover:border-[#005DA9] hover:text-[#005DA9] focus-visible:outline-2 focus-visible:outline-[#005DA9]"
        >
          <Icon size={16} aria-hidden="true" />
          {label}
        </a>
      ))}
    </nav>
  );
}
