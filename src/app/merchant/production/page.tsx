<<<<<<< HEAD
import { PageHeader } from "@/components/shared/page-header";

import { requireRole } from "@/features/auth/server/require-role";

import { MerchantProductionSummary } from "@/features/production/components/merchant-production-summary";

import { getMerchantOrders } from "@/lib/api/merchant-orders";

export default async function MerchantProductionPage() {
  await requireRole("merchant");

  const orders =
    await getMerchantOrders();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Production Summary"
        description="Lihat kebutuhan produksi berdasarkan pesanan yang sudah dikonfirmasi dan sedang diproses."
      />

      <MerchantProductionSummary
        orders={orders}
=======
import {
  MerchantProductionSummary,
} from "@/features/production/components/merchant-production-summary";

import {
  getMerchantProductionSummary,
} from "@/lib/api/merchant-production";

export default async function MerchantProductionPage() {
  const data =
    await getMerchantProductionSummary();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <header className="mb-8 lg:mb-10">
        <h1 className="font-heading text-3xl font-bold text-navy-steel sm:text-4xl lg:text-5xl">
          Produksi Hari Ini
        </h1>

        <p className="mt-2 text-sm text-[#64748B] sm:text-base">
          Lihat makanan dan minuman yang perlu disiapkan dari pesanan aktif.
        </p>
      </header>

      <MerchantProductionSummary
        data={data}
>>>>>>> source/main
      />
    </div>
  );
}
