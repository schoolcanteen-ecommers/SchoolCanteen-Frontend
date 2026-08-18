export type AdminTransactionType =
  | "PAYMENT"
  | "TOP_UP"
  | "ADJUSTMENT";

export type AdminTransactionDirection =
  | "CREDIT"
  | "DEBIT";

export type AdminTransactionStatus =
  | "COMPLETED"
  | "PENDING"
  | "FAILED";

export interface AdminTransactionMerchant {
  id: string;
  name: string;
  type: string;
}

export interface AdminTransactionPayment {
  id: string;
  provider: string | null;
  providerOrderId: string | null;
  providerTransactionId: string | null;
  paymentType: string | null;
  status: string | null;
  grossAmount: number | null;
  paidAt: string | null;
  expiredAt: string | null;
}

export interface AdminTransactionData {
  id: string;
  student: {
    id: string;
    name: string;
  };
  merchant: AdminTransactionMerchant | null;
  type: AdminTransactionType;
  direction: AdminTransactionDirection;
  amount: number;
  status: AdminTransactionStatus;
  reference: {
    type: string | null;
    id: string | null;
  };
  description: string | null;
  payment: AdminTransactionPayment | null;
  createdAt: string | null;
}

export interface AdminTransactionFilters {
  page?: number;
  search?: string;
  type?: AdminTransactionType;
  status?: AdminTransactionStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface AdminTransactionsPageData {
  transactions: AdminTransactionData[];
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminTransactionStats {
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
  transactionValue: number;
}

export interface ApiAdminStudentTransaction {
  id: string;
  ledger: string;
  student: {
    id: string;
    name: string;
  };
  type: string;
  direction: string;
  amount: number;
  status: string;
  reference: {
    type: string | null;
    id: string | null;
  } | null;
  description: string | null;
  payment: {
    id: string;
    provider: string | null;
    provider_order_id: string | null;
    provider_transaction_id: string | null;
    payment_type: string | null;
    status: string | null;
    gross_amount: number | null;
    paid_at: string | null;
    expired_at: string | null;
  } | null;
  created_at: string | null;
}

export interface ApiAdminMerchantTransaction {
  id: string;
  ledger: string;
  merchant: {
    id: string;
    name: string;
    type: string;
  } | null;
  type: string;
  direction: string;
  amount: number;
  status: string;
  reference: {
    type: string | null;
    id: string | null;
  } | null;
  description: string | null;
  created_at: string | null;
}

export const ADMIN_TRANSACTION_PAGE_SIZE = 20;

export function buildAdminStudentTransactionQuery({
  page = 1,
  search,
  type,
  status,
  dateFrom,
  dateTo,
}: AdminTransactionFilters): string {
  const params = new URLSearchParams();

  params.set(
    "page",
    String(Math.max(1, page)),
  );

  if (search?.trim()) {
    params.set(
      "search",
      search.trim(),
    );
  }

  if (type) {
    params.set(
      "type",
      type === "TOP_UP"
        ? "topup"
        : type.toLowerCase(),
    );
  }

  if (status) {
    params.set(
      "status",
      status.toLowerCase(),
    );
  }

  if (dateFrom) {
    params.set(
      "date_from",
      dateFrom,
    );
  }

  if (dateTo) {
    params.set(
      "date_to",
      dateTo,
    );
  }

  return params.toString();
}

export function mapAdminStudentTransaction(
  transaction: ApiAdminStudentTransaction,
): AdminTransactionData {
  return {
    id: transaction.id,
    student: transaction.student,
    merchant: null,
    type: mapTransactionType(
      transaction.type,
    ),
    direction: mapTransactionDirection(
      transaction.direction,
    ),
    amount: transaction.amount,
    status: mapTransactionStatus(
      transaction.status,
    ),
    reference: {
      type:
        transaction.reference?.type ??
        null,
      id:
        transaction.reference?.id ??
        null,
    },
    description:
      transaction.description,
    payment: transaction.payment
      ? {
          id: transaction.payment.id,
          provider:
            transaction.payment.provider,
          providerOrderId:
            transaction.payment.provider_order_id,
          providerTransactionId:
            transaction.payment.provider_transaction_id,
          paymentType:
            transaction.payment.payment_type,
          status:
            transaction.payment.status,
          grossAmount:
            transaction.payment.gross_amount,
          paidAt:
            transaction.payment.paid_at,
          expiredAt:
            transaction.payment.expired_at,
        }
      : null,
    createdAt:
      transaction.created_at,
  };
}

export function buildMerchantOrderLookup(
  transactions: ApiAdminMerchantTransaction[],
): Map<string, AdminTransactionMerchant> {
  const lookup = new Map<
    string,
    AdminTransactionMerchant
  >();

  for (const transaction of transactions) {
    const referenceType =
      transaction.reference?.type
        ?.trim()
        .toLowerCase();
    const referenceId =
      transaction.reference?.id;

    if (
      referenceType !== "order" ||
      !referenceId ||
      !transaction.merchant ||
      lookup.has(referenceId)
    ) {
      continue;
    }

    lookup.set(
      referenceId,
      transaction.merchant,
    );
  }

  return lookup;
}

export function enrichAdminTransactionMerchant(
  transaction: AdminTransactionData,
  merchantLookup: Map<
    string,
    AdminTransactionMerchant
  >,
): AdminTransactionData {
  if (
    transaction.type !== "PAYMENT" ||
    transaction.reference.type
      ?.trim()
      .toLowerCase() !== "order" ||
    !transaction.reference.id
  ) {
    return transaction;
  }

  return {
    ...transaction,
    merchant:
      merchantLookup.get(
        transaction.reference.id,
      ) ?? null,
  };
}

function mapTransactionType(
  value: string,
): AdminTransactionType {
  switch (
    value
      .trim()
      .toLowerCase()
      .replace(/-/g, "_")
  ) {
    case "payment":
      return "PAYMENT";

    case "topup":
    case "top_up":
      return "TOP_UP";

    case "adjustment":
      return "ADJUSTMENT";

    default:
      throw new Error(
        `Tipe transaksi admin tidak dikenali: ${value}`,
      );
  }
}

function mapTransactionDirection(
  value: string,
): AdminTransactionDirection {
  switch (
    value.trim().toLowerCase()
  ) {
    case "credit":
      return "CREDIT";

    case "debit":
      return "DEBIT";

    default:
      throw new Error(
        `Arah transaksi admin tidak dikenali: ${value}`,
      );
  }
}

function mapTransactionStatus(
  value: string,
): AdminTransactionStatus {
  switch (
    value.trim().toLowerCase()
  ) {
    case "completed":
      return "COMPLETED";

    case "pending":
      return "PENDING";

    case "failed":
      return "FAILED";

    default:
      throw new Error(
        `Status transaksi admin tidak dikenali: ${value}`,
      );
  }
}
