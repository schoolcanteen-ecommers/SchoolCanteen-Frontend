import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import {
  ADMIN_TRANSACTION_PAGE_SIZE,
  buildAdminStudentTransactionQuery,
  buildMerchantOrderLookup,
  enrichAdminTransactionMerchant,
  mapAdminStudentTransaction,
} from "@/lib/api/admin-transaction-shared";

import type {
  AdminTransactionData,
  AdminTransactionFilters,
  AdminTransactionStats,
  AdminTransactionsPageData,
  ApiAdminMerchantTransaction,
  ApiAdminStudentTransaction,
} from "@/lib/api/admin-transaction-shared";

async function getAdminStudentTransactionApiPage(
  filters: AdminTransactionFilters,
): Promise<ApiAdminStudentTransaction[]> {
  const query =
    buildAdminStudentTransactionQuery(
      filters,
    );

  return authenticatedServerApiRequest<
    ApiAdminStudentTransaction[]
  >(
    `/admin/transactions/student?${query}`,
  );
}

async function getAdminMerchantTransactionApiPage(
  page: number,
): Promise<ApiAdminMerchantTransaction[]> {
  return authenticatedServerApiRequest<
    ApiAdminMerchantTransaction[]
  >(
    `/admin/transactions/merchant?page=${Math.max(1, page)}`,
  );
}

async function getAdminMerchantOrderLookup() {
  const transactions: ApiAdminMerchantTransaction[] = [];

  for (let page = 1; ; page += 1) {
    const currentPage =
      await getAdminMerchantTransactionApiPage(
        page,
      );

    transactions.push(...currentPage);

    if (
      currentPage.length <
      ADMIN_TRANSACTION_PAGE_SIZE
    ) {
      break;
    }
  }

  return buildMerchantOrderLookup(
    transactions,
  );
}

export async function getAdminTransactionsPage(
  filters: AdminTransactionFilters = {},
): Promise<AdminTransactionsPageData> {
  const page = Math.max(
    1,
    filters.page ?? 1,
  );

  const currentPagePromise =
    getAdminStudentTransactionApiPage({
      ...filters,
      page,
    });

  const merchantLookupPromise =
    getAdminMerchantOrderLookup();

  const [
    currentPage,
    merchantLookup,
  ] = await Promise.all([
    currentPagePromise,
    merchantLookupPromise,
  ]);

  let hasNextPage = false;

  if (
    currentPage.length ===
    ADMIN_TRANSACTION_PAGE_SIZE
  ) {
    const nextPage =
      await getAdminStudentTransactionApiPage({
        ...filters,
        page: page + 1,
      });

    hasNextPage =
      nextPage.length > 0;
  }

  return {
    transactions: currentPage
      .map(mapAdminStudentTransaction)
      .map((transaction) =>
        enrichAdminTransactionMerchant(
          transaction,
          merchantLookup,
        ),
      ),
    page,
    hasPreviousPage: page > 1,
    hasNextPage,
  };
}

export async function getAdminTransactionStats(): Promise<AdminTransactionStats> {
  let page = 1;
  let totalTransactions = 0;
  let completedTransactions = 0;
  let pendingTransactions = 0;
  let transactionValue = 0;

  for (;;) {
    const currentPage =
      await getAdminStudentTransactionApiPage({
        page,
      });

    for (const rawTransaction of currentPage) {
      const transaction =
        mapAdminStudentTransaction(
          rawTransaction,
        );

      totalTransactions += 1;

      if (
        transaction.status ===
        "COMPLETED"
      ) {
        completedTransactions += 1;
      }

      if (
        transaction.status ===
        "PENDING"
      ) {
        pendingTransactions += 1;
      }

      if (
        transaction.type ===
          "PAYMENT" ||
        transaction.type ===
          "TOP_UP"
      ) {
        transactionValue +=
          transaction.amount;
      }
    }

    if (
      currentPage.length <
      ADMIN_TRANSACTION_PAGE_SIZE
    ) {
      break;
    }

    page += 1;
  }

  return {
    totalTransactions,
    completedTransactions,
    pendingTransactions,
    transactionValue,
  };
}

export async function getAdminTransactionDetail(
  transactionId: string,
): Promise<AdminTransactionData> {
  const [
    rawTransaction,
    merchantLookup,
  ] = await Promise.all([
    authenticatedServerApiRequest<
      ApiAdminStudentTransaction
    >(
      `/admin/transactions/student/${transactionId}`,
    ),
    getAdminMerchantOrderLookup(),
  ]);

  return enrichAdminTransactionMerchant(
    mapAdminStudentTransaction(
      rawTransaction,
    ),
    merchantLookup,
  );
}
