import { authenticatedServerApiRequest } from "@/lib/api/authenticated-server";

import type {
  MerchantType,
} from "@/types/merchant";

import type {
  Order,
  OrderItem,
  OrderStatus,
  PaymentStatus,
} from "@/types/order";

export interface StudentOrderData {
  order: Order;
  merchantName: string;
  merchantType: MerchantType;
  pickupEndTime: string | null;
  notes: string | null;
  paymentHeldAt: string | null;
  timeline: {
    confirmedAt: string | null;
    preparingAt: string | null;
    readyAt: string | null;
    completedAt: string | null;
    cancelledAt: string | null;
  };
  items: OrderItem[];
}

interface ApiStudentOrderItem {
  id: string;
  product_id: string | null;
  product_name: string;
  product_image_url: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

<<<<<<< HEAD
interface ApiStudentOrderDetail {
=======
export interface ApiStudentOrderDetail {
>>>>>>> source/main
  id: string;
  order_code: string;
  status: string;
  total_amount: number;
  notes: string | null;

  merchant: {
    id: string;
    name: string;
    type: "canteen" | "cooperative";
    logo_url: string | null;
  };

  pickup_slot: {
    id: string;
    start_at: string;
    end_at: string;
  } | null;

  items: ApiStudentOrderItem[];

  pickup: {
    token: string;
    code: string;
    status: string;
    verified_at: string | null;
  } | null;

  escrow: {
    amount: number;
    status: string;
    held_at: string | null;
    released_at: string | null;
    refunded_at: string | null;
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

function mapOrderStatus(status: string): OrderStatus {
  switch (status.toLowerCase()) {
    case "waiting":
      return "WAITING";

    case "confirmed":
      return "CONFIRMED";

    case "preparing":
      return "PREPARING";

    case "ready":
      return "READY";

    case "completed":
      return "COMPLETED";

    case "cancelled":
      return "CANCELLED";

    default:
      throw new Error(
        `Status order tidak dikenali: ${status}`,
      );
  }
}

function mapPaymentStatus(
  status: string | null | undefined,
): PaymentStatus {
  switch (status?.toLowerCase()) {
    case "held":
      return "HELD";

    case "released":
      return "RELEASED";

    case "refunded":
      return "REFUNDED";

    default:
      return "UNPAID";
  }
}

function formatPickupTime(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

<<<<<<< HEAD
function mapStudentOrder(
=======
export function mapStudentOrder(
>>>>>>> source/main
  data: ApiStudentOrderDetail,
  userId: string,
): StudentOrderData {
  return {
    order: {
      id: data.id,
      orderCode: data.order_code,

      userId,
      merchantId: data.merchant.id,

      status: mapOrderStatus(data.status),

      paymentStatus: mapPaymentStatus(
        data.escrow?.status,
      ),

      totalPrice: data.total_amount,

      pickupCode:
        data.pickup?.code ?? null,

      pickupTime: formatPickupTime(
        data.pickup_slot?.start_at,
      ),

      createdAt: data.created_at,
    },

    merchantName: data.merchant.name,

    merchantType:
      data.merchant.type === "canteen"
        ? "CANTEEN"
        : "COOPERATIVE",

    pickupEndTime: formatPickupTime(
      data.pickup_slot?.end_at,
    ),

    notes: data.notes,

    paymentHeldAt:
      data.escrow?.held_at ?? null,

    timeline: {
      confirmedAt:
        data.timeline.confirmed_at,
      preparingAt:
        data.timeline.preparing_at,
      readyAt:
        data.timeline.ready_at,
      completedAt:
        data.timeline.completed_at,
      cancelledAt:
        data.timeline.cancelled_at,
    },

    items: data.items.map((item) => ({
      id: item.id,

      orderId: data.id,

      productId:
        item.product_id ?? "",

      productName:
        item.product_name,

      imageUrl:
        item.product_image_url,

      quantity:
        item.quantity,

      price:
        item.unit_price,

      subtotal:
        item.subtotal,
    })),
  };
}

export async function getStudentOrderDetail(
  orderId: string,
  userId: string,
): Promise<StudentOrderData> {
  const data =
    await authenticatedServerApiRequest<ApiStudentOrderDetail>(
      `/student/orders/${orderId}`,
      {
        cache: "no-store",
      },
    );

  return mapStudentOrder(
    data,
    userId,
  );
}

export async function getStudentOrders(
  userId: string,
): Promise<StudentOrderData[]> {
  const orders =
    await authenticatedServerApiRequest<
      ApiStudentOrderDetail[]
    >(
      "/student/orders",
      {
        cache: "no-store",
      },
    );

  return orders.map(
    (order) =>
      mapStudentOrder(
        order,
        userId,
      ),
  );
}
