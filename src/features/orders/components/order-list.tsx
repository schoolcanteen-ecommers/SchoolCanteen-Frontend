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
  StudentOrderFilterTabs,
} from "@/features/orders/components/student-order-filter-tabs";

import type {
  StudentOrderFilter,
} from "@/features/orders/components/student-order-filter-tabs";

import {
  StudentOrdersSummary,
} from "@/features/orders/components/student-orders-summary";

import type {
  StudentOrderData,
} from "@/lib/api/student-orders";

function matchesFilter(
  status: StudentOrderData["order"]["status"],
  filter: StudentOrderFilter,
) {
  if (filter === "ALL") {
    return true;
  }

  if (filter === "PROCESSING") {
    return [
      "WAITING",
      "CONFIRMED",
      "PREPARING",
    ].includes(status);
  }

  if (filter === "READY") {
    return status === "READY";
  }

  if (filter === "COMPLETED") {
    return status === "COMPLETED";
  }

  return status === "CANCELLED";
}

function getJakartaMonthKey(
  value: Date,
) {
  const parts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        timeZone: "Asia/Jakarta",
      },
    ).formatToParts(value);

  const year =
    parts.find(
      (part) =>
        part.type === "year",
    )?.value;

  const month =
    parts.find(
      (part) =>
        part.type === "month",
    )?.value;

  return `${year}-${month}`;
}

interface OrderListProps {
  orders: StudentOrderData[];
}

export function OrderList({
  orders,
}: OrderListProps) {
  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState<StudentOrderFilter>(
    "ALL",
  );

  const filteredOrders =
    useMemo(
      () =>
        orders.filter(
          ({ order }) =>
            matchesFilter(
              order.status,
              selectedFilter,
            ),
        ),
      [orders, selectedFilter],
    );

  const summary = useMemo(() => {
    const currentMonthKey =
      getJakartaMonthKey(
        new Date(),
      );

    const eligibleOrders =
      orders.filter(
        ({ order }) =>
          order.status !==
            "CANCELLED" &&
          getJakartaMonthKey(
            new Date(
              order.createdAt,
            ),
          ) === currentMonthKey,
      );

    const totalTransactions =
      eligibleOrders.reduce(
        (total, { order }) =>
          total +
          order.totalPrice,
        0,
      );

    const merchantCount =
      new Map<string, number>();

    for (const {
      merchantName,
    } of eligibleOrders) {
      merchantCount.set(
        merchantName,
        (merchantCount.get(
          merchantName,
        ) ?? 0) + 1,
      );
    }

    let favoriteMerchant:
      | string
      | null = null;
    let favoriteCount = 0;

    for (const [
      merchantName,
      count,
    ] of merchantCount) {
      if (count > favoriteCount) {
        favoriteMerchant =
          merchantName;
        favoriteCount = count;
      }
    }

    return {
      totalOrders:
        eligibleOrders.length,
      totalTransactions,
      favoriteMerchant,
    };
  }, [orders]);

  return (
    <>
      <StudentOrderFilterTabs
        value={selectedFilter}
        onChange={
          setSelectedFilter
        }
      />

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-16 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8 lg:space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(
              ({
                order,
                merchantName,
                merchantType,
                pickupEndTime,
                items,
              }) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  merchantName={
                    merchantName
                  }
                  merchantType={
                    merchantType
                  }
                  pickupEndTime={
                    pickupEndTime
                  }
                  items={items}
                />
              ),
            )
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-[20px] border border-dashed border-[#C4C6CC] bg-white px-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-arctic-blue">
                <ShoppingBag className="size-6 text-navy-steel" />
              </div>

              <h2 className="mt-4 font-heading text-xl font-semibold text-navy-steel">
                Belum ada pesanan
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#536069]">
                Tidak ada pesanan dengan
                status yang dipilih.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <StudentOrdersSummary
            totalOrders={
              summary.totalOrders
            }
            totalTransactions={
              summary.totalTransactions
            }
            favoriteMerchant={
              summary.favoriteMerchant
            }
          />
        </div>
      </div>
    </>
  );
}
