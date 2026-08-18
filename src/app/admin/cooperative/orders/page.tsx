import {
  CheckCircle2,
  Clock3,
  ReceiptText,
} from "lucide-react";

import { AdminCooperativeOrderList } from "@/features/cooperative/components/admin-cooperative-order-list";
import { adminCooperativeOrders } from "@/mocks/admin-cooperative-orders";

const PENDING_STATUSES = new Set([
  "WAITING",
  "CONFIRMED",
  "PREPARING",
  "READY",
]);

export default function AdminCooperativeOrdersPage() {
  const totalOrders = adminCooperativeOrders.length;
  const completedOrders = adminCooperativeOrders.filter(
    (order) => order.status === "COMPLETED",
  ).length;
  const pendingOrders = adminCooperativeOrders.filter((order) =>
    PENDING_STATUSES.has(order.status),
  ).length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div>
        <h1 className="font-serif text-[30px] font-bold leading-[38px] tracking-[-0.02em] text-[#0D1B2A] sm:text-[34px]">
          Cooperative Orders
        </h1>
        <p className="mt-1 text-sm text-[#536069] sm:text-base">
          Monitor transaksi pesanan koperasi SchoolCanteen.
        </p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
        <article className="relative overflow-hidden rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="absolute -right-10 -top-10 size-32 rounded-bl-full bg-[#E6F4FF]/70" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                Total Orders
              </p>
              <p className="mt-2 font-serif text-3xl font-bold text-[#0D1B2A]">
                {totalOrders}
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-full bg-[#E6F4FF] text-[#0D1B2A]">
              <ReceiptText className="size-5" />
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="absolute -right-10 -top-10 size-32 rounded-bl-full bg-emerald-50" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                Completed Orders
              </p>
              <p className="mt-2 font-serif text-3xl font-bold text-[#0D1B2A]">
                {completedOrders}
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="absolute -right-10 -top-10 size-32 rounded-bl-full bg-[#FEDDBA]/60" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                Pending Orders
              </p>
              <p className="mt-2 font-serif text-3xl font-bold text-[#0D1B2A]">
                {pendingOrders}
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-full bg-[#FEDDBA]/70 text-[#584329]">
              <Clock3 className="size-5" />
            </div>
          </div>
        </article>
      </section>

      <AdminCooperativeOrderList orders={adminCooperativeOrders} />
    </div>
  );
}