"use client";

<<<<<<< HEAD
import { Search, ShoppingBag, Store, X } from "lucide-react";
import { useMemo, useState } from "react";

import { CategoryChip } from "@/components/commerce/category-chip";
import { MerchantCard } from "@/components/commerce/merchant-card";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Merchant } from "@/types/merchant";
import type { Category, Product } from "@/types/product";
=======
import {
  Search,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  CategoryChip,
} from "@/components/commerce/category-chip";

import {
  MerchantCard,
} from "@/components/commerce/merchant-card";

import {
  ProductCard,
} from "@/components/commerce/product-card";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import type {
  Merchant,
} from "@/types/merchant";

import type {
  Category,
  Product,
} from "@/types/product";
>>>>>>> source/main

interface CommerceProductBrowserProps {
  merchants: Merchant[];
  products: Product[];
  categories: Category[];
<<<<<<< HEAD
=======

  source:
    | "kantin"
    | "koperasi";

>>>>>>> source/main
  searchPlaceholder: string;
  emptyTitle?: string;
  emptyDescription?: string;
<<<<<<< HEAD
  hideMerchants?: boolean;
  merchantTitle?: string;
=======

  hideMerchants?: boolean;

  merchantTitle?: string;

>>>>>>> source/main
  title?: string;
  subtitle?: string;
}

export function CommerceProductBrowser({
  merchants,
  products,
  categories,
  source,
  searchPlaceholder,
  emptyTitle = "Produk tidak ditemukan",
<<<<<<< HEAD
  emptyDescription = "Coba gunakan kata kunci atau kategori yang berbeda.",
  hideMerchants = false,
  merchantTitle = "Pilih Kantin",
  title = "Semua Menu",
  subtitle,
}: CommerceProductBrowserProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categoryNames = useMemo(() => {
    return Array.from(
      new Set(categories.map((category) => category.name)),
    ).sort((a, b) => a.localeCompare(b, "id"));
  }, [categories]);

  const categoryNameById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.name])),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      if (!product.isActive) return false;

      const categoryName = categoryNameById.get(product.categoryId);
      const merchant = merchants.find((item) => item.id === product.merchantId);

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description?.toLowerCase().includes(normalizedSearch) ||
        merchant?.name.toLowerCase().includes(normalizedSearch) ||
        categoryName?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "ALL" || categoryName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, merchants, search, selectedCategory, categoryNameById]);

  const visibleMerchants = useMemo(
    () =>
      merchants.filter((merchant) =>
        filteredProducts.some((product) => product.merchantId === merchant.id),
      ),
    [merchants, filteredProducts],
  );

  const hasActiveFilter = search.trim().length > 0 || selectedCategory !== "ALL";
=======
  emptyDescription = "Coba gunakan kata kunci atau filter yang berbeda.",
  hideMerchants = false,
  merchantTitle = "Pilih kantin",
  title = "Semua produk",
  subtitle,
}: CommerceProductBrowserProps) {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("ALL");

  const [
    selectedMerchantId,
    setSelectedMerchantId,
  ] = useState<
    string | null
  >(null);

  const categoryNames =
    useMemo(
      () =>
        Array.from(
          new Set(
            categories.map(
              (category) =>
                category.name,
            ),
          ),
        ).sort(
          (a, b) =>
            a.localeCompare(
              b,
              "id",
            ),
        ),
      [
        categories,
      ],
    );

  const categoryNameById =
    useMemo(
      () =>
        new Map(
          categories.map(
            (category) => [
              category.id,
              category.name,
            ],
          ),
        ),
      [
        categories,
      ],
    );

  const merchantById =
    useMemo(
      () =>
        new Map(
          merchants.map(
            (merchant) => [
              merchant.id,
              merchant,
            ],
          ),
        ),
      [
        merchants,
      ],
    );

  /*
   * Search + kategori diterapkan dahulu.
   *
   * Merchant dihitung sesudahnya agar rail merchant
   * tetap relevan dengan hasil pencarian.
   */
  const matchingProducts =
    useMemo(
      () => {
        const normalizedSearch =
          search
            .trim()
            .toLowerCase();

        return products.filter(
          (product) => {
            if (
              !product.isActive
            ) {
              return false;
            }

            const categoryName =
              categoryNameById.get(
                product.categoryId,
              );

            const merchant =
              merchantById.get(
                product.merchantId,
              );

            const matchesSearch =
              normalizedSearch.length ===
                0 ||
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
          },
        );
      },
      [
        products,
        search,
        selectedCategory,
        categoryNameById,
        merchantById,
      ],
    );

  const visibleMerchants =
    useMemo(
      () =>
        merchants.filter(
          (merchant) =>
            matchingProducts.some(
              (product) =>
                product.merchantId ===
                merchant.id,
            ),
        ),
      [
        merchants,
        matchingProducts,
      ],
    );

  const filteredProducts =
    useMemo(
      () => {
        if (
          !selectedMerchantId
        ) {
          return matchingProducts;
        }

        return matchingProducts.filter(
          (product) =>
            product.merchantId ===
            selectedMerchantId,
        );
      },
      [
        matchingProducts,
        selectedMerchantId,
      ],
    );

  const selectedMerchant =
    selectedMerchantId
      ? merchantById.get(
          selectedMerchantId,
        )
      : undefined;

  const hasActiveFilter =
    search.trim().length >
      0 ||
    selectedCategory !==
      "ALL" ||
    selectedMerchantId !==
      null;

  function selectCategory(
    categoryName: string,
  ) {
    setSelectedCategory(
      categoryName,
    );

    /*
     * Saat kategori berubah merchant lama
     * tidak dipertahankan supaya hasil tidak
     * terasa "hilang" tanpa alasan.
     */
    setSelectedMerchantId(
      null,
    );
  }

  function selectMerchant(
    merchantId: string,
  ) {
    setSelectedMerchantId(
      (current) =>
        current === merchantId
          ? null
          : merchantId,
    );
  }
>>>>>>> source/main

  function resetFilters() {
    setSearch("");
    setSelectedCategory(
      "ALL",
    );
    setSelectedMerchantId(
      null,
    );
  }

  return (
    <div className="w-full">
<<<<<<< HEAD
      
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 mb-8">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-navy-steel" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-[52px] rounded-xl border-arctic-blue bg-white pl-12 pr-10 font-sans shadow-sm transition-all focus-visible:border-navy-steel/30 focus-visible:ring-4 focus-visible:ring-arctic-blue"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-neutral-surface hover:text-navy-steel"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {categoryNames.length > 0 && (
          <div className="no-scrollbar -mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            <CategoryChip
              label="Semua"
              active={selectedCategory === "ALL"}
              onClick={() => setSelectedCategory("ALL")}
            />
            {categoryNames.map((categoryName) => (
              <CategoryChip
                key={categoryName}
                label={categoryName}
                active={selectedCategory === categoryName}
                onClick={() => setSelectedCategory(categoryName)}
              />
            ))}
          </div>
        )}
      </div>

      
      {!hideMerchants && visibleMerchants.length > 0 && (
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 mb-10 md:mb-16">
          <h2 className="mb-4 font-heading text-xl font-bold text-navy-steel md:mb-6 md:text-2xl">
            {merchantTitle} 
          </h2>
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {visibleMerchants.map((merchant) => (
              <div key={merchant.id} className="w-32 shrink-0 sm:w-auto">
                <MerchantCard merchant={merchant} />
              </div>
            ))}
          </div>
        </div>
      )}

      
      <div className="w-full bg-[#E6F4FF]/30 py-8 md:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
          
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-arctic-blue pb-4 md:mb-8">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-steel md:text-2xl">
                {title} 
              </h2>
              {subtitle && (
                <p className="mt-1 font-sans text-sm text-muted-foreground">
=======
      {/* Search + categories */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-4 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6 md:px-8">
          <div className="relative w-full max-w-2xl">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={search}
              onChange={(
                event,
              ) => {
                setSearch(
                  event.target.value,
                );
              }}
              placeholder={
                searchPlaceholder
              }
              className="h-[50px] rounded-[14px] border-[#DCE8F0] bg-[#F8FBFD] pl-11 pr-10 text-[13px] shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-navy-steel/20 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-arctic-blue/60 sm:h-[52px] sm:text-[15px]"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                }}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white hover:text-navy-steel"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {categoryNames.length >
            0 && (
            <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
              <CategoryChip
                label="Semua"
                active={
                  selectedCategory ===
                  "ALL"
                }
                onClick={() => {
                  selectCategory(
                    "ALL",
                  );
                }}
              />

              {categoryNames.map(
                (
                  categoryName,
                ) => (
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
                    onClick={() => {
                      selectCategory(
                        categoryName,
                      );
                    }}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* Merchant selector */}
      {!hideMerchants &&
        visibleMerchants.length >
          0 && (
          <section className="border-y border-[#E2EDF4] bg-neutral-surface">
            <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-6 sm:py-7 md:px-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-[20px] font-bold tracking-tight text-navy-steel sm:text-[22px]">
                    {merchantTitle}
                  </h2>

                  {selectedMerchant && (
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      Menampilkan produk dari{" "}
                      <span className="font-medium text-navy-steel">
                        {
                          selectedMerchant.name
                        }
                      </span>
                    </p>
                  )}
                </div>

                {selectedMerchant && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMerchantId(
                        null,
                      );
                    }}
                    className="shrink-0 text-xs font-bold text-navy-steel transition-opacity hover:opacity-70 sm:text-sm"
                  >
                    Semua
                  </button>
                )}
              </div>

              <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                {visibleMerchants.map(
                  (merchant) => (
                    <div
                      key={
                        merchant.id
                      }
                      className="w-[148px] shrink-0 sm:w-auto"
                    >
                      <MerchantCard
                        merchant={
                          merchant
                        }
                        selected={
                          selectedMerchantId ===
                          merchant.id
                        }
                        onSelect={() => {
                          selectMerchant(
                            merchant.id,
                          );
                        }}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {/* Product results */}
      <section className="bg-[#EEF7FD]/45 py-7 sm:py-9 md:py-10">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
          <header className="mb-5 flex items-end justify-between gap-4 border-b border-[#DCE9F1] pb-4 sm:mb-7">
            <div className="min-w-0">
              <h2 className="font-heading text-[21px] font-bold tracking-tight text-navy-steel sm:text-2xl">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-1 text-[12px] leading-5 text-muted-foreground sm:text-sm">
>>>>>>> source/main
                  {subtitle}
                </p>
              )}
            </div>
<<<<<<< HEAD
            <span className="font-sans text-sm font-medium text-muted-foreground">
              {filteredProducts.length} produk tersedia
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const merchant = merchants.find((m) => m.id === product.merchantId);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    merchantName={merchant?.name}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-[24px] border border-dashed border-arctic-blue bg-white p-8 text-center shadow-sm">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-surface">
                <Search className="size-6 text-muted-foreground/60" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-navy-steel">
                {emptyTitle}
              </h3>
              <p className="mt-2 max-w-sm font-sans text-sm text-muted-foreground">
                {emptyDescription}
              </p>
=======

            <span className="shrink-0 text-[12px] font-medium text-muted-foreground sm:text-sm">
              {
                filteredProducts.length
              }{" "}
              produk
            </span>
          </header>

          {filteredProducts.length >
          0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {filteredProducts.map(
                (product) => {
                  const merchant =
                    merchantById.get(
                      product.merchantId,
                    );

                  return (
                    <ProductCard
                      key={
                        product.id
                      }
                      product={
                        product
                      }
                      merchantName={
                        merchant?.name
                      }
                      source={
                        source
                      }
                    />
                  );
                },
              )}
            </div>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D5E6F1] bg-white px-6 py-10 text-center">
              <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#EEF7FD]">
                <Search className="size-5 text-muted-foreground/60" />
              </div>

              <h3 className="mt-4 font-heading text-lg font-bold text-navy-steel">
                {emptyTitle}
              </h3>

              <p className="mt-2 max-w-sm text-[13px] leading-5 text-muted-foreground sm:text-sm">
                {emptyDescription}
              </p>

>>>>>>> source/main
              {hasActiveFilter && (
                <Button
                  type="button"
                  variant="outline"
<<<<<<< HEAD
                  className="mt-6 border-arctic-blue text-navy-steel hover:bg-neutral-surface"
                  onClick={resetFilters}
                >
                  Reset Filter
=======
                  onClick={
                    resetFilters
                  }
                  className="mt-5 h-10 rounded-xl border-[#DCE8F0] px-4 text-sm text-navy-steel hover:bg-[#F5FAFD]"
                >
                  Reset filter
>>>>>>> source/main
                </Button>
              )}
            </div>
          )}
        </div>
<<<<<<< HEAD
      </div>
=======
      </section>
>>>>>>> source/main
    </div>
  );
}
