import { PageHeader } from "@/components/shared/page-header";

import { requireRole } from "@/features/auth/server/require-role";

import { MerchantInventoryList } from "@/features/inventory/components/merchant-inventory-list";

import { getMerchantProductManagementData } from "@/lib/api/merchant-products";

export default async function MerchantInventoryPage() {
  await requireRole("merchant");

  const { merchant, products, categories } =
    await getMerchantProductManagementData();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Inventory"
        description={`Pantau dan perbarui stok produk ${merchant.name}.`}
      />

      <MerchantInventoryList products={products} categories={categories} />
    </div>
  );
}
