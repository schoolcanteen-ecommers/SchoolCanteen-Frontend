import Link from "next/link";
import {
  ArrowRight,
  ImageIcon,
  Package,
} from "lucide-react";

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
  const isAvailable =
    product.isActive && product.stock > 0;

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border bg-background transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      {}
      <Link
        href={`/produk/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        {product.imageUrl ? (
         
         
         
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageIcon className="size-9 text-muted-foreground/40" />
          </div>
        )}

        {}
        <div className="absolute left-3 top-3">
          {isAvailable ? (
            <span className="inline-flex items-center rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur">
              Tersedia
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-destructive px-2.5 py-1 text-[11px] font-medium text-destructive-foreground shadow-sm">
              Habis
            </span>
          )}
        </div>
      </Link>

      {}
      <div className="p-4">
        {merchantName && (
          <p className="mb-1 truncate text-xs font-medium text-muted-foreground">
            {merchantName}
          </p>
        )}

        <Link href={`/produk/${product.id}`}>
          <h3 className="line-clamp-2 text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {product.description}
          </p>
        )}

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {formatCurrency(product.price)}
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Package className="size-3.5" />

              <span>
                Stok {product.stock}
              </span>
            </div>
          </div>

          <Link
            href={`/produk/${product.id}`}
            aria-label={`Lihat ${product.name}`}
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5"
          >
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}