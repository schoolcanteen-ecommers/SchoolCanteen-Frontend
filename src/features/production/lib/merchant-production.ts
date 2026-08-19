import type { MerchantOrderData } from "@/lib/api/merchant-orders";

export interface MerchantProductionOrderEntry {
  orderId: string;
  orderCode: string;
  customerName: string;
  quantity: number;
  pickupTime: string | null;
  createdAt: string;
}

export interface MerchantProductionItem {
  key: string;
  productId: string | null;
  productName: string;
  totalQuantity: number;
  orderCount: number;
  orders: MerchantProductionOrderEntry[];
}

export function getMerchantProductionOrders(
  orders: MerchantOrderData[],
) {
  return orders.filter(
    ({ order }) =>
      order.status === "CONFIRMED" ||
      order.status === "PREPARING",
  );
}

export function buildMerchantProductionItems(
  orders: MerchantOrderData[],
): MerchantProductionItem[] {
  const productionOrders = getMerchantProductionOrders(orders);
  const productionMap = new Map<string, MerchantProductionItem>();

  for (const entry of productionOrders) {
    for (const item of entry.items) {
      const productId = item.productId.trim() || null;
      const normalizedName = item.productName.trim().toLocaleLowerCase("id-ID");
      const key = productId ? `id:${productId}` : `name:${normalizedName}`;
      const existing = productionMap.get(key);

      if (existing) {
        existing.totalQuantity += item.quantity;

        const existingOrder = existing.orders.find(
          (orderEntry) => orderEntry.orderId === entry.order.id,
        );

        if (existingOrder) {
          existingOrder.quantity += item.quantity;
        } else {
          existing.orders.push({
            orderId: entry.order.id,
            orderCode: entry.order.orderCode,
            customerName: entry.customerName,
            quantity: item.quantity,
            pickupTime: entry.order.pickupTime ?? null,
            createdAt: entry.order.createdAt,
          });
          existing.orderCount += 1;
        }

        continue;
      }

      productionMap.set(key, {
        key,
        productId,
        productName: item.productName,
        totalQuantity: item.quantity,
        orderCount: 1,
        orders: [
          {
            orderId: entry.order.id,
            orderCode: entry.order.orderCode,
            customerName: entry.customerName,
            quantity: item.quantity,
            pickupTime: entry.order.pickupTime ?? null,
            createdAt: entry.order.createdAt,
          },
        ],
      });
    }
  }

  return Array.from(productionMap.values()).sort(
    (a, b) =>
      b.totalQuantity - a.totalQuantity ||
      a.productName.localeCompare(b.productName, "id-ID"),
  );
}

export function findMerchantProductionItem(
  orders: MerchantOrderData[],
  productId: string,
) {
  return buildMerchantProductionItems(orders).find(
    (item) => item.productId === productId,
  ) ?? null;
}

export function findMerchantProductName(
  orders: MerchantOrderData[],
  productId: string,
) {
  for (const { items } of orders) {
    const item = items.find((candidate) => candidate.productId === productId);

    if (item) {
      return item.productName;
    }
  }

  return null;
}

export function getMerchantProductionTotals(
  orders: MerchantOrderData[],
) {
  const activeOrders = getMerchantProductionOrders(orders);
  const totalItems = activeOrders.reduce(
    (total, entry) =>
      total +
      entry.items.reduce(
        (itemTotal, item) => itemTotal + item.quantity,
        0,
      ),
    0,
  );

  return {
    activeOrders: activeOrders.length,
    totalItems,
  };
}
