import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  Store,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  AdminTransactionStatusBadge,
  AdminTransactionTypeBadge,
} from "@/features/transactions/components/admin/transaction-management/admin-transaction-badges";

import type {
  AdminTransactionData,
} from "@/lib/api/admin-transaction-shared";
import type {
  AdminStudentData,
} from "@/lib/api/admin-students";

import {
  formatCurrency,
} from "@/lib/utils";

interface AdminTransactionDetailProps {
  transaction: AdminTransactionData;
  student: AdminStudentData;
}

export function AdminTransactionDetail({
  transaction,
  student,
}: AdminTransactionDetailProps) {
  const statusPresentation =
    getStatusPresentation(
      transaction,
    );
  const StatusIcon =
    statusPresentation.icon;

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6 flex items-center gap-2 lg:mb-8">
        <Link
          href="/admin/transactions"
          aria-label="Kembali ke transaksi"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy-steel transition hover:bg-[#ECEEF0]"
        >
          <ArrowLeft className="size-6" />
        </Link>
        <h1 className="font-heading text-[28px] font-bold leading-tight text-navy-steel lg:text-[32px]">
          Detail Transaksi
        </h1>
      </div>

      <section className="flex flex-col items-center py-3 text-center lg:py-5">
        <div
          className={`flex size-20 items-center justify-center rounded-full shadow-sm ${statusPresentation.iconClass}`}
        >
          <StatusIcon className="size-10" />
        </div>
        <h2 className="mt-5 font-heading text-[26px] font-semibold leading-tight text-navy-steel lg:text-[30px]">
          {statusPresentation.title}
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#536069]">
          <Clock3 className="size-4" />
          {formatDetailDate(
            transaction.createdAt,
          )}
        </p>
      </section>

      <section className="mt-6 rounded-[24px] border border-[#E7EBEE] bg-white p-5 shadow-[0_12px_32px_rgba(13,27,42,0.04)]">
        <DetailRow
          label="ID Transaksi"
          value={transaction.id}
          valueClassName="break-all text-right text-sm font-medium text-navy-steel"
        />
        <Divider />
        <DetailRow
          label="Jenis Transaksi"
          value={
            <AdminTransactionTypeBadge
              type={transaction.type}
            />
          }
        />
        <Divider />
        <DetailRow
          label="Status"
          value={
            <AdminTransactionStatusBadge
              status={transaction.status}
            />
          }
        />
        <Divider />
        <DetailRow
          label="Jumlah"
          value={formatCurrency(
            transaction.amount,
          )}
          valueClassName="font-heading text-[24px] font-semibold text-navy-steel"
        />
      </section>

      <section className="mt-7">
        <h3 className="px-1 text-sm font-medium uppercase tracking-[0.08em] text-[#536069]">
          Informasi Partisipan
        </h3>

        <div className="mt-3 space-y-4">
          <ParticipantCard
            icon={UserRound}
            label="Siswa"
            title={student.name}
            subtitle={formatStudentSubtitle(
              student,
            )}
            avatarUrl={student.avatarUrl}
          />

          {transaction.merchant ? (
            <ParticipantCard
              icon={Store}
              label={`Merchant (${merchantTypeLabel(
                transaction.merchant.type,
              )})`}
              title={
                transaction.merchant.name
              }
              subtitle="Merchant SchoolCanteen"
            />
          ) : null}
        </div>
      </section>

      <section className="mt-6 rounded-[24px] border border-[#E7EBEE] bg-white p-5 shadow-[0_12px_32px_rgba(13,27,42,0.04)]">
        <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-[#536069]">
          Rincian Transaksi
        </h3>

        <div className="mt-5 space-y-4">
          <SimpleValueRow
            label="Jumlah Transaksi"
            value={formatCurrency(
              transaction.amount,
            )}
          />
          <SimpleValueRow
            label="Direction"
            value={
              transaction.direction ===
              "CREDIT"
                ? "Credit"
                : "Debit"
            }
          />
          <SimpleValueRow
            label="Reference"
            value={
              transaction.reference.id ??
              "Tidak tersedia"
            }
            breakValue
          />
          <div className="border-t border-[#E8ECEF] pt-4">
            <p className="text-sm text-[#536069]">
              Description
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-navy-steel">
              {transaction.description ??
                "Tidak tersedia"}
            </p>
          </div>
        </div>
      </section>

      {transaction.payment ? (
        <section className="mt-6 rounded-[24px] border border-[#E7EBEE] bg-white p-5 shadow-[0_12px_32px_rgba(13,27,42,0.04)]">
          <div className="flex items-center gap-2">
            <CreditCard className="size-5 text-navy-steel" />
            <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-[#536069]">
              Informasi Pembayaran
            </h3>
          </div>

          <div className="mt-5 space-y-4">
            <SimpleValueRow
              label="Provider"
              value={
                transaction.payment.provider ??
                "Tidak tersedia"
              }
            />
            <SimpleValueRow
              label="Provider Order ID"
              value={
                transaction.payment.providerOrderId ??
                "Tidak tersedia"
              }
              breakValue
            />
            <SimpleValueRow
              label="Payment Type"
              value={
                transaction.payment.paymentType ??
                "Belum tersedia"
              }
            />
            <SimpleValueRow
              label="Provider Transaction ID"
              value={
                transaction.payment.providerTransactionId ??
                "Belum tersedia"
              }
              breakValue
            />
            <SimpleValueRow
              label="Gross Amount"
              value={
                transaction.payment.grossAmount ===
                null
                  ? "Belum tersedia"
                  : formatCurrency(
                      transaction.payment.grossAmount,
                    )
              }
            />
            <SimpleValueRow
              label="Paid At"
              value={formatNullableDate(
                transaction.payment.paidAt,
              )}
            />
            <SimpleValueRow
              label="Expired At"
              value={formatNullableDate(
                transaction.payment.expiredAt,
              )}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}

function DetailRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="shrink-0 text-sm text-[#536069]">
        {label}
      </span>
      <span
        className={
          valueClassName ??
          "text-right text-sm font-medium text-navy-steel"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-4 h-px bg-[#E8ECEF]" />
  );
}

function ParticipantCard({
  icon: Icon,
  label,
  title,
  subtitle,
  avatarUrl,
}: {
  icon: typeof UserRound;
  label: string;
  title: string;
  subtitle: string;
  avatarUrl?: string | null;
}) {
  return (
    <article className="flex items-center gap-4 rounded-[20px] border border-[#E7EBEE] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)]">
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-arctic-blue text-navy-steel">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${title} avatar`}
            className="size-full object-cover"
          />
        ) : (
          <Icon className="size-6" />
        )}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#536069]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-base font-medium text-navy-steel">
          {title}
        </p>
        <p className="mt-0.5 text-sm text-[#536069]">
          {subtitle}
        </p>
      </div>
    </article>
  );
}

function SimpleValueRow({
  label,
  value,
  breakValue = false,
}: {
  label: string;
  value: string;
  breakValue?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <span className="shrink-0 text-sm text-[#536069]">
        {label}
      </span>
      <span
        className={`text-right text-sm font-medium text-navy-steel ${
          breakValue
            ? "break-all"
            : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function getStatusPresentation(
  transaction: AdminTransactionData,
) {
  if (
    transaction.status ===
    "FAILED"
  ) {
    return {
      icon: XCircle,
      iconClass:
        "bg-[#FFDFDC] text-[#A73535]",
      title: "Transaksi Gagal",
    };
  }

  if (
    transaction.status ===
    "PENDING"
  ) {
    return {
      icon: Clock3,
      iconClass:
        "bg-[#ECEEF0] text-[#536069]",
      title: "Transaksi Menunggu",
    };
  }

  const title =
    transaction.type === "PAYMENT"
      ? "Pembayaran Berhasil"
      : transaction.type === "TOP_UP"
        ? "Top Up Berhasil"
        : "Penyesuaian Selesai";

  return {
    icon: CheckCircle2,
    iconClass:
      "bg-arctic-blue text-navy-steel",
    title,
  };
}

function formatStudentSubtitle(
  student: AdminStudentData,
) {
  const details = [
    student.className
      ? `Kelas ${student.className}`
      : null,
    student.nis
      ? `NIS: ${student.nis}`
      : null,
  ].filter(Boolean);

  return details.length > 0
    ? details.join(" • ")
    : "Data akademik belum tersedia";
}

function merchantTypeLabel(
  value: string,
) {
  switch (
    value.trim().toLowerCase()
  ) {
    case "canteen":
      return "Kantin";
    case "cooperative":
      return "Koperasi";
    default:
      return value;
  }
}

function formatDetailDate(
  value: string | null,
) {
  if (!value) {
    return "Waktu tidak tersedia";
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
      timeZoneName: "short",
    },
  ).format(new Date(value));
}

function formatNullableDate(
  value: string | null,
) {
  if (!value) {
    return "Belum tersedia";
  }

  return formatDetailDate(value);
}
