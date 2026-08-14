import {
  Ban,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  PackageCheck,
  ReceiptText,
  RotateCcw,
  ShoppingBag,
  Store,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
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
  OrderStatus,
  PaymentStatus,
} from "@/types/order";

interface AdminReportOverviewProps {
  transactions: Array<{
    order: Order;
    customerName: string;
  }>;
}

const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "WAITING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED_UP",
  "COMPLETED",
  "CANCELLED",
];

const PAYMENT_STATUS_SEQUENCE: PaymentStatus[] = [
  "HELD",
  "RELEASED",
  "REFUNDED",
];

export function AdminReportOverview({
  transactions,
}: AdminReportOverviewProps) {
  const totalOrders =
    transactions.length;

  const totalTransactionValue =
    transactions.reduce(
      (total, { order }) =>
        total +
        order.totalPrice,
      0,
    );

  const completedOrders =
    transactions.filter(
      ({ order }) =>
        order.status === "COMPLETED",
    ).length;

  const cancelledOrders =
    transactions.filter(
      ({ order }) =>
        order.status === "CANCELLED",
    ).length;

  const orderStatusCounts =
    new Map<OrderStatus, number>();

  for (const status of ORDER_STATUS_SEQUENCE) {
    orderStatusCounts.set(
      status,
      transactions.filter(
        ({ order }) =>
          order.status === status,
      ).length,
    );
  }

  const paymentSummaries =
    PAYMENT_STATUS_SEQUENCE.map(
      (status) => {
        const matching =
          transactions.filter(
            ({ order }) =>
              order.paymentStatus ===
              status,
          );

        return {
          status,
          count: matching.length,

          amount: matching.reduce(
            (total, { order }) =>
              total +
              order.totalPrice,
            0,
          ),
        };
      },
    );

    const canteenOrders =
    transactions.filter(
      ({ order }) =>
        order.orderCode.startsWith(
          "SC-KTN-",
        ),
    );

  const cooperativeOrders =
    transactions.filter(
      ({ order }) =>
        order.orderCode.startsWith(
          "SC-KOP-",
        ),
    );

  const canteenValue =
    canteenOrders.reduce(
      (total, { order }) =>
        total +
        order.totalPrice,
      0,
    );

  const cooperativeValue =
    cooperativeOrders.reduce(
      (total, { order }) =>
        total +
        order.totalPrice,
      0,
    );

  const sortedTransactions = [
    ...transactions,
  ].sort(
    (a, b) =>
      new Date(
        b.order.createdAt,
      ).getTime() -
      new Date(
        a.order.createdAt,
      ).getTime(),
  );

  return (
    <>
      {}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Pesanan"
          value={totalOrders}
          description="Pesanan dalam laporan"
          icon={ClipboardList}
        />

        <StatCard
          title="Nilai Transaksi"
          value={formatCurrency(
            totalTransactionValue,
          )}
          description="Total nominal pesanan"
          icon={CircleDollarSign}
        />

        <StatCard
          title="Pesanan Selesai"
          value={completedOrders}
          description="Pesanan berstatus selesai"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Pesanan Dibatalkan"
          value={cancelledOrders}
          description="Pesanan yang dibatalkan"
          icon={Ban}
        />
      </section>

      {}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {}
        <section className="rounded-2xl border bg-background">
          <div className="border-b px-5 py-4 sm:px-6">
            <h2 className="font-semibold">
              Ringkasan Status Pesanan
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Distribusi pesanan berdasarkan status operasional.
            </p>
          </div>

          <div className="divide-y">
            {ORDER_STATUS_SEQUENCE.map(
              (status) => {
                const count =
                  orderStatusCounts.get(
                    status,
                  ) ?? 0;

                const percentage =
                  totalOrders > 0
                    ? Math.round(
                        (count /
                          totalOrders) *
                          100,
                      )
                    : 0;

                return (
                  <div
                    key={status}
                    className="px-5 py-4 sm:px-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">
                          {
                            ORDER_STATUS_LABEL[
                              status
                            ]
                          }
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {percentage}% dari
                          seluruh pesanan
                        </p>
                      </div>

                      <p className="text-lg font-semibold">
                        {count}
                      </p>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </section>

        {}
        <section className="rounded-2xl border bg-background">
          <div className="border-b px-5 py-4 sm:px-6">
            <h2 className="font-semibold">
              Ringkasan Pembayaran
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Rekap dana berdasarkan status pembayaran pesanan.
            </p>
          </div>

          <div className="divide-y">
            {paymentSummaries.map(
              ({
                status,
                count,
                amount,
              }) => (
                <div
                  key={status}
                  className="flex items-center gap-4 px-5 py-5 sm:px-6"
                >
                  <div
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl",

                      status === "HELD" &&
                        "bg-amber-50",

                      status ===
                        "RELEASED" &&
                        "bg-emerald-50",

                      status ===
                        "REFUNDED" &&
                        "bg-red-50",
                    )}
                  >
                    {status ===
                    "HELD" ? (
                      <Clock3 className="size-5 text-amber-700" />
                    ) : status ===
                      "RELEASED" ? (
                      <PackageCheck className="size-5 text-emerald-700" />
                    ) : (
                      <RotateCcw className="size-5 text-destructive" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {
                        PAYMENT_STATUS_LABEL[
                          status
                        ]
                      }
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {count} transaksi
                    </p>
                  </div>

                  <p className="shrink-0 font-semibold">
                    {formatCurrency(
                      amount,
                    )}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
      </div>

      {}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Ringkasan Kanal Perdagangan
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Perbandingan aktivitas kantin dan koperasi dalam data laporan.
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <Store className="size-5 text-primary" />
              </div>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                Kantin
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Pesanan
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {canteenOrders.length}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Nilai Transaksi
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatCurrency(
                    canteenValue,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <ShoppingBag className="size-5 text-primary" />
              </div>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                Koperasi
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Pesanan
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {
                    cooperativeOrders.length
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Nilai Transaksi
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatCurrency(
                    cooperativeValue,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Laporan Transaksi
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Rekap transaksi yang digunakan dalam laporan operasional.
          </p>
        </div>

        {sortedTransactions.length >
        0 ? (
          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            {}
            <div className="hidden grid-cols-[160px_minmax(180px,1fr)_130px_150px_150px] gap-4 border-b bg-muted/30 px-5 py-3 text-xs font-medium text-muted-foreground lg:grid">
              <span>Order</span>
              <span>Siswa</span>
              <span>Nominal</span>
              <span>Status</span>
              <span>Tanggal</span>
            </div>

            <div className="divide-y">
              {sortedTransactions.map(
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
                      {}
                      <div className="hidden grid-cols-[160px_minmax(180px,1fr)_130px_150px_150px] items-center gap-4 lg:grid">
                        <p className="truncate text-sm font-semibold">
                          {
                            order.orderCode
                          }
                        </p>

                        <p className="truncate text-sm">
                          {customerName}
                        </p>

                        <p className="text-sm font-semibold">
                          {formatCurrency(
                            order.totalPrice,
                          )}
                        </p>

                        <span
                          className={cn(
                            "w-fit rounded-full px-2.5 py-1 text-[11px] font-medium",

                            order.status ===
                              "COMPLETED"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status ===
                                  "CANCELLED"
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700",
                          )}
                        >
                          {
                            ORDER_STATUS_LABEL[
                              order.status
                            ]
                          }
                        </span>

                        <p className="text-sm text-muted-foreground">
                          {formattedDate}
                        </p>
                      </div>

                      {}
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

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-medium",

                              order.status ===
                                "COMPLETED"
                                ? "bg-emerald-50 text-emerald-700"
                                : order.status ===
                                    "CANCELLED"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-amber-50 text-amber-700",
                            )}
                          >
                            {
                              ORDER_STATUS_LABEL[
                                order.status
                              ]
                            }
                          </span>

                          <span className="text-xs text-muted-foreground">
                            {formattedDate}
                          </span>
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
              title="Belum ada laporan transaksi"
              description="Transaksi yang tersedia akan ditampilkan dalam laporan."
            />
          </div>
        )}
      </section>
    </>
  );
}