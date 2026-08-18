import {
  AdminReportOverview,
} from "@/features/reports/components/admin-report-overview";

import {
  getAdminDashboard,
  getAdminReportSummary,
} from "@/lib/api/admin-dashboard";

const REPORT_TIME_ZONE =
  "Asia/Jakarta";

type ReportRange =
  | "today"
  | "7d"
  | "30d"
  | "custom";

interface AdminReportsPageProps {
  searchParams: Promise<{
    range?: string | string[];
    from?: string | string[];
    to?: string | string[];
  }>;
}

function getSingleValue(
  value: string | string[] | undefined,
) {
  return Array.isArray(value)
    ? value[0]
    : value;
}

function isDateInput(
  value: string | undefined,
): value is string {
  return Boolean(
    value &&
      /^\d{4}-\d{2}-\d{2}$/.test(
        value,
      ),
  );
}

function getJakartaDate() {
  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          REPORT_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    ).formatToParts(
      new Date(),
    );

  const year = parts.find(
    (part) =>
      part.type === "year",
  )?.value;
  const month = parts.find(
    (part) =>
      part.type === "month",
  )?.value;
  const day = parts.find(
    (part) =>
      part.type === "day",
  )?.value;

  return `${year}-${month}-${day}`;
}

function shiftDate(
  date: string,
  days: number,
) {
  const shifted = new Date(
    `${date}T00:00:00Z`,
  );

  shifted.setUTCDate(
    shifted.getUTCDate() + days,
  );

  return shifted
    .toISOString()
    .slice(0, 10);
}

function resolveRange(
  rawRange: string | undefined,
  rawFrom: string | undefined,
  rawTo: string | undefined,
) {
  const today =
    getJakartaDate();

  const range: ReportRange =
    rawRange === "7d" ||
    rawRange === "30d" ||
    rawRange === "custom"
      ? rawRange
      : "today";

  if (
    range === "custom" &&
    isDateInput(rawFrom) &&
    isDateInput(rawTo) &&
    rawFrom <= rawTo
  ) {
    return {
      range,
      dateFrom: rawFrom,
      dateTo: rawTo,
    };
  }

  if (range === "7d") {
    return {
      range,
      dateFrom: shiftDate(
        today,
        -6,
      ),
      dateTo: today,
    };
  }

  if (range === "30d") {
    return {
      range,
      dateFrom: shiftDate(
        today,
        -29,
      ),
      dateTo: today,
    };
  }

  return {
    range: "today" as const,
    dateFrom: today,
    dateTo: today,
  };
}

export default async function AdminReportsPage({
  searchParams,
}: AdminReportsPageProps) {
  const params =
    await searchParams;

  const selection =
    resolveRange(
      getSingleValue(
        params.range,
      ),
      getSingleValue(
        params.from,
      ),
      getSingleValue(
        params.to,
      ),
    );

  const [report, dashboard] =
    await Promise.all([
      getAdminReportSummary(
        selection.dateFrom,
        selection.dateTo,
      ),
      getAdminDashboard(),
    ]);

  return (
    <AdminReportOverview
      report={report}
      activeMerchants={
        dashboard.users
          .activeMerchants
      }
      selectedRange={
        selection.range
      }
      dateFrom={
        selection.dateFrom
      }
      dateTo={
        selection.dateTo
      }
    />
  );
}
