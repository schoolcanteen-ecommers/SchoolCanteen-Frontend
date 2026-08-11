import type { OrderStatus } from "@/types/order";

import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",

        status === "WAITING" &&
          "bg-amber-50 text-amber-700",

        status === "CONFIRMED" &&
          "bg-blue-50 text-blue-700",

        status === "PREPARING" &&
          "bg-violet-50 text-violet-700",

        status === "READY" &&
          "bg-emerald-50 text-emerald-700",

        status === "PICKED_UP" &&
          "bg-cyan-50 text-cyan-700",

        status === "COMPLETED" &&
          "bg-slate-100 text-slate-700",

        status === "CANCELLED" &&
          "bg-red-50 text-red-700"
      )}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}