import {
  Check,
  Circle,
  XCircle,
} from "lucide-react";

import {
  ORDER_STATUS_LABEL,
} from "@/lib/constants";

import {
  cn,
} from "@/lib/utils";

import type {
  OrderStatus,
  PaymentStatus,
} from "@/types/order";

interface OrderTimelineTimestamps {
  confirmedAt: string | null;
  preparingAt: string | null;
  readyAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
}

interface OrderTimelineProps {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  paymentHeldAt: string | null;
  timeline: OrderTimelineTimestamps;
}

interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  timestamp?: string | null;
  state: "completed" | "current" | "upcoming";
}

function formatTimelineTime(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    },
  ).format(new Date(value));
}

function getProcessingDescription(
  status: OrderStatus,
): string {
  switch (status) {
    case "WAITING":
      return "Menunggu konfirmasi merchant.";

    case "CONFIRMED":
      return "Pesanan telah dikonfirmasi merchant.";

    case "PREPARING":
      return "Sedang disiapkan oleh merchant.";

    default:
      return "Pesanan telah melalui tahap pemrosesan.";
  }
}

export function OrderTimeline({
  status,
  paymentStatus,
  createdAt,
  paymentHeldAt,
  timeline,
}: OrderTimelineProps) {
  if (status === "CANCELLED") {
    const cancelledTime =
      formatTimelineTime(
        timeline.cancelledAt,
      );

    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <XCircle className="size-5 text-red-700" />
          </div>

          <div>
            <p className="font-semibold text-red-800">
              Pesanan Dibatalkan
            </p>

            <p className="mt-1 text-sm leading-6 text-red-700">
              Pesanan ini tidak dilanjutkan ke proses berikutnya.
            </p>

            {cancelledTime && (
              <p className="mt-2 text-xs font-medium text-red-700/80">
                {cancelledTime}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const paymentCompleted =
    paymentStatus !== "UNPAID";

  const processingStatuses: OrderStatus[] = [
    "WAITING",
    "CONFIRMED",
    "PREPARING",
  ];

  const isProcessing =
    processingStatuses.includes(status);

  const processingTitle =
    isProcessing
      ? ORDER_STATUS_LABEL[status]
      : "Diproses";

  const processingTimestamp =
    status === "PREPARING"
      ? timeline.preparingAt
      : status === "CONFIRMED"
        ? timeline.confirmedAt
        : timeline.preparingAt ??
          timeline.confirmedAt;

  const steps: TimelineStep[] = [
    {
      id: "created",
      title: "Pesanan Dibuat",
      timestamp: createdAt,
      state: "completed",
    },
    {
      id: "payment",
      title: "Pembayaran Berhasil",
      timestamp: paymentHeldAt,
      state: paymentCompleted
        ? "completed"
        : "current",
      description: paymentCompleted
        ? undefined
        : "Menunggu konfirmasi pembayaran.",
    },
    {
      id: "processing",
      title: processingTitle,
      timestamp: processingTimestamp,
      description: isProcessing
        ? getProcessingDescription(status)
        : undefined,
      state: !paymentCompleted
        ? "upcoming"
        : isProcessing
          ? "current"
          : "completed",
    },
    {
      id: "ready",
      title: "Siap Diambil",
      timestamp: timeline.readyAt,
      state:
        status === "READY"
          ? "current"
          : status === "COMPLETED"
            ? "completed"
            : "upcoming",
    },
    {
      id: "completed",
      title: "Selesai",
      timestamp: timeline.completedAt,
      state:
        status === "COMPLETED"
          ? "current"
          : "upcoming",
    },
  ];

  return (
    <div>
      {steps.map((step, index) => {
        const last =
          index === steps.length - 1;

        const formattedTime =
          formatTimelineTime(
            step.timestamp,
          );

        return (
          <div
            key={step.id}
            className="relative flex gap-4 sm:gap-5"
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-white",
                  step.state === "completed" &&
                    "border-navy-steel bg-navy-steel text-white",
                  step.state === "current" &&
                    "border-navy-steel bg-arctic-blue text-navy-steel ring-4 ring-arctic-blue/70",
                  step.state === "upcoming" &&
                    "border-[#C4C6CC] text-[#C4C6CC]",
                )}
              >
                {step.state === "completed" ? (
                  <Check className="size-3.5" />
                ) : step.state === "current" ? (
                  <Circle className="size-2 fill-navy-steel stroke-navy-steel" />
                ) : null}
              </div>

              {!last && (
                <div
                  className={cn(
                    "min-h-12 w-0.5 flex-1",
                    step.state === "completed"
                      ? "bg-navy-steel"
                      : "bg-[#E6E8EA]",
                  )}
                />
              )}
            </div>

            <div className="min-h-[72px] pb-5 sm:min-h-[82px] sm:pb-6">
              <p
                className={cn(
                  "text-sm font-semibold sm:text-base",
                  step.state === "upcoming"
                    ? "text-[#A3A8AE]"
                    : "text-navy-steel",
                )}
              >
                {step.title}
              </p>

              {formattedTime && (
                <p className="mt-1 text-xs text-[#536069] sm:text-sm">
                  {formattedTime}
                </p>
              )}

              {step.description && (
                <p className="mt-1 max-w-sm text-xs leading-5 text-[#536069] sm:text-sm sm:leading-6">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
