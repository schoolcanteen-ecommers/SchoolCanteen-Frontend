import {
  ArrowLeft,
  Clock3,
  Store,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type {
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

import {
  ProductionStatusBadge,
} from "@/features/canteen/components/admin/production-summary/production-status-badge";

import type {
  AdminCanteenProductionDetail,
  AdminProductionProgressItem,
  AdminProductionStatus,
} from "@/lib/api/admin-canteen-production";

interface AdminProductionDetailProps {
  detail: AdminCanteenProductionDetail;
}

export function AdminProductionDetail({
  detail,
}: AdminProductionDetailProps) {
  return (
    <div className="mx-auto w-full max-w-[900px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/canteen/production"
          aria-label="Kembali ke Production Summary"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E0E3E5] bg-white text-navy-steel transition-colors hover:bg-arctic-blue"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-[26px] font-bold text-navy-steel md:text-[30px]">
          Detail Produksi
        </h1>
      </div>

      <DetailSection title="Merchant Detail">
        <div className="rounded-[18px] border border-[#E0E3E5] bg-white p-5 shadow-[0_4px_6px_rgba(13,27,42,0.02)]">
          <div className="flex items-center gap-3 border-b border-[#E0E3E5] pb-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-arctic-blue text-navy-steel">
              <Store className="size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-heading text-xl font-semibold text-navy-steel">
                {detail.merchant.name}
              </h2>
              <p className="mt-0.5 break-all text-xs text-[#74777D]">
                ID: {detail.merchant.id}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-5">
            <InfoValue
              label="Owner"
              value={
                detail.merchant.ownerName ??
                "Belum tersedia"
              }
            />
            <InfoValue
              label="Merchant Type"
              value={formatMerchantType(
                detail.merchant.type,
              )}
            />
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Production Details">
        <div className="rounded-[18px] bg-navy-steel p-5 text-white shadow-[0_10px_24px_rgba(13,27,42,0.12)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#BAC8D3]">
                Product
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold text-white">
                {detail.product.name}
              </h2>
            </div>
            <ProductionStatusBadge
              status={detail.status}
            />
          </div>

          <div className="my-5 h-px bg-white/15" />

          <div className="grid grid-cols-2 gap-4">
            <DarkInfo
              icon={UtensilsCrossed}
              label="Quantity"
              value={`${detail.quantity} Portion`}
            />
            <DarkInfo
              icon={Clock3}
              label="Pickup Slot"
              value={formatPickupSlot(detail)}
            />
          </div>
        </div>
      </DetailSection>

      <section className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Total Orders"
          value={detail.orderCount}
          suffix="qty"
        />
        <MetricCard
          label="Customer Count"
          value={detail.customerCount}
          suffix="pax"
          icon={Users}
        />
      </section>

      <DetailSection title="Production Progress">
        <div className="rounded-[18px] border border-[#E0E3E5] bg-white p-5 shadow-[0_4px_6px_rgba(13,27,42,0.02)]">
          <p className="mb-5 text-sm leading-6 text-[#536069]">
            Ringkasan status order untuk produk dan pickup slot yang sama.
          </p>

          <div className="space-y-3">
            {PROGRESS_STATUSES.map((status) => {
              const item = findProgress(
                detail.progress,
                status,
              );

              return (
                <ProgressRow
                  key={status}
                  status={status}
                  orderCount={
                    item?.orderCount ?? 0
                  }
                  quantity={item?.quantity ?? 0}
                />
              );
            })}
          </div>
        </div>
      </DetailSection>
    </div>
  );
}

const PROGRESS_STATUSES: AdminProductionStatus[] = [
  "CONFIRMED",
  "PREPARING",
  "READY",
];

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#74777D]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-[#74777D]">
        {label}
      </p>
      <p className="mt-1 text-base font-medium text-navy-steel">
        {value}
      </p>
    </div>
  );
}

function DarkInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[#BAC8D3]">
        <Icon className="size-4" />
        <span className="text-[11px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-white sm:text-base">
        {value}
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  icon: Icon,
}: {
  label: string;
  value: number;
  suffix: string;
  icon?: LucideIcon;
}) {
  return (
    <article className="relative overflow-hidden rounded-[18px] border border-[#E0E3E5] bg-white p-5 shadow-[0_4px_6px_rgba(13,27,42,0.02)]">
      {Icon ? (
        <Icon className="absolute right-4 top-4 size-8 text-[#0D1B2A]/5" />
      ) : null}
      <p className="text-[11px] font-medium uppercase tracking-wide text-[#74777D]">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-1">
        <strong className="font-heading text-2xl font-bold text-navy-steel">
          {value}
        </strong>
        <span className="text-sm text-[#536069]">
          {suffix}
        </span>
      </div>
    </article>
  );
}

function ProgressRow({
  status,
  orderCount,
  quantity,
}: {
  status: AdminProductionStatus;
  orderCount: number;
  quantity: number;
}) {
  const label =
    status === "READY"
      ? "Ready"
      : status === "PREPARING"
        ? "Preparing"
        : "Confirmed";

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#F7F9FB] px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className={`size-2.5 rounded-full ${
            status === "READY"
              ? "bg-emerald-600"
              : status === "PREPARING"
                ? "bg-yellow-500"
                : "bg-navy-steel"
          }`}
        />
        <span className="text-sm font-semibold text-navy-steel">
          {label}
        </span>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-navy-steel">
          {orderCount} orders
        </p>
        <p className="text-xs text-[#74777D]">
          {quantity} portion
        </p>
      </div>
    </div>
  );
}

function findProgress(
  progress: AdminProductionProgressItem[],
  status: AdminProductionStatus,
) {
  return progress.find(
    (item) => item.status === status,
  );
}

function formatMerchantType(
  type: AdminCanteenProductionDetail["merchant"]["type"],
): string {
  return type === "CANTEEN" ? "Canteen" : type;
}

function formatPickupSlot(
  detail: AdminCanteenProductionDetail,
): string {
  const { startAt, endAt } = detail.pickupSlot;

  if (!startAt || !endAt) {
    return "Belum tersedia";
  }

  return `${formatTime(startAt)} - ${formatTime(endAt)}`;
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
