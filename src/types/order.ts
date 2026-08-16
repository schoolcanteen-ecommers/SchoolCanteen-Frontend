export type OrderStatus =
  | "WAITING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "UNPAID"
  | "PAID"
  | "HELD"
  | "RELEASED"
  | "REFUNDED";

export interface Order {
  id: string;
  orderCode: string;

  userId: string;
  merchantId: string;

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  totalPrice: number;

  pickupCode?: string | null;
  pickupTime?: string | null;

  createdAt: string;
}

export interface OrderItem {
  id: string;

  orderId: string;
  productId: string;

  productName: string;

  quantity: number;
  price: number;

  subtotal: number;
}

export interface MerchantOrderView {
  id: string;
  orderCode: string;

  userId: string;

  status: OrderStatus;

  totalPrice: number;

  pickupCode?: string | null;
  pickupTime?: string | null;

  createdAt: string;
}