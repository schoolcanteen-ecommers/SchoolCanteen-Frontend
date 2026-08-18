import {
  CircleCheck,
  Package,
  TriangleAlert,
} from "lucide-react";

import type {
  AdminCanteenMenuStats,
} from "@/lib/api/admin-canteen-menu";

interface AdminCanteenMenuOverviewProps {
  stats: AdminCanteenMenuStats;
}

export function AdminCanteenMenuOverview({
  stats,
}: AdminCanteenMenuOverviewProps) {
  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      iconClassName:
        "bg-arctic-blue text-navy-steel",
      valueClassName:
        "text-navy-steel",
    },
    {
      label: "Active Products",
      value: stats.activeProducts,
      icon: CircleCheck,
      iconClassName:
        "bg-emerald-50 text-emerald-600",
      valueClassName:
        "text-navy-steel",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStockProducts,
      icon: TriangleAlert,
      iconClassName:
        "bg-red-50 text-red-700",
      valueClassName:
        "text-red-700 lg:text-navy-steel",
    },
  ];

  return (
    <section className="grid gap-3 lg:grid-cols-3 lg:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.label}
            className="flex min-h-[104px] items-center justify-between rounded-[18px] border border-[#E0E3E5] bg-white p-5 shadow-[0_4px_6px_rgba(13,27,42,0.02)] lg:min-h-[102px] lg:p-6"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#536069] lg:text-xs lg:font-semibold">
                {card.label}
              </p>
              <p
                className={`mt-1 font-heading text-[22px] font-semibold leading-7 lg:text-2xl ${card.valueClassName}`}
              >
                {card.value.toLocaleString(
                  "id-ID",
                )}
              </p>
            </div>

            <div
              className={`flex size-11 items-center justify-center rounded-full lg:size-12 ${card.iconClassName}`}
            >
              <Icon className="size-5 lg:size-6" />
            </div>
          </article>
        );
      })}
    </section>
  );
}
