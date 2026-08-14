import {
  Boxes,
  ImageIcon,
  Package,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  Category,
  Product,
} from "@/types/product";

interface AdminCooperativeInventoryListProps {
  products: Product[];
  categories: Category[];
}

const LOW_STOCK_THRESHOLD = 5;

export function AdminCooperativeInventoryList({
  products,
  categories,
}: AdminCooperativeInventoryListProps) {
  const categoryMap = new Map(
    categories.map((category) => [
      category.id,
      category.name,
    ]),
  );

  if (products.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={Boxes}
          title="Belum ada inventory"
          description="Stok produk koperasi akan tampil di sini."
        />
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div>
        <h2 className="text-lg font-semibold">
          Stok Produk Koperasi
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Pantau stok dan ketersediaan barang koperasi.
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
        <div className="divide-y">
          {products.map((product) => {
            const categoryName =
              categoryMap.get(
                product.categoryId,
              ) ??
              "Tanpa kategori";

            const isOutOfStock =
              product.stock <= 0;

            const isLowStock =
              product.stock > 0 &&
              product.stock <=
                LOW_STOCK_THRESHOLD;

            const stockStatus =
              isOutOfStock
                ? "Habis"
                : isLowStock
                  ? "Stok Rendah"
                  : "Stok Aman";

            return (
              <article
                key={product.id}
                className="p-4 sm:p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Product */}
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                      {product.imageUrl ? (
                       
                        <img
                          src={
                            product.imageUrl
                          }
                          alt={product.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="size-6 text-muted-foreground/40" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {product.name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {categoryName}
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        {formatCurrency(
                          product.price,
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Inventory */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                    <div className="rounded-xl bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground">
                        Stok
                      </p>

                      <p
                        className={cn(
                          "mt-2 text-xl font-semibold",
                          isOutOfStock &&
                            "text-destructive",
                        )}
                      >
                        {product.stock}
                      </p>
                    </div>

                    <div className="rounded-xl bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground">
                        Status Stok
                      </p>

                      <p
                        className={cn(
                          "mt-2 text-sm font-semibold",

                          isOutOfStock &&
                            "text-destructive",

                          isLowStock &&
                            "text-amber-700",

                          !isOutOfStock &&
                            !isLowStock &&
                            "text-emerald-700",
                        )}
                      >
                        {stockStatus}
                      </p>
                    </div>

                    <div className="col-span-2 rounded-xl bg-muted/40 p-3 sm:col-span-1">
                      <p className="text-xs text-muted-foreground">
                        Ketersediaan
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {product.isActive &&
                        product.stock > 0
                          ? "Tersedia"
                          : "Tidak tersedia"}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
} 