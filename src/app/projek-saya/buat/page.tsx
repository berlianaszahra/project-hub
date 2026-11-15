"use client";

import { Suspense, useState } from "react";
import CreateProjectForm from "@/features/create-project/components/CreateProjectForm";
import KatalogHeader from "@/features/product-katalog/components/KatalogHeader";
import ProjectSidebar from "@/shared/components/ProjectSidebar";

export default function CreateProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <ProjectSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 lg:pl-60">
        <KatalogHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-6 lg:px-8">
          {/* React Hook Form generates field IDs at runtime. Keep the form
              behind Suspense so those IDs are excluded from the static shell. */}
          <Suspense
            fallback={
              <output className="mx-auto max-w-[880px] text-sm text-[#717784]">
                Memuat formulir project…
              </output>
            }
          >
            <CreateProjectForm />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
