import { Store, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Merchant } from "@/types/merchant";

interface MerchantCardProps {
  merchant: Merchant;
  productCount?: number;
  className?: string;
}

export function MerchantCard({
  merchant,
  className,
}: MerchantCardProps) {
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
    </article>
  );
}