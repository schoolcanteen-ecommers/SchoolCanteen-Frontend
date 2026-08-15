import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  MerchantFinanceOverview,
} from "@/features/finance/components/merchant-finance-overview";

import {
  getMerchantFinanceData,
} from "@/lib/api/merchant-finance";

export default async function MerchantFinancePage() {
  await requireRole(
    "merchant",
  );

  const {
    wallet,
    transactions,
    withdrawals,
    paymentAccounts,
  } =
    await getMerchantFinanceData();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Keuangan"
        description={`Pantau saldo, aktivitas dana, dan pencairan ${wallet.merchantName}.`}
      />

      <MerchantFinanceOverview
        wallet={
          wallet
        }
        transactions={
          transactions
        }
        withdrawals={
          withdrawals
        }
        paymentAccounts={
          paymentAccounts
        }
      />
    </div>
  );
}