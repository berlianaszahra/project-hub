"use client";

import Link from "next/link";
import { useState } from "react";
import KatalogHeader from "@/features/product-katalog/components/KatalogHeader";
import ProjectSidebar from "@/shared/components/ProjectSidebar";

import { sampleProfile } from "../data/profileData";

import type { UpdateProfileHandler, UserProfile } from "../types/profile";
import AccountOverview from "./AccountOverview";
import LogoutCard from "./LogoutCard";
import ProfileForm from "./ProfileForm";
import ProfileTips from "./ProfileTips";

type ProfilePageProps = {
  profile?: UserProfile;
  onSaveProfile?: UpdateProfileHandler;
};

export default function ProfilePage({
  profile = sampleProfile,
  onSaveProfile,
}: ProfilePageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF9F8] font-sans text-[#1C1B1B]">
      {/* Shared Sidebar */}
      <ProjectSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-w-0 lg:pl-60">
        {/* Shared Header */}
        <KatalogHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="min-h-screen px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-[896px]">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.22px]"
            >
              <Link
                href="/katalog"
                className="text-[#414752] transition hover:text-[#005DA9]"
              >
                Eksplorasi
              </Link>

              <span className="text-[#414752]">/</span>

              <Link
                href="/projek-saya"
                className="text-[#414752] transition hover:text-[#005DA9]"
              >
                Project Saya
              </Link>

              <span className="text-[#414752]">/</span>

              <span aria-current="page" className="font-medium text-[#1C1B1B]">
                Profil
              </span>
            </nav>

            {/* Page Heading */}
            <header className="mb-8">
              <div className="mb-1 text-[30px] leading-9" aria-hidden="true">
                👤
              </div>

              <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.8px] text-[#1C1B1B] sm:text-[32px]">
                Profil Pengguna
              </h1>

              <p className="mt-2 text-sm leading-[22px] text-[#414752]">
                Kelola informasi dasar akun BCC ProjectHub Anda dengan ringkas
                dan tenang.
              </p>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {/* Left Column */}
              <ProfileForm profile={profile} onSave={onSaveProfile} />

              {/* Right Column */}
              <div className="space-y-4">
                <AccountOverview profile={profile} />
                <ProfileTips />
                <LogoutCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
