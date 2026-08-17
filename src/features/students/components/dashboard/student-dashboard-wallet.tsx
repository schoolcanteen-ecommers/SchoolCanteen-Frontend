import Link from "next/link";
import {
  Plus,
} from "lucide-react";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

interface StudentDashboardWalletProps {
  balance: number;
  className?: string;
}

export function StudentDashboardWallet({
  balance,
  className,
}: StudentDashboardWalletProps) {
  return (
    <section
      className={cn(
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
          >
            <Plus className="size-4" />
            Top Up
          </Link>

          <Link
            href="/student/wallet"
            className="hidden min-h-12 items-center justify-center rounded-lg border-2 border-navy-steel px-7 text-sm font-semibold text-navy-steel transition-colors hover:bg-white sm:inline-flex"
          >
            Riwayat
          </Link>
        </div>
      </div>
    </section>
  );
}
