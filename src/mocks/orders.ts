import type {
  Order,
  OrderItem,
} from "@/types/order";

export const studentOrders = [
  {
    order: {
      id: "order-001",
      orderCode: "SC-KTN-0081",

      userId: "preview-student",
      merchantId: "merchant-kantin-1",

      status: "READY",
      paymentStatus: "HELD",

      totalPrice: 19000,

      pickupCode: "KTN081",
      pickupTime: "12:30",

      createdAt: "2026-08-10T09:15:00+07:00",
    },

    merchantName: "Kantin Bu Ani",

    items: [
      {
        id: "order-item-001",
        orderId: "order-001",
        productId: "product-001",

        productName: "Nasi Ayam",

        quantity: 1,
        price: 15000,
        subtotal: 15000,
      },
      {
        id: "order-item-002",
        orderId: "order-001",
        productId: "product-002",

        productName: "Es Teh",

        quantity: 1,
        price: 4000,
        subtotal: 4000,
      },
    ],
  },

  {
    order: {
      id: "order-002",
      orderCode: "SC-KTN-0074",

      userId: "preview-student",
      merchantId: "merchant-kantin-2",

      status: "PREPARING",
      paymentStatus: "HELD",

      totalPrice: 16000,

      pickupCode: "KTN074",
      pickupTime: "10:15",

      createdAt: "2026-08-10T08:30:00+07:00",
    },

    merchantName: "Kantin Pak Budi",

    items: [
      {
        id: "order-item-003",
        orderId: "order-002",
        productId: "product-003",

        productName: "Roti Bakar",

        quantity: 2,
        price: 8000,
        subtotal: 16000,
      },
    ],
  },

  {
    order: {
      id: "order-003",
      orderCode: "SC-KOP-0028",

      userId: "preview-student",
      merchantId: "merchant-koperasi-1",

      status: "COMPLETED",
      paymentStatus: "RELEASED",

      totalPrice: 21000,

      pickupCode: "KOP028",
      pickupTime: "09:30",

      createdAt: "2026-08-09T08:45:00+07:00",
    },

    merchantName: "Koperasi Siswa",

    items: [
      {
        id: "order-item-004",
        orderId: "order-003",
        productId: "product-004",

        productName: "Buku Tulis",

        quantity: 3,
        price: 5000,
        subtotal: 15000,
      },
      {
        id: "order-item-005",
        orderId: "order-003",
        productId: "product-005",

        productName: "Pulpen",

        quantity: 2,
        price: 3000,
        subtotal: 6000,
      },
    ],
  },

  {
    order: {
      id: "order-004",
      orderCode: "SC-KTN-0069",

      userId: "preview-student",
      merchantId: "merchant-kantin-1",

      status: "CANCELLED",
      paymentStatus: "REFUNDED",

      totalPrice: 13000,

      pickupCode: null,
      pickupTime: null,

      createdAt: "2026-08-08T10:20:00+07:00",
    },

    merchantName: "Kantin Bu Ani",

    items: [
      {
        id: "order-item-006",
        orderId: "order-004",
        productId: "product-006",

        productName: "Nasi Goreng",

        quantity: 1,
        price: 13000,
        subtotal: 13000,
      },
    ],
  },
] satisfies Array<{
  order: Order;
  merchantName: string;
  items: OrderItem[];
}>;