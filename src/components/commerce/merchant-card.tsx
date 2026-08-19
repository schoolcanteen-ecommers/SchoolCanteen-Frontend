<<<<<<< HEAD
import { Store, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Merchant } from "@/types/merchant";
=======
import {
  ShoppingBag,
  Store,
} from "lucide-react";

import {
  getOptimizedCloudinaryImageUrl,
} from "@/lib/cloudinary-image";

import {
  cn,
} from "@/lib/utils";

import type {
  Merchant,
} from "@/types/merchant";
>>>>>>> source/main

interface MerchantCardProps {
  merchant: Merchant;
  productCount?: number;
  className?: string;
  selected?: boolean;
  onSelect?: () => void;
}

export function MerchantCard({
  merchant,
  className,
  selected = false,
  onSelect,
}: MerchantCardProps) {
<<<<<<< HEAD
  const isCanteen = merchant.type === "CANTEEN";
  const isOpen = merchant.status === "ACTIVE";
  const MerchantFallback = isCanteen ? Store : ShoppingBag;

  return (
    <article
      className={cn(
        "group flex flex-col items-center gap-2 rounded-[24px] border border-arctic-blue bg-white p-3 shadow-sm transition-transform hover:-translate-y-1 md:flex-row md:items-center md:gap-4 md:p-4",
        !isOpen && "opacity-75",
        className,
      )}
    >
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-arctic-blue bg-neutral-surface p-0.5 transition-colors group-hover:border-navy-steel/30">
        {merchant.imageUrl ? (
          <img
            src={merchant.imageUrl}
            alt={merchant.name}
            className="size-full rounded-full object-cover"
          />
        ) : (
          <MerchantFallback className="size-6 text-muted-foreground/40" />
        )}
      </div>

      <div className="flex min-w-0 flex-col items-center md:items-start">
        <h3 className="w-full truncate text-center font-heading text-sm font-bold text-navy-steel transition-colors group-hover:text-primary md:text-left md:text-lg">
          {merchant.name}
        </h3>
        
        {isOpen ? (
          <span className="mt-1 inline-block rounded-full bg-arctic-blue px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-navy-steel md:text-xs">
            Buka
          </span>
        ) : (
          <span className="mt-1 inline-block rounded-full bg-surface-variant px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:text-xs">
            Tutup
          </span>
        )}
      </div>
=======
  const isCanteen =
    merchant.type ===
    "CANTEEN";

  const isOpen =
    merchant.status ===
    "ACTIVE";

  const MerchantFallback =
    isCanteen
      ? Store
      : ShoppingBag;

  const cardClassName = cn(
    "group flex w-full min-h-[122px] flex-col items-center justify-center gap-2 rounded-[18px] border bg-white p-3.5 text-center shadow-[0_3px_12px_rgba(12,33,51,0.035)] transition-all sm:min-h-[126px] md:min-h-0 md:flex-row md:justify-start md:gap-4 md:p-4 md:text-left",
    selected
      ? "border-navy-steel/35 bg-[#F7FBFE] shadow-[0_5px_16px_rgba(12,33,51,0.07)]"
      : "border-[#DCEAF3] hover:border-navy-steel/20",
    !isOpen &&
      "opacity-70",
    className,
  );

  const content = (
    <>
      <div
        className={cn(
          "flex size-13 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-neutral-surface p-0.5 transition-colors sm:size-14",
          selected
            ? "border-navy-steel/30"
            : "border-arctic-blue",
        )}
      >
        {merchant.imageUrl ? (
          <img
            src={getOptimizedCloudinaryImageUrl(
              merchant.imageUrl,
              {
                width: 160,
                height: 160,
              },
            )}
            alt={merchant.name}
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className="size-full rounded-full object-cover"
          />
        ) : (
          <MerchantFallback className="size-5 text-muted-foreground/45" />
        )}
      </div>

      <div className="min-w-0">
        <h3 className="max-w-full truncate font-heading text-[14px] font-bold leading-tight text-navy-steel sm:text-[15px] md:text-base">
          {merchant.name}
        </h3>

        <span
          className={cn(
            "mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] md:text-[10px]",
            isOpen
              ? "bg-arctic-blue text-navy-steel"
              : "bg-surface-variant text-muted-foreground",
          )}
        >
          {isOpen
            ? "Buka"
            : "Tutup"}
        </span>
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className={cardClassName}
      >
        {content}
      </button>
    );
  }

  return (
    <article
      className={cardClassName}
    >
      {content}
>>>>>>> source/main
    </article>
  );
}
