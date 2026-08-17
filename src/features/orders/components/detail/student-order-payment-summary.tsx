import Link from "next/link";

import {
  ArrowLeft,
  WalletCards,
} from "lucide-react";

import {
  ROUTES,
} from "@/lib/constants";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  PaymentStatus,
} from "@/types/order";

interface StudentOrderPaymentSummaryProps {
  totalPrice: number;
  paymentStatus: PaymentStatus;
  showAction?: boolean;
}

function getPaymentPresentation(
  paymentStatus: PaymentStatus,
) {
  switch (paymentStatus) {
    case "PAID":
    case "HELD":
    case "RELEASED":
      return {
        label: "Berhasil",
        className:
          "bg-emerald-50 text-emerald-700",
      };

    case "REFUNDED":
      return {
        label: "Dikembalikan",
        className:
          "bg-blue-50 text-blue-700",
      };

    default:
      return {
        label: "Belum dibayar",
        className:
          "bg-amber-50 text-amber-700",
      };
  }
}

export function StudentOrderPaymentSummary({
  totalPrice,
  paymentStatus,
  showAction = true,
}: StudentOrderPaymentSummaryProps) {
  const payment =
    getPaymentPresentation(
      paymentStatus,
    );

  return (
    <section className="rounded-[18px] border border-arctic-blue bg-white p-5 sm:p-6 lg:mt-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
      <h2 className="font-heading text-xl font-semibold text-navy-steel lg:hidden">
        Pembayaran
      </h2>

      <div className="mt-5 space-y-3 border-b border-[#E6E8EA] pb-5 text-sm text-[#536069] sm:text-base lg:mt-0 lg:border-t lg:pt-6">
        <div className="flex items-center justify-between gap-4">
          <span>Subtotal</span>
          <span className="font-medium text-navy-steel">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span>Metode</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-navy-steel">
            <WalletCards className="size-4" />
            Wallet
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span>Status Pembayaran</span>
          <span
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold",
              payment.className,
            )}
          >
            {payment.label}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 pt-5">
        <span className="text-sm font-semibold text-navy-steel">
          Total Pembayaran
        </span>

        <div className="text-right">
          <p className="font-heading text-2xl font-bold text-navy-steel">
            {formatCurrency(totalPrice)}
          </p>
          <p
            className={cn(
              "mt-1 text-xs font-semibold",
              paymentStatus === "REFUNDED"
                ? "text-blue-700"
                : paymentStatus === "UNPAID"
                  ? "text-amber-700"
                  : "text-emerald-700",
            )}
          >
            {payment.label}
          </p>
        </div>
      </div>

      {showAction && (
        <Link
          href={ROUTES.STUDENT.ORDERS}
          className="mt-7 hidden min-h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-navy-steel px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-flex"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Pesanan
        </Link>
      )}
    </section>
  );
}
