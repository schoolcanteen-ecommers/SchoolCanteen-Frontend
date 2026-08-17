import { TrendingDown, TrendingUp } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

interface StudentWalletMonthlySummaryProps {
  totalTopUp: number;
  totalOutflow: number;
}

export function StudentWalletMonthlySummary({
  totalTopUp,
  totalOutflow,
}: StudentWalletMonthlySummaryProps) {
  return (
    <section className="grid grid-cols-2 gap-3 md:gap-6">
      <article className="rounded-xl border border-[#DCE5ED] bg-white p-4 md:flex md:items-center md:justify-between md:p-5">
        <div className="flex items-center gap-3">
          <span className="hidden size-9 items-center justify-center rounded-full bg-[#F4F8FC] text-[#0D1B2A] md:flex">
            <TrendingUp className="size-4" />
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.05em] text-[#536069] md:text-sm md:normal-case md:tracking-normal">
            <span className="md:hidden">Total Top Up</span>
            <span className="hidden md:inline">Total Top Up Bulan Ini</span>
          </p>
        </div>
        <p className="mt-2 text-lg font-semibold text-[#0D1B2A] md:mt-0 md:text-xl">
          {formatCurrency(totalTopUp)}
        </p>
      </article>

      <article className="rounded-xl border border-[#DCE5ED] bg-white p-4 md:flex md:items-center md:justify-between md:p-5">
        <div className="flex items-center gap-3">
          <span className="hidden size-9 items-center justify-center rounded-full bg-red-50 text-red-600 md:flex">
            <TrendingDown className="size-4" />
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.05em] text-[#536069] md:text-sm md:normal-case md:tracking-normal">
            <span className="md:hidden">Pengeluaran</span>
            <span className="hidden md:inline">Total Pengeluaran Bulan Ini</span>
          </p>
        </div>
        <p className="mt-2 text-lg font-semibold text-[#0D1B2A] md:mt-0 md:text-xl">
          {formatCurrency(totalOutflow)}
        </p>
      </article>
    </section>
  );
}
