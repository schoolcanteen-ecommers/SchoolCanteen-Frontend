import Link from "next/link";
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
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/kantin"
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
                >
                  Kantin
                </Link>
              </li>

              <li>
                <Link
                  href="/koperasi"
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
                >
                  Koperasi
                </Link>
              </li>
            </ul>
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
                >
                  Masuk
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white"
                >
                  Daftar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-[#536069]">
            © 2026 SchoolCanteen
          </p>

          <p className="font-sans text-xs text-[#536069]">
            Kantin & koperasi sekolah dalam satu tempat.
          </p>
        </div>
      </div>
    </footer>
  );
}