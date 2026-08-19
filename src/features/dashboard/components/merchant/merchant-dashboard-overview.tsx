import Link from "next/link";

import {
  ArrowRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  CookingPot,
  PackageCheck,
  PackagePlus,
  QrCode,
  ShoppingCart,
} from "lucide-react";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import {
  MerchantDashboardRefresh,
} from "@/features/dashboard/components/merchant/merchant-dashboard-refresh";

import type {
  MerchantWalletData,
} from "@/lib/api/merchant-finance";

import type {
  MerchantOrderData,
} from "@/lib/api/merchant-orders";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  OrderStatus,
} from "@/types/order";

interface MerchantDashboardOverviewProps {
  wallet: MerchantWalletData;

  todayOrders:
    MerchantOrderData[];

  allOrders:
    MerchantOrderData[];
}

interface ProductionItem {
  key: string;

  productName: string;

  quantity: number;
}

function merchantTypeLabel(
  type: string,
) {
  const normalized =
    type
      .trim()
      .toUpperCase();

  if (
    normalized === "CANTEEN"
  ) {
    return "Kantin Sekolah";
  }

  if (
    normalized ===
    "COOPERATIVE"
  ) {
    return "Koperasi Sekolah";
  }

  return "Merchant SchoolCanteen";
}

function statusLabel(
  status: OrderStatus,
) {
  const labels: Record<
    OrderStatus,
    string
  > = {
    WAITING:
      "Menunggu",

    CONFIRMED:
      "Dikonfirmasi",

    PREPARING:
      "Disiapkan",

    READY:
      "Siap",

    COMPLETED:
      "Selesai",

    CANCELLED:
      "Dibatalkan",
  };

  return labels[
    status
  ];
}

function statusBadgeClasses(
  status: OrderStatus,
) {
  const classes: Record<
    OrderStatus,
    string
  > = {
    WAITING:
      "bg-[#FFF4E5] text-[#A45108]",

    CONFIRMED:
      "bg-[#EAF3FF] text-[#245EA8]",

    PREPARING:
      "bg-[#FFF6E2] text-[#A85B00]",

    READY:
      "bg-[#EAF8F1] text-[#087853]",

    COMPLETED:
      "bg-[#F1F5F7] text-[#52616D]",

    CANCELLED:
      "bg-[#FFF0F0] text-[#B42318]",
  };

  return classes[
    status
  ];
}

function summarizeItems(
  entry:
    MerchantOrderData,
) {
  if (
    entry.items.length ===
    0
  ) {
    return "Item belum tersedia";
  }

  return entry.items
    .map(
      (item) =>
        `${item.quantity}× ${item.productName}`,
    )
    .join(", ");
}

function buildProductionItems(
  orders:
    MerchantOrderData[],
): ProductionItem[] {
  const production =
    new Map<
      string,
      ProductionItem
    >();

  for (
    const {
      order,
      items,
    } of orders
  ) {
    if (
      order.status !==
        "CONFIRMED" &&
      order.status !==
        "PREPARING"
    ) {
      continue;
    }

    for (
      const item of
      items
    ) {
      const key =
        item.productId ||
        item.productName;

      const current =
        production.get(
          key,
        );

      if (
        current
      ) {
        current.quantity +=
          item.quantity;

        continue;
      }

      production.set(
        key,
        {
          key,

          productName:
            item.productName,

          quantity:
            item.quantity,
        },
      );
    }
  }

  return Array.from(
    production.values(),
  )
    .sort(
      (
        first,
        second,
      ) =>
        second.quantity -
        first.quantity,
    )
    .slice(
      0,
      4,
    );
}

export function MerchantDashboardOverview({
  wallet,
  todayOrders,
  allOrders,
}: MerchantDashboardOverviewProps) {
  const waiting =
    todayOrders.filter(
      ({
        order,
      }) =>
        order.status ===
        "WAITING",
    ).length;

  const confirmed =
    todayOrders.filter(
      ({
        order,
      }) =>
        order.status ===
        "CONFIRMED",
    ).length;

  const preparing =
    todayOrders.filter(
      ({
        order,
      }) =>
        order.status ===
        "PREPARING",
    ).length;

  const ready =
    todayOrders.filter(
      ({
        order,
      }) =>
        order.status ===
        "READY",
    ).length;

  const needsAction =
    waiting +
    confirmed;

  const recentOrders = [
    ...todayOrders,
  ]
    .sort(
      (
        first,
        second,
      ) =>
        new Date(
          second.order.createdAt,
        ).getTime() -
        new Date(
          first.order.createdAt,
        ).getTime(),
    )
    .slice(
      0,
      4,
    );

  const productionItems =
    buildProductionItems(
      allOrders,
    );

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-5 sm:px-6 lg:px-10 lg:py-10">
      {/* =====================================================
          PAGE INTRO
      ====================================================== */}

      <section className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center rounded-full bg-[#EAF3F8] px-3 py-1 text-[11px] font-bold text-[#476170]">
            {merchantTypeLabel(
              wallet.merchantType,
            )}
          </span>

          <h1 className="mt-3 truncate font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.035em] text-navy-steel sm:text-[32px]">
            {
              wallet.merchantName
            }
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#64717B] sm:text-[15px]">
            Pantau dan selesaikan
            pekerjaan kantin hari ini
            dari satu tempat.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <p className="text-sm text-[#73808A]">
            Data terbaru
          </p>

          <MerchantDashboardRefresh />
        </div>
      </section>

      {/* =====================================================
          PRIMARY ACTION
      ====================================================== */}

      <section className="mt-6">
        {needsAction >
        0 ? (
          <Link
            href="/merchant/orders"
            prefetch={
              false
            }
            className="group block overflow-hidden rounded-[24px] bg-navy-steel px-5 py-5 text-white shadow-[0_12px_32px_rgba(13,27,42,0.14)] transition-transform active:scale-[0.99] sm:px-6 sm:py-6"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white/90">
                  Perlu tindakan
                </span>

                <div className="mt-5 flex items-end gap-3">
                  <p className="font-heading text-[48px] font-bold leading-none tracking-[-0.04em]">
                    {
                      needsAction
                    }
                  </p>

                  <p className="pb-1 text-sm font-semibold text-white/80">
                    pesanan
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/75">
                  {waiting} menunggu
                  konfirmasi
                  {" · "}
                  {confirmed} siap
                  mulai diproses
                </p>
              </div>

              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-navy-steel shadow-sm transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-5" />
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-white/12 pt-4 text-sm font-bold">
              Buka pesanan
              <ArrowRight className="size-4" />
            </div>
          </Link>
        ) : (
          <div className="rounded-[24px] border border-[#D8EAE2] bg-[#F1FAF6] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#DDF4E8] text-[#087853]">
                <PackageCheck className="size-5" />
              </span>

              <div>
                <p className="font-heading text-lg font-bold text-navy-steel">
                  Semua aman
                </p>

                <p className="mt-1 text-sm leading-6 text-[#5F7068]">
                  Tidak ada pesanan
                  baru yang perlu
                  dikonfirmasi saat ini.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          TODAY SUMMARY
      ====================================================== */}

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#82909A]">
              Hari ini
            </p>

            <h2 className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-navy-steel">
              Ringkasan pesanan
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          <DashboardMetric
            label="Total"
            value={
              todayOrders.length
            }
            icon={
              ClipboardList
            }
            tone="neutral"
          />

          <DashboardMetric
            label="Disiapkan"
            value={
              preparing
            }
            icon={
              CookingPot
            }
            tone="warning"
          />

          <DashboardMetric
            label="Siap"
            value={
              ready
            }
            icon={
              PackageCheck
            }
            tone="success"
          />
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <QuickActions />

      {/* =====================================================
          RECENT ORDERS + SIDE INFO
      ====================================================== */}

      <section className="mt-9 grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.7fr)]">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#82909A]">
                Operasional
              </p>

              <h2 className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-navy-steel sm:text-2xl">
                Pesanan terbaru
              </h2>
            </div>

            <Link
              href="/merchant/orders"
              prefetch={
                false
              }
              className="flex min-h-11 items-center gap-1 text-sm font-bold text-navy-steel"
            >
              Lihat semua

              <ArrowRight className="size-4" />
            </Link>
          </div>

          {recentOrders.length >
          0 ? (
            <>
              {/* MOBILE */}

              <div className="mt-4 space-y-3 lg:hidden">
                {recentOrders
                  .slice(
                    0,
                    3,
                  )
                  .map(
                    (
                      entry,
                    ) => (
                      <Link
                        key={
                          entry
                            .order
                            .id
                        }
                        href={`/merchant/orders/${entry.order.id}`}
                        prefetch={
                          false
                        }
                        className="block rounded-[20px] border border-[#E1E7EB] bg-white p-4 shadow-[0_4px_18px_rgba(13,27,42,0.035)] transition-transform active:scale-[0.99]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-bold tracking-[0.04em] text-[#71808B]">
                              #
                              {
                                entry
                                  .order
                                  .orderCode
                              }
                            </p>

                            <h3 className="mt-1 truncate text-base font-bold text-navy-steel">
                              {
                                entry.customerName
                              }
                            </h3>
                          </div>

                          <span
                            className={cn(
                              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold",
                              statusBadgeClasses(
                                entry
                                  .order
                                  .status,
                              ),
                            )}
                          >
                            {statusLabel(
                              entry
                                .order
                                .status,
                            )}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-2 text-sm leading-5 text-[#586873]">
                          {summarizeItems(
                            entry,
                          )}
                        </p>

                        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#EDF1F3] pt-3">
                          <div className="flex min-w-0 items-center gap-2 text-xs text-[#71808B]">
                            <Clock3 className="size-4 shrink-0" />

                            <span className="truncate">
                              Pickup{" "}
                              {entry
                                .order
                                .pickupTime ??
                                "belum tersedia"}
                            </span>
                          </div>

                          <p className="shrink-0 text-sm font-bold text-navy-steel">
                            {formatCurrency(
                              entry
                                .order
                                .totalPrice,
                            )}
                          </p>
                        </div>
                      </Link>
                    ),
                  )}
              </div>

              {/* DESKTOP */}

              <div className="mt-4 hidden overflow-hidden rounded-[20px] border border-[#E1E7EB] bg-white lg:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#F7F9FA] text-[11px] font-bold uppercase tracking-[0.055em] text-[#71808B]">
                    <tr>
                      <th className="px-5 py-4">
                        Pesanan
                      </th>

                      <th className="px-5 py-4">
                        Siswa
                      </th>

                      <th className="px-5 py-4">
                        Item
                      </th>

                      <th className="px-5 py-4">
                        Pickup
                      </th>

                      <th className="px-5 py-4 text-right">
                        Total
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#EDF1F3]">
                    {recentOrders.map(
                      (
                        entry,
                      ) => (
                        <tr
                          key={
                            entry
                              .order
                              .id
                          }
                          className="text-sm text-navy-steel transition-colors hover:bg-[#FAFBFC]"
                        >
                          <td className="px-5 py-4">
                            <Link
                              href={`/merchant/orders/${entry.order.id}`}
                              prefetch={
                                false
                              }
                              className="font-bold hover:underline"
                            >
                              {
                                entry
                                  .order
                                  .orderCode
                              }
                            </Link>
                          </td>

                          <td className="px-5 py-4">
                            {
                              entry.customerName
                            }
                          </td>

                          <td className="px-5 py-4 text-[#65747F]">
                            {entry.items.reduce(
                              (
                                total,
                                item,
                              ) =>
                                total +
                                item.quantity,
                              0,
                            )}{" "}
                            item
                          </td>

                          <td className="px-5 py-4 text-[#65747F]">
                            {entry
                              .order
                              .pickupTime ??
                              "Belum tersedia"}
                          </td>

                          <td className="px-5 py-4 text-right font-bold">
                            {formatCurrency(
                              entry
                                .order
                                .totalPrice,
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold",
                                statusBadgeClasses(
                                  entry
                                    .order
                                    .status,
                                ),
                              )}
                            >
                              {statusLabel(
                                entry
                                  .order
                                  .status,
                              )}
                            </span>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-[20px] border border-[#E1E7EB] bg-white p-4">
              <EmptyState
                icon={
                  ClipboardList
                }
                title="Belum ada pesanan hari ini"
                description="Pesanan baru akan langsung muncul di bagian ini."
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* =================================================
              PRODUCTION
          ================================================== */}

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#82909A]">
                  Dapur
                </p>

                <h2 className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-navy-steel">
                  Perlu dibuat
                </h2>
              </div>

              <Link
                href="/merchant/production"
                prefetch={
                  false
                }
                className="flex min-h-11 items-center gap-1 text-sm font-bold text-navy-steel"
              >
                Detail

                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-4 rounded-[20px] border border-[#E1E7EB] bg-white p-4 shadow-[0_4px_18px_rgba(13,27,42,0.03)]">
              {productionItems.length >
              0 ? (
                <div className="divide-y divide-[#EDF1F3]">
                  {productionItems.map(
                    (
                      item,
                    ) => (
                      <div
                        key={
                          item.key
                        }
                        className="flex min-h-[58px] items-center justify-between gap-4 py-2"
                      >
                        <p className="min-w-0 truncate text-sm font-semibold text-navy-steel">
                          {
                            item.productName
                          }
                        </p>

                        <p className="shrink-0 font-heading text-xl font-bold text-navy-steel">
                          {
                            item.quantity
                          }{" "}
                          <span className="font-sans text-xs font-semibold text-[#71808B]">
                            item
                          </span>
                        </p>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <EmptyState
                  icon={
                    CookingPot
                  }
                  title="Dapur sedang kosong"
                  description="Pesanan yang perlu disiapkan akan tampil di sini."
                />
              )}
            </div>
          </section>

          {/* =================================================
              FINANCE
          ================================================== */}

          <section className="rounded-[20px] bg-[#EAF4F9] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-navy-steel shadow-sm">
                <CircleDollarSign className="size-5" />
              </span>

              <Link
                href="/merchant/finance"
                prefetch={
                  false
                }
                aria-label="Buka keuangan"
                className="flex size-11 items-center justify-center rounded-full text-navy-steel transition-colors active:bg-white"
              >
                <ArrowRight className="size-5" />
              </Link>
            </div>

            <p className="mt-5 text-xs font-bold text-[#627783]">
              Saldo pending
            </p>

            <p className="mt-1 font-heading text-[28px] font-bold tracking-[-0.03em] text-navy-steel">
              {formatCurrency(
                wallet.pendingBalance,
              )}
            </p>

            <p className="mt-2 text-xs leading-5 text-[#657983]">
              Dana pesanan akan tersedia
              setelah proses pickup selesai.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}

interface DashboardMetricProps {
  label: string;

  value: number;

  icon:
    typeof ClipboardList;

  tone:
    | "neutral"
    | "warning"
    | "success";
}

function DashboardMetric({
  label,
  value,
  icon: Icon,
  tone,
}: DashboardMetricProps) {
  const toneClasses = {
    neutral:
      "bg-[#F1F5F7] text-[#536772]",

    warning:
      "bg-[#FFF4DF] text-[#A85B00]",

    success:
      "bg-[#EAF8F1] text-[#087853]",
  };

  return (
    <article className="rounded-[18px] border border-[#E1E7EB] bg-white p-3.5 shadow-[0_3px_14px_rgba(13,27,42,0.025)] sm:p-5">
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl sm:size-10",
          toneClasses[
            tone
          ],
        )}
      >
        <Icon className="size-[18px]" />
      </span>

      <p className="mt-5 font-heading text-[26px] font-bold leading-none tracking-[-0.03em] text-navy-steel sm:text-[30px]">
        {
          value
        }
      </p>

      <p className="mt-2 truncate text-[10px] font-bold text-[#71808B] sm:text-xs">
        {
          label
        }
      </p>
    </article>
  );
}

function QuickActions() {
  const actions = [
    {
      label:
        "Pesanan",

      description:
        "Kelola order",

      href:
        "/merchant/orders",

      icon:
        ShoppingCart,

      primary:
        true,
    },

    {
      label:
        "Produksi",

      description:
        "Lihat kebutuhan",

      href:
        "/merchant/production",

      icon:
        CookingPot,
    },

    {
      label:
        "Pickup",

      description:
        "Scan pesanan",

      href:
        "/merchant/pickup",

      icon:
        QrCode,
    },

    {
      label:
        "Tambah Produk",

      description:
        "Kelola menu",

      href:
        "/merchant/products",

      icon:
        PackagePlus,
    },
  ];

  return (
    <section className="mt-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#82909A]">
          Akses cepat
        </p>

        <h2 className="mt-1 font-heading text-xl font-bold tracking-[-0.02em] text-navy-steel">
          Mau kerjakan apa?
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map(
          (
            action,
          ) => {
            const Icon =
              action.icon;

            return (
              <Link
                key={
                  action.href
                }
                href={
                  action.href
                }
                prefetch={
                  false
                }
                className={cn(
                  "group flex min-h-[104px] flex-col justify-between rounded-[18px] border p-4 transition-transform active:scale-[0.98]",
                  action.primary
                    ? "border-navy-steel bg-navy-steel text-white shadow-[0_8px_22px_rgba(13,27,42,0.11)]"
                    : "border-[#E1E7EB] bg-white text-navy-steel",
                )}
              >
                <div className="flex items-start justify-between">
                  <Icon className="size-5" />

                  <ArrowRight
                    className={cn(
                      "size-4 transition-transform group-hover:translate-x-0.5",
                      action.primary
                        ? "text-white/60"
                        : "text-[#96A2AA]",
                    )}
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm font-bold">
                    {
                      action.label
                    }
                  </p>

                  <p
                    className={cn(
                      "mt-0.5 text-[10px] font-medium",
                      action.primary
                        ? "text-white/65"
                        : "text-[#7A8790]",
                    )}
                  >
                    {
                      action.description
                    }
                  </p>
                </div>
              </Link>
            );
          },
        )}
      </div>
    </section>
  );
}
