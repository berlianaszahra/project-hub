
import { Lightbulb } from "lucide-react";

export default function ProfileTips() {
  return (
    <aside className="rounded-xl bg-[#F6F3F2]/70 p-4">
      <div className="flex items-center gap-2">
        <Lightbulb
          size={16}
          className="text-[#005DA9]"
          aria-hidden="true"
        />

        <h2 className="text-sm font-medium text-[#1C1B1B]">
          Tips Akun
        </h2>
      </div>

      <p className="mt-2 text-[11px] leading-[18px] tracking-[0.22px] text-[#414752]">
        Gunakan alamat email resmi @bcc.filkom.ub.ac.id
        agar sistem sinkronisasi undangan rapat tim
        otomatis terhubung ke kalender BCC.
      </p>
    </aside>
  );
}
