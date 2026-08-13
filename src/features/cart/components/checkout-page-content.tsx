"use client";

import Link from "next/link";

import { useEffect, useMemo, useState } from "react";

import {
  CheckCircle2,
  ChevronLeft,
  Clock3,
  ImageIcon,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

import { useCart } from "@/features/cart/use-cart";

import { getCartProduct } from "@/lib/api/catalog";

import { formatCurrency } from "@/lib/utils";

import { pickupSlots } from "@/mocks/pickup-slots";
import { studentWallet } from "@/mocks/wallet";

import type { CheckoutMerchantGroup } from "@/types/checkout";
import type { Product } from "@/types/product";
import type { Merchant } from "@/types/merchant";

interface ResolvedCheckoutItem {
  productId: string;
  quantity: number;

  product: Product;

  merchant: Pick<Merchant, "id" | "name" | "type">;
}

interface ResolvedCheckoutMerchantGroup extends CheckoutMerchantGroup {
  merchantType: Merchant["type"];
}

export function CheckoutPageContent() {
  const { items, isHydrated, removeItem } = useCart();

  const [resolvedItems, setResolvedItems] = useState<ResolvedCheckoutItem[]>(
    [],
  );

  const [isResolving, setIsResolving] = useState(true);

  const [selectedPickupSlots, setSelectedPickupSlots] = useState<
    Record<string, string>
  >({});

  /*
   * Resolve product ID dari cart
   * menggunakan backend API.
   *
   * Cart hanya menyimpan:
   * {
   *   productId,
   *   quantity
   * }
   *
   * Nama, harga, stok, merchant,
   * dan data lainnya tetap berasal
   * dari backend.
   */
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    async function resolveCheckoutItems() {
      setIsResolving(true);

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
            merchant: data.merchant,
          };
        }),
      );

      if (cancelled) {
        return;
      }

      const validItems: ResolvedCheckoutItem[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          validItems.push(result.value);

          return;
        }

        /*
         * Product yang sudah tidak
         * tersedia di backend dibuang
         * dari cart supaya cart state,
         * checkout, badge, dan
         * localStorage tetap sinkron.
         */
        const invalidItem = items[index];

        if (invalidItem) {
          removeItem(invalidItem.productId);
        }
      });

      setResolvedItems(validItems);
      setIsResolving(false);
    }

    void resolveCheckoutItems();

    return () => {
      cancelled = true;
    };
  }, [items, isHydrated, removeItem]);

  /*
   * Group product berdasarkan merchant.
   */
  const groups = useMemo<ResolvedCheckoutMerchantGroup[]>(() => {
    const result: ResolvedCheckoutMerchantGroup[] = [];

    for (const item of resolvedItems) {
      const merchantId = item.merchant.id;

      const existingGroup = result.find(
        (group) => group.merchantId === merchantId,
      );

      if (existingGroup) {
        existingGroup.items.push({
          product: item.product,
          quantity: item.quantity,
        });

        existingGroup.subtotal += item.product.price * item.quantity;

        continue;
      }

      result.push({
        merchantId,
        merchantName: item.merchant.name,
        merchantType: item.merchant.type,

        items: [
          {
            product: item.product,
            quantity: item.quantity,
          },
        ],

        subtotal: item.product.price * item.quantity,
      });
    }

    return result;
  }, [resolvedItems]);

  /*
   * Total checkout dihitung dari
   * harga produk terbaru yang
   * diperoleh dari backend.
   */
  const total = useMemo(
    () => groups.reduce((sum, group) => sum + group.subtotal, 0),
    [groups],
  );

  /*
   * Wallet masih MOCK.
   *
   * Jangan diganti ke endpoint
   * buatan sendiri sampai backend
   * memberikan contract wallet
   * sebenarnya.
   */
  const hasEnoughBalance = studentWallet.balance >= total;

  const allPickupSlotsSelected =
    groups.length > 0 &&
    groups.every((group) => Boolean(selectedPickupSlots[group.merchantId]));

  const canSubmit =
    groups.length > 0 && hasEnoughBalance && allPickupSlotsSelected;

  function selectPickupSlot(merchantId: string, slotId: string) {
    setSelectedPickupSlots((current) => ({
      ...current,
      [merchantId]: slotId,
    }));
  }

  function handleSubmitOrder() {
    if (!canSubmit) {
      return;
    }

    const checkoutPayload = {
      merchants: groups.map((group) => ({
        merchantId: group.merchantId,

        pickupSlotId: selectedPickupSlots[group.merchantId],

        items: group.items.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        })),

        subtotal: group.subtotal,
      })),

      total,
    };

    /*
     * Order API belum memiliki
     * contract final.
     *
     * Jangan membuat order palsu.
     */
    console.log("Checkout payload:", checkoutPayload);
  }

  /*
   * Loading:
   *
   * 1. localStorage belum hydrated
   * 2. product backend sedang
   *    di-resolve.
   */
  if (!isHydrated || isResolving) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-muted" />

          <div className="h-4 w-80 max-w-full rounded bg-muted" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="h-96 rounded-2xl bg-muted" />

            <div className="h-72 rounded-2xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  /*
   * Empty cart.
   */
  if (resolvedItems.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-4 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Tidak ada item untuk checkout"
          description="Tambahkan produk ke keranjang terlebih dahulu sebelum melanjutkan checkout."
          action={
            <Button nativeButton={false} render={<Link href="/kantin" />}>
              Lihat Kantin
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Back Navigation */}
      <Link
        href="/keranjang"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Kembali ke Keranjang
      </Link>

      {/* Header */}
      <div className="mt-5">
        <PageHeader
          title="Checkout"
          description="Periksa kembali pesanan, tentukan waktu pengambilan, dan pastikan saldo wallet mencukupi."
        />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Orders */}
        <div className="space-y-6">
          {groups.map((group) => {
            const isCanteen = group.merchantType === "CANTEEN";

            const MerchantIcon = isCanteen ? Store : ShoppingBag;

            return (
              <section
                key={group.merchantId}
                className="overflow-hidden rounded-2xl border bg-background"
              >
                {/* Merchant Header */}
                <div className="flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MerchantIcon className="size-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {isCanteen ? "Kantin" : "Koperasi"}
                      </p>

                      <h2 className="truncate font-semibold">
                        {group.merchantName}
                      </h2>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">Subtotal</p>

                    <p className="mt-0.5 font-semibold">
                      {formatCurrency(group.subtotal)}
                    </p>
                  </div>
                </div>

                {/* Product List */}
                <div className="divide-y">
                  {group.items.map(({ product, quantity }) => (
                    <article
                      key={product.id}
                      className="flex gap-4 px-5 py-4 sm:px-6"
                    >
                      {/* Product Image */}
                      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="size-6 text-muted-foreground/40" />
                        )}
                      </div>

                      {/* Product Information */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{product.name}</p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatCurrency(product.price)} × {quantity}
                        </p>

                        <p className="mt-2 text-sm font-semibold sm:hidden">
                          {formatCurrency(product.price * quantity)}
                        </p>
                      </div>

                      {/* Product Subtotal */}
                      <p className="hidden shrink-0 font-semibold sm:block">
                        {formatCurrency(product.price * quantity)}
                      </p>
                    </article>
                  ))}
                </div>

                {/* Pickup Section */}
                <div className="border-t bg-muted/20 px-5 py-5 sm:px-6">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Clock3 className="size-4 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        Waktu Pengambilan
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Pilih waktu pengambilan pesanan dari merchant ini.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {pickupSlots.map((slot) => {
                      const selected =
                        selectedPickupSlots[group.merchantId] === slot.id;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() =>
                            selectPickupSlot(group.merchantId, slot.id)
                          }
                          className={`relative rounded-xl border p-3 text-left transition-colors ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "bg-background hover:border-primary/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium">
                                {slot.label}
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {slot.time}
                              </p>
                            </div>

                            {selected && (
                              <CheckCircle2 className="size-4 shrink-0 text-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Checkout Summary */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          {/* Wallet */}
          <section className="rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <WalletCards className="size-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Saldo Wallet</p>

                <p className="mt-0.5 text-xl font-semibold">
                  {formatCurrency(studentWallet.balance)}
                </p>
              </div>
            </div>

            {hasEnoughBalance ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                Saldo mencukupi untuk pembayaran
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Saldo tidak mencukupi
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Kamu membutuhkan tambahan saldo sebesar{" "}
                  <span className="font-medium text-foreground">
                    {formatCurrency(total - studentWallet.balance)}
                  </span>
                  .
                </p>

                <Button
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  render={<Link href="/student/wallet" />}
                >
                  Buka Wallet
                </Button>
              </div>
            )}
          </section>

          {/* Payment Summary */}
          <section className="rounded-2xl border bg-background p-5">
            <h2 className="text-lg font-semibold">Ringkasan Pembayaran</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Jumlah merchant</span>

                <span className="font-medium">{groups.length}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Subtotal</span>

                <span className="font-medium">{formatCurrency(total)}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Biaya layanan</span>

                <span className="font-medium">Rp0</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-semibold">Total Pembayaran</span>

                  <span className="text-xl font-semibold text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="mt-6 w-full"
              disabled={!canSubmit}
              onClick={handleSubmitOrder}
            >
              Bayar dengan Wallet
            </Button>

            {!allPickupSlotsSelected ? (
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Pilih waktu pengambilan untuk setiap merchant sebelum
                melanjutkan.
              </p>
            ) : !hasEnoughBalance ? (
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Saldo wallet belum mencukupi untuk pembayaran.
              </p>
            ) : (
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Periksa kembali pesanan sebelum melakukan pembayaran.
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}