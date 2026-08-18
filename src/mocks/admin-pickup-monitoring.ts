export type AdminPickupOrderStatus =
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED";

export type AdminPickupStatus =
  | "WAITING"
  | "VERIFIED";

export interface AdminPickupMonitoringItem {
  id: string;
  productName: string;
  imageUrl?: string | null;
  quantity: number;
}

export interface AdminPickupTimeline {
  createdAt: string;
  confirmedAt?: string | null;
  preparingAt?: string | null;
  readyAt?: string | null;
  pickedUpAt?: string | null;
}

export interface AdminPickupMonitoringEntry {
  id: string;
  orderCode: string;

  student: {
    id: string;
    name: string;
    className: string;
  };

  merchant: {
    id: string;
    name: string;
    type: "canteen";
  };

  pickupSlot: {
    id: string;
    label: string;
    startTime: string;
    endTime: string;
  };

  pickupCode: string;
  orderStatus: AdminPickupOrderStatus;
  pickupStatus: AdminPickupStatus;
  pickedAt?: string | null;
  timeline: AdminPickupTimeline;
  items: AdminPickupMonitoringItem[];
}

const productImages = {
  geprek:
    "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=320&q=80",
  tea:
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=320&q=80",
  rice:
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=320&q=80",
  noodles:
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=320&q=80",
  bread:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=320&q=80",
} as const;

const entries: AdminPickupMonitoringEntry[] = [
  {
    id: "pickup-admin-001",
    orderCode: "SC-20260817-001",
    student: {
      id: "student-001",
      name: "Andi Saputra",
      className: "XI RPL 1",
    },
    merchant: {
      id: "merchant-kantin-1",
      name: "Kantin Bu Ani",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-1",
      label: "Istirahat Pertama",
      startTime: "10:30",
      endTime: "11:00",
    },
    pickupCode: "632308",
    orderStatus: "READY",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T09:15:00+07:00",
      confirmedAt: "2026-08-17T09:20:00+07:00",
      preparingAt: "2026-08-17T09:30:00+07:00",
      readyAt: "2026-08-17T10:15:00+07:00",
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-001",
        productName: "Nasi Ayam Geprek",
        imageUrl: productImages.geprek,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-002",
    orderCode: "SC-20260817-002",
    student: {
      id: "student-002",
      name: "Budi Santoso",
      className: "XI TKJ 1",
    },
    merchant: {
      id: "merchant-kantin-2",
      name: "Kantin Sehat",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-2",
      label: "Istirahat Kedua",
      startTime: "11:00",
      endTime: "11:30",
    },
    pickupCode: "823104",
    orderStatus: "COMPLETED",
    pickupStatus: "VERIFIED",
    pickedAt: "2026-08-17T11:08:00+07:00",
    timeline: {
      createdAt: "2026-08-17T09:30:00+07:00",
      confirmedAt: "2026-08-17T09:35:00+07:00",
      preparingAt: "2026-08-17T09:45:00+07:00",
      readyAt: "2026-08-17T10:45:00+07:00",
      pickedUpAt: "2026-08-17T11:08:00+07:00",
    },
    items: [
      {
        id: "pickup-item-002",
        productName: "Nasi Goreng",
        imageUrl: productImages.rice,
        quantity: 1,
      },
      {
        id: "pickup-item-003",
        productName: "Es Teh Manis",
        imageUrl: productImages.tea,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-003",
    orderCode: "SC-20260817-003",
    student: {
      id: "student-003",
      name: "Citra Lestari",
      className: "XII RPL 1",
    },
    merchant: {
      id: "merchant-kantin-1",
      name: "Kantin Bu Ani",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-2",
      label: "Istirahat Kedua",
      startTime: "11:00",
      endTime: "11:30",
    },
    pickupCode: "194822",
    orderStatus: "READY",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T09:40:00+07:00",
      confirmedAt: "2026-08-17T09:45:00+07:00",
      preparingAt: "2026-08-17T10:00:00+07:00",
      readyAt: "2026-08-17T10:48:00+07:00",
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-004",
        productName: "Mie Goreng",
        imageUrl: productImages.noodles,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-004",
    orderCode: "SC-20260817-004",
    student: {
      id: "student-004",
      name: "Dimas Akbar",
      className: "X AKL 1",
    },
    merchant: {
      id: "merchant-kantin-3",
      name: "Kantin Pak Budi",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-3",
      label: "Istirahat Siang",
      startTime: "12:00",
      endTime: "12:30",
    },
    pickupCode: "407513",
    orderStatus: "PREPARING",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T10:05:00+07:00",
      confirmedAt: "2026-08-17T10:10:00+07:00",
      preparingAt: "2026-08-17T10:22:00+07:00",
      readyAt: null,
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-005",
        productName: "Roti Bakar Cokelat",
        imageUrl: productImages.bread,
        quantity: 2,
      },
    ],
  },
  {
    id: "pickup-admin-005",
    orderCode: "SC-20260817-005",
    student: {
      id: "student-005",
      name: "Fajar Nugraha",
      className: "XI RPL 2",
    },
    merchant: {
      id: "merchant-kantin-2",
      name: "Kantin Sehat",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-3",
      label: "Istirahat Siang",
      startTime: "12:00",
      endTime: "12:30",
    },
    pickupCode: "551970",
    orderStatus: "CONFIRMED",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T10:15:00+07:00",
      confirmedAt: "2026-08-17T10:20:00+07:00",
      preparingAt: null,
      readyAt: null,
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-006",
        productName: "Nasi Ayam Geprek",
        imageUrl: productImages.geprek,
        quantity: 1,
      },
      {
        id: "pickup-item-007",
        productName: "Es Teh Manis",
        imageUrl: productImages.tea,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-006",
    orderCode: "SC-20260817-006",
    student: {
      id: "student-006",
      name: "Siti Aminah",
      className: "XII TKJ 1",
    },
    merchant: {
      id: "merchant-kantin-1",
      name: "Kantin Bu Ani",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-3",
      label: "Istirahat Siang",
      startTime: "12:00",
      endTime: "12:30",
    },
    pickupCode: "770421",
    orderStatus: "READY",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T10:20:00+07:00",
      confirmedAt: "2026-08-17T10:25:00+07:00",
      preparingAt: "2026-08-17T10:35:00+07:00",
      readyAt: "2026-08-17T11:20:00+07:00",
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-008",
        productName: "Nasi Goreng",
        imageUrl: productImages.rice,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-007",
    orderCode: "SC-20260817-007",
    student: {
      id: "student-007",
      name: "Rizky Maulana",
      className: "XI DKV 1",
    },
    merchant: {
      id: "merchant-kantin-3",
      name: "Kantin Pak Budi",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-4",
      label: "Pulang Sekolah",
      startTime: "14:30",
      endTime: "15:00",
    },
    pickupCode: "318664",
    orderStatus: "READY",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T11:05:00+07:00",
      confirmedAt: "2026-08-17T11:10:00+07:00",
      preparingAt: "2026-08-17T11:25:00+07:00",
      readyAt: "2026-08-17T12:05:00+07:00",
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-009",
        productName: "Mie Goreng",
        imageUrl: productImages.noodles,
        quantity: 2,
      },
    ],
  },
  {
    id: "pickup-admin-008",
    orderCode: "SC-20260817-008",
    student: {
      id: "student-008",
      name: "Nabila Putri",
      className: "X RPL 1",
    },
    merchant: {
      id: "merchant-kantin-2",
      name: "Kantin Sehat",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-1",
      label: "Istirahat Pertama",
      startTime: "10:30",
      endTime: "11:00",
    },
    pickupCode: "905122",
    orderStatus: "COMPLETED",
    pickupStatus: "VERIFIED",
    pickedAt: "2026-08-17T10:52:00+07:00",
    timeline: {
      createdAt: "2026-08-17T08:55:00+07:00",
      confirmedAt: "2026-08-17T09:00:00+07:00",
      preparingAt: "2026-08-17T09:10:00+07:00",
      readyAt: "2026-08-17T10:10:00+07:00",
      pickedUpAt: "2026-08-17T10:52:00+07:00",
    },
    items: [
      {
        id: "pickup-item-010",
        productName: "Roti Bakar Cokelat",
        imageUrl: productImages.bread,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-009",
    orderCode: "SC-20260817-009",
    student: {
      id: "student-009",
      name: "Dewi Lestari",
      className: "XI AKL 1",
    },
    merchant: {
      id: "merchant-kantin-1",
      name: "Kantin Bu Ani",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-4",
      label: "Pulang Sekolah",
      startTime: "14:30",
      endTime: "15:00",
    },
    pickupCode: "468315",
    orderStatus: "PREPARING",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T11:30:00+07:00",
      confirmedAt: "2026-08-17T11:35:00+07:00",
      preparingAt: "2026-08-17T11:50:00+07:00",
      readyAt: null,
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-011",
        productName: "Nasi Ayam Geprek",
        imageUrl: productImages.geprek,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-010",
    orderCode: "SC-20260817-010",
    student: {
      id: "student-010",
      name: "Bayu Ramadhan",
      className: "XII RPL 2",
    },
    merchant: {
      id: "merchant-kantin-3",
      name: "Kantin Pak Budi",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-2",
      label: "Istirahat Kedua",
      startTime: "11:00",
      endTime: "11:30",
    },
    pickupCode: "230765",
    orderStatus: "COMPLETED",
    pickupStatus: "VERIFIED",
    pickedAt: "2026-08-17T11:23:00+07:00",
    timeline: {
      createdAt: "2026-08-17T09:25:00+07:00",
      confirmedAt: "2026-08-17T09:30:00+07:00",
      preparingAt: "2026-08-17T09:40:00+07:00",
      readyAt: "2026-08-17T10:42:00+07:00",
      pickedUpAt: "2026-08-17T11:23:00+07:00",
    },
    items: [
      {
        id: "pickup-item-012",
        productName: "Es Teh Manis",
        imageUrl: productImages.tea,
        quantity: 2,
      },
    ],
  },
  {
    id: "pickup-admin-011",
    orderCode: "SC-20260817-011",
    student: {
      id: "student-011",
      name: "Alya Rahma",
      className: "XI DKV 2",
    },
    merchant: {
      id: "merchant-kantin-2",
      name: "Kantin Sehat",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-4",
      label: "Pulang Sekolah",
      startTime: "14:30",
      endTime: "15:00",
    },
    pickupCode: "841206",
    orderStatus: "READY",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T11:40:00+07:00",
      confirmedAt: "2026-08-17T11:45:00+07:00",
      preparingAt: "2026-08-17T12:00:00+07:00",
      readyAt: "2026-08-17T13:15:00+07:00",
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-013",
        productName: "Nasi Goreng",
        imageUrl: productImages.rice,
        quantity: 1,
      },
    ],
  },
  {
    id: "pickup-admin-012",
    orderCode: "SC-20260817-012",
    student: {
      id: "student-012",
      name: "Reza Pratama",
      className: "X TKJ 2",
    },
    merchant: {
      id: "merchant-kantin-1",
      name: "Kantin Bu Ani",
      type: "canteen",
    },
    pickupSlot: {
      id: "slot-4",
      label: "Pulang Sekolah",
      startTime: "14:30",
      endTime: "15:00",
    },
    pickupCode: "126590",
    orderStatus: "CONFIRMED",
    pickupStatus: "WAITING",
    pickedAt: null,
    timeline: {
      createdAt: "2026-08-17T12:05:00+07:00",
      confirmedAt: "2026-08-17T12:10:00+07:00",
      preparingAt: null,
      readyAt: null,
      pickedUpAt: null,
    },
    items: [
      {
        id: "pickup-item-014",
        productName: "Roti Bakar Cokelat",
        imageUrl: productImages.bread,
        quantity: 1,
      },
    ],
  },
];

export const adminPickupMonitoringEntries = entries;

export function getAdminPickupMonitoringEntry(
  id: string,
): AdminPickupMonitoringEntry | undefined {
  return entries.find((entry) => entry.id === id);
}
