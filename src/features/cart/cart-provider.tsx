"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { MAX_CART_QUANTITY } from "@/lib/constants";

import type {
  CartContextValue,
  CartItem,
} from "@/types/cart";

const CART_STORAGE_KEY = "school-canteen-cart";

export const CartContext =
  createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

function sanitizeCartItems(
  value: unknown,
): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is CartItem => {
      if (
        typeof item !== "object" ||
        item === null
      ) {
        return false;
      }

      const candidate =
        item as Partial<CartItem>;

      return (
        typeof candidate.productId ===
          "string" &&
        candidate.productId.length > 0 &&
        typeof candidate.quantity ===
          "number" &&
        Number.isFinite(
          candidate.quantity,
        ) &&
        candidate.quantity > 0
      );
    })
    .map((item) => ({
      productId: item.productId,
      quantity: Math.min(
        Math.max(
          Math.floor(item.quantity),
          1,
        ),
        MAX_CART_QUANTITY,
      ),
    }));
}

function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart =
      window.localStorage.getItem(
        CART_STORAGE_KEY,
      );

    if (!storedCart) {
      return [];
    }

    const parsedCart: unknown =
      JSON.parse(storedCart);

    return sanitizeCartItems(
      parsedCart,
    );
  } catch {
    window.localStorage.removeItem(
      CART_STORAGE_KEY,
    );

    return [];
  }
}

function subscribeToHydration() {
  return () => {};
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] =
    useState<CartItem[]>(getInitialCart);

  const isHydrated =
    useSyncExternalStore(
      subscribeToHydration,
      () => true,
      () => false,
    );

    useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [items, isHydrated]);

  const addItem = useCallback(
    (
      productId: string,
      quantity = 1,
    ) => {
      const safeQuantity = Math.min(
        Math.max(
          Math.floor(quantity),
          1,
        ),
        MAX_CART_QUANTITY,
      );

      setItems((currentItems) => {
        const existingItem =
          currentItems.find(
            (item) =>
              item.productId ===
              productId,
          );

        if (!existingItem) {
          return [
            ...currentItems,
            {
              productId,
              quantity:
                safeQuantity,
            },
          ];
        }

        return currentItems.map(
          (item) =>
            item.productId ===
            productId
              ? {
                  ...item,
                  quantity:
                    Math.min(
                      item.quantity +
                        safeQuantity,
                      MAX_CART_QUANTITY,
                    ),
                }
              : item,
        );
      });
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((currentItems) =>
        currentItems.filter(
          (item) =>
            item.productId !==
            productId,
        ),
      );
    },
    [],
  );

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
        );

        return;
      }

      const safeQuantity = Math.min(
        Math.max(
          Math.floor(quantity),
          1,
        ),
        MAX_CART_QUANTITY,
      );

      setItems((currentItems) =>
        currentItems.map(
          (item) =>
            item.productId ===
            productId
              ? {
                  ...item,
                  quantity:
                    safeQuantity,
                }
              : item,
        ),
      );
    },
    [],
  );

  const clearCart =
    useCallback(() => {
      setItems([]);
    }, []);

  const getItemQuantity =
    useCallback(
      (productId: string) => {
        return (
          items.find(
            (item) =>
              item.productId ===
              productId,
          )?.quantity ?? 0
        );
      },
      [items],
    );

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.quantity,
        0,
      ),
    [items],
  );

  const value =
    useMemo<CartContextValue>(
      () => ({
        items,
        totalItems,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }),
      [
        items,
        totalItems,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
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