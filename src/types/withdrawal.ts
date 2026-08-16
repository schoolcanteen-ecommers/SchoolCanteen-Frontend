export type WithdrawalMethod =
  | "CASH_ADMIN"
  | "E_WALLET"
  | "BANK_TRANSFER";

export type WithdrawalStatus =
  | "WAITING_APPROVAL"
  | "APPROVED"
  | "PROCESSED"
  | "COMPLETED"
  | "REJECTED";

export interface MerchantPaymentAccount {
  id: string;

  type: string;
  provider: string;

  accountNumber: string;
  accountName: string;

  isDefault: boolean;
  isActive: boolean;

  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface WithdrawalRequest {
  id: string;

  merchantId: string;

  amount: number;

  method: WithdrawalMethod;
  status: WithdrawalStatus;

  notes?: string | null;

  paymentAccount?:
    | MerchantPaymentAccount
    | null;

  createdAt: string;

  completedAt?: string | null;
}