import {
  Clock3,
  CookingPot,
  Package,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/shared/empty-state";

import type {
  MerchantOrderData,
} from "@/lib/api/merchant-orders";

interface MerchantProductionSummaryProps {
  orders: MerchantOrderData[];
}

export function MerchantProductionSummary({
  orders,
}: MerchantProductionSummaryProps) {
    const productionOrders = orders.filter(
    ({ order }) =>
      order.status === "CONFIRMED" ||
      order.status === "PREPARING",
  );

    const totalProductionItems =
    productionOrders.reduce(
      (total, { items }) =>
        total +
        items.reduce(
          (itemTotal, item) =>
            itemTotal +
            item.quantity,
          0,
        ),
      0,
    );

    const nearestPickupTime =
    productionOrders
      .map(
        ({ order }) =>
          order.pickupTime,
      )
      .filter(
        (
          pickupTime,
        ): pickupTime is string =>
          Boolean(pickupTime),
      )
      .sort((a, b) =>
        a.localeCompare(b),
      )[0] ?? "-";

    const productionMap = new Map<
    string,
    {
      productId: string;
      productName: string;

      totalQuantity: number;

      orderIds: Set<string>;

      pickupBreakdown: Map<
        string,
        number
      >;
    }
  >();

  for (const {
    order,
    items,
  } of productionOrders) {
    for (const item of items) {
      const existing =
        productionMap.get(
          item.productId,
        );

      const pickupTime =
        order.pickupTime ??
        "Belum tersedia";

      if (existing) {
        existing.totalQuantity +=
          item.quantity;

        existing.orderIds.add(
          order.id,
        );

        existing.pickupBreakdown.set(
          pickupTime,
          (existing.pickupBreakdown.get(
            pickupTime,
          ) ?? 0) +
            item.quantity,
        );

        continue;
      }

      productionMap.set(
        item.productId,
        {
          productId:
            item.productId,

          productName:
            item.productName,

          totalQuantity:
            item.quantity,

          orderIds: new Set([
            order.id,
          ]),

          pickupBreakdown:
            new Map([
              [
                pickupTime,
                item.quantity,
              ],
            ]),
        },
      );
    }
  }

  const productionItems = Array.from(
    productionMap.values(),
  ).sort(
    (a, b) =>
      b.totalQuantity -
      a.totalQuantity,
  );

  return (
    <>
      {}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Pesanan Produksi"
          value={
            productionOrders.length
          }
          description="Pesanan yang perlu disiapkan"
          icon={CookingPot}
        />

        <StatCard
          title="Total Item"
          value={
            totalProductionItems
          }
          description="Jumlah produk yang perlu dibuat"
          icon={Package}
        />

        <StatCard
          title="Pickup Terdekat"
          value={
            nearestPickupTime
          }
          description="Waktu pengambilan terdekat"
          icon={Clock3}
        />
      </section>

      {}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Kebutuhan Produksi
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Ringkasan produk yang
            perlu disiapkan berdasarkan
            pesanan aktif.
          </p>
        </div>

        {productionItems.length >
        0 ? (
          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            <div className="divide-y">
              {productionItems.map(
                (item) => {
                  const pickupBreakdown =
                    Array.from(
                      item.pickupBreakdown.entries(),
                    ).sort(
                      ([timeA], [
                        timeB,
                      ]) =>
                        timeA.localeCompare(
                          timeB,
                        ),
                    );

                  return (
                    <article
                      key={
                        item.productId
                      }
                      className="p-5 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        {}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <CookingPot className="size-5 text-primary" />
                            </div>

                            <div className="min-w-0">
                              <h3 className="font-semibold">
                                {
                                  item.productName
                                }
                              </h3>

                              <p className="mt-1 text-xs text-muted-foreground">
                                Dari{" "}
                                {
                                  item
                                    .orderIds
                                    .size
                                }{" "}
                                pesanan
                              </p>
                            </div>
                          </div>

                          {}
                          <div className="mt-5">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Breakdown
                              Pickup
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {pickupBreakdown.map(
                                ([
                                  time,
                                  quantity,
                                ]) => (
                                  <div
                                    key={
                                      time
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs"
                                  >
                                    <Clock3 className="size-3.5 text-muted-foreground" />

                                    <span className="font-medium">
                                      {
                                        time
                                      }
                                    </span>

                                    <span className="text-muted-foreground">
                                      •
                                    </span>

                                    <span className="text-muted-foreground">
                                      {
                                        quantity
                                      }{" "}
                                      item
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        {}
                        <div className="rounded-xl bg-muted/40 px-5 py-4 lg:min-w-40 lg:text-right">
                          <p className="text-xs text-muted-foreground">
                            Total Dibuat
                          </p>

                          <p className="mt-1 text-3xl font-semibold tracking-tight">
                            {
                              item.totalQuantity
                            }
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            item
                          </p>
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
              icon={CookingPot}
              title="Tidak ada kebutuhan produksi"
              description="Belum ada pesanan yang perlu disiapkan saat ini."
            />
          </div>
        )}
      </section>
    </>
  );
}