import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatCurrency } from "@/lib/utils";

interface CheckoutPaymentSummaryProps {
  total: number;
  walletBalance: number | null;
  isLoadingWallet: boolean;
  walletIsActive: boolean;
  hasEnoughBalance: boolean;
  walletError: string | null;
  checkoutError: string | null;
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function CheckoutPaymentSummary({
  total,
  walletBalance,
  isLoadingWallet,
  walletIsActive,
  hasEnoughBalance,
  walletError,
  checkoutError,
  canSubmit,
  isSubmitting,
  onSubmit,
}: CheckoutPaymentSummaryProps) {
  return (
    <section className="rounded-[20px] border border-[#E6E8EA] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.08)] lg:p-8">
      <div className="border-b border-[#E6E8EA] pb-4 lg:pb-6">
        <h2 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold text-[#536069]">
          <WalletCards className="size-[18px]" />
          Wallet
        </h2>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#D1E4FF] bg-arctic-blue p-4">
          <span className="font-sans text-sm text-navy-steel lg:text-base">
            Saldo Saat Ini
          </span>
          <span className="shrink-0 font-heading text-lg font-semibold text-navy-steel lg:text-xl">
            {isLoadingWallet
              ? "Memuat..."
              : walletBalance !== null
                ? formatCurrency(walletBalance)
                : "-"}
          </span>
        </div>

        {walletError ? (
          <div className="mt-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
            <p className="font-sans text-sm font-semibold text-destructive">
              Wallet gagal dimuat
            </p>
            <p className="mt-1 font-sans text-xs leading-5 text-[#536069]">
              {walletError}
            </p>
          </div>
        ) : !isLoadingWallet && walletBalance !== null && !walletIsActive ? (
          <div className="mt-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
            <p className="font-sans text-sm font-semibold text-destructive">
              Wallet tidak aktif
            </p>
          </div>
        ) : !isLoadingWallet && walletBalance !== null && !hasEnoughBalance ? (
          <div className="mt-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
            <p className="font-sans text-sm font-semibold text-destructive">
              Saldo tidak mencukupi
            </p>
            <p className="mt-1 font-sans text-xs leading-5 text-[#536069]">
              Kamu membutuhkan tambahan saldo sebesar{" "}
              <span className="font-semibold text-navy-steel">
                {formatCurrency(Math.max(total - walletBalance, 0))}
              </span>
              .
            </p>
            <Button
              nativeButton={false}
              variant="outline"
              size="sm"
              className="mt-3 border-navy-steel font-sans text-navy-steel"
              render={<Link href="/student/wallet" />}
            >
              Buka Wallet
            </Button>
          </div>
        ) : null}
      </div>

      <div className="py-5 lg:py-6">
        <h2 className="mb-4 font-sans text-sm font-semibold text-navy-steel">
          Ringkasan Pembayaran
        </h2>

        <div className="space-y-3 font-sans text-sm text-[#536069] lg:text-base">
          <div className="flex items-center justify-between gap-4">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span>Biaya layanan</span>
            <span>Rp0</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#E6E8EA] pt-4">
          <span className="font-sans text-sm font-semibold text-navy-steel">
            Total Pembayaran
          </span>
          <span className="font-heading text-xl font-semibold text-navy-steel lg:text-2xl">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {checkoutError ? (
        <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
          <p className="font-sans text-sm font-semibold text-destructive">
            Checkout gagal
          </p>
          <p className="mt-1 font-sans text-xs leading-5 text-[#536069]">
            {checkoutError}
          </p>
        </div>
      ) : null}

      <Button
        type="button"
        className="hidden h-[52px] w-full rounded-[14px] bg-navy-steel font-sans text-sm font-semibold text-white shadow-md hover:bg-navy-steel/90 lg:inline-flex"
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        {isSubmitting ? "Memproses Pesanan..." : "Bayar Sekarang"}
        {!isSubmitting ? <ArrowRight className="size-[18px]" /> : null}
      </Button>

      <div className="mt-6 hidden space-y-2 rounded-xl border border-[#E0E3E5] bg-[#F7F9FB] p-4 lg:block">
        {["Pembayaran aman", "Pesanan tercatat otomatis", "Mudah dipantau"].map(
          (label) => (
            <div
              key={label}
              className="flex items-center gap-2 font-sans text-xs font-medium text-[#536069]"
            >
              <CheckCircle2 className="size-3.5 text-[#BAC8DC]" />
              <span>{label}</span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
