"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/features/cart/use-cart";

const subscribeToClient = () => {
  return () => {};
};

function useHasMounted() {
  return useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
}

export function CartHeaderButton() {
  const hasMounted =
    useHasMounted();

  const {
    totalItems,
    isHydrated,
  } = useCart();

  return (
    <Link
            prefetch={false}
      href="/keranjang"
      aria-label="Keranjang"
      className="relative flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
    >
      <ShoppingCart className="size-5" />

      {hasMounted &&
        isHydrated &&
        totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-[18px] text-primary-foreground">
          {totalItems > 99
            ? "99+"
            : totalItems}
        </span>
      )}
    </Link>
  );
}