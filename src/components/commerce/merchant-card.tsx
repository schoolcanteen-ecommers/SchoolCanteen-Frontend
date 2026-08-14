import {
  Clock3,
  ImageIcon,
  ShoppingBag,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Merchant } from "@/types/merchant";

interface MerchantCardProps {
  merchant: Merchant;
  productCount?: number;
  className?: string;
}

export function MerchantCard({
  merchant,
  productCount,
  className,
}: MerchantCardProps) {
  const isCanteen = merchant.type === "CANTEEN";

  const MerchantIcon = isCanteen
    ? Store
    : ShoppingBag;

  const merchantLabel = isCanteen
    ? "Kantin"
    : "Koperasi";

  const productLabel = isCanteen
    ? "menu"
    : "produk";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border bg-background",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Merchant Image */}
        <div className="relative flex aspect-[16/8] w-full shrink-0 items-center justify-center overflow-hidden bg-muted sm:aspect-auto sm:w-44">
          {merchant.imageUrl ? (
           
            <img
              src={merchant.imageUrl}
              alt={merchant.name}
              className="size-full object-cover"
            />
          ) : (
            <ImageIcon className="size-8 text-muted-foreground/40" />
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <MerchantIcon className="size-3.5" />
                  {merchantLabel}
                </span>

                {merchant.status === "ACTIVE" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Buka
                  </span>
                )}
              </div>

              <h2 className="truncate text-lg font-semibold tracking-tight">
                {merchant.name}
              </h2>

              {merchant.description && (
                <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {merchant.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {typeof productCount === "number" && (
              <span>
                {productCount} {productLabel} tersedia
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5" />

              {isCanteen
                ? "Pre-order tersedia"
                : "Belanja tersedia"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}