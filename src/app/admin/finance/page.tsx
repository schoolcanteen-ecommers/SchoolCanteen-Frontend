import {
  AdminFinanceMetricCards,
  AdminFinancialOverview,
} from "@/features/finance/components/admin/finance-management/admin-finance-summary";
import { AdminWithdrawalFilters } from "@/features/finance/components/admin/finance-management/admin-withdrawal-filters";
import { AdminWithdrawalList } from "@/features/finance/components/admin/finance-management/admin-withdrawal-list";
import { getAdminFinanceData } from "@/lib/api/admin-finance";

import type { AdminWithdrawalStatusFilter } from "@/lib/api/admin-finance";

interface AdminFinancePageProps {
  searchParams: Promise<{
    page?: string | string[];
    merchant?: string | string[];
    status?: string | string[];
  }>;
}

export default async function AdminFinancePage({ searchParams }: AdminFinancePageProps) {
  const params = await searchParams;
  const page = parsePage(getSingleValue(params.page));
  const merchantId = getSingleValue(params.merchant);
  const status = normalizeStatus(getSingleValue(params.status));

  const { summary, merchants, withdrawals } = await getAdminFinanceData({
    page,
    merchantId,
    status,
  });

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-7 px-4 py-6 sm:px-6 lg:space-y-8 lg:px-8 lg:py-8">
      <section>
        <h1 className="font-heading text-[32px] font-bold leading-tight text-navy-steel sm:text-[36px] lg:text-[40px]">
          Finance Management
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#536069] sm:text-base">
          <span className="lg:hidden">Monitor kondisi keuangan dan settlement SchoolCanteen.</span>
          <span className="hidden lg:inline">Kelola dan pantau aktivitas keuangan Kantin dan Koperasi.</span>
        </p>
      </section>

      <AdminFinanceMetricCards summary={summary} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.9fr)]">
        <div className="min-w-0">
          <AdminFinancialOverview summary={summary} />
        </div>

        <section className="min-w-0 xl:overflow-hidden xl:rounded-[22px] xl:border xl:border-[#E2E7EB] xl:bg-white xl:shadow-[0_8px_28px_rgba(13,27,42,0.035)]">
          <div className="pb-4 xl:px-6 xl:pb-3 xl:pt-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-heading text-[26px] font-bold text-navy-steel sm:text-[28px] xl:font-sans xl:text-xl xl:font-semibold">
                  Withdrawal Requests
                </h2>
                <p className="mt-1 text-sm text-[#68757E] xl:hidden">
                  Kelola permintaan pencairan dana merchant.
                </p>
              </div>
              <p className="text-xs font-medium text-[#68757E] sm:text-sm">
                {summary.pendingWithdrawalCount} menunggu persetujuan
              </p>
            </div>
          </div>

          <AdminWithdrawalFilters
            merchants={merchants}
            merchantId={merchantId}
            status={status}
          />
          <AdminWithdrawalList
            pageData={withdrawals}
            merchantId={merchantId}
            status={status}
          />
        </section>
      </div>
    </div>
  );
}

function getSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0]?.trim() ?? "";
  return value?.trim() ?? "";
}

function parsePage(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

function normalizeStatus(value: string): AdminWithdrawalStatusFilter | "" {
  switch (value) {
    case "waiting":
    case "approved":
    case "processed":
    case "completed":
    case "rejected":
      return value;
    default:
      return "";
  }
}
