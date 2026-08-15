import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import type {
  MerchantPaymentAccount,
  WithdrawalMethod,
  WithdrawalRequest,
  WithdrawalStatus,
} from "@/types/withdrawal";

export type MerchantWalletTransactionDirection =
  | "CREDIT"
  | "DEBIT";

export interface MerchantWalletData {
  id: string;

  merchantId: string;
  merchantName: string;
  merchantType: string;

  pendingBalance: number;
  availableBalance: number;
  totalBalance: number;

  isActive: boolean;

  updatedAt: string | null;
}

export interface MerchantWalletTransactionData {
  id: string;

  type: string;

  direction:
    MerchantWalletTransactionDirection;

  amount: number;

  status: string;

  description: string | null;

  reference: {
    type: string | null;
    id: string | null;
  };

  createdAt: string | null;
}

interface ApiMerchantWallet {
  id: string;

  merchant: {
    id: string;
    name: string;
    type: string;
  };

  pending_balance: number;
  available_balance: number;
  total_balance: number;

  is_active: boolean;

  updated_at: string | null;
}

interface ApiMerchantWalletTransaction {
  id: string;

  type: string;
  direction: string;

  amount: number;

  status: string;

  reference: {
    type: string | null;
    id: string | null;
  };

  description: string | null;

  created_at: string | null;
}

interface ApiMerchantPaymentAccount {
  id: string;

  type: string;
  provider: string;

  account_number: string;
  account_name: string;

  is_default: boolean;
  is_active: boolean;

  created_at: string | null;
  updated_at: string | null;
}

interface ApiWithdrawal {
  id: string;

  amount: number;

  method: string;
  status: string;

  notes: string | null;

  payment_account:
    | ApiMerchantPaymentAccount
    | null;

  timeline: {
    approved_at: string | null;
    processed_at: string | null;
    completed_at: string | null;
    rejected_at: string | null;
  };

  created_at: string;
  updated_at: string | null;
}

function mapTransactionDirection(
  direction: string,
): MerchantWalletTransactionDirection {
  switch (
    direction
      .trim()
      .toLowerCase()
  ) {
    case "credit":
      return "CREDIT";

    case "debit":
      return "DEBIT";

    default:
      throw new Error(
        `Arah transaksi merchant wallet tidak dikenali: ${direction}`,
      );
  }
}

function mapWithdrawalMethod(
  method: string,
): WithdrawalMethod {
  switch (
    method
      .trim()
      .toLowerCase()
  ) {
    case "cash":
      return "CASH_ADMIN";

    case "bank":
      return "BANK_TRANSFER";

    case "e_wallet":
      return "E_WALLET";

    default:
      throw new Error(
        `Metode withdrawal tidak dikenali: ${method}`,
      );
  }
}

function mapWithdrawalStatus(
  status: string,
): WithdrawalStatus {
  switch (
    status
      .trim()
      .toLowerCase()
  ) {
    case "waiting":
      return "WAITING_APPROVAL";

    case "approved":
      return "APPROVED";

    case "processing":
      return "PROCESSING";

    case "completed":
      return "COMPLETED";

    case "rejected":
      return "REJECTED";

    default:
      throw new Error(
        `Status withdrawal tidak dikenali: ${status}`,
      );
  }
}

function mapPaymentAccount(
  account: ApiMerchantPaymentAccount,
): MerchantPaymentAccount {
  return {
    id:
      account.id,

    type:
      account.type,

    provider:
      account.provider,

    accountNumber:
      account.account_number,

    accountName:
      account.account_name,

    isDefault:
      account.is_default,

    isActive:
      account.is_active,

    createdAt:
      account.created_at,

    updatedAt:
      account.updated_at,
  };
}

function mapWithdrawal(
  withdrawal: ApiWithdrawal,
  merchantId: string,
): WithdrawalRequest {
  return {
    id:
      withdrawal.id,

    merchantId,

    amount:
      withdrawal.amount,

    method:
      mapWithdrawalMethod(
        withdrawal.method,
      ),

    status:
      mapWithdrawalStatus(
        withdrawal.status,
      ),

    notes:
      withdrawal.notes,

    paymentAccount:
      withdrawal.payment_account
        ? mapPaymentAccount(
            withdrawal.payment_account,
          )
        : null,

    createdAt:
      withdrawal.created_at,

    completedAt:
      withdrawal.timeline
        .completed_at,
  };
}

export async function getMerchantWallet(): Promise<MerchantWalletData> {
  const wallet =
    await authenticatedServerApiRequest<ApiMerchantWallet>(
      "/merchant/wallet",
      {
        cache: "no-store",
      },
    );

  return {
    id:
      wallet.id,

    merchantId:
      wallet.merchant.id,

    merchantName:
      wallet.merchant.name,

    merchantType:
      wallet.merchant.type,

    pendingBalance:
      wallet.pending_balance,

    availableBalance:
      wallet.available_balance,

    totalBalance:
      wallet.total_balance,

    isActive:
      wallet.is_active,

    updatedAt:
      wallet.updated_at,
  };
}

export async function getMerchantWalletTransactions(): Promise<
  MerchantWalletTransactionData[]
> {
  const transactions =
    await authenticatedServerApiRequest<
      ApiMerchantWalletTransaction[]
    >(
      "/merchant/wallet/transactions",
      {
        cache: "no-store",
      },
    );

  return transactions.map(
    (transaction) => ({
      id:
        transaction.id,

      type:
        transaction.type,

      direction:
        mapTransactionDirection(
          transaction.direction,
        ),

      amount:
        transaction.amount,

      status:
        transaction.status,

      description:
        transaction.description,

      reference:
        transaction.reference,

      createdAt:
        transaction.created_at,
    }),
  );
}

export async function getMerchantPaymentAccounts(): Promise<
  MerchantPaymentAccount[]
> {
  const accounts =
    await authenticatedServerApiRequest<
      ApiMerchantPaymentAccount[]
    >(
      "/merchant/payment-accounts",
      {
        cache: "no-store",
      },
    );

  return accounts.map(
    mapPaymentAccount,
  );
}

export async function getMerchantWithdrawals(
  merchantId: string,
): Promise<WithdrawalRequest[]> {
  const withdrawals =
    await authenticatedServerApiRequest<
      ApiWithdrawal[]
    >(
      "/merchant/withdrawals",
      {
        cache: "no-store",
      },
    );

  return withdrawals.map(
    (withdrawal) =>
      mapWithdrawal(
        withdrawal,
        merchantId,
      ),
  );
}

export async function getMerchantFinanceData() {
  const wallet =
    await getMerchantWallet();

  const [
    transactions,
    withdrawals,
    paymentAccounts,
  ] =
    await Promise.all([
      getMerchantWalletTransactions(),

      getMerchantWithdrawals(
        wallet.merchantId,
      ),

      getMerchantPaymentAccounts(),
    ]);

  return {
    wallet,
    transactions,
    withdrawals,
    paymentAccounts,
  };
}