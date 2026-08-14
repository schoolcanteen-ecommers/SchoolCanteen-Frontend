"use client";

import {
  CircleDollarSign,
  Clock3,
  ReceiptText,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import { EmptyState } from "@/components/shared/empty-state";

import {
  ORDER_STATUS_LABEL,
  PAYMENT_STATUS_LABEL,
} from "@/lib/constants";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  Order,
  PaymentStatus,
} from "@/types/order";

interface AdminTransactionListProps {
  transactions: Array<{
    order: Order;
    customerName: string;
  }>;
}

type PaymentFilter =
  | "ALL"
  | PaymentStatus;

const PAYMENT_FILTERS: Array<{
  value: PaymentFilter;
  label: string;
}> = [
  {
    value: "ALL",
    label: "Semua",
  },
  {
    value: "HELD",
    label: "Ditahan",
  },
  {
    value: "RELEASED",
    label: "Diteruskan",
  },
  {
    value: "REFUNDED",
    label: "Dikembalikan",
  },
];

export function AdminTransactionList({
  transactions,
}: AdminTransactionListProps) {
  const [search, setSearch] =
    useState("");

  const [paymentFilter, setPaymentFilter] =
    useState<PaymentFilter>("ALL");

  const filteredTransactions =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return transactions.filter(
        ({
          order,
          customerName,
        }) => {
          const matchesSearch =
            !query ||
            order.orderCode
              .toLowerCase()
              .includes(query) ||
            customerName
              .toLowerCase()
              .includes(query);

          const matchesPayment =
            paymentFilter === "ALL" ||
            order.paymentStatus ===
              paymentFilter;

          return (
            matchesSearch &&
            matchesPayment
          );
        },
      );
    }, [
      paymentFilter,
      search,
      transactions,
    ]);

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            Daftar Transaksi
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pantau pembayaran dan status
            dana dari pesanan SchoolCanteen.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Cari kode order atau siswa..."
              className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex w-full gap-1 overflow-x-auto rounded-xl border bg-background p-1 xl:w-fit">
            {PAYMENT_FILTERS.map(
              (filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() =>
                    setPaymentFilter(
                      filter.value,
                    )
                  }
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition",

                    paymentFilter ===
                      filter.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {filter.label}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {filteredTransactions.length >
      0 ? (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
          {/* Desktop Header */}
          <div className="hidden grid-cols-[160px_minmax(180px,1fr)_150px_150px_150px_170px] gap-4 border-b bg-muted/30 px-5 py-3 text-xs font-medium text-muted-foreground lg:grid">
            <span>Order</span>
            <span>Siswa</span>
            <span>Nominal</span>
            <span>Status Order</span>
            <span>Pembayaran</span>
            <span>Waktu</span>
          </div>

          <div className="divide-y">
            {filteredTransactions.map(
              ({
                order,
                customerName,
              }) => {
                const formattedDate =
                  new Intl.DateTimeFormat(
                    "id-ID",
                    {
                      dateStyle:
                        "medium",
                      timeStyle:
                        "short",
                    },
                  ).format(
                    new Date(
                      order.createdAt,
                    ),
                  );

                return (
                  <article
                    key={order.id}
                    className="p-5"
                  >
                    {/* Desktop */}
                    <div className="hidden grid-cols-[160px_minmax(180px,1fr)_150px_150px_150px_170px] items-center gap-4 lg:grid">
                      <p className="truncate text-sm font-semibold">
                        {order.orderCode}
                      </p>

                      <p className="truncate text-sm">
                        {customerName}
                      </p>

                      <p className="text-sm font-semibold">
                        {formatCurrency(
                          order.totalPrice,
                        )}
                      </p>

                      <div>
                        <OrderStatusBadge
                          status={
                            order.status
                          }
                        />
                      </div>

                      <div>
                        <PaymentStatusBadge
                          status={
                            order.paymentStatus
                          }
                        />
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {formattedDate}
                      </p>
                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-semibold">
                            {
                              order.orderCode
                            }
                          </p>

                          <p className="mt-1 truncate text-sm text-muted-foreground">
                            {customerName}
                          </p>
                        </div>

                        <p className="shrink-0 font-semibold">
                          {formatCurrency(
                            order.totalPrice,
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <OrderStatusBadge
                          status={
                            order.status
                          }
                        />

                        <PaymentStatusBadge
                          status={
                            order.paymentStatus
                          }
                        />
                      </div>

                      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="size-3.5" />

                        {formattedDate}
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState
            icon={ReceiptText}
            title="Transaksi tidak ditemukan"
            description="Tidak ada transaksi yang sesuai dengan pencarian atau filter."
          />
        </div>
      )}
    </section>
  );
}

interface OrderStatusBadgeProps {
  status: Order["status"];
}

function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",

        status === "COMPLETED" &&
          "bg-emerald-50 text-emerald-700",

        status === "CANCELLED" &&
          "bg-red-50 text-red-700",

        status === "READY" &&
          "bg-blue-50 text-blue-700",

        [
          "WAITING",
          "CONFIRMED",
          "PREPARING",
          "PICKED_UP",
        ].includes(status) &&
          "bg-amber-50 text-amber-700",
      )}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const Icon =
    status === "RELEASED"
      ? CircleDollarSign
      : status === "REFUNDED"
        ? RotateCcw
        : Clock3;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",

        status === "HELD" &&
          "bg-amber-50 text-amber-700",

        status === "RELEASED" &&
          "bg-emerald-50 text-emerald-700",

        status === "REFUNDED" &&
          "bg-red-50 text-red-700",

        status === "PAID" &&
          "bg-blue-50 text-blue-700",

        status === "UNPAID" &&
          "bg-slate-100 text-slate-700",
      )}
    >
      <Icon className="size-3" />

      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}