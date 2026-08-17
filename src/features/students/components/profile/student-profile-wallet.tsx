import Link from "next/link";

import {
  ArrowRight,
  WalletCards,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";

interface StudentProfileWalletProps {
  balance: number;
}

export function StudentProfileWallet({
  balance,
}: StudentProfileWalletProps) {
  return (
    <section className="rounded-[20px] border border-navy-steel/5 bg-[#E6F4FF] p-5 shadow-[0_8px_24px_rgba(13,27,42,0.05)] lg:rounded-[18px] lg:p-7">
      <div className="hidden items-center gap-2 text-base font-semibold text-navy-steel lg:flex">
        <WalletCards className="size-5" />
        Wallet
      </div>

      <div className="flex items-end justify-between gap-4 lg:mt-7 lg:block lg:border-y lg:border-navy-steel/10 lg:py-5">
        <div>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.08em] text-[#536069] lg:block">
            Saldo Aktif
          </p>

          <p className="font-heading text-3xl font-bold text-navy-steel lg:mt-1 lg:font-sans lg:text-3xl">
            {formatCurrency(balance)}
          </p>
        </div>

        <Link
          href="/student/wallet"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-navy-steel px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:mt-7 lg:w-full"
        >
          <span className="lg:hidden">
            Lihat
          </span>
          <span className="hidden lg:inline">
            Lihat Wallet
          </span>
          <ArrowRight className="hidden size-4 lg:block" />
        </Link>
      </div>
    </section>
  );
}
