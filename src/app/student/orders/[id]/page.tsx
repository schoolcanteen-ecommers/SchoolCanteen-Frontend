import Link from "next/link";

import {
  ArrowLeft,
  Clock3,
  CreditCard,
  Hash,
  Package,
  Store,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import {
  StatusBadge,
} from "@/components/dashboard/status-badge";

import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  Button,
} from "@/components/ui/button";

import {
  OrderTimeline,
} from "@/features/orders/components/order-timeline";

import {
  PAYMENT_STATUS_LABEL,
  ROUTES,
} from "@/lib/constants";

import {
  formatCurrency,
} from "@/lib/utils";

import {
  studentOrders,
} from "@/mocks/orders";

interface StudentOrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentOrderDetailPage({
  params,
}: StudentOrderDetailPageProps) {
  const { id } = await params;

  const orderData =
    studentOrders.find(
      ({ order }) =>
        order.id === id,
    );

  if (!orderData) {
    notFound();
  }

  const {
    order,
    merchantName,
    items,
  } = orderData;

  const formattedDate =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        dateStyle: "long",
        timeStyle: "short",
      },
    ).format(
      new Date(order.createdAt),
    );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Back */}
      <Button
        nativeButton={false}
        variant="ghost"
        className="-ml-3 mb-5"
        render={
          <Link
            href={
              ROUTES.STUDENT.ORDERS
            }
          />
        }
      >
        <ArrowLeft className="size-4" />
        Kembali ke Pesanan
      </Button>

      {/* Header */}
      <PageHeader
        title={order.orderCode}
        description={`Dibuat ${formattedDate}`}
        action={
          <StatusBadge
            status={order.status}
          />
        }
      />

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Merchant */}
          <section className="rounded-2xl border bg-background p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Store className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Merchant
                </p>

                <h2 className="mt-0.5 font-semibold">
                  {merchantName}
                </h2>
              </div>
            </div>
          </section>

          {/* Order Items */}
          <section className="overflow-hidden rounded-2xl border bg-background">
            <div className="flex items-center gap-2 border-b px-5 py-4 sm:px-6">
              <Package className="size-4 text-primary" />

              <h2 className="font-semibold">
                Detail Produk
              </h2>
            </div>

            <div className="divide-y">
              {items.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">
                        {
                          item.productName
                        }
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {
                          item.quantity
                        }{" "}
                        ×{" "}
                        {formatCurrency(
                          item.price,
                        )}
                      </p>
                    </div>

                    <p className="shrink-0 font-medium">
                      {formatCurrency(
                        item.subtotal,
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t bg-muted/20 px-5 py-4 sm:px-6">
              <span className="font-semibold">
                Total
              </span>

              <span className="text-lg font-semibold text-primary">
                {formatCurrency(
                  order.totalPrice,
                )}
              </span>
            </div>
          </section>

          {/* Pickup Information */}
          <section className="rounded-2xl border bg-background p-5 sm:p-6">
            <h2 className="font-semibold">
              Informasi Pengambilan
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-muted/40 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-4" />

                  Waktu Pengambilan
                </div>

                <p className="mt-2 font-semibold">
                  {order.pickupTime ??
                    "Belum tersedia"}
                </p>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="size-4" />

                  Kode Pengambilan
                </div>

                <p className="mt-2 font-mono font-semibold tracking-wider">
                  {order.pickupCode ??
                    "Belum tersedia"}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          {/* Tracking */}
          <section className="rounded-2xl border bg-background p-5 sm:p-6">
            <h2 className="font-semibold">
              Status Pesanan
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pantau perjalanan pesanan
              kamu.
            </p>

            <div className="mt-6">
              <OrderTimeline
                status={order.status}
              />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Status Pembayaran
                </p>

                <p className="mt-1 font-semibold">
                  {
                    PAYMENT_STATUS_LABEL[
                      order.paymentStatus
                    ]
                  }
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}