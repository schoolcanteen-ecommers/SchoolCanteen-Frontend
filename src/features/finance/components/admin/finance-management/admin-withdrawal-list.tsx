import Link from "next/link";
import { Landmark } from "lucide-react";

import { AdminWithdrawalStatusBadge } from "@/features/finance/components/admin/finance-management/admin-withdrawal-status-badge";
import { formatCurrency } from "@/lib/utils";

import type {
  AdminWithdrawalPage,
  AdminWithdrawalStatusFilter,
} from "@/lib/api/admin-finance";
import type { WithdrawalMethod } from "@/types/withdrawal";

interface Props {
  pageData: AdminWithdrawalPage;
  merchantId: string;
  status: AdminWithdrawalStatusFilter | "";
}

const METHOD_LABEL: Record<WithdrawalMethod, string> = {
  CASH_ADMIN: "CASH",
  BANK_TRANSFER: "BANK_TRANSFER",
  E_WALLET: "E_WALLET",
};

export function AdminWithdrawalList({ pageData, merchantId, status }: Props) {
  if (pageData.items.length === 0) {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[22px] border border-[#E2E7EB] bg-white px-6 py-12 text-center xl:rounded-none xl:border-0">
        <div className="flex size-12 items-center justify-center rounded-full bg-arctic-blue">
          <Landmark className="size-5 text-navy-steel" />
        </div>
        <h3 className="mt-4 font-semibold text-navy-steel">Belum ada withdrawal</h3>
        <p className="mt-1 max-w-sm text-sm leading-6 text-[#68757E]">
          Belum ada permintaan pencairan yang sesuai dengan filter ini.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#DDE3E7] bg-[#F4F7F9] text-xs font-semibold uppercase tracking-[0.04em] text-[#536069]">
              <th className="px-6 py-4">Merchant</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Method</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Requested At</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F2]">
            {pageData.items.map((withdrawal) => (
              <tr key={withdrawal.id} className="text-sm text-navy-steel transition hover:bg-[#FAFBFC]">
                <td className="px-6 py-4 font-medium">{withdrawal.merchantName}</td>
                <td className="px-4 py-4 text-[#536069]">{formatCurrency(withdrawal.amount)}</td>
                <td className="px-4 py-4 text-[#536069]">{METHOD_LABEL[withdrawal.method]}</td>
                <td className="px-4 py-4"><AdminWithdrawalStatusBadge status={withdrawal.status} /></td>
                <td className="px-4 py-4 text-[#536069]">{formatDate(withdrawal.timeline.createdAt)}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/finance/withdrawals/${encodeURIComponent(withdrawal.id)}`}
                    className="inline-flex rounded-lg border border-[#CED6DC] px-3 py-2 text-xs font-semibold text-navy-steel transition hover:bg-arctic-blue"
                  >
                    Lihat Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 xl:hidden">
        {pageData.items.map((withdrawal) => (
          <article
            key={withdrawal.id}
            className="rounded-[22px] border border-[#EEF1F3] bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-heading text-lg font-bold text-navy-steel">{withdrawal.merchantName}</h3>
                <p className="mt-0.5 text-[11px] font-semibold tracking-[0.08em] text-[#68757E]">{METHOD_LABEL[withdrawal.method]}</p>
              </div>
              <AdminWithdrawalStatusBadge status={withdrawal.status} />
            </div>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div>
                <p className="text-xs text-[#68757E]">Requested Amount</p>
                <p className="mt-1 font-heading text-[22px] font-bold text-navy-steel">{formatCurrency(withdrawal.amount)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#68757E]">Date</p>
                <p className="mt-1 text-sm font-medium text-navy-steel">{formatDate(withdrawal.timeline.createdAt)}</p>
              </div>
            </div>

            <Link
              href={`/admin/finance/withdrawals/${encodeURIComponent(withdrawal.id)}`}
              className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-navy-steel text-sm font-semibold text-white shadow-[0_8px_18px_rgba(13,27,42,0.14)] transition hover:opacity-90"
            >
              Lihat Detail
            </Link>
          </article>
        ))}
      </div>

      <Pagination pageData={pageData} merchantId={merchantId} status={status} />
    </>
  );
}

function Pagination({ pageData, merchantId, status }: Props) {
  if (pageData.totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-[18px] border border-[#E2E7EB] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between xl:mt-0 xl:rounded-none xl:border-x-0 xl:border-b-0">
      <p className="text-xs text-[#68757E] sm:text-sm">
        Menampilkan {pageData.from}–{pageData.to} dari {pageData.total} withdrawal
      </p>
      <div className="flex items-center gap-2">
        {pageData.hasPreviousPage ? (
          <Link href={buildPageHref(pageData.page - 1, merchantId, status)} className="rounded-lg border border-[#D8DEE3] px-3 py-2 text-xs font-semibold text-navy-steel transition hover:bg-arctic-blue">Sebelumnya</Link>
        ) : null}
        <span className="px-2 text-xs font-medium text-[#68757E]">{pageData.page} / {pageData.totalPages}</span>
        {pageData.hasNextPage ? (
          <Link href={buildPageHref(pageData.page + 1, merchantId, status)} className="rounded-lg border border-[#D8DEE3] px-3 py-2 text-xs font-semibold text-navy-steel transition hover:bg-arctic-blue">Berikutnya</Link>
        ) : null}
      </div>
    </div>
  );
}

function buildPageHref(page: number, merchantId: string, status: AdminWithdrawalStatusFilter | "") {
  const params = new URLSearchParams();
  if (merchantId) params.set("merchant", merchantId);
  if (status) params.set("status", status);
  params.set("page", String(page));
  return `/admin/finance?${params.toString()}`;
}

function formatDate(value: string | null): string {
  if (!value) return "Belum tersedia";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}
