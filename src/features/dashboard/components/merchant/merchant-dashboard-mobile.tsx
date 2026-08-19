import {
  Boxes,
  ChevronRight,
  ClipboardList,
  CookingPot,
  QrCode,
  WalletCards,
} from "lucide-react";

import Link from "next/link";

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

interface MerchantDashboardMobileProps {
  wallet:
    MerchantWalletData;

  todayOrders:
    MerchantOrderData[];
}

const STATUS_LABEL:
  Record<
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
      "Batal",
  };

const STATUS_STYLE:
  Record<
    OrderStatus,
    string
  > = {
    WAITING:
      "bg-amber-100 text-amber-800",

    CONFIRMED:
      "bg-blue-100 text-blue-800",

    PREPARING:
      "bg-orange-100 text-orange-800",

    READY:
      "bg-emerald-100 text-emerald-800",

    COMPLETED:
      "bg-slate-100 text-slate-700",

    CANCELLED:
      "bg-rose-100 text-rose-700",
  };

export function MerchantDashboardMobile({
  wallet,
  todayOrders,
}: MerchantDashboardMobileProps) {
  const waiting =
    todayOrders.filter(
      ({ order }) =>
        order.status ===
        "WAITING",
    ).length;

  const preparing =
    todayOrders.filter(
      ({ order }) =>
        order.status ===
          "CONFIRMED" ||
        order.status ===
          "PREPARING",
    ).length;

  const ready =
    todayOrders.filter(
      ({ order }) =>
        order.status ===
        "READY",
    ).length;

  const productionItems =
    todayOrders
      .filter(
        ({ order }) =>
          order.status ===
            "CONFIRMED" ||
          order.status ===
            "PREPARING",
      )
      .reduce(
        (
          total,
          entry,
        ) =>
          total +
          entry.items.reduce(
            (
              subtotal,
              item,
            ) =>
              subtotal +
              item.quantity,
            0,
          ),
        0,
      );

  const recentOrders =
    [...todayOrders]
      .sort(
        (
          a,
          b,
        ) =>
          new Date(
            b.order.createdAt,
          ).getTime() -
          new Date(
            a.order.createdAt,
          ).getTime(),
      )
      .slice(
        0,
        3,
      );

  return (
    <div className="px-4 pb-6 pt-5">
      <section>
        <p className="text-sm font-semibold text-[#64748B]">
          Operasional hari ini
        </p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <h1 className="min-w-0 truncate font-heading text-[28px] font-bold leading-tight text-navy-steel">
            {
              wallet.merchantName
            }
          </h1>

          <span className="shrink-0 rounded-full bg-[#EAF5FF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-navy-steel">
            {
              wallet.merchantType ===
              "canteen"
                ? "Kantin"
                : "Merchant"
            }
          </span>
        </div>
      </section>

      <section
        className={cn(
          "mt-5 overflow-hidden rounded-[22px] p-5",
          waiting > 0
            ? "bg-navy-steel text-white"
            : "border border-[#DDE5EB] bg-white text-navy-steel",
        )}
      >
        {waiting >
        0 ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/65">
              Perlu segera diproses
            </p>

            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <p className="font-heading text-5xl font-bold leading-none">
                  {
                    waiting
                  }
                </p>

                <p className="mt-2 text-sm font-semibold text-white/80">
                  pesanan baru menunggu
                </p>
              </div>

              <ClipboardList className="size-12 text-white/15" />
            </div>

            <Link
              href="/merchant/orders"
              className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-navy-steel"
            >
              Lihat Pesanan
              <ChevronRight className="size-4" />
            </Link>
          </>
        ) : (
          <>
            <p className="font-heading text-xl font-bold">
              Tidak ada pesanan baru
            </p>

            <p className="mt-1 text-sm leading-6 text-[#64748B]">
              Semua pesanan baru sudah ditangani.
            </p>
          </>
        )}
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        <StatusMetric
          label="Menunggu"
          value={
            waiting
          }
          tone="amber"
        />

        <StatusMetric
          label="Diproses"
          value={
            preparing
          }
          tone="orange"
        />

        <StatusMetric
          label="Siap"
          value={
            ready
          }
          tone="green"
        />
      </section>

      <section className="mt-7">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy-steel">
            Akses Cepat
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            Menu yang paling sering dipakai saat jam istirahat.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <QuickAction
            href="/merchant/orders"
            icon={
              ClipboardList
            }
            title="Pesanan"
            description={
              waiting > 0
                ? `${waiting} baru`
                : "Lihat semua"
            }
          />

          <QuickAction
            href="/merchant/production"
            icon={
              CookingPot
            }
            title="Produksi"
            description={`${productionItems} item`}
          />

          <QuickAction
            href="/merchant/pickup"
            icon={
              QrCode
            }
            title="Pickup"
            description={
              ready > 0
                ? `${ready} siap`
                : "Scan QR"
            }
          />

          <QuickAction
            href="/merchant/inventory"
            icon={
              Boxes
            }
            title="Stok"
            description="Cek persediaan"
          />
        </div>
      </section>

      <Link
        href="/merchant/finance"
        className="mt-7 block rounded-[20px] border border-[#DDE5EB] bg-white p-5 shadow-[0_4px_16px_rgba(13,27,42,0.035)]"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FF] text-navy-steel">
            <WalletCards className="size-5" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#64748B]">
              Dana tersedia
            </p>

            <p className="mt-0.5 font-heading text-2xl font-bold text-navy-steel">
              {formatCurrency(
                wallet.availableBalance,
              )}
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              Tertahan{" "}
              {formatCurrency(
                wallet.pendingBalance,
              )}
            </p>
          </div>

          <ChevronRight className="size-5 shrink-0 text-[#94A3B8]" />
        </div>
      </Link>

      <section className="mt-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-bold text-navy-steel">
            Pesanan Terbaru
          </h2>

          <Link
            href="/merchant/orders"
            className="text-sm font-bold text-navy-steel"
          >
            Lihat semua
          </Link>
        </div>

        {recentOrders.length >
        0 ? (
          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#DDE5EB] bg-white">
            {recentOrders.map(
              (
                entry,
                index,
              ) => (
                <Link
                  key={
                    entry.order.id
                  }
                  href={`/merchant/orders/${encodeURIComponent(
                    entry.order.id,
                  )}`}
                  className={cn(
                    "flex min-h-[74px] items-center gap-3 px-4 py-3",
                    index <
                      recentOrders.length -
                        1 &&
                      "border-b border-[#EDF1F4]",
                  )}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-xs font-bold text-navy-steel">
                    {entry.customerName
                      .split(/\s+/)
                      .filter(Boolean)
                      .map(
                        (
                          part,
                        ) =>
                          part.charAt(
                            0,
                          ),
                      )
                      .join("")
                      .slice(
                        0,
                        2,
                      )
                      .toUpperCase()}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-navy-steel">
                      {
                        entry.customerName
                      }
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#64748B]">
                      #
                      {
                        entry.order
                          .orderCode
                      }
                      {" • "}
                      {
                        entry.items[0]
                          ?.productName ??
                        "Pesanan"
                      }
                    </p>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase",
                      STATUS_STYLE[
                        entry.order
                          .status
                      ],
                    )}
                  >
                    {
                      STATUS_LABEL[
                        entry.order
                          .status
                      ]
                    }
                  </span>
                </Link>
              ),
            )}
          </div>
        ) : (
          <div className="mt-4 rounded-[20px] border border-dashed border-[#CBD5E1] bg-white p-6 text-center">
            <p className="text-sm font-semibold text-navy-steel">
              Belum ada pesanan hari ini.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function StatusMetric({
  label,
  value,
  tone,
}: {
  label:
    string;

  value:
    number;

  tone:
    "amber" |
    "orange" |
    "green";
}) {
  const toneClass = {
    amber:
      "bg-amber-50 border-amber-100",

    orange:
      "bg-orange-50 border-orange-100",

    green:
      "bg-emerald-50 border-emerald-100",
  }[
    tone
  ];

  return (
    <article
      className={cn(
        "rounded-[16px] border p-3",
        toneClass,
      )}
    >
      <p className="font-heading text-2xl font-bold text-navy-steel">
        {
          value
        }
      </p>

      <p className="mt-1 text-[11px] font-semibold text-[#64748B]">
        {
          label
        }
      </p>
    </article>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href:
    string;

  icon:
    typeof ClipboardList;

  title:
    string;

  description:
    string;
}) {
  return (
    <Link
      href={
        href
      }
      className="rounded-[18px] border border-[#DDE5EB] bg-white p-4 shadow-[0_3px_12px_rgba(13,27,42,0.03)] active:scale-[0.99]"
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-[#EAF5FF] text-navy-steel">
        <Icon className="size-5" />
      </span>

      <p className="mt-4 text-sm font-bold text-navy-steel">
        {
          title
        }
      </p>

      <p className="mt-1 text-xs text-[#64748B]">
        {
          description
        }
      </p>
    </Link>
  );
}
