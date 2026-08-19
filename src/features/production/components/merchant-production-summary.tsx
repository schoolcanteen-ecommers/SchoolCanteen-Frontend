import {
<<<<<<< HEAD
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
=======
  CalendarDays,
  ClipboardList,
  Package,
} from "lucide-react";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import type {
  MerchantProductionSummaryData,
} from "@/lib/api/merchant-production";

interface MerchantProductionSummaryProps {
  data: MerchantProductionSummaryData;
}

function formatJakartaDate(
  value: Date,
) {
  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone:
        "Asia/Jakarta",
    },
  ).format(value);
}

export function MerchantProductionSummary({
  data,
}: MerchantProductionSummaryProps) {
  const snapshotDate =
    formatJakartaDate(
      new Date(),
    );

  return (
    <>
      <section className="hidden rounded-[18px] border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_rgba(13,27,42,0.04)] lg:grid lg:grid-cols-3 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]">
            Tanggal
          </p>

          <div className="mt-2 flex items-center gap-3 text-navy-steel">
            <CalendarDays className="size-5" />

            <p className="font-heading text-2xl font-bold">
              {snapshotDate}
            </p>
          </div>
        </div>

        <div className="border-l border-[#E2E8F0] pl-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]">
            Pesanan Diproses
          </p>

          <p className="mt-2 font-heading text-5xl font-bold text-navy-steel">
            {
              data.activeOrderCount
            }
          </p>
        </div>

        <div className="border-l border-[#E2E8F0] pl-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]">
            Total Dibuat
          </p>

          <p className="mt-2 font-heading text-5xl font-bold text-navy-steel">
            {
              data.totalItemCount
            }
          </p>
        </div>
      </section>

      <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_30px_rgba(13,27,42,0.04)] lg:hidden">
        <p className="text-sm font-bold uppercase tracking-[0.06em] text-[#64748B]">
          Perlu Dibuat
        </p>

        <div className="mt-5 flex items-end justify-between gap-6">
          <div>
            <p className="font-heading text-5xl font-bold leading-none text-navy-steel">
              {
                data.totalItemCount
              }
            </p>

            <p className="mt-2 text-sm font-bold uppercase tracking-[0.05em] text-[#64748B]">
              Item
            </p>
          </div>

          <div className="text-right">
            <p className="font-heading text-3xl font-bold leading-none text-navy-steel">
              {
                data.activeOrderCount
              }
            </p>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.05em] text-[#64748B]">
              Pesanan Diproses
            </p>
          </div>
        </div>
      </section>

      {data.products.length >
      0 ? (
        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:mt-8 xl:grid-cols-4">
          {data.products.map(
            (item) => (
              <article
                key={
                  item.productId ??
                  item.productName
                }
                className="relative overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_30px_rgba(13,27,42,0.04)] lg:min-h-[250px] lg:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-xl font-bold leading-tight text-navy-steel lg:text-2xl">
                    {
                      item.productName
                    }
                  </h2>

                  <span className="inline-flex shrink-0 items-center rounded-full bg-[#E6F4FF] px-3 py-1 text-xs font-semibold text-navy-steel">
                    Aktif
                  </span>
                </div>

                <div className="mt-7 flex items-baseline gap-2 lg:mt-8">
                  <span className="font-heading text-5xl font-bold leading-none text-navy-steel lg:text-6xl">
                    {
                      item.totalQuantity
                    }
                  </span>

                  <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#64748B]">
                    item
                  </span>
                </div>

                {item.modifierBreakdown.length > 0 ? (
                  <div className="mt-6 rounded-xl bg-[#F7F9FB] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#64748B]">
                      Rincian Pilihan
                    </p>

                    <div className="mt-3 space-y-4">
                      {item.modifierBreakdown.map(
                        (group) => (
                          <div
                            key={group.groupName}
                          >
                            <p className="text-xs font-bold text-navy-steel">
                              {
                                group.groupName
                              }
                            </p>

                            <div className="mt-2 space-y-1.5">
                              {group.options.map(
                                (option) => (
                                  <div
                                    key={
                                      option.optionName
                                    }
                                    className="flex items-center justify-between gap-3 text-xs"
                                  >
                                    <span className="min-w-0 truncate text-[#536069]">
                                      {
                                        option.optionName
                                      }
                                    </span>

                                    <span className="shrink-0 font-bold text-navy-steel">
                                      {
                                        option.quantity
>>>>>>> source/main
                                      }{" "}
                                      item
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
<<<<<<< HEAD
                        </div>

                        
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
=======
                        ),
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex items-center gap-2 border-t border-[#E2E8F0] pt-5 text-sm text-[#64748B]">
                  <ClipboardList className="size-4" />

                  <span>
                    Dari{" "}
                    {
                      item.orderCount
                    }{" "}
                    pesanan
                  </span>
                </div>
              </article>
            ),
          )}
        </section>
      ) : (
        <div className="mt-6 lg:mt-8">
          <EmptyState
            icon={Package}
            title="Tidak ada kebutuhan produksi"
            description="Belum ada pesanan yang perlu disiapkan saat ini."
          />
        </div>
      )}
    </>
  );
}
>>>>>>> source/main
