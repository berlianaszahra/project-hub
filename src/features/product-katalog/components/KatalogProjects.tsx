
"use client";

import { useMemo, useState } from "react";

import { projects as sampleProjects } from "../data/project";
import type { Project, ProjectStatus } from "../types/project";


import KatalogHeader from "./KatalogHeader";
import KatalogSidebar from "./KatalogSidebar";
import ProjectCard from "./ProjectCard";

type StatusFilter = "Semua Project" | ProjectStatus;

type Props = {
  projects?: Project[];
  onCreateProject?: () => void;
  onOpenProject?: (project: Project) => void;
};

const statusFilters: StatusFilter[] = [
  "Semua Project",
  "Aktif",
  "Dalam Pengembangan",
  "Selesai",
  "Diarsipkan",
];

export default function KatalogProjects({
  projects = sampleProjects,
  onCreateProject,
  onOpenProject,
}: Props) {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("Semua Teknologi");
  const [status, setStatus] =
    useState<StatusFilter>("Semua Project");
  const [sort, setSort] = useState("terbaru");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Daftar teknologi tersedia
  const technologies = useMemo(
    () =>
      Array.from(
        new Set(
          projects.flatMap((project) => project.technologies),
        ),
      ).sort(),
    [projects],
  );

  // Filter dan sorting project
  const filtered = useMemo(() => {
    return projects
      .filter((project) => {
        const query = search.trim().toLowerCase();

        const searchContent = [
          project.name,
          project.description,
          ...project.technologies,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = searchContent.includes(query);

        const matchesTechnology =
          technology === "Semua Teknologi" ||
          project.technologies.includes(technology);

        const matchesStatus =
          status === "Semua Project" ||
          project.status === status;

        return (
          matchesSearch &&
          matchesTechnology &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        if (sort === "nama") {
          return a.name.localeCompare(b.name);
        }

        if (sort === "terlama") {
          return a.updatedAt.localeCompare(b.updatedAt);
        }

        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [projects, search, technology, status, sort]);

  const resetFilters = () => {
    setSearch("");
    setTechnology("Semua Teknologi");
    setStatus("Semua Project");
    setSort("terbaru");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1B1B]">
      {/* Sidebar */}
      <KatalogSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-w-0 lg:pl-60">
        <KatalogHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-8 sm:px-6 lg:pt-10">

          {/* Page Heading */}
          <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              {/* Breadcrumb */}
              <div className="mb-2 flex items-center gap-1 text-xs font-medium">
                <span className="text-[#414752]">
                  Eksplorasi
                </span>
                <span className="text-[#C0C7D4]">/</span>
                <span className="text-[#005DA9]">
                  Katalog Project
                </span>
              </div>

              <h1 className="text-[30px] font-bold leading-tight tracking-[-0.8px] sm:text-[32px]">
                Katalog Project
              </h1>

              <p className="mt-2 text-sm leading-[22px] text-[#414752]">
                Temukan dan jelajahi project kolaboratif komunitas BCC.
              </p>
            </div>

            {/* Create Project Button */}
            <button
              type="button"
              onClick={onCreateProject}
              disabled={!onCreateProject}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0076D3] px-4 text-sm font-medium text-white transition hover:bg-[#005DA9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span aria-hidden="true">＋</span>
              Tambah Project
            </button>
          </div>

          {/* Filter Bar */}
          <section
            aria-label="Filter katalog"
            className="mb-6 rounded-xl bg-[#F6F3F2] p-4"
          >
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

              {/* Search */}
              <div className="relative w-full md:max-w-[448px]">
                <span
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#717784]"
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  aria-label="Cari project"
                  placeholder="Cari nama project atau teknologi..."
                  className="h-9 w-full rounded-lg border border-transparent bg-white pl-9 pr-3 text-sm text-[#1C1B1B] outline-none placeholder:text-[#717784] focus:border-[#0076D3]"
                />
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap gap-2">

                {/* Technology */}
                <select
                  aria-label="Filter teknologi"
                  value={technology}
                  onChange={(event) =>
                    setTechnology(event.target.value)
                  }
                  className="h-9 max-w-full rounded-lg bg-white px-3 text-sm text-[#1C1B1B] outline-none focus:ring-2 focus:ring-[#0076D3]/30"
                >
                  <option value="Semua Teknologi">
                    Semua Teknologi
                  </option>

                  {technologies.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {/* Sorting */}
                <select
                  aria-label="Urutkan project"
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  className="h-9 rounded-lg bg-white px-3 text-sm text-[#1C1B1B] outline-none focus:ring-2 focus:ring-[#0076D3]/30"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="nama">Nama A–Z</option>
                </select>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mt-4 flex flex-col justify-between gap-3 border-t border-[#EAE7E7] pt-3 lg:flex-row lg:items-center">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {statusFilters.map((item) => {
                  const count =
                    item === "Semua Project"
                      ? projects.length
                      : projects.filter(
                          (project) =>
                            project.status === item,
                        ).length;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
                      aria-pressed={status === item}
                      className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                        status === item
                          ? "bg-[#E5E2E1] text-[#1C1B1B]"
                          : "text-[#414752] hover:bg-white/70"
                      }`}
                    >
                      {item}

                      <span className="ml-1 text-[11px] opacity-70">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Result Counter */}
              <p className="shrink-0 text-[11px] text-[#414752]">
                <span className="mr-1 inline-block size-1.5 rounded-full bg-[#0C6854]" />
                Menampilkan {filtered.length} dari {projects.length} project
              </p>
            </div>
          </section>

          {/* Project Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={onOpenProject}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#D9D4D3] px-6 py-16 text-center">
              <h2 className="text-lg font-semibold">
                Project tidak ditemukan
              </h2>

              <p className="mt-2 text-sm text-[#717784]">
                Coba kata kunci atau filter lainnya.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-medium text-[#005DA9] hover:underline"
              >
                Reset filter
              </button>
            </div>
          )}

          {/* Bottom Information */}
          <aside className="mt-8 rounded-xl border border-[#EAE7E7] bg-[#FAF9F8] p-5">
            <h2 className="text-sm font-semibold">
              Temukan ruang kolaborasimu
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#414752]">
              Jelajahi project, temukan teknologi yang menarik,
              dan ikuti perkembangan karya komunitas BCC.
            </p>
          </aside>
        </main>
      </div>
    </div>
  );
}
