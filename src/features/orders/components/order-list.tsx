"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  ShoppingBag,
} from "lucide-react";

import {
  OrderCard,
} from "@/features/orders/components/order-card";

import {
  OrderStatusTabs,
} from "@/features/orders/components/order-status-tabs";

import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/types/order";

interface OrderListProps {
  orders: Array<{
    order: Order;
    merchantName: string;
    items: OrderItem[];
  }>;
}

export function OrderList({
  orders,
}: OrderListProps) {
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

      {filteredOrders.length > 0 ? (
        <div className="mt-5 space-y-4">
          {filteredOrders.map(
            ({
              order,
              merchantName,
              items,
            }) => (
              <OrderCard
                key={order.id}
                order={order}
                merchantName={
                  merchantName
                }
                items={items}
              />
            ),
          )}
        </div>
      ) : (
        <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-background px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <ShoppingBag className="size-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 font-semibold">
            Belum ada pesanan
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Tidak ada pesanan dengan
            status yang dipilih.
          </p>
        </div>
      )}
    </>
  );
}