import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  OrderList,
} from "@/features/orders/components/order-list";

import {
  getStudentOrders,
} from "@/lib/api/student-orders";

export default async function StudentOrdersPage() {
  const profile =
    await requireRole("student");

  const orders =
    await getStudentOrders(
      profile.id,
    );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pesanan Saya"
        description="Pantau status dan riwayat pesanan kantin maupun koperasi."
      />

      <OrderList
        orders={orders}
      />
    </div>
  );
}
