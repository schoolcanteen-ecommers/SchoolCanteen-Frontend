import {
  Store,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

import { requireRole } from "@/features/auth/server/require-role";

import { MerchantFinanceOverview } from "@/features/finance/components/merchant-finance-overview";

import {
  getCanteenCatalog,
  getCooperativeCatalog,
} from "@/lib/api/catalog";

import { merchantOrders } from "@/mocks/orders";

import {
  getMerchantWithdrawalPreview,
} from "@/mocks/finance";

export default async function MerchantFinancePage() {
    const profile =
    await requireRole("merchant");

    const [
    canteenCatalog,
    cooperativeCatalog,
  ] = await Promise.all([
    getCanteenCatalog(),
    getCooperativeCatalog(),
  ]);

  const merchant = [
    ...canteenCatalog.merchants,
    ...cooperativeCatalog.merchants,
  ].find(
    (item) =>
      item.ownerId === profile.id,
  );

    if (!merchant) {
    return (
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageHeader
          title="Keuangan"
          description="Pantau saldo, transaksi, dan pencairan dana merchant."
        />

        <div className="mt-8">
          <EmptyState
            icon={Store}
            title="Merchant tidak ditemukan"
            description="Akun merchant belum terhubung dengan data merchant yang aktif."
          />
        </div>
      </div>
    );
  }

    const withdrawals =
    getMerchantWithdrawalPreview(
      merchant.id,
    );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Keuangan"
        description={`Pantau saldo, aktivitas dana, dan pencairan ${merchant.name}.`}
      />

      <MerchantFinanceOverview
        orders={merchantOrders}
        withdrawals={withdrawals}
      />
    </div>
  );
}