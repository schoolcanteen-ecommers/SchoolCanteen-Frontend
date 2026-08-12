"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/features/cart/use-cart";

export function CartHeaderButton() {
  const {
    totalItems,
    isHydrated,
  } = useCart();

  return (
    <Link
      href="/keranjang"
      aria-label="Keranjang"
      className="relative flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
    >
      <ShoppingCart className="size-5" />

      {isHydrated && totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-[18px] text-primary-foreground">
          {totalItems > 99
            ? "99+"
            : totalItems}
        </span>
      )}
    </Link>
  );
}