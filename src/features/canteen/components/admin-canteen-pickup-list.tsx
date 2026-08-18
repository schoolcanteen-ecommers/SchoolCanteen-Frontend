"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  MoreVertical,
  PackageCheck,
  Search,
  Store,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import type {
  AdminPickupMonitoringEntry,
  AdminPickupOrderStatus,
} from "@/mocks/admin-pickup-monitoring";

interface AdminCanteenPickupListProps {
  entries: AdminPickupMonitoringEntry[];
}

type QuickFilter =
  | "ALL"
  | "WAITING_PICKUP"
  | "READY"
  | "COMPLETED_TODAY";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 4;
const TODAY = "2026-08-17";

export function AdminCanteenPickupList({
  entries,
}: AdminCanteenPickupListProps) {
  const [search, setSearch] = useState("");
  const [merchantId, setMerchantId] =
    useState("");
  const [orderStatus, setOrderStatus] =
    useState<"" | AdminPickupOrderStatus>("");
  const [pickupSlotId, setPickupSlotId] =
    useState("");
  const [quickFilter, setQuickFilter] =
    useState<QuickFilter>("ALL");
  const [page, setPage] = useState(1);
  const [mobileVisible, setMobileVisible] =
    useState(MOBILE_PAGE_SIZE);

  const waitingPickup = useMemo(
    () =>
      entries.filter(
        (entry) =>
          entry.orderStatus === "READY" &&
          entry.pickupStatus === "WAITING",
      ).length,
    [entries],
  );

  const readyOrders = useMemo(
    () =>
      entries.filter(
        (entry) => entry.orderStatus === "READY",
      ).length,
    [entries],
  );

  const completedToday = useMemo(
    () =>
      entries.filter(
        (entry) =>
          entry.orderStatus === "COMPLETED" &&
          entry.pickupStatus === "VERIFIED" &&
          entry.pickedAt?.startsWith(TODAY),
      ).length,
    [entries],
  );

  const merchants = useMemo(
    () =>
      Array.from(
        new Map(
          entries.map((entry) => [
            entry.merchant.id,
            entry.merchant,
          ]),
        ).values(),
      ).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [entries],
  );

  const pickupSlots = useMemo(
    () =>
      Array.from(
        new Map(
          entries.map((entry) => [
            entry.pickupSlot.id,
            entry.pickupSlot,
          ]),
        ).values(),
      ).sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      ),
    [entries],
  );

  const filteredEntries = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase("id-ID");

    return entries.filter((entry) => {
      if (normalizedSearch) {
        const haystack = [
          entry.orderCode,
          entry.student.name,
          entry.merchant.name,
          entry.pickupCode,
        ]
          .join(" ")
          .toLocaleLowerCase("id-ID");

        if (!haystack.includes(normalizedSearch)) {
          return false;
        }
      }

      if (
        merchantId &&
        entry.merchant.id !== merchantId
      ) {
        return false;
      }

      if (
        orderStatus &&
        entry.orderStatus !== orderStatus
      ) {
        return false;
      }

      if (
        pickupSlotId &&
        entry.pickupSlot.id !== pickupSlotId
      ) {
        return false;
      }

      switch (quickFilter) {
        case "WAITING_PICKUP":
          return (
            entry.orderStatus === "READY" &&
            entry.pickupStatus === "WAITING"
          );
        case "READY":
          return entry.orderStatus === "READY";
        case "COMPLETED_TODAY":
          return (
            entry.orderStatus === "COMPLETED" &&
            entry.pickupStatus === "VERIFIED" &&
            Boolean(entry.pickedAt?.startsWith(TODAY))
          );
        default:
          return true;
      }
    });
  }, [
    entries,
    merchantId,
    orderStatus,
    pickupSlotId,
    quickFilter,
    search,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEntries.length /
        DESKTOP_PAGE_SIZE,
    ),
  );

  const safePage = Math.min(page, totalPages);
  const desktopStart =
    (safePage - 1) * DESKTOP_PAGE_SIZE;
  const desktopRows = filteredEntries.slice(
    desktopStart,
    desktopStart + DESKTOP_PAGE_SIZE,
  );
  const mobileRows = filteredEntries.slice(
    0,
    mobileVisible,
  );

  function resetPaging() {
    setPage(1);
    setMobileVisible(MOBILE_PAGE_SIZE);
  }

  function applyQuickFilter(
    value: QuickFilter,
  ) {
    setQuickFilter(value);
    setOrderStatus("");
    resetPaging();
  }

  return (
    <>
      <section className="grid gap-3 md:grid-cols-3 md:gap-6">
        <SummaryCard
          label="Waiting Pickup"
          value={waitingPickup}
          icon={Clock3}
          tone="warning"
          active={quickFilter === "WAITING_PICKUP"}
          onClick={() =>
            applyQuickFilter("WAITING_PICKUP")
          }
        />
        <SummaryCard
          label="Ready Orders"
          value={readyOrders}
          icon={PackageCheck}
          tone="ready"
          active={quickFilter === "READY"}
          onClick={() => applyQuickFilter("READY")}
        />
        <SummaryCard
          label="Completed Today"
          value={completedToday}
          icon={CheckCircle2}
          tone="success"
          active={quickFilter === "COMPLETED_TODAY"}
          onClick={() =>
            applyQuickFilter("COMPLETED_TODAY")
          }
        />
      </section>

      <section className="mt-6 md:mt-8">
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white md:overflow-hidden">
          <div className="space-y-3 border-b border-[#E0E3E5] bg-[#F8FAFC] p-4 md:flex md:items-center md:justify-between md:gap-4 md:space-y-0 md:p-5">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#536069]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetPaging();
                }}
                placeholder="Search order..."
                className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-11 pr-4 text-sm text-[#191C1E] outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-arctic-blue md:h-10"
              />
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
              <button
                type="button"
                onClick={() => applyQuickFilter("ALL")}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold md:hidden ${
                  quickFilter === "ALL"
                    ? "bg-navy-steel text-white"
                    : "border border-[#CBD5E1] bg-white text-[#44474C]"
                }`}
              >
                All
              </button>

              <FilterSelect
                label="Merchant"
                value={merchantId}
                onChange={(value) => {
                  setMerchantId(value);
                  setQuickFilter("ALL");
                  resetPaging();
                }}
              >
                <option value="">All Merchants</option>
                {merchants.map((merchant) => (
                  <option
                    key={merchant.id}
                    value={merchant.id}
                  >
                    {merchant.name}
                  </option>
                ))}
              </FilterSelect>

              <FilterSelect
                label="Order Status"
                value={orderStatus}
                active={Boolean(orderStatus)}
                onChange={(value) => {
                  setOrderStatus(
                    value as
                      | ""
                      | AdminPickupOrderStatus,
                  );
                  setQuickFilter("ALL");
                  resetPaging();
                }}
              >
                <option value="">Order Status: All</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PREPARING">Preparing</option>
                <option value="READY">Ready</option>
                <option value="COMPLETED">Completed</option>
              </FilterSelect>

              <FilterSelect
                label="Pickup Slot"
                value={pickupSlotId}
                onChange={(value) => {
                  setPickupSlotId(value);
                  setQuickFilter("ALL");
                  resetPaging();
                }}
              >
                <option value="">All Pickup Slots</option>
                {pickupSlots.map((slot) => (
                  <option
                    key={slot.id}
                    value={slot.id}
                  >
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>

          <div className="hidden md:block">
            {desktopRows.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1040px] text-left">
                    <thead className="border-b border-[#E0E3E5] bg-arctic-blue">
                      <tr>
                        <TableHeading>Order Code</TableHeading>
                        <TableHeading>Student</TableHeading>
                        <TableHeading>Merchant</TableHeading>
                        <TableHeading>Pickup Time</TableHeading>
                        <TableHeading>Pickup Code</TableHeading>
                        <TableHeading>Order Status</TableHeading>
                        <TableHeading>Pickup Status</TableHeading>
                        <TableHeading center>Action</TableHeading>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E3E5]">
                      {desktopRows.map((entry) => (
                        <DesktopRow
                          key={entry.id}
                          entry={entry}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t border-[#E0E3E5] px-5 py-4">
                  <p className="text-sm text-[#536069]">
                    Showing {desktopStart + 1} to{" "}
                    {Math.min(
                      desktopStart + DESKTOP_PAGE_SIZE,
                      filteredEntries.length,
                    )}{" "}
                    of {filteredEntries.length} entries
                  </p>

                  <div className="flex items-center gap-1">
                    <PageButton
                      disabled={safePage === 1}
                      onClick={() =>
                        setPage((current) =>
                          Math.max(1, current - 1),
                        )
                      }
                      ariaLabel="Previous page"
                    >
                      <ChevronLeft className="size-4" />
                    </PageButton>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((pageNumber) => (
                      <PageButton
                        key={pageNumber}
                        active={pageNumber === safePage}
                        onClick={() => setPage(pageNumber)}
                        ariaLabel={`Page ${pageNumber}`}
                      >
                        {pageNumber}
                      </PageButton>
                    ))}

                    <PageButton
                      disabled={safePage === totalPages}
                      onClick={() =>
                        setPage((current) =>
                          Math.min(
                            totalPages,
                            current + 1,
                          ),
                        )
                      }
                      ariaLabel="Next page"
                    >
                      <ChevronRight className="size-4" />
                    </PageButton>
                  </div>
                </div>
              </>
            ) : (
              <EmptyPickupState />
            )}
          </div>
        </div>

        <div className="mt-5 space-y-4 md:hidden">
          {mobileRows.map((entry) => (
            <MobilePickupCard
              key={entry.id}
              entry={entry}
            />
          ))}

          {mobileRows.length === 0 ? (
            <EmptyPickupState mobile />
          ) : null}

          {mobileVisible < filteredEntries.length ? (
            <button
              type="button"
              onClick={() =>
                setMobileVisible((current) =>
                  current + MOBILE_PAGE_SIZE,
                )
              }
              className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold uppercase tracking-wide text-navy-steel transition hover:bg-[#F2F4F6]"
            >
              Load More
            </button>
          ) : mobileRows.length > 0 ? (
            <div className="flex items-center justify-center gap-3 py-6 text-xs font-medium text-[#74777D]">
              <span className="h-px w-8 bg-[#C4C6CC]" />
              End of list
              <span className="h-px w-8 bg-[#C4C6CC]" />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: typeof Clock3;
  tone: "warning" | "ready" | "success";
  active: boolean;
  onClick: () => void;
}) {
  const toneClass = {
    warning: {
      accent: "bg-amber-400",
      icon: "bg-amber-50 text-amber-600",
    },
    ready: {
      accent: "bg-blue-500",
      icon: "bg-blue-50 text-blue-600",
    },
    success: {
      accent: "bg-emerald-700",
      icon: "bg-emerald-50 text-emerald-700",
    },
  }[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-h-28 w-full items-center gap-4 overflow-hidden rounded-[18px] border bg-white p-5 text-left transition md:min-h-0 md:p-6 ${
        active
          ? "border-navy-steel shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
          : "border-[#E2E8F0] shadow-[0_4px_12px_rgba(13,27,42,0.03)]"
      }`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 md:hidden ${toneClass.accent}`}
      />
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${toneClass.icon}`}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
          {label}
        </p>
        <p className="mt-1 font-heading text-[28px] font-semibold leading-none text-navy-steel">
          {value}
        </p>
      </div>
      <ChevronRight className="ml-auto size-5 text-[#C4C6CC] md:hidden" />
    </button>
  );
}

function FilterSelect({
  label,
  value,
  active = false,
  onChange,
  children,
}: {
  label: string;
  value: string;
  active?: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="shrink-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`h-10 rounded-full border px-4 pr-8 text-xs font-bold outline-none transition md:rounded-xl md:text-sm md:font-normal ${
          active
            ? "border-navy-steel bg-arctic-blue text-navy-steel"
            : "border-[#CBD5E1] bg-white text-[#44474C]"
        }`}
      >
        {children}
      </select>
    </label>
  );
}

function TableHeading({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <th
      className={`px-4 py-4 text-[11px] font-bold uppercase tracking-[0.05em] text-navy-steel ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </th>
  );
}

function DesktopRow({
  entry,
}: {
  entry: AdminPickupMonitoringEntry;
}) {
  return (
    <tr className="transition-colors hover:bg-arctic-blue/20">
      <td className="px-4 py-4 text-sm font-semibold text-navy-steel">
        {entry.orderCode}
      </td>
      <td className="px-4 py-4 text-sm text-[#191C1E]">
        {entry.student.name}
      </td>
      <td className="px-4 py-4 text-sm text-[#536069]">
        {entry.merchant.name}
      </td>
      <td className="px-4 py-4 text-sm text-[#191C1E]">
        {entry.pickupSlot.startTime}
      </td>
      <td className="px-4 py-4 font-mono text-sm font-bold tracking-[0.16em] text-navy-steel">
        {entry.pickupCode}
      </td>
      <td className="px-4 py-4">
        <OrderStatusBadge status={entry.orderStatus} />
      </td>
      <td className="px-4 py-4">
        <PickupStatusBadge
          status={entry.pickupStatus}
        />
      </td>
      <td className="px-4 py-4 text-center">
        <details className="relative inline-block text-left">
          <summary className="flex size-8 cursor-pointer list-none items-center justify-center rounded-full text-[#536069] transition hover:bg-[#F2F4F6] hover:text-navy-steel [&::-webkit-details-marker]:hidden">
            <MoreVertical className="size-5" />
          </summary>
          <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-[0_12px_28px_rgba(13,27,42,0.12)]">
            <Link
              href={`/admin/canteen/pickup/${entry.id}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy-steel hover:bg-arctic-blue"
            >
              <Eye className="size-4" />
              View Detail
            </Link>
          </div>
        </details>
      </td>
    </tr>
  );
}

function MobilePickupCard({
  entry,
}: {
  entry: AdminPickupMonitoringEntry;
}) {
  const completed =
    entry.pickupStatus === "VERIFIED";

  return (
    <article
      className={`rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(13,27,42,0.03)] ${
        completed ? "opacity-85" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-semibold text-[#536069]">
            {entry.orderCode}
          </p>
          <h2 className="mt-1 truncate text-lg font-semibold text-navy-steel">
            {entry.student.name}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#74777D]">
            Pickup Code
          </p>
          <p className="mt-1 rounded-md border border-[#E0E3E5] bg-[#F2F4F6] px-2 py-1 font-mono text-sm font-bold tracking-[0.16em] text-navy-steel">
            {entry.pickupCode}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#536069]">
        <Store className="size-4" />
        <span>{entry.merchant.name}</span>
        <span>•</span>
        <Clock3 className="size-4" />
        <span>{entry.pickupSlot.startTime}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <OrderStatusBadge status={entry.orderStatus} />
        <PickupStatusBadge
          status={entry.pickupStatus}
        />
      </div>

      <Link
        href={`/admin/canteen/pickup/${entry.id}`}
        className={`mt-5 flex h-11 w-full items-center justify-center rounded-xl text-xs font-bold uppercase tracking-[0.05em] transition ${
          completed
            ? "border border-[#CBD5E1] bg-white text-[#536069] hover:bg-[#F2F4F6]"
            : "bg-arctic-blue text-navy-steel hover:bg-[#D6E4EF]"
        }`}
      >
        View Detail
      </Link>
    </article>
  );
}

function OrderStatusBadge({
  status,
}: {
  status: AdminPickupOrderStatus;
}) {
  const config = {
    CONFIRMED: "bg-slate-100 text-slate-700",
    PREPARING: "bg-amber-50 text-amber-700",
    READY: "bg-blue-50 text-blue-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
  }[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${config}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function PickupStatusBadge({
  status,
}: {
  status: "WAITING" | "VERIFIED";
}) {
  const verified = status === "VERIFIED";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
        verified
          ? "bg-emerald-50 text-emerald-700"
          : "bg-yellow-50 text-yellow-700"
      }`}
    >
      {verified ? "Picked Up" : "Waiting Pickup"}
    </span>
  );
}

function PageButton({
  children,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex size-8 items-center justify-center rounded-lg text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-35 ${
        active
          ? "bg-navy-steel text-white"
          : "text-[#536069] hover:bg-[#F2F4F6]"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyPickupState({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return (
    <div
      className={`${
        mobile
          ? "rounded-[18px] border border-[#E2E8F0] bg-white"
          : ""
      } px-6 py-14 text-center`}
    >
      <PackageCheck className="mx-auto size-9 text-[#74777D]" />
      <h2 className="mt-4 font-heading text-xl font-semibold text-navy-steel">
        Tidak ada pickup ditemukan
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#536069]">
        Coba ubah pencarian atau filter pickup yang sedang aktif.
      </p>
    </div>
  );
}

function formatStatus(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1),
    )
    .join(" ");
}
