
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, AlertTriangle } from "lucide-react";

type ProjectMediaSettingsProps = {
  iconUrl?: string;
  bannerUrl?: string;
  onIconChange?: (file: File | null) => void;
  onBannerChange?: (file: File | null) => void;
};

type MediaKind = "icon" | "banner";

export default function ProjectMediaSettings({
  iconUrl,
  bannerUrl,
  onIconChange,
  onBannerChange,
}: ProjectMediaSettingsProps) {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [iconPreview, setIconPreview] = useState<string | null>(
    null,
  );
  const [bannerPreview, setBannerPreview] = useState<
    string | null
  >(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!iconFile) {
      setIconPreview(null);
      return;
    }

    const url = URL.createObjectURL(iconFile);
    setIconPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [iconFile]);

  useEffect(() => {
    if (!bannerFile) {
      setBannerPreview(null);
      return;
    }

    const url = URL.createObjectURL(bannerFile);
    setBannerPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [bannerFile]);

  const handleFileChange = (
    file: File | undefined,
    kind: MediaKind,
  ) => {
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Gunakan file PNG, JPG, atau WebP.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2 MB.");
      return;
    }

    setError("");

    if (kind === "icon") {
      setIconFile(file);
      onIconChange?.(file);
    } else {
      setBannerFile(file);
      onBannerChange?.(file);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-[#E5E2E1] bg-[#FCF9F8] p-4">
      <div>
        <h3 className="text-sm font-medium text-[#1C1B1B]">
          Ikon & Banner Proyek
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#414752]">
          Atur identitas visual proyek untuk katalog dan
          ruang kerja kolaborator.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-[#E8D4A2] bg-[#F9DD9E]/40 p-3">
        <AlertTriangle
          size={16}
          className="mt-0.5 shrink-0 text-[#705C2A]"
        />
        <p className="text-xs leading-5 text-[#705C2A]">
          Media yang dipilih hanya ditampilkan sebagai
          pratinjau. Penyimpanan permanen membutuhkan
          integrasi upload backend.
        </p>
      </div>

      {/* Icon */}
      <div className="rounded-lg border border-[#E5E2E1] bg-white p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EAF4FF]">
            {iconPreview || iconUrl ? (
              <Image
                src={iconPreview || iconUrl || ""}
                alt="Preview ikon proyek"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <ImagePlus size={28} className="text-[#005DA9]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium">
              Ikon Proyek
            </h4>

            <p className="mt-1 text-xs text-[#717784]">
              PNG, JPG, atau WebP. Maksimal 2 MB.
            </p>

            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded border border-[#005DA9] bg-white px-3 py-2 text-xs font-medium text-[#005DA9] hover:bg-[#EAF4FF]">
              <ImagePlus size={14} />
              Pilih Ikon
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(event) =>
                  handleFileChange(
                    event.target.files?.[0],
                    "icon",
                  )
                }
              />
            </label>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="rounded-lg border border-[#E5E2E1] bg-white p-4">
        <h4 className="text-sm font-medium">
          Banner Proyek
        </h4>

        <p className="mt-1 text-xs text-[#717784]">
          Rekomendasi rasio 16:9. Maksimal 2 MB.
        </p>

        <div className="relative mt-3 flex aspect-video max-h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-[#F0EDED]">
          {bannerPreview || bannerUrl ? (
            <Image
              src={bannerPreview || bannerUrl || ""}
              alt="Preview banner proyek"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <ImagePlus
              size={32}
              className="text-[#717784]"
            />
          )}
        </div>

        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded border border-[#005DA9] px-3 py-2 text-xs font-medium text-[#005DA9] hover:bg-[#EAF4FF]">
          <ImagePlus size={14} />
          Pilih Banner
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={(event) =>
              handleFileChange(
                event.target.files?.[0],
                "banner",
              )
            }
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
