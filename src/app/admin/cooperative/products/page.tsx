import {
  Package,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

import { AdminCooperativeProductList } from "@/features/cooperative/components/admin-cooperative-product-list";

import {
  getCooperativeCatalog,
} from "@/lib/api/catalog";

export default async function AdminCooperativeProductsPage() {
  const catalog =
    await getCooperativeCatalog();

  const outOfStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock <= 0,
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Produk Koperasi"
        description="Pantau produk, harga, dan ketersediaan barang pada koperasi sekolah."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Koperasi Tersedia"
          value={catalog.merchants.length}
          description="Merchant koperasi yang tampil"
          icon={ShoppingBag}
        />

        <StatCard
          title="Produk Tampil"
          value={catalog.products.length}
          description="Produk koperasi yang tersedia"
          icon={Package}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStockProducts}
          description="Produk yang perlu diperhatikan"
          icon={TriangleAlert}
        />
      </section>

      <AdminCooperativeProductList
        merchants={catalog.merchants}
        products={catalog.products}
        categories={catalog.categories}
      />
    </div>
  );
}