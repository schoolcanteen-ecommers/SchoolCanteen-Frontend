import { PageHeader } from "@/components/shared/page-header";

import { MerchantPickupBoard } from "@/features/pickup/components/merchant-pickup-board";

import { merchantOrders } from "@/mocks/orders";
import { merchantPickups } from "@/mocks/pickup";

export default function MerchantPickupPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pickup Verification"
        description="Verifikasi pengambilan pesanan yang sudah siap diserahkan kepada siswa."
      />

      <MerchantPickupBoard
        orders={merchantOrders}
        pickups={merchantPickups}
      />
    </div>
  );
}