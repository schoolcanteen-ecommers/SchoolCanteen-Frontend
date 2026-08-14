import {
  ArrowDownToLine,
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  History,
  Landmark,
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
  OrderItem,
  PaymentStatus,
} from "@/types/order";

import type {
  WithdrawalMethod,
  WithdrawalRequest,
  WithdrawalStatus,
} from "@/types/withdrawal";

interface MerchantFinanceOverviewProps {
  orders: Array<{
    order: Order;
    customerName: string;
    items: OrderItem[];
  }>;

  withdrawals: WithdrawalRequest[];
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

function getPaymentAmountClassName(
  status: PaymentStatus,
) {
  if (status === "RELEASED") {
    return "text-emerald-700";
  }

  if (status === "REFUNDED") {
    return "text-destructive";
  }

  if (status === "HELD") {
    return "text-amber-700";
  }

  return "text-foreground";
}

function getPaymentPrefix(
  status: PaymentStatus,
) {
  if (status === "RELEASED") {
    return "+";
  }

  if (status === "REFUNDED") {
    return "-";
  }

  return "";
}

export function MerchantFinanceOverview({
  orders,
  withdrawals,
}: MerchantFinanceOverviewProps) {
    const pendingBalance =
    orders
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

    const releasedIncome =
    orders
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

    const completedWithdrawals =
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

  const availableBalance =
    Math.max(
      releasedIncome -
        completedWithdrawals,
      0,
    );

    const financeActivities =
    orders
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

  return (
    <>
      {}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Saldo Tersedia"
          value={formatCurrency(
            availableBalance,
          )}
          description="Dana yang dapat dicairkan"
          icon={WalletCards}
        />

        <StatCard
          title="Dana Tertahan"
          value={formatCurrency(
            pendingBalance,
          )}
          description="Dana dari pesanan aktif"
          icon={Clock3}
        />

        <StatCard
          title="Total Pendapatan"
          value={formatCurrency(
            releasedIncome,
          )}
          description="Dana yang sudah diteruskan"
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
              Pergerakan dana berdasarkan
              pembayaran pesanan merchant.
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

                    return (
                      <article
                        key={order.id}
                        className="flex items-center gap-4 px-5 py-4 sm:px-6"
                      >
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
                          {order.paymentStatus ===
                          "RELEASED" ? (
                            <ArrowDownToLine className="size-5 text-emerald-700" />
                          ) : order.paymentStatus ===
                            "REFUNDED" ? (
                            <ArrowUpRight className="size-5 text-destructive" />
                          ) : (
                            <CreditCard className="size-5 text-amber-700" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
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

                        <p
                          className={cn(
                            "shrink-0 font-semibold",

                            getPaymentAmountClassName(
                              order.paymentStatus,
                            ),
                          )}
                        >
                          {getPaymentPrefix(
                            order.paymentStatus,
                          )}
                          {formatCurrency(
                            order.totalPrice,
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
                description="Pergerakan dana dari transaksi pesanan akan tampil di sini."
              />
            </div>
          )}
        </section>

        {}
        <aside>
          <div>
            <h2 className="text-lg font-semibold">
              Riwayat Pencairan
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Riwayat permintaan pencairan
              dana merchant.
            </p>
          </div>

          {withdrawals.length > 0 ? (
            <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
              <div className="divide-y">
                {withdrawals.map(
                  (withdrawal) => {
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
                                    withdrawal.method
                                  ]
                                }
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

                        <div className="mt-4 border-t pt-3">
                          <p className="text-xs text-muted-foreground">
                            Diajukan
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            {formattedDate}
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
                icon={Landmark}
                title="Belum ada pencairan"
                description="Riwayat pencairan dana merchant akan tampil di sini."
              />
            </div>
          )}
        </aside>
      </div>
    </>
  );
}