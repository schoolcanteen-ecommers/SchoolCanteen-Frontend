import Link from "next/link";
import {
  Clock3,
  ImageIcon,
  PackageCheck,
} from "lucide-react";

import {
  StatusBadge,
} from "@/components/dashboard/status-badge";

import type {
  StudentOrderData,
} from "@/lib/api/student-orders";
import {
  cn,
} from "@/lib/utils";

interface StudentActiveOrderProps {
  activeOrder: StudentOrderData | null;
  additionalOrderCount: number;
  className?: string;
}

export function StudentActiveOrder({
  activeOrder,
  additionalOrderCount,
  className,
}: StudentActiveOrderProps) {
  const firstItem =
    activeOrder?.items[0] ??
    null;

  return (
    <section
      className={cn(
        "rounded-2xl border border-arctic-blue bg-white p-5 lg:p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-sans text-lg font-semibold text-[#191C1E] lg:text-xl">
          Pesanan Aktif
        </h2>

        {activeOrder ? (
          <StatusBadge
            status={
              activeOrder.order
                .status
            }
          />
        ) : null}
      </div>

      {activeOrder && firstItem ? (
        <div className="flex items-center gap-4 rounded-xl border border-[#C4C6CC] bg-white p-4 lg:gap-5 lg:p-5">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-arctic-blue sm:size-20 lg:size-24">
            {firstItem.imageUrl ? (
              <img
                src={
                  firstItem.imageUrl
                }
                alt={
                  firstItem.productName
                }
                className="size-full object-cover"
              />
            ) : (
              <ImageIcon className="size-6 text-navy-steel/45 lg:size-8" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-sans text-sm font-semibold text-navy-steel sm:text-base lg:text-lg">
              {
                firstItem.productName
              }
            </h3>

            <p className="mt-0.5 truncate text-xs text-[#536069] sm:text-sm">
              {
                activeOrder.merchantName
              }
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#536069] sm:text-xs">
              <span className="flex items-center gap-1">
                <Clock3 className="size-3.5" />
                {activeOrder.order
                  .pickupTime ??
                  "Waktu belum tersedia"}
              </span>

              {activeOrder.items
                .length > 1 ? (
                <span>
                  +
                  {activeOrder.items
                    .length - 1} item
                </span>
              ) : null}

              {additionalOrderCount >
              0 ? (
                <span>
                  +
                  {
                    additionalOrderCount
                  } pesanan aktif
                </span>
              ) : null}
            </div>
          </div>

          <Link
            href={`/student/orders/${activeOrder.order.id}`}
            className="shrink-0 rounded-full border border-navy-steel px-4 py-2 text-xs font-semibold text-navy-steel transition-colors hover:bg-arctic-blue sm:rounded-lg sm:px-5 sm:py-3 sm:text-sm"
          >
            <span className="sm:hidden">
              Lihat
            </span>
            <span className="hidden sm:inline">
              Lihat Pesanan
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex min-h-28 items-center gap-4 rounded-xl border border-dashed border-[#C4C6CC] bg-[#F7F9FB] p-4 lg:p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-arctic-blue text-navy-steel">
            <PackageCheck className="size-6" />
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-steel">
              Belum ada pesanan aktif
            </p>
            <p className="mt-1 text-xs leading-5 text-[#536069] sm:text-sm">
              Pesanan yang sedang diproses akan tampil di sini.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
