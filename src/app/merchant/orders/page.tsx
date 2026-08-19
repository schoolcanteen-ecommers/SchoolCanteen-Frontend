<<<<<<< HEAD
import { PageHeader } from "@/components/shared/page-header";

import { requireRole } from "@/features/auth/server/require-role";

=======
import { requireRole } from "@/features/auth/server/require-role";

>>>>>>> source/main
import { MerchantOrderList } from "@/features/orders/components/merchant-order-list";

import { getMerchantOrders } from "@/lib/api/merchant-orders";

export default async function MerchantOrdersPage() {
  await requireRole("merchant");

<<<<<<< HEAD
  const orders =
    await getMerchantOrders();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pesanan"
        description="Pantau seluruh pesanan masuk dan status pemrosesan pesanan merchant."
      />

      <MerchantOrderList
        orders={orders}
      />
=======
  const orders = await getMerchantOrders();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <MerchantOrderList orders={orders} />
>>>>>>> source/main
    </div>
  );
}
