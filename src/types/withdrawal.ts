export type WithdrawalMethod =
  | "CASH_ADMIN"
  | "E_WALLET"
  | "BANK_TRANSFER";

export type WithdrawalStatus =
  | "WAITING_APPROVAL"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "REJECTED";

export interface WithdrawalRequest {
  id: string;

  merchantId: string;

  amount: number;

  method: WithdrawalMethod;
  status: WithdrawalStatus;

  createdAt: string;
  completedAt?: string | null;
}