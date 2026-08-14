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

export const merchantOrders = [
  {
    order: {
      id: "merchant-order-001",
      orderCode: "SC-KTN-0101",

      userId: "student-001",
      merchantId: "merchant-kantin-1",

      status: "WAITING",
      paymentStatus: "HELD",

      totalPrice: 22000,

      pickupCode: "KTN101",
      pickupTime: "10:00",

      createdAt: "2026-08-11T07:15:00+07:00",
    },

    customerName: "Adit Saputra",

    items: [
      {
        id: "merchant-order-item-001",
        orderId: "merchant-order-001",
        productId: "product-001",

        productName: "Nasi Ayam",

        quantity: 1,
        price: 15000,
        subtotal: 15000,
      },
      {
        id: "merchant-order-item-002",
        orderId: "merchant-order-001",
        productId: "product-007",

        productName: "Es Jeruk",

        quantity: 1,
        price: 7000,
        subtotal: 7000,
      },
    ],
  },

  {
    order: {
      id: "merchant-order-002",
      orderCode: "SC-KTN-0100",

      userId: "student-002",
      merchantId: "merchant-kantin-1",

      status: "CONFIRMED",
      paymentStatus: "HELD",

      totalPrice: 15000,

      pickupCode: "KTN100",
      pickupTime: "10:15",

      createdAt: "2026-08-11T07:05:00+07:00",
    },

    customerName: "Bima Pratama",

    items: [
      {
        id: "merchant-order-item-003",
        orderId: "merchant-order-002",
        productId: "product-001",

        productName: "Nasi Ayam",

        quantity: 1,
        price: 15000,
        subtotal: 15000,
      },
    ],
  },

  {
    order: {
      id: "merchant-order-003",
      orderCode: "SC-KTN-0099",

      userId: "student-003",
      merchantId: "merchant-kantin-1",

      status: "PREPARING",
      paymentStatus: "HELD",

      totalPrice: 20000,

      pickupCode: "KTN099",
      pickupTime: "10:30",

      createdAt: "2026-08-11T06:55:00+07:00",
    },

    customerName: "Citra Lestari",

    items: [
      {
        id: "merchant-order-item-004",
        orderId: "merchant-order-003",
        productId: "product-008",

        productName: "Nasi Goreng",

        quantity: 1,
        price: 16000,
        subtotal: 16000,
      },
      {
        id: "merchant-order-item-005",
        orderId: "merchant-order-003",
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
      id: "merchant-order-004",
      orderCode: "SC-KTN-0098",

      userId: "student-004",
      merchantId: "merchant-kantin-1",

      status: "READY",
      paymentStatus: "HELD",

      totalPrice: 16000,

      pickupCode: "KTN098",
      pickupTime: "10:30",

      createdAt: "2026-08-11T06:45:00+07:00",
    },

    customerName: "Dimas Akbar",

    items: [
      {
        id: "merchant-order-item-006",
        orderId: "merchant-order-004",
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
      id: "merchant-order-005",
      orderCode: "SC-KTN-0097",

      userId: "student-005",
      merchantId: "merchant-kantin-1",

      status: "COMPLETED",
      paymentStatus: "RELEASED",

      totalPrice: 19000,

      pickupCode: "KTN097",
      pickupTime: "09:30",

      createdAt: "2026-08-11T06:20:00+07:00",
    },

    customerName: "Fajar Nugraha",

    items: [
      {
        id: "merchant-order-item-007",
        orderId: "merchant-order-005",
        productId: "product-001",

        productName: "Nasi Ayam",

        quantity: 1,
        price: 15000,
        subtotal: 15000,
      },
      {
        id: "merchant-order-item-008",
        orderId: "merchant-order-005",
        productId: "product-002",

        productName: "Es Teh",

        quantity: 1,
        price: 4000,
        subtotal: 4000,
      },
    ],
  },
] satisfies Array<{
  order: Order;
  customerName: string;
  items: OrderItem[];
}>;