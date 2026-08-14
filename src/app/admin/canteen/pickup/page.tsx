import { PageHeader } from "@/components/shared/page-header";

import { AdminCanteenPickupList } from "@/features/canteen/components/admin-canteen-pickup-list";

import { merchantOrders } from "@/mocks/orders";
import { merchantPickups } from "@/mocks/pickup";

export default function AdminCanteenPickupPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pickup Verification"
        description="Pantau proses dan status pengambilan pesanan siswa pada kantin."
      />

      <AdminCanteenPickupList
        pickups={merchantPickups}
        orders={merchantOrders}
      />
    </div>
  );
}