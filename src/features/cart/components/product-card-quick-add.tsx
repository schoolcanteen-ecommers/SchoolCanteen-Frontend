"use client";

import {
  Check,
  Plus,
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

interface ProductCardQuickAddProps {
  productId: string;

  /*
   * Dipertahankan untuk kompatibilitas
   * ProductCard existing.
   */
  productName?: string;

  stock: number;

  disabled?: boolean;

  requiresCustomization?: boolean;
}

export function ProductCardQuickAdd({
  productId,
  stock,
  disabled = false,
  requiresCustomization = false,
}: ProductCardQuickAddProps) {
  const {
    addItem,
    getProductQuantity,
    isHydrated,
  } = useCart();

  const [
    customizationOpen,
    setCustomizationOpen,
  ] =
    useState(false);

  const [
    justAdded,
    setJustAdded,
  ] =
    useState(false);

  const quantity =
    getProductQuantity(
      productId,
    );

  const reachedStock =
    quantity >= stock;

  const isDisabled =
    disabled ||
    !isHydrated ||
    stock <= 0 ||
    reachedStock;

  function showAddedState() {
    setJustAdded(true);

    window.setTimeout(
      () => {
        setJustAdded(
          false,
        );
      },
      650,
    );
  }

  function handleQuickAdd() {
    if (isDisabled) {
      return;
    }

    if (
      requiresCustomization
    ) {
      setCustomizationOpen(
        true,
      );

      return;
    }

    /*
     * Tanpa modifier wajib:
     *
     * - no modifier
     * - optional-only modifier
     *
     * langsung masuk default line.
     */
    addItem(
      productId,
      1,
    );

    showAddedState();
  }

  return (
    <>
      <button
        type="button"
        aria-label={
          requiresCustomization
            ? "Pilih variasi produk"
            : "Tambah ke keranjang"
        }
        disabled={
          isDisabled
        }
        onClick={(
          event,
        ) => {
          event.preventDefault();
          event.stopPropagation();

          handleQuickAdd();
        }}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-steel text-white shadow-sm transition hover:bg-navy-steel/90 disabled:cursor-not-allowed disabled:opacity-40 sm:size-12"
      >
        {justAdded ? (
          <Check className="size-5 sm:size-6" />
        ) : requiresCustomization ? (
          <SlidersHorizontal className="size-[17px] sm:size-5" />
        ) : (
          <Plus className="size-5 sm:size-6" />
        )}
      </button>

      <ProductCustomizationSheet
        productId={
          productId
        }
        stock={stock}
        open={
          customizationOpen
        }
        onOpenChange={
          setCustomizationOpen
        }
        onAdded={
          showAddedState
        }
      />
    </>
  );
}
