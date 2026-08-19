"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import {
  createClient,
} from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmation,
    setConfirmation,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmation,
    setShowConfirmation,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string | null>(
    null,
  );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrorMessage(null);

    if (
      password.length < 8
    ) {
      setErrorMessage(
        "Password baru minimal 8 karakter.",
      );

      return;
    }

    if (
      password !==
      confirmation
    ) {
      setErrorMessage(
        "Konfirmasi password belum sama.",
      );

      return;
    }

    setIsSubmitting(true);

    const supabase =
      createClient();

    const {
      data:
        sessionData,
    } =
      await supabase.auth
        .getSession();

    if (
      !sessionData.session
    ) {
      setErrorMessage(
        "Link reset password sudah tidak valid atau kedaluwarsa. Minta link baru.",
      );

      setIsSubmitting(false);

      return;
    }

    const {
      error,
    } =
      await supabase.auth
        .updateUser({
          password,
        });

    if (error) {
      setErrorMessage(
        "Password belum dapat diperbarui. Coba lagi.",
      );

      setIsSubmitting(false);

      return;
    }

    /*
     * Recovery session hanya dibutuhkan
     * untuk proses reset.
     *
     * Setelah sukses, keluar dari session
     * ini supaya user login normal dengan
     * password barunya.
     */
    await supabase.auth.signOut({
      scope: "local",
    });

    window.location.replace(
      "/login?reset=success",
    );
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-5"
    >
      <div>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-arctic-blue text-navy-steel">
          <LockKeyhole className="size-6" />
        </div>

        <h1 className="mt-5 font-heading text-3xl font-bold text-navy-steel">
          Buat Password Baru
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#68757E]">
          Gunakan password baru yang mudah kamu ingat dan tidak digunakan di akun lain.
        </p>
      </div>

      <div>
        <label
          htmlFor="reset-password"
          className="mb-2 block text-sm font-semibold text-navy-steel"
        >
          Password Baru
        </label>

        <div className="relative">
          <input
            id="reset-password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={
              password
            }
            autoComplete="new-password"
            onChange={
              (event) =>
                setPassword(
                  event.target.value,
                )
            }
            className="min-h-12 w-full rounded-xl border border-[#CDD7DD] bg-white px-4 pr-12 text-sm text-navy-steel outline-none focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (value) =>
                  !value,
              )
            }
            aria-label={
              showPassword
                ? "Sembunyikan password"
                : "Tampilkan password"
            }
            className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#68757E]"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="reset-confirmation"
          className="mb-2 block text-sm font-semibold text-navy-steel"
        >
          Konfirmasi Password Baru
        </label>

        <div className="relative">
          <input
            id="reset-confirmation"
            type={
              showConfirmation
                ? "text"
                : "password"
            }
            value={
              confirmation
            }
            autoComplete="new-password"
            onChange={
              (event) =>
                setConfirmation(
                  event.target.value,
                )
            }
            className="min-h-12 w-full rounded-xl border border-[#CDD7DD] bg-white px-4 pr-12 text-sm text-navy-steel outline-none focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmation(
                (value) =>
                  !value,
              )
            }
            aria-label={
              showConfirmation
                ? "Sembunyikan password"
                : "Tampilkan password"
            }
            className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#68757E]"
          >
            {showConfirmation ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={
          isSubmitting
        }
        className="min-h-12 w-full rounded-xl bg-navy-steel px-5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting
          ? "Menyimpan..."
          : "Simpan Password Baru"}
      </button>
    </form>
  );
}
