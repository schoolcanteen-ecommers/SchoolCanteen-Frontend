import {
  ShoppingBasket,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import {
  StatCard,
} from "@/components/dashboard/stat-card";

import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  AdminMerchantList,
} from "@/features/merchants/components/admin-merchant-list";

import {
  getAdminMerchants,
} from "@/lib/api/admin-merchants";

export default async function AdminMerchantsPage() {
  const merchants =
    await getAdminMerchants();

  const activeMerchantCount =
    merchants.filter(
      (merchant) =>
        merchant.status ===
        "ACTIVE",
    ).length;

  const canteenCount =
    merchants.filter(
      (merchant) =>
        merchant.type ===
        "CANTEEN",
    ).length;

  const cooperativeCount =
    merchants.filter(
      (merchant) =>
        merchant.type ===
        "COOPERATIVE",
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Merchant Management"
        description="Pantau merchant kantin dan koperasi yang tersedia di SchoolCanteen."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Merchant Aktif"
          value={
            activeMerchantCount
          }
          description="Merchant yang sedang aktif"
          icon={Store}
        />

        <StatCard
          title="Kantin"
          value={
            canteenCount
          }
          description="Merchant kategori kantin"
          icon={
            UtensilsCrossed
          }
        />

        <StatCard
          title="Koperasi"
          value={
            cooperativeCount
          }
          description="Merchant kategori koperasi"
          icon={
            ShoppingBasket
          }
        />
      </section>

      <AdminMerchantList
        merchants={
          merchants
        }
      />
    </div>
  );
}