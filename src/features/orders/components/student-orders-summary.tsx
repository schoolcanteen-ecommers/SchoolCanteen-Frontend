import {
  Store,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";

interface StudentOrdersSummaryProps {
  totalOrders: number;
  totalTransactions: number;
  favoriteMerchant: string | null;
}

export function StudentOrdersSummary({
  totalOrders,
  totalTransactions,
  favoriteMerchant,
}: StudentOrdersSummaryProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 rounded-[20px] border border-arctic-blue bg-white p-6 shadow-[0_12px_32px_rgba(13,27,42,0.04)]">
        <h2 className="border-b border-arctic-blue pb-4 font-heading text-[28px] font-semibold text-navy-steel">
          Ringkasan
        </h2>

        <div className="space-y-6 pt-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#536069]">
              Total pesanan bulan ini
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold text-navy-steel">
              {totalOrders}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-wide text-[#536069]">
              Jumlah transaksi
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold text-navy-steel">
              {formatCurrency(
                totalTransactions,
              )}
            </p>
          </div>

          <div className="border-t border-arctic-blue pt-5">
            <p className="text-xs font-medium tracking-wide text-[#536069]">
              Favorite merchant
            </p>

            <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F7F9FB] p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel">
                <Store className="size-5" />
              </div>

              <span className="min-w-0 truncate text-sm font-semibold text-[#191C1E]">
                {favoriteMerchant ??
                  "Belum tersedia"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
