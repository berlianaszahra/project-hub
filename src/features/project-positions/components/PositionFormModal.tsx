"use client";
import {
  Code2,
  Info,
  Layers,
  Palette,
  Plus,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  type PositionFormData,
  positionFormSchema,
  type RecruitmentPosition,
} from "../schemas/position.schema";

type Props = {
  projectName: string;
  position?: RecruitmentPosition;
  deletionError?: string | null;
  onSave: (value: PositionFormData) => void;
  onDelete: () => void;
  onClose: () => void;
};
const inputClass =
  "w-full rounded-lg border border-transparent bg-[#F6F3F2] px-3 py-3 text-xs outline-none focus:border-[#0076D3]";
const categoryIcons = {
  Engineering: Code2,
  Design: Palette,
  Product: Layers,
  "Data & AI": TrendingUp,
};
export default function PositionFormModal({
  projectName,
  position,
  deletionError,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const [form, setForm] = useState<PositionFormData>(
    position ?? {
      name: "",
      category: "Engineering",
      capacity: 1,
      description: "",
      skills: [],
      experience: "intermediate",
      status: "open",
      tasks: [],
      priority: false,
    },
  );
  const [skill, setSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animation = element.animate(
      [
        { opacity: 0, transform: "translateY(10px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 160, easing: "ease-out" },
    );
    return () => animation.cancel();
  }, []);
  function closeModal() {
    const element = dialog.current;
    if (!element || closing.current) return;
    closing.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.close();
      return;
    }
    const animation = element.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(8px) scale(0.98)" },
      ],
      { duration: 120, easing: "ease-in", fill: "forwards" },
    );
    animation.onfinish = () => element.close();
  }
  function update<K extends keyof PositionFormData>(
    key: K,
    value: PositionFormData[K],
  ) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }
  function addSkill() {
    const value = skill.trim();
    if (
      value &&
      !form.skills.some((s) => s.toLowerCase() === value.toLowerCase())
    )
      update("skills", [...form.skills, value]);
    setSkill("");
  }
  function error(key: string) {
    return errors[key] ? (
      <p role="alert" className="mt-1 text-[11px] text-red-600">
        {errors[key]}
      </p>
    ) : null;
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (closing.current) return;
    const pendingSkill = skill.trim();
    const skills =
      pendingSkill &&
      !form.skills.some(
        (item) => item.toLowerCase() === pendingSkill.toLowerCase(),
      )
        ? [...form.skills, pendingSkill]
        : form.skills;
    const parsed = positionFormSchema.safeParse({ ...form, skills });
    if (!parsed.success) {
      setErrors(
        Object.fromEntries(
          parsed.error.issues.map((issue) => [
            String(issue.path[0]),
            issue.message,
          ]),
        ),
      );
      return;
    }
    if (position && parsed.data.capacity < position.filled) {
      setErrors({
        capacity: `Kuota minimal ${position.filled}, sesuai jumlah anggota aktif.`,
      });
      return;
    }
    setErrors({});
    try {
      onSave(parsed.data);
      closeModal();
    } catch (error) {
      setErrors({
        root:
          error instanceof Error ? error.message : "Perubahan gagal disimpan.",
      });
    }
  }
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
      aria-labelledby="position-form-title"
      className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-[680px] overflow-y-auto rounded-xl bg-white text-[#1C1B1B] shadow-2xl backdrop:bg-black/35 backdrop:backdrop-blur-[3px]"
    >
      <header className="border-b border-[#EAE7E7] p-5 sm:p-6">
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-[10px] text-[#929296]">
              <span className="mr-2 rounded bg-[#D4E3FF] px-2 py-1 text-[#34567E]">
                {position ? "Pengaturan Kebutuhan" : "Formasi Baru"}
              </span>
              Workspace {projectName}
            </p>
            <h2 id="position-form-title" className="mt-3 text-xl font-semibold">
              {position
                ? `Edit Kebutuhan Posisi — ${position.name}`
                : "Tambah Posisi Rekrutmen Baru"}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Tutup formulir posisi"
            onClick={closeModal}
            className="h-fit rounded p-1 text-[#717784]"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mt-2 text-xs leading-5 text-[#717784]">
          {position
            ? "Perbarui rincian tanggung jawab peran, kuota, dan status rekrutmen."
            : `Tentukan peran, deskripsi tanggung jawab tugas, kuota, dan keahlian yang dibutuhkan untuk ${projectName}.`}
        </p>
      </header>
      <form onSubmit={submit} noValidate>
        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <label
              htmlFor="position-name"
              className="mb-2 block text-xs font-medium"
            >
              Nama Posisi / Peran <span className="text-red-600">*</span>
            </label>
            <input
              id="position-name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={!!errors.name}
              placeholder="Contoh: Frontend Developer"
              className={inputClass}
            />
            {error("name")}
            {!position && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="py-1 text-[10px] text-[#929296]">
                  Rekomendasi Cepat:
                </span>
                {[
                  "Frontend Developer",
                  "UI/UX Designer",
                  "Mobile App Developer (Flutter)",
                  "Product Manager",
                  "QA Engineer",
                ].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => update("name", name)}
                    className="rounded bg-[#F0EEEE] px-2 py-1 text-[10px] text-[#717784]"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {position && (
            <fieldset>
              <legend className="mb-2 text-xs font-medium">
                Status Rekrutmen Posisi
              </legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {(
                  [
                    {
                      id: "open",
                      title: "Buka Rekrutmen",
                      caption: "Aktif menerima aplikasi",
                    },
                    {
                      id: "paused",
                      title: "Tutup Sementara",
                      caption: "Jeda kurasi pelamar",
                    },
                    {
                      id: "closed",
                      title: "Tutup Permanen",
                      caption: "Kuota peran terpenuhi",
                    },
                  ] as const
                ).map((status) => (
                  <label
                    key={status.id}
                    className="flex gap-2 rounded-lg border border-[#F0EEEE] p-3 text-xs"
                  >
                    <input
                      type="radio"
                      name="position-status"
                      value={status.id}
                      checked={form.status === status.id}
                      onChange={() => update("status", status.id)}
                      className="accent-[#0076D3]"
                    />
                    <span>
                      {status.title}
                      <span className="mt-1 block text-[10px] text-[#929296]">
                        {status.caption}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <div className="grid gap-4 sm:grid-cols-[1fr_170px]">
            <fieldset>
              <legend className="mb-2 text-xs font-medium">
                Kategori Bidang <span className="text-red-600">*</span>
              </legend>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  Object.keys(categoryIcons) as PositionFormData["category"][]
                ).map((category) => {
                  const Icon = categoryIcons[category];
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={form.category === category}
                      onClick={() => update("category", category)}
                      className={`flex flex-col items-center gap-1 rounded-lg px-1 py-2.5 text-[10px] ${form.category === category ? "bg-[#D4E3FF] text-[#34567E]" : "bg-[#F6F3F2] text-[#717784]"}`}
                    >
                      <Icon size={17} />
                      {category}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div>
              <label
                htmlFor="position-capacity"
                className="mb-2 block text-xs font-medium"
              >
                Kuota Talenta <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center rounded-lg bg-[#F6F3F2] p-1">
                <button
                  type="button"
                  aria-label="Kurangi kuota"
                  disabled={form.capacity <= Math.max(1, position?.filled ?? 0)}
                  onClick={() => update("capacity", form.capacity - 1)}
                  className="rounded bg-white px-2 py-1 disabled:opacity-30"
                >
                  −
                </button>
                <input
                  id="position-capacity"
                  type="number"
                  min={Math.max(1, position?.filled ?? 0)}
                  max={100}
                  value={Number.isNaN(form.capacity) ? "" : form.capacity}
                  onChange={(e) => update("capacity", e.target.valueAsNumber)}
                  aria-invalid={!!errors.capacity}
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-center text-xs outline-none"
                />
                <button
                  type="button"
                  aria-label="Tambah kuota"
                  disabled={form.capacity >= 100}
                  onClick={() =>
                    update(
                      "capacity",
                      Number.isNaN(form.capacity) ? 1 : form.capacity + 1,
                    )
                  }
                  className="rounded bg-white px-2 py-1 disabled:opacity-30"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-[10px] text-[#929296]">
                {position
                  ? `${position.filled} anggota aktif menempati posisi ini.`
                  : "Jumlah target rekrutmen ini"}
              </p>
              {error("capacity")}
            </div>
          </div>
          {position && (
            <div>
              <h3 className="mb-2 text-xs font-medium">
                Daftar Tugas & Tanggung Jawab ({form.tasks.length})
              </h3>
              <div className="space-y-2">
                {form.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 rounded-lg bg-[#F6F3F2] p-2"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#D4E3FF] text-[10px] text-[#0076D3]">
                      {index + 1}
                    </span>
                    <input
                      aria-label={`Tanggung jawab ${index + 1}`}
                      value={task.text}
                      onChange={(e) =>
                        update(
                          "tasks",
                          form.tasks.map((item) =>
                            item.id === task.id
                              ? { ...item, text: e.target.value }
                              : item,
                          ),
                        )
                      }
                      className="min-w-0 flex-1 bg-transparent text-xs outline-none"
                    />
                    <button
                      type="button"
                      aria-label={`Hapus tanggung jawab ${index + 1}`}
                      onClick={() =>
                        update(
                          "tasks",
                          form.tasks.filter((item) => item.id !== task.id),
                        )
                      }
                      className="p-1 text-[#717784]"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  update("tasks", [
                    ...form.tasks,
                    { id: crypto.randomUUID(), text: "" },
                  ])
                }
                className="mt-2 flex w-full items-center justify-center gap-1 rounded border border-dashed border-[#D4D8DF] bg-[#FAF8F7] p-2 text-[11px] text-[#005DA9]"
              >
                <Plus size={12} />
                Tambah Tugas / Tanggung Jawab
              </button>
              {error("tasks")}
            </div>
          )}
          <div>
            <label
              htmlFor="position-description"
              className="mb-2 block text-xs font-medium"
            >
              Deskripsi Tanggung Jawab & Lingkup Tugas{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="position-description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              aria-invalid={!!errors.description}
              placeholder="Jelaskan kontribusi dan tanggung jawab posisi ini..."
              className={`${inputClass} resize-y leading-6`}
            />
            {error("description")}
            <p className="mt-2 flex gap-1.5 rounded bg-[#F6F3F2] p-2 text-[10px] leading-5 text-[#929296]">
              <Info size={13} className="mt-1 shrink-0 text-[#0076D3]" />
              Deskripsi peran menjadi acuan kontribusi anggota yang diterima di
              posisi ini.
            </p>
          </div>
          <div>
            <label
              htmlFor="position-skill"
              className="mb-2 block text-xs font-medium"
            >
              Keahlian & Teknologi Wajib
            </label>
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#F6F3F2] p-2">
              {form.skills.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-[11px]"
                >
                  {value}
                  <button
                    type="button"
                    aria-label={`Hapus keahlian ${value}`}
                    onClick={() =>
                      update(
                        "skills",
                        form.skills.filter((item) => item !== value),
                      )
                    }
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <input
                id="position-skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Ketik skill lalu Enter"
                className="min-w-32 flex-1 bg-transparent px-2 py-1 text-xs outline-none"
              />
              <button
                type="button"
                onClick={addSkill}
                className="rounded bg-[#EAF4FF] px-2 py-1 text-[10px] text-[#005DA9]"
              >
                + Tambah Keahlian
              </button>
            </div>
            {error("skills")}
          </div>
          <fieldset>
            <legend className="mb-2 text-xs font-medium">
              Tingkat Kemahiran / Pengalaman
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  {
                    id: "beginner",
                    label: "Pemula",
                    text: "Terbuka untuk yang ingin belajar bersama & eksplorasi",
                  },
                  {
                    id: "intermediate",
                    label: "Menengah",
                    text: "Pernah mengerjakan mini proyek / portofolio relevan",
                  },
                  {
                    id: "advanced",
                    label: "Lanjutan",
                    text: "Memahami arsitektur mandiri dan siap produksi",
                  },
                ] as const
              ).map((level) => (
                <label
                  key={level.id}
                  className={`cursor-pointer rounded-lg border p-3 ${form.experience === level.id ? "border-[#0076D3] bg-[#F0F7FF]" : "border-transparent bg-[#F6F3F2]"}`}
                >
                  <span className="flex items-center gap-1.5 text-xs">
                    <input
                      type="radio"
                      name="position-experience"
                      checked={form.experience === level.id}
                      onChange={() => update("experience", level.id)}
                      className="accent-[#0076D3]"
                    />
                    {level.label}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-[#929296]">
                    {level.text}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={form.priority}
              onChange={(e) => update("priority", e.target.checked)}
              className="accent-[#0076D3]"
            />
            Tandai sebagai prioritas tinggi
          </label>
          {error("root")}
          {confirmDelete && (
            <div className="rounded-lg bg-red-50 p-3">
              <p className="text-xs leading-5">
                Hapus posisi {position?.name}? Tindakan ini akan menghapus
                kebutuhan rekrutmen ini.
              </p>
              <div className="mt-3 flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      onDelete();
                      closeModal();
                    } catch (error) {
                      setErrors({
                        root:
                          error instanceof Error
                            ? error.message
                            : "Posisi gagal dihapus.",
                      });
                      setConfirmDelete(false);
                    }
                  }}
                  className="text-xs font-medium text-red-600"
                >
                  Ya, Hapus Posisi
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs"
                >
                  Batal Hapus
                </button>
              </div>
            </div>
          )}
        </div>
        <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAE7E7] bg-white p-4 sm:px-6">
          {position ? (
            <div>
              <button
                type="button"
                disabled={!!deletionError}
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1 text-xs text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={13} />
                Hapus Posisi
              </button>
              {deletionError && (
                <p className="mt-1 max-w-64 text-[10px] text-[#929296]">
                  {deletionError}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[10px] text-[#929296]">
              Pengaturan dapat diubah sewaktu-waktu oleh Lead.
            </p>
          )}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg bg-[#F6F3F2] px-4 py-2.5 text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#005DA9] px-4 py-2.5 text-xs text-white"
            >
              {position ? "Simpan Perubahan" : "Simpan & Buka Posisi"}
            </button>
          </div>
        </footer>
      </form>
    </dialog>
  );
}
