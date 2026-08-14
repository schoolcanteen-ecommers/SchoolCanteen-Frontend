import { PageHeader } from "@/components/shared/page-header";

import { MerchantProductionSummary } from "@/features/production/components/merchant-production-summary";

import { merchantOrders } from "@/mocks/orders";

export default function MerchantProductionPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Production Summary"
        description="Lihat kebutuhan produksi berdasarkan pesanan yang sudah dikonfirmasi dan sedang diproses."
      />

      <MerchantProductionSummary
        orders={merchantOrders}
      />
    </div>
  );
}