import { Clock3, Landmark, LockKeyhole, Store, WalletCards } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import type { AdminFinanceSummary } from "@/lib/api/admin-finance";

interface Props {
  summary: AdminFinanceSummary;
}

export function AdminFinanceMetricCards({ summary }: Props) {
  const metrics = [
    { label: "Transaction Value", value: summary.transactionValue, icon: WalletCards },
    { label: "Escrow Held", value: summary.escrowHeld, icon: LockKeyhole },
    { label: "Merchant Available Balance", value: summary.merchantAvailable, icon: Store },
    { label: "Pending Withdrawal", value: summary.pendingWithdrawalAmount, icon: Clock3 },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article
            key={metric.label}
            className="flex min-h-[112px] items-center gap-4 rounded-[22px] border border-[#E2E7EB] bg-white px-5 py-5 shadow-[0_8px_28px_rgba(13,27,42,0.035)] sm:min-h-[126px] sm:px-6"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-arctic-blue sm:size-14">
              <Icon className="size-5 text-navy-steel" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-[0.02em] text-[#68757E] sm:text-sm">
                {metric.label}
              </p>
              <p className="mt-1 font-heading text-[25px] font-bold leading-tight text-navy-steel sm:text-[27px]">
                {formatCurrency(metric.value)}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function AdminFinancialOverview({ summary }: Props) {
  const rows = [
    { label: "Successful Top Ups", value: summary.successfulTopups, icon: WalletCards },
    { label: "Total Payments", value: summary.transactionValue, icon: Landmark },
    { label: "Merchant Pending Balance", value: summary.merchantPending, icon: Clock3 },
    { label: "Merchant Available Balance", value: summary.merchantAvailable, icon: Store },
  ];

  return (
    <section>
      <h2 className="mb-4 font-heading text-[26px] font-bold text-navy-steel xl:hidden">
        Financial Overview
      </h2>
      <div className="overflow-hidden rounded-[22px] border border-[#E2E7EB] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.035)]">
        <div className="hidden border-b border-[#E2E7EB] bg-arctic-blue/70 px-6 py-4 xl:block">
          <h2 className="text-xl font-semibold text-navy-steel">Financial Overview</h2>
        </div>
        <div className="divide-y divide-[#EDF0F2] px-5 sm:px-6">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-center justify-between gap-4 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className="size-4 shrink-0 text-[#536069]" />
                  <span className="text-sm text-[#536069] sm:text-[15px]">{row.label}</span>
                </div>
                <span className="shrink-0 text-sm font-medium text-navy-steel sm:text-[15px]">
                  {formatCurrency(row.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
