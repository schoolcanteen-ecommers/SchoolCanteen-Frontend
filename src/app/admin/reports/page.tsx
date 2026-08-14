import { PageHeader } from "@/components/shared/page-header";

import { AdminReportOverview } from "@/features/reports/components/admin-report-overview";

import {
  merchantOrders,
  studentOrders,
} from "@/mocks/orders";

import {
  studentUserProfile,
} from "@/mocks/profile";

export default function AdminReportsPage() {
    const transactions = [
    ...merchantOrders.map(
      ({
        order,
        customerName,
      }) => ({
        order,
        customerName,
      }),
    ),

    ...studentOrders.map(
      ({ order }) => ({
        order,

        customerName:
          studentUserProfile.name,
      }),
    ),
  ];

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Reports"
        description="Lihat rangkuman aktivitas pesanan, transaksi, dan perdagangan SchoolCanteen."
      />

      <AdminReportOverview
        transactions={transactions}
      />
    </div>
  );
}