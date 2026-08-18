import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

import {
  ADMIN_TRANSACTION_PAGE_SIZE,
  buildAdminStudentTransactionQuery,
  buildMerchantOrderLookup,
  enrichAdminTransactionMerchant,
  mapAdminStudentTransaction,
} from "@/lib/api/admin-transaction-shared";

import type {
  AdminTransactionFilters,
  AdminTransactionsPageData,
  ApiAdminMerchantTransaction,
  ApiAdminStudentTransaction,
} from "@/lib/api/admin-transaction-shared";

async function getStudentPage(
  filters: AdminTransactionFilters,
): Promise<ApiAdminStudentTransaction[]> {
  const query =
    buildAdminStudentTransactionQuery(
      filters,
    );

  return authenticatedApiRequest<
    ApiAdminStudentTransaction[]
  >(
    `/admin/transactions/student?${query}`,
  );
}

async function getMerchantOrderLookupClient() {
  const transactions: ApiAdminMerchantTransaction[] = [];

  for (let page = 1; ; page += 1) {
    const currentPage =
      await authenticatedApiRequest<
        ApiAdminMerchantTransaction[]
      >(
        `/admin/transactions/merchant?page=${page}`,
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

export async function getAdminTransactionsPageClient(
  filters: AdminTransactionFilters,
): Promise<AdminTransactionsPageData> {
  const page = Math.max(
    1,
    filters.page ?? 1,
  );

  const [
    currentPage,
    merchantLookup,
  ] = await Promise.all([
    getStudentPage({
      ...filters,
      page,
    }),
    getMerchantOrderLookupClient(),
  ]);

  let hasNextPage = false;

  if (
    currentPage.length ===
    ADMIN_TRANSACTION_PAGE_SIZE
  ) {
    const nextPage =
      await getStudentPage({
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
