import {
  Boxes,
  ImageIcon,
  Package,
  PackageCheck,
  PackageX,
  TriangleAlert,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";

import { EmptyState } from "@/components/shared/empty-state";

import { MerchantStockEditor } from "@/features/inventory/components/merchant-stok-editor";

import { cn, formatCurrency } from "@/lib/utils";

import type { Category, Product } from "@/types/product";

interface MerchantInventoryListProps {
  products: Product[];
  categories: Category[];
}

const LOW_STOCK_THRESHOLD = 5;

export function MerchantInventoryList({
  products,
  categories,
}: MerchantInventoryListProps) {
  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  );

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD,
  );

  const outOfStockProducts = products.filter((product) => product.stock <= 0);

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  return (
    <>
      
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Stok"
          value={totalStock}
          description="Jumlah seluruh stok produk"
          icon={Boxes}
        />

        <StatCard
          title="Stok Rendah"
          value={lowStockProducts.length}
          description={`Produk dengan stok 1–${LOW_STOCK_THRESHOLD}`}
          icon={TriangleAlert}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStockProducts.length}
          description="Produk yang perlu diisi kembali"
          icon={PackageX}
        />
      </section>

      
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">Stok Produk</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pantau jumlah stok dan ketersediaan setiap produk merchant.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            <div className="divide-y">
              {products.map((product) => {
                const categoryName =
                  categoryMap.get(product.categoryId) ?? "Tanpa kategori";

                const isOutOfStock = product.stock <= 0;

                const isLowStock =
                  product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;

                const stockStatus = isOutOfStock
                  ? "Habis"
                  : isLowStock
                    ? "Stok Rendah"
                    : "Stok Aman";

                return (
                  <article key={product.id} className="p-4 sm:p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted sm:size-20">
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

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate font-semibold">
                              {product.name}
                            </h3>

                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",

                                product.isActive
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-700",
                              )}
                            >
                              {product.isActive ? "Aktif" : "Nonaktif"}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {categoryName}
                          </p>

                          <p className="mt-2 text-sm font-medium">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </div>

                      
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                        <div className="rounded-xl bg-muted/40 p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Package className="size-3.5" />
                            Stok
                          </div>

                          <p
                            className={cn(
                              "mt-2 text-xl font-semibold",

                              isOutOfStock && "text-destructive",
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

                              isOutOfStock && "text-destructive",

                              isLowStock && "text-amber-700",

                              !isOutOfStock &&
                                !isLowStock &&
                                "text-emerald-700",
                            )}
                          >
                            {stockStatus}
                          </p>
                        </div>

                        <div className="col-span-2 rounded-xl bg-muted/40 p-3 sm:col-span-1">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <PackageCheck className="size-3.5" />
                            Ketersediaan
                          </div>

                          <p className="mt-2 text-sm font-semibold">
                            {product.isActive && product.stock > 0
                              ? "Tersedia"
                              : "Tidak tersedia"}
                          </p>
                        </div>
                      </div>
                    </div>

                    
                    <div className="mt-4 border-t pt-4">
                      <p className="mb-2 text-xs font-medium text-muted-foreground">
                        Update Stok
                      </p>

                      <MerchantStockEditor
                        productId={product.id}
                        currentStock={product.stock}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={Package}
              title="Belum ada inventory"
              description="Stok produk merchant akan tampil di sini setelah produk tersedia."
            />
          </div>
        )}
      </section>
    </>
  );
}
