import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  OrderList,
} from "@/features/orders/components/order-list";

import {
  getCartProduct,
} from "@/lib/api/catalog";

import {
  getStudentOrders,
} from "@/lib/api/student-orders";

import {
  ROUTES,
} from "@/lib/constants";

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

export default async function StudentOrdersPage() {
  const profile =
    await requireRole("student");

  const orders =
    await getStudentOrders(
      profile.id,
    );

  const fallbackProductIds =
    orders.flatMap(
      ({ items }) =>
        items
          .filter(
            (item) =>
              !item.imageUrl &&
              item.productId,
          )
          .map(
            (item) =>
              item.productId,
          ),
    );

  const productImageFallbacks =
    await getProductImageFallbacks(
      fallbackProductIds,
    );

  const ordersWithProductImages =
    orders.map(
      (orderData) => ({
        ...orderData,
        items:
          orderData.items.map(
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
          ),
      }),
    );

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-6 lg:px-16 lg:py-12">
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.STUDENT.DASHBOARD}
            aria-label="Kembali ke dashboard"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-arctic-blue bg-white text-navy-steel transition-colors hover:bg-arctic-blue lg:hidden"
          >
            <ArrowLeft className="size-5" />
          </Link>

          <h1 className="font-heading text-[32px] font-bold leading-[1.15] text-navy-steel sm:text-[38px] lg:text-5xl">
            Pesanan Saya
          </h1>
        </div>

        <p className="mt-3 text-base text-[#536069] sm:text-lg">
          <span className="lg:hidden">
            Lihat status pesanan kamu.
          </span>
          <span className="hidden lg:inline">
            Lihat status dan riwayat pesanan kamu.
          </span>
        </p>
      </div>

      <OrderList
        orders={
          ordersWithProductImages
        }
      />
    </div>
  );
}
