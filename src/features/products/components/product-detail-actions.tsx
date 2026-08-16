"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/features/cart/use-cart";
import { Button } from "@/components/ui/button";

interface ProductDetailActionsProps {
  productId: string;
  stock: number;
  isAvailable: boolean;
}

export function ProductDetailActions({
  productId,
  stock,
  isAvailable,
}: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, getItemQuantity, isHydrated } = useCart();

  const currentCartQty = getItemQuantity(productId);
  const reachedStock = currentCartQty + quantity > stock;

  const isDisabled = !isAvailable || stock <= 0 || reachedStock || !isHydrated;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (isDisabled) return;
    addItem(productId, quantity);
  };

  return (
    <div className="flex items-center gap-3 md:gap-4 w-full">
      
      <div className="flex items-center justify-between bg-neutral-surface border border-arctic-blue rounded-xl h-[48px] px-2 min-w-[100px] md:h-[52px] md:px-4 md:min-w-[120px]">
        <button 
          onClick={handleDecrease}
          disabled={quantity <= 1 || !isAvailable}
          aria-label="Kurangi jumlah"
          className="text-navy-steel disabled:opacity-50 hover:opacity-70 transition-colors flex items-center justify-center p-2"
        >
          <Minus className="size-4 md:size-5" />
        </button>
        <span className="font-sans text-navy-steel text-base md:text-lg font-bold">
          {isAvailable ? quantity : 0}
        </span>
        <button 
          onClick={handleIncrease}
          disabled={quantity >= stock || !isAvailable}
          aria-label="Tambah jumlah"
          className="text-navy-steel disabled:opacity-50 hover:opacity-70 transition-colors flex items-center justify-center p-2"
        >
          <Plus className="size-4 md:size-5" />
        </button>
      </div>

      
      <div className="flex-1">
        <Button
          type="button"
          size="lg"
          className="w-full bg-navy-steel text-white h-[48px] md:h-[52px] rounded-xl font-sans font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
          disabled={isDisabled}
          onClick={handleAddToCart}
        >
          {currentCartQty > 0 ? (
            <>
              <Check className="size-4" />
              {reachedStock ? `Stok Maksimal (${stock})` : `Tambah Lagi (${quantity})`}
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" />
              Tambah ke Keranjang
            </>
          )}
        </Button>
      </div>
    </div>
  );
}