"use client";

import Link from "next/link";
<<<<<<< HEAD
import { usePathname } from "next/navigation";
import { ImageIcon, Plus } from "lucide-react";
=======

import {
  usePathname,
} from "next/navigation";

import {
  ImageIcon,
} from "lucide-react";
>>>>>>> source/main

import {
  ProductCardQuickAdd,
} from "@/features/cart/components/product-card-quick-add";

import {
  getOptimizedCloudinaryImageUrl,
} from "@/lib/cloudinary-image";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  Product,
} from "@/types/product";

interface ProductCardProps {
  product: Product;
  merchantName?: string;
  className?: string;

  source?:
    | "kantin"
    | "koperasi";
}

export function ProductCard({
  product,
  merchantName,
  className,
  source,
}: ProductCardProps) {
<<<<<<< HEAD
  const pathname = usePathname() || "";
  const isAvailable = product.isActive && product.stock > 0;

 
  const isKantin = pathname.includes("kantin");
  const isKoperasi = pathname.includes("koperasi");
  const sourceQuery = isKantin ? "?source=kantin" : isKoperasi ? "?source=koperasi" : "";
  const productUrl = `/produk/${product.id}${sourceQuery}`;
=======
  const pathname =
    usePathname() || "";

  const isAvailable =
    product.isActive &&
    product.stock > 0;

  const pathnameSource =
    pathname.includes(
      "kantin",
    )
      ? "kantin"
      : pathname.includes(
            "koperasi",
          )
        ? "koperasi"
        : undefined;

  const resolvedSource =
    source ??
    pathnameSource;

  const sourceQuery =
    resolvedSource
      ? `?source=${resolvedSource}`
      : "";

  const productUrl =
    `/produk/${product.id}${sourceQuery}`;
>>>>>>> source/main

  return (
    <article
      className={cn(
<<<<<<< HEAD
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
=======
        "group flex h-full flex-col overflow-hidden rounded-[16px] border border-arctic-blue bg-white shadow-sm transition-shadow duration-200 hover:shadow-ambient-drift",
        className,
      )}
    >
      {/* Main clickable product area */}
      <Link
        href={productUrl}
        prefetch={false}
        aria-label={`Lihat detail ${product.name}`}
        className="block"
      >
        <div className="relative h-[132px] w-full overflow-hidden bg-neutral-surface sm:h-40">
          {product.imageUrl ? (
            <img
              src={getOptimizedCloudinaryImageUrl(
                product.imageUrl,
                {
                  width: 480,
                  height: 320,
                },
              )}
              alt={
                product.name
              }
              width={480}
              height={320}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <ImageIcon className="size-9 text-muted-foreground/40" />
            </div>
          )}
        </div>

        <div className="px-3.5 pt-3.5 sm:px-5 sm:pt-5">
          <div className="mb-2">
            {isAvailable ? (
              <span className="inline-flex rounded bg-arctic-blue px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-steel">
                Tersedia
              </span>
            ) : (
              <span className="inline-flex rounded bg-destructive/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
                Habis
              </span>
            )}
          </div>

          <h3 className="line-clamp-2 font-heading text-[15px] font-bold leading-[1.25] text-navy-steel sm:text-xl">
            {product.name}
          </h3>

          {merchantName && (
            <p className="mb-2 mt-1 truncate text-[12px] text-muted-foreground sm:mb-3 sm:text-sm">
              {merchantName}
            </p>
>>>>>>> source/main
          )}
        </div>

<<<<<<< HEAD
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
=======
      {/* Price + independent quick-add */}
      <div className="mt-auto flex items-center justify-between gap-3 px-3.5 pb-3.5 pt-2 sm:px-5 sm:pb-5">
        <Link
          href={productUrl}
          prefetch={false}
          className="min-w-0 font-heading text-[15px] font-semibold text-navy-steel sm:text-xl"
        >
          {formatCurrency(
            product.price,
          )}
        </Link>

        <ProductCardQuickAdd
              requiresCustomization={
                Boolean(
                  product.requiresCustomization,
                )
              }
          productId={
            product.id
          }
          productName={
            product.name
          }
          stock={
            product.stock
          }
          disabled={
            !isAvailable
          }
        />
>>>>>>> source/main
      </div>
    </article>
  );
}
