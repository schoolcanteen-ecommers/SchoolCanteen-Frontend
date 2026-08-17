import Link from "next/link";
import {
  ImageIcon,
} from "lucide-react";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

export interface StudentReorderItem {
  productId: string;
  productName: string;
  imageUrl: string | null;
  merchantName: string;
  price: number;
}

interface StudentReorderSectionProps {
  items: StudentReorderItem[];
  className?: string;
}

export function StudentReorderSection({
  items,
  className,
}: StudentReorderSectionProps) {
  return (
    <section
      className={cn(
        "min-w-0",
        className,
      )}
    >
      <h2 className="font-sans text-lg font-semibold text-[#191C1E] lg:text-xl">
        Pesan Lagi
      </h2>

      {items.length > 0 ? (
        <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map(
            (item) => (
              <Link
                key={
                  item.productId
                }
                href={`/produk/${item.productId}`}
                className="group min-w-[140px] overflow-hidden rounded-xl border border-arctic-blue bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(13,27,42,0.08)] lg:min-w-0"
              >
                <div className="flex h-28 w-full items-center justify-center overflow-hidden bg-[#ECEEF0] lg:h-36">
                  {item.imageUrl ? (
                    <img
                      src={
                        item.imageUrl
                      }
                      alt={
                        item.productName
                      }
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ImageIcon className="size-8 text-[#74777D]/50" />
                  )}
                </div>

                <div className="p-3">
                  <h3 className="truncate text-sm font-semibold text-[#191C1E]">
                    {
                      item.productName
                    }
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-[#536069]">
                    {
                      item.merchantName
                    }
                  </p>

                  <p className="mt-2 text-sm font-semibold text-navy-steel">
                    {formatCurrency(
                      item.price,
                    )}
                  </p>
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-[#C4C6CC] bg-white p-5 text-sm text-[#536069]">
          Belum ada produk dari riwayat pesanan untuk dipesan lagi.
        </div>
      )}
    </section>
  );
}
