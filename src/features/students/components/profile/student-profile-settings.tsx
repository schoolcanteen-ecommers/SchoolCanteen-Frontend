<<<<<<< HEAD
import {
  ChevronRight,
  LockKeyhole,
} from "lucide-react";

export function StudentProfileSettings() {
  return (
    <section className="rounded-[24px] border border-white/50 bg-white p-2 shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:rounded-[18px] lg:border-[#0D1B2A]/[0.08] lg:p-6 lg:shadow-none">
      <h2 className="px-4 pb-3 pt-4 font-heading text-2xl font-semibold text-navy-steel lg:border-b lg:border-[#E0E3E5] lg:px-0 lg:pb-5 lg:pt-0 lg:font-sans lg:text-base lg:font-semibold">
        <span className="lg:hidden">
          Pengaturan
        </span>
        <span className="hidden lg:inline">
          Pengaturan Akun
        </span>
      </h2>

      <button
        type="button"
        disabled
        title="Ubah password belum tersedia"
        className="flex w-full cursor-not-allowed items-center justify-between rounded-xl p-4 text-left lg:mt-4 lg:p-3"
      >
        <span className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-navy-steel lg:bg-[#E6F4FF]">
            <LockKeyhole className="size-5" />
          </span>

          <span>
            <span className="block text-base font-medium text-navy-steel">
              Ubah Password
            </span>
            <span className="mt-1 hidden text-xs text-[#536069] lg:block">
              Kelola keamanan dan kata sandi akun.
            </span>
          </span>
        </span>

        <ChevronRight className="size-5 text-[#536069]" />
      </button>
=======
"use client";

import {
  ChevronRight,
  LockKeyhole,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  StudentChangePasswordForm,
} from "@/features/students/components/profile/student-change-password-form";

export function StudentProfileSettings() {
  const [
    isChangingPassword,
    setIsChangingPassword,
  ] =
    useState(false);

  return (
    <section className="rounded-[20px] border border-[#E1E8ED] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy-steel">
            Pengaturan
          </h2>

          <p className="mt-1 text-[13px] leading-5 text-[#68757E]">
            Kelola keamanan dan akses akun kamu.
          </p>
        </div>

        {isChangingPassword ? (
          <button
            type="button"
            onClick={() =>
              setIsChangingPassword(
                false,
              )
            }
            aria-label="Tutup ubah password"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-[#68757E] transition-colors hover:bg-[#F2F5F7]"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>

      {!isChangingPassword ? (
        <button
          type="button"
          onClick={() =>
            setIsChangingPassword(
              true,
            )
          }
          className="mt-5 flex min-h-[64px] w-full items-center gap-4 rounded-2xl border border-[#E4E9EC] px-4 text-left transition-colors hover:bg-[#F7F9FA]"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1F4F6] text-navy-steel">
            <LockKeyhole className="size-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-navy-steel">
              Ubah Password
            </span>

            <span className="mt-0.5 block text-xs leading-5 text-[#74818A]">
              Perbarui password untuk menjaga keamanan akun.
            </span>
          </span>

          <ChevronRight className="size-5 shrink-0 text-[#74818A]" />
        </button>
      ) : (
        <StudentChangePasswordForm
          onCancel={() =>
            setIsChangingPassword(
              false,
            )
          }
        />
      )}
>>>>>>> source/main
    </section>
  );
}
