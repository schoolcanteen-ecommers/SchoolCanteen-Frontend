import {
  Package,
  Store,
  TriangleAlert,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

import { AdminCanteenMenuList } from "@/features/canteen/components/admin-canteen-menu-list";

import { getCanteenCatalog } from "@/lib/api/catalog";

export default async function AdminCanteenMenuPage() {
  const catalog =
    await getCanteenCatalog();

  const outOfStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock <= 0,
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Menu Management"
        description="Pantau menu, harga, dan ketersediaan produk pada kantin sekolah."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Kantin Tersedia"
          value={catalog.merchants.length}
          description="Merchant kantin yang tampil"
          icon={Store}
        />

        <StatCard
          title="Menu Tampil"
          value={catalog.products.length}
          description="Produk kantin yang tersedia"
          icon={Package}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStockProducts}
          description="Menu yang perlu diperhatikan"
          icon={TriangleAlert}
        />
      </section>

      <AdminCanteenMenuList
        merchants={catalog.merchants}
        products={catalog.products}
        categories={catalog.categories}
      />
    </div>
  );
}