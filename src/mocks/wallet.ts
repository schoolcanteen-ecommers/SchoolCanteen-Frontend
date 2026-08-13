import type {
  Wallet,
  WalletTransaction,
} from "@/types/wallet";

export const studentWallet = {
  id: "preview-student-wallet",
  userId: "preview-student",
  balance: 75000,
} satisfies Wallet;

export const studentWalletTransactions = [
  {
    id: "wallet-transaction-001",
    walletId: studentWallet.id,

    type: "TOP_UP",

    amount: 100000,
    status: "SUCCESS",

    referenceId: "TOPUP-001",

    createdAt: "2026-08-10T07:30:00+07:00",
  },

  {
    id: "wallet-transaction-002",
    walletId: studentWallet.id,

    type: "PAYMENT",

    amount: 19000,
    status: "SUCCESS",

    referenceId: "order-001",

    createdAt: "2026-08-10T09:15:00+07:00",
  },

  {
    id: "wallet-transaction-003",
    walletId: studentWallet.id,

    type: "PAYMENT",

    amount: 16000,
    status: "SUCCESS",

    referenceId: "order-002",

    createdAt: "2026-08-10T08:30:00+07:00",
  },

  {
    id: "wallet-transaction-004",
    walletId: studentWallet.id,

    type: "REFUND",

    amount: 10000,
    status: "SUCCESS",

    referenceId: "order-004",

    createdAt: "2026-08-08T11:00:00+07:00",
  },
] satisfies WalletTransaction[];