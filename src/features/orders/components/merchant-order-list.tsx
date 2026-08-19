"use client";

<<<<<<< HEAD
import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ClipboardList,
=======
import { useDeferredValue, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  CookingPot,
  Hourglass,
  Loader2,
  ReceiptText,
  Search,
>>>>>>> source/main
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

<<<<<<< HEAD
import { MerchantOrderCard } from "@/features/orders/components/merchant-order-card";
import { OrderStatusTabs } from "@/features/orders/components/order-status-tabs";

import { authenticatedApiRequest } from "@/lib/api/authenticated-client";

import type {
  MerchantOrderData,
} from "@/lib/api/merchant-orders";

import type {
  OrderStatus,
} from "@/types/order";
=======
import { authenticatedApiRequest } from "@/lib/api/authenticated-client";
import type { MerchantOrderData } from "@/lib/api/merchant-orders";
import { cn, formatCurrency } from "@/lib/utils";

import type { OrderStatus } from "@/types/order";
>>>>>>> source/main

interface MerchantOrderListProps {
  orders: MerchantOrderData[];
}

<<<<<<< HEAD
export function MerchantOrderList({
  orders,
}: MerchantOrderListProps) {
  const router =
    useRouter();

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<
    "ALL" | OrderStatus
  >("ALL");

  const [
    updatingOrderId,
    setUpdatingOrderId,
  ] = useState<string | null>(
    null,
  );

  const [
    updateError,
    setUpdateError,
  ] = useState<string | null>(
    null,
  );

  const filteredOrders =
    useMemo(() => {
      if (
        selectedStatus === "ALL"
      ) {
        return orders;
      }

      return orders.filter(
        ({ order }) =>
          order.status ===
          selectedStatus,
      );
    }, [
      orders,
      selectedStatus,
    ]);
=======
type StatusFilter = "ALL" | OrderStatus;

const STATUS_FILTERS: Array<{
  value: StatusFilter;
  label: string;
}> = [
  { value: "ALL", label: "Semua" },
  { value: "WAITING", label: "Menunggu" },
  { value: "CONFIRMED", label: "Dikonfirmasi" },
  { value: "PREPARING", label: "Disiapkan" },
  { value: "READY", label: "Siap" },
  { value: "COMPLETED", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  WAITING: "MENUNGGU",
  CONFIRMED: "DIKONFIRMASI",
  PREPARING: "DISIAPKAN",
  READY: "READY",
  COMPLETED: "SELESAI",
  CANCELLED: "DIBATALKAN",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  WAITING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-orange-100 text-orange-800",
  READY: "bg-emerald-100 text-emerald-800",
  COMPLETED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  WAITING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "READY",
};

const ACTION_LABELS: Partial<Record<OrderStatus, string>> = {
  WAITING: "Konfirmasi Pesanan",
  CONFIRMED: "Mulai Siapkan",
  PREPARING: "Tandai Siap Diambil",
};

export function MerchantOrderList({
  orders,
}: MerchantOrderListProps) {
  const router = useRouter();

  const [
    ,
    startRefreshTransition,
  ] = useTransition();

  const [
    statusOverrides,
    setStatusOverrides,
  ] = useState<
    Record<string, OrderStatus>
  >({});

  const [selectedStatus, setSelectedStatus] =
    useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");

  const deferredSearch =
    useDeferredValue(
      search,
    );
  const [updatingOrderId, setUpdatingOrderId] =
    useState<string | null>(null);
  const [updateError, setUpdateError] =
    useState<string | null>(null);

  const visibleOrders = useMemo(
    () =>
      orders.map((entry) => {
        const override =
          statusOverrides[
            entry.order.id
          ];

        if (!override) {
          return entry;
        }

        return {
          ...entry,

          order: {
            ...entry.order,
            status:
              override,
          },
        };
      }),
    [
      orders,
      statusOverrides,
    ],
  );

  const sortedOrders = useMemo(
    () =>
      [...visibleOrders].sort(
        (a, b) =>
          new Date(b.order.createdAt).getTime() -
          new Date(a.order.createdAt).getTime(),
      ),
    [visibleOrders],
  );

  const summary = useMemo(
    () => ({
      all: visibleOrders.length,
      waiting: visibleOrders.filter(
        ({ order }) => order.status === "WAITING",
      ).length,
      preparing: visibleOrders.filter(
        ({ order }) => order.status === "PREPARING",
      ).length,
      ready: visibleOrders.filter(
        ({ order }) => order.status === "READY",
      ).length,
    }),
    [visibleOrders],
  );

  const filteredOrders = useMemo(() => {
    const normalizedSearch = deferredSearch
      .trim()
      .toLocaleLowerCase("id-ID");

    return sortedOrders.filter(
      ({ order, customerName }) => {
        const matchesStatus =
          selectedStatus === "ALL" ||
          order.status === selectedStatus;

        if (!matchesStatus) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        return (
          order.orderCode
            .toLocaleLowerCase("id-ID")
            .includes(normalizedSearch) ||
          customerName
            .toLocaleLowerCase("id-ID")
            .includes(normalizedSearch)
        );
      },
    );
  }, [
    deferredSearch,
    selectedStatus,
    sortedOrders,
  ]);
>>>>>>> source/main

  async function handleAdvanceStatus(
    orderId: string,
    nextStatus: OrderStatus,
  ) {
<<<<<<< HEAD
    setUpdateError(null);
=======
    const currentStatus =
      visibleOrders.find(
        (entry) =>
          entry.order.id ===
          orderId,
      )?.order.status;

    setUpdateError(
      null,
    );

>>>>>>> source/main
    setUpdatingOrderId(
      orderId,
    );

<<<<<<< HEAD
=======
    /*
     * Optimistic UI:
     * merchant langsung melihat status
     * berikutnya tanpa menunggu RSC
     * refresh selesai.
     */
    setStatusOverrides(
      (current) => ({
        ...current,
        [orderId]:
          nextStatus,
      }),
    );

>>>>>>> source/main
    try {
      await authenticatedApiRequest(
        `/merchant/orders/${orderId}/status`,
        {
          method: "PATCH",
<<<<<<< HEAD

          body: {
            status:
              nextStatus.toLowerCase(),
=======
          body: {
            status: nextStatus.toLowerCase(),
>>>>>>> source/main
          },
        },
      );

<<<<<<< HEAD
      router.refresh();
    } catch (error) {
=======
      startRefreshTransition(
        () => {
          router.refresh();
        },
      );
    } catch (error) {
      setStatusOverrides(
        (current) => {
          const next = {
            ...current,
          };

          if (currentStatus) {
            next[orderId] =
              currentStatus;
          } else {
            delete next[
              orderId
            ];
          }

          return next;
        },
      );

>>>>>>> source/main
      setUpdateError(
        error instanceof Error
          ? error.message
          : "Status pesanan gagal diperbarui.",
      );
    } finally {
<<<<<<< HEAD
      setUpdatingOrderId(
        null,
      );
=======
      setUpdatingOrderId(null);
>>>>>>> source/main
    }
  }

  return (
    <>
<<<<<<< HEAD
      <div className="mt-7">
        <OrderStatusTabs
          value={
            selectedStatus
          }
          onChange={
            setSelectedStatus
          }
        />
      </div>

      {updateError ? (
        <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">
            Status pesanan gagal diperbarui
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
=======
      <section className="mb-6 lg:mb-8">
        <h1 className="font-heading text-[28px] font-bold leading-tight tracking-[-0.03em] text-navy-steel lg:text-[32px]">
          Kelola Pesanan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground lg:text-base">
          Lihat pesanan masuk dan selesaikan satu per satu sampai siap diambil.
        </p>
      </section>

      <section className="-mx-4 mb-7 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        <SummaryCard
          label="Semua Pesanan"
          mobileLabel="Semua"
          value={summary.all}
          icon={ReceiptText}
          active
        />
        <SummaryCard
          label="Menunggu"
          value={summary.waiting}
          icon={Hourglass}
          tone="waiting"
        />
        <SummaryCard
          label="Sedang Disiapkan"
          mobileLabel="Disiapkan"
          value={summary.preparing}
          icon={CookingPot}
          tone="preparing"
        />
        <SummaryCard
          label="Siap Diambil"
          mobileLabel="Ready"
          value={summary.ready}
          icon={CheckCircle2}
          tone="ready"
        />
      </section>

      {updateError ? (
        <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-semibold text-rose-700">
            Status pesanan gagal diperbarui
          </p>
          <p className="mt-1 text-sm text-rose-600">
>>>>>>> source/main
            {updateError}
          </p>
        </div>
      ) : null}

<<<<<<< HEAD
      {filteredOrders.length >
      0 ? (
        <div className="mt-5 space-y-4">
          {filteredOrders.map(
            ({
              order,
              customerName,
              items,
            }) => (
              <MerchantOrderCard
                key={order.id}
                order={order}
                customerName={
                  customerName
                }
                items={items}
                isUpdating={
                  updatingOrderId ===
                  order.id
                }
                onAdvanceStatus={
                  handleAdvanceStatus
                }
              />
            ),
          )}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={ClipboardList}
            title="Tidak ada pesanan"
            description="Tidak ada pesanan dengan status yang dipilih."
          />
        </div>
      )}
    </>
  );
}
=======
      <section className="overflow-hidden rounded-[18px] border border-navy-steel/15 bg-white shadow-[0_4px_20px_rgba(13,27,42,0.04)]">
        <div className="sticky top-[72px] z-20 border-b border-navy-steel/10 bg-[#F8F9FF]/95 p-4 backdrop-blur lg:static lg:flex lg:items-center lg:justify-between lg:gap-4 lg:bg-white lg:backdrop-blur-none">
          <label className="relative block w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kode pesanan atau nama siswa"
              className="h-12 w-full rounded-xl border border-[#D7E0E6] bg-white pl-10 pr-4 text-sm font-medium text-navy-steel outline-none transition focus:border-navy-steel focus:ring-4 focus:ring-arctic-blue/70"
            />
          </label>

          <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:mt-0 lg:justify-end lg:px-0 lg:pb-0">
            {STATUS_FILTERS.map((filter) => {
              const isActive = selectedStatus === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setSelectedStatus(filter.value)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition active:scale-[0.98]",
                    isActive
                      ? "border-navy-steel bg-navy-steel text-white"
                      : "border-navy-steel/15 bg-white text-muted-foreground hover:bg-arctic-blue/40 hover:text-navy-steel",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead className="border-b border-navy-steel/10 bg-[#F8F9FF]">
                  <tr className="text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground">
                    <th className="px-4 py-3">Kode Pesanan</th>
                    <th className="px-4 py-3">Siswa</th>
                    <th className="w-[30%] px-4 py-3">Item</th>
                    <th className="px-4 py-3">Waktu Ambil</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-steel/10">
                  {filteredOrders.map((entry) => (
                    <DesktopOrderRow
                      key={entry.order.id}
                      entry={entry}
                      isUpdating={updatingOrderId === entry.order.id}
                      onAdvanceStatus={handleAdvanceStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 bg-[#F8F9FF] p-4 lg:hidden">
              {filteredOrders.map((entry) => (
                <MobileOrderCard
                  key={entry.order.id}
                  entry={entry}
                  isUpdating={updatingOrderId === entry.order.id}
                  onAdvanceStatus={handleAdvanceStatus}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="p-6 lg:p-10">
            <EmptyState
              icon={ClipboardList}
              title="Tidak ada pesanan"
              description="Tidak ada pesanan yang cocok dengan pencarian atau status yang dipilih."
            />
          </div>
        )}
      </section>
    </>
  );
}

function SummaryCard({
  label,
  mobileLabel,
  value,
  icon: Icon,
  tone = "default",
  active = false,
}: {
  label: string;
  mobileLabel?: string;
  value: number;
  icon: LucideIcon;
  tone?: "default" | "waiting" | "preparing" | "ready";
  active?: boolean;
}) {
  const iconStyle = {
    default: "bg-[#EFF4FF] text-navy-steel",
    waiting: "bg-amber-100 text-amber-700",
    preparing: "bg-orange-100 text-orange-700",
    ready: "bg-emerald-100 text-emerald-700",
  }[tone];

  return (
    <article
      className={cn(
        "min-w-[132px] snap-start rounded-[18px] border p-4 shadow-[0_4px_20px_rgba(13,27,42,0.04)] lg:min-w-0 lg:p-6",
        active
          ? "border-navy-steel bg-navy-steel text-white lg:border-navy-steel/15 lg:bg-white lg:text-navy-steel"
          : "border-navy-steel/15 bg-white text-navy-steel",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.05em]",
              active
                ? "text-white/75 lg:text-muted-foreground"
                : "text-muted-foreground",
            )}
          >
            <span className="lg:hidden">{mobileLabel ?? label}</span>
            <span className="hidden lg:inline">{label}</span>
          </p>
          <p className="mt-4 font-heading text-3xl font-bold lg:text-[40px] lg:leading-none">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "hidden size-12 shrink-0 items-center justify-center rounded-full lg:flex",
            iconStyle,
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </article>
  );
}

function DesktopOrderRow({
  entry,
  isUpdating,
  onAdvanceStatus,
}: {
  entry: MerchantOrderData;
  isUpdating: boolean;
  onAdvanceStatus: (orderId: string, nextStatus: OrderStatus) => void;
}) {
  const { order, customerName, items, pickupEndTime } = entry;
  const initials = getInitials(customerName);
  const pickupRange = formatPickupRange(order.pickupTime ?? null, pickupEndTime ?? null);

  return (
    <tr className="bg-white transition-colors hover:bg-[#EFF4FF]/60">
      <td className="px-4 py-4 text-sm font-bold text-navy-steel">
        <Link
          href={`/merchant/orders/${encodeURIComponent(
            order.id,
          )}`}
          className="transition hover:underline"
        >
          {order.orderCode}
        </Link>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D3E4FE] text-xs font-bold text-navy-steel">
            {initials}
          </span>
          <span className="text-sm text-navy-steel">{customerName}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <OrderItemsInfo
          items={items}
        />
      </td>
      <td className="px-4 py-4 text-sm text-navy-steel">{pickupRange}</td>
      <td className="px-4 py-4 text-right text-sm font-bold text-navy-steel">
        {formatCurrency(order.totalPrice)}
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-4 py-4 text-right">
        <OrderAction
          orderId={order.id}
          status={order.status}
          isUpdating={isUpdating}
          onAdvanceStatus={onAdvanceStatus}
          compact
        />
      </td>
    </tr>
  );
}

function MobileOrderCard({
  entry,
  isUpdating,
  onAdvanceStatus,
}: {
  entry: MerchantOrderData;
  isUpdating: boolean;
  onAdvanceStatus: (orderId: string, nextStatus: OrderStatus) => void;
}) {
  const { order, customerName, items, pickupEndTime } = entry;
  const pickupRange = formatPickupRange(order.pickupTime ?? null, pickupEndTime ?? null);

  return (
    <article
      className={cn(
        "rounded-[18px] border border-navy-steel/15 bg-white p-5 shadow-[0_4px_20px_rgba(13,27,42,0.04)]",
        order.status === "COMPLETED" || order.status === "CANCELLED"
          ? "opacity-75"
          : "",
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-navy-steel/10 pb-3">
        <div className="min-w-0">
          <Link
            href={`/merchant/orders/${encodeURIComponent(
              order.id,
            )}`}
            className="text-xs font-bold text-muted-foreground transition hover:text-navy-steel hover:underline"
          >
            #{order.orderCode}
          </Link>
          <h2 className="mt-1 truncate text-xl font-semibold text-navy-steel">
            {customerName}
          </h2>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="my-4 space-y-2">
        {items.map((item) => (
          <OrderItemInfo
            key={item.id}
            item={item}
            showSubtotal
          />
        ))}
      </div>

      <div className="mb-5 flex items-center justify-between gap-3 rounded-[10px] border border-navy-steel/15 bg-[#F8F9FF] p-3">
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <Clock3 className="size-4 shrink-0" />
          <span className="truncate text-xs font-bold">
            Pickup: {pickupRange}
          </span>
        </div>
        <span className="shrink-0 text-xl font-bold text-navy-steel">
          {formatCurrency(order.totalPrice)}
        </span>
      </div>

      <div className="space-y-2">
        <Link
          href={`/merchant/orders/${encodeURIComponent(
            order.id,
          )}`}
          className="flex min-h-11 w-full items-center justify-center rounded-[10px] border border-navy-steel/20 text-sm font-bold text-navy-steel transition hover:bg-arctic-blue/40"
        >
          Lihat Detail
        </Link>

        <OrderAction
          orderId={order.id}
          status={order.status}
          isUpdating={isUpdating}
          onAdvanceStatus={onAdvanceStatus}
        />
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.04em]",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function OrderAction({
  orderId,
  status,
  isUpdating,
  onAdvanceStatus,
  compact = false,
}: {
  orderId: string;
  status: OrderStatus;
  isUpdating: boolean;
  onAdvanceStatus: (orderId: string, nextStatus: OrderStatus) => void;
  compact?: boolean;
}) {
  if (status === "READY") {
    return (
      <div
        className={cn(
          "rounded-[10px] bg-slate-100 text-center font-bold text-slate-500",
          compact ? "inline-flex px-4 py-2 text-xs" : "w-full py-4 text-base",
        )}
      >
        Menunggu Pickup
      </div>
    );
  }

  if (status === "COMPLETED" || status === "CANCELLED") {
    return null;
  }

  const nextStatus = NEXT_STATUS[status];
  const actionLabel = ACTION_LABELS[status];

  if (!nextStatus || !actionLabel) {
    return null;
  }

  const isPrimary = status === "WAITING";

  return (
    <button
      type="button"
      disabled={isUpdating}
      onClick={() => onAdvanceStatus(orderId, nextStatus)}
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] border font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        compact ? "px-4 py-2 text-xs" : "w-full py-4 text-base",
        isPrimary
          ? "border-navy-steel bg-navy-steel text-white hover:bg-[#16283D]"
          : "border-navy-steel bg-arctic-blue text-navy-steel hover:bg-[#D6EAF8]",
      )}
    >
      {isUpdating ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Memproses...
        </>
      ) : (
        actionLabel
      )}
    </button>
  );
}

function formatPickupRange(
  startTime: string | null,
  endTime: string | null,
) {
  if (!startTime) {
    return "Belum tersedia";
  }

  return endTime ? `${startTime} - ${endTime}` : startTime;
}

function OrderItemsInfo({
  items,
}: {
  items: MerchantOrderData["items"];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <OrderItemInfo
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

function OrderItemInfo({
  item,
  showSubtotal = false,
}: {
  item: MerchantOrderData["items"][number];
  showSubtotal?: boolean;
}) {
  const hasNotes =
    Boolean(
      item.notes?.trim(),
    );

  return (
    <div className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold text-navy-steel">
          {item.productName}{" "}
          <span className="font-medium text-[#64748B]">
            x{item.quantity}
          </span>
        </p>

        {showSubtotal ? (
          <span className="shrink-0 text-sm font-semibold text-navy-steel">
            {formatCurrency(
              item.subtotal,
            )}
          </span>
        ) : null}
      </div>

      {(item.modifiers ?? []).length > 0 ? (
        <div className="mt-1.5 space-y-1">
          {(item.modifiers ?? []).map(
            (modifier) => (
              <p
                key={
                  modifier.id
                }
                className="text-xs leading-5 text-[#536069]"
              >
                <span className="font-semibold text-[#334155]">
                  {modifier.groupName}:
                </span>{" "}
                {modifier.optionName}
              </p>
            ),
          )}
        </div>
      ) : null}

      {hasNotes ? (
        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-amber-800">
            Catatan
          </p>

          <p className="mt-0.5 text-xs leading-5 text-amber-900">
            {item.notes}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
>>>>>>> source/main
