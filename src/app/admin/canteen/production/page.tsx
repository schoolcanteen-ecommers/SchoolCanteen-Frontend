import { PageHeader } from "@/components/shared/page-header";

import { AdminCanteenProductionSummary } from "@/features/canteen/components/admin-canteen-production-summary";

import { merchantOrders } from "@/mocks/orders";

export default function AdminCanteenProductionPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Production Summary"
        description="Pantau kebutuhan produksi berdasarkan pesanan kantin yang sedang diproses."
      />

      <AdminCanteenProductionSummary
        orders={merchantOrders}
      />
    </div>
  );
}