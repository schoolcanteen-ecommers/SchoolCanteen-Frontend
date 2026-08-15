import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

export interface StudentTopUpData {
  id: string;

  providerOrderId: string;

  amount: number;
  status: string;

  snapToken: string | null;
  redirectUrl: string | null;
}

interface ApiStudentTopUp {
  id: string;

  provider_order_id: string;

  amount: number;
  status: string;

  snap_token: string | null;
  redirect_url: string | null;
}

interface ApiWalletTransaction {
  id: string;

  type: string;
  direction: string;

  amount: number;
  status: string;

  reference: {
    type: string | null;
    id: string | null;
  };

  created_at: string | null;
}

export type TopUpSettlementStatus =
  | "COMPLETED"
  | "FAILED"
  | "PENDING";

export async function createStudentTopUp(
  amount: number,
): Promise<StudentTopUpData> {
  const data =
    await authenticatedApiRequest<ApiStudentTopUp>(
      "/student/wallet/top-ups",
      {
        method: "POST",

        body: {
          amount,
        },
      },
    );

  return {
    id:
      data.id,

    providerOrderId:
      data.provider_order_id,

    amount:
      data.amount,

    status:
      data.status,

    snapToken:
      data.snap_token,

    redirectUrl:
      data.redirect_url,
  };
}

async function getTopUpSettlementStatus(
  paymentTransactionId: string,
): Promise<TopUpSettlementStatus> {
  const transactions =
    await authenticatedApiRequest<
      ApiWalletTransaction[]
    >(
      "/student/wallet/transactions?page=1",
    );

  const transaction =
    transactions.find(
      (item) =>
        item.reference?.type ===
          "topup" &&
        item.reference?.id ===
          paymentTransactionId,
    );

  if (!transaction) {
    return "PENDING";
  }

  const status =
    transaction.status
      .trim()
      .toLowerCase();

  if (
    status === "completed" ||
    status === "success"
  ) {
    return "COMPLETED";
  }

  if (
    status === "failed" ||
    status === "expired" ||
    status === "cancelled" ||
    status === "canceled"
  ) {
    return "FAILED";
  }

  return "PENDING";
}

function delay(
  milliseconds: number,
) {
  return new Promise<void>(
    (resolve) => {
      window.setTimeout(
        resolve,
        milliseconds,
      );
    },
  );
}

export async function waitForTopUpSettlement(
  paymentTransactionId: string,
): Promise<TopUpSettlementStatus> {
  const maxAttempts = 8;

  for (
    let attempt = 0;
    attempt < maxAttempts;
    attempt += 1
  ) {
    const status =
      await getTopUpSettlementStatus(
        paymentTransactionId,
      );

    if (
      status !== "PENDING"
    ) {
      return status;
    }

    await delay(1500);
  }

  return "PENDING";
}