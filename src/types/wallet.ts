export type WalletTransactionType =
  | "TOP_UP"
  | "PAYMENT"
  | "REFUND"
  | "ADJUSTMENT";

export type WalletTransactionDirection =
  | "CREDIT"
  | "DEBIT";

export type WalletTransactionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED";

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
}

export interface WalletTransaction {
  id: string;
  walletId: string;

  type: WalletTransactionType;
  direction: WalletTransactionDirection;

  amount: number;
  status: WalletTransactionStatus;

  description?: string | null;

  referenceId?: string | null;

  createdAt: string;
}