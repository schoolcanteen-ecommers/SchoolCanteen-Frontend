import {
  CheckCircle2,
  Clock3,
  QrCode,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/shared/empty-state";

import { cn } from "@/lib/utils";

import type {
  Order,
  OrderItem,
} from "@/types/order";
import type { Pickup } from "@/types/pickup";

interface AdminCanteenPickupListProps {
  pickups: Pickup[];

  orders: Array<{
    order: Order;
    customerName: string;
    items: OrderItem[];
  }>;
}

export function AdminCanteenPickupList({
  pickups,
  orders,
}: AdminCanteenPickupListProps) {
  const orderMap = new Map(
    orders.map((entry) => [
      entry.order.id,
      entry,
    ]),
  );

  const waitingPickups =
    pickups.filter(
      (pickup) =>
        pickup.status === "WAITING",
    );

  const verifiedPickups =
    pickups.filter(
      (pickup) =>
        pickup.status === "VERIFIED",
    );

  return (
    <>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Menunggu Pickup"
          value={waitingPickups.length}
          description="Pesanan belum diambil"
          icon={Clock3}
        />

        <StatCard
          title="Sudah Diverifikasi"
          value={verifiedPickups.length}
          description="Pickup telah selesai"
          icon={CheckCircle2}
        />

        <StatCard
          title="Total Pickup"
          value={pickups.length}
          description="Data pickup terpantau"
          icon={QrCode}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          Monitoring Pickup
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Pantau status pengambilan pesanan siswa tanpa melakukan verifikasi dari akun admin.
        </p>

        {pickups.length > 0 ? (
          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            <div className="divide-y">
              {pickups.map(
                (pickup) => {
                  const entry =
                    orderMap.get(
                      pickup.orderId,
                    );

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
                      : null;

                  return (
                    <article
                      key={pickup.id}
                      className="p-5 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-start gap-4">
                          <div
                            className={cn(
                              "flex size-11 shrink-0 items-center justify-center rounded-xl",
                              pickup.status ===
                                "VERIFIED"
                                ? "bg-emerald-50"
                                : "bg-amber-50",
                            )}
                          >
                            {pickup.status ===
                            "VERIFIED" ? (
                              <CheckCircle2 className="size-5 text-emerald-700" />
                            ) : (
                              <QrCode className="size-5 text-amber-700" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold">
                              {entry?.order
                                .orderCode ??
                                pickup.orderId}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {entry?.customerName ??
                                "Siswa"}
                            </p>

                            {entry?.order
                              .pickupTime && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Jadwal pickup{" "}
                                {
                                  entry.order
                                    .pickupTime
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <div className="rounded-xl bg-muted/40 px-4 py-3">
                            <p className="text-xs text-muted-foreground">
                              Pickup Code
                            </p>

                            <p className="mt-1 font-semibold">
                              {pickup.pickupCode}
                            </p>
                          </div>

                          <div>
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",
                                pickup.status ===
                                  "VERIFIED"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700",
                              )}
                            >
                              {pickup.status ===
                              "VERIFIED"
                                ? "Terverifikasi"
                                : "Menunggu"}
                            </span>

                            {pickedAt && (
                              <p className="mt-2 text-xs text-muted-foreground">
                                {pickedAt}
                              </p>
                            )}
                          </div>
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
              icon={QrCode}
              title="Belum ada pickup"
              description="Data pengambilan pesanan akan tampil di sini."
            />
          </div>
        )}
      </section>
    </>
  );
}