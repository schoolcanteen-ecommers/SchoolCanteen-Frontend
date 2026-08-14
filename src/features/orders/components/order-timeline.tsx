import {
  Check,
  Circle,
  XCircle,
} from "lucide-react";

import {
  ORDER_STATUS_LABEL,
} from "@/lib/constants";

import { cn } from "@/lib/utils";

import type {
  OrderStatus,
} from "@/types/order";

interface OrderTimelineProps {
  status: OrderStatus;
}

const orderFlow: OrderStatus[] = [
  "WAITING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED_UP",
  "COMPLETED",
];

export function OrderTimeline({
  status,
}: OrderTimelineProps) {
    if (status === "CANCELLED") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">
            <XCircle className="size-5 text-red-700" />
          </div>

          <div>
            <p className="font-semibold text-red-800">
              Pesanan Dibatalkan
            </p>

            <p className="mt-1 text-sm leading-6 text-red-700">
              Pesanan ini tidak dilanjutkan
              ke proses berikutnya.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex =
    orderFlow.indexOf(status);

  return (
    <div className="space-y-0">
      {orderFlow.map(
        (timelineStatus, index) => {
          const completed =
            index < currentIndex;

          const current =
            index === currentIndex;

          const last =
            index ===
            orderFlow.length - 1;

          return (
            <div
              key={timelineStatus}
              className="relative flex gap-4"
            >
              {}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 bg-background",

                    completed &&
                      "border-primary bg-primary text-primary-foreground",

                    current &&
                      "border-primary text-primary",

                    !completed &&
                      !current &&
                      "border-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  {completed ? (
                    <Check className="size-4" />
                  ) : (
                    <Circle
                      className={cn(
                        "size-3",

                        current &&
                          "fill-primary",
                      )}
                    />
                  )}
                </div>

                {!last && (
                  <div
                    className={cn(
                      "h-12 w-0.5",

                      index < currentIndex
                        ? "bg-primary"
                        : "bg-border",
                    )}
                  />
                )}
              </div>

              {}
              <div className="pb-8 pt-1">
                <p
                  className={cn(
                    "text-sm font-medium",

                    completed ||
                      current
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {
                    ORDER_STATUS_LABEL[
                      timelineStatus
                    ]
                  }
                </p>

                {current && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Status pesanan saat ini
                  </p>
                )}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}