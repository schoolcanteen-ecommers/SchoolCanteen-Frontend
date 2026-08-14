import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  CreditCard,
  History,
  RotateCcw,
  WalletCards,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

import {
  studentWallet,
  studentWalletTransactions,
} from "@/mocks/wallet";

import { formatCurrency } from "@/lib/utils";

import type {
  WalletTransaction,
} from "@/types/wallet";

function getTransactionLabel(
  transaction: WalletTransaction,
) {
  switch (transaction.type) {
    case "TOP_UP":
      return "Top Up Saldo";

    case "PAYMENT":
      return "Pembayaran Pesanan";

    case "REFUND":
      return "Pengembalian Dana";
  }
}

function getTransactionIcon(
  transaction: WalletTransaction,
) {
  switch (transaction.type) {
    case "TOP_UP":
      return ArrowDownLeft;

    case "PAYMENT":
      return ArrowUpRight;

    case "REFUND":
      return RotateCcw;
  }
}

function isIncomingTransaction(
  transaction: WalletTransaction,
) {
  return (
    transaction.type === "TOP_UP" ||
    transaction.type === "REFUND"
  );
}

export default function StudentWalletPage() {
  const successfulTransactions =
    studentWalletTransactions.filter(
      (transaction) =>
        transaction.status ===
        "SUCCESS",
    );

  const totalTopUp =
    successfulTransactions
      .filter(
        (transaction) =>
          transaction.type ===
          "TOP_UP",
      )
      .reduce(
        (total, transaction) =>
          total +
          transaction.amount,
        0,
      );

  const totalPayment =
    successfulTransactions
      .filter(
        (transaction) =>
          transaction.type ===
          "PAYMENT",
      )
      .reduce(
        (total, transaction) =>
          total +
          transaction.amount,
        0,
      );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {}
      <PageHeader
        title="Saku Wallet"
        description="Pantau saldo dan riwayat transaksi SchoolCanteen."
      />

      {}
      <section className="mt-8 overflow-hidden rounded-2xl border bg-background">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <WalletCards className="size-4" />

                Saldo Tersedia
              </div>

              <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {formatCurrency(
                  studentWallet.balance,
                )}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Saldo dapat digunakan untuk
                transaksi di kantin dan koperasi
                sekolah.
              </p>
            </div>

            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <CircleDollarSign className="size-6 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard
          title="Total Top Up"
          value={formatCurrency(
            totalTopUp,
          )}
          description="Total saldo berhasil ditambahkan"
          icon={ArrowDownLeft}
        />

        <StatCard
          title="Total Pembayaran"
          value={formatCurrency(
            totalPayment,
          )}
          description="Total pembayaran pesanan"
          icon={CreditCard}
        />
      </section>

      {}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Riwayat Transaksi
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Aktivitas saldo terbaru pada
            wallet kamu.
          </p>
        </div>

        {studentWalletTransactions.length >
        0 ? (
          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            <div className="divide-y">
              {studentWalletTransactions.map(
                (transaction) => {
                  const TransactionIcon =
                    getTransactionIcon(
                      transaction,
                    );

                  const incoming =
                    isIncomingTransaction(
                      transaction,
                    );

                  const formattedDate =
                    new Intl.DateTimeFormat(
                      "id-ID",
                      {
                        dateStyle:
                          "medium",
                        timeStyle:
                          "short",
                      },
                    ).format(
                      new Date(
                        transaction.createdAt,
                      ),
                    );

                  return (
                    <div
                      key={
                        transaction.id
                      }
                      className="flex items-center gap-4 p-4 sm:p-5"
                    >
                      {}
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <TransactionIcon className="size-5 text-foreground" />
                      </div>

                      {}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                          <p className="font-medium">
                            {getTransactionLabel(
                              transaction,
                            )}
                          </p>

                          <span className="w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            Berhasil
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formattedDate}
                        </p>

                        {transaction.referenceId && (
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            Ref:{" "}
                            {
                              transaction.referenceId
                            }
                          </p>
                        )}
                      </div>

                      {}
                      <div className="shrink-0 text-right">
                        <p
                          className={
                            incoming
                              ? "font-semibold text-emerald-700"
                              : "font-semibold text-foreground"
                          }
                        >
                          {incoming
                            ? "+"
                            : "-"}
                          {formatCurrency(
                            transaction.amount,
                          )}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={History}
              title="Belum ada transaksi"
              description="Riwayat top up, pembayaran, dan refund akan tampil di sini."
            />
          </div>
        )}
      </section>
    </div>
  );
}