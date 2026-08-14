import {
  Boxes,
  PackageX,
  TriangleAlert,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

import { AdminCooperativeInventoryList } from "@/features/cooperative/components/admin-cooperative-inventory-list";

import {
  getCooperativeCatalog,
} from "@/lib/api/catalog";

const LOW_STOCK_THRESHOLD = 5;

export default async function AdminCooperativeInventoryPage() {
  const catalog =
    await getCooperativeCatalog();

  const totalStock =
    catalog.products.reduce(
      (total, product) =>
        total + product.stock,
      0,
    );

  const lowStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <=
          LOW_STOCK_THRESHOLD,
    ).length;

  const outOfStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock <= 0,
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Inventory Koperasi"
        description="Pantau stok dan ketersediaan seluruh produk koperasi sekolah."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Stok"
          value={totalStock}
          description="Jumlah seluruh stok produk"
          icon={Boxes}
        />

        <StatCard
          title="Stok Rendah"
          value={lowStockProducts}
          description="Produk dengan stok 1–5"
          icon={TriangleAlert}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStockProducts}
          description="Produk yang perlu diisi"
          icon={PackageX}
        />
      </section>

      <AdminCooperativeInventoryList
        products={catalog.products}
        categories={catalog.categories}
      />
    </div>
  );
}