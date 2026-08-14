import {
  ImageIcon,
  Package,
  Store,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type { Merchant } from "@/types/merchant";
import type {
  Category,
  Product,
} from "@/types/product";

interface AdminCanteenMenuListProps {
  merchants: Merchant[];
  products: Product[];
  categories: Category[];
}

export function AdminCanteenMenuList({
  merchants,
  products,
  categories,
}: AdminCanteenMenuListProps) {
  const categoryMap = new Map(
    categories.map((category) => [
      category.id,
      category.name,
    ]),
  );

  const productsByMerchant =
    new Map<string, Product[]>();

  for (const product of products) {
    const current =
      productsByMerchant.get(
        product.merchantId,
      ) ?? [];

    current.push(product);

    productsByMerchant.set(
      product.merchantId,
      current,
    );
  }

  if (merchants.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={Store}
          title="Belum ada kantin"
          description="Data merchant kantin akan tampil di sini."
        />
      </div>
    );
  }

  return (
    <section className="mt-8 space-y-5">
      {merchants.map((merchant) => {
        const merchantProducts =
          productsByMerchant.get(
            merchant.id,
          ) ?? [];

        return (
          <article
            key={merchant.id}
            className="overflow-hidden rounded-2xl border bg-background"
          >
            <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                  {merchant.imageUrl ? (
                   
                    <img
                      src={merchant.imageUrl}
                      alt={merchant.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <Store className="size-6 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate font-semibold">
                      {merchant.name}
                    </h2>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      Aktif
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {merchantProducts.length} menu tampil
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="size-4" />
                {merchantProducts.length} produk
              </div>
            </div>

            {merchantProducts.length > 0 ? (
              <div className="divide-y">
                {merchantProducts.map(
                  (product) => {
                    const categoryName =
                      categoryMap.get(
                        product.categoryId,
                      ) ?? "Tanpa kategori";

                    const isOutOfStock =
                      product.stock <= 0;

                    return (
                      <div
                        key={product.id}
                        className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                            {product.imageUrl ? (
                             
                              <img
                                src={
                                  product.imageUrl
                                }
                                alt={product.name}
                                className="size-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="size-5 text-muted-foreground/40" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {categoryName}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:min-w-[300px]">
                          <div className="rounded-xl bg-muted/40 p-3">
                            <p className="text-xs text-muted-foreground">
                              Harga
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                              {formatCurrency(
                                product.price,
                              )}
                            </p>
                          </div>

                          <div className="rounded-xl bg-muted/40 p-3">
                            <p className="text-xs text-muted-foreground">
                              Stok
                            </p>

                            <p
                              className={cn(
                                "mt-1 text-sm font-semibold",
                                isOutOfStock &&
                                  "text-destructive",
                              )}
                            >
                              {isOutOfStock
                                ? "Habis"
                                : product.stock}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <div className="p-6">
                <p className="text-sm text-muted-foreground">
                  Merchant ini belum memiliki menu yang tampil.
                </p>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}