import {
  Banknote,
  CheckCircle2,
  Clock3,
  ReceiptText,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";

import type {
  AdminTransactionStats,
} from "@/lib/api/admin-transaction-shared";

interface AdminTransactionOverviewProps {
  stats: AdminTransactionStats;
}

export function AdminTransactionOverview({
  stats,
}: AdminTransactionOverviewProps) {
  const cards = [
    {
      label: "Total Transactions",
      value:
        stats.totalTransactions.toLocaleString(
          "id-ID",
        ),
      icon: ReceiptText,
      iconClass:
        "bg-arctic-blue text-navy-steel",
    },
    {
      label: "Transaction Value",
      value: formatCurrency(
        stats.transactionValue,
      ),
      icon: Banknote,
      iconClass:
        "bg-navy-steel text-white",
    },
    {
      label: "Completed",
      value:
        stats.completedTransactions.toLocaleString(
          "id-ID",
        ),
      icon: CheckCircle2,
      iconClass:
        "border border-navy-steel/10 bg-arctic-blue/50 text-navy-steel",
    },
    {
      label: "Pending",
      value:
        stats.pendingTransactions.toLocaleString(
          "id-ID",
        ),
      icon: Clock3,
      iconClass:
        "bg-[#ECEEF0] text-[#536069]",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {cards.map(
        ({
          label,
          value,
          icon: Icon,
          iconClass,
        }) => (
          <article
            key={label}
            className="rounded-[20px] border border-[#E5E9EC] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:flex lg:min-h-[112px] lg:items-center lg:gap-4 lg:rounded-[24px] lg:p-6"
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full lg:size-12 ${iconClass}`}
            >
              <Icon className="size-5 lg:size-6" />
            </div>

            <div className="mt-3 min-w-0 lg:mt-0">
              <p className="text-xs font-medium text-[#536069] lg:text-[12px] lg:font-bold lg:uppercase lg:tracking-[0.05em]">
                {label}
              </p>
              <p className="mt-1 font-heading text-[22px] font-semibold leading-tight text-navy-steel lg:text-2xl lg:font-bold">
                {value}
              </p>
            </div>
          </article>
        ),
      )}
    </section>
  );
}
