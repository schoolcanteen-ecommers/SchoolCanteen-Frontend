import {
  Check,
  Clock3,
  GraduationCap,
  PackageCheck,
  QrCode,
  Store,
  Utensils,
} from "lucide-react";

import type {
  AdminPickupMonitoringEntry,
  AdminPickupOrderStatus,
} from "@/mocks/admin-pickup-monitoring";

interface AdminPickupDetailProps {
  entry: AdminPickupMonitoringEntry;
}

interface TimelineStep {
  label: string;
  timestamp?: string | null;
}

export function AdminPickupDetail({
  entry,
}: AdminPickupDetailProps) {
  const timeline: TimelineStep[] = [
    {
      label: "Order Created",
      timestamp: entry.timeline.createdAt,
    },
    {
      label: "Confirmed",
      timestamp: entry.timeline.confirmedAt,
    },
    {
      label: "Preparing",
      timestamp: entry.timeline.preparingAt,
    },
    {
      label: "Ready for Pickup",
      timestamp: entry.timeline.readyAt,
    },
    {
      label: "Picked Up",
      timestamp: entry.timeline.pickedUpAt,
    },
  ];

  const completedSteps = timeline.filter(
    (step) => Boolean(step.timestamp),
  ).length;
  const currentIndex = Math.max(
    0,
    completedSteps - 1,
  );

  return (
    <div className="space-y-6 pb-6">
      <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(13,27,42,0.03)]">
        <h1 className="text-xl font-semibold text-navy-steel">
          {entry.orderCode}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <OrderStatusBadge status={entry.orderStatus} />
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
              entry.pickupStatus === "VERIFIED"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {entry.pickupStatus === "VERIFIED"
              ? "PICKED UP"
              : "WAITING PICKUP"}
          </span>
        </div>
      </section>

      <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(13,27,42,0.03)]">
        <h2 className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
          Order Status
        </h2>

        <div className="relative mt-6 space-y-5 pl-9">
          <div className="absolute bottom-3 left-[11px] top-2 w-px bg-[#E0E3E5]" />
          {timeline.map((step, index) => {
            const completed = Boolean(step.timestamp);
            const current =
              completed && index === currentIndex;

            return (
              <div
                key={step.label}
                className="relative min-h-10"
              >
                <div
                  className={`absolute -left-9 top-0 flex size-6 items-center justify-center rounded-full border-2 bg-white ${
                    current
                      ? "border-emerald-700"
                      : completed
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-[#E0E3E5]"
                  }`}
                >
                  {current ? (
                    <span className="size-2 rounded-full bg-emerald-700" />
                  ) : completed ? (
                    <Check className="size-3.5" />
                  ) : null}
                </div>

                <p
                  className={`text-base font-medium ${
                    current
                      ? "font-bold text-emerald-700"
                      : completed
                        ? "text-[#191C1E]"
                        : "text-[#74777D]"
                  }`}
                >
                  {step.label}
                </p>
                {step.timestamp ? (
                  <p className="mt-0.5 text-xs text-[#536069]">
                    {formatTimelineTime(step.timestamp)}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <InfoCard
          icon={Clock3}
          label="Pickup Time"
          value={`${entry.pickupSlot.startTime} - ${entry.pickupSlot.endTime}`}
        />
        <InfoCard
          icon={QrCode}
          label="Pickup Code"
          value={entry.pickupCode}
          mono
        />
      </section>

      <section className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(13,27,42,0.03)]">
        <div className="flex items-center gap-4 border-b border-[#E0E3E5] p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#D6E4EF] text-navy-steel">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#536069]">
              Student
            </p>
            <p className="mt-1 text-base font-medium text-navy-steel">
              {entry.student.name}
            </p>
            <p className="text-sm text-[#536069]">
              Class {entry.student.className}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#E0C1A0] text-[#584329]">
            <Store className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#536069]">
              Merchant
            </p>
            <p className="mt-1 text-base font-medium text-navy-steel">
              {entry.merchant.name}
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(13,27,42,0.03)]">
        <div className="border-b border-[#E0E3E5] px-5 py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
            Order Items
          </h2>
        </div>

        <div className="divide-y divide-[#E0E3E5]">
          {entry.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-5"
            >
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F6] bg-cover bg-center"
                style={
                  item.imageUrl
                    ? {
                        backgroundImage: `url(${item.imageUrl})`,
                      }
                    : undefined
                }
              >
                {!item.imageUrl ? (
                  <Utensils className="size-6 text-[#74777D]" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-base font-medium text-navy-steel">
                  {item.productName}
                </p>
              </div>
              <span className="text-base font-semibold text-navy-steel">
                x{item.quantity}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[18px] border border-arctic-blue bg-arctic-blue/40 p-4 text-sm leading-6 text-[#536069]">
        <div className="flex gap-3">
          <PackageCheck className="mt-0.5 size-5 shrink-0 text-navy-steel" />
          <p>
            Halaman Admin bersifat monitoring. Verifikasi pickup tetap dilakukan melalui workflow Merchant.
          </p>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(13,27,42,0.03)]">
      <Icon className="size-6 text-navy-steel" />
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#536069]">
        {label}
      </p>
      <p
        className={`mt-1 font-heading text-xl font-semibold text-navy-steel ${
          mono ? "font-mono tracking-[0.14em]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function OrderStatusBadge({
  status,
}: {
  status: AdminPickupOrderStatus;
}) {
  const config = {
    CONFIRMED: "bg-slate-100 text-slate-700",
    PREPARING: "bg-amber-50 text-amber-700",
    READY: "bg-emerald-50 text-emerald-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
  }[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${config}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function formatTimelineTime(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}
