import {
  Clock3,
  CreditCard,
  Package,
  UserRound,
} from "lucide-react";

import { StatusBadge } from "@/components/dashboard/status-badge";

import { PAYMENT_STATUS_LABEL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

import type {
  Order,
  OrderItem,
} from "@/types/order";

interface MerchantOrderCardProps {
  order: Order;
  customerName: string;
  items: OrderItem[];
}

export function MerchantOrderCard({
  order,
  customerName,
  items,
}: MerchantOrderCardProps) {
  const formattedDate =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    ).format(
      new Date(order.createdAt),
    );

  const totalItems =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    );

  return (
    <article className="overflow-hidden rounded-2xl border bg-background">
      {}
      <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold">
              {order.orderCode}
            </h2>

            <StatusBadge
              status={order.status}
            />
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            {formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound className="size-4" />

          <span className="font-medium text-foreground">
            {customerName}
          </span>
        </div>
      </div>

      {}
      <div className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          {}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Package className="size-4 text-primary" />

              Produk Pesanan
            </div>

            <div className="mt-4 space-y-3">
              {items.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {
                          item.productName
                        }
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {
                          item.quantity
                        }{" "}
                        ×{" "}
                        {formatCurrency(
                          item.price,
                        )}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-medium">
                      {formatCurrency(
                        item.subtotal,
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {}
          <div className="rounded-xl bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="size-4 text-primary" />

              Pengambilan
            </div>

            <p className="mt-3 text-xl font-semibold">
              {order.pickupTime ??
                "Belum tersedia"}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Waktu pengambilan
            </p>

            {order.pickupCode && (
              <div className="mt-4 border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  Kode Pickup
                </p>

                <p className="mt-1 font-mono text-sm font-semibold tracking-wider">
                  {order.pickupCode}
                </p>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="mt-6 grid gap-4 border-t pt-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">
              Total Item
            </p>

            <p className="mt-1 font-semibold">
              {totalItems} item
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CreditCard className="size-3.5" />

              Pembayaran
            </div>

            <p className="mt-1 font-semibold">
              {
                PAYMENT_STATUS_LABEL[
                  order.paymentStatus
                ]
              }
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs text-muted-foreground">
              Total Pesanan
            </p>

            <p className="mt-1 text-lg font-semibold">
              {formatCurrency(
                order.totalPrice,
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}