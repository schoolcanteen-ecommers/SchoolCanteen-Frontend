import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleCheck,
  CircleDollarSign,
  Clock3,
  RotateCcw,
} from "lucide-react";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  WalletTransaction,
} from "@/types/wallet";

interface StudentRecentActivityProps {
  transactions: WalletTransaction[];
  className?: string;
}

function getTransactionLabel(
  transaction: WalletTransaction,
): string {
  switch (transaction.type) {
    case "TOP_UP":
      return "Top Up Wallet";

    case "PAYMENT":
      return transaction.status ===
        "SUCCESS"
        ? "Pembayaran berhasil"
        : "Pembayaran Pesanan";

    case "REFUND":
      return "Pengembalian Dana";

    case "ADJUSTMENT":
      return "Penyesuaian Wallet";
  }
}

function getTransactionIcon(
  transaction: WalletTransaction,
) {
  if (
    transaction.status ===
    "PENDING"
  ) {
    return Clock3;
  }

  if (
    transaction.type ===
    "PAYMENT" &&
    transaction.status ===
      "SUCCESS"
  ) {
    return CircleCheck;
  }

  switch (transaction.type) {
    case "TOP_UP":
      return ArrowDownLeft;

    case "PAYMENT":
      return ArrowUpRight;

    case "REFUND":
      return RotateCcw;

    case "ADJUSTMENT":
      return CircleDollarSign;
  }
}

function getJakartaDateKey(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Jakarta",
    },
  ).format(date);
}

function formatActivityTime(
  value: string,
): string {
  const date = new Date(value);
  const now = new Date();
  const yesterday = new Date(
    now.getTime() -
      24 * 60 * 60 * 1000,
  );

  const time =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone:
          "Asia/Jakarta",
      },
    ).format(date);

  const dateKey =
    getJakartaDateKey(date);

  if (
    dateKey ===
    getJakartaDateKey(now)
  ) {
    return `Hari ini, ${time}`;
  }

  if (
    dateKey ===
    getJakartaDateKey(
      yesterday,
    )
  ) {
    return `Kemarin, ${time}`;
  }

  const formattedDate =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        day: "2-digit",
        month: "short",
        timeZone:
          "Asia/Jakarta",
      },
    ).format(date);

  return `${formattedDate}, ${time}`;
}

export function StudentRecentActivity({
  transactions,
  className,
}: StudentRecentActivityProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-arctic-blue bg-white p-5 lg:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-sans text-lg font-semibold text-[#191C1E] lg:text-xl">
          Aktivitas Terakhir
        </h2>

        <Link
          href="/student/wallet"
          className="hidden text-xs font-semibold text-navy-steel hover:underline sm:inline"
        >
          Lihat Semua
        </Link>
      </div>

      {transactions.length > 0 ? (
        <div className="mt-5 space-y-3 lg:relative lg:space-y-0 lg:before:absolute lg:before:bottom-4 lg:before:left-[19px] lg:before:top-4 lg:before:w-px lg:before:bg-[#C4C6CC]">
          {transactions.map(
            (
              transaction,
              index,
            ) => {
              const Icon =
                getTransactionIcon(
                  transaction,
                );

              const incoming =
                transaction.direction ===
                "CREDIT";

              return (
                <article
                  key={
                    transaction.id
                  }
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl border border-arctic-blue bg-white p-3 lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0 lg:pb-6",
                    index >= 2 &&
                      "hidden lg:flex",
                  )}
                >
                  <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-navy-steel/10 bg-arctic-blue text-navy-steel">
                    <Icon className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1 lg:pt-0.5">
                    <p className="truncate text-sm font-semibold text-[#191C1E]">
                      {getTransactionLabel(
                        transaction,
                      )}
                    </p>

                    {transaction.description ? (
                      <p className="mt-0.5 hidden line-clamp-2 text-xs leading-5 text-[#536069] lg:block">
                        {
                          transaction.description
                        }
                      </p>
                    ) : null}

                    <p className="mt-0.5 text-[11px] text-[#74777D] lg:mt-1 lg:text-xs">
                      {formatActivityTime(
                        transaction.createdAt,
                      )}
                    </p>
                  </div>

                  <p
                    className={cn(
                      "shrink-0 text-sm font-semibold lg:hidden",
                      incoming
                        ? "text-navy-steel"
                        : "text-[#BA1A1A]",
                    )}
                  >
                    {incoming
                      ? "+"
                      : "-"}
                    {formatCurrency(
                      transaction.amount,
                    )}
                  </p>
                </article>
              );
            },
          )}
        </div>
      ) : (
        <div className="mt-5 rounded-xl bg-[#F7F9FB] p-4 text-sm text-[#536069]">
          Belum ada aktivitas wallet.
        </div>
      )}
    </section>
  );
}
