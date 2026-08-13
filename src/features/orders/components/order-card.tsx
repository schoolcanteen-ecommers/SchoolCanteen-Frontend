import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/lib/constants";

import { Clock3, Package, Store } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/status-badge";

import { formatCurrency } from "@/lib/utils";

import type { Order, OrderItem } from "@/types/order";

interface OrderCardProps {
  order: Order;
  merchantName: string;
  items: OrderItem[];
}

export function OrderCard({ order, merchantName, items }: OrderCardProps) {
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(order.createdAt));

  return (
    <article className="overflow-hidden rounded-2xl border bg-background">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Store className="size-5 text-primary" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold">{merchantName}</p>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{order.orderCode}</span>

              <span>•</span>

              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <StatusBadge status={order.status} />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_200px]">
          {/* Items */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Package className="size-4 text-primary" />
              Produk
            </div>

            <div className="mt-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="min-w-0 truncate">{item.productName}</span>

                  <span className="shrink-0 text-muted-foreground">
                    {item.quantity} × {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pickup */}
          <div className="rounded-xl bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock3 className="size-4 text-primary" />
              Pengambilan
            </div>

            {order.pickupTime ? (
              <>
                <p className="mt-2 text-lg font-semibold">{order.pickupTime}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Waktu pengambilan pesanan
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Tidak tersedia
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total Pesanan</p>

            <p className="mt-1 text-lg font-semibold">
              {formatCurrency(order.totalPrice)}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {items.reduce((total, item) => total + item.quantity, 0)} item
            </p>
          </div>

          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href={`${ROUTES.STUDENT.ORDERS}/${order.id}`} />}
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </article>
  );
}
