"use client";

import type {
  ReactNode,
} from "react";
import Link from "next/link";
import {
  ChevronDown,
  CircleSlash2,
  Store,
  UserRound,
} from "lucide-react";
import {
  useState,
} from "react";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import {
  getAdminTransactionsPageClient,
} from "@/lib/api/admin-transactions-client";

import {
  AdminTransactionStatusBadge,
  AdminTransactionTypeBadge,
} from "@/features/transactions/components/admin/transaction-management/admin-transaction-badges";

import type {
  AdminTransactionData,
  AdminTransactionFilters,
} from "@/lib/api/admin-transaction-shared";

import {
  formatCurrency,
} from "@/lib/utils";

interface AdminTransactionListProps {
  initialTransactions: AdminTransactionData[];
  initialPage: number;
  initialHasNextPage: boolean;
  hasPreviousPage: boolean;
  filters: Omit<
    AdminTransactionFilters,
    "page"
  >;
  previousHref: string;
  nextHref: string;
}

export function AdminTransactionList({
  initialTransactions,
  initialPage,
  initialHasNextPage,
  hasPreviousPage,
  filters,
  previousHref,
  nextHref,
}: AdminTransactionListProps) {
  const [transactions, setTransactions] =
    useState(initialTransactions);
  const [loadedPage, setLoadedPage] =
    useState(initialPage);
  const [hasNextPage, setHasNextPage] =
    useState(initialHasNextPage);
  const [loadingMore, setLoadingMore] =
    useState(false);
  const [loadError, setLoadError] =
    useState<string | null>(null);


  async function handleLoadMore() {
    if (
      loadingMore ||
      !hasNextPage
    ) {
      return;
    }

    setLoadingMore(true);
    setLoadError(null);

    try {
      const nextPage =
        await getAdminTransactionsPageClient({
          ...filters,
          page: loadedPage + 1,
        });

      setTransactions(
        (current) => {
          const ids = new Set(
            current.map(
              (transaction) =>
                transaction.id,
            ),
          );

          return [
            ...current,
            ...nextPage.transactions.filter(
              (transaction) =>
                !ids.has(
                  transaction.id,
                ),
            ),
          ];
        },
      );
      setLoadedPage(nextPage.page);
      setHasNextPage(
        nextPage.hasNextPage,
      );
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Gagal memuat transaksi berikutnya.",
      );
    } finally {
      setLoadingMore(false);
    }
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={CircleSlash2}
        title="Transaksi tidak ditemukan"
        description="Tidak ada transaksi yang sesuai dengan pencarian atau filter saat ini."
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="hidden overflow-hidden rounded-[24px] border border-[#E5E9EC] bg-white shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E4E9ED] bg-arctic-blue/45">
                <TableHead>
                  Transaction ID
                </TableHead>
                <TableHead>
                  Student
                </TableHead>
                <TableHead>
                  Merchant
                </TableHead>
                <TableHead>
                  Type
                </TableHead>
                <TableHead align="right">
                  Amount
                </TableHead>
                <TableHead align="center">
                  Status
                </TableHead>
                <TableHead>Date</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF0F2]">
              {initialTransactions.map(
                (transaction) => (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-arctic-blue/15"
                  >
                    <td className="max-w-[190px] px-6 py-4">
                      <Link
                        href={`/admin/transactions/${transaction.id}`}
                        title={transaction.id}
                        className="block truncate text-sm font-bold text-navy-steel hover:underline"
                      >
                        {transaction.id}
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      <StudentIdentity
                        transaction={transaction}
                      />
                    </td>

                    <td className="max-w-[190px] px-6 py-4 text-sm text-[#536069]">
                      <span className="block truncate">
                        {transaction.merchant
                          ?.name ?? "—"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <AdminTransactionTypeBadge
                        type={transaction.type}
                      />
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-bold text-navy-steel">
                      {formatCurrency(
                        transaction.amount,
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <AdminTransactionStatusBadge
                        status={transaction.status}
                      />
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#536069]">
                      {formatTransactionDate(
                        transaction.createdAt,
                        false,
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#E8ECEF] px-6 py-4">
          <p className="text-sm text-[#536069]">
            Halaman {initialPage}
            <span className="px-1.5">•</span>
            {initialTransactions.length.toLocaleString(
              "id-ID",
            )}{" "}
            transaksi ditampilkan
          </p>

          <div className="flex items-center gap-2">
            {hasPreviousPage ? (
              <Link
                href={previousHref}
                className="rounded-xl border border-[#D6DCE1] px-4 py-2 text-sm font-bold text-navy-steel transition hover:bg-[#F2F4F6]"
              >
                Previous
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-xl border border-[#E5E9EC] px-4 py-2 text-sm font-bold text-[#B3BAC0]">
                Previous
              </span>
            )}

            <span className="flex size-10 items-center justify-center rounded-xl bg-navy-steel text-sm font-bold text-white">
              {initialPage}
            </span>

            {initialHasNextPage ? (
              <Link
                href={nextHref}
                className="rounded-xl border border-[#D6DCE1] px-4 py-2 text-sm font-bold text-navy-steel transition hover:bg-[#F2F4F6]"
              >
                Next
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-xl border border-[#E5E9EC] px-4 py-2 text-sm font-bold text-[#B3BAC0]">
                Next
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 lg:hidden">
        {transactions.map(
          (transaction) => (
            <article
              key={transaction.id}
              className="rounded-[24px] border border-[#E7EBEE] bg-white p-5 shadow-[0_12px_32px_rgba(13,27,42,0.04)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#ECEFF1] pb-3">
                <p
                  title={transaction.id}
                  className="min-w-0 truncate text-xs font-bold text-[#536069]"
                >
                  {transaction.id}
                </p>
                <AdminTransactionStatusBadge
                  status={transaction.status}
                />
              </div>

              <div className="mt-4 grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-3">
                <InfoIcon>
                  <UserRound className="size-5" />
                </InfoIcon>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#74777D]">
                    Student
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-navy-steel">
                    {transaction.student.name}
                  </p>
                </div>

                <InfoIcon>
                  <Store className="size-5" />
                </InfoIcon>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#74777D]">
                    Merchant
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-navy-steel">
                    {transaction.merchant
                      ?.name ??
                      "Tidak terkait merchant"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-[#66737C]">
                    {formatTransactionDate(
                      transaction.createdAt,
                      true,
                    )}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-[#66737C]">
                      Type:
                    </span>
                    <AdminTransactionTypeBadge
                      type={transaction.type}
                      compact
                    />
                  </div>
                </div>

                <p className="shrink-0 font-heading text-[22px] font-semibold text-navy-steel">
                  {formatCurrency(
                    transaction.amount,
                  )}
                </p>
              </div>

              <Link
                href={`/admin/transactions/${transaction.id}`}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-xl border border-navy-steel/20 text-sm font-bold text-navy-steel transition hover:bg-[#F2F4F6]"
              >
                Lihat Detail
              </Link>
            </article>
          ),
        )}

        {loadError ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </p>
        ) : null}

        {hasNextPage ? (
          <div className="flex justify-center pb-4 pt-2">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-navy-steel transition hover:bg-[#ECEEF0] disabled:cursor-wait disabled:opacity-60"
            >
              {loadingMore
                ? "Memuat..."
                : "Load More"}
              <ChevronDown className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "center" | "right";
}) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-[0.05em] text-[#536069] ${alignClass}`}
    >
      {children}
    </th>
  );
}

function StudentIdentity({
  transaction,
}: {
  transaction: AdminTransactionData;
}) {
  const initials =
    transaction.student.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-xs font-bold text-navy-steel">
        {initials || "S"}
      </div>
      <p className="max-w-[170px] truncate text-sm font-medium text-navy-steel">
        {transaction.student.name}
      </p>
    </div>
  );
}

function InfoIcon({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex size-10 items-center justify-center rounded-full bg-[#ECEEF0] text-[#66737C]">
      {children}
    </div>
  );
}

export function formatTransactionDate(
  value: string | null,
  includeTime: boolean,
) {
  if (!value) {
    return "Waktu tidak tersedia";
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    includeTime
      ? {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        }
      : {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Jakarta",
        },
  ).format(new Date(value));
}
