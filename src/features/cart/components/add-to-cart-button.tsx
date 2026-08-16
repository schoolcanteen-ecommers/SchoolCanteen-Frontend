"use client";

import {
  Check,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/use-cart";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  disabled?: boolean;
  className?: string;
  quantityToAdd?: number;
}

export function AddToCartButton({
  productId,
  stock,
  disabled = false,
  className,
  quantityToAdd = 1,
}: AddToCartButtonProps) {
  const {
    addItem,
    getItemQuantity,
    isHydrated,
  } = useCart();

  const quantity = getItemQuantity(productId);

 
  const reachedStock = quantity + quantityToAdd > stock;

  const isDisabled =
    disabled ||
    stock <= 0 ||
    reachedStock ||
    !isHydrated;

  function handleAddToCart() {
    if (isDisabled) {
      return;
    }

   
    addItem(productId, quantityToAdd); 
  }

  return (
    <Button
      type="button"
      size="lg"
      className={className}
      disabled={isDisabled}
      onClick={handleAddToCart}
    >
      {quantity > 0 ? (
        <>
          <Check className="size-4" />

          {reachedStock
            ? `Maksimal ${stock} di keranjang`
            : `Tambah Lagi (${quantity})`}
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" />
          Tambah ke Keranjang
        </>
      )}
    </Button>
  );
}