"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageIcon, Plus } from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  merchantName?: string;
  className?: string;
}

export function ProductCard({
  product,
  merchantName,
  className,
}: ProductCardProps) {
  const pathname = usePathname() || "";
  const isAvailable = product.isActive && product.stock > 0;

 
  const isKantin = pathname.includes("kantin");
  const isKoperasi = pathname.includes("koperasi");
  const sourceQuery = isKantin ? "?source=kantin" : isKoperasi ? "?source=koperasi" : "";
  const productUrl = `/produk/${product.id}${sourceQuery}`;

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[16px] border border-arctic-blue bg-white shadow-sm transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-ambient-drift",
        className,
      )}
    >
      <Link
        href={productUrl}
        className="relative block h-40 w-full overflow-hidden bg-neutral-surface"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageIcon className="size-9 text-muted-foreground/40" />
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col h-[calc(100%-10rem)]">
        <div className="mb-2">
          {isAvailable ? (
            <span className="inline-block rounded bg-arctic-blue px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-steel">
              Tersedia
            </span>
          ) : (
            <span className="inline-block rounded bg-destructive/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
              Habis
            </span>
          )}
        </div>

        <Link href={productUrl}>
          <h4 className="line-clamp-2 font-heading text-lg font-bold text-navy-steel transition-colors group-hover:opacity-80 sm:text-xl">
            {product.name}
          </h4>
        </Link>

        {merchantName && (
          <p className="mb-3 mt-1 truncate text-sm text-muted-foreground">
            {merchantName}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-heading text-lg font-semibold text-navy-steel sm:text-xl">
            {formatCurrency(product.price)}
          </span>

          <Link
            href={productUrl}
            aria-label={`Lihat ${product.name}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-steel text-white shadow-md transition-transform hover:scale-105 active:scale-95 sm:size-12"
          >
            <Plus className="size-5 sm:size-6" />
          </Link>
        </div>
      </div>
    </article>
  );
}