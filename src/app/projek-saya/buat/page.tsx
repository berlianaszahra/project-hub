"use client";

import { useState } from "react";

import CreateProjectForm from "@/features/my-projects/components/CreateProjectForm";

import KatalogSidebar from "@/features/product-katalog/components/KatalogSidebar";
import KatalogHeader from "@/features/product-katalog/components/KatalogHeader";

export default function CreateProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <KatalogSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 lg:pl-60">
        <KatalogHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:px-6">
          <CreateProjectForm />
        </main>
      </div>
    </div>
  );
}
