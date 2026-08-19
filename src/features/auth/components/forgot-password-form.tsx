"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import {
  createClient,
} from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [
    email,
    setEmail,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    isSent,
    setIsSent,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string | null>(
    null,
  );

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedEmail =
      email.trim();

    if (!normalizedEmail) {
      setErrorMessage(
        "Masukkan email akun kamu.",
      );

      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const supabase =
      createClient();

    const redirectTo =
      `${window.location.origin}/auth/callback`;

    const {
      error,
    } =
      await supabase.auth
        .resetPasswordForEmail(
          normalizedEmail,
          {
            redirectTo,
          },
        );

    if (error) {
      setErrorMessage(
        "Permintaan reset password belum dapat dikirim. Coba beberapa saat lagi.",
      );

      setIsSubmitting(false);

      return;
    }

    setIsSent(true);
    setIsSubmitting(false);
  }

  if (isSent) {
    return (
      <div className="space-y-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-arctic-blue text-navy-steel">
          <Mail className="size-6" />
        </div>

        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-steel">
            Cek Email Kamu
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#68757E]">
            Jika email terdaftar, kami sudah mengirim tautan untuk membuat password baru.
          </p>
        </div>

        <div className="rounded-xl border border-[#DCE7EE] bg-[#F7F9FB] px-4 py-3">
          <p className="break-all text-sm font-semibold text-navy-steel">
            {email}
          </p>
        </div>

        <Link
          href="/login"
          prefetch={false}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#CDD7DD] bg-white px-5 text-sm font-semibold text-navy-steel"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Login
        </Link>
      </div>
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
        <Link
          href="/login"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#68757E] hover:text-navy-steel"
        >
          <ArrowLeft className="size-4" />
          Kembali
        </Link>

        <h1 className="mt-5 font-heading text-3xl font-bold text-navy-steel">
          Lupa Password?
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#68757E]">
          Masukkan email akun SchoolCanteen kamu. Kami akan mengirim tautan untuk mengatur password baru.
        </p>
      </div>

      <div>
        <label
          htmlFor="forgot-email"
          className="mb-2 block text-sm font-semibold text-navy-steel"
        >
          Email
        </label>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#87949D]" />

          <input
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={
              (event) =>
                setEmail(
                  event.target.value,
                )
            }
            placeholder="nama@email.com"
            className="min-h-12 w-full rounded-xl border border-[#CDD7DD] bg-white pl-11 pr-4 text-sm text-navy-steel outline-none focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
          />
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
          ? "Mengirim..."
          : "Kirim Link Reset"}
      </button>
    </form>
  );
}
