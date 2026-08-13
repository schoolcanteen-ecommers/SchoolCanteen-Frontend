import type {
  OrderStatus,
} from "@/types/order";

import {
  ORDER_STATUS_LABEL,
} from "@/lib/constants";

import { cn } from "@/lib/utils";

type OrderStatusFilter =
  | "ALL"
  | OrderStatus;

interface OrderStatusTabsProps {
  value: OrderStatusFilter;

  onChange: (
    value: OrderStatusFilter,
  ) => void;
}

const orderStatuses: OrderStatus[] = [
  "WAITING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED_UP",
  "COMPLETED",
  "CANCELLED",
];

export function OrderStatusTabs({
  value,
  onChange,
}: OrderStatusTabsProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-2">
        <button
          type="button"
          onClick={() =>
            onChange("ALL")
          }
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",

            value === "ALL"
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          Semua
        </button>

        {orderStatuses.map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                onChange(status)
              }
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",

                value === status
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {
                ORDER_STATUS_LABEL[
                  status
                ]
              }
            </button>
          ),
        )}
      </div>
    </div>
  );
}