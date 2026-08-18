import type {
  ReactNode,
} from "react";
import Link from "next/link";
import {
  CircleSlash2,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import type {
  AdminMerchantData,
  AdminMerchantsPageData,
} from "@/lib/api/admin-merchant-monitoring";

interface AdminMerchantManagementListProps {
  merchantPage: AdminMerchantsPageData;
  search: string;
  type: string;
  status: string;
}

export function AdminMerchantManagementList({
  merchantPage,
  search,
  type,
  status,
}: AdminMerchantManagementListProps) {
  const {
    merchants,
    page,
    total,
    totalPages,
    from,
    to,
    hasPreviousPage,
    hasNextPage,
  } = merchantPage;

  if (merchants.length === 0) {
    return (
      <EmptyState
        icon={CircleSlash2}
        title="Merchant tidak ditemukan"
        description="Tidak ada merchant yang sesuai dengan pencarian atau filter saat ini."
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="hidden overflow-hidden rounded-[20px] border border-[#E5E9EC] bg-white shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E4E9ED] bg-arctic-blue/55">
                <TableHead>
                  Merchant
                </TableHead>
                <TableHead>
                  Owner
                </TableHead>
                <TableHead>
                  Type
                </TableHead>
                <TableHead align="center">
                  Products
                </TableHead>
                <TableHead align="center">
                  Orders
                </TableHead>
                <TableHead align="center">
                  Status
                </TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF0F2]">
              {merchants.map(
                (merchant) => (
                  <tr
                    key={merchant.id}
                    className="transition hover:bg-arctic-blue/20"
                  >
                    <td className="px-6 py-4">
                      <MerchantIdentity
                        merchant={merchant}
                      />
                    </td>

                    <td className="px-6 py-4 text-sm text-[#536069]">
                      {merchant.owner
                        ?.name ??
                        "Belum tersedia"}
                    </td>

                    <td className="px-6 py-4">
                      <MerchantTypeBadge
                        type={merchant.type}
                      />
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-navy-steel">
                      {merchant.productsCount.toLocaleString(
                        "id-ID",
                      )}
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-navy-steel">
                      {merchant.ordersCount.toLocaleString(
                        "id-ID",
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <MerchantStatusBadge
                        status={
                          merchant.status
                        }
                      />
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <MerchantPagination
          page={page}
          total={total}
          totalPages={totalPages}
          from={from}
          to={to}
          hasPreviousPage={
            hasPreviousPage
          }
          hasNextPage={
            hasNextPage
          }
          search={search}
          type={type}
          status={status}
          desktop
        />
      </div>

      <div className="space-y-4 lg:hidden">
        {merchants.map(
          (merchant) => (
            <article
              key={merchant.id}
              className="rounded-[22px] border border-[#E7EBEE] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.045)]"
            >
              <div className="flex items-start gap-3">
                <MerchantLogo
                  merchant={merchant}
                  size="large"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-heading text-[18px] font-bold leading-[1.15] text-navy-steel">
                        {merchant.name}
                      </p>
                      <p className="mt-1 truncate text-[11px] font-medium text-[#66737C]">
                        Owner:{" "}
                        {merchant.owner
                          ?.name ??
                          "Belum tersedia"}
                      </p>
                    </div>

                    <MerchantStatusBadge
                      status={
                        merchant.status
                      }
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#66737C]">
                    <MerchantTypeBadge
                      type={merchant.type}
                    />
                    <span className="text-[#C1C7CC]">
                      •
                    </span>
                    <span>
                      {merchant.productsCount.toLocaleString(
                        "id-ID",
                      )}{" "}
                      Products
                    </span>
                    <span className="text-[#C1C7CC]">
                      •
                    </span>
                    <span>
                      {merchant.ordersCount.toLocaleString(
                        "id-ID",
                      )}{" "}
                      Orders
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ),
        )}
      </div>

      <MerchantPagination
        page={page}
        total={total}
        totalPages={totalPages}
        from={from}
        to={to}
        hasPreviousPage={
          hasPreviousPage
        }
        hasNextPage={hasNextPage}
        search={search}
        type={type}
        status={status}
      />
    </section>
  );
}

interface TableHeadProps {
  children: ReactNode;
  align?: "left" | "center";
}

function TableHead({
  children,
  align = "left",
}: TableHeadProps) {
  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-sm font-semibold text-navy-steel ${
        align === "center"
          ? "text-center"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function MerchantIdentity({
  merchant,
}: {
  merchant: AdminMerchantData;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <MerchantLogo
        merchant={merchant}
      />
      <p className="max-w-[220px] truncate text-sm font-semibold text-navy-steel">
        {merchant.name}
      </p>
    </div>
  );
}

function MerchantLogo({
  merchant,
  size = "default",
}: {
  merchant: AdminMerchantData;
  size?: "default" | "large";
}) {
  const Icon =
    merchant.type === "CANTEEN"
      ? UtensilsCrossed
      : ShoppingBag;
  const sizeClass =
    size === "large"
      ? "size-14 rounded-xl"
      : "size-10 rounded-full";

  if (merchant.logoUrl) {
    return (
      <div
        role="img"
        aria-label={`${merchant.name} logo`}
        className={`shrink-0 border border-[#E0E5E9] bg-white bg-cover bg-center bg-no-repeat ${sizeClass}`}
        style={{
          backgroundImage: `url(${JSON.stringify(
            merchant.logoUrl,
          )})`,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border border-[#E0E5E9] bg-[#F1F4F6] text-[#66737C] ${sizeClass}`}
    >
      <Icon
        className={
          size === "large"
            ? "size-6"
            : "size-4"
        }
      />
    </div>
  );
}

function MerchantTypeBadge({
  type,
}: {
  type: AdminMerchantData["type"];
}) {
  const label =
    type === "CANTEEN"
      ? "Canteen"
      : "Cooperative";

  return (
    <span className="inline-flex whitespace-nowrap rounded-full bg-[#EEF1F3] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#42515B]">
      {label}
    </span>
  );
}

function MerchantStatusBadge({
  status,
}: {
  status: AdminMerchantData["status"];
}) {
  if (status === "ACTIVE") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#E6F4EA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#137333]">
        <span className="size-1.5 rounded-full bg-[#34A853]" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#ECEEF0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#66737C]">
      <span className="size-1.5 rounded-full bg-[#74777D]" />
      Inactive
    </span>
  );
}

interface MerchantPaginationProps {
  page: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  search: string;
  type: string;
  status: string;
  desktop?: boolean;
}

function MerchantPagination({
  page,
  total,
  totalPages,
  from,
  to,
  hasPreviousPage,
  hasNextPage,
  search,
  type,
  status,
  desktop = false,
}: MerchantPaginationProps) {
  const common = {
    search,
    type,
    status,
  };

  if (desktop) {
    return (
      <div className="flex items-center justify-between border-t border-[#EDF0F2] px-6 py-4">
        <p className="text-sm text-[#536069]">
          Showing {from} to {to} of{" "}
          {total.toLocaleString(
            "id-ID",
          )}{" "}
          entries
        </p>

        <div className="flex items-center gap-1.5">
          <PaginationLink
            label="Prev"
            href={
              hasPreviousPage
                ? buildPageHref({
                    page: page - 1,
                    ...common,
                  })
                : null
            }
          />

          {getVisiblePages(
            page,
            totalPages,
          ).map((pageItem, index) =>
            pageItem === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-[#66737C]"
              >
                …
              </span>
            ) : (
              <Link
                key={pageItem}
                href={buildPageHref({
                  page: pageItem,
                  ...common,
                })}
                className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  pageItem === page
                    ? "bg-navy-steel text-white"
                    : "text-[#536069] hover:bg-[#F2F4F6] hover:text-navy-steel"
                }`}
              >
                {pageItem}
              </Link>
            ),
          )}

          <PaginationLink
            label="Next"
            href={
              hasNextPage
                ? buildPageHref({
                    page: page + 1,
                    ...common,
                  })
                : null
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E9EC] bg-white p-3 shadow-[0_8px_24px_rgba(13,27,42,0.03)] lg:hidden">
      <PaginationLink
        label="Prev"
        href={
          hasPreviousPage
            ? buildPageHref({
                page: page - 1,
                ...common,
              })
            : null
        }
      />

      <span className="text-xs font-medium text-[#536069]">
        Page {page} / {totalPages}
      </span>

      <PaginationLink
        label="Next"
        href={
          hasNextPage
            ? buildPageHref({
                page: page + 1,
                ...common,
              })
            : null
        }
      />
    </div>
  );
}

function PaginationLink({
  label,
  href,
}: {
  label: string;
  href: string | null;
}) {
  if (!href) {
    return (
      <span className="cursor-not-allowed rounded-lg px-3 py-2 text-sm font-medium text-[#B3BAC0]">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-[#536069] transition hover:bg-[#F2F4F6] hover:text-navy-steel"
    >
      {label}
    </Link>
  );
}

function getVisiblePages(
  page: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (page <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (page >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    page,
    "ellipsis",
    totalPages,
  ];
}

function buildPageHref({
  page,
  search,
  type,
  status,
}: {
  page: number;
  search: string;
  type: string;
  status: string;
}): string {
  const params =
    new URLSearchParams();

  if (page > 1) {
    params.set(
      "page",
      String(page),
    );
  }

  if (search) {
    params.set("search", search);
  }

  if (type) {
    params.set("type", type);
  }

  if (status) {
    params.set("status", status);
  }

  const query = params.toString();

  return query
    ? `/admin/merchants?${query}`
    : "/admin/merchants";
}
