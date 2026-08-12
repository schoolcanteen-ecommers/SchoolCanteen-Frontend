"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Clock3,
  ImageIcon,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/use-cart";

import { formatCurrency } from "@/lib/utils";

import type {
  CheckoutMerchantGroup,
} from "@/types/checkout";

import { getMerchantById } from "@/mocks/merchants";
import { pickupSlots } from "@/mocks/pickup-slots";
import { getProductById } from "@/mocks/products";
import { studentWallet } from "@/mocks/wallet";

export function CheckoutPageContent() {
  const {
    items,
    isHydrated,
  } = useCart();

  const [selectedPickupSlots, setSelectedPickupSlots] =
    useState<Record<string, string>>({});

  const groups = useMemo<
    CheckoutMerchantGroup[]
  >(() => {
    const result: CheckoutMerchantGroup[] = [];

    for (const cartItem of items) {
      const product =
        getProductById(cartItem.productId);

      if (!product) {
        continue;
      }

      const merchant =
        getMerchantById(product.merchantId);

      const merchantId =
        merchant?.id ?? product.merchantId;

      const existingGroup = result.find(
        (group) =>
          group.merchantId === merchantId,
      );

      if (existingGroup) {
        existingGroup.items.push({
          product,
          quantity: cartItem.quantity,
        });

        existingGroup.subtotal +=
          product.price *
          cartItem.quantity;

        continue;
      }

      result.push({
        merchantId,
        merchantName:
          merchant?.name ?? "Merchant",
        items: [
          {
            product,
            quantity: cartItem.quantity,
          },
        ],
        subtotal:
          product.price *
          cartItem.quantity,
      });
    }

    return result;
  }, [items]);

  const total = useMemo(
    () =>
      groups.reduce(
        (sum, group) =>
          sum + group.subtotal,
        0,
      ),
    [groups],
  );

  const hasEnoughBalance =
    studentWallet.balance >= total;

  const allPickupSlotsSelected =
    groups.length > 0 &&
    groups.every(
      (group) =>
        Boolean(
          selectedPickupSlots[
            group.merchantId
          ],
        ),
    );

  const canSubmit =
    groups.length > 0 &&
    hasEnoughBalance &&
    allPickupSlotsSelected;

  function selectPickupSlot(
    merchantId: string,
    slotId: string,
  ) {
    setSelectedPickupSlots(
      (current) => ({
        ...current,
        [merchantId]: slotId,
      }),
    );
  }

  function handleSubmitOrder() {
    if (!canSubmit) {
      return;
    }

    const checkoutPayload = {
      merchants: groups.map(
        (group) => ({
          merchantId:
            group.merchantId,

          pickupSlotId:
            selectedPickupSlots[
              group.merchantId
            ],

          items: group.items.map(
            ({
              product,
              quantity,
            }) => ({
              productId:
                product.id,
              quantity,
            }),
          ),

          subtotal:
            group.subtotal,
        }),
      ),

      total,
    };

    /*
     * Belum membuat order palsu.
     *
     * Payload ini nanti dikirim ke
     * backend/order service setelah
     * authentication + API aktif.
     */
    console.log(
      "Checkout payload:",
      checkoutPayload,
    );
  }

  if (!isHydrated) {
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

  if (groups.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <ShoppingBag className="size-7 text-primary" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Tidak ada item untuk checkout
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tambahkan produk ke keranjang
          terlebih dahulu sebelum
          melanjutkan checkout.
        </p>

        <Button
          nativeButton={false}
          className="mt-6"
          render={
            <Link href="/kantin" />
          }
        >
          Lihat Kantin
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Header */}
      <div>
        <Link
          href="/keranjang"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Kembali ke Keranjang
        </Link>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Periksa kembali pesanan,
          tentukan waktu pengambilan,
          dan pastikan saldo wallet
          mencukupi.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Orders */}
        <div className="space-y-6">
          {groups.map((group) => {
            const merchant =
              getMerchantById(
                group.merchantId,
              );

            const isCanteen =
              merchant?.type ===
              "CANTEEN";

            const MerchantIcon =
              isCanteen
                ? Store
                : ShoppingBag;

            return (
              <section
                key={group.merchantId}
                className="overflow-hidden rounded-2xl border bg-background"
              >
                {/* Merchant */}
                <div className="flex items-center gap-3 border-b p-5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <MerchantIcon className="size-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Merchant
                    </p>

                    <h2 className="font-semibold">
                      {group.merchantName}
                    </h2>
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y">
                  {group.items.map(
                    ({
                      product,
                      quantity,
                    }) => (
                      <article
                        key={product.id}
                        className="flex gap-4 p-5"
                      >
                        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                          {product.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={
                                product.imageUrl
                              }
                              alt={
                                product.name
                              }
                              className="size-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="size-6 text-muted-foreground/40" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {quantity} ×{" "}
                            {formatCurrency(
                              product.price,
                            )}
                          </p>
                        </div>

                        <p className="shrink-0 font-semibold">
                          {formatCurrency(
                            product.price *
                              quantity,
                          )}
                        </p>
                      </article>
                    ),
                  )}
                </div>

                {/* Pickup */}
                <div className="border-t bg-muted/20 p-5">
                  <div className="flex items-center gap-2">
                    <Clock3 className="size-4 text-primary" />

                    <h3 className="text-sm font-semibold">
                      Waktu Pengambilan
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Pilih waktu pengambilan
                    untuk pesanan dari merchant
                    ini.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {pickupSlots.map(
                      (slot) => {
                        const selected =
                          selectedPickupSlots[
                            group
                              .merchantId
                          ] === slot.id;

                        return (
                          <button
                            key={
                              slot.id
                            }
                            type="button"
                            onClick={() =>
                              selectPickupSlot(
                                group.merchantId,
                                slot.id,
                              )
                            }
                            className={`rounded-xl border p-3 text-left transition-colors ${
                              selected
                                ? "border-primary bg-primary/5"
                                : "bg-background hover:border-primary/40"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium">
                                  {
                                    slot.label
                                  }
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                  {
                                    slot.time
                                  }
                                </p>
                              </div>

                              {selected && (
                                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                              )}
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t px-5 py-4">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    {formatCurrency(
                      group.subtotal,
                    )}
                  </span>
                </div>
              </section>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          {/* Wallet */}
          <div className="rounded-2xl border bg-background p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <WalletCards className="size-5 text-primary" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">
                  Saldo Wallet
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {formatCurrency(
                    studentWallet.balance,
                  )}
                </p>
              </div>
            </div>

            {!hasEnoughBalance && (
              <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Saldo tidak mencukupi
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Tambahkan saldo terlebih
                  dahulu untuk melanjutkan
                  pembayaran.
                </p>

                <Button
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  render={
                    <Link href="/student/wallet" />
                  }
                >
                  Top Up Wallet
                </Button>
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="rounded-2xl border bg-background p-5">
            <h2 className="text-lg font-semibold">
              Ringkasan Pembayaran
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Merchant
                </span>

                <span>
                  {groups.length}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span>
                  {formatCurrency(
                    total,
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  Biaya layanan
                </span>

                <span>
                  Rp0
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-end justify-between gap-4">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-semibold text-primary">
                    {formatCurrency(
                      total,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="mt-6 w-full"
              disabled={!canSubmit}
              onClick={
                handleSubmitOrder
              }
            >
              Bayar dengan Wallet
            </Button>

            {!allPickupSlotsSelected && (
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Pilih waktu pengambilan
                untuk setiap merchant.
              </p>
            )}

            {canSubmit && (
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                Konfirmasi akan dikirim
                ke backend ketika API order
                sudah terhubung.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}