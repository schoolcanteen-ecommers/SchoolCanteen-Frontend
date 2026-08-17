"use client";

import { useMemo, useState } from "react";

import {
  CircleDollarSign,
  CreditCard,
  Plus,
  RotateCcw,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { cn, formatCurrency } from "@/lib/utils";

import type {
  WalletTransaction,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/types/wallet";

type TransactionFilter = "ALL" | "TOP_UP" | "PAYMENT";

interface StudentWalletTransactionsProps {
  transactions: WalletTransaction[];
}

const INITIAL_VISIBLE_COUNT = 3;

function getFallbackLabel(type: WalletTransactionType) {
  switch (type) {
    case "TOP_UP":
      return "Top Up Wallet";
    case "PAYMENT":
      return "Pembayaran Pesanan";
    case "REFUND":
      return "Pengembalian Dana";
    case "ADJUSTMENT":
      return "Penyesuaian Saldo";
  }
}

function getStatusLabel(status: WalletTransactionStatus) {
  switch (status) {
    case "PENDING":
      return "Menunggu";
    case "SUCCESS":
      return "Berhasil";
    case "FAILED":
      return "Gagal";
  }
}

function getStatusClassName(status: WalletTransactionStatus) {
  switch (status) {
    case "PENDING":
      return "bg-amber-50 text-amber-700";
    case "SUCCESS":
      return "bg-emerald-50 text-emerald-700";
    case "FAILED":
      return "bg-red-50 text-red-700";
  }
}

function getTransactionIcon(type: WalletTransactionType) {
  switch (type) {
    case "TOP_UP":
      return Plus;
    case "PAYMENT":
      return CreditCard;
    case "REFUND":
      return RotateCcw;
    case "ADJUSTMENT":
      return CircleDollarSign;
  }
}

function formatTransactionDate(value: string) {
  const date = new Date(value);
  const now = new Date();

  const dateKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const todayKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(yesterday);

  const time = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  if (dateKey === todayKey) {
    return `Hari ini, ${time}`;
  }

  if (dateKey === yesterdayKey) {
    return `Kemarin, ${time}`;
  }

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function StudentWalletTransactions({
  transactions,
}: StudentWalletTransactionsProps) {
  const [filter, setFilter] = useState<TransactionFilter>("ALL");
  const [showAll, setShowAll] = useState(false);

  const filteredTransactions = useMemo(() => {
    if (filter === "ALL") {
      return transactions;
    }

    return transactions.filter((transaction) => transaction.type === filter);
  }, [filter, transactions]);

  const visibleTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, INITIAL_VISIBLE_COUNT);

  function selectFilter(nextFilter: TransactionFilter) {
    setFilter(nextFilter);
    setShowAll(false);
  }

  return (
    <section
      id="wallet-transactions"
      className="scroll-mt-24 md:rounded-[18px] md:border md:border-[#DCE5ED] md:bg-white md:p-8"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <h2 className="font-sans text-[28px] font-semibold tracking-[-0.02em] text-[#191C1E] md:text-3xl">
          <span className="md:hidden">Transaksi Terakhir</span>
          <span className="hidden md:inline">Riwayat Transaksi</span>
        </h2>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0">
          {([
            ["ALL", "Semua"],
            ["TOP_UP", "Top Up"],
            ["PAYMENT", "Pembayaran"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => selectFilter(value)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                filter === value
                  ? "bg-[#0D1B2A] text-white"
                  : "bg-[#DCEBFF] text-[#0D1B2A] hover:bg-[#CFE2FA]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filteredTransactions.length > 0 ? (
        <>
          <div className="mt-6 space-y-3 md:mt-5 md:space-y-0 md:divide-y md:divide-[#E7EDF2]">
            {visibleTransactions.map((transaction) => {
              const TransactionIcon = getTransactionIcon(transaction.type);
              const incoming = transaction.direction === "CREDIT";
              const title =
                transaction.description?.trim() ||
                getFallbackLabel(transaction.type);

              return (
                <article
                  key={transaction.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#DCE5ED] bg-white p-4 md:rounded-none md:border-0 md:px-0 md:py-5"
                >
                  <div className="flex min-w-0 items-center gap-3 md:gap-4">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full",
                        incoming
                          ? "bg-[#F1F4F7] text-[#0D1B2A]"
                          : "bg-red-50 text-red-600",
                      )}
                    >
                      <TransactionIcon className="size-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-semibold text-[#191C1E] md:text-base">
                        {title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#536069]">
                        <span>{formatTransactionDate(transaction.createdAt)}</span>
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[10px] font-semibold md:hidden",
                            getStatusClassName(transaction.status),
                          )}
                        >
                          {getStatusLabel(transaction.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={cn(
                        "text-sm font-bold md:text-base",
                        incoming ? "text-[#0D1B2A]" : "text-red-600",
                      )}
                    >
                      {incoming ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <span
                      className={cn(
                        "mt-1 hidden w-fit rounded px-2 py-0.5 text-[10px] font-semibold md:ml-auto md:block",
                        getStatusClassName(transaction.status),
                      )}
                    >
                      {getStatusLabel(transaction.status)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredTransactions.length > INITIAL_VISIBLE_COUNT && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="mt-5 w-full rounded-lg py-3 text-center text-sm font-semibold text-[#0D1B2A] transition hover:bg-[#F2F4F6]"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua Riwayat"}
            </button>
          )}
        </>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={CircleDollarSign}
            title="Belum ada transaksi"
            description="Belum ada transaksi yang sesuai dengan filter ini."
          />
        </div>
      )}
    </section>
  );
}
