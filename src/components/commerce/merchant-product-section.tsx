import {
  ShoppingBag,
  Store,
} from "lucide-react";

import { MerchantCard } from "@/components/commerce/merchant-card";
import { ProductCard } from "@/components/commerce/product-card";

import type { Merchant } from "@/types/merchant";
import type { Product } from "@/types/product";

interface MerchantProductSectionProps {
  merchant: Merchant;
  products: Product[];
}

export function MerchantProductSection({
  merchant,
  products,
}: MerchantProductSectionProps) {
  const isCanteen =
    merchant.type === "CANTEEN";

  const EmptyIcon = isCanteen
    ? Store
    : ShoppingBag;

  const itemLabel = isCanteen
    ? "Menu"
    : "Produk";

  const emptyTitle = isCanteen
    ? "Belum ada menu"
    : "Belum ada produk";

  const emptyDescription = isCanteen
    ? "Merchant ini belum memiliki menu aktif."
    : "Koperasi ini belum memiliki produk aktif.";

  return (
    <section className="space-y-6">
      <MerchantCard
        merchant={merchant}
        productCount={products.length}
      />

      <div>
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {itemLabel}
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Pilihan dari {merchant.name}
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                merchantName={merchant.name}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed bg-background p-8 text-center">
            <EmptyIcon className="size-8 text-muted-foreground/40" />

            <p className="mt-3 text-sm font-medium">
              {emptyTitle}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {emptyDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}