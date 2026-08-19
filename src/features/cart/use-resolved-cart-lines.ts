"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  resolveCartCustomization,
  type CartModifierSummary,
} from "@/features/cart/cart-line-resolution";

import {
  useCart,
} from "@/features/cart/use-cart";

import {
  getProductCustomization,
  resolveCartProducts,
  type ResolvedCartProduct,
} from "@/lib/api/catalog";

import type {
  CartModifierSelection,
} from "@/types/cart";

import type {
  Merchant,
} from "@/types/merchant";

import type {
  Product,
} from "@/types/product";

export interface ResolvedCartLine {
  lineId: string;

  productId: string;
  quantity: number;

  selections:
    CartModifierSelection[];

  note: string;

  product:
    Product | null;

  merchant:
    Pick<
      Merchant,
      "id" | "name" | "type"
    > | null;

  unitPrice: number;
  subtotal: number;

  modifierDelta: number;

  modifierOptionIds:
    string[];

  modifierSummaries:
    CartModifierSummary[];

  stockValid: boolean;

  customizationValid:
    boolean;

  valid: boolean;

  issue: string | null;
}

export function useResolvedCartLines() {
  const {
    items,
    isHydrated,
  } = useCart();

  const [
    resolvedProducts,
    setResolvedProducts,
  ] =
    useState<
      ResolvedCartProduct[]
    >([]);

  const [
    detailProducts,
    setDetailProducts,
  ] =
    useState<Product[]>(
      [],
    );

  const [
    unavailableProductIds,
    setUnavailableProductIds,
  ] =
    useState<string[]>(
      [],
    );

  const [
    isResolving,
    setIsResolving,
  ] =
    useState(true);

  /*
   * Full-page loading hanya boleh
   * terjadi pada resolve pertama.
   *
   * Update cart selanjutnya:
   * + / - / hapus
   * akan resolve di background.
   */
  const hasResolvedOnce =
    useRef(false);

  const [
    resolveFailed,
    setResolveFailed,
  ] =
    useState(false);

  const [
    retryVersion,
    setRetryVersion,
  ] =
    useState(0);

  const productIdsKey =
    useMemo(
      () =>
        Array.from(
          new Set(
            items.map(
              (item) =>
                item.productId,
            ),
          ),
        )
          .sort()
          .join("|"),
      [
        items,
      ],
    );

  const selectionProductIdsKey =
    useMemo(
      () =>
        Array.from(
          new Set(
            items
              .filter(
                (item) =>
                  item.selections
                    .length > 0,
              )
              .map(
                (item) =>
                  item.productId,
              ),
          ),
        )
          .sort()
          .join("|"),
      [
        items,
      ],
    );

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    async function resolve() {
      const productIds =
        productIdsKey
          ? productIdsKey.split(
              "|",
            )
          : [];

      if (
        productIds.length ===
        0
      ) {
        setResolvedProducts(
          [],
        );

        setDetailProducts(
          [],
        );

        setUnavailableProductIds(
          [],
        );

        setResolveFailed(
          false,
        );

        hasResolvedOnce.current =
          true;

        setIsResolving(
          false,
        );

        return;
      }

      if (
        !hasResolvedOnce.current
      ) {
        setIsResolving(
          true,
        );
      }

      setResolveFailed(
        false,
      );

      try {
        const data =
          await resolveCartProducts(
            productIds,
          );

        if (cancelled) {
          return;
        }

        const selectedProductIds =
          new Set(
            selectionProductIdsKey
              ? selectionProductIdsKey.split(
                  "|",
                )
              : [],
          );

        const detailIds =
          data.products
            .filter(
              (resolved) =>
                Boolean(
                  resolved.product
                    .hasModifiers,
                ) ||
                selectedProductIds.has(
                  resolved.product.id,
                ),
            )
            .map(
              (resolved) =>
                resolved.product.id,
            );

        const details =
          await Promise.all(
            detailIds.map(
              (productId) =>
                getProductCustomization(
                  productId,
                ),
            ),
          );

        if (cancelled) {
          return;
        }

        const returnedIds =
          new Set(
            data.products.map(
              (resolved) =>
                resolved.product.id,
            ),
          );

        const missingIds =
          productIds.filter(
            (productId) =>
              !returnedIds.has(
                productId,
              ),
          );

        setResolvedProducts(
          data.products,
        );

        setDetailProducts(
          details,
        );

        setUnavailableProductIds(
          Array.from(
            new Set([
              ...data
                .unavailableProductIds,
              ...missingIds,
            ]),
          ),
        );
      } catch {
        if (!cancelled) {
          setResolveFailed(
            true,
          );
        }
      } finally {
        if (!cancelled) {
          hasResolvedOnce.current =
            true;

          setIsResolving(
            false,
          );
        }
      }
    }

    void resolve();

    return () => {
      cancelled = true;
    };
  }, [
    isHydrated,
    productIdsKey,
    selectionProductIdsKey,
    retryVersion,
  ]);

  const productTotals =
    useMemo(() => {
      const totals =
        new Map<
          string,
          number
        >();

      for (
        const item
        of items
      ) {
        totals.set(
          item.productId,
          (
            totals.get(
              item.productId,
            ) ?? 0
          ) +
            item.quantity,
        );
      }

      return totals;
    }, [
      items,
    ]);

  const lines =
    useMemo<
      ResolvedCartLine[]
    >(() => {
      const resolvedMap =
        new Map(
          resolvedProducts.map(
            (resolved) => [
              resolved.product.id,
              resolved,
            ],
          ),
        );

      const detailMap =
        new Map(
          detailProducts.map(
            (product) => [
              product.id,
              product,
            ],
          ),
        );

      const unavailable =
        new Set(
          unavailableProductIds,
        );

      return items.map(
        (item) => {
          const resolved =
            resolvedMap.get(
              item.productId,
            );

          if (
            !resolved ||
            unavailable.has(
              item.productId,
            )
          ) {
            return {
              ...item,

              product: null,
              merchant: null,

              unitPrice: 0,
              subtotal: 0,

              modifierDelta: 0,

              modifierOptionIds:
                [],

              modifierSummaries:
                [],

              stockValid: false,

              customizationValid:
                false,

              valid: false,

              issue:
                "Produk sudah tidak tersedia.",
            };
          }

          const product =
            detailMap.get(
              item.productId,
            ) ??
            resolved.product;

          const customization =
            resolveCartCustomization(
              product,
              item.selections,
            );

          const totalProductQuantity =
            productTotals.get(
              item.productId,
            ) ?? 0;

          const stockValid =
            product.isActive &&
            product.stock > 0 &&
            totalProductQuantity <=
              product.stock;

          const unitPrice =
            product.price +
            customization
              .modifierDelta;

          const issue =
            !product.isActive
              ? "Produk sedang tidak tersedia."
              : totalProductQuantity >
                  product.stock
                ? `Stok berubah, sekarang tersisa ${product.stock}.`
                : customization
                      .issue;

          return {
            ...item,

            product,

            merchant:
              resolved.merchant,

            unitPrice,

            subtotal:
              unitPrice *
              item.quantity,

            modifierDelta:
              customization
                .modifierDelta,

            modifierOptionIds:
              customization
                .modifierOptionIds,

            modifierSummaries:
              customization
                .summaries,

            stockValid,

            customizationValid:
              customization.valid,

            valid:
              stockValid &&
              customization.valid,

            issue,
          };
        },
      );
    }, [
      items,
      resolvedProducts,
      detailProducts,
      unavailableProductIds,
      productTotals,
    ]);

  const canCheckout =
    lines.length > 0 &&
    lines.every(
      (line) =>
        line.valid,
    );

  const totalPreview =
    lines.reduce(
      (
        total,
        line,
      ) =>
        total +
        line.subtotal,
      0,
    );

  const retry =
    useCallback(() => {
      setRetryVersion(
        (current) =>
          current + 1,
      );
    }, []);

  return {
    lines,

    isHydrated,
    isResolving,
    resolveFailed,

    canCheckout,
    totalPreview,

    retry,
  };
}
