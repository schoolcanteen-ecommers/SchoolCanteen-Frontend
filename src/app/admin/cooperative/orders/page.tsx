import {
  CircleDollarSign,
  ClipboardList,
  PackageCheck,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

import { AdminCooperativeOrderList } from "@/features/cooperative/components/admin-cooperative-order-list";

import { formatCurrency } from "@/lib/utils";

import {
  studentOrders,
} from "@/mocks/orders";

export default function AdminCooperativeOrdersPage() {
    const cooperativeOrders =
    studentOrders.filter(
      ({ order }) =>
        order.orderCode.startsWith(
          "SC-KOP-",
        ),
    );

  const completedOrders =
    cooperativeOrders.filter(
      ({ order }) =>
        order.status ===
        "COMPLETED",
    ).length;

  const totalTransactionValue =
    cooperativeOrders.reduce(
      (total, { order }) =>
        total +
        order.totalPrice,
      0,
    );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Pesanan Koperasi"
        description="Pantau pesanan dan transaksi yang terjadi melalui koperasi sekolah."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Pesanan Terpantau"
          value={cooperativeOrders.length}
          description="Data pesanan koperasi"
          icon={ClipboardList}
        />

        <StatCard
          title="Pesanan Selesai"
          value={completedOrders}
          description="Pesanan berstatus selesai"
          icon={PackageCheck}
        />

        <StatCard
          title="Nilai Transaksi"
          value={formatCurrency(
            totalTransactionValue,
          )}
          description="Total nominal pesanan"
          icon={CircleDollarSign}
        />
      </section>

      <AdminCooperativeOrderList
        orders={cooperativeOrders}
      />
    </div>
  );
}