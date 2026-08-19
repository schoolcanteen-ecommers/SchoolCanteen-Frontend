<<<<<<< HEAD
import { ImageIcon } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import type { Product } from "@/types/product";

interface CheckoutOrderItemProps {
  product: Product;
  quantity: number;
}

export function CheckoutOrderItem({
  product,
  quantity,
}: CheckoutOrderItemProps) {
=======
import {
  ImageIcon,
} from "lucide-react";

import type {
  ResolvedCartLine,
} from "@/features/cart/use-resolved-cart-lines";

import {
  getOptimizedCloudinaryImageUrl,
} from "@/lib/cloudinary-image";

import {
  formatCurrency,
} from "@/lib/utils";

interface CheckoutOrderItemProps {
  line: ResolvedCartLine;
}

export function CheckoutOrderItem({
  line,
}: CheckoutOrderItemProps) {
  const product =
    line.product;

  if (!product) {
    return null;
  }

>>>>>>> source/main
  return (
    <article className="flex gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#C4C6CC]/30 bg-[#ECEEF0]">
        {product.imageUrl ? (
          <img
<<<<<<< HEAD
            src={product.imageUrl}
            alt={product.name}
=======
            src={getOptimizedCloudinaryImageUrl(
              product.imageUrl,
              {
                width: 200,
                height: 200,
              },
            )}
            alt={
              product.name
            }
>>>>>>> source/main
            className="size-full object-cover"
          />
        ) : (
          <ImageIcon className="size-6 text-[#74777D]/50" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="min-w-0 truncate font-sans text-base font-semibold text-navy-steel">
            {product.name}
          </h4>

          <span className="hidden shrink-0 font-sans text-sm font-semibold text-navy-steel sm:inline">
<<<<<<< HEAD
            {formatCurrency(product.price * quantity)}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3 sm:block">
          <span className="font-sans text-sm font-semibold text-navy-steel sm:hidden">
            {formatCurrency(product.price * quantity)}
          </span>

          <span className="rounded bg-[#E6E8EA] px-2 py-0.5 font-sans text-xs font-medium text-[#536069] sm:bg-transparent sm:px-0 sm:py-0">
            Qty {quantity}
          </span>
        </div>
=======
            {formatCurrency(
              line.subtotal,
            )}
          </span>
        </div>

        <p className="mt-1 text-xs text-[#66737C]">
          {formatCurrency(
            line.unitPrice,
          )}{" "}
          × {line.quantity}
        </p>

        {line.modifierSummaries.map(
          (summary) => (
            <p
              key={
                summary.groupId
              }
              className="mt-1 text-xs leading-5 text-[#536069]"
            >
              <span className="font-semibold">
                {summary.groupName}:
              </span>{" "}
              {summary.optionNames.join(
                ", ",
              )}
            </p>
          ),
        )}

        {line.note && (
          <p className="mt-1 text-xs italic leading-5 text-[#66737C]">
            Catatan: {line.note}
          </p>
        )}

        <span className="mt-2 inline-flex rounded bg-[#E6E8EA] px-2 py-0.5 font-sans text-xs font-medium text-[#536069]">
          Qty {line.quantity}
        </span>
>>>>>>> source/main
      </div>
    </article>
  );
}
