import {
  AdminTransactionFilters,
} from "@/features/transactions/components/admin/transaction-management/admin-transaction-filters";
import {
  AdminTransactionList,
} from "@/features/transactions/components/admin/transaction-management/admin-transaction-list";
import {
  AdminTransactionOverview,
} from "@/features/transactions/components/admin/transaction-management/admin-transaction-overview";

import {
  getAdminTransactionStats,
  getAdminTransactionsPage,
} from "@/lib/api/admin-transactions";

import type {
  AdminTransactionStatus,
  AdminTransactionType,
} from "@/lib/api/admin-transaction-shared";

interface AdminTransactionsPageProps {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    date?: string | string[];
    type?: string | string[];
    status?: string | string[];
  }>;
}

export default async function AdminTransactionsPage({
  searchParams,
}: AdminTransactionsPageProps) {
  const params = await searchParams;

  const page = parsePage(
    getSingleValue(params.page),
  );
  const search = getSingleValue(
    params.search,
  );
  const datePreset =
    normalizeDatePreset(
      getSingleValue(params.date),
    );
  const type = parseType(
    getSingleValue(params.type),
  );
  const status = parseStatus(
    getSingleValue(params.status),
  );
  const dateRange =
    resolveDateRange(datePreset);

  const filters = {
    search,
    type,
    status,
    ...dateRange,
  };

  const [stats, transactionPage] =
    await Promise.all([
      getAdminTransactionStats(),
      getAdminTransactionsPage({
        ...filters,
        page,
      }),
    ]);

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section>
        <h1 className="font-heading text-[32px] font-bold leading-tight text-navy-steel">
          <span className="lg:hidden">
            Transactions
          </span>
          <span className="hidden lg:inline">
            Transactions Management
          </span>
        </h1>
        <p className="mt-2 text-base text-[#536069]">
          Monitor aktivitas transaksi SchoolCanteen.
        </p>
      </section>

      <AdminTransactionOverview
        stats={stats}
      />

      <AdminTransactionFilters
        search={search}
        datePreset={datePreset}
        type={type}
        status={status}
      />

      <AdminTransactionList
        key={buildListKey({
          page,
          search,
          datePreset,
          type,
          status,
        })}
        initialTransactions={
          transactionPage.transactions
        }
        initialPage={
          transactionPage.page
        }
        initialHasNextPage={
          transactionPage.hasNextPage
        }
        hasPreviousPage={
          transactionPage.hasPreviousPage
        }
        filters={filters}
        previousHref={buildPageHref({
          page: page - 1,
          search,
          datePreset,
          type,
          status,
        })}
        nextHref={buildPageHref({
          page: page + 1,
          search,
          datePreset,
          type,
          status,
        })}
      />
    </div>
  );
}

function getSingleValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function parsePage(
  value: string,
): number {
  const parsed = Number.parseInt(
    value,
    10,
  );

  if (
    Number.isNaN(parsed) ||
    parsed < 1
  ) {
    return 1;
  }

  return parsed;
}

function parseType(
  value: string,
): AdminTransactionType | undefined {
  switch (value.toUpperCase()) {
    case "PAYMENT":
      return "PAYMENT";
    case "TOP_UP":
      return "TOP_UP";
    case "ADJUSTMENT":
      return "ADJUSTMENT";
    default:
      return undefined;
  }
}

function parseStatus(
  value: string,
): AdminTransactionStatus | undefined {
  switch (value.toUpperCase()) {
    case "COMPLETED":
      return "COMPLETED";
    case "PENDING":
      return "PENDING";
    case "FAILED":
      return "FAILED";
    default:
      return undefined;
  }
}

function normalizeDatePreset(
  value: string,
) {
  return value === "today" ||
    value === "7days"
    ? value
    : "";
}

function resolveDateRange(
  datePreset: string,
): {
  dateFrom?: string;
  dateTo?: string;
} {
  if (!datePreset) {
    return {};
  }

  const today =
    getJakartaDateString(
      new Date(),
    );

  if (datePreset === "today") {
    return {
      dateFrom: today,
      dateTo: today,
    };
  }

  return {
    dateFrom: shiftDateString(
      today,
      -6,
    ),
    dateTo: today,
  };
}

function getJakartaDateString(
  date: Date,
) {
  const parts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    ).formatToParts(date);

  const year = parts.find(
    (part) => part.type === "year",
  )?.value;
  const month = parts.find(
    (part) => part.type === "month",
  )?.value;
  const day = parts.find(
    (part) => part.type === "day",
  )?.value;

  if (!year || !month || !day) {
    throw new Error(
      "Tanggal Jakarta tidak dapat diformat.",
    );
  }

  return `${year}-${month}-${day}`;
}

function shiftDateString(
  value: string,
  days: number,
) {
  const date = new Date(
    `${value}T00:00:00Z`,
  );

  date.setUTCDate(
    date.getUTCDate() + days,
  );

  return date
    .toISOString()
    .slice(0, 10);
}

function buildPageHref({
  page,
  search,
  datePreset,
  type,
  status,
}: {
  page: number;
  search: string;
  datePreset: string;
  type?: AdminTransactionType;
  status?: AdminTransactionStatus;
}) {
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

  if (datePreset) {
    params.set(
      "date",
      datePreset,
    );
  }

  if (type) {
    params.set("type", type);
  }

  if (status) {
    params.set(
      "status",
      status,
    );
  }

  const query = params.toString();

  return query
    ? `/admin/transactions?${query}`
    : "/admin/transactions";
}

function buildListKey({
  page,
  search,
  datePreset,
  type,
  status,
}: {
  page: number;
  search: string;
  datePreset: string;
  type?: AdminTransactionType;
  status?: AdminTransactionStatus;
}) {
  return [
    page,
    search,
    datePreset,
    type ?? "",
    status ?? "",
  ].join("|");
}
