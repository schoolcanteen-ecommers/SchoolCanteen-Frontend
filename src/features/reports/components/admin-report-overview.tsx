import Link from "next/link";

import {
  CalendarDays,
  CheckCircle2,
  ImageIcon,
  ReceiptText,
  Store,
  WalletCards,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";

import type {
  AdminReportSummaryData,
} from "@/lib/api/admin-dashboard";

import {
  adminReportPopularProducts,
} from "@/mocks/admin-reports";

interface AdminReportOverviewProps {
  report: AdminReportSummaryData;
  activeMerchants: number;
  selectedRange:
    | "today"
    | "7d"
    | "30d"
    | "custom";
  dateFrom: string;
  dateTo: string;
}

interface StatusMetric {
  label: string;
  count: number;
  barClassName: string;
}

const REPORT_LINKS = [
  {
    label: "Today",
    value: "today",
    href: "/admin/reports?range=today",
  },
  {
    label: "7 Days",
    value: "7d",
    href: "/admin/reports?range=7d",
  },
  {
    label: "30 Days",
    value: "30d",
    href: "/admin/reports?range=30d",
  },
] as const;

export function AdminReportOverview({
  report,
  activeMerchants,
  selectedRange,
  dateFrom,
  dateTo,
}: AdminReportOverviewProps) {
  const pendingOrders =
    report.orders.waiting +
    report.orders.confirmed;

  const statusMetrics: StatusMetric[] = [
    {
      label: "Completed",
      count: report.orders.completed,
      barClassName:
        "bg-[#065F46]",
    },
    {
      label: "Pending",
      count: pendingOrders,
      barClassName:
        "bg-[#0D1B2A]",
    },
    {
      label: "Preparing",
      count: report.orders.preparing,
      barClassName:
        "bg-[#D6B58A]",
    },
    {
      label: "Ready",
      count: report.orders.ready,
      barClassName:
        "bg-[#B8DDF8]",
    },
    {
      label: "Cancelled",
      count: report.orders.cancelled,
      barClassName:
        "bg-[#BA1A1A]",
    },
  ];

  const merchantPerformance = [
    ...report.merchantPerformance,
  ].sort(
    (a, b) =>
      b.completedOrderValue -
      a.completedOrderValue,
  );

  const commerce =
    report.merchantPerformance.reduce(
      (summary, merchant) => {
        if (
          merchant.type ===
          "CANTEEN"
        ) {
          summary.canteen +=
            merchant.ordersCount;
        } else {
          summary.cooperative +=
            merchant.ordersCount;
        }

        return summary;
      },
      {
        canteen: 0,
        cooperative: 0,
      },
    );

  const commerceTotal =
    commerce.canteen +
    commerce.cooperative;

  const canteenPercentage =
    commerceTotal > 0
      ? Math.round(
          (commerce.canteen /
            commerceTotal) *
            100,
        )
      : 0;

  const cooperativePercentage =
    Math.max(
      0,
      100 - canteenPercentage,
    );

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-8 md:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-heading text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-[#0D1B2A] md:text-[38px]">
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#536069] md:text-base">
            Ringkasan performa SchoolCanteen berdasarkan aktivitas transaksi.
          </p>
        </div>

        <ReportPeriodFilter
          selectedRange={
            selectedRange
          }
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </div>

      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <SummaryCard
          label="Total Orders"
          value={formatNumber(
            report.orders.total,
          )}
          icon={ReceiptText}
        />

        <SummaryCard
          label="Transaction Value"
          value={formatCurrency(
            report.orders
              .completedOrderValue,
          )}
          mobileValue={
            formatCompactCurrency(
              report.orders
                .completedOrderValue,
            )
          }
          icon={WalletCards}
          emphasized
        />

        <SummaryCard
          label="Completed"
          desktopLabel="Completed Orders"
          value={formatNumber(
            report.orders.completed,
          )}
          icon={CheckCircle2}
          iconClassName="bg-[#ECFDF5] text-[#065F46]"
        />

        <SummaryCard
          label="Active Merchants"
          value={formatNumber(
            activeMerchants,
          )}
          icon={Store}
          iconClassName="bg-[#E6E8EA] text-[#0D1B2A]"
        />
      </section>

      <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <OrdersByStatus
            metrics={statusMetrics}
            totalOrders={
              report.orders.total
            }
          />

          <CommerceDistribution
            canteenOrders={
              commerce.canteen
            }
            cooperativeOrders={
              commerce.cooperative
            }
            canteenPercentage={
              canteenPercentage
            }
            cooperativePercentage={
              cooperativePercentage
            }
          />
        </div>

        <div className="space-y-6">
          <MerchantPerformance
            merchants={
              merchantPerformance
            }
          />

          <PopularProducts />
        </div>
      </div>
    </div>
  );
}

function ReportPeriodFilter({
  selectedRange,
  dateFrom,
  dateTo,
}: Pick<
  AdminReportOverviewProps,
  | "selectedRange"
  | "dateFrom"
  | "dateTo"
>) {
  return (
    <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
      <div className="flex shrink-0 items-center gap-2 lg:gap-1 lg:rounded-[14px] lg:border lg:border-[#D8DEE6] lg:bg-white lg:p-1 lg:shadow-[0_2px_8px_rgba(13,27,42,0.03)]">
        {REPORT_LINKS.map(
          (item) => {
            const isActive =
              selectedRange ===
              item.value;

            return (
              <Link
                key={item.value}
                href={item.href}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition lg:rounded-[10px] lg:border-0 ${
                  isActive
                    ? "border-[#C7DDF0] bg-[#E6F4FF] text-[#0D1B2A]"
                    : "border-[#C4C6CC] bg-white text-[#536069] hover:bg-[#F2F4F6] hover:text-[#0D1B2A]"
                }`}
              >
                {item.label}
              </Link>
            );
          },
        )}

        <details
          className="group relative"
          open={
            selectedRange ===
            "custom"
          }
        >
          <summary
            className={`flex cursor-pointer list-none items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition lg:rounded-[10px] lg:border-0 [&::-webkit-details-marker]:hidden ${
              selectedRange ===
              "custom"
                ? "border-[#C7DDF0] bg-[#E6F4FF] text-[#0D1B2A]"
                : "border-[#C4C6CC] bg-white text-[#536069] hover:bg-[#F2F4F6] hover:text-[#0D1B2A]"
            }`}
          >
            <span className="hidden sm:inline">
              Custom Date
            </span>
            <span className="sm:hidden">
              Custom
            </span>
            <CalendarDays className="size-4" />
          </summary>

          <form
            method="get"
            className="fixed left-5 right-5 top-24 z-40 rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+8px)] sm:w-[340px]"
          >
            <input
              type="hidden"
              name="range"
              value="custom"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                From
                <input
                  type="date"
                  name="from"
                  defaultValue={dateFrom}
                  required
                  className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#0D1B2A] outline-none transition focus:border-[#0D1B2A]"
                />
              </label>

              <label className="text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
                To
                <input
                  type="date"
                  name="to"
                  defaultValue={dateTo}
                  required
                  className="mt-2 w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-[#0D1B2A] outline-none transition focus:border-[#0D1B2A]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[#0D1B2A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#172A3D]"
            >
              Apply Date Range
            </button>
          </form>
        </details>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  desktopLabel,
  value,
  mobileValue,
  icon: Icon,
  iconClassName =
    "bg-[#E6F4FF] text-[#0D1B2A]",
  emphasized = false,
}: {
  label: string;
  desktopLabel?: string;
  value: string;
  mobileValue?: string;
  icon: typeof ReceiptText;
  iconClassName?: string;
  emphasized?: boolean;
}) {
  return (
    <article
      className={`min-h-[172px] rounded-[18px] border p-5 shadow-[0_4px_12px_rgba(0,0,0,0.025)] lg:min-h-[130px] ${
        emphasized
          ? "border-[#0D1B2A] bg-[#0D1B2A] text-white md:border-[#E2E8F0] md:bg-white md:text-[#0D1B2A]"
          : "border-[#E2E8F0] bg-white text-[#0D1B2A]"
      }`}
    >
      <div className="flex h-full flex-col justify-between lg:flex-row-reverse lg:items-start">
        <div
          className={`flex size-10 items-center justify-center rounded-full ${
            emphasized
              ? "bg-white/15 text-white md:bg-[#E6F4FF] md:text-[#0D1B2A]"
              : iconClassName
          }`}
        >
          <Icon className="size-5" />
        </div>

        <div className="mt-4 lg:mt-0">
          <p
            className={`text-xs font-medium uppercase tracking-[0.04em] ${
              emphasized
                ? "text-[#BAC8DC] md:text-[#536069]"
                : "text-[#536069]"
            }`}
          >
            <span className="lg:hidden">
              {label}
            </span>
            <span className="hidden lg:inline">
              {desktopLabel ?? label}
            </span>
          </p>

          <p className="mt-2 font-heading text-[22px] font-bold leading-tight lg:text-[26px]">
            {mobileValue ? (
              <>
                <span className="md:hidden">
                  {mobileValue}
                </span>
                <span className="hidden md:inline">
                  {value}
                </span>
              </>
            ) : (
              value
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

function OrdersByStatus({
  metrics,
  totalOrders,
}: {
  metrics: StatusMetric[];
  totalOrders: number;
}) {
  return (
    <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.025)]">
      <h2 className="text-lg font-semibold text-[#0D1B2A] md:text-base">
        Orders by Status
      </h2>

      <div className="mt-6 space-y-5 md:space-y-4">
        {metrics.map(
          (metric) => {
            const percentage =
              totalOrders > 0
                ? Math.round(
                    (metric.count /
                      totalOrders) *
                      100,
                  )
                : 0;

            return (
              <div key={metric.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#536069]">
                    {metric.label}
                  </span>

                  <span className="font-bold text-[#0D1B2A]">
                    <span className="md:hidden">
                      {percentage}%
                    </span>
                    <span className="hidden md:inline">
                      {formatNumber(
                        metric.count,
                      )}
                    </span>
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#E0E3E5]">
                  <div
                    className={`h-full rounded-full ${metric.barClassName}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}

function CommerceDistribution({
  canteenOrders,
  cooperativeOrders,
  canteenPercentage,
  cooperativePercentage,
}: {
  canteenOrders: number;
  cooperativeOrders: number;
  canteenPercentage: number;
  cooperativePercentage: number;
}) {
  return (
    <section className="hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.025)] md:block">
      <h2 className="text-base font-semibold text-[#0D1B2A]">
        Commerce Distribution
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#536069]">
            <span className="size-3 rounded-full bg-[#0D1B2A]" />
            Canteen Orders
          </div>
          <strong className="text-[#0D1B2A]">
            {formatNumber(
              canteenOrders,
            )}
          </strong>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#536069]">
            <span className="size-3 rounded-full bg-[#E6F4FF]" />
            Cooperative Orders
          </div>
          <strong className="text-[#0D1B2A]">
            {formatNumber(
              cooperativeOrders,
            )}
          </strong>
        </div>

        <div className="flex h-4 overflow-hidden rounded-full bg-[#F2F4F6]">
          <div
            className="bg-[#0D1B2A]"
            style={{
              width: `${canteenPercentage}%`,
            }}
          />
          <div
            className="bg-[#E6F4FF]"
            style={{
              width: `${cooperativePercentage}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function MerchantPerformance({
  merchants,
}: {
  merchants: AdminReportSummaryData["merchantPerformance"];
}) {
  return (
    <section className="hidden overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.025)] md:block">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-[#0D1B2A]">
          Merchant Performance
        </h2>
        <Link
          href="/admin/merchants"
          className="text-sm font-bold text-[#0D1B2A] transition hover:text-[#536069]"
        >
          View All
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-xs uppercase tracking-[0.05em] text-[#536069]">
              <th className="pb-3 font-semibold">
                Merchant
              </th>
              <th className="pb-3 font-semibold">
                Type
              </th>
              <th className="pb-3 text-right font-semibold">
                Orders
              </th>
              <th className="pb-3 text-right font-semibold">
                Value
              </th>
              <th className="pb-3 text-center font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {merchants.length > 0 ? (
              merchants
                .slice(0, 5)
                .map(
                  (merchant) => (
                    <tr
                      key={merchant.id}
                      className="border-b border-[#E2E8F0]/70 last:border-0"
                    >
                      <td className="py-4 font-semibold text-[#0D1B2A]">
                        {merchant.name}
                      </td>
                      <td className="py-4 text-sm text-[#536069]">
                        {merchant.type ===
                        "CANTEEN"
                          ? "Canteen"
                          : "Cooperative"}
                      </td>
                      <td className="py-4 text-right text-sm font-medium text-[#0D1B2A]">
                        {formatNumber(
                          merchant.ordersCount,
                        )}
                      </td>
                      <td className="py-4 text-right text-sm font-medium text-[#0D1B2A]">
                        {formatCurrency(
                          merchant.completedOrderValue,
                        )}
                      </td>
                      <td className="py-4 text-center text-sm text-[#74777D]">
                        —
                      </td>
                    </tr>
                  ),
                )
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-[#536069]"
                >
                  Belum ada performa merchant pada periode ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PopularProducts() {
  return (
    <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.025)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[22px] font-semibold text-[#0D1B2A] md:text-base">
          Popular Products
        </h2>

        <button
          type="button"
          disabled
          title="Menunggu dukungan Admin Product Reporting API"
          className="hidden cursor-not-allowed text-sm font-bold text-[#0D1B2A]/45 md:inline"
        >
          View All
        </button>

        <span className="text-xl font-bold tracking-[0.12em] text-[#44474C] md:hidden">
          ···
        </span>
      </div>

      <div className="mt-5 md:hidden">
        <div className="divide-y divide-[#E2E8F0]">
          {adminReportPopularProducts
            .slice(0, 2)
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <ProductThumbnail
                    product={product}
                    className="size-12 rounded-xl"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0D1B2A]">
                      {product.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#536069]">
                      {product.merchantName}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-base font-bold text-[#0D1B2A]">
                    {formatNumber(
                      product.soldQuantity,
                    )}
                  </p>
                  <p className="text-xs text-[#536069]">
                    Sold
                  </p>
                </div>
              </div>
            ))}
        </div>

        <button
          type="button"
          disabled
          title="Menunggu dukungan Admin Product Reporting API"
          className="mt-4 w-full cursor-not-allowed rounded-xl bg-[#E6F4FF] px-4 py-2.5 text-sm font-semibold text-[#0D1B2A]/55"
        >
          View All Products
        </button>
      </div>

      <div className="mt-6 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-xs uppercase tracking-[0.05em] text-[#536069]">
              <th className="pb-3 font-semibold">
                Product
              </th>
              <th className="pb-3 font-semibold">
                Merchant
              </th>
              <th className="pb-3 text-right font-semibold">
                Sold Quantity
              </th>
            </tr>
          </thead>

          <tbody>
            {adminReportPopularProducts.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#E2E8F0]/70 last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <ProductThumbnail
                        product={product}
                        className="size-10 rounded-lg"
                      />
                      <span className="font-semibold text-[#0D1B2A]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-[#536069]">
                    {product.merchantName}
                  </td>
                  <td className="py-4 text-right text-sm font-bold text-[#0D1B2A]">
                    {formatNumber(
                      product.soldQuantity,
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductThumbnail({
  product,
  className,
}: {
  product: (typeof adminReportPopularProducts)[number];
  className: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-[#ECEEF0] ${className}`}
    >
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="size-full object-cover"
        />
      ) : (
        <ImageIcon className="size-5 text-[#536069]" />
      )}
    </div>
  );
}

function formatNumber(
  value: number,
) {
  return new Intl.NumberFormat(
    "id-ID",
  ).format(value);
}

function formatCompactCurrency(
  value: number,
) {
  if (value >= 1_000_000_000) {
    return `Rp${trimCompact(
      value / 1_000_000_000,
    )}B`;
  }

  if (value >= 1_000_000) {
    return `Rp${trimCompact(
      value / 1_000_000,
    )}M`;
  }

  if (value >= 1_000) {
    return `Rp${trimCompact(
      value / 1_000,
    )}K`;
  }

  return formatCurrency(value);
}

function trimCompact(
  value: number,
) {
  return value
    .toFixed(1)
    .replace(/\.0$/, "");
}
