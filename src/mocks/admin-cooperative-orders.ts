import type {
  OrderStatus,
  PaymentStatus,
} from "@/types/order";

export type AdminCooperativePickupStatus =
  | "WAITING"
  | "PICKED_UP"
  | "NOT_READY";

export interface AdminCooperativeOrderItem {
  id: string;
  productId: string;
  productName: string;
  merchantName: string;
  imageUrl?: string | null;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface AdminCooperativeOrderTimelineEvent {
  key:
    | "CREATED"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "COMPLETED"
    | "CANCELLED";
  label: string;
  description: string;
  occurredAt: string;
}

export interface AdminCooperativeOrderMonitoringItem {
  id: string;
  orderCode: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  createdAt: string;
  merchantName: string;
  student: {
    id: string;
    name: string;
    nis: string;
    className: string;
    avatarUrl?: string | null;
  };
  items: AdminCooperativeOrderItem[];
  pickup: {
    status: AdminCooperativePickupStatus;
    slotLabel?: string | null;
    startAt?: string | null;
    endAt?: string | null;
    pickupCode?: string | null;
  };
  timeline: AdminCooperativeOrderTimelineEvent[];
}

const product = (
  id: string,
  productName: string,
  merchantName: string,
  quantity: number,
  price: number,
): AdminCooperativeOrderItem => ({
  id,
  productId: `product-${id}`,
  productName,
  merchantName,
  imageUrl: null,
  quantity,
  price,
  subtotal: quantity * price,
});

const timeline = (
  events: Array<[
    AdminCooperativeOrderTimelineEvent["key"],
    string,
    string,
    string,
  ]>,
): AdminCooperativeOrderTimelineEvent[] =>
  events.map(
    ([key, label, description, occurredAt]) => ({
      key,
      label,
      description,
      occurredAt,
    }),
  );

export const adminCooperativeOrders: AdminCooperativeOrderMonitoringItem[] = [
  {
    id: "cooperative-order-001",
    orderCode: "SC-KOP-20260818-001",
    status: "COMPLETED",
    paymentStatus: "RELEASED",
    totalPrice: 12000,
    createdAt: "2026-08-18T09:15:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-andi",
      name: "Andi Saputra",
      nis: "221019",
      className: "XII RPL 1",
      avatarUrl: null,
    },
    items: [
      product("001-a", "Buku Tulis A5", "Koperasi Sekolah", 2, 6000),
    ],
    pickup: {
      status: "PICKED_UP",
      slotLabel: "Istirahat 1",
      startAt: "10:30",
      endAt: "11:00",
      pickupCode: "632308",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-18T09:15:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-18T09:18:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-18T09:32:00+07:00"],
      ["READY", "Ready for Pickup", "Order is ready at the cooperative.", "2026-08-18T10:12:00+07:00"],
      ["COMPLETED", "Order Completed", "Student has picked up the order.", "2026-08-18T10:38:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-002",
    orderCode: "SC-KOP-20260818-002",
    status: "PREPARING",
    paymentStatus: "HELD",
    totalPrice: 15000,
    createdAt: "2026-08-18T09:35:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-budi",
      name: "Budi Santoso",
      nis: "221021",
      className: "XI RPL 1",
      avatarUrl: null,
    },
    items: [
      product("002-a", "Pulpen Biru", "Koperasi Sekolah", 5, 3000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: "Istirahat 1",
      startAt: "10:30",
      endAt: "11:00",
      pickupCode: "823104",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-18T09:35:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-18T09:38:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-18T09:48:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-003",
    orderCode: "SC-KOP-20260818-003",
    status: "WAITING",
    paymentStatus: "HELD",
    totalPrice: 150000,
    createdAt: "2026-08-18T09:52:00+07:00",
    merchantName: "Koperasi Siswa Mandiri",
    student: {
      id: "student-citra",
      name: "Citra Kirana",
      nis: "221028",
      className: "XII TKJ 1",
      avatarUrl: null,
    },
    items: [
      product("003-a", "Seragam Pramuka L", "Koperasi Siswa Mandiri", 1, 150000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: "Istirahat 2",
      startAt: "12:15",
      endAt: "12:45",
      pickupCode: "194822",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-18T09:52:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-004",
    orderCode: "SC-KOP-20260818-004",
    status: "READY",
    paymentStatus: "HELD",
    totalPrice: 26000,
    createdAt: "2026-08-18T08:42:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-dewi",
      name: "Dewi Lestari",
      nis: "221032",
      className: "XI AKL 2",
      avatarUrl: null,
    },
    items: [
      product("004-a", "Map Folder", "Koperasi Sekolah", 2, 10000),
      product("004-b", "Pensil 2B Faber", "Koperasi Sekolah", 2, 3000),
    ],
    pickup: {
      status: "WAITING",
      slotLabel: "Istirahat 1",
      startAt: "10:30",
      endAt: "11:00",
      pickupCode: "441527",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-18T08:42:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-18T08:45:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-18T09:00:00+07:00"],
      ["READY", "Ready for Pickup", "Order is ready at the cooperative.", "2026-08-18T09:28:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-005",
    orderCode: "SC-KOP-20260817-005",
    status: "CONFIRMED",
    paymentStatus: "HELD",
    totalPrice: 22000,
    createdAt: "2026-08-17T11:05:00+07:00",
    merchantName: "Koperasi Siswa Mandiri",
    student: {
      id: "student-fajar",
      name: "Fajar Nugroho",
      nis: "221036",
      className: "X TKJ 2",
      avatarUrl: null,
    },
    items: [
      product("005-a", "Penggaris 30 cm", "Koperasi Siswa Mandiri", 2, 5000),
      product("005-b", "Penghapus Putih", "Koperasi Siswa Mandiri", 4, 3000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: "Istirahat 2",
      startAt: "12:15",
      endAt: "12:45",
      pickupCode: "309712",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-17T11:05:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-17T11:12:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-006",
    orderCode: "SC-KOP-20260817-006",
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    totalPrice: 85000,
    createdAt: "2026-08-17T10:20:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-gita",
      name: "Gita Maharani",
      nis: "221041",
      className: "XI MPLB 1",
      avatarUrl: null,
    },
    items: [
      product("006-a", "Topi Sekolah", "Koperasi Sekolah", 1, 85000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: null,
      startAt: null,
      endAt: null,
      pickupCode: null,
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-17T10:20:00+07:00"],
      ["CANCELLED", "Order Cancelled", "Order was cancelled and payment refunded.", "2026-08-17T10:27:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-007",
    orderCode: "SC-KOP-20260816-007",
    status: "COMPLETED",
    paymentStatus: "RELEASED",
    totalPrice: 36000,
    createdAt: "2026-08-16T09:10:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-hana",
      name: "Hana Putri",
      nis: "221046",
      className: "XII RPL 2",
      avatarUrl: null,
    },
    items: [
      product("007-a", "Buku Gambar A4", "Koperasi Sekolah", 3, 12000),
    ],
    pickup: {
      status: "PICKED_UP",
      slotLabel: "Istirahat 1",
      startAt: "10:30",
      endAt: "11:00",
      pickupCode: "751284",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-16T09:10:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-16T09:14:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-16T09:27:00+07:00"],
      ["READY", "Ready for Pickup", "Order is ready at the cooperative.", "2026-08-16T10:00:00+07:00"],
      ["COMPLETED", "Order Completed", "Student has picked up the order.", "2026-08-16T10:41:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-008",
    orderCode: "SC-KOP-20260816-008",
    status: "PREPARING",
    paymentStatus: "HELD",
    totalPrice: 18000,
    createdAt: "2026-08-16T10:02:00+07:00",
    merchantName: "Koperasi Siswa Mandiri",
    student: {
      id: "student-ivan",
      name: "Ivan Pratama",
      nis: "221050",
      className: "XI DKV 1",
      avatarUrl: null,
    },
    items: [
      product("008-a", "Spidol Hitam", "Koperasi Siswa Mandiri", 3, 6000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: "Istirahat 2",
      startAt: "12:15",
      endAt: "12:45",
      pickupCode: "568240",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-16T10:02:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-16T10:08:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-16T10:20:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-009",
    orderCode: "SC-KOP-20260815-009",
    status: "READY",
    paymentStatus: "HELD",
    totalPrice: 90000,
    createdAt: "2026-08-15T09:22:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-joko",
      name: "Joko Susilo",
      nis: "221054",
      className: "X TO 1",
      avatarUrl: null,
    },
    items: [
      product("009-a", "Seragam Olahraga", "Koperasi Sekolah", 1, 90000),
    ],
    pickup: {
      status: "WAITING",
      slotLabel: "Istirahat 1",
      startAt: "10:30",
      endAt: "11:00",
      pickupCode: "667419",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-15T09:22:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-15T09:25:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-15T09:40:00+07:00"],
      ["READY", "Ready for Pickup", "Order is ready at the cooperative.", "2026-08-15T10:08:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-010",
    orderCode: "SC-KOP-20260814-010",
    status: "WAITING",
    paymentStatus: "HELD",
    totalPrice: 14000,
    createdAt: "2026-08-14T11:14:00+07:00",
    merchantName: "Koperasi Siswa Mandiri",
    student: {
      id: "student-kiki",
      name: "Kiki Amelia",
      nis: "221059",
      className: "X AKL 1",
      avatarUrl: null,
    },
    items: [
      product("010-a", "Sticky Notes", "Koperasi Siswa Mandiri", 2, 7000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: "Istirahat 2",
      startAt: "12:15",
      endAt: "12:45",
      pickupCode: "205734",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-14T11:14:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-011",
    orderCode: "SC-KOP-20260813-011",
    status: "COMPLETED",
    paymentStatus: "RELEASED",
    totalPrice: 42000,
    createdAt: "2026-08-13T08:54:00+07:00",
    merchantName: "Koperasi Sekolah",
    student: {
      id: "student-lala",
      name: "Lala Safitri",
      nis: "221064",
      className: "XI RPL 2",
      avatarUrl: null,
    },
    items: [
      product("011-a", "Buku Tulis A5", "Koperasi Sekolah", 5, 6000),
      product("011-b", "Pulpen Gel", "Koperasi Sekolah", 3, 4000),
    ],
    pickup: {
      status: "PICKED_UP",
      slotLabel: "Istirahat 1",
      startAt: "10:30",
      endAt: "11:00",
      pickupCode: "984116",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-08-13T08:54:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-08-13T08:58:00+07:00"],
      ["PREPARING", "Preparing Order", "Merchant is preparing the items.", "2026-08-13T09:10:00+07:00"],
      ["READY", "Ready for Pickup", "Order is ready at the cooperative.", "2026-08-13T10:05:00+07:00"],
      ["COMPLETED", "Order Completed", "Student has picked up the order.", "2026-08-13T10:35:00+07:00"],
    ]),
  },
  {
    id: "cooperative-order-012",
    orderCode: "SC-KOP-20260725-012",
    status: "CONFIRMED",
    paymentStatus: "HELD",
    totalPrice: 28000,
    createdAt: "2026-07-25T10:30:00+07:00",
    merchantName: "Koperasi Siswa Mandiri",
    student: {
      id: "student-maya",
      name: "Maya Anggraini",
      nis: "221069",
      className: "XII MPLB 1",
      avatarUrl: null,
    },
    items: [
      product("012-a", "Kertas Folio", "Koperasi Siswa Mandiri", 4, 7000),
    ],
    pickup: {
      status: "NOT_READY",
      slotLabel: "Istirahat 2",
      startAt: "12:15",
      endAt: "12:45",
      pickupCode: "318602",
    },
    timeline: timeline([
      ["CREATED", "Order Created", "Order placed and payment verified.", "2026-07-25T10:30:00+07:00"],
      ["CONFIRMED", "Order Confirmed", "Merchant accepted the order.", "2026-07-25T10:38:00+07:00"],
    ]),
  },
];

export function getAdminCooperativeOrderById(id: string) {
  return adminCooperativeOrders.find((order) => order.id === id) ?? null;
}
