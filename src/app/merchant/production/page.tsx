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
      />
    </div>
  );
}