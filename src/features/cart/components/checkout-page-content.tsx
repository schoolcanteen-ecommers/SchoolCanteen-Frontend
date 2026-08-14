"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import {
  CheckCircle2,
  ChevronLeft,
  ImageIcon,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

import { useCart } from "@/features/cart/use-cart";

import { authenticatedApiRequest } from "@/lib/api/authenticated-client";
import { getCartProduct } from "@/lib/api/catalog";

import { formatCurrency } from "@/lib/utils";

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
}

interface StudentWalletResponse {
  id: string;
  balance: number;
  is_active: boolean;
  updated_at: string;
}

interface CreateOrderResponse {
  order_id: string;
  order_code: string;
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
        const data =
          await authenticatedApiRequest<StudentWalletResponse>(
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
          error instanceof Error
            ? error.message
            : "Wallet gagal dimuat.",
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
    wallet !== null &&
    wallet.is_active &&
    walletBalance >= total;

  const canSubmit =
    groups.length > 0 &&
    !isLoadingWallet &&
    wallet !== null &&
    wallet.is_active &&
    hasEnoughBalance &&
    !isSubmitting;

  async function handleSubmitOrder() {
    if (!canSubmit) {
      return;
    }

    setCheckoutError(null);
    setIsSubmitting(true);

    const successfulProductIds: string[] = [];

    try {
      for (const group of groups) {
        await authenticatedApiRequest<CreateOrderResponse>(
          "/student/orders",
          {
            method: "POST",

            body: {
              merchant_id: group.merchantId,

              // Pickup slot sementara dilewati sampai endpoint
              // pickup slot dari backend tersedia.
              pickup_slot_id: null,

              items: group.items.map(({ product, quantity }) => ({
                product_id: product.id,
                quantity,
              })),

              notes: null,
            },
          },
        );

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

      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Pesanan gagal dibuat. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
      <Link
        href="/keranjang"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Kembali ke Keranjang
      </Link>

      <div className="mt-5">
        <PageHeader
          title="Checkout"
          description="Periksa kembali pesanan dan pastikan saldo wallet mencukupi sebelum melakukan pembayaran."
        />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {groups.map((group) => {
            const isCanteen = group.merchantType === "CANTEEN";

            const MerchantIcon = isCanteen ? Store : ShoppingBag;

            return (
              <section
                key={group.merchantId}
                className="overflow-hidden rounded-2xl border bg-background"
              >
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

                <div className="divide-y">
                  {group.items.map(({ product, quantity }) => (
                    <article
                      key={product.id}
                      className="flex gap-4 px-5 py-4 sm:px-6"
                    >
                      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="size-6 text-muted-foreground/40" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{product.name}</p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatCurrency(product.price)} × {quantity}
                        </p>

                        <p className="mt-2 text-sm font-semibold sm:hidden">
                          {formatCurrency(product.price * quantity)}
                        </p>
                      </div>

                      <p className="hidden shrink-0 font-semibold sm:block">
                        {formatCurrency(product.price * quantity)}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="border-t bg-muted/20 px-5 py-4 sm:px-6">
                  <p className="text-xs leading-5 text-muted-foreground">
                    Waktu pengambilan akan tersedia setelah integrasi pickup
                    slot selesai.
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <section className="rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <WalletCards className="size-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Saldo Wallet</p>

                <p className="mt-0.5 text-xl font-semibold">
                  {isLoadingWallet
                    ? "Memuat..."
                    : wallet
                      ? formatCurrency(wallet.balance)
                      : "-"}
                </p>
              </div>
            </div>

            {walletError ? (
              <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Wallet gagal dimuat
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {walletError}
                </p>
              </div>
            ) : wallet && !wallet.is_active ? (
              <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Wallet tidak aktif
                </p>
              </div>
            ) : hasEnoughBalance ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                Saldo mencukupi untuk pembayaran
              </div>
            ) : wallet ? (
              <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Saldo tidak mencukupi
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Kamu membutuhkan tambahan saldo sebesar{" "}
                  <span className="font-medium text-foreground">
                    {formatCurrency(Math.max(total - wallet.balance, 0))}
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
            ) : null}
          </section>

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

            {checkoutError ? (
              <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm font-medium text-destructive">
                  Checkout gagal
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {checkoutError}
                </p>
              </div>
            ) : null}

            <Button
              type="button"
              size="lg"
              className="mt-6 w-full"
              disabled={!canSubmit}
              onClick={handleSubmitOrder}
            >
              {isSubmitting ? "Memproses Pesanan..." : "Bayar dengan Wallet"}
            </Button>

            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              Total pembayaran akan diverifikasi kembali oleh server saat
              pesanan dibuat.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}