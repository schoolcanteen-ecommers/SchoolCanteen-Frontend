"use client";

import { Search, ShoppingBag, Store, X } from "lucide-react";
import { useMemo, useState } from "react";

import { CategoryChip } from "@/components/commerce/category-chip";
import { MerchantCard } from "@/components/commerce/merchant-card";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Merchant } from "@/types/merchant";
import type { Category, Product } from "@/types/product";

interface CommerceProductBrowserProps {
  merchants: Merchant[];
  products: Product[];
  categories: Category[];
  searchPlaceholder: string;
  emptyTitle?: string;
  emptyDescription?: string;
  hideMerchants?: boolean;
  merchantTitle?: string;
  title?: string;
  subtitle?: string;
}

export function CommerceProductBrowser({
  merchants,
  products,
  categories,
  searchPlaceholder,
  emptyTitle = "Produk tidak ditemukan",
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

  function resetFilters() {
    setSearch("");
    setSelectedCategory("ALL");
  }

  return (
    <div className="w-full">
      
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
                  {subtitle}
                </p>
              )}
            </div>
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
              {hasActiveFilter && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6 border-arctic-blue text-navy-steel hover:bg-neutral-surface"
                  onClick={resetFilters}
                >
                  Reset Filter
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}