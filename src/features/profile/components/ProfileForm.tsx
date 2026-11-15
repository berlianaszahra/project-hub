
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Info, LockKeyhole } from "lucide-react";

import {
  profileSchema,
  type ProfileFormData,
} from "../schemas/profile.schema";

import type {
  UserProfile,
  UpdateProfileHandler,
} from "../types/profile";

import ProfileAvatar from "./ProfileAvatar";

type ProfileFormProps = {
  profile: UserProfile;
  onSave?: UpdateProfileHandler;
};

export default function ProfileForm({
  profile,
  onSave,
}: ProfileFormProps) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: {
      errors,
      isDirty,
      isSubmitting,
    },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: profile.fullName,
    },
  });

  const {
    ref: fullNameRef,
    ...fullNameRegister
  } = register("fullName");

  useEffect(() => {
    reset({ fullName: profile.fullName });
    setSuccess(false);
  }, [profile.fullName, reset]);

  const currentName = watch("fullName");

  const onSubmit = async (data: ProfileFormData) => {
    setSuccess(false);
    clearErrors("root");

    if (!onSave) {
      setError("root", {
        message:
          "Layanan perubahan profil belum terhubung ke backend.",
      });
      return;
    }

    try {
      await onSave(data);
      reset(data);
      setSuccess(true);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Gagal menyimpan profil. Silakan coba lagi.",
      });
    }
  };

  const handleCancel = () => {
    reset({ fullName: profile.fullName });
    clearErrors();
    setSuccess(false);
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] sm:p-8">
      <ProfileAvatar
        fullName={currentName}
        onEdit={() => nameInputRef.current?.focus()}
      />

      <div className="my-8 h-px bg-[#EAE7E7]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.35px] text-[#1C1B1B]/70">
          Informasi Akun
        </h2>

        {/* Nama Lengkap */}
        <div>
          <label
            htmlFor="profile-full-name"
            className="mb-1.5 block text-sm font-medium text-[#1C1B1B]"
          >
            Nama Lengkap
          </label>

          <input
            id="profile-full-name"
            type="text"
            autoComplete="name"
            placeholder="Masukkan nama lengkap"
            disabled={isSubmitting}
            aria-invalid={!!errors.fullName}
            aria-describedby={
              errors.fullName
                ? "profile-name-error"
                : "profile-name-help"
            }
            {...fullNameRegister}
            ref={(element) => {
              fullNameRef(element);
              nameInputRef.current = element;
            }}
            className="h-[42px] w-full rounded-lg border border-black/10 bg-white px-3.5 text-sm text-[#1C1B1B] outline-none transition focus:border-[#005DA9] focus:ring-2 focus:ring-[#005DA9]/10 disabled:opacity-50"
          />

          {errors.fullName ? (
            <p
              id="profile-name-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600"
            >
              {errors.fullName.message}
            </p>
          ) : (
            <p
              id="profile-name-help"
              className="mt-2 flex items-center gap-1.5 text-[11px] leading-5 text-[#414752]"
            >
              <Info
                size={12}
                className="shrink-0 text-[#717784]"
              />
              Nama ini akan digunakan untuk identitas profil.
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="profile-email"
              className="text-sm font-medium text-[#1C1B1B]"
            >
              Email Mahasiswa
            </label>

            {profile.emailVerified && (
              <span className="inline-flex items-center gap-1 rounded bg-[#0C6854]/10 px-2 py-0.5 text-[11px] font-medium text-[#0C6854]">
                <Check size={12} aria-hidden="true" />
                Terverifikasi
              </span>
            )}
          </div>

          <input
            id="profile-email"
            type="email"
            value={profile.email}
            readOnly
            aria-describedby="profile-email-help"
            className="h-[42px] w-full cursor-not-allowed rounded-lg border border-black/10 bg-[#F6F3F2]/40 px-3.5 text-sm text-[#1C1B1B] outline-none"
          />

          <p
            id="profile-email-help"
            className="mt-2 flex items-start gap-1.5 text-[11px] leading-5 text-[#414752]"
          >
            <LockKeyhole
              size={12}
              className="mt-1 shrink-0 text-[#717784]"
            />
            Email mahasiswa terhubung ke akun BCC dan
            tidak dapat diubah melalui halaman ini.
          </p>
        </div>

        {/* Error */}
        {errors.root?.message && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
          >
            {errors.root.message}
          </p>
        )}

        {/* Berhasil */}
        {success && (
          <p
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
          >
            Perubahan profil berhasil disimpan.
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#005DA9] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#004B89] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={15} aria-hidden="true" />
              {isSubmitting
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting || !isDirty}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#F6F3F2] px-4 text-sm font-medium text-[#1C1B1B] transition hover:bg-[#EAE7E7] disabled:opacity-50"
            >
              Batal
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#414752]">
            <span
              className={`size-1.5 rounded-full ${
                isDirty ? "bg-amber-500" : "bg-[#0C6854]"
              }`}
            />
            {isDirty
              ? "Ada perubahan belum disimpan"
              : "Tidak ada perubahan"}
          </div>
        </div>
      </form>
    </div>
  );
}
