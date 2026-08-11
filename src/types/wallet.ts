export type WalletTransactionType =
  | "TOP_UP"
  | "PAYMENT"
  | "REFUND";

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

  amount: number;
  status: WalletTransactionStatus;

  referenceId?: string | null;

  createdAt: string;
}