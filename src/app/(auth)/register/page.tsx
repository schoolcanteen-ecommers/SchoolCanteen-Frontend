import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { RegisterForm } from "@/features/auth/components/register-form";

interface RegisterPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
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
              School Commerce Management
            </p>
          </div>
        </Link>

        <div className="relative my-auto max-w-xl">
          <p className="text-sm font-medium text-primary-foreground/70">
            Mulai menggunakan SchoolCanteen
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Satu akun untuk kebutuhan
            commerce sekolahmu.
          </h1>

          <div className="mt-8 space-y-4 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0" />
              Pesan makanan dari kantin.
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0" />
              Belanja kebutuhan koperasi.
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0" />
              Pantau pesanan dan wallet.
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-4" />
            Kembali
          </Link>

          <div className="mb-8">
            <p className="text-sm font-medium text-primary">
              Buat akun baru
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Daftar SchoolCanteen
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Buat akun siswa untuk
              melanjutkan transaksi dan
              mengakses layanan digital
              sekolah.
            </p>
          </div>

          <RegisterForm
            redirectTo={
              redirectTo
            }
          />
        </div>
      </section>
    </main>
  );
}