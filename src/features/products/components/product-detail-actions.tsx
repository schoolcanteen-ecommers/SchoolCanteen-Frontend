"use client";

<<<<<<< HEAD
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/features/cart/use-cart";
import { Button } from "@/components/ui/button";
=======
import {
  Minus,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  ProductCustomizationSheet,
} from "@/features/cart/components/product-customization-sheet";

import {
  useCart,
} from "@/features/cart/use-cart";
>>>>>>> source/main

interface ProductDetailActionsProps {
  productId: string;
  stock: number;
<<<<<<< HEAD
  isAvailable: boolean;
=======

  isAvailable: boolean;

  hasModifiers?: boolean;
  requiresCustomization?: boolean;
>>>>>>> source/main
}

export function ProductDetailActions({
  productId,
  stock,
  isAvailable,
<<<<<<< HEAD
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
=======
  hasModifiers = false,
  requiresCustomization = false,
}: ProductDetailActionsProps) {
  const {
    addItem,
    getProductQuantity,
    isHydrated,
  } = useCart();

  const [
    quantity,
    setQuantity,
  ] =
    useState(1);

  const [
    customizationOpen,
    setCustomizationOpen,
  ] =
    useState(false);

  const quantityInCart =
    getProductQuantity(
      productId,
    );

  const remainingStock =
    Math.max(
      stock -
        quantityInCart,
      0,
    );

  const maxQuantity =
    Math.max(
      Math.min(
        remainingStock,
        stock,
      ),
      1,
    );

  const canAdd =
    isHydrated &&
    isAvailable &&
    remainingStock >=
      quantity;

  function decrease() {
    setQuantity(
      (current) =>
        Math.max(
          1,
          current - 1,
        ),
    );
  }

  function increase() {
    setQuantity(
      (current) =>
        Math.min(
          maxQuantity,
          current + 1,
        ),
    );
  }

  function handleAdd() {
    if (!canAdd) {
      return;
    }

    /*
     * Di halaman detail, optional
     * modifier juga boleh dipilih.
     *
     * Quick Add tetap instant untuk
     * optional-only.
     */
    if (
      hasModifiers ||
      requiresCustomization
    ) {
      setCustomizationOpen(
        true,
      );

      return;
    }

    addItem(
      productId,
      quantity,
    );

    setQuantity(1);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 items-center rounded-[13px] border border-[#DCE8F0] bg-white">
            <button
              type="button"
              aria-label="Kurangi jumlah"
              disabled={
                quantity <= 1
              }
              onClick={
                decrease
              }
              className="flex size-11 items-center justify-center text-navy-steel disabled:opacity-35"
            >
              <Minus className="size-4" />
            </button>

            <span className="min-w-10 text-center font-heading text-base font-bold text-navy-steel">
              {quantity}
            </span>

            <button
              type="button"
              aria-label="Tambah jumlah"
              disabled={
                quantity >=
                  maxQuantity ||
                remainingStock <= 0
              }
              onClick={
                increase
              }
              className="flex size-11 items-center justify-center text-navy-steel disabled:opacity-35"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            disabled={
              !canAdd
            }
            onClick={
              handleAdd
            }
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[13px] bg-navy-steel px-5 text-sm font-bold text-white transition hover:bg-navy-steel/90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {hasModifiers ? (
              <SlidersHorizontal className="size-[18px]" />
            ) : (
              <ShoppingCart className="size-[18px]" />
            )}

            {!isAvailable
              ? "Produk Habis"
              : remainingStock <=
                  0
                ? "Stok sudah di keranjang"
                : hasModifiers
                  ? requiresCustomization
                    ? "Pilih & Tambahkan"
                    : "Atur Pilihan"
                  : "Tambah ke Keranjang"}
          </button>
        </div>

        {quantityInCart > 0 && (
          <p className="text-xs text-[#66737C]">
            {quantityInCart} item produk ini sudah ada di keranjang.
          </p>
        )}
      </div>

      <ProductCustomizationSheet
        productId={
          productId
        }
        stock={stock}
        quantity={
          quantity
        }
        open={
          customizationOpen
        }
        onOpenChange={
          setCustomizationOpen
        }
        onAdded={() => {
          setQuantity(1);
        }}
      />
    </>
  );
}
>>>>>>> source/main
