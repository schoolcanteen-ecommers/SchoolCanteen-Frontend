import {
  Store,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

import { requireRole } from "@/features/auth/server/require-role";

import { MerchantProductList } from "@/features/products/components/merchant-product-list";

import {
  getCanteenCatalog,
  getCooperativeCatalog,
} from "@/lib/api/catalog";

export default async function MerchantProductsPage() {
    const profile =
    await requireRole("merchant");

    const [
    canteenCatalog,
    cooperativeCatalog,
  ] = await Promise.all([
    getCanteenCatalog(),
    getCooperativeCatalog(),
  ]);

    const merchant = [
    ...canteenCatalog.merchants,
    ...cooperativeCatalog.merchants,
  ].find(
    (item) =>
      item.ownerId === profile.id,
  );

    if (!merchant) {
    return (
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageHeader
          title="Produk"
          description="Kelola produk yang dijual oleh merchant."
        />

        <div className="mt-8">
          <EmptyState
            icon={Store}
            title="Merchant tidak ditemukan"
            description="Akun merchant belum terhubung dengan data merchant yang aktif."
          />
        </div>
      </div>
    );
  }

    const catalog =
    merchant.type === "CANTEEN"
      ? canteenCatalog
      : cooperativeCatalog;

    const products =
    catalog.products.filter(
      (product) =>
        product.merchantId ===
        merchant.id,
    );

    const categories =
    catalog.categories.filter(
      (category) =>
        category.merchantId ===
        merchant.id,
    );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Produk"
        description={`Pantau produk, harga, stok, dan status produk ${merchant.name}.`}
      />

      <MerchantProductList
        products={products}
        categories={categories}
      />
    </div>
  );
}