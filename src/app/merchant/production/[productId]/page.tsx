import { requireRole } from "@/features/auth/server/require-role";

import { MerchantProductionDetail } from "@/features/production/components/merchant-production-detail";
import {
  findMerchantProductName,
  findMerchantProductionItem,
} from "@/features/production/lib/merchant-production";

import { getMerchantOrders } from "@/lib/api/merchant-orders";

interface MerchantProductionDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function MerchantProductionDetailPage({
  params,
}: MerchantProductionDetailPageProps) {
  await requireRole("merchant");

  const { productId } = await params;
  const orders = await getMerchantOrders();
  const productionItem = findMerchantProductionItem(orders, productId);
  const productName =
    productionItem?.productName ?? findMerchantProductName(orders, productId);

  return (
    <MerchantProductionDetail
      item={productionItem}
      productName={productName}
    />
  );
}
