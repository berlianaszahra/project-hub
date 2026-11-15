import { UserRound } from "lucide-react";
import type { UserProfile } from "../types/profile";

type AccountOverviewProps = {
  profile: UserProfile;
};

const applicationLabels = {
  pending: "Menunggu Review",
  accepted: "Diterima",
  rejected: "Ditolak",
  none: "Tidak Ada Pengajuan",
};

export default function AccountOverview({ profile }: AccountOverviewProps) {
  const joinedDate = new Date(`${profile.joinedAt}T00:00:00`);

  const joinedAt = Number.isNaN(joinedDate.getTime())
    ? "-"
    : joinedDate.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });

  return (
    <section className="rounded-xl bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35px] text-[#1C1B1B]/70">
          Ringkasan Akun
        </h2>

        <UserRound size={17} className="text-[#717784]" aria-hidden="true" />
      </div>

      <dl className="space-y-0">
        <div className="pb-3">
          <dt className="text-[11px] tracking-[0.22px] text-[#414752]">
            Status Keanggotaan
          </dt>

          <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-[#1C1B1B]">
            <span
              className={`size-2 rounded-full ${
                profile.memberStatus === "active"
                  ? "bg-[#0C6854]"
                  : "bg-[#717784]"
              }`}
            />
            {profile.memberStatus === "active"
              ? "Anggota Aktif"
              : "Tidak Aktif"}
          </dd>
        </div>

        <div className="border-t border-[#EAE7E7] py-3">
          <dt className="text-[11px] tracking-[0.22px] text-[#414752]">
            Tanggal Bergabung
          </dt>

          <dd className="mt-1 text-sm font-medium text-[#1C1B1B]">
            {joinedAt}
          </dd>
        </div>

        <div className="border-t border-[#EAE7E7] py-3">
          <dt className="text-[11px] tracking-[0.22px] text-[#414752]">
            Proyek Diikuti
          </dt>

          <dd className="mt-1 flex items-center justify-between gap-2 text-sm font-medium text-[#1C1B1B]">
            <span>{profile.joinedProjectCount} Proyek</span>
          </dd>
        </div>

        <div className="border-t border-[#EAE7E7] pt-3">
          <dt className="text-[11px] tracking-[0.22px] text-[#414752]">
            Status Pengajuan
          </dt>

          <dd className="mt-1 flex items-center justify-between gap-2 text-sm font-medium text-[#705C2A]">
            <span>{applicationLabels[profile.applicationStatus]}</span>

            {profile.applicationStatus === "pending" && (
              <span className="size-2 rounded-full bg-[#705C2A]" />
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
