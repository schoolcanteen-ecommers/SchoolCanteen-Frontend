"use client";

import { useState } from "react";

import {
  History,
  PlusCircle,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { StudentTopUpCard } from "@/features/wallet/components/student-topup-card";
import { formatCurrency } from "@/lib/utils";

interface StudentWalletOverviewProps {
  balance: number;
  walletIsActive: boolean;
}

export function StudentWalletOverview({
  balance,
  walletIsActive,
}: StudentWalletOverviewProps) {
  const [showTopUp, setShowTopUp] = useState(false);

  function handleHistoryClick() {
    document
      .getElementById("wallet-transactions")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        <div className="relative min-h-[190px] overflow-hidden rounded-[20px] bg-[#0D1B2A] p-6 text-white shadow-[0_12px_32px_rgba(13,27,42,0.08)] md:col-span-8 md:min-h-[240px] md:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#15283A] via-[#0D1B2A] to-[#07111C]" />

          <div className="relative z-10 flex h-full min-h-[142px] flex-col justify-between md:min-h-[160px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/75 md:text-base">
                  Saldo Saat Ini
                </p>
                <p className="mt-2 text-[42px] font-bold leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-[52px]">
                  {formatCurrency(balance)}
                </p>
              </div>

              <div className="hidden size-16 items-center justify-center rounded-full bg-white/10 text-white/90 md:flex">
                <WalletCards className="size-8" />
              </div>
            </div>

            <p className="hidden items-center gap-2 text-sm text-white/65 md:flex">
              <ShieldCheck className="size-4" />
              Saldo aman dan tercatat pada sistem SchoolCanteen.
            </p>
          </div>

          <WalletCards className="pointer-events-none absolute -bottom-7 -right-5 size-36 text-white/[0.08] md:hidden" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:gap-4">
          <button
            type="button"
            onClick={() => setShowTopUp((current) => !current)}
            aria-expanded={showTopUp}
            aria-controls="student-wallet-topup"
            className="group flex min-h-[72px] items-center justify-center gap-2 rounded-[16px] border border-[#DCE5ED] bg-white px-4 py-4 text-left transition hover:border-[#0D1B2A]/30 hover:shadow-[0_12px_32px_rgba(13,27,42,0.06)] md:min-h-[112px] md:justify-start md:gap-4 md:px-6"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E6F4FF] text-[#0D1B2A] transition-colors group-hover:bg-[#0D1B2A] group-hover:text-white md:size-12">
              <PlusCircle className="size-5 md:size-6" />
            </span>
            <span>
              <span className="block text-base font-semibold text-[#191C1E] md:text-xl">
                Top Up
              </span>
              <span className="mt-1 hidden text-xs text-[#536069] md:block">
                Isi saldo wallet kamu
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={handleHistoryClick}
            className="group flex min-h-[72px] items-center justify-center gap-2 rounded-[16px] border border-[#DCE5ED] bg-white px-4 py-4 text-left transition hover:border-[#0D1B2A]/30 hover:shadow-[0_12px_32px_rgba(13,27,42,0.06)] md:min-h-[112px] md:justify-start md:gap-4 md:px-6"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E6F4FF] text-[#0D1B2A] transition-colors group-hover:bg-[#0D1B2A] group-hover:text-white md:size-12">
              <History className="size-5 md:size-6" />
            </span>
            <span>
              <span className="block text-base font-semibold text-[#191C1E] md:text-xl">
                Riwayat
              </span>
              <span className="mt-1 hidden text-xs text-[#536069] md:block">
                Lihat mutasi saldo
              </span>
            </span>
          </button>
        </div>
      </div>

      {showTopUp && (
        <div id="student-wallet-topup" className="scroll-mt-24">
          <StudentTopUpCard walletIsActive={walletIsActive} />
        </div>
      )}
    </section>
  );
}
