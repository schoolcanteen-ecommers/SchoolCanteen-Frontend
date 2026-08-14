import {
  ClipboardList,
  Clock3,
  Package,
} from "lucide-react";

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
  OrderItem,
} from "@/types/order";

interface AdminCooperativeOrderListProps {
  orders: Array<{
    order: Order;
    merchantName: string;
    items: OrderItem[];
  }>;
}

export function AdminCooperativeOrderList({
  orders,
}: AdminCooperativeOrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada pesanan koperasi"
          description="Pesanan koperasi akan tampil di sini."
        />
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div>
        <h2 className="text-lg font-semibold">
          Daftar Pesanan
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Pantau pesanan dan transaksi produk koperasi.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {orders.map(
          ({
            order,
            merchantName,
            items,
          }) => {
            const formattedDate =
              new Intl.DateTimeFormat(
                "id-ID",
                {
                  dateStyle: "medium",
                  timeStyle: "short",
                },
              ).format(
                new Date(
                  order.createdAt,
                ),
              );

            return (
              <article
                key={order.id}
                className="rounded-2xl border bg-background p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">
                      {order.orderCode}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {merchantName}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 className="size-3.5" />

                      {formattedDate}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
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

                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium",

                        order.paymentStatus ===
                          "RELEASED"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.paymentStatus ===
                              "REFUNDED"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700",
                      )}
                    >
                      {
                        PAYMENT_STATUS_LABEL[
                          order.paymentStatus
                        ]
                      }
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t pt-5">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Package className="size-4 text-muted-foreground" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {item.productName}
                            </p>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {item.quantity} ×{" "}
                              {formatCurrency(
                                item.price,
                              )}
                            </p>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-semibold">
                          {formatCurrency(
                            item.subtotal,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      Total Pesanan
                    </p>

                    <p className="text-lg font-semibold">
                      {formatCurrency(
                        order.totalPrice,
                      )}
                    </p>
                  </div>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}