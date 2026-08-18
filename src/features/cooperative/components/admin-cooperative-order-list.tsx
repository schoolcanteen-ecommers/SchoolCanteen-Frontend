"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { cn, formatCurrency } from "@/lib/utils";
import type {
  AdminCooperativeOrderMonitoringItem,
  AdminCooperativePickupStatus,
} from "@/mocks/admin-cooperative-orders";
import type { OrderStatus } from "@/types/order";

interface AdminCooperativeOrderListProps {
  orders: AdminCooperativeOrderMonitoringItem[];
}

type DateFilter = "ALL" | "TODAY" | "7_DAYS" | "30_DAYS";

const DESKTOP_PAGE_SIZE = 8;
const MOBILE_BATCH_SIZE = 4;

const STATUS_OPTIONS: Array<{
  value: "ALL" | OrderStatus;
  label: string;
}> = [
  { value: "ALL", label: "All Statuses" },
  { value: "WAITING", label: "Waiting" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PREPARING", label: "Preparing" },
  { value: "READY", label: "Ready" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const DATE_OPTIONS: Array<{ value: DateFilter; label: string }> = [
  { value: "ALL", label: "All Time" },
  { value: "TODAY", label: "Today" },
  { value: "7_DAYS", label: "Last 7 Days" },
  { value: "30_DAYS", label: "Last 30 Days" },
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function matchesDateFilter(createdAt: string, filter: DateFilter) {
  if (filter === "ALL") {
    return true;
  }

  const today = startOfDay(new Date());
  const orderDate = startOfDay(new Date(createdAt));
  const diffDays = Math.floor(
    (today.getTime() - orderDate.getTime()) / 86_400_000,
  );

  if (filter === "TODAY") {
    return diffDays === 0;
  }

  if (filter === "7_DAYS") {
    return diffDays >= 0 && diffDays < 7;
  }

  return diffDays >= 0 && diffDays < 30;
}

function getStatusLabel(status: OrderStatus) {
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

function getPickupLabel(status: AdminCooperativePickupStatus) {
  switch (status) {
    case "PICKED_UP":
      return "Picked Up";
    case "WAITING":
      return "Waiting";
    case "NOT_READY":
      return "—";
  }
}

function orderStatusClasses(status: OrderStatus) {
  if (status === "COMPLETED") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "CANCELLED") {
    return "bg-red-50 text-red-700";
  }

  if (status === "READY") {
    return "bg-cyan-50 text-cyan-800";
  }

  if (status === "PREPARING") {
    return "bg-[#E6F4FF] text-[#0D1B2A]";
  }

  return "bg-[#FEDDBA]/60 text-[#584329]";
}

function getDesktopItems(order: AdminCooperativeOrderMonitoringItem) {
  return order.items
    .map((item) => `${item.productName} ×${item.quantity}`)
    .join(", ");
}

function getMobileItems(order: AdminCooperativeOrderMonitoringItem) {
  const [firstItem, ...rest] = order.items;

  if (!firstItem) {
    return "Tidak ada item";
  }

  const first = `${firstItem.productName} ×${firstItem.quantity}`;
  return rest.length > 0 ? `${first} +${rest.length} item lainnya` : first;
}

function formatOrderDate(createdAt: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

export function AdminCooperativeOrderList({
  orders,
}: AdminCooperativeOrderListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | OrderStatus>("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilter>("ALL");
  const [studentId, setStudentId] = useState("ALL");
  const [page, setPage] = useState(1);
  const [mobileVisible, setMobileVisible] = useState(MOBILE_BATCH_SIZE);

  const students = useMemo(() => {
    const map = new Map<string, string>();
    orders.forEach((order) => map.set(order.student.id, order.student.name));
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("id-ID");

    return orders.filter((order) => {
      const matchesQuery =
        normalized.length === 0 ||
        order.orderCode.toLocaleLowerCase("id-ID").includes(normalized) ||
        order.student.name.toLocaleLowerCase("id-ID").includes(normalized) ||
        order.merchantName.toLocaleLowerCase("id-ID").includes(normalized) ||
        order.items.some((item) =>
          item.productName.toLocaleLowerCase("id-ID").includes(normalized),
        );

      const matchesStatus = status === "ALL" || order.status === status;
      const matchesStudent = studentId === "ALL" || order.student.id === studentId;
      const matchesDate = matchesDateFilter(order.createdAt, dateFilter);

      return matchesQuery && matchesStatus && matchesStudent && matchesDate;
    });
  }, [dateFilter, orders, query, status, studentId]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / DESKTOP_PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const desktopOrders = filteredOrders.slice(
    (safePage - 1) * DESKTOP_PAGE_SIZE,
    safePage * DESKTOP_PAGE_SIZE,
  );
  const mobileOrders = filteredOrders.slice(0, mobileVisible);

  function resetPaging() {
    setPage(1);
    setMobileVisible(MOBILE_BATCH_SIZE);
  }

  if (orders.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={Search}
          title="Belum ada pesanan koperasi"
          description="Pesanan koperasi akan tampil di sini."
        />
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="rounded-[18px] border border-[#C4C6CC]/60 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-4 border-b border-[#C4C6CC]/40 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#74777d]" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                resetPaging();
              }}
              placeholder="Search order..."
              className="h-12 w-full rounded-xl border border-[#C4C6CC]/70 bg-white pl-12 pr-4 text-sm text-[#0D1B2A] outline-none transition focus:border-[#0D1B2A] focus:ring-1 focus:ring-[#0D1B2A]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            <label className="relative shrink-0">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as "ALL" | OrderStatus);
                  resetPaging();
                }}
                className="h-10 appearance-none rounded-xl border border-[#C4C6CC]/70 bg-[#0D1B2A] px-4 pr-9 text-xs font-semibold text-white outline-none lg:bg-white lg:text-[#536069]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">⌄</span>
            </label>

            <label className="relative shrink-0">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#536069]" />
              <select
                value={dateFilter}
                onChange={(event) => {
                  setDateFilter(event.target.value as DateFilter);
                  resetPaging();
                }}
                className="h-10 appearance-none rounded-xl border border-[#C4C6CC]/70 bg-white pl-9 pr-9 text-xs font-semibold text-[#536069] outline-none"
              >
                {DATE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#536069]">⌄</span>
            </label>

            <label className="relative shrink-0">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#536069]" />
              <select
                value={studentId}
                onChange={(event) => {
                  setStudentId(event.target.value);
                  resetPaging();
                }}
                className="h-10 max-w-[170px] appearance-none rounded-xl border border-[#C4C6CC]/70 bg-white pl-9 pr-9 text-xs font-semibold text-[#536069] outline-none"
              >
                <option value="ALL">All Students</option>
                {students.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#536069]">⌄</span>
            </label>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Search}
              title="Pesanan tidak ditemukan"
              description="Ubah kata pencarian atau filter untuk melihat pesanan lain."
            />
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#C4C6CC]/40 bg-[#F7F9FB]">
                    {[
                      "Order Code",
                      "Student",
                      "Items",
                      "Total",
                      "Status",
                      "Pickup",
                      "Date",
                      "Action",
                    ].map((label) => (
                      <th
                        key={label}
                        className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.05em] text-[#536069]"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C4C6CC]/30">
                  {desktopOrders.map((order) => (
                    <tr key={order.id} className="transition hover:bg-[#F7F9FB]">
                      <td className="px-5 py-4 text-sm font-bold text-[#0D1B2A]">
                        {order.orderCode}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#191c1e]">
                        {order.student.name}
                      </td>
                      <td className="max-w-[260px] px-5 py-4 text-sm text-[#536069]">
                        <span className="line-clamp-2">{getDesktopItems(order)}</span>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-[#0D1B2A]">
                        {formatCurrency(order.totalPrice)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                            orderStatusClasses(order.status),
                          )}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#536069]">
                        {getPickupLabel(order.pickup.status)}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#536069]">
                        {formatOrderDate(order.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/cooperative/orders/${encodeURIComponent(order.id)}`}
                          aria-label={`View ${order.orderCode}`}
                          className="inline-flex size-9 items-center justify-center rounded-full text-[#74777d] transition hover:bg-[#F2F4F6] hover:text-[#0D1B2A]"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 p-4 md:hidden">
              {mobileOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-[18px] border border-[#C4C6CC]/60 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold uppercase tracking-[0.05em] text-[#0D1B2A]">
                        {order.orderCode}
                      </p>
                      <p className="mt-1 text-sm text-[#536069]">{order.student.name}</p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1 text-[11px] font-bold",
                        orderStatusClasses(order.status),
                      )}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="my-4 flex items-center justify-between gap-4 border-y border-[#C4C6CC]/50 py-4">
                    <p className="min-w-0 flex-1 text-base text-[#0D1B2A]">
                      {getMobileItems(order)}
                    </p>
                    <p className="shrink-0 text-lg font-bold text-[#0D1B2A]">
                      {formatCurrency(order.totalPrice)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#536069]">
                      {formatOrderDate(order.createdAt)}
                    </span>
                    <Link
                      href={`/admin/cooperative/orders/${encodeURIComponent(order.id)}`}
                      className="rounded-xl bg-[#E6F4FF] px-5 py-2.5 text-sm font-semibold text-[#0D1B2A] transition hover:bg-[#D6E4EF]"
                    >
                      View Detail
                    </Link>
                  </div>
                </article>
              ))}

              {mobileVisible < filteredOrders.length ? (
                <button
                  type="button"
                  onClick={() => setMobileVisible((current) => current + MOBILE_BATCH_SIZE)}
                  className="w-full rounded-xl border border-[#C4C6CC]/70 bg-white py-3 text-sm font-semibold text-[#0D1B2A] transition hover:bg-[#F7F9FB]"
                >
                  Load More
                </button>
              ) : (
                <p className="py-3 text-center text-xs text-[#74777d]">End of list</p>
              )}
            </div>

            <div className="hidden items-center justify-between border-t border-[#C4C6CC]/40 bg-[#F7F9FB] px-5 py-4 text-sm text-[#536069] md:flex">
              <p>
                Showing {(safePage - 1) * DESKTOP_PAGE_SIZE + 1} to {Math.min(
                  safePage * DESKTOP_PAGE_SIZE,
                  filteredOrders.length,
                )} of {filteredOrders.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={safePage <= 1}
                  className="flex size-9 items-center justify-center rounded-lg border border-[#C4C6CC]/60 bg-white text-[#536069] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="min-w-16 text-center text-xs font-semibold text-[#0D1B2A]">
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={safePage >= totalPages}
                  className="flex size-9 items-center justify-center rounded-lg border border-[#C4C6CC]/60 bg-white text-[#536069] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}