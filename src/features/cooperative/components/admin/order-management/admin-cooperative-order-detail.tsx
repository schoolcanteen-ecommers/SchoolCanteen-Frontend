import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleDot,
  Clock3,
  GraduationCap,
  ImageIcon,
  Package,
  Store,
} from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";
import type { AdminCooperativeOrderMonitoringItem } from "@/mocks/admin-cooperative-orders";
import type { OrderStatus, PaymentStatus } from "@/types/order";

interface AdminCooperativeOrderDetailProps {
  order: AdminCooperativeOrderMonitoringItem;
}

function getStatusLabel(status: OrderStatus) {
  switch (status) {
    case "WAITING":
      return "Waiting";
    case "CONFIRMED":
      return "Confirmed";
    case "PREPARING":
      return "Preparing";
    case "READY":
      return "Ready";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
  }
}

function orderStatusClasses(status: OrderStatus) {
  if (status === "COMPLETED") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "CANCELLED") {
    return "bg-red-50 text-red-700";
  }

  if (status === "READY") {
    return "bg-cyan-50 text-cyan-800";
  }

  if (status === "PREPARING") {
    return "bg-[#E6F4FF] text-[#0D1B2A]";
  }

  return "bg-[#FEDDBA]/60 text-[#584329]";
}

function getPaymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case "UNPAID":
      return "Unpaid";
    case "PAID":
      return "Paid";
    case "HELD":
      return "Held";
    case "RELEASED":
      return "Released";
    case "REFUNDED":
      return "Refunded";
  }
}

function paymentStatusClasses(status: PaymentStatus) {
  if (status === "RELEASED" || status === "PAID") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "REFUNDED") {
    return "bg-red-50 text-red-700";
  }

  return "bg-slate-100 text-slate-600";
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AdminCooperativeOrderDetail({
  order,
}: AdminCooperativeOrderDetailProps) {
  const timeline = [...order.timeline].reverse();
  const subtotal = order.items.reduce((total, item) => total + item.subtotal, 0);
  const hasPickupSlot = Boolean(
    order.pickup.slotLabel || order.pickup.startAt || order.pickup.endAt,
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/cooperative/orders"
          aria-label="Back to cooperative orders"
          className="flex size-10 items-center justify-center rounded-full text-[#0D1B2A] transition hover:bg-[#F2F4F6]"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-serif text-[28px] font-bold leading-8 text-[#0D1B2A]">
          Order Detail
        </h1>
      </div>

      <div className="space-y-6">
        <section className="rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                Order Code
              </p>
              <h2 className="mt-1 font-serif text-[28px] font-bold leading-9 text-[#0D1B2A]">
                {order.orderCode}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#536069]">
                <CalendarDays className="size-4" />
                {formatDateTime(order.createdAt)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
                  orderStatusClasses(order.status),
                )}
              >
                {getStatusLabel(order.status)}
              </span>
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
                  paymentStatusClasses(order.paymentStatus),
                )}
              >
                Payment {getPaymentStatusLabel(order.paymentStatus)}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-semibold text-[#191c1e]">Student Information</h3>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C4C6CC]/60 bg-[#E6F4FF] text-sm font-bold text-[#0D1B2A]">
              {order.student.avatarUrl ? (
                <img
                  src={order.student.avatarUrl}
                  alt={order.student.name}
                  className="size-full object-cover"
                />
              ) : (
                getInitials(order.student.name)
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-[#191c1e]">
                {order.student.name}
              </p>
              <p className="mt-1 text-sm text-[#536069]">
                {order.student.className} • NIS: {order.student.nis}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-semibold text-[#191c1e]">Order Items</h3>
          <div className="mt-4 divide-y divide-[#C4C6CC]/50">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F2F4F6] text-[#536069]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Package className="size-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#191c1e]">
                      {item.productName}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[#536069]">
                      {item.merchantName}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-[#191c1e]">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="mt-0.5 text-xs text-[#536069]">Qty: {item.quantity}</p>
                  <p className="mt-1 text-xs font-semibold text-[#0D1B2A]">
                    {formatCurrency(item.subtotal)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t-2 border-dashed border-[#C4C6CC]/60 pt-4">
            <div className="flex items-center justify-between text-sm text-[#536069]">
              <span>Subtotal</span>
              <span className="text-[#191c1e]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-base font-bold text-[#0D1B2A]">
              <span>Total Payment</span>
              <span>{formatCurrency(order.totalPrice)}</span>
            </div>
          </div>
        </section>

        <section className="rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-semibold text-[#191c1e]">Pickup Details</h3>
          {hasPickupSlot ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-[#D6E4EF] p-4">
                <Store className="size-5 shrink-0 text-[#0D1B2A]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#536069]">
                    Pickup Slot
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#191c1e]">
                    {order.pickup.slotLabel ?? "Belum tersedia"}
                    {order.pickup.startAt && order.pickup.endAt
                      ? ` (${order.pickup.startAt} - ${order.pickup.endAt})`
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[#F2F4F6] p-4">
                <Clock3 className="size-5 shrink-0 text-[#0D1B2A]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#536069]">
                    Pickup Code
                  </p>
                  <p className="mt-1 font-serif text-xl font-bold tracking-[0.12em] text-[#0D1B2A]">
                    {order.pickup.pickupCode ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#536069]">Pickup belum tersedia untuk order ini.</p>
          )}
        </section>

        <section className="rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-semibold text-[#191c1e]">Order Timeline</h3>
          <div className="relative mt-5 space-y-6 pl-8 before:absolute before:bottom-3 before:left-[11px] before:top-3 before:w-px before:bg-[#C4C6CC]">
            {timeline.map((event, index) => {
              const isLatest = index === 0;
              const isCompleted = event.key === "COMPLETED";
              const isCancelled = event.key === "CANCELLED";

              return (
                <div key={`${event.key}-${event.occurredAt}`} className="relative">
                  <div
                    className={cn(
                      "absolute -left-8 top-0 flex size-6 items-center justify-center rounded-full border-2 border-white",
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700"
                        : isCancelled
                          ? "bg-red-50 text-red-700"
                          : "bg-[#E6E8EA] text-[#0D1B2A]",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="size-3.5" />
                    ) : isLatest ? (
                      <CircleDot className="size-3.5" />
                    ) : (
                      <span className="size-2 rounded-full bg-current" />
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#191c1e]">{event.label}</p>
                  <p className="mt-0.5 text-xs text-[#536069]">
                    {formatDateTime(event.occurredAt)}
                  </p>
                  <p className="mt-1 text-sm text-[#536069]">{event.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3 rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-5 text-[#536069]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">Student</p>
              <p className="mt-1 text-sm font-semibold text-[#191c1e]">{order.student.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ImageIcon className="size-5 text-[#536069]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">Merchant</p>
              <p className="mt-1 text-sm font-semibold text-[#191c1e]">{order.merchantName}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
