import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  StudentOrderDetailHeader,
} from "@/features/orders/components/detail/student-order-detail-header";

import {
  StudentOrderItemsSummary,
} from "@/features/orders/components/detail/student-order-items-summary";

import {
  StudentOrderPaymentSummary,
} from "@/features/orders/components/detail/student-order-payment-summary";

import {
  StudentOrderPickupCard,
} from "@/features/orders/components/detail/student-order-pickup-card";

import {
  OrderTimeline,
} from "@/features/orders/components/order-timeline";

import {
  getCartProduct,
} from "@/lib/api/catalog";

import {
  ApiError,
} from "@/lib/api/error";

import {
  getStudentOrderDetail,
} from "@/lib/api/student-orders";

import {
  ROUTES,
} from "@/lib/constants";

interface StudentOrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentOrderDetailPage({
  params,
}: StudentOrderDetailPageProps) {
  const { id } = await params;

  const profile =
    await requireRole("student");

  const orderData =
    await getStudentOrderDetail(
      id,
      profile.id,
    ).catch((error) => {
      if (
        error instanceof ApiError &&
        (
          error.status === 404 ||
          error.status === 403
        )
      ) {
        notFound();
      }

      throw error;
    });

  const {
    order,
    merchantName,
    pickupEndTime,
    notes,
    paymentHeldAt,
    timeline,
    items,
  } = orderData;

  const resolvedItems = await Promise.all(
    items.map(async (item) => {
      if (
        item.imageUrl ||
        !item.productId
      ) {
        return item;
      }

      try {
        const { product } =
          await getCartProduct(
            item.productId,
          );

        return {
          ...item,
          imageUrl:
            product.imageUrl,
        };
      } catch {
        return item;
      }
    }),
  );

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pb-36 pt-8 sm:px-6 lg:px-10 lg:pb-14 lg:pt-12">
      <StudentOrderDetailHeader
        orderCode={order.orderCode}
        merchantName={merchantName}
        status={order.status}
      />

      <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-[20px] border border-arctic-blue bg-white p-5 sm:p-6 lg:p-8">
            <h2 className="font-heading text-xl font-semibold text-navy-steel sm:text-2xl">
              Status Pesanan
            </h2>

            <div className="mt-6 lg:mt-8">
              <OrderTimeline
                status={order.status}
                paymentStatus={order.paymentStatus}
                createdAt={order.createdAt}
                paymentHeldAt={paymentHeldAt}
                timeline={timeline}
              />
            </div>
          </section>

          <StudentOrderPickupCard
            pickupTime={order.pickupTime ?? null}
            pickupEndTime={pickupEndTime}
            pickupCode={order.pickupCode ?? null}
          />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:col-span-5 lg:space-y-0 lg:rounded-[20px] lg:border lg:border-arctic-blue lg:bg-white lg:p-8 lg:shadow-[0_12px_32px_rgba(13,27,42,0.08)]">
          <StudentOrderItemsSummary
            items={resolvedItems}
            notes={notes}
          />

          <StudentOrderPaymentSummary
            totalPrice={order.totalPrice}
            paymentStatus={order.paymentStatus}
          />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-20 z-40 px-4 lg:hidden">
        <div className="mx-auto max-w-lg bg-gradient-to-t from-[#F7F8FA] via-[#F7F8FA]/95 to-transparent pb-2 pt-8">
          <Link
            href={ROUTES.STUDENT.ORDERS}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-navy-steel px-6 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(13,27,42,0.16)] transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Pesanan
          </Link>
        </div>
      </div>
    </div>
  );
}
