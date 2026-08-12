import Link from "next/link";

import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import { LoginForm } from "@/features/auth/components/login-form";

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params =
    await searchParams;

  const redirectTo =
    params.redirect ??
    "/student/dashboard";

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {}
      <section className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-white/10" />

        <Link
          href="/"
          className="relative flex items-center gap-3"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-white text-sm font-bold text-primary">
            SS
          </div>

          <div>
            <p className="font-semibold">
              SchoolCanteen
            </p>

            <p className="text-xs text-primary-foreground/70">
              School Commerce
              Management
            </p>
          </div>
        </Link>

        <div className="relative my-auto max-w-xl">
          <p className="text-sm font-medium text-primary-foreground/70">
            School Commerce
            Ecosystem
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Belanja, bayar, dan
            ambil kebutuhan sekolah
            dalam satu platform.
          </h1>

          <div className="mt-8 flex items-center gap-3 text-sm text-primary-foreground/80">
            <ShieldCheck className="size-5" />

            Akses akunmu untuk
            melanjutkan transaksi.
          </div>
        </div>
      </section>

      {}
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-4" />
            Kembali
          </Link>

          <div className="mb-8">
            <p className="text-sm font-medium text-primary">
              Selamat datang
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Masuk ke akunmu
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Masuk untuk melanjutkan
              checkout, melihat pesanan,
              dan mengakses wallet.
            </p>
          </div>

          <LoginForm
            redirectTo={
              redirectTo
            }
          />
        </div>
      </section>
    </main>
  );
}