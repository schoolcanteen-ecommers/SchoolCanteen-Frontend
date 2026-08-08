"use client";

import {
  Search,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { CategoryChip } from "@/components/commerce/category-chip";
import { MerchantProductSection } from "@/components/commerce/merchant-product-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Merchant } from "@/types/merchant";
import type {
  Category,
  Product,
} from "@/types/product";

interface CommerceProductBrowserProps {
  merchants: Merchant[];
  products: Product[];
  categories: Category[];

  searchPlaceholder: string;

  emptyTitle?: string;
  emptyDescription?: string;
}

export function CommerceProductBrowser({
  merchants,
  products,
  categories,
  searchPlaceholder,
  emptyTitle = "Produk tidak ditemukan",
  emptyDescription = "Coba gunakan kata kunci atau kategori yang berbeda.",
}: CommerceProductBrowserProps) {
  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  /*
   * Category ditampilkan berdasarkan nama.
   *
   * Ini penting karena dua merchant dapat mempunyai
   * category ID berbeda tetapi nama kategori sama,
   * misalnya "Minuman".
   */
  const categoryNames = useMemo(() => {
    return Array.from(
      new Set(
        categories.map(
          (category) =>
            category.name,
        ),
      ),
    ).sort((a, b) =>
      a.localeCompare(b, "id"),
    );
  }, [categories]);

  const categoryNameById = useMemo(
    () =>
      new Map(
        categories.map(
          (category) => [
            category.id,
            category.name,
          ],
        ),
      ),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return products.filter((product) => {
      if (!product.isActive) {
        return false;
      }

      const categoryName =
        categoryNameById.get(
          product.categoryId,
        );

      const merchant =
        merchants.find(
          (item) =>
            item.id ===
            product.merchantId,
        );

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name
          .toLowerCase()
          .includes(
            normalizedSearch,
          ) ||
        product.description
          ?.toLowerCase()
          .includes(
            normalizedSearch,
          ) ||
        merchant?.name
          .toLowerCase()
          .includes(
            normalizedSearch,
          ) ||
        categoryName
          ?.toLowerCase()
          .includes(
            normalizedSearch,
          );

      const matchesCategory =
        selectedCategory ===
          "ALL" ||
        categoryName ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    products,
    merchants,
    search,
    selectedCategory,
    categoryNameById,
  ]);

  /*
   * Merchant yang tidak punya produk setelah filter
   * tidak perlu dirender.
   */
  const visibleMerchants = useMemo(
    () =>
      merchants.filter(
        (merchant) =>
          filteredProducts.some(
            (product) =>
              product.merchantId ===
              merchant.id,
          ),
      ),
    [
      merchants,
      filteredProducts,
    ],
  );

  const hasActiveFilter =
    search.trim().length > 0 ||
    selectedCategory !== "ALL";

  function resetFilters() {
    setSearch("");
    setSelectedCategory("ALL");
  }

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
          placeholder={
            searchPlaceholder
          }
          className="h-11 pl-10 pr-10"
        />

        {search && (
          <button
            type="button"
            onClick={() =>
              setSearch("")
            }
            aria-label="Hapus pencarian"
            className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      {categoryNames.length > 0 && (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          <CategoryChip
            label="Semua"
            active={
              selectedCategory ===
              "ALL"
            }
            onClick={() =>
              setSelectedCategory(
                "ALL",
              )
            }
          />

          {categoryNames.map(
            (categoryName) => (
              <CategoryChip
                key={
                  categoryName
                }
                label={
                  categoryName
                }
                active={
                  selectedCategory ===
                  categoryName
                }
                onClick={() =>
                  setSelectedCategory(
                    categoryName,
                  )
                }
              />
            ),
          )}
        </div>
      )}

      {/* Result Info */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Menampilkan{" "}
          <span className="font-medium text-foreground">
            {
              filteredProducts.length
            }
          </span>{" "}
          produk
        </p>

        {hasActiveFilter && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={
              resetFilters
            }
          >
            Reset filter
          </Button>
        )}
      </div>

      {/* Listing */}
      <div className="mt-6">
        {visibleMerchants.length >
        0 ? (
          <div className="space-y-12">
            {visibleMerchants.map(
              (merchant) => {
                const merchantProducts =
                  filteredProducts.filter(
                    (product) =>
                      product.merchantId ===
                      merchant.id,
                  );

                return (
                  <MerchantProductSection
                    key={
                      merchant.id
                    }
                    merchant={
                      merchant
                    }
                    products={
                      merchantProducts
                    }
                  />
                );
              },
            )}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-background p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
              {merchants.some(
                (merchant) =>
                  merchant.type ===
                  "CANTEEN",
              ) ? (
                <Store className="size-5 text-muted-foreground" />
              ) : (
                <ShoppingBag className="size-5 text-muted-foreground" />
              )}
            </div>

            <h2 className="mt-4 font-semibold">
              {emptyTitle}
            </h2>

            <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
              {
                emptyDescription
              }
            </p>

            {hasActiveFilter && (
              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={
                  resetFilters
                }
              >
                Reset Filter
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}