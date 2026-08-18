"use client";

import {
  Clock3,
  Eye,
  LoaderCircle,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import {
  useState,
} from "react";

import {
  ProductionStatusBadge,
} from "@/features/canteen/components/admin/production-summary/production-status-badge";

import {
  getAdminCanteenProductionClientPage,
} from "@/lib/api/admin-canteen-production-client";
import type {
  AdminCanteenProductionFilters,
  AdminProductionPagination,
  AdminProductionRow,
} from "@/lib/api/admin-canteen-production";

interface AdminProductionListProps {
  initialRows: AdminProductionRow[];
  pagination: AdminProductionPagination;
  filters: AdminCanteenProductionFilters;
}

export function AdminProductionList({
  initialRows,
  pagination: initialPagination,
  filters,
}: AdminProductionListProps) {
  const [rows, setRows] = useState(initialRows);
  const [pagination, setPagination] =
    useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  async function loadMore() {
    if (
      loading ||
      !pagination.hasNextPage
    ) {
      return;
    }

    setLoading(true);
    setLoadError("");

    try {
      const next =
        await getAdminCanteenProductionClientPage(
          filters,
          pagination.page + 1,
        );

      setRows((current) => [
        ...current,
        ...next.rows,
      ]);
      setPagination(next.pagination);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Gagal memuat data produksi berikutnya.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (initialRows.length === 0) {
    return (
      <div className="rounded-[18px] border border-[#E0E3E5] bg-white px-6 py-14 text-center">
        <UtensilsCrossed className="mx-auto size-9 text-[#74777D]" />
        <h2 className="mt-4 font-heading text-xl font-semibold text-navy-steel">
          Belum ada kebutuhan produksi
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#536069]">
          Production group dari pesanan Confirmed, Preparing, atau Ready akan tampil di sini.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-b-[18px] border border-[#E0E3E5] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-[#E0E3E5] bg-[#F7F9FB]">
              <tr>
                <Heading>Merchant</Heading>
                <Heading>Product</Heading>
                <Heading center>Quantity</Heading>
                <Heading>Pickup Slot</Heading>
                <Heading center>Orders</Heading>
                <Heading>Status</Heading>
                <Heading right>Action</Heading>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3E5]/70">
              {initialRows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-arctic-blue/20"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <MerchantAvatar
                        name={row.merchant.name}
                      />
                      <span className="text-sm font-semibold text-navy-steel">
                        {row.merchant.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#191C1E]">
                    {row.product.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex min-w-10 justify-center rounded-lg bg-[#F2F4F6] px-3 py-1 text-sm font-semibold text-navy-steel">
                      {row.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#536069]">
                    <PickupSlot row={row} />
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-[#536069]">
                    {row.orderCount}
                  </td>
                  <td className="px-6 py-4">
                    <ProductionStatusBadge
                      status={row.status}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/canteen/production/${row.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#CBD5E1] px-3 py-2 text-xs font-bold text-navy-steel transition-colors hover:bg-arctic-blue"
                    >
                      <Eye className="size-4" />
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DesktopPagination
          pagination={initialPagination}
          filters={filters}
        />
      </div>

      <div className="space-y-4 md:hidden">
        {rows.map((row) => (
          <MobileProductionCard
            key={row.id}
            row={row}
          />
        ))}

        {loadError ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {loadError}
          </p>
        ) : null}

        {pagination.hasNextPage ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold uppercase tracking-[0.05em] text-navy-steel transition-colors hover:bg-[#F2F4F6] disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : null}
            {loading ? "Loading" : "Load More"}
          </button>
        ) : null}
      </div>
    </>
  );
}

function MobileProductionCard({
  row,
}: {
  row: AdminProductionRow;
}) {
  return (
    <article className="relative overflow-hidden rounded-[18px] border border-[#E0E3E5] bg-white p-5 shadow-[0_4px_6px_rgba(13,27,42,0.02)]">
      <div
        className={`absolute inset-y-0 left-0 w-1 ${
          row.status === "READY"
            ? "bg-emerald-100"
            : "bg-arctic-blue"
        }`}
      />

      <div className="pl-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold uppercase tracking-wide text-[#74777D]">
              {row.merchant.name}
            </p>
            <h2 className="mt-1 line-clamp-2 text-lg font-semibold leading-6 text-navy-steel">
              {row.product.name}
            </h2>
          </div>

          <ProductionStatusBadge
            status={row.status}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-[#536069]">
          <div className="flex items-start gap-2">
            <UtensilsCrossed className="mt-0.5 size-4 shrink-0" />
            <span>
              <strong className="font-medium text-navy-steel">
                {row.quantity}
              </strong>{" "}
              Portion
            </span>
          </div>
          <PickupSlot row={row} />
        </div>

        <div className="mt-5 flex justify-end border-t border-[#E0E3E5] pt-4">
          <Link
            href={`/admin/canteen/production/${row.id}`}
            className="inline-flex min-h-11 min-w-[160px] items-center justify-center rounded-xl border border-navy-steel px-5 text-xs font-bold uppercase tracking-[0.05em] text-navy-steel transition-colors hover:bg-arctic-blue"
          >
            View Detail
          </Link>
        </div>
      </div>
    </article>
  );
}

function MerchantAvatar({
  name,
}: {
  name: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-xs font-bold text-navy-steel">
      {initials || "K"}
    </span>
  );
}

function PickupSlot({
  row,
}: {
  row: AdminProductionRow;
}) {
  if (
    !row.pickupSlot.startAt ||
    !row.pickupSlot.endAt
  ) {
    return <span>Belum tersedia</span>;
  }

  return (
    <span className="flex items-start gap-1.5">
      <Clock3 className="mt-0.5 size-4 shrink-0" />
      <span>
        {formatTime(row.pickupSlot.startAt)} –{" "}
        {formatTime(row.pickupSlot.endAt)}
      </span>
    </span>
  );
}

function Heading({
  children,
  center = false,
  right = false,
}: {
  children: React.ReactNode;
  center?: boolean;
  right?: boolean;
}) {
  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-[0.05em] text-[#536069] ${
        center
          ? "text-center"
          : right
            ? "text-right"
            : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function DesktopPagination({
  pagination,
  filters,
}: {
  pagination: AdminProductionPagination;
  filters: AdminCanteenProductionFilters;
}) {
  const from =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) *
          pagination.pageSize +
        1;
  const to = Math.min(
    pagination.total,
    pagination.page * pagination.pageSize,
  );

  return (
    <div className="flex items-center justify-between border-t border-[#E0E3E5] bg-[#F7F9FB] px-5 py-4">
      <p className="text-sm text-[#536069]">
        Showing {from} to {to} of{" "}
        {pagination.total} entries
      </p>

      <div className="flex gap-2">
        <PaginationLink
          page={pagination.page - 1}
          disabled={!pagination.hasPreviousPage}
          filters={filters}
        >
          Previous
        </PaginationLink>
        <PaginationLink
          page={pagination.page + 1}
          disabled={!pagination.hasNextPage}
          filters={filters}
        >
          Next
        </PaginationLink>
      </div>
    </div>
  );
}

function PaginationLink({
  page,
  disabled,
  filters,
  children,
}: {
  page: number;
  disabled: boolean;
  filters: AdminCanteenProductionFilters;
  children: React.ReactNode;
}) {
  const href = buildPageHref(page, filters);

  if (disabled) {
    return (
      <span className="rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-[#74777D] opacity-40">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-navy-steel transition-colors hover:bg-arctic-blue"
    >
      {children}
    </Link>
  );
}

function buildPageHref(
  page: number,
  filters: AdminCanteenProductionFilters,
): string {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }
  if (filters.search) {
    params.set("search", filters.search);
  }
  if (filters.merchantId) {
    params.set("merchant", filters.merchantId);
  }
  if (filters.pickupSlotId) {
    params.set("pickup", filters.pickupSlotId);
  }
  if (filters.status) {
    params.set("status", filters.status);
  }

  const query = params.toString();

  return query
    ? `/admin/canteen/production?${query}`
    : "/admin/canteen/production";
}

function formatTime(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(new Date(value))
    .replace(".", ":");
}
