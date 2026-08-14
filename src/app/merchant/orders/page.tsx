import { PageHeader } from "@/components/shared/page-header";

import { MerchantOrderList } from "@/features/orders/components/merchant-order-list";

import { merchantOrders } from "@/mocks/orders";

export default function MerchantOrdersPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pesanan"
        description="Pantau seluruh pesanan masuk dan status pemrosesan pesanan merchant."
      />

      <MerchantOrderList
        orders={merchantOrders}
      />
    </div>
  );
}