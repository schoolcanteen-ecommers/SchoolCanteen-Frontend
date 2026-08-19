<<<<<<< HEAD
import { Package, ReceiptText, Store } from "lucide-react";

import { CheckoutOrderItem } from "@/features/cart/components/checkout/checkout-order-item";

import type { MerchantType } from "@/types/merchant";
import type { Product } from "@/types/product";
=======
import {
  Package,
  ReceiptText,
  Store,
} from "lucide-react";

import {
  CheckoutOrderItem,
} from "@/features/cart/components/checkout/checkout-order-item";

import type {
  ResolvedCartLine,
} from "@/features/cart/use-resolved-cart-lines";

import type {
  MerchantType,
} from "@/types/merchant";
>>>>>>> source/main

interface CheckoutOrderGroup {
  merchantId: string;
  merchantName: string;
  merchantType: MerchantType;
<<<<<<< HEAD
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
=======

  items:
    ResolvedCartLine[];

  subtotal: number;
}

interface CheckoutOrderSectionProps {
  groups:
    CheckoutOrderGroup[];

  notes:
    Record<
      string,
      string
    >;

  disabled?: boolean;

  onNoteChange: (
    merchantId: string,
    value: string,
  ) => void;
>>>>>>> source/main
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
<<<<<<< HEAD
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
=======
        {groups.map(
          (group) => {
            const isCanteen =
              group.merchantType ===
              "CANTEEN";

            const MerchantIcon =
              isCanteen
                ? Store
                : Package;

            return (
              <div
                key={
                  group.merchantId
                }
                className="rounded-[16px] border border-arctic-blue bg-white p-5 lg:border-0 lg:p-0"
              >
                <div className="flex items-center justify-between gap-4 border-b border-arctic-blue pb-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-arctic-blue text-navy-steel">
                      <MerchantIcon className="size-4" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs text-[#66737C]">
                        {isCanteen
                          ? "Kantin"
                          : "Koperasi"}
                      </p>

                      <p className="truncate font-heading font-bold text-navy-steel">
                        {group.merchantName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-[#E6E8EA]">
                  {group.items.map(
                    (line) => (
                      <CheckoutOrderItem
                        key={
                          line.lineId
                        }
                        line={
                          line
                        }
                      />
                    ),
                  )}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`merchant-note-${group.merchantId}`}
                    className="text-xs font-semibold text-[#536069]"
                  >
                    Catatan untuk merchant
                  </label>

                  <textarea
                    id={`merchant-note-${group.merchantId}`}
                    value={
                      notes[
                        group.merchantId
                      ] ?? ""
                    }
                    disabled={
                      disabled
                    }
                    maxLength={500}
                    rows={2}
                    onChange={(
                      event,
                    ) =>
                      onNoteChange(
                        group.merchantId,
                        event.target.value,
                      )
                    }
                    placeholder="Catatan umum pesanan..."
                    className="mt-2 w-full resize-none rounded-xl border border-[#DCE8F0] bg-white px-3 py-2.5 text-sm outline-none focus:border-navy-steel disabled:opacity-60"
                  />
                </div>
              </div>
            );
          },
        )}
>>>>>>> source/main
      </div>
    </section>
  );
}
