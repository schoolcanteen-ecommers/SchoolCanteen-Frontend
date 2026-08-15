import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import type {
  WalletTransaction,
  WalletTransactionDirection,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/types/wallet";

interface ApiStudentWallet {
  id: string;

  balance: number;
  is_active: boolean;

  updated_at: string | null;
}

interface ApiWalletTransaction {
  id: string;

  type: string;
  direction: string;

  amount: number;
  status: string;

  description: string | null;

  reference: {
    type: string | null;
    id: string | null;
  };

  created_at: string | null;
}

export interface StudentWalletData {
  id: string;

  balance: number;
  isActive: boolean;

  updatedAt: string | null;
}

function mapTransactionType(
  value: string,
): WalletTransactionType {
  const normalized =
    value
      .trim()
      .toLowerCase()
      .replace(/-/g, "_");

  switch (normalized) {
    case "topup":
    case "top_up":
      return "TOP_UP";

    case "payment":
      return "PAYMENT";

    case "refund":
      return "REFUND";

    case "adjustment":
      return "ADJUSTMENT";

    default:
      throw new Error(
        `Tipe transaksi wallet tidak dikenali: ${value}`,
      );
  }
}

function mapTransactionDirection(
  value: string,
): WalletTransactionDirection {
  switch (
    value
      .trim()
      .toLowerCase()
  ) {
    case "credit":
      return "CREDIT";

    case "debit":
      return "DEBIT";

    default:
      throw new Error(
        `Arah transaksi wallet tidak dikenali: ${value}`,
      );
  }
}

function mapTransactionStatus(
  value: string,
): WalletTransactionStatus {
  switch (
    value
      .trim()
      .toLowerCase()
  ) {
    case "pending":
      return "PENDING";

    case "completed":
    case "success":
      return "SUCCESS";

    case "failed":
    case "failure":
    case "cancelled":
    case "canceled":
    case "expired":
      return "FAILED";

    default:
      throw new Error(
        `Status transaksi wallet tidak dikenali: ${value}`,
      );
  }
}

function mapWalletTransaction(
  transaction: ApiWalletTransaction,
  walletId: string,
): WalletTransaction {
  if (!transaction.created_at) {
    throw new Error(
      `Tanggal transaksi wallet ${transaction.id} tidak tersedia.`,
    );
  }

  return {
    id: transaction.id,

    walletId,

    type:
      mapTransactionType(
        transaction.type,
      ),

    direction:
      mapTransactionDirection(
        transaction.direction,
      ),

    amount:
      transaction.amount,

    status:
      mapTransactionStatus(
        transaction.status,
      ),

    description:
      transaction.description,

    referenceId:
      transaction.reference?.id ??
      null,

    createdAt:
      transaction.created_at,
  };
}

export async function getStudentWallet(): Promise<StudentWalletData> {
  const wallet =
    await authenticatedServerApiRequest<ApiStudentWallet>(
      "/student/wallet",
    );

  return {
    id: wallet.id,

    balance: wallet.balance,
    isActive: wallet.is_active,

    updatedAt:
      wallet.updated_at,
  };
}

export async function getStudentWalletTransactions(
  walletId: string,
): Promise<WalletTransaction[]> {
  const transactions: WalletTransaction[] =
    [];

  const pageSize = 20;

  for (
    let page = 1;
    ;
    page += 1
  ) {
    const apiTransactions =
      await authenticatedServerApiRequest<
        ApiWalletTransaction[]
      >(
        `/student/wallet/transactions?page=${page}`,
      );

    transactions.push(
      ...apiTransactions.map(
        (transaction) =>
          mapWalletTransaction(
            transaction,
            walletId,
          ),
      ),
    );

    if (
      apiTransactions.length <
      pageSize
    ) {
      break;
    }
  }

  return transactions;
}

export async function getStudentWalletOverview() {
  const wallet =
    await getStudentWallet();

  const transactions =
    await getStudentWalletTransactions(
      wallet.id,
    );

  return {
    wallet,
    transactions,
  };
}