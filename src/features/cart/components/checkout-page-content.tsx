"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

import { EmptyState } from "@/components/shared/empty-state";

import { CheckoutMobilePaymentBar } from "@/features/cart/components/checkout/checkout-mobile-payment-bar";
import { CheckoutOrderSection } from "@/features/cart/components/checkout/checkout-order-section";
import { CheckoutPaymentSummary } from "@/features/cart/components/checkout/checkout-payment-summary";
import { CheckoutPickupSection } from "@/features/cart/components/checkout/checkout-pickup-section";
import { CheckoutProgress } from "@/features/cart/components/checkout/checkout-progress";
import { useCart } from "@/features/cart/use-cart";

import { authenticatedApiRequest } from "@/lib/api/authenticated-client";
import { getCartProduct } from "@/lib/api/catalog";

import type { CheckoutMerchantGroup } from "@/types/checkout";
import type { Merchant } from "@/types/merchant";
import type { Product } from "@/types/product";

interface ResolvedCheckoutItem {
  productId: string;
  quantity: number;

  product: Product;

  merchant: Pick<Merchant, "id" | "name" | "type">;
}

interface ResolvedCheckoutMerchantGroup extends CheckoutMerchantGroup {
  merchantType: Merchant["type"];
=======

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertTriangle,
  ShoppingBag,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import {
  CheckoutMobilePaymentBar,
} from "@/features/cart/components/checkout/checkout-mobile-payment-bar";

import {
  CheckoutOrderSection,
} from "@/features/cart/components/checkout/checkout-order-section";

import {
  CheckoutPaymentSummary,
} from "@/features/cart/components/checkout/checkout-payment-summary";

import {
  CheckoutPickupSection,
} from "@/features/cart/components/checkout/checkout-pickup-section";

import {
  CheckoutProgress,
} from "@/features/cart/components/checkout/checkout-progress";

import {
  useCart,
} from "@/features/cart/use-cart";

import {
  useResolvedCartLines,
  type ResolvedCartLine,
} from "@/features/cart/use-resolved-cart-lines";

import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

import type {
  Merchant,
} from "@/types/merchant";

interface ResolvedCheckoutMerchantGroup {
  merchantId: string;
  merchantName: string;

  merchantType:
    Merchant["type"];

  items:
    ResolvedCartLine[];

  subtotal: number;
>>>>>>> source/main
}

interface StudentWalletResponse {
  id: string;
<<<<<<< HEAD
  balance: number;
  is_active: boolean;
=======

  balance: number;
  is_active: boolean;

>>>>>>> source/main
  updated_at: string;
}

interface CreateOrderResponse {
  order_id: string;
  order_code: string;
<<<<<<< HEAD
  status: string;

  merchant: {
    id: string;
    name: string;
  };

  pickup_slot_id: string | null;

  items: Array<{
    product_id: string;
    product_name: string;
    unit_price: number;
    quantity: number;
    subtotal: number;
  }>;

  total_amount: number;
  remaining_balance: number;

  pickup: {
    token: string;
    code: string;
    status: string;
  };

  notes: string | null;
  created_at: string;
}

export function CheckoutPageContent() {
  const router = useRouter();

  const { items, isHydrated, removeItem } = useCart();

  const [resolvedItems, setResolvedItems] = useState<ResolvedCheckoutItem[]>(
    [],
  );

  const [wallet, setWallet] = useState<StudentWalletResponse | null>(null);
  const [merchantNotes, setMerchantNotes] = useState<Record<string, string>>(
    {},
  );

  const [isResolving, setIsResolving] = useState(true);
  const [isLoadingWallet, setIsLoadingWallet] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [walletError, setWalletError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    async function loadWallet() {
      setIsLoadingWallet(true);
      setWalletError(null);

      try {
        const data = await authenticatedApiRequest<StudentWalletResponse>(
          "/student/wallet",
          {
            cache: "no-store",
          },
        );

        if (cancelled) {
          return;
        }

        setWallet(data);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setWallet(null);

        setWalletError(
          error instanceof Error ? error.message : "Wallet gagal dimuat.",
        );
      } finally {
        if (!cancelled) {
          setIsLoadingWallet(false);
        }
      }
    }

    void loadWallet();

    return () => {
      cancelled = true;
    };
  }, [isHydrated]);

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

  const total = useMemo(
    () => groups.reduce((sum, group) => sum + group.subtotal, 0),
    [groups],
  );

  const walletBalance = wallet?.balance ?? 0;

  const hasEnoughBalance =
    wallet !== null && wallet.is_active && walletBalance >= total;
=======

  status: string;

  total_amount: number;
  remaining_balance: number;
}

export function CheckoutPageContent() {
  const router =
    useRouter();

  const {
    items,
    removeLine,
  } =
    useCart();

  const {
    lines,
    isHydrated,
    isResolving,
    resolveFailed,
    canCheckout,
    totalPreview,
    retry,
  } =
    useResolvedCartLines();

  const [
    wallet,
    setWallet,
  ] =
    useState<
      StudentWalletResponse | null
    >(null);

  const [
    merchantNotes,
    setMerchantNotes,
  ] =
    useState<
      Record<
        string,
        string
      >
    >({});

  const [
    isLoadingWallet,
    setIsLoadingWallet,
  ] =
    useState(true);

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const [
    walletError,
    setWalletError,
  ] =
    useState<
      string | null
    >(null);

  const [
    checkoutError,
    setCheckoutError,
  ] =
    useState<
      string | null
    >(null);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    async function loadWallet() {
      setIsLoadingWallet(
        true,
      );

      setWalletError(
        null,
      );

      try {
        const data =
          await authenticatedApiRequest<StudentWalletResponse>(
            "/student/wallet",
            {
              cache:
                "no-store",
            },
          );

        if (cancelled) {
          return;
        }

        setWallet(
          data,
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        setWallet(
          null,
        );

        setWalletError(
          error instanceof Error
            ? error.message
            : "Wallet gagal dimuat.",
        );
      } finally {
        if (!cancelled) {
          setIsLoadingWallet(
            false,
          );
        }
      }
    }

    void loadWallet();

    return () => {
      cancelled = true;
    };
  }, [
    isHydrated,
  ]);

  const groups =
    useMemo<
      ResolvedCheckoutMerchantGroup[]
    >(() => {
      const result:
        ResolvedCheckoutMerchantGroup[] =
        [];

      for (
        const line
        of lines
      ) {
        if (
          !line.product ||
          !line.merchant
        ) {
          continue;
        }

        const existing =
          result.find(
            (group) =>
              group.merchantId ===
              line.merchant!.id,
          );

        if (existing) {
          existing.items.push(
            line,
          );

          existing.subtotal +=
            line.subtotal;

          continue;
        }

        result.push({
          merchantId:
            line.merchant.id,

          merchantName:
            line.merchant.name,

          merchantType:
            line.merchant.type,

          items: [
            line,
          ],

          subtotal:
            line.subtotal,
        });
      }

      return result;
    }, [
      lines,
    ]);

  const walletBalance =
    wallet?.balance ??
    0;

  const hasEnoughBalance =
    wallet !== null &&
    wallet.is_active &&
    walletBalance >=
      totalPreview;
>>>>>>> source/main

  const canSubmit =
    canCheckout &&
    groups.length > 0 &&
    !isLoadingWallet &&
    wallet !== null &&
    wallet.is_active &&
    hasEnoughBalance &&
    !isSubmitting;

<<<<<<< HEAD
  function handleMerchantNoteChange(merchantId: string, value: string) {
    setMerchantNotes((current) => ({
      ...current,
      [merchantId]: value,
    }));
=======
  function handleMerchantNoteChange(
    merchantId: string,
    value: string,
  ) {
    setMerchantNotes(
      (current) => ({
        ...current,

        [merchantId]:
          value,
      }),
    );
>>>>>>> source/main
  }

  async function handleSubmitOrder() {
    if (!canSubmit) {
      return;
    }

<<<<<<< HEAD
    setCheckoutError(null);
    setIsSubmitting(true);

    const successfulProductIds: string[] = [];

    try {
      for (const group of groups) {
        const note = merchantNotes[group.merchantId]?.trim();
=======
    setCheckoutError(
      null,
    );

    setIsSubmitting(
      true,
    );

    const successfulLineIds:
      string[] = [];

    try {
      for (
        const group
        of groups
      ) {
        const merchantNote =
          merchantNotes[
            group.merchantId
          ]?.trim();
>>>>>>> source/main

        await authenticatedApiRequest<CreateOrderResponse>(
          "/student/orders",
          {
            method: "POST",

            body: {
<<<<<<< HEAD
              merchant_id: group.merchantId,
              pickup_slot_id: null,

              items: group.items.map(({ product, quantity }) => ({
                product_id: product.id,
                quantity,
              })),

              notes: note || null,
=======
              merchant_id:
                group.merchantId,

              pickup_slot_id:
                null,

              items:
                group.items.map(
                  (line) => ({
                    product_id:
                      line.productId,

                    quantity:
                      line.quantity,

                    modifier_option_ids:
                      line.modifierOptionIds,

                    notes:
                      line.note.trim() ||
                      null,
                  }),
                ),

              notes:
                merchantNote ||
                null,
>>>>>>> source/main
            },
          },
        );

<<<<<<< HEAD
        successfulProductIds.push(
          ...group.items.map(({ product }) => product.id),
        );
      }

      successfulProductIds.forEach((productId) => {
        removeItem(productId);
      });

      router.push("/student/orders");
    } catch (error) {
      successfulProductIds.forEach((productId) => {
        removeItem(productId);
      });
=======
        successfulLineIds.push(
          ...group.items.map(
            (line) =>
              line.lineId,
          ),
        );
      }

      successfulLineIds.forEach(
        (lineId) => {
          removeLine(
            lineId,
          );
        },
      );

      router.push(
        "/student/orders",
      );
    } catch (error) {
      /*
       * Merchant yang sudah berhasil
       * tetap dihapus dari cart.
       *
       * Merchant berikutnya yang gagal
       * tetap tersimpan.
       */
      successfulLineIds.forEach(
        (lineId) => {
          removeLine(
            lineId,
          );
        },
      );
>>>>>>> source/main

      setCheckoutError(
        error instanceof Error
          ? error.message
<<<<<<< HEAD
          : "Pesanan gagal dibuat. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isHydrated || isResolving) {
    return (
      <div className="mx-auto w-full max-w-[1200px] px-5 py-6 lg:px-10 lg:py-12">
        <div className="animate-pulse">
          <div className="h-10 w-44 rounded-lg bg-[#E6E8EA] lg:h-14 lg:w-56" />
          <div className="mt-3 h-5 w-72 max-w-full rounded bg-[#E6E8EA]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-6">
              <div className="h-80 rounded-2xl bg-white" />
              <div className="h-40 rounded-2xl bg-white" />
            </div>
=======
          : "Pesanan gagal dibuat. Periksa kembali stok dan pilihan produk.",
      );

      /*
       * Refresh snapshot cart setelah
       * 409 stock/modifier conflict.
       */
      retry();
    } finally {
      setIsSubmitting(
        false,
      );
    }
  }

  if (
    !isHydrated ||
    isResolving
  ) {
    return (
      <div className="mx-auto w-full max-w-[1200px] px-5 py-6 lg:px-10 lg:py-12">
        <div className="animate-pulse">
          <div className="h-10 w-44 rounded-lg bg-[#E6E8EA]" />

          <div className="mt-3 h-5 w-72 rounded bg-[#E6E8EA]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="h-80 rounded-2xl bg-white" />
>>>>>>> source/main
            <div className="h-96 rounded-[20px] bg-white" />
          </div>
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  if (resolvedItems.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-5 lg:px-10">
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
=======
  if (resolveFailed) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-[720px] items-center justify-center px-5">
        <div className="text-center">
          <ShoppingBag className="mx-auto size-9 text-muted-foreground/50" />

          <h1 className="mt-4 font-heading text-xl font-bold text-navy-steel">
            Checkout belum dapat dimuat
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Data produk gagal diperbarui.
          </p>

          <Button
            type="button"
            onClick={
              retry
            }
            className="mt-5"
          >
            Coba lagi
          </Button>
        </div>
      </div>
    );
  }

  if (
    items.length === 0
  ) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-5 lg:px-10">
        <EmptyState
          icon={
            ShoppingBag
          }
          title="Tidak ada item untuk checkout"
          description="Tambahkan produk ke keranjang terlebih dahulu sebelum melanjutkan checkout."
          action={
            <Button
              nativeButton={
                false
              }
              render={
                <Link href="/kantin" />
              }
            >
              Lihat Kantin
            </Button>
          }
        />
      </div>
    );
  }

  if (!canCheckout) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-[720px] items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <AlertTriangle className="size-6" />
          </div>

          <h1 className="mt-4 font-heading text-xl font-bold text-navy-steel">
            Keranjang perlu diperiksa
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Stok atau pilihan salah satu produk sudah berubah.
          </p>

          <Button
            nativeButton={
              false
            }
            className="mt-5 bg-navy-steel text-white"
            render={
              <Link href="/keranjang" />
            }
          >
            Kembali ke Keranjang
          </Button>
        </div>
>>>>>>> source/main
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 pb-36 pt-6 lg:px-10 lg:pb-20 lg:pt-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-heading text-[28px] font-bold leading-9 tracking-tight text-navy-steel lg:text-5xl lg:leading-[56px]">
            Checkout
          </h1>
<<<<<<< HEAD
          <p className="mt-2 font-sans text-base text-[#536069] lg:text-lg">
            Periksa pesananmu sebelum pembayaran.
          </p>
        </div>

=======

          <p className="mt-2 text-base text-[#536069] lg:text-lg">
            Periksa pesananmu sebelum pembayaran.
          </p>
        </div>

>>>>>>> source/main
        <CheckoutProgress />
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6 lg:space-y-8">
          <CheckoutOrderSection
<<<<<<< HEAD
            groups={groups}
            notes={merchantNotes}
            disabled={isSubmitting}
            onNoteChange={handleMerchantNoteChange}
=======
            groups={
              groups
            }
            notes={
              merchantNotes
            }
            disabled={
              isSubmitting
            }
            onNoteChange={
              handleMerchantNoteChange
            }
>>>>>>> source/main
          />

          <CheckoutPickupSection />
        </div>

        <aside className="lg:sticky lg:top-24">
          <CheckoutPaymentSummary
<<<<<<< HEAD
            total={total}
            walletBalance={wallet?.balance ?? null}
            isLoadingWallet={isLoadingWallet}
            walletIsActive={wallet?.is_active ?? false}
            hasEnoughBalance={hasEnoughBalance}
            walletError={walletError}
            checkoutError={checkoutError}
            canSubmit={canSubmit}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitOrder}
=======
            total={
              totalPreview
            }
            walletBalance={
              wallet?.balance ??
              null
            }
            isLoadingWallet={
              isLoadingWallet
            }
            walletIsActive={
              wallet?.is_active ??
              false
            }
            hasEnoughBalance={
              hasEnoughBalance
            }
            walletError={
              walletError
            }
            checkoutError={
              checkoutError
            }
            canSubmit={
              canSubmit
            }
            isSubmitting={
              isSubmitting
            }
            onSubmit={
              handleSubmitOrder
            }
>>>>>>> source/main
          />
        </aside>
      </div>

      <CheckoutMobilePaymentBar
<<<<<<< HEAD
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitOrder}
=======
        canSubmit={
          canSubmit
        }
        isSubmitting={
          isSubmitting
        }
        onSubmit={
          handleSubmitOrder
        }
>>>>>>> source/main
      />
    </div>
  );
}
