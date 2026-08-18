import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";

import { AdminWithdrawalActions } from "@/features/finance/components/admin/finance-management/admin-withdrawal-actions";
import { AdminWithdrawalStatusBadge } from "@/features/finance/components/admin/finance-management/admin-withdrawal-status-badge";
import { cn, formatCurrency } from "@/lib/utils";

import type {
  AdminFinanceMerchantDetail,
  AdminWithdrawalData,
} from "@/lib/api/admin-finance";
import type { WithdrawalMethod } from "@/types/withdrawal";

const METHOD_LABEL: Record<WithdrawalMethod, string> = {
  CASH_ADMIN: "CASH",
  BANK_TRANSFER: "BANK_TRANSFER",
  E_WALLET: "E_WALLET",
};

export function AdminWithdrawalDetail({
  withdrawal,
  merchant,
}: {
  withdrawal: AdminWithdrawalData;
  merchant: AdminFinanceMerchantDetail;
}) {
  const timeline = buildTimeline(withdrawal);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F7F9FB]">
      <div className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-5 sm:px-6 lg:py-8">
        <div className="grid grid-cols-[40px_1fr_40px] items-center sm:grid-cols-[auto_1fr] sm:gap-4">
          <Link
            href="/admin/finance"
            aria-label="Kembali ke Finance"
            className="flex size-10 items-center justify-center rounded-full text-navy-steel transition hover:bg-arctic-blue"
          >
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-center font-heading text-[30px] font-bold leading-tight text-navy-steel sm:text-left sm:text-[36px]">
            Withdrawal Detail
          </h1>
        </div>

        <section className="py-10 text-center sm:py-12">
          <p className="text-sm font-semibold tracking-[0.08em] text-[#536069] sm:text-base">
            TOTAL WITHDRAWAL AMOUNT
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <p className="font-heading text-[38px] font-bold leading-none text-navy-steel sm:text-[46px]">
              {formatCurrency(withdrawal.amount)}
            </p>
            <AdminWithdrawalStatusBadge status={withdrawal.status} className="px-4 py-2 text-xs sm:text-sm" />
          </div>
        </section>

        <div className="space-y-5 sm:space-y-6">
          <InfoCard
            title="Merchant Information"
            rows={[
              { label: "Name", value: merchant.name, strong: true },
              { label: "Owner", value: merchant.ownerName ?? "Belum tersedia" },
              { label: "Type", value: merchant.type === "CANTEEN" ? "Kantin" : "Koperasi" },
            ]}
          />

          <InfoCard
            title="Withdrawal Details"
            rows={[
              {
                label: "Method",
                value: (
                  <span className="inline-flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-navy-steel text-white">
                      <Landmark className="size-5" />
                    </span>
                    <span>{METHOD_LABEL[withdrawal.method]}</span>
                  </span>
                ),
              },
              { label: "Requested Date", value: formatDate(withdrawal.timeline.createdAt) },
            ]}
          />

          <InfoCard
            title="Settlement Balance"
            rows={[
              {
                label: "Pending Balance",
                value: merchant.wallet ? formatCurrency(merchant.wallet.pendingBalance) : "Belum tersedia",
                strong: true,
              },
              {
                label: "Available Balance",
                value: merchant.wallet ? formatCurrency(merchant.wallet.availableBalance) : "Belum tersedia",
              },
            ]}
          />

          <section className="rounded-[24px] border border-[#EEF1F3] bg-white p-6 shadow-[0_10px_30px_rgba(13,27,42,0.04)] sm:p-7">
            <h2 className="text-lg font-semibold text-navy-steel sm:text-xl">Timeline</h2>
            <div className="mt-3 h-px bg-[#E5E9EC]" />
            <div className="mt-7">
              {timeline.map((step, index) => (
                <div key={step.label} className="grid grid-cols-[24px_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "mt-0.5 size-5 rounded-full border-[5px]",
                        step.state === "done" && "border-navy-steel bg-white",
                        step.state === "current" && "border-navy-steel bg-white",
                        step.state === "upcoming" && "border-[#EEF1F3] bg-[#F5F7F8]",
                        step.state === "rejected" && "border-[#A23D35] bg-white",
                      )}
                    />
                    {index < timeline.length - 1 ? (
                      <span className={cn("min-h-[58px] w-px flex-1", step.state === "done" ? "bg-[#B7C0C7]" : "bg-[#E6EAED]")} />
                    ) : null}
                  </div>
                  <div className="pb-6">
                    <p className={cn("font-semibold", step.state === "upcoming" ? "text-[#A5ADB3]" : step.state === "rejected" ? "text-[#8E342D]" : "text-navy-steel")}>{step.label}</p>
                    <p className={cn("mt-1 text-sm", step.state === "upcoming" ? "text-[#B2B8BD]" : "text-[#536069]")}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="sticky bottom-0 z-20">
        <AdminWithdrawalActions withdrawalId={withdrawal.id} status={withdrawal.status} />
      </div>
    </div>
  );
}

interface InfoRow {
  label: string;
  value: ReactNode;
  strong?: boolean;
}

function InfoCard({ title, rows }: { title: string; rows: InfoRow[] }) {
  return (
    <section className="rounded-[24px] border border-[#EEF1F3] bg-white p-6 shadow-[0_10px_30px_rgba(13,27,42,0.04)] sm:p-7">
      <h2 className="text-lg font-semibold text-navy-steel sm:text-xl">{title}</h2>
      <div className="mt-3 h-px bg-[#E5E9EC]" />
      <div className="mt-5 space-y-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-5">
            <span className="text-sm text-[#536069] sm:text-base">{row.label}</span>
            <span className={cn("max-w-[65%] text-right text-sm text-navy-steel sm:text-base", row.strong && "font-semibold")}>{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

type TimelineState = "done" | "current" | "upcoming" | "rejected";

function buildTimeline(withdrawal: AdminWithdrawalData) {
  const isRejected = withdrawal.status === "REJECTED";
  const steps: Array<{ label: string; value: string | null }> = [
    { label: "Requested", value: withdrawal.timeline.createdAt },
    { label: "Approved", value: withdrawal.timeline.approvedAt },
    ...(isRejected
      ? [{ label: "Rejected", value: withdrawal.timeline.rejectedAt }]
      : [
          { label: "Processing", value: withdrawal.timeline.processedAt },
          { label: "Completed", value: withdrawal.timeline.completedAt },
        ]),
  ];

  const firstMissingIndex = steps.findIndex((step) => !step.value);

  return steps.map((step, index) => {
    let state: TimelineState;

    if (step.label === "Rejected" && step.value) state = "rejected";
    else if (step.value) state = "done";
    else if (!isRejected && index === firstMissingIndex) state = "current";
    else state = "upcoming";

    return {
      label: step.label,
      description: step.value
        ? formatDateTime(step.value)
        : state === "current"
          ? "Waiting for action"
          : "Belum tersedia",
      state,
    };
  });
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

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}
