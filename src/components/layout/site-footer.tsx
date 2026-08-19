import Link from "next/link";
<<<<<<< HEAD
import { GraduationCap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full bg-navy-steel py-12">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <GraduationCap className="size-8" />

              <span className="font-heading text-2xl font-bold tracking-tight">
                SchoolCanteen
              </span>
            </div>

            <p className="max-w-md font-sans text-sm leading-relaxed text-[#8FA0B2]">
              Belanja kebutuhan sekolah jadi lebih praktis. Temukan makanan di
              kantin dan kebutuhan sekolah dalam satu platform.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#B8C4D1]">
              Jelajahi
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
=======

import {
  GraduationCap,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="hidden w-full border-t border-white/10 bg-[#0D1B2A] text-white md:block">
      <div className="mx-auto max-w-[1120px] px-8 py-12 lg:py-14">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-6">
            <Link
              href="/"
              prefetch={false}
              aria-label="SchoolCanteen Beranda"
              className="inline-flex items-center gap-3"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <GraduationCap
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={2.2}
                />
              </span>

              <span className="font-heading text-[22px] font-bold tracking-tight">
                SchoolCanteen
              </span>
            </Link>

            <p className="mt-4 max-w-[390px] text-sm leading-6 text-white/55">
              Pesan makanan kantin dan kebutuhan koperasi sekolah dalam satu platform yang praktis.
            </p>
          </div>

          <nav
            aria-label="Jelajahi SchoolCanteen"
            className="col-span-3"
          >
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              Jelajahi
            </h2>

            <ul className="mt-4 space-y-1">
              <li>
                <Link
                  href="/"
                  prefetch={false}
                  className="inline-flex min-h-9 items-center text-sm text-white/65 transition-colors hover:text-white"
>>>>>>> source/main
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/kantin"
<<<<<<< HEAD
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
=======
                  prefetch={false}
                  className="inline-flex min-h-9 items-center text-sm text-white/65 transition-colors hover:text-white"
>>>>>>> source/main
                >
                  Kantin
                </Link>
              </li>

              <li>
                <Link
                  href="/koperasi"
<<<<<<< HEAD
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
=======
                  prefetch={false}
                  className="inline-flex min-h-9 items-center text-sm text-white/65 transition-colors hover:text-white"
>>>>>>> source/main
                >
                  Koperasi
                </Link>
              </li>
            </ul>
<<<<<<< HEAD
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#B8C4D1]">
              Akses
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
=======
          </nav>

          <nav
            aria-label="Akses akun"
            className="col-span-3"
          >
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              Akun
            </h2>

            <ul className="mt-4 space-y-1">
              <li>
                <Link
                  href="/login"
                  prefetch={false}
                  className="inline-flex min-h-9 items-center text-sm text-white/65 transition-colors hover:text-white"
>>>>>>> source/main
                >
                  Masuk
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
<<<<<<< HEAD
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
=======
                  prefetch={false}
                  className="inline-flex min-h-9 items-center text-sm text-white/65 transition-colors hover:text-white"
>>>>>>> source/main
                >
                  Daftar
                </Link>
              </li>
            </ul>
<<<<<<< HEAD
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-[#536069]">
            © 2026 SchoolCanteen
          </p>

          <p className="font-sans text-xs text-[#536069]">
            Kantin & koperasi sekolah dalam satu tempat.
=======
          </nav>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            © 2026 SchoolCanteen
          </p>

          <p className="text-xs text-white/40">
            Kantin dan koperasi sekolah dalam satu tempat.
>>>>>>> source/main
          </p>
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> source/main
