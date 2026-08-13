import {
  OrderList,
} from "@/features/orders/components/order-list";

import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  studentOrders,
} from "@/mocks/orders";

export default function StudentOrdersPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pesanan Saya"
        description="Pantau status dan riwayat pesanan kantin maupun koperasi."
      />

      <OrderList
        orders={studentOrders}
      />
    </div>
  );
}