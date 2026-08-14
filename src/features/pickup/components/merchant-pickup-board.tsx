import {
  CheckCircle2,
  Clock3,
  Hash,
  Package,
  PackageCheck,
  QrCode,
  UserRound,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EmptyState } from "@/components/shared/empty-state";

import { formatCurrency } from "@/lib/utils";

import type {
  Order,
  OrderItem,
} from "@/types/order";

import type {
  Pickup,
} from "@/types/pickup";

interface MerchantPickupBoardProps {
  orders: Array<{
    order: Order;
    customerName: string;
    items: OrderItem[];
  }>;

  pickups: Pickup[];
}

export function MerchantPickupBoard({
  orders,
  pickups,
}: MerchantPickupBoardProps) {
    const pickupEntries = pickups.flatMap(
    (pickup) => {
      const orderData = orders.find(
        ({ order }) =>
          order.id === pickup.orderId,
      );

      if (!orderData) {
        return [];
      }

      return [
        {
          pickup,
          ...orderData,
        },
      ];
    },
  );

    const waitingPickups =
    pickupEntries.filter(
      ({ pickup, order }) =>
        pickup.status === "WAITING" &&
        order.status === "READY",
    );

  const verifiedPickups =
    pickupEntries.filter(
      ({ pickup }) =>
        pickup.status === "VERIFIED",
    );

  const nearestPickupTime =
    waitingPickups
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

  return (
    <>
      {/* Statistics */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Menunggu Pickup"
          value={waitingPickups.length}
          description="Pesanan siap diserahkan"
          icon={PackageCheck}
        />

        <StatCard
          title="Sudah Diverifikasi"
          value={verifiedPickups.length}
          description="Pickup yang telah diverifikasi"
          icon={CheckCircle2}
        />

        <StatCard
          title="Pickup Terdekat"
          value={nearestPickupTime}
          description="Waktu pengambilan terdekat"
          icon={Clock3}
        />
      </section>

      {/* Waiting Pickup */}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Menunggu Pengambilan
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pesanan yang sudah siap dan
            menunggu diverifikasi saat
            siswa mengambil pesanan.
          </p>
        </div>

        {waitingPickups.length > 0 ? (
          <div className="mt-4 space-y-4">
            {waitingPickups.map(
              ({
                pickup,
                order,
                customerName,
                items,
              }) => {
                const totalItems =
                  items.reduce(
                    (
                      total,
                      item,
                    ) =>
                      total +
                      item.quantity,
                    0,
                  );

                return (
                  <article
                    key={pickup.id}
                    className="overflow-hidden rounded-2xl border bg-background"
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">
                            {
                              order.orderCode
                            }
                          </h3>

                          <StatusBadge
                            status={
                              order.status
                            }
                          />
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <UserRound className="size-4" />

                          <span>
                            {
                              customerName
                            }
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock3 className="size-4 text-primary" />

                        <span className="text-muted-foreground">
                          Pickup
                        </span>

                        <span className="font-semibold">
                          {order.pickupTime ??
                            "-"}
                        </span>
                      </div>
                    </div>

                    {/* Main */}
                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                      {/* Order Items */}
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Package className="size-4 text-primary" />

                          Detail Pesanan
                        </div>

                        <div className="mt-4 space-y-3">
                          {items.map(
                            (item) => (
                              <div
                                key={
                                  item.id
                                }
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

                        <div className="mt-5 flex items-end justify-between gap-4 border-t pt-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Total Item
                            </p>

                            <p className="mt-1 font-semibold">
                              {
                                totalItems
                              }{" "}
                              item
                            </p>
                          </div>

                          <div className="text-right">
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

                      {/* Verification Area */}
                      <div className="rounded-2xl border bg-muted/20 p-5">
                        <div className="flex items-center gap-2">
                          <QrCode className="size-5 text-primary" />

                          <h4 className="font-semibold">
                            Verifikasi Pickup
                          </h4>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                          Cocokkan kode pickup
                          yang ditunjukkan siswa
                          sebelum menyerahkan
                          pesanan.
                        </p>

                        <div className="mt-5 rounded-xl border border-dashed bg-background p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Hash className="size-3.5" />

                            Kode Pickup
                          </div>

                          <p className="mt-2 font-mono text-2xl font-semibold tracking-[0.2em]">
                            {
                              pickup.pickupCode
                            }
                          </p>
                        </div>

                        <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-700">
                          Menunggu verifikasi
                          pengambilan
                        </div>

                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          Verifikasi QR dan
                          perubahan status akan
                          diaktifkan setelah API
                          pickup terhubung.
                        </p>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={PackageCheck}
              title="Tidak ada pesanan menunggu pickup"
              description="Pesanan yang sudah siap diambil akan tampil di sini."
            />
          </div>
        )}
      </section>

      {/* Verified Pickup */}
      {verifiedPickups.length > 0 && (
        <section className="mt-8">
          <div>
            <h2 className="text-lg font-semibold">
              Sudah Diverifikasi
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pengambilan pesanan yang
              sudah berhasil diverifikasi.
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            <div className="divide-y">
              {verifiedPickups.map(
                ({
                  pickup,
                  order,
                  customerName,
                }) => {
                  const pickedAt =
                    pickup.pickedAt
                      ? new Intl.DateTimeFormat(
                          "id-ID",
                          {
                            dateStyle:
                              "medium",
                            timeStyle:
                              "short",
                          },
                        ).format(
                          new Date(
                            pickup.pickedAt,
                          ),
                        )
                      : "-";

                  return (
                    <div
                      key={pickup.id}
                      className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                          <CheckCircle2 className="size-5 text-emerald-700" />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {
                              order.orderCode
                            }
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {
                              customerName
                            }
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm font-medium text-emerald-700">
                          Terverifikasi
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {pickedAt}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}