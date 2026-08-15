"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ClipboardList,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

import { MerchantOrderCard } from "@/features/orders/components/merchant-order-card";
import { OrderStatusTabs } from "@/features/orders/components/order-status-tabs";

import { authenticatedApiRequest } from "@/lib/api/authenticated-client";

import type {
  MerchantOrderData,
} from "@/lib/api/merchant-orders";

import type {
  OrderStatus,
} from "@/types/order";

interface MerchantOrderListProps {
  orders: MerchantOrderData[];
}

export function MerchantOrderList({
  orders,
}: MerchantOrderListProps) {
  const router =
    useRouter();

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<
    "ALL" | OrderStatus
  >("ALL");

  const [
    updatingOrderId,
    setUpdatingOrderId,
  ] = useState<string | null>(
    null,
  );

  const [
    updateError,
    setUpdateError,
  ] = useState<string | null>(
    null,
  );

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

  async function handleAdvanceStatus(
    orderId: string,
    nextStatus: OrderStatus,
  ) {
    setUpdateError(null);
    setUpdatingOrderId(
      orderId,
    );

    try {
      await authenticatedApiRequest(
        `/merchant/orders/${orderId}/status`,
        {
          method: "PATCH",

          body: {
            status:
              nextStatus.toLowerCase(),
          },
        },
      );

      router.refresh();
    } catch (error) {
      setUpdateError(
        error instanceof Error
          ? error.message
          : "Status pesanan gagal diperbarui.",
      );
    } finally {
      setUpdatingOrderId(
        null,
      );
    }
  }

  return (
    <>
      <div className="mt-7">
        <OrderStatusTabs
          value={
            selectedStatus
          }
          onChange={
            setSelectedStatus
          }
        />
      </div>

      {updateError ? (
        <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">
            Status pesanan gagal diperbarui
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {updateError}
          </p>
        </div>
      ) : null}

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
                isUpdating={
                  updatingOrderId ===
                  order.id
                }
                onAdvanceStatus={
                  handleAdvanceStatus
                }
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
