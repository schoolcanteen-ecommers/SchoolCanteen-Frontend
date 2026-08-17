import {
  StudentActiveOrder,
} from "@/features/students/components/dashboard/student-active-order";
import {
  StudentDashboardHero,
} from "@/features/students/components/dashboard/student-dashboard-hero";
import {
  StudentDashboardWallet,
} from "@/features/students/components/dashboard/student-dashboard-wallet";
import {
  StudentQuickAccess,
} from "@/features/students/components/dashboard/student-quick-access";
import {
  StudentRecentActivity,
} from "@/features/students/components/dashboard/student-recent-activity";
import {
  StudentReorderSection,
  type StudentReorderItem,
} from "@/features/students/components/dashboard/student-reorder-section";

import {
  getCartProduct,
} from "@/lib/api/catalog";
import {
  getStudentDashboard,
} from "@/lib/api/student-dashboard";
import {
  getStudentOrders,
  type StudentOrderData,
} from "@/lib/api/student-orders";
import {
  getStudentProfile,
} from "@/lib/api/student-profile";
import {
  getStudentWalletTransactions,
} from "@/lib/api/student-wallet";

function sortOrdersNewest(
  orders: StudentOrderData[],
): StudentOrderData[] {
  return [...orders].sort(
    (left, right) =>
      new Date(
        right.order.createdAt,
      ).getTime() -
      new Date(
        left.order.createdAt,
      ).getTime(),
  );
}

function getReorderItems(
  orders: StudentOrderData[],
): StudentReorderItem[] {
  const items: StudentReorderItem[] = [];
  const seenProductIds = new Set<string>();

  for (const orderData of orders) {
    for (const item of orderData.items) {
      if (
        !item.productId ||
        seenProductIds.has(
          item.productId,
        )
      ) {
        continue;
      }

      seenProductIds.add(
        item.productId,
      );

      items.push({
        productId:
          item.productId,
        productName:
          item.productName,
        imageUrl:
          item.imageUrl ?? null,
        merchantName:
          orderData.merchantName,
        price:
          item.price,
      });

      if (items.length === 4) {
        return items;
      }
    }
  }

  return items;
}


async function getProductImageFallbacks(
  productIds: string[],
): Promise<Map<string, string | null>> {
  const uniqueProductIds =
    Array.from(
      new Set(
        productIds.filter(Boolean),
      ),
    );

  const entries =
    await Promise.all(
      uniqueProductIds.map(
        async (productId) => {
          try {
            const { product } =
              await getCartProduct(
                productId,
              );

            return [
              productId,
              product.imageUrl ?? null,
            ] as const;
          } catch {
            return [
              productId,
              null,
            ] as const;
          }
        },
      ),
    );

  return new Map(entries);
}

export default async function StudentDashboardPage() {
  const [
    profile,
    dashboard,
  ] = await Promise.all([
    getStudentProfile(),
    getStudentDashboard(),
  ]);

  const [
    orders,
    walletTransactions,
  ] = await Promise.all([
    getStudentOrders(
      profile.id,
    ),
    getStudentWalletTransactions(
      dashboard.wallet.id,
    ),
  ]);

  const sortedOrders =
    sortOrdersNewest(
      orders,
    );

  const activeOrders =
    sortedOrders.filter(
      ({ order }) =>
        order.status !==
          "COMPLETED" &&
        order.status !==
          "CANCELLED",
    );

  const activeOrder =
    activeOrders[0] ?? null;

  const rawReorderItems =
    getReorderItems(
      sortedOrders,
    );

  const fallbackProductIds = [
    ...(activeOrder?.items[0] &&
    !activeOrder.items[0]
      .imageUrl
      ? [
          activeOrder.items[0]
            .productId,
        ]
      : []),
    ...rawReorderItems
      .filter(
        (item) =>
          !item.imageUrl,
      )
      .map(
        (item) =>
          item.productId,
      ),
  ];

  const productImageFallbacks =
    await getProductImageFallbacks(
      fallbackProductIds,
    );

  const activeOrderWithImage =
    activeOrder?.items[0] &&
    !activeOrder.items[0]
      .imageUrl
      ? {
          ...activeOrder,
          items:
            activeOrder.items.map(
              (item, index) =>
                index === 0
                  ? {
                      ...item,
                      imageUrl:
                        productImageFallbacks.get(
                          item.productId,
                        ) ?? null,
                    }
                  : item,
            ),
        }
      : activeOrder;

  const reorderItems =
    rawReorderItems.map(
      (item) =>
        item.imageUrl
          ? item
          : {
              ...item,
              imageUrl:
                productImageFallbacks.get(
                  item.productId,
                ) ?? null,
            },
    );

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-10 pt-7 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <StudentDashboardHero
        name={profile.name}
      />

      <section className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-6">
        <StudentDashboardWallet
          balance={
            dashboard.wallet
              .balance
          }
          className="lg:col-span-8 lg:row-start-1"
        />

        <StudentActiveOrder
          activeOrder={
            activeOrderWithImage
          }
          additionalOrderCount={
            Math.max(
              activeOrders.length -
                1,
              0,
            )
          }
          className="lg:col-span-8 lg:row-start-2"
        />

        <StudentQuickAccess
          className="lg:col-span-4 lg:col-start-9 lg:row-start-1"
        />

        <StudentRecentActivity
          transactions={
            walletTransactions.slice(
              0,
              3,
            )
          }
          className="lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:row-span-2"
        />

        <StudentReorderSection
          items={reorderItems}
          className="lg:col-span-8 lg:row-start-3"
        />
      </section>
    </div>
  );
}
