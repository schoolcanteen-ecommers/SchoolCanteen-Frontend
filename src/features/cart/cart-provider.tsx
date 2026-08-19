"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  MAX_CART_QUANTITY,
} from "@/lib/constants";

import type {
  CartContextValue,
  CartItem,
  CartItemCustomization,
  CartModifierSelection,
} from "@/types/cart";

const CART_STORAGE_KEY =
  "school-canteen-cart";

const MAX_CART_NOTE_LENGTH =
  120;

export const CartContext =
  createContext<
    CartContextValue | null
  >(null);

interface CartProviderProps {
  children: ReactNode;
}

<<<<<<< HEAD
=======
interface RawCartItem {
  lineId?: unknown;
  productId?: unknown;
  quantity?: unknown;
  selections?: unknown;
  note?: unknown;
}

function createLineId(): string {
  if (
    typeof globalThis.crypto
      ?.randomUUID === "function"
  ) {
    return globalThis.crypto
      .randomUUID();
  }

  return [
    "cart",
    Date.now().toString(36),
    Math.random()
      .toString(36)
      .slice(2),
  ].join("-");
}

function sanitizeNote(
  value: unknown,
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .trim()
    .slice(
      0,
      MAX_CART_NOTE_LENGTH,
    );
}

function sanitizeSelections(
  value: unknown,
): CartModifierSelection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const byGroup =
    new Map<
      string,
      Set<string>
    >();

  for (const rawSelection of value) {
    if (
      typeof rawSelection !==
        "object" ||
      rawSelection === null
    ) {
      continue;
    }

    const candidate =
      rawSelection as {
        groupId?: unknown;
        optionIds?: unknown;
      };

    if (
      typeof candidate.groupId !==
        "string" ||
      candidate.groupId.length ===
        0 ||
      !Array.isArray(
        candidate.optionIds,
      )
    ) {
      continue;
    }

    const optionIds =
      candidate.optionIds.filter(
        (
          optionId,
        ): optionId is string =>
          typeof optionId ===
            "string" &&
          optionId.length > 0,
      );

    if (
      optionIds.length === 0
    ) {
      continue;
    }

    const existing =
      byGroup.get(
        candidate.groupId,
      ) ?? new Set<string>();

    optionIds.forEach(
      (optionId) => {
        existing.add(
          optionId,
        );
      },
    );

    byGroup.set(
      candidate.groupId,
      existing,
    );
  }

  return Array.from(
    byGroup.entries(),
  )
    .map(
      ([
        groupId,
        optionIds,
      ]) => ({
        groupId,

        optionIds:
          Array.from(
            optionIds,
          ).sort(),
      }),
    )
    .sort(
      (a, b) =>
        a.groupId.localeCompare(
          b.groupId,
        ),
    );
}

function normalizeCustomization(
  customization:
    | CartItemCustomization
    | undefined,
) {
  return {
    selections:
      sanitizeSelections(
        customization
          ?.selections,
      ),

    note:
      sanitizeNote(
        customization?.note,
      ),
  };
}

function getCustomizationKey(
  productId: string,
  selections:
    CartModifierSelection[],
  note: string,
): string {
  const selectionKey =
    selections
      .map(
        (selection) =>
          [
            selection.groupId,
            ...selection.optionIds,
          ].join(":"),
      )
      .join("|");

  return [
    productId,
    selectionKey,
    note,
  ].join("::");
}

function getItemKey(
  item: CartItem,
): string {
  return getCustomizationKey(
    item.productId,
    item.selections,
    item.note,
  );
}

>>>>>>> source/main
function sanitizeCartItems(
  value: unknown,
): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalizedItems:
    CartItem[] = [];

  const usedLineIds =
    new Set<string>();

  const productTotals =
    new Map<string, number>();

  for (const rawItem of value) {
    if (
      typeof rawItem !==
        "object" ||
      rawItem === null
    ) {
      continue;
    }

    const candidate =
      rawItem as RawCartItem;

    if (
      typeof candidate.productId !==
        "string" ||
      candidate.productId.length ===
        0 ||
      typeof candidate.quantity !==
        "number" ||
      !Number.isFinite(
        candidate.quantity,
      ) ||
      candidate.quantity <= 0
    ) {
      continue;
    }

    const productId =
      candidate.productId;

    const currentProductTotal =
      productTotals.get(
        productId,
      ) ?? 0;

    const remainingQuantity =
      MAX_CART_QUANTITY -
      currentProductTotal;

    if (
      remainingQuantity <= 0
    ) {
      continue;
    }

    const quantity =
      Math.min(
        Math.max(
          Math.floor(
            candidate.quantity,
          ),
          1,
        ),
        remainingQuantity,
      );

    const selections =
      sanitizeSelections(
        candidate.selections,
      );

    const note =
      sanitizeNote(
        candidate.note,
      );

    const customizationKey =
      getCustomizationKey(
        productId,
        selections,
        note,
      );

    const existing =
      normalizedItems.find(
        (item) =>
          getItemKey(item) ===
          customizationKey,
      );

    if (existing) {
      existing.quantity +=
        quantity;

      productTotals.set(
        productId,
        currentProductTotal +
          quantity,
      );

      continue;
    }

    let lineId =
      typeof candidate.lineId ===
        "string" &&
      candidate.lineId.length > 0
        ? candidate.lineId
        : createLineId();

    while (
      usedLineIds.has(lineId)
    ) {
      lineId =
        createLineId();
    }

    usedLineIds.add(
      lineId,
    );

    normalizedItems.push({
      lineId,
      productId,
      quantity,
      selections,
      note,
    });

    productTotals.set(
      productId,
      currentProductTotal +
        quantity,
    );
  }

  return normalizedItems;
}

function getInitialCart(): CartItem[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const storedCart =
      window.localStorage
        .getItem(
          CART_STORAGE_KEY,
        );

    if (!storedCart) {
      return [];
    }

    const parsedCart: unknown =
      JSON.parse(
        storedCart,
      );

    return sanitizeCartItems(
      parsedCart,
    );
  } catch {
    window.localStorage
      .removeItem(
        CART_STORAGE_KEY,
      );

    return [];
  }
}

<<<<<<< HEAD
function subscribeToHydration() {
  return () => {};
}

=======
>>>>>>> source/main
export function CartProvider({
  children,
}: CartProviderProps) {
  /*
   * SSR dan first client render WAJIB
   * mempunyai state yang sama.
   *
   * Jangan membaca localStorage di
   * initializer useState karena server
   * tidak mempunyai localStorage.
   */
  const [
    items,
    setItems,
  ] =
    useState<CartItem[]>(
      [],
    );

<<<<<<< HEAD
    useEffect(() => {
=======
  const [
    isHydrated,
    setIsHydrated,
  ] =
    useState(false);

  /*
   * Hydrate cart hanya setelah React
   * berhasil melakukan hydration.
   *
   * Dengan begitu:
   *
   * server render     -> []
   * first client      -> []
   * after mount       -> localStorage
   *
   * sehingga HTML server/client sama.
   */
  useEffect(() => {
    const initialItems =
      getInitialCart();

    /*
     * Persist legacy migration langsung
     * ke external storage.
     */
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(
        initialItems,
      ),
    );

    /*
     * State React diterapkan setelah
     * effect selesai.
     *
     * Ini menjaga:
     * - SSR/client first render identik
     * - tidak ada hydration mismatch
     * - tidak melanggar
     *   react-hooks/set-state-in-effect
     */
    const hydrationTimer =
      window.setTimeout(
        () => {
          setItems(
            initialItems,
          );

          setIsHydrated(
            true,
          );
        },
        0,
      );

    return () => {
      window.clearTimeout(
        hydrationTimer,
      );
    };
  }, []);

  /*
   * Hasil sanitization termasuk
   * legacy migration akan langsung
   * dipersist sebagai Cart v2 setelah
   * hydration.
   */
  useEffect(() => {
>>>>>>> source/main
    if (!isHydrated) {
      return;
    }

    window.localStorage
      .setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items),
      );
  }, [
    items,
    isHydrated,
  ]);

  const addItem =
    useCallback(
      (
        productId: string,
        quantity = 1,
        customization?:
          CartItemCustomization,
      ) => {
        const safeQuantity =
          Math.min(
            Math.max(
              Math.floor(
                quantity,
              ),
              1,
            ),
            MAX_CART_QUANTITY,
          );

        const normalized =
          normalizeCustomization(
            customization,
          );

        const targetKey =
          getCustomizationKey(
            productId,
            normalized.selections,
            normalized.note,
          );

<<<<<<< HEAD
  const updateQuantity = useCallback(
    (
      productId: string,
      quantity: number,
    ) => {
            if (quantity <= 0) {
        setItems((currentItems) =>
          currentItems.filter(
            (item) =>
              item.productId !==
              productId,
          ),
=======
        setItems(
          (currentItems) => {
            /*
             * Quantity cap berlaku
             * terhadap seluruh line
             * dengan product yang sama.
             */
            const productQuantity =
              currentItems.reduce(
                (
                  total,
                  item,
                ) =>
                  item.productId ===
                  productId
                    ? total +
                      item.quantity
                    : total,
                0,
              );

            const available =
              MAX_CART_QUANTITY -
              productQuantity;

            if (
              available <= 0
            ) {
              return currentItems;
            }

            const quantityToAdd =
              Math.min(
                safeQuantity,
                available,
              );

            const existingItem =
              currentItems.find(
                (item) =>
                  getItemKey(
                    item,
                  ) === targetKey,
              );

            if (
              !existingItem
            ) {
              return [
                ...currentItems,
                {
                  lineId:
                    createLineId(),

                  productId,

                  quantity:
                    quantityToAdd,

                  selections:
                    normalized
                      .selections,

                  note:
                    normalized.note,
                },
              ];
            }

            return currentItems.map(
              (item) =>
                item.lineId ===
                existingItem.lineId
                  ? {
                      ...item,

                      quantity:
                        item.quantity +
                        quantityToAdd,
                    }
                  : item,
            );
          },
>>>>>>> source/main
        );
      },
      [],
    );

  const removeLine =
    useCallback(
      (
        lineId: string,
      ) => {
        setItems(
          (currentItems) =>
            currentItems.filter(
              (item) =>
                item.lineId !==
                lineId,
            ),
        );
      },
      [],
    );

  const updateLineQuantity =
    useCallback(
      (
        lineId: string,
        quantity: number,
      ) => {
        setItems(
          (currentItems) => {
            const currentLine =
              currentItems.find(
                (item) =>
                  item.lineId ===
                  lineId,
              );

            if (!currentLine) {
              return currentItems;
            }

            if (
              quantity <= 0
            ) {
              return currentItems.filter(
                (item) =>
                  item.lineId !==
                  lineId,
              );
            }

            const otherProductQuantity =
              currentItems.reduce(
                (
                  total,
                  item,
                ) =>
                  item.productId ===
                    currentLine.productId &&
                  item.lineId !==
                    lineId
                    ? total +
                      item.quantity
                    : total,
                0,
              );

            const maxForLine =
              Math.max(
                MAX_CART_QUANTITY -
                  otherProductQuantity,
                0,
              );

            if (
              maxForLine <= 0
            ) {
              return currentItems.filter(
                (item) =>
                  item.lineId !==
                  lineId,
              );
            }

            const safeQuantity =
              Math.min(
                Math.max(
                  Math.floor(
                    quantity,
                  ),
                  1,
                ),
                maxForLine,
              );

            return currentItems.map(
              (item) =>
                item.lineId ===
                lineId
                  ? {
                      ...item,
                      quantity:
                        safeQuantity,
                    }
                  : item,
            );
          },
        );
      },
      [],
    );

  const updateCustomization =
    useCallback(
      (
        lineId: string,
        customization:
          CartItemCustomization,
      ) => {
        const normalized =
          normalizeCustomization(
            customization,
          );

        setItems(
          (currentItems) => {
            const currentLine =
              currentItems.find(
                (item) =>
                  item.lineId ===
                  lineId,
              );

            if (!currentLine) {
              return currentItems;
            }

            const targetKey =
              getCustomizationKey(
                currentLine.productId,
                normalized.selections,
                normalized.note,
              );

            /*
             * Jika edit customization
             * menghasilkan identitas yang
             * sama dengan line lain,
             * gabungkan keduanya.
             */
            const matchingLine =
              currentItems.find(
                (item) =>
                  item.lineId !==
                    lineId &&
                  getItemKey(
                    item,
                  ) === targetKey,
              );

            if (matchingLine) {
              return currentItems
                .filter(
                  (item) =>
                    item.lineId !==
                    lineId,
                )
                .map(
                  (item) =>
                    item.lineId ===
                    matchingLine.lineId
                      ? {
                          ...item,

                          quantity:
                            item.quantity +
                            currentLine.quantity,
                        }
                      : item,
                );
            }

            return currentItems.map(
              (item) =>
                item.lineId ===
                lineId
                  ? {
                      ...item,

                      selections:
                        normalized
                          .selections,

                      note:
                        normalized.note,
                    }
                  : item,
            );
          },
        );
      },
      [],
    );

  const getProductQuantity =
    useCallback(
      (
        productId: string,
      ) =>
        items.reduce(
          (
            total,
            item,
          ) =>
            item.productId ===
            productId
              ? total +
                item.quantity
              : total,
          0,
        ),
      [
        items,
      ],
    );

  /*
   * -------------------------------------------------------
   * TEMPORARY LEGACY ADAPTERS
   * -------------------------------------------------------
   *
   * Ini menjaga komponen lama tetap
   * compile selama migrasi bertahap.
   *
   * F3-F6 akan memindahkan komponen
   * Cart/Checkout ke API line-based.
   */

  const removeItem =
    useCallback(
      (
        productId: string,
      ) => {
        setItems(
          (currentItems) =>
            currentItems.filter(
              (item) =>
                item.productId !==
                productId,
            ),
        );
      },
      [],
    );

  const updateQuantity =
    useCallback(
      (
        productId: string,
        quantity: number,
      ) => {
        setItems(
          (currentItems) => {
            const currentLine =
              currentItems.find(
                (item) =>
                  item.productId ===
                  productId,
              );

            if (!currentLine) {
              return currentItems;
            }

            if (
              quantity <= 0
            ) {
              return currentItems.filter(
                (item) =>
                  item.lineId !==
                  currentLine.lineId,
              );
            }

            const otherProductQuantity =
              currentItems.reduce(
                (
                  total,
                  item,
                ) =>
                  item.productId ===
                    productId &&
                  item.lineId !==
                    currentLine.lineId
                    ? total +
                      item.quantity
                    : total,
                0,
              );

            const maxForLine =
              Math.max(
                MAX_CART_QUANTITY -
                  otherProductQuantity,
                0,
              );

            const safeQuantity =
              Math.min(
                Math.max(
                  Math.floor(
                    quantity,
                  ),
                  1,
                ),
                maxForLine,
              );

            return currentItems.map(
              (item) =>
                item.lineId ===
                currentLine.lineId
                  ? {
                      ...item,

                      quantity:
                        safeQuantity,
                    }
                  : item,
            );
          },
        );
      },
      [],
    );

  const getItemQuantity =
    getProductQuantity;

  const clearCart =
    useCallback(() => {
      setItems([]);
    }, []);

  const totalItems =
    useMemo(
      () =>
        items.reduce(
          (
            total,
            item,
          ) =>
            total +
            item.quantity,
          0,
        ),
      [
        items,
      ],
    );

  const value =
    useMemo<
      CartContextValue
    >(
      () => ({
        items,
        totalItems,
        isHydrated,

        addItem,

        removeLine,
        updateLineQuantity,
        updateCustomization,
        getProductQuantity,

        removeItem,
        updateQuantity,
        getItemQuantity,

        clearCart,
      }),
      [
        items,
        totalItems,
        isHydrated,

        addItem,

        removeLine,
        updateLineQuantity,
        updateCustomization,
        getProductQuantity,

        removeItem,
        updateQuantity,
        getItemQuantity,

        clearCart,
      ],
    );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}
