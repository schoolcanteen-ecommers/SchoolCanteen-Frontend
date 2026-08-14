import {
  ArrowDownToLine,
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  History,
  Landmark,
  RotateCcw,
  WalletCards,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/shared/empty-state";

import {
  PAYMENT_STATUS_LABEL,
} from "@/lib/constants";

import {
  cn,
  formatCurrency,
} from "@/lib/utils";

import type {
  Order,
  PaymentStatus,
} from "@/types/order";

import type {
  WithdrawalMethod,
  WithdrawalRequest,
  WithdrawalStatus,
} from "@/types/withdrawal";

interface AdminFinanceOverviewProps {
  transactions: Array<{
    order: Order;
    customerName: string;
  }>;

  withdrawals: WithdrawalRequest[];

  merchantNames: Record<
    string,
    string
  >;
}

const WITHDRAWAL_METHOD_LABEL: Record<
  WithdrawalMethod,
  string
> = {
  CASH_ADMIN: "Cash melalui Admin",
  E_WALLET: "E-Wallet",
  BANK_TRANSFER: "Transfer Bank",
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

function getPaymentStatusClassName(
  status: PaymentStatus,
) {
  switch (status) {
    case "HELD":
      return "bg-amber-50 text-amber-700";

    case "RELEASED":
      return "bg-emerald-50 text-emerald-700";

    case "REFUNDED":
      return "bg-red-50 text-red-700";

    case "PAID":
      return "bg-blue-50 text-blue-700";

    case "UNPAID":
      return "bg-slate-100 text-slate-700";
  }
}

export function AdminFinanceOverview({
  transactions,
  withdrawals,
  merchantNames,
}: AdminFinanceOverviewProps) {
  const heldAmount =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus ===
          "HELD",
      )
      .reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

  const releasedAmount =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus ===
          "RELEASED",
      )
      .reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

  const refundedAmount =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus ===
          "REFUNDED",
      )
      .reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

  const completedWithdrawalAmount =
    withdrawals
      .filter(
        (withdrawal) =>
          withdrawal.status ===
          "COMPLETED",
      )
      .reduce(
        (total, withdrawal) =>
          total +
          withdrawal.amount,
        0,
      );

  const financeActivities =
    transactions
      .filter(
        ({ order }) =>
          order.paymentStatus !==
          "UNPAID",
      )
      .sort(
        (a, b) =>
          new Date(
            b.order.createdAt,
          ).getTime() -
          new Date(
            a.order.createdAt,
          ).getTime(),
      );

  const sortedWithdrawals = [
    ...withdrawals,
  ].sort(
    (a, b) =>
      new Date(
        b.createdAt,
      ).getTime() -
      new Date(
        a.createdAt,
      ).getTime(),
  );

  return (
    <>
      {}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Dana Tertahan"
          value={formatCurrency(
            heldAmount,
          )}
          description="Dana berstatus HELD"
          icon={Clock3}
        />

        <StatCard
          title="Dana Diteruskan"
          value={formatCurrency(
            releasedAmount,
          )}
          description="Dana berstatus RELEASED"
          icon={CircleDollarSign}
        />

        <StatCard
          title="Dana Dikembalikan"
          value={formatCurrency(
            refundedAmount,
          )}
          description="Dana berstatus REFUNDED"
          icon={RotateCcw}
        />

        <StatCard
          title="Withdrawal Selesai"
          value={formatCurrency(
            completedWithdrawalAmount,
          )}
          description="Dana pencairan selesai"
          icon={WalletCards}
        />
      </section>

      <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {}
        <section>
          <div>
            <h2 className="text-lg font-semibold">
              Monitoring Arus Dana
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pantau dana ditahan,
              diteruskan, dan
              dikembalikan dari transaksi
              SchoolCanteen.
            </p>
          </div>

          {financeActivities.length >
          0 ? (
            <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
              <div className="divide-y">
                {financeActivities.map(
                  ({
                    order,
                    customerName,
                  }) => {
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
                          order.createdAt,
                        ),
                      );

                    const ActivityIcon =
                      order.paymentStatus ===
                      "RELEASED"
                        ? ArrowDownToLine
                        : order.paymentStatus ===
                            "REFUNDED"
                          ? ArrowUpRight
                          : CreditCard;

                    return (
                      <article
                        key={order.id}
                        className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          <div
                            className={cn(
                              "flex size-11 shrink-0 items-center justify-center rounded-xl",

                              order.paymentStatus ===
                                "RELEASED" &&
                                "bg-emerald-50",

                              order.paymentStatus ===
                                "HELD" &&
                                "bg-amber-50",

                              order.paymentStatus ===
                                "REFUNDED" &&
                                "bg-red-50",

                              ![
                                "RELEASED",
                                "HELD",
                                "REFUNDED",
                              ].includes(
                                order.paymentStatus,
                              ) &&
                                "bg-muted",
                            )}
                          >
                            <ActivityIcon
                              className={cn(
                                "size-5",

                                order.paymentStatus ===
                                  "RELEASED" &&
                                  "text-emerald-700",

                                order.paymentStatus ===
                                  "HELD" &&
                                  "text-amber-700",

                                order.paymentStatus ===
                                  "REFUNDED" &&
                                  "text-destructive",
                              )}
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium">
                                {
                                  PAYMENT_STATUS_LABEL[
                                    order.paymentStatus
                                  ]
                                }
                              </p>

                              <span className="text-xs text-muted-foreground">
                                •
                              </span>

                              <span className="text-xs text-muted-foreground">
                                {
                                  order.orderCode
                                }
                              </span>
                            </div>

                            <p className="mt-1 truncate text-sm text-muted-foreground">
                              {customerName}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {formattedDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center justify-between gap-3 sm:block sm:text-right">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",

                              getPaymentStatusClassName(
                                order.paymentStatus,
                              ),
                            )}
                          >
                            {
                              PAYMENT_STATUS_LABEL[
                                order.paymentStatus
                              ]
                            }
                          </span>

                          <p className="mt-0 font-semibold sm:mt-2">
                            {formatCurrency(
                              order.totalPrice,
                            )}
                          </p>
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
                icon={History}
                title="Belum ada aktivitas keuangan"
                description="Arus dana transaksi akan tampil di sini."
              />
            </div>
          )}
        </section>

        {}
        <aside>
          <div>
            <h2 className="text-lg font-semibold">
              Monitoring Withdrawal
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pantau permintaan pencairan
              dana dari merchant.
            </p>
          </div>

          {sortedWithdrawals.length >
          0 ? (
            <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
              <div className="divide-y">
                {sortedWithdrawals.map(
                  (withdrawal) => {
                    const merchantName =
                      merchantNames[
                        withdrawal.merchantId
                      ] ??
                      "Merchant";

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
                              <p className="truncate font-semibold">
                                {merchantName}
                              </p>

                              <p className="mt-1 text-lg font-semibold">
                                {formatCurrency(
                                  withdrawal.amount,
                                )}
                              </p>
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

                        <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Metode
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {
                                WITHDRAWAL_METHOD_LABEL[
                                  withdrawal.method
                                ]
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Diajukan
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {formattedDate}
                            </p>
                          </div>
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
                title="Belum ada withdrawal"
                description="Permintaan pencairan merchant akan tampil di sini."
              />
            </div>
          )}
        </aside>
      </div>
    </>
  );
}