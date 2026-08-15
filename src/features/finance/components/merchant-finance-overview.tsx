import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  History,
  Landmark,
  WalletCards,
} from "lucide-react";

import {
  StatCard,
} from "@/components/dashboard/stat-card";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import {
  MerchantWithdrawalForm,
} from "@/features/finance/components/merchant-withdrawal-form";

import type {
  MerchantWalletData,
  MerchantWalletTransactionData,
} from "@/lib/api/merchant-finance";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  MerchantPaymentAccount,
  WithdrawalMethod,
  WithdrawalRequest,
  WithdrawalStatus,
} from "@/types/withdrawal";

interface MerchantFinanceOverviewProps {
  wallet:
    MerchantWalletData;

  transactions:
    MerchantWalletTransactionData[];

  withdrawals:
    WithdrawalRequest[];

  paymentAccounts:
    MerchantPaymentAccount[];
}

const WITHDRAWAL_METHOD_LABEL: Record<
  WithdrawalMethod,
  string
> = {
  CASH_ADMIN:
    "Cash melalui Admin",

  E_WALLET:
    "E-Wallet",

  BANK_TRANSFER:
    "Transfer Bank",
};

const WITHDRAWAL_STATUS_LABEL: Record<
  WithdrawalStatus,
  string
> = {
  WAITING_APPROVAL:
    "Menunggu Persetujuan",

  APPROVED:
    "Disetujui",

  PROCESSING:
    "Sedang Diproses",

  COMPLETED:
    "Selesai",

  REJECTED:
    "Ditolak",
};

function getWithdrawalStatusClassName(
  status: WithdrawalStatus,
) {
  switch (status) {
    case "WAITING_APPROVAL":
      return "bg-amber-50 text-amber-700";

    case "APPROVED":
      return "bg-blue-50 text-blue-700";

    case "PROCESSING":
      return "bg-violet-50 text-violet-700";

    case "COMPLETED":
      return "bg-emerald-50 text-emerald-700";

    case "REJECTED":
      return "bg-red-50 text-red-700";
  }
}

function humanizeTransactionType(
  type: string,
) {
  return type
    .replace(
      /_/g,
      " ",
    )
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

export function MerchantFinanceOverview({
  wallet,
  transactions,
  withdrawals,
  paymentAccounts,
}: MerchantFinanceOverviewProps) {
  return (
    <>
      {}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Saldo Tersedia"
          value={formatCurrency(
            wallet.availableBalance,
          )}
          description="Dana yang dapat dicairkan"
          icon={WalletCards}
        />

        <StatCard
          title="Dana Tertahan"
          value={formatCurrency(
            wallet.pendingBalance,
          )}
          description="Dana yang masih berada dalam escrow"
          icon={Clock3}
        />

        <StatCard
          title="Total Saldo"
          value={formatCurrency(
            wallet.totalBalance,
          )}
          description="Saldo pending dan tersedia"
          icon={CircleDollarSign}
        />
      </section>

      <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {}
        <section>
          <div>
            <h2 className="text-lg font-semibold">
              Aktivitas Keuangan
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pergerakan dana pada
              wallet merchant.
            </p>
          </div>

          {transactions.length >
          0 ? (
            <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
              <div className="divide-y">
                {transactions.map(
                  (
                    transaction,
                  ) => {
                    const incoming =
                      transaction.direction ===
                      "CREDIT";

                    const formattedDate =
                      transaction.createdAt
                        ? new Intl.DateTimeFormat(
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
                          )
                        : "-";

                    return (
                      <article
                        key={
                          transaction.id
                        }
                        className="flex items-center gap-4 px-5 py-4 sm:px-6"
                      >
                        <div
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-xl",

                            incoming
                              ? "bg-emerald-50"
                              : "bg-red-50",
                          )}
                        >
                          {incoming ? (
                            <ArrowDownToLine className="size-5 text-emerald-700" />
                          ) : (
                            <ArrowUpRight className="size-5 text-red-700" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-medium">
                            {transaction.description ??
                              humanizeTransactionType(
                                transaction.type,
                              )}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                            <span>
                              {humanizeTransactionType(
                                transaction.type,
                              )}
                            </span>

                            {transaction.reference
                              .type && (
                              <>
                                <span>
                                  •
                                </span>

                                <span>
                                  {
                                    transaction
                                      .reference
                                      .type
                                  }
                                </span>
                              </>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {
                              formattedDate
                            }
                          </p>
                        </div>

                        <p
                          className={cn(
                            "shrink-0 font-semibold",

                            incoming
                              ? "text-emerald-700"
                              : "text-red-700",
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
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState
                icon={History}
                title="Belum ada aktivitas keuangan"
                description="Pergerakan dana merchant akan tampil di sini."
              />
            </div>
          )}
        </section>

        {}
        <aside className="space-y-6">
          <MerchantWithdrawalForm
            availableBalance={
              wallet.availableBalance
            }
            walletIsActive={
              wallet.isActive
            }
            paymentAccounts={
              paymentAccounts
            }
          />

          <section>
            <div>
              <h2 className="text-lg font-semibold">
                Riwayat Pencairan
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Riwayat permintaan
                pencairan dana
                merchant.
              </p>
            </div>

            {withdrawals.length >
            0 ? (
              <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
                <div className="divide-y">
                  {withdrawals.map(
                    (
                      withdrawal,
                    ) => {
                      const formattedDate =
                        new Intl.DateTimeFormat(
                          "id-ID",
                          {
                            dateStyle:
                              "medium",
                          },
                        ).format(
                          new Date(
                            withdrawal.createdAt,
                          ),
                        );

                      return (
                        <article
                          key={
                            withdrawal.id
                          }
                          className="p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-start gap-3">
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <Landmark className="size-5 text-primary" />
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold">
                                  {formatCurrency(
                                    withdrawal.amount,
                                  )}
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                  {
                                    WITHDRAWAL_METHOD_LABEL[
                                      withdrawal
                                        .method
                                    ]
                                  }
                                </p>

                                {withdrawal.paymentAccount && (
                                  <p className="mt-1 truncate text-xs text-muted-foreground">
                                    {
                                      withdrawal
                                        .paymentAccount
                                        .provider
                                    }{" "}
                                    •{" "}
                                    {
                                      withdrawal
                                        .paymentAccount
                                        .accountNumber
                                    }
                                  </p>
                                )}
                              </div>
                            </div>

                            <span
                              className={cn(
                                "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",

                                getWithdrawalStatusClassName(
                                  withdrawal.status,
                                ),
                              )}
                            >
                              {
                                WITHDRAWAL_STATUS_LABEL[
                                  withdrawal.status
                                ]
                              }
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4 border-t pt-3">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Diajukan
                              </p>

                              <p className="mt-1 text-sm font-medium">
                                {
                                  formattedDate
                                }
                              </p>
                            </div>

                            {withdrawal.status ===
                              "COMPLETED" && (
                              <CheckCircle2 className="size-5 text-emerald-700" />
                            )}
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <EmptyState
                  icon={Landmark}
                  title="Belum ada pencairan"
                  description="Riwayat pencairan dana merchant akan tampil di sini."
                />
              </div>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}