import { Package, ReceiptText, Store } from "lucide-react";

import { CheckoutOrderItem } from "@/features/cart/components/checkout/checkout-order-item";

import type { MerchantType } from "@/types/merchant";
import type { Product } from "@/types/product";

interface CheckoutOrderGroup {
  merchantId: string;
  merchantName: string;
  merchantType: MerchantType;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
}

interface CheckoutOrderSectionProps {
  groups: CheckoutOrderGroup[];
  notes: Record<string, string>;
  disabled?: boolean;
  onNoteChange: (merchantId: string, value: string) => void;
}

export function CheckoutOrderSection({
  groups,
  notes,
  disabled = false,
  onNoteChange,
}: CheckoutOrderSectionProps) {
  return (
    <section className="relative lg:overflow-hidden lg:rounded-2xl lg:border lg:border-arctic-blue lg:bg-white lg:p-8">
      <div className="pointer-events-none absolute right-0 top-0 hidden size-32 rounded-bl-[100px] bg-[#D1E4FF]/20 lg:block" />

      <h2 className="relative z-10 mb-6 hidden items-center gap-2 font-heading text-2xl font-semibold text-navy-steel lg:flex">
        <ReceiptText className="size-6" />
        Pesanan Kamu
      </h2>

      <div className="relative z-10 space-y-6 lg:space-y-8">
        {groups.map((group) => {
          const isCanteen = group.merchantType === "CANTEEN";
          const MerchantIcon = isCanteen ? Store : Package;

          return (
            <div
              key={group.merchantId}
              className="relative overflow-hidden rounded-2xl border border-arctic-blue bg-white p-4 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
            >
              <div className="pointer-events-none absolute right-0 top-0 size-24 rounded-bl-[100px] bg-[#D1E4FF]/20 lg:hidden" />

              <div className="relative z-10 flex items-center gap-2 border-b border-[#E6E8EA] pb-3">
                <MerchantIcon className="size-5 text-[#536069]" />
                <h3 className="min-w-0 truncate font-sans text-sm font-semibold text-[#191C1E]">
                  {group.merchantName}
                </h3>
              </div>

              <div className="relative z-10 divide-y divide-[#E6E8EA] pt-4">
                {group.items.map(({ product, quantity }) => (
                  <CheckoutOrderItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                ))}
              </div>

              <div className="relative z-10 mt-4">
                <label
                  htmlFor={`merchant-note-${group.merchantId}`}
                  className="mb-1 block font-sans text-xs font-medium text-[#44474C]"
                >
                  Catatan Pesanan
                </label>

                <textarea
                  id={`merchant-note-${group.merchantId}`}
                  value={notes[group.merchantId] ?? ""}
                  onChange={(event) =>
                    onNoteChange(group.merchantId, event.target.value)
                  }
                  disabled={disabled}
                  rows={2}
                  placeholder="Tulis permintaan khusus untuk merchant ini..."
                  className="w-full resize-none rounded-lg border border-[#C4C6CC] bg-white px-3 py-2.5 font-sans text-sm text-[#191C1E] outline-none transition-colors placeholder:text-[#74777D] focus:border-2 focus:border-navy-steel disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
