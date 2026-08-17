import {
  ImageIcon,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";

import type {
  OrderItem,
} from "@/types/order";

interface StudentOrderItemsSummaryProps {
  items: OrderItem[];
  notes: string | null;
}

export function StudentOrderItemsSummary({
  items,
  notes,
}: StudentOrderItemsSummaryProps) {
  return (
    <section className="rounded-[18px] border border-arctic-blue bg-white p-5 sm:p-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
      <h2 className="font-heading text-xl font-semibold text-navy-steel lg:text-2xl">
        Ringkasan Pesanan
      </h2>

      <div className="mt-5 divide-y divide-[#EEF1F4]">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4"
            >
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F2F4F6] sm:size-[72px]">
                {item.imageUrl ? (
                  <div
                    role="img"
                    aria-label={item.productName}
                    className="size-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        `url("${item.imageUrl}")`,
                    }}
                  />
                ) : (
                  <ImageIcon className="size-5 text-[#AAB0B6]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-navy-steel sm:text-base">
                      {item.productName}
                    </h3>

                    <p className="mt-1 text-xs text-[#536069] sm:text-sm">
                      {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-navy-steel sm:text-base">
                    {formatCurrency(item.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="py-4 text-sm text-[#536069]">
            Detail produk belum tersedia.
          </p>
        )}
      </div>

      {notes && (
        <div className="mt-5 border-t border-[#E6E8EA] pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#74777D]">
            Catatan untuk merchant
          </p>
          <p className="mt-2 rounded-lg bg-[#F7F9FB] px-3 py-2.5 text-sm leading-6 text-[#44474C]">
            {notes}
          </p>
        </div>
      )}
    </section>
  );
}
