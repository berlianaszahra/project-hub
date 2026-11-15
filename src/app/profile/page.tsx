import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { sessionCookieName } from "@/features/auth/server/session-cookie";
import ProfilePage from "@/features/profile/components/ProfilePage";

async function ProfileWithSession() {
  const session = await cookies();

  if (!session.get(sessionCookieName)?.value) {
    redirect("/login");
  }

  return <ProfilePage />;
}

export default function ProfilPage() {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Memuat profil…</p>}>
      <ProfileWithSession />
    </Suspense>
  );
}
