"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  Banknote,
  Landmark,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

import {
  formatCurrency,
} from "@/lib/utils";

import type {
  MerchantPaymentAccount,
  WithdrawalMethod,
} from "@/types/withdrawal";

interface MerchantWithdrawalFormProps {
  availableBalance: number;

  walletIsActive: boolean;

  paymentAccounts:
    MerchantPaymentAccount[];
}

function getBackendMethod(
  method: WithdrawalMethod,
) {
  switch (method) {
    case "CASH_ADMIN":
      return "cash";

    case "BANK_TRANSFER":
      return "bank";

    case "E_WALLET":
      return "e_wallet";
  }
}

function getAccountType(
  method: WithdrawalMethod,
) {
  switch (method) {
    case "BANK_TRANSFER":
      return "bank";

    case "E_WALLET":
      return "e_wallet";

    default:
      return null;
  }
}

function getAccountLabel(
  account: MerchantPaymentAccount,
) {
  return `${account.provider} • ${account.accountNumber} • ${account.accountName}`;
}

export function MerchantWithdrawalForm({
  availableBalance,
  walletIsActive,
  paymentAccounts,
}: MerchantWithdrawalFormProps) {
  const router =
    useRouter();

  const [
    method,
    setMethod,
  ] =
    useState<WithdrawalMethod>(
      "CASH_ADMIN",
    );

  const [
    amount,
    setAmount,
  ] =
    useState("");

  const [
    paymentAccountId,
    setPaymentAccountId,
  ] =
    useState("");

  const [
    notes,
    setNotes,
  ] =
    useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    success,
    setSuccess,
  ] =
    useState<string | null>(
      null,
    );

  const selectedAccountType =
    getAccountType(
      method,
    );

  const matchingAccounts =
    selectedAccountType
      ? paymentAccounts.filter(
          (account) =>
            account.type ===
              selectedAccountType &&
            account.isActive,
        )
      : [];

  const bankAccounts =
    paymentAccounts.filter(
      (account) =>
        account.type ===
          "bank" &&
        account.isActive,
    );

  const eWalletAccounts =
    paymentAccounts.filter(
      (account) =>
        account.type ===
          "e_wallet" &&
        account.isActive,
    );

  function changeMethod(
    nextMethod: WithdrawalMethod,
  ) {
    setMethod(
      nextMethod,
    );

    setError(
      null,
    );

    setSuccess(
      null,
    );

    const accountType =
      getAccountType(
        nextMethod,
      );

    if (!accountType) {
      setPaymentAccountId(
        "",
      );

      return;
    }

    const accounts =
      paymentAccounts.filter(
        (account) =>
          account.type ===
            accountType &&
          account.isActive,
      );

    const defaultAccount =
      accounts.find(
        (account) =>
          account.isDefault,
      ) ??
      accounts[0];

    setPaymentAccountId(
      defaultAccount?.id ??
        "",
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError(
      null,
    );

    setSuccess(
      null,
    );

    const parsedAmount =
      Number(amount);

    if (
      !Number.isInteger(
        parsedAmount,
      ) ||
      parsedAmount <= 0
    ) {
      setError(
        "Jumlah penarikan harus lebih dari 0.",
      );

      return;
    }

    if (
      parsedAmount >
      availableBalance
    ) {
      setError(
        "Saldo tersedia tidak mencukupi.",
      );

      return;
    }

    if (
      method !==
        "CASH_ADMIN" &&
      !paymentAccountId
    ) {
      setError(
        "Akun pembayaran wajib dipilih.",
      );

      return;
    }

    setIsSubmitting(
      true,
    );

    try {
      await authenticatedApiRequest<unknown>(
        "/merchant/withdrawals",
        {
          method: "POST",

          body: {
            amount:
              parsedAmount,

            method:
              getBackendMethod(
                method,
              ),

            ...(method !==
            "CASH_ADMIN"
              ? {
                  payment_account_id:
                    paymentAccountId,
                }
              : {}),

            ...(notes.trim()
              ? {
                  notes:
                    notes.trim(),
                }
              : {}),
          },
        },
      );

      setAmount(
        "",
      );

      setNotes(
        "",
      );

      setSuccess(
        "Pengajuan penarikan berhasil dibuat.",
      );

      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Pengajuan penarikan gagal dibuat.",
      );
    } finally {
      setIsSubmitting(
        false,
      );
    }
  }

  const submitDisabled =
    isSubmitting ||
    !walletIsActive ||
    availableBalance <= 0;

  return (
    <div className="rounded-2xl border bg-background p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Banknote className="size-5 text-primary" />
        </div>

        <div>
          <h3 className="font-semibold">
            Ajukan Pencairan
          </h3>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Cairkan saldo tersedia
            merchant melalui admin,
            transfer bank, atau
            e-wallet.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-muted/40 p-4">
        <p className="text-xs text-muted-foreground">
          Saldo dapat dicairkan
        </p>

        <p className="mt-1 text-xl font-semibold">
          {formatCurrency(
            availableBalance,
          )}
        </p>
      </div>

      <form
        className="mt-5 space-y-4"
        onSubmit={
          handleSubmit
        }
      >
        <div>
          <label
            htmlFor="withdrawal-amount"
            className="text-sm font-medium"
          >
            Jumlah Penarikan
          </label>

          <input
            id="withdrawal-amount"
            type="number"
            min={1}
            max={
              availableBalance
            }
            step={1}
            inputMode="numeric"
            value={
              amount
            }
            onChange={(
              event,
            ) =>
              setAmount(
                event.target
                  .value,
              )
            }
            placeholder="Contoh: 50000"
            className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="withdrawal-method"
            className="text-sm font-medium"
          >
            Metode
          </label>

          <select
            id="withdrawal-method"
            value={
              method
            }
            onChange={(
              event,
            ) =>
              changeMethod(
                event.target
                  .value as WithdrawalMethod,
              )
            }
            className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary"
          >
            <option value="CASH_ADMIN">
              Cash melalui Admin
            </option>

            <option
              value="BANK_TRANSFER"
              disabled={
                bankAccounts.length ===
                0
              }
            >
              Transfer Bank
            </option>

            <option
              value="E_WALLET"
              disabled={
                eWalletAccounts.length ===
                0
              }
            >
              E-Wallet
            </option>
          </select>
        </div>

        {method !==
          "CASH_ADMIN" && (
          <div>
            <label
              htmlFor="payment-account"
              className="text-sm font-medium"
            >
              Akun Pembayaran
            </label>

            <select
              id="payment-account"
              value={
                paymentAccountId
              }
              onChange={(
                event,
              ) =>
                setPaymentAccountId(
                  event.target
                    .value,
                )
              }
              className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary"
            >
              <option value="">
                Pilih akun pembayaran
              </option>

              {matchingAccounts.map(
                (
                  account,
                ) => (
                  <option
                    key={
                      account.id
                    }
                    value={
                      account.id
                    }
                  >
                    {getAccountLabel(
                      account,
                    )}
                  </option>
                ),
              )}
            </select>
          </div>
        )}

        <div>
          <label
            htmlFor="withdrawal-notes"
            className="text-sm font-medium"
          >
            Catatan
          </label>

          <textarea
            id="withdrawal-notes"
            value={
              notes
            }
            maxLength={
              500
            }
            rows={3}
            onChange={(
              event,
            ) =>
              setNotes(
                event.target
                  .value,
              )
            }
            placeholder="Catatan tambahan (opsional)"
            className="mt-2 w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
          />
        </div>

        {!walletIsActive && (
          <div className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
            Wallet merchant
            sedang tidak aktif.
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700">
            {success}
          </div>
        )}

        {bankAccounts.length ===
          0 &&
          eWalletAccounts.length ===
            0 && (
            <div className="flex items-start gap-2 rounded-xl bg-muted/40 px-3 py-2.5 text-xs leading-5 text-muted-foreground">
              <Landmark className="mt-0.5 size-4 shrink-0" />

              <span>
                Belum ada akun
                pembayaran digital
                aktif. Pencairan cash
                melalui admin tetap
                tersedia.
              </span>
            </div>
          )}

        <Button
          type="submit"
          className="w-full"
          disabled={
            submitDisabled
          }
        >
          {isSubmitting
            ? "Mengajukan..."
            : "Ajukan Pencairan"}
        </Button>
      </form>
    </div>
  );
}