import Link from "next/link";

import type {
  AdminOrderStatus,
  AdminRecentOrder,
} from "@/lib/api/admin-dashboard";
import {
  formatCurrency,
} from "@/lib/utils";

interface AdminRecentOrdersProps {
  orders: AdminRecentOrder[];
}

export function AdminRecentOrders({
  orders,
}: AdminRecentOrdersProps) {
  return (
    <section className="min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-heading text-[24px] font-semibold text-navy-steel">
          Recent Orders
        </h2>

        <Link
          href="/admin/transactions"
          className="text-sm font-medium text-[#59666F] transition-colors hover:text-navy-steel"
        >
          View All
        </Link>
      </div>

      {orders.length ? (
        <>
          <div className="hidden overflow-hidden rounded-[24px] border border-[#E6EAED] bg-white shadow-[0_12px_32px_rgba(13,27,42,0.025)] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E6EAED] bg-[#F7F9FB]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#59666F]">
                      Order Code
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#59666F]">
                      Student
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#59666F]">
                      Merchant
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.08em] text-[#59666F]">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#59666F]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(
                    (order) => (
                      <tr
                        key={order.id}
                        className="border-b border-[#EEF1F3] last:border-0"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-navy-steel">
                          {order.orderCode}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2D3133]">
                          {order.studentName}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2D3133]">
                          {order.merchantName}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-navy-steel">
                          {formatCurrency(
                            order.totalAmount,
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <OrderStatusBadge
                            status={order.status}
                          />
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3 lg:hidden">
            {orders.slice(0, 2).map(
              (order) => (
                <article
                  key={order.id}
                  className="rounded-xl border border-[#E7EBEE] bg-white p-4 shadow-[0_2px_8px_rgba(13,27,42,0.03)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold tracking-[0.04em] text-[#59666F]">
                      {order.orderCode}
                    </span>
                    <OrderStatusBadge
                      status={order.status}
                    />
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-navy-steel">
                        {order.studentName}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-[#59666F]">
                        {order.merchantName}
                      </p>
                    </div>

                    <p className="shrink-0 text-base font-bold text-navy-steel">
                      {formatCurrency(
                        order.totalAmount,
                      )}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </>
      ) : (
        <div className="rounded-[24px] border border-[#E6EAED] bg-white p-8 text-center text-sm text-[#59666F]">
          Belum ada order terbaru.
        </div>
      )}
    </section>
  );
}

interface OrderStatusBadgeProps {
  status: AdminOrderStatus;
}

function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const label =
    getOrderStatusLabel(status);

  const className =
    status === "CONFIRMED" ||
    status === "READY"
      ? "bg-arctic-blue text-navy-steel"
      : status === "CANCELLED"
        ? "bg-[#FFEEEA] text-[#93000A]"
        : "bg-[#ECEEF0] text-[#59666F]";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${className}`}
    >
      {label}
    </span>
  );
}

function getOrderStatusLabel(
  status: AdminOrderStatus,
): string {
  switch (status) {
    case "WAITING":
      return "Waiting";
    case "CONFIRMED":
      return "Confirmed";
    case "PREPARING":
      return "Preparing";
    case "READY":
      return "Ready";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
  }
}
