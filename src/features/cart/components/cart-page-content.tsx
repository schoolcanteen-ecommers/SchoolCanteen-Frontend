"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  ImageIcon,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCart } from "@/features/cart/use-cart";

import { formatCurrency } from "@/lib/utils";

import { getCartProduct } from "@/lib/api/catalog";

import type { Product } from "@/types/product";

interface ResolvedCartItem {
  productId: string;
  quantity: number;

  product: Product;

  merchantName: string;
}

interface MerchantCartGroup {
  merchantId: string;
  merchantName: string;
  items: ResolvedCartItem[];
}

export function CartPageContent() {
  const { items, isHydrated, removeItem, updateQuantity, clearCart } =
    useCart();

  const [resolvedItems, setResolvedItems] = useState<ResolvedCartItem[]>([]);

  const [isResolving, setIsResolving] = useState(true);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    async function resolveCartItems() {
      if (items.length === 0) {
        setResolvedItems([]);
        setIsResolving(false);
        return;
      }

      const results = await Promise.allSettled(
        items.map(async (item) => {
          const data = await getCartProduct(item.productId);

          return {
            ...item,
            product: data.product,
            merchantName: data.merchant.name,
          };
        }),
      );

      if (cancelled) {
        return;
      }

      const validItems: ResolvedCartItem[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          validItems.push(result.value);

          return;
        }
        const invalidItem = items[index];

        if (invalidItem) {
          removeItem(invalidItem.productId);
        }
      });

      setResolvedItems(validItems);
      setIsResolving(false);
    }

    void resolveCartItems();

    return () => {
      cancelled = true;
    };
  }, [items, isHydrated, removeItem]);

  if (!isHydrated || isResolving) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-72 rounded bg-muted" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <div className="h-48 rounded-2xl bg-muted" />
              <div className="h-48 rounded-2xl bg-muted" />
            </div>

            <div className="h-64 rounded-2xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  const groups = resolvedItems.reduce<MerchantCartGroup[]>(
    (currentGroups, item) => {
      const merchantId = item.product.merchantId;

      const existingGroup = currentGroups.find(
        (group) => group.merchantId === merchantId,
      );

      if (existingGroup) {
        existingGroup.items.push(item);

        return currentGroups;
      }

      currentGroups.push({
        merchantId,
        merchantName: item.merchantName,
        items: [item],
      });

      return currentGroups;
    },
    [],
  );

  const subtotal = resolvedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = resolvedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (resolvedItems.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <ShoppingCart className="size-7 text-primary" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Keranjang masih kosong
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Tambahkan makanan dari kantin atau kebutuhan sekolah dari koperasi
            terlebih dahulu.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button nativeButton={false} render={<Link href="/kantin" />}>
              Jelajahi Kantin
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/koperasi" />}
            >
              Lihat Koperasi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <ShoppingBag className="size-4" />
            Keranjang Belanja
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pesanan kamu
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {totalQuantity} item dari {groups.length} merchant
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="self-start text-destructive hover:text-destructive sm:self-auto"
          onClick={clearCart}
        >
          <Trash2 className="size-4" />
          Kosongkan Keranjang
        </Button>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Cart Items */}
        <div className="space-y-6">
          {groups.map((group) => (
            <section
              key={group.merchantId}
              className="overflow-hidden rounded-2xl border bg-background"
            >
              {/* Merchant Header */}
              <div className="border-b px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Merchant
                </p>

                <h2 className="mt-1 font-semibold">{group.merchantName}</h2>
              </div>

              {/* Items */}
              <div className="divide-y">
                {group.items.map(({ product, quantity }) => {
                  const itemSubtotal = product.price * quantity;

                  const canDecrease = quantity > 1;

                  const canIncrease = quantity < product.stock;

                  return (
                    <article key={product.id} className="flex gap-4 p-4 sm:p-5">
                      {/* Image */}
                      <Link
                        href={`/produk/${product.id}`}
                        className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted sm:size-28"
                      >
                        {product.imageUrl ? (
                         
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="size-7 text-muted-foreground/40" />
                        )}
                      </Link>

                      {/* Content */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/produk/${product.id}`}
                              className="line-clamp-2 font-semibold transition-colors hover:text-primary"
                            >
                              {product.name}
                            </Link>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {formatCurrency(product.price)} / item
                            </p>
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Hapus ${product.name}`}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(product.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>

                        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
                          {/* Quantity */}
                          <div>
                            <p className="mb-1.5 text-xs text-muted-foreground">
                              Jumlah
                            </p>

                            <div className="inline-flex items-center rounded-xl border">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-9 rounded-r-none"
                                disabled={!canDecrease}
                                onClick={() =>
                                  updateQuantity(product.id, quantity - 1)
                                }
                              >
                                <Minus className="size-4" />
                              </Button>

                              <span className="flex min-w-10 items-center justify-center text-sm font-semibold">
                                {quantity}
                              </span>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-9 rounded-l-none"
                                disabled={!canIncrease}
                                onClick={() =>
                                  updateQuantity(product.id, quantity + 1)
                                }
                              >
                                <Plus className="size-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="sm:text-right">
                            <p className="text-xs text-muted-foreground">
                              Subtotal
                            </p>

                            <p className="mt-1 font-semibold">
                              {formatCurrency(itemSubtotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border bg-background p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Total item</span>

              <span className="font-medium">{totalQuantity}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Merchant</span>

              <span className="font-medium">{groups.length}</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-end justify-between gap-4">
                <span className="font-medium">Total</span>

                <span className="text-xl font-semibold text-primary">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>
          </div>

          <Button
            nativeButton={false}
            size="lg"
            className="mt-6 w-full"
            render={<Link href="/student/checkout" />}
          >
            Lanjut Checkout
          </Button>

          <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
            Lanjutkan untuk memilih waktu pengambilan dan pembayaran.
          </p>

          <div className="mt-5 border-t pt-5">
            <Link
              href="/kantin"
              className="block text-center text-sm font-medium text-primary hover:underline"
            >
              Lanjut Belanja
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
