"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import {
  changeCurrentUserPassword,
} from "@/features/auth/services/change-password-client";

interface StudentChangePasswordFormProps {
  onCancel: () => void;
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  visible: boolean;
  autoComplete:
    | "current-password"
    | "new-password";
  error?: string;
  onChange: (
    value: string,
  ) => void;
  onToggle: () => void;
}

function PasswordField({
  id,
  label,
  value,
  visible,
  autoComplete,
  error,
  onChange,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-semibold text-navy-steel"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          autoComplete={
            autoComplete
          }
          aria-invalid={
            Boolean(error)
          }
          onChange={
            (event) =>
              onChange(
                event.target.value,
              )
          }
          className={`min-h-12 w-full rounded-xl border bg-white px-4 pr-12 text-[15px] text-navy-steel outline-none transition-[border-color,box-shadow] focus-visible:border-navy-steel focus-visible:ring-2 focus-visible:ring-navy-steel/15 ${
            error
              ? "border-red-500"
              : "border-[#CDD7DD]"
          }`}
        />

        <button
          type="button"
          onClick={
            onToggle
          }
          aria-label={
            visible
              ? "Sembunyikan password"
              : "Tampilkan password"
          }
          className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#68757E] hover:bg-[#F1F5F7]"
        >
          {visible ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </button>
      </div>

      {error ? (
        <p className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function StudentChangePasswordForm({
  onCancel,
}: StudentChangePasswordFormProps) {
  const [
    currentPassword,
    setCurrentPassword,
  ] =
    useState("");

  const [
    newPassword,
    setNewPassword,
  ] =
    useState("");

  const [
    confirmation,
    setConfirmation,
  ] =
    useState("");

  const [
    showCurrent,
    setShowCurrent,
  ] =
    useState(false);

  const [
    showNew,
    setShowNew,
  ] =
    useState(false);

  const [
    showConfirmation,
    setShowConfirmation,
  ] =
    useState(false);

  const [
    currentError,
    setCurrentError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    newError,
    setNewError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    submitError,
    setSubmitError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    isSuccess,
    setIsSuccess,
  ] =
    useState(false);

  const [
    isSaving,
    setIsSaving,
  ] =
    useState(false);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setCurrentError(null);
    setNewError(null);
    setSubmitError(null);
    setIsSuccess(false);

    if (
      !currentPassword
    ) {
      setCurrentError(
        "Masukkan password saat ini.",
      );

      return;
    }

    if (
      newPassword.length < 8
    ) {
      setNewError(
        "Password baru minimal 8 karakter.",
      );

      return;
    }

    if (
      newPassword ===
      currentPassword
    ) {
      setNewError(
        "Password baru harus berbeda dari password saat ini.",
      );

      return;
    }

    if (
      confirmation !==
      newPassword
    ) {
      setNewError(
        "Konfirmasi password belum sama.",
      );

      return;
    }

    setIsSaving(true);

    try {
      await changeCurrentUserPassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmation("");

      setIsSuccess(true);
    } catch (
      error
    ) {
      if (
        error instanceof Error &&
        error.message ===
          "CURRENT_PASSWORD_INVALID"
      ) {
        setCurrentError(
          "Password saat ini tidak sesuai.",
        );
      } else if (
        error instanceof Error &&
        error.message ===
          "REAUTHENTICATION_NEEDED"
      ) {
        setSubmitError(
          "Sesi perlu diverifikasi ulang sebelum password dapat diganti.",
        );
      } else {
        setSubmitError(
          "Password gagal diperbarui. Coba lagi.",
        );
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="mt-5 border-t border-[#E5EAED] pt-5"
    >
      <div className="flex items-start gap-3 rounded-2xl bg-[#F5F8FA] p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-navy-steel">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <p className="text-sm font-bold text-navy-steel">
            Keamanan akun
          </p>

          <p className="mt-1 text-xs leading-5 text-[#68757E]">
            Gunakan password yang berbeda dari akun lain dan jangan bagikan kepada siapa pun.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <PasswordField
          id="current-password"
          label="Password Saat Ini"
          value={
            currentPassword
          }
          visible={
            showCurrent
          }
          autoComplete="current-password"
          error={
            currentError ??
            undefined
          }
          onChange={
            setCurrentPassword
          }
          onToggle={() =>
            setShowCurrent(
              (value) =>
                !value,
            )
          }
        />

        <PasswordField
          id="new-password"
          label="Password Baru"
          value={
            newPassword
          }
          visible={
            showNew
          }
          autoComplete="new-password"
          error={
            newError ??
            undefined
          }
          onChange={
            setNewPassword
          }
          onToggle={() =>
            setShowNew(
              (value) =>
                !value,
            )
          }
        />

        <PasswordField
          id="confirm-password"
          label="Konfirmasi Password Baru"
          value={
            confirmation
          }
          visible={
            showConfirmation
          }
          autoComplete="new-password"
          onChange={
            setConfirmation
          }
          onToggle={() =>
            setShowConfirmation(
              (value) =>
                !value,
            )
          }
        />
      </div>

      {isSuccess ? (
        <div
          role="status"
          className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <ShieldCheck className="size-4" />
            Password berhasil diperbarui.
          </div>
        </div>
      ) : null}

      {submitError ? (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700"
        >
          {submitError}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:flex sm:justify-end">
        <button
          type="button"
          onClick={
            onCancel
          }
          disabled={
            isSaving
          }
          className="min-h-12 rounded-xl border border-[#CDD7DD] bg-white px-6 text-sm font-semibold text-navy-steel hover:bg-[#F5F7F8] disabled:opacity-50"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={
            isSaving
          }
          className="min-h-12 rounded-xl bg-navy-steel px-7 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
        >
          {isSaving
            ? "Menyimpan..."
            : "Ubah Password"}
        </button>
      </div>
    </form>
  );
}
