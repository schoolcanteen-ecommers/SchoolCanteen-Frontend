<<<<<<< HEAD
import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  MerchantPickupBoard,
} from "@/features/pickup/components/merchant-pickup-board";

import {
  getMerchantOrders,
} from "@/lib/api/merchant-orders";

export default async function MerchantPickupPage() {
  await requireRole(
    "merchant",
  );

  const orders =
    await getMerchantOrders();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pickup Verification"
        description="Verifikasi pengambilan pesanan yang sudah siap diserahkan kepada siswa."
      />

      <MerchantPickupBoard
        orders={orders}
      />
=======
import { requireRole } from "@/features/auth/server/require-role";
import { MerchantPickupBoard } from "@/features/pickup/components/merchant-pickup-board";
import { getMerchantOrders } from "@/lib/api/merchant-orders";

export default async function MerchantPickupPage() {
  await requireRole("merchant");

  const orders = await getMerchantOrders();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <MerchantPickupBoard orders={orders} />
>>>>>>> source/main
    </div>
  );
}
