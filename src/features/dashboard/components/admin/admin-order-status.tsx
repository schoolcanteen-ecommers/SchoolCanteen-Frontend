import type {
  LucideIcon,
} from "lucide-react";
import {
  Ban,
  CheckCircle2,
  CircleCheckBig,
  Clock3,
  CookingPot,
  PackageCheck,
} from "lucide-react";

interface AdminOrderStatusProps {
  waiting: number;
  confirmed: number;
  preparing: number;
  ready: number;
  completed: number;
  cancelled: number;
}

export function AdminOrderStatus({
  waiting,
  confirmed,
  preparing,
  ready,
  completed,
  cancelled,
}: AdminOrderStatusProps) {
  const statuses: Array<{
    label: string;
    value: number;
    icon: LucideIcon;
    active?: boolean;
  }> = [
    {
      label: "Waiting",
      value: waiting,
      icon: Clock3,
    },
    {
      label: "Confirmed",
      value: confirmed,
      icon: CheckCircle2,
      active: true,
    },
    {
      label: "Preparing",
      value: preparing,
      icon: CookingPot,
    },
    {
      label: "Ready",
      value: ready,
      icon: PackageCheck,
    },
    {
      label: "Completed",
      value: completed,
      icon: CircleCheckBig,
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: Ban,
    },
  ];

  return (
    <section className="lg:hidden">
      <h2 className="mb-4 font-heading text-[24px] font-semibold text-navy-steel">
        Order Status
      </h2>

      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {statuses.map(
          (status) => {
            const Icon =
              status.icon;

            return (
              <article
                key={status.label}
                className={`w-[132px] shrink-0 snap-start rounded-xl border p-4 text-center shadow-[0_4px_12px_rgba(13,27,42,0.03)] ${
                  status.active
                    ? "border-[#C7DFEF] bg-arctic-blue"
                    : "border-[#E7EBEE] bg-white"
                }`}
              >
                <Icon className="mx-auto size-6 text-[#536069]" />
                <p className="mt-2 font-heading text-[26px] font-bold leading-none text-navy-steel">
                  {status.value}
                </p>
                <p className="mt-2 text-xs font-bold tracking-[0.04em] text-[#59666F]">
                  {status.label}
                </p>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}
