import {
  CircleDollarSign,
  Clock3,
  ReceiptText,
  RotateCcw,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

import { AdminTransactionList } from "@/features/transactions/components/admin-transaction-list";

import { formatCurrency } from "@/lib/utils";

import {
  merchantOrders,
  studentOrders,
} from "@/mocks/orders";

import {
  studentUserProfile,
} from "@/mocks/profile";

export default function AdminTransactionsPage() {
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
  ].sort(
    (a, b) =>
      new Date(
        b.order.createdAt,
      ).getTime() -
      new Date(
        a.order.createdAt,
      ).getTime(),
  );

  const heldAmount =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus ===
          "HELD",
      )
      .reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

  const releasedAmount =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus ===
          "RELEASED",
      )
      .reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

  const refundedAmount =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus ===
          "REFUNDED",
      )
      .reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Transaction Monitoring"
        description="Pantau status pembayaran dan pergerakan dana dari transaksi SchoolCanteen."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Transaksi Terpantau"
          value={
            transactions.length
          }
          description="Order dalam data monitoring"
          icon={ReceiptText}
        />

        <StatCard
          title="Dana Tertahan"
          value={formatCurrency(
            heldAmount,
          )}
          description="Pembayaran berstatus HELD"
          icon={Clock3}
        />

        <StatCard
          title="Dana Diteruskan"
          value={formatCurrency(
            releasedAmount,
          )}
          description="Pembayaran berstatus RELEASED"
          icon={CircleDollarSign}
        />

        <StatCard
          title="Dana Dikembalikan"
          value={formatCurrency(
            refundedAmount,
          )}
          description="Pembayaran berstatus REFUNDED"
          icon={RotateCcw}
        />
      </section>

      <AdminTransactionList
        transactions={transactions}
      />
    </div>
  );
}