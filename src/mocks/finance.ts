import type {
  WithdrawalRequest,
} from "@/types/withdrawal";

export function getMerchantWithdrawalPreview(
  merchantId: string,
) {
  return [
    {
      id: "withdrawal-001",

      merchantId,

      amount: 10000,

      method: "E_WALLET",
      status: "COMPLETED",

      createdAt:
        "2026-08-09T10:00:00+07:00",

      completedAt:
        "2026-08-09T10:30:00+07:00",
    },

    {
      id: "withdrawal-002",

      merchantId,

      amount: 5000,

      method: "CASH_ADMIN",
      status: "WAITING_APPROVAL",

      createdAt:
        "2026-08-11T08:00:00+07:00",

      completedAt: null,
    },

    {
      id: "withdrawal-003",

      merchantId,

      amount: 25000,

      method: "BANK_TRANSFER",
      status: "REJECTED",

      createdAt:
        "2026-08-07T09:15:00+07:00",

      completedAt: null,
    },
  ] satisfies WithdrawalRequest[];
}