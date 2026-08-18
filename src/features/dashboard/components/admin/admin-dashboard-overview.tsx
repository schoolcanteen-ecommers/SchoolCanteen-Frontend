import type {
  LucideIcon,
} from "lucide-react";
import {
  CircleDollarSign,
  ClipboardList,
  Store,
  Users,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";

interface AdminDashboardOverviewProps {
  totalStudents: number;
  activeMerchants: number;
  ordersToday: number;
  transactionValue: number;
}

export function AdminDashboardOverview({
  totalStudents,
  activeMerchants,
  ordersToday,
  transactionValue,
}: AdminDashboardOverviewProps) {
  const cards: Array<{
    title: string;
    value: string;
    icon: LucideIcon;
    tone: "blue" | "neutral" | "navy";
  }> = [
    {
      title: "Total Students",
      value: String(totalStudents),
      icon: Users,
      tone: "blue",
    },
    {
      title: "Active Merchants",
      value: String(activeMerchants),
      icon: Store,
      tone: "neutral",
    },
    {
      title: "Orders Today",
      value: String(ordersToday),
      icon: ClipboardList,
      tone: "blue",
    },
    {
      title: "Transaction Value",
      value:
        formatCurrency(
          transactionValue,
        ),
      icon: CircleDollarSign,
      tone: "navy",
    },
  ];

  return (
    <section>
      <h2 className="mb-4 font-heading text-[24px] font-semibold text-navy-steel lg:hidden">
        Overview
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
        {cards.map((card, index) => (
          <OverviewCard
            key={card.title}
            {...card}
            wide={index >= 2}
          />
        ))}
      </div>
    </section>
  );
}

interface OverviewCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  tone: "blue" | "neutral" | "navy";
  wide: boolean;
}

function OverviewCard({
  title,
  value,
  icon: Icon,
  tone,
  wide,
}: OverviewCardProps) {
  const iconClassName =
    tone === "navy"
      ? "bg-navy-steel text-white"
      : tone === "neutral"
        ? "bg-[#F2F4F6] text-[#536069]"
        : "bg-arctic-blue text-navy-steel";

  return (
    <article
      className={`rounded-[18px] border border-[#E5EAED] bg-white p-4 shadow-[0_6px_20px_rgba(13,27,42,0.035)] lg:p-6 ${
        wide
          ? "col-span-2 lg:col-span-1"
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex size-9 items-center justify-center rounded-2xl lg:size-12 ${iconClassName}`}
        >
          <Icon className="size-4 lg:size-5" />
        </div>
      </div>

      <div className="mt-4 lg:mt-5">
        <p className="text-sm font-medium text-[#59666F]">
          {title}
        </p>
        <p className="mt-1 font-heading text-[25px] font-bold leading-tight text-navy-steel lg:text-[30px]">
          {value}
        </p>
      </div>
    </article>
  );
}
