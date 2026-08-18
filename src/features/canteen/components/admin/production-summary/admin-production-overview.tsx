import {
  ReceiptText,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import type {
  AdminProductionStats,
} from "@/lib/api/admin-canteen-production";

interface AdminProductionOverviewProps {
  stats: AdminProductionStats;
}

export function AdminProductionOverview({
  stats,
}: AdminProductionOverviewProps) {
  const cards = [
    {
      label: "Total Orders Today",
      value: stats.totalOrdersToday,
      icon: ReceiptText,
    },
    {
      label: "Products To Prepare",
      value: stats.productsToPrepare,
      icon: UtensilsCrossed,
    },
    {
      label: "Active Canteen",
      value: stats.activeCanteens,
      icon: Store,
    },
  ];

  return (
    <section className="grid gap-3 md:grid-cols-3 md:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.label}
            className="relative overflow-hidden rounded-[18px] border border-[#E0E3E5] bg-white p-5 shadow-[0_4px_6px_rgba(13,27,42,0.02)] md:p-6"
          >
            <div className="absolute -right-6 -top-6 size-24 rounded-full bg-arctic-blue/60" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                  {card.label}
                </p>
                <p className="mt-2 font-heading text-[28px] font-bold leading-none text-navy-steel md:text-[30px]">
                  {card.value.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel md:size-12 md:rounded-xl">
                <Icon className="size-5" />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
