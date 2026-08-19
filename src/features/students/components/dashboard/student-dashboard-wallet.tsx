import Link from "next/link";
<<<<<<< HEAD
import {
  Plus,
=======

import {
  ArrowRight,
  Plus,
  WalletCards,
>>>>>>> source/main
} from "lucide-react";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

interface StudentDashboardWalletProps {
  balance: number;
<<<<<<< HEAD
=======
  isActive: boolean;
>>>>>>> source/main
  className?: string;
}

export function StudentDashboardWallet({
  balance,
<<<<<<< HEAD
=======
  isActive,
>>>>>>> source/main
  className,
}: StudentDashboardWalletProps) {
  return (
    <section
      className={cn(
<<<<<<< HEAD
        "rounded-[20px] border border-[#D1E4FF] bg-arctic-blue p-6 lg:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#536069] sm:text-sm">
            Wallet
          </p>

          <p className="mt-2 font-sans text-[30px] font-bold leading-none text-navy-steel lg:text-[38px]">
            {formatCurrency(
              balance,
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/wallet"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-navy-steel px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90"
=======
        "relative overflow-hidden rounded-[22px] bg-navy-steel p-5 text-white shadow-[0_14px_34px_rgba(13,27,42,0.14)] sm:p-6",
        className,
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/75">
            <WalletCards className="size-[17px]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Saldo SchoolCanteen
            </p>
          </div>

          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-bold",
              isActive
                ? "bg-white/10 text-white"
                : "bg-red-400/15 text-red-100",
            )}
          >
            {isActive
              ? "Aktif"
              : "Nonaktif"}
          </span>
        </div>

        <p className="mt-4 font-heading text-[34px] font-bold leading-none tracking-[-0.03em] sm:text-[40px]">
          {formatCurrency(
            balance,
          )}
        </p>

        <p className="mt-2 text-xs text-white/55">
          Bisa digunakan untuk belanja di SchoolCanteen
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Link
            href="/student/wallet"
            prefetch={false}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-navy-steel transition-opacity hover:opacity-90"
>>>>>>> source/main
          >
            <Plus className="size-4" />
            Top Up
          </Link>

          <Link
            href="/student/wallet"
<<<<<<< HEAD
            className="hidden min-h-12 items-center justify-center rounded-lg border-2 border-navy-steel px-7 text-sm font-semibold text-navy-steel transition-colors hover:bg-white sm:inline-flex"
          >
            Riwayat
          </Link>
        </div>
=======
            prefetch={false}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Riwayat
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {!isActive ? (
          <p className="mt-3 text-xs leading-5 text-red-100">
            Wallet sedang tidak dapat digunakan untuk transaksi.
          </p>
        ) : null}
>>>>>>> source/main
      </div>
    </section>
  );
}
