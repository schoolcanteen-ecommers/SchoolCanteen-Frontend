import {
  Boxes,
  Clock3,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/shared/empty-state";

import {
  ORDER_STATUS_LABEL,
} from "@/lib/constants";

import type {
  Order,
  OrderItem,
} from "@/types/order";

interface AdminCanteenProductionSummaryProps {
  orders: Array<{
    order: Order;
    customerName: string;
    items: OrderItem[];
  }>;
}

export function AdminCanteenProductionSummary({
  orders,
}: AdminCanteenProductionSummaryProps) {
  const productionOrders =
    orders.filter(
      ({ order }) =>
        order.status === "CONFIRMED" ||
        order.status === "PREPARING",
    );

  const productionMap =
    new Map<
      string,
      {
        name: string;
        quantity: number;
      }
    >();

  for (const { items } of productionOrders) {
    for (const item of items) {
      const current =
        productionMap.get(
          item.productId,
        );

      if (current) {
        current.quantity +=
          item.quantity;

        continue;
      }

      productionMap.set(
        item.productId,
        {
          name: item.productName,
          quantity: item.quantity,
        },
      );
    }
  }

  const productionItems =
    Array.from(
      productionMap.values(),
    ).sort(
      (a, b) =>
        b.quantity - a.quantity,
    );

  const totalUnits =
    productionItems.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    );

  const nearestPickup =
    productionOrders
      .map(
        ({ order }) =>
          order.pickupTime,
      )
      .filter(
        (time): time is string =>
          Boolean(time),
      )
      .sort()[0] ?? "-";

  return (
    <>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Pesanan Produksi"
          value={productionOrders.length}
          description="Confirmed dan preparing"
          icon={ShoppingCart}
        />

        <StatCard
          title="Total Item"
          value={totalUnits}
          description="Item yang perlu disiapkan"
          icon={Boxes}
        />

        <StatCard
          title="Pickup Terdekat"
          value={nearestPickup}
          description="Waktu pengambilan terdekat"
          icon={Clock3}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          Kebutuhan Produksi
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Rekap jumlah produk dari pesanan yang sedang diproses.
        </p>

        {productionItems.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {productionItems.map(
              (item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border bg-background p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <PackageCheck className="size-5 text-primary" />
                    </div>

                    <span className="text-2xl font-semibold">
                      {item.quantity}
                    </span>
                  </div>

                  <p className="mt-4 font-semibold">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Total kebutuhan produksi
                  </p>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={Boxes}
              title="Belum ada kebutuhan produksi"
              description="Pesanan yang perlu diproduksi akan tampil di sini."
            />
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          Pesanan Dalam Produksi
        </h2>

        <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
          {productionOrders.length > 0 ? (
            <div className="divide-y">
              {productionOrders.map(
                ({
                  order,
                  customerName,
                  items,
                }) => (
                  <article
                    key={order.id}
                    className="p-5 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">
                          {order.orderCode}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {customerName}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                          {
                            ORDER_STATUS_LABEL[
                              order.status
                            ]
                          }
                        </span>

                        {order.pickupTime && (
                          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">
                            Pickup{" "}
                            {order.pickupTime}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {items.map(
                        (item) => (
                          <span
                            key={item.id}
                            className="rounded-lg bg-muted/50 px-3 py-2 text-sm"
                          >
                            {item.quantity}×{" "}
                            {item.productName}
                          </span>
                        ),
                      )}
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="p-6">
              <p className="text-sm text-muted-foreground">
                Tidak ada pesanan dalam proses produksi.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}