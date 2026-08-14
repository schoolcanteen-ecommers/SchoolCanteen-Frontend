import {
  Boxes,
  ImageIcon,
  Package,
  PackageCheck,
  PackageX,
  Tags,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/shared/empty-state";

import { cn, formatCurrency } from "@/lib/utils";

import type {
  Category,
  Product,
} from "@/types/product";

interface MerchantProductListProps {
  products: Product[];
  categories: Category[];
}

export function MerchantProductList({
  products,
  categories,
}: MerchantProductListProps) {
  const activeProducts = products.filter(
    (product) => product.isActive,
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock <= 0,
  ).length;

  const categoryMap = new Map(
    categories.map((category) => [
      category.id,
      category.name,
    ]),
  );

  return (
    <>
      {/* Statistics */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Produk"
          value={products.length}
          description="Produk yang terdaftar"
          icon={Package}
        />

        <StatCard
          title="Produk Aktif"
          value={activeProducts}
          description="Produk yang sedang aktif"
          icon={PackageCheck}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStockProducts}
          description="Produk yang perlu diperhatikan"
          icon={PackageX}
        />
      </section>

      {/* Product List */}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Daftar Produk
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pantau produk, harga, stok, kategori, dan
            status produk merchant.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const categoryName =
                categoryMap.get(
                  product.categoryId,
                ) ?? "Tanpa kategori";

              const isAvailable =
                product.isActive &&
                product.stock > 0;

              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border bg-background"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {product.imageUrl ? (
                     
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ImageIcon className="size-10 text-muted-foreground/40" />
                      </div>
                    )}

                    {/* Status */}
                    <div className="absolute left-3 top-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur",

                          product.isActive
                            ? "bg-emerald-50/95 text-emerald-700"
                            : "bg-slate-100/95 text-slate-700",
                        )}
                      >
                        {product.isActive
                          ? "Aktif"
                          : "Nonaktif"}
                      </span>
                    </div>

                    {/* Availability */}
                    <div className="absolute right-3 top-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur",

                          isAvailable
                            ? "bg-background/95 text-foreground"
                            : "bg-destructive text-destructive-foreground",
                        )}
                      >
                        {product.stock > 0
                          ? `Stok ${product.stock}`
                          : "Stok Habis"}
                      </span>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 font-semibold">
                          {product.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Tags className="size-3.5" />

                          <span className="truncate">
                            {categoryName}
                          </span>
                        </div>
                      </div>

                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Boxes className="size-4 text-primary" />
                      </div>
                    </div>

                    {product.description && (
                      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mt-5 border-t pt-4">
                      <p className="text-xs text-muted-foreground">
                        Harga
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {formatCurrency(
                          product.price,
                        )}
                      </p>
                    </div>

                    {/* Inventory */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Stok
                        </p>

                        <p
                          className={cn(
                            "mt-1 font-semibold",

                            product.stock <= 0 &&
                              "text-destructive",
                          )}
                        >
                          {product.stock}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Ketersediaan
                        </p>

                        <p
                          className={cn(
                            "mt-1 text-sm font-semibold",

                            isAvailable
                              ? "text-emerald-700"
                              : "text-muted-foreground",
                          )}
                        >
                          {isAvailable
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
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={Package}
              title="Belum ada produk"
              description="Produk yang dimiliki merchant akan tampil di sini."
            />
          </div>
        )}
      </section>
    </>
  );
}