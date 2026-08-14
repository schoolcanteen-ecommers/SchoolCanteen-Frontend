"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  ClipboardList,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

import { MerchantOrderCard } from "@/features/orders/components/merchant-order-card";
import { OrderStatusTabs } from "@/features/orders/components/order-status-tabs";

import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/types/order";

interface MerchantOrderListProps {
  orders: Array<{
    order: Order;
    customerName: string;
    items: OrderItem[];
  }>;
}

export function MerchantOrderList({
  orders,
}: MerchantOrderListProps) {
  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<
    "ALL" | OrderStatus
  >("ALL");

  const filteredOrders =
    useMemo(() => {
      if (
        selectedStatus === "ALL"
      ) {
        return orders;
      }

      return orders.filter(
        ({ order }) =>
          order.status ===
          selectedStatus,
      );
    }, [
      orders,
      selectedStatus,
    ]);

  return (
    <>
      <div className="mt-7">
        <OrderStatusTabs
          value={selectedStatus}
          onChange={
            setSelectedStatus
          }
        />
      </div>

      {filteredOrders.length >
      0 ? (
        <div className="mt-5 space-y-4">
          {filteredOrders.map(
            ({
              order,
              customerName,
              items,
            }) => (
              <MerchantOrderCard
                key={order.id}
                order={order}
                customerName={
                  customerName
                }
                items={items}
              />
            ),
          )}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={ClipboardList}
            title="Tidak ada pesanan"
            description="Tidak ada pesanan dengan status yang dipilih."
          />
        </div>
      )}
    </>
  );
}