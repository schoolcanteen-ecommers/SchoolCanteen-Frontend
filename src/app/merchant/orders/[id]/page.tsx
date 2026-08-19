import {
  ArrowLeft,
  Clock3,
  Hash,
  Package,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import {
  MerchantOrderDetailAction,
} from "@/features/orders/components/merchant-order-detail-action";

import {
  getMerchantOrderDetail,
} from "@/lib/api/merchant-orders";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  OrderStatus,
} from "@/types/order";

interface MerchantOrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
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
      "Siap Diambil",

    COMPLETED:
      "Selesai",

    CANCELLED:
      "Dibatalkan",
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

function formatPickupRange(
  start:
    string | null | undefined,
  end:
    string | null | undefined,
) {
  if (!start) {
    return "Belum tersedia";
  }

  return end
    ? `${start} - ${end}`
    : start;
}

export default async function MerchantOrderDetailPage({
  params,
}: MerchantOrderDetailPageProps) {
  const {
    id,
  } =
    await params;

  const data =
    await getMerchantOrderDetail(
      id,
    );

  const {
    order,
    customerName,
    orderNotes,
    pickupEndTime,
    items,
    pickup,
  } = data;

  const pickupRange =
    formatPickupRange(
      order.pickupTime,
      pickupEndTime,
    );

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <Link
        href="/merchant/orders"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#536069] transition hover:text-navy-steel"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Pesanan
      </Link>

      <header className="mt-4 flex flex-col gap-4 border-b border-[#E2E8F0] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]">
            Detail Pesanan
          </p>

          <h1 className="mt-2 font-heading text-3xl font-bold text-navy-steel sm:text-4xl">
            #{order.orderCode}
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Periksa item, pilihan siswa, dan catatan sebelum menyiapkan pesanan.
          </p>
        </div>

        <span
          className={cn(
            "inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold",
            STATUS_STYLE[
              order.status
            ],
          )}
        >
          {
            STATUS_LABEL[
              order.status
            ]
          }
        </span>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-5">
          <section className="overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white">
            <div className="border-b border-[#E2E8F0] px-5 py-4 sm:px-6">
              <h2 className="font-heading text-xl font-bold text-navy-steel">
                Item Pesanan
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Pilihan di bawah adalah snapshot saat siswa melakukan checkout.
              </p>
            </div>

            <div className="divide-y divide-[#E8EDF0]">
              {items.map(
                (
                  item,
                ) => {
                  const modifiers =
                    item.modifiers ??
                    [];

                  const modifierTotal =
                    modifiers.reduce(
                      (
                        total,
                        modifier,
                      ) =>
                        total +
                        modifier.priceDelta,
                      0,
                    );

                  const baseUnitPrice =
                    Math.max(
                      0,
                      item.price -
                        modifierTotal,
                    );

                  return (
                    <article
                      key={
                        item.id
                      }
                      className="p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EFF4FF] text-navy-steel">
                          <Package className="size-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-heading text-lg font-bold text-navy-steel">
                                {
                                  item.productName
                                }
                              </h3>

                              <p className="mt-1 text-sm text-[#64748B]">
                                {
                                  item.quantity
                                }{" "}
                                ×{" "}
                                {formatCurrency(
                                  item.price,
                                )}
                              </p>
                            </div>

                            <p className="shrink-0 font-bold text-navy-steel">
                              {formatCurrency(
                                item.subtotal,
                              )}
                            </p>
                          </div>

                          {modifiers.length >
                          0 ? (
                            <div className="mt-5 rounded-xl bg-[#F7F9FB] p-4">
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#64748B]">
                                  Harga Dasar
                                </p>

                                <p className="text-sm font-semibold text-navy-steel">
                                  {formatCurrency(
                                    baseUnitPrice,
                                  )}
                                </p>
                              </div>

                              <div className="mt-3 space-y-3 border-t border-[#E2E8F0] pt-3">
                                {modifiers.map(
                                  (
                                    modifier,
                                  ) => (
                                    <div
                                      key={
                                        modifier.id
                                      }
                                      className="flex items-start justify-between gap-4"
                                    >
                                      <div>
                                        <p className="text-xs font-semibold text-[#64748B]">
                                          {
                                            modifier.groupName
                                          }
                                        </p>

                                        <p className="mt-0.5 text-sm font-bold text-navy-steel">
                                          {
                                            modifier.optionName
                                          }
                                        </p>
                                      </div>

                                      <span className="shrink-0 text-sm font-semibold text-[#536069]">
                                        {modifier.priceDelta >
                                        0
                                          ? `+${formatCurrency(
                                              modifier.priceDelta,
                                            )}`
                                          : "Gratis"}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ) : null}

                          {item.notes?.trim() ? (
                            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-[0.06em] text-amber-800">
                                Catatan Item
                              </p>

                              <p className="mt-1 text-sm leading-6 text-amber-950">
                                {
                                  item.notes
                                }
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-5 sm:px-6">
              <span className="text-sm font-bold text-[#536069]">
                Total Pesanan
              </span>

              <span className="font-heading text-2xl font-bold text-navy-steel">
                {formatCurrency(
                  order.totalPrice,
                )}
              </span>
            </div>
          </section>

          {orderNotes?.trim() ? (
            <section className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 sm:p-6">
              <h2 className="font-heading text-lg font-bold text-navy-steel">
                Catatan Pesanan
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#536069]">
                {
                  orderNotes
                }
              </p>
            </section>
          ) : null}
        </main>

        <aside className="space-y-5">
          <section className="rounded-[20px] border border-[#E2E8F0] bg-white p-5">
            <h2 className="font-heading text-lg font-bold text-navy-steel">
              Informasi Pesanan
            </h2>

            <div className="mt-5 space-y-5">
              <InfoRow
                icon={
                  UserRound
                }
                label="Siswa"
                value={
                  customerName
                }
              />

              <InfoRow
                icon={
                  Clock3
                }
                label="Waktu Pickup"
                value={
                  pickupRange
                }
              />

              <InfoRow
                icon={
                  Hash
                }
                label="Kode Pickup"
                value={
                  pickup
                    ?.pickupCode ??
                  "Belum tersedia"
                }
                mono
              />
            </div>
          </section>

          <section className="rounded-[20px] border border-[#E2E8F0] bg-white p-5">
            <h2 className="font-heading text-lg font-bold text-navy-steel">
              Proses Pesanan
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Status harus diproses berurutan. Pesanan selesai hanya setelah pickup diverifikasi.
            </p>

            <div className="mt-5">
              <MerchantOrderDetailAction
                orderId={
                  order.id
                }
                status={
                  order.status
                }
              />
            </div>

            {order.status ===
            "READY" ? (
              <Link
                href="/merchant/pickup"
                className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl border border-navy-steel px-4 text-sm font-bold text-navy-steel transition hover:bg-arctic-blue"
              >
                Buka Pickup Verification
              </Link>
            ) : null}
          </section>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9]">
        <Icon className="size-4 text-[#536069]" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#64748B]">
          {label}
        </p>

        <p
          className={cn(
            "mt-1 break-words text-sm font-bold text-navy-steel",
            mono &&
              "font-mono tracking-[0.12em]",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
