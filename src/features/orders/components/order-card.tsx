import Link from "next/link";

import {
  CheckCircle2,
  Clock3,
  ImageIcon,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import {
  ORDER_STATUS_LABEL,
  ROUTES,
} from "@/lib/constants";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  MerchantType,
} from "@/types/merchant";

import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/types/order";

interface OrderCardProps {
  order: Order;
  merchantName: string;
  merchantType: MerchantType;
  pickupEndTime: string | null;
  items: OrderItem[];
}

function StudentOrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const isProcessing = [
    "WAITING",
    "CONFIRMED",
    "PREPARING",
  ].includes(status);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
        isProcessing &&
          "border-amber-100 bg-amber-50 text-amber-700",
        status === "READY" &&
          "border-emerald-100 bg-emerald-50 text-emerald-700",
        status === "COMPLETED" &&
          "border-[#AFD0EA] bg-arctic-blue text-navy-steel",
        status === "CANCELLED" &&
          "border-red-100 bg-red-50 text-red-700",
      )}
    >
      {status === "READY" && (
        <CheckCircle2 className="size-3.5" />
      )}
      {isProcessing && (
        <Clock3 className="size-3.5" />
      )}
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function OrderCard({
  order,
  merchantName,
  merchantType,
  pickupEndTime,
  items,
}: OrderCardProps) {
  const formattedDate =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      },
    ).format(
      new Date(order.createdAt),
    );

  const MerchantIcon =
    merchantType === "CANTEEN"
      ? UtensilsCrossed
      : Store;

  const displayOrderCode =
    order.orderCode.startsWith("#")
      ? order.orderCode
      : `#${order.orderCode}`;

  const firstItem = items[0];
  const remainingItemCount =
    Math.max(items.length - 1, 0);

  const pickupLabel =
    order.pickupTime
      ? pickupEndTime
        ? `${order.pickupTime} - ${pickupEndTime}`
        : order.pickupTime
      : null;

  return (
    <article className="overflow-hidden rounded-[20px] border border-arctic-blue bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)] transition-shadow hover:shadow-[0_16px_40px_rgba(13,27,42,0.07)] sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5 lg:gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel lg:size-10">
            <MerchantIcon className="size-4.5 lg:size-5" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-[#191C1E] lg:font-heading lg:text-xl">
              {merchantName}
            </h2>

            <p className="mt-0.5 hidden text-xs font-medium text-[#536069] lg:block">
              {displayOrderCode} • {formattedDate}
            </p>
          </div>
        </div>

        <StudentOrderStatusBadge
          status={order.status}
        />
      </div>

      <div className="mt-4 border-b border-[#EEF1F4] pb-4 lg:border-y lg:border-arctic-blue lg:py-4">
        <div className="flex gap-3 lg:gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F2F4F6] lg:size-20 lg:rounded-lg">
            {firstItem?.imageUrl ? (
              <div
                role="img"
                aria-label={
                  firstItem.productName
                }
                className="size-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    `url("${firstItem.imageUrl}")`,
                }}
              />
            ) : (
              <ImageIcon className="size-6 text-[#AAB0B6]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="lg:hidden">
              {firstItem ? (
                <>
                  <p className="truncate text-base font-semibold text-[#191C1E]">
                    {firstItem.productName}{" "}
                    <span className="font-normal text-[#536069]">
                      ×{firstItem.quantity}
                    </span>
                  </p>

                  {remainingItemCount > 0 && (
                    <p className="mt-1 text-sm text-[#536069]">
                      +{remainingItemCount} item lainnya
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-[#536069]">
                  Produk tidak tersedia
                </p>
              )}

              {pickupLabel && (
                <p className="mt-1 text-sm text-[#536069]">
                  Pickup: {pickupLabel}
                </p>
              )}

              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="truncate text-sm font-medium text-[#536069]">
                  {displayOrderCode}
                </span>

                <span className="shrink-0 text-base font-bold text-navy-steel">
                  {formatCurrency(
                    order.totalPrice,
                  )}
                </span>
              </div>
            </div>

            <div className="hidden min-h-20 items-center justify-between gap-5 lg:flex">
              <div className="min-w-0 flex-1">
                {items.length > 0 ? (
                  <div className="space-y-1">
                    {items.map((item) => (
                      <p
                        key={item.id}
                        className="truncate text-base font-medium text-[#191C1E]"
                      >
                        {item.productName} ×{item.quantity}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#536069]">
                    Produk tidak tersedia
                  </p>
                )}

                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-[#536069]">
                  <Clock3 className="size-4" />
                  {pickupLabel
                    ? `Pickup: ${pickupLabel}`
                    : "Waktu belum tersedia"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="hidden lg:block">
          <p className="text-xs font-medium tracking-wide text-[#536069]">
            Total Pembayaran
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold text-navy-steel">
            {formatCurrency(
              order.totalPrice,
            )}
          </p>
        </div>

        <Link
          href={`${ROUTES.STUDENT.ORDERS}/${order.id}`}
          className="ml-auto inline-flex min-h-11 min-w-[148px] items-center justify-center rounded-xl border-2 border-navy-steel px-6 py-2.5 text-sm font-semibold text-navy-steel transition-colors hover:bg-arctic-blue lg:rounded-lg"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
