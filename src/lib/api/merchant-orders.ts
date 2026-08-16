import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import type {
  MerchantOrderView,
  OrderItem,
  OrderStatus,
} from "@/types/order";

import type {
  PickupStatus,
} from "@/types/pickup";

export interface MerchantPickupData {
  pickupCode: string;
  qrToken: string;

  status: PickupStatus;

  pickedAt: string | null;
}

export interface MerchantOrderData {
  order: MerchantOrderView;

  customerName: string;

  items: OrderItem[];

  pickup: MerchantPickupData | null;
}

interface ApiMerchantOrderSummary {
  id: string;
}

interface ApiMerchantOrderItem {
  id: string;

  product_id: string | null;
  product_name: string;

  unit_price: number;
  quantity: number;
  subtotal: number;
}

interface ApiMerchantOrderDetail {
  id: string;
  order_code: string;

  status: string;

  total_amount: number;

  notes: string | null;

  student: {
    id: string;
    name: string;
  };

  pickup_slot: {
    id: string;
    start_at: string;
    end_at: string;
  } | null;

  items: ApiMerchantOrderItem[];

  pickup: {
    token: string;
    code: string;

    status: string;

    verified_at: string | null;
  } | null;

  timeline: {
    confirmed_at: string | null;
    preparing_at: string | null;
    ready_at: string | null;
    completed_at: string | null;
    cancelled_at: string | null;
  };

  created_at: string;
  updated_at: string;
}

function mapOrderStatus(
  status: string,
): OrderStatus {
  const normalized =
    status.toUpperCase();

  const allowedStatuses: OrderStatus[] = [
    "WAITING",
    "CONFIRMED",
    "PREPARING",
    "READY",
    "COMPLETED",
    "CANCELLED",
  ];

  if (
    allowedStatuses.includes(
      normalized as OrderStatus,
    )
  ) {
    return normalized as OrderStatus;
  }

  throw new Error(
    `Status order tidak dikenali: ${status}`,
  );
}

function mapPickupStatus(
  status: string,
): PickupStatus {
  const normalized =
    status.toUpperCase();

  if (
    normalized === "WAITING" ||
    normalized === "VERIFIED"
  ) {
    return normalized;
  }

  throw new Error(
    `Status pickup tidak dikenali: ${status}`,
  );
}

function formatPickupTime(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",

      hour12: false,

      timeZone:
        "Asia/Jakarta",
    },
  ).format(
    new Date(value),
  );
}

function mapMerchantOrder(
  data: ApiMerchantOrderDetail,
): MerchantOrderData {
  return {
    order: {
      id: data.id,

      orderCode:
        data.order_code,

      userId:
        data.student.id,

      status:
        mapOrderStatus(
          data.status,
        ),

      totalPrice:
        data.total_amount,

      pickupCode:
        data.pickup?.code ??
        null,

      pickupTime:
        formatPickupTime(
          data.pickup_slot?.start_at,
        ),

      createdAt:
        data.created_at,
    },

    customerName:
      data.student.name,

    items:
      data.items.map(
        (item) => ({
          id:
            item.id,

          orderId:
            data.id,

          productId:
            item.product_id ??
            "",

          productName:
            item.product_name,

          quantity:
            item.quantity,

          price:
            item.unit_price,

          subtotal:
            item.subtotal,
        }),
      ),

    pickup:
      data.pickup
        ? {
            pickupCode:
              data.pickup.code,

            qrToken:
              data.pickup.token,

            status:
              mapPickupStatus(
                data.pickup.status,
              ),

            pickedAt:
              data.pickup.verified_at,
          }
        : null,
  };
}

export async function getMerchantOrderDetail(
  orderId: string,
): Promise<MerchantOrderData> {
  const data =
    await authenticatedServerApiRequest<ApiMerchantOrderDetail>(
      `/merchant/orders/${encodeURIComponent(
        orderId,
      )}`,
      {
        cache: "no-store",
      },
    );

  return mapMerchantOrder(
    data,
  );
}

export async function getMerchantOrders(): Promise<
  MerchantOrderData[]
> {
  const orders =
    await authenticatedServerApiRequest<
      ApiMerchantOrderSummary[]
    >(
      "/merchant/orders",
      {
        cache: "no-store",
      },
    );

  return Promise.all(
    orders.map(
      ({ id }) =>
        getMerchantOrderDetail(
          id,
        ),
    ),
  );
}