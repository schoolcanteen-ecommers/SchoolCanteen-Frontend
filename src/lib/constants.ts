export const APP_NAME = "SchoolCanteen";

export const APP_DESCRIPTION =
  "School Commerce Management";

export const DEFAULT_CURRENCY = "IDR";

export const MAX_CART_QUANTITY = 99;

export const DEFAULT_PICKUP_SLOT_CAPACITY = 10;

import type {
  OrderStatus,
  PaymentStatus,
} from "@/types/order";

export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",
  REGISTER: "/register",

  CANTEEN: "/kantin",
  COOPERATIVE: "/koperasi",
  CART: "/keranjang",

  STUDENT: {
    DASHBOARD: "/student/dashboard",
    ORDERS: "/student/orders",
    WALLET: "/student/wallet",
    PROFILE: "/student/profile",
    CHECKOUT: "/student/checkout",
  },

  MERCHANT: {
    DASHBOARD: "/merchant/dashboard",
    ORDERS: "/merchant/orders",
    PRODUCTION: "/merchant/production",
    PICKUP: "/merchant/pickup",
    PRODUCTS: "/merchant/products",
    INVENTORY: "/merchant/inventory",
    FINANCE: "/merchant/finance",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    STUDENTS: "/admin/students",
    MERCHANTS: "/admin/merchants",
    TRANSACTIONS: "/admin/transactions",
    FINANCE: "/admin/finance",
  },
} as const;

export const ORDER_STATUS_LABEL: Record<
  OrderStatus,
  string
> = {
  WAITING: "Menunggu",
  CONFIRMED: "Dikonfirmasi",
  PREPARING: "Sedang Diproses",
  READY: "Siap Diambil",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const PAYMENT_STATUS_LABEL: Record<
  PaymentStatus,
  string
> = {
  UNPAID: "Belum Dibayar",
  PAID: "Sudah Dibayar",
  HELD: "Dana Ditahan",
  RELEASED: "Dana Diteruskan",
  REFUNDED: "Dikembalikan",
};