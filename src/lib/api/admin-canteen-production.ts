// TEMPORARY FRONTEND-ONLY DATA ADAPTER.

export type AdminProductionStatus =
  | "CONFIRMED"
  | "PREPARING"
  | "READY";

export interface AdminProductionMerchantOption {
  id: string;
  name: string;
  isActive: boolean;
}

export interface AdminProductionPickupSlotOption {
  id: string;
  merchantId: string;
  merchantName: string;
  startAt: string;
  endAt: string;
}

export interface AdminProductionRow {
  id: string;
  merchant: {
    id: string;
    name: string;
    type: "CANTEEN";
    ownerName: string | null;
  };
  product: {
    id: string | null;
    name: string;
  };
  pickupSlot: {
    id: string | null;
    startAt: string | null;
    endAt: string | null;
  };
  status: AdminProductionStatus;
  quantity: number;
  orderCount: number;
  customerCount: number;
}

export interface AdminProductionStats {
  totalOrdersToday: number;
  productsToPrepare: number;
  activeCanteens: number;
}

export interface AdminProductionPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminCanteenProductionFilters {
  page?: number;
  search?: string;
  merchantId?: string;
  pickupSlotId?: string;
  status?: AdminProductionStatus | "";
}

export interface AdminCanteenProductionData {
  stats: AdminProductionStats;
  merchants: AdminProductionMerchantOption[];
  pickupSlots: AdminProductionPickupSlotOption[];
  rows: AdminProductionRow[];
  pagination: AdminProductionPagination;
}

export interface AdminProductionProgressItem {
  status: AdminProductionStatus;
  orderCount: number;
  quantity: number;
}

export interface AdminCanteenProductionDetail
  extends AdminProductionRow {
  progress: AdminProductionProgressItem[];
}

const PAGE_SIZE = 6;

const MOCK_STATS: AdminProductionStats = {
  totalOrdersToday: 148,
  productsToPrepare: 26,
  activeCanteens: 12,
};

const MOCK_MERCHANTS: AdminProductionMerchantOption[] = [
  { id: "canteen-01", name: "Kantin Bu Ani", isActive: true },
  { id: "canteen-02", name: "Kantin Sehat Utama", isActive: true },
  { id: "canteen-03", name: "Minuman Mang Udin", isActive: true },
  { id: "canteen-04", name: "Kantin Pak Budi", isActive: true },
  { id: "canteen-05", name: "Warung Bu Tedjo", isActive: true },
  { id: "canteen-06", name: "Kantin Ceria", isActive: true },
  { id: "canteen-07", name: "Dapur Sekolah", isActive: true },
  { id: "canteen-08", name: "Kantin Nusantara", isActive: true },
  { id: "canteen-09", name: "Pojok Jajanan", isActive: true },
  { id: "canteen-10", name: "Kantin Hijau", isActive: true },
  { id: "canteen-11", name: "Warung Pelajar", isActive: true },
  { id: "canteen-12", name: "Kantin Bersama", isActive: true },
];

const MOCK_OWNERS: Record<string, string> = {
  "canteen-01": "Ibu Ani",
  "canteen-02": "Ibu Sari",
  "canteen-03": "Pak Udin",
  "canteen-04": "Pak Budi",
  "canteen-05": "Ibu Tedjo",
  "canteen-06": "Ibu Rina",
  "canteen-07": "Pak Agus",
  "canteen-08": "Ibu Wati",
  "canteen-09": "Pak Joko",
  "canteen-10": "Ibu Nia",
  "canteen-11": "Pak Dedi",
  "canteen-12": "Ibu Maya",
};

const MOCK_PICKUP_SLOTS: AdminProductionPickupSlotOption[] = [
  makeSlot("slot-01", "canteen-01", "2026-08-17T09:00:00+07:00", "2026-08-17T10:00:00+07:00"),
  makeSlot("slot-02", "canteen-01", "2026-08-17T10:00:00+07:00", "2026-08-17T11:00:00+07:00"),
  makeSlot("slot-03", "canteen-02", "2026-08-17T09:00:00+07:00", "2026-08-17T10:00:00+07:00"),
  makeSlot("slot-04", "canteen-02", "2026-08-17T12:00:00+07:00", "2026-08-17T13:00:00+07:00"),
  makeSlot("slot-05", "canteen-03", "2026-08-17T10:00:00+07:00", "2026-08-17T11:00:00+07:00"),
  makeSlot("slot-06", "canteen-03", "2026-08-17T12:00:00+07:00", "2026-08-17T13:00:00+07:00"),
  makeSlot("slot-07", "canteen-04", "2026-08-17T11:00:00+07:00", "2026-08-17T12:00:00+07:00"),
  makeSlot("slot-08", "canteen-05", "2026-08-17T12:00:00+07:00", "2026-08-17T13:00:00+07:00"),
];

const MOCK_PRODUCTS = [
  "Nasi Ayam Geprek",
  "Es Teh Manis",
  "Salad Buah Segar",
  "Risol Mayo Premium",
  "Nasi Goreng Kampung",
  "Mie Goreng Jawa",
  "Soto Ayam",
  "Bakso Kuah",
  "Ayam Katsu Rice",
  "Nasi Telur Crispy",
  "Chicken Teriyaki",
  "Seblak Original",
  "Siomay Bandung",
  "Batagor",
  "Kentang Goreng",
  "Roti Bakar Cokelat",
  "Pisang Cokelat",
  "Donat Gula",
  "Puding Cokelat",
  "Es Jeruk",
  "Jus Mangga",
  "Susu Cokelat",
  "Air Mineral",
  "Teh Tarik",
  "Lemon Tea",
  "Es Cokelat Jumbo",
] as const;

const MOCK_ROWS: AdminProductionRow[] =
  MOCK_PRODUCTS.map((productName, index) => {
    const merchant =
      MOCK_MERCHANTS[index % MOCK_MERCHANTS.length];
    const merchantSlots = MOCK_PICKUP_SLOTS.filter(
      (slot) => slot.merchantId === merchant.id,
    );
    const slot =
      merchantSlots[index % Math.max(1, merchantSlots.length)] ??
      createFallbackSlot(merchant, index);
    const status = getMockStatus(index);
    const quantity = 8 + ((index * 7) % 35);
    const orderCount = Math.max(
      1,
      quantity - (index % 5),
    );
    const customerCount = Math.max(
      1,
      orderCount - (index % 3),
    );

    return {
      id: `mock-production-${String(index + 1).padStart(2, "0")}`,
      merchant: {
        id: merchant.id,
        name: merchant.name,
        type: "CANTEEN",
        ownerName: MOCK_OWNERS[merchant.id] ?? null,
      },
      product: {
        id: `mock-product-${String(index + 1).padStart(2, "0")}`,
        name: productName,
      },
      pickupSlot: {
        id: slot.id,
        startAt: slot.startAt,
        endAt: slot.endAt,
      },
      status,
      quantity,
      orderCount,
      customerCount,
    };
  });

export async function getAdminCanteenProductionData(
  filters: AdminCanteenProductionFilters = {},
): Promise<AdminCanteenProductionData> {
  const page = Math.max(1, filters.page ?? 1);
  const search = filters.search?.trim().toLowerCase() ?? "";

  const filteredRows = MOCK_ROWS.filter((row) => {
    const matchesSearch =
      !search ||
      row.product.name.toLowerCase().includes(search) ||
      row.merchant.name.toLowerCase().includes(search);
    const matchesMerchant =
      !filters.merchantId ||
      row.merchant.id === filters.merchantId;
    const matchesPickup =
      !filters.pickupSlotId ||
      row.pickupSlot.id === filters.pickupSlotId;
    const matchesStatus =
      !filters.status || row.status === filters.status;

    return (
      matchesSearch &&
      matchesMerchant &&
      matchesPickup &&
      matchesStatus
    );
  });

  const total = filteredRows.length;
  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const rows = filteredRows.slice(
    start,
    start + PAGE_SIZE,
  );

  return Promise.resolve({
    stats: MOCK_STATS,
    merchants: MOCK_MERCHANTS,
    pickupSlots: MOCK_PICKUP_SLOTS,
    rows,
    pagination: {
      page: safePage,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      hasPreviousPage: safePage > 1,
      hasNextPage: safePage < totalPages,
    },
  });
}

export async function getAdminCanteenProductionDetail(
  id: string,
): Promise<AdminCanteenProductionDetail | null> {
  const row = MOCK_ROWS.find(
    (candidate) => candidate.id === id,
  );

  if (!row) {
    return Promise.resolve(null);
  }

  return Promise.resolve({
    ...row,
    progress: buildMockProgress(row),
  });
}

function buildMockProgress(
  row: AdminProductionRow,
): AdminProductionProgressItem[] {
  const confirmedOrders = Math.max(
    1,
    Math.floor(row.orderCount * 0.2),
  );
  const confirmedQuantity = Math.max(
    1,
    Math.floor(row.quantity * 0.2),
  );

  if (row.status === "CONFIRMED") {
    return [
      {
        status: "CONFIRMED",
        orderCount: row.orderCount,
        quantity: row.quantity,
      },
      {
        status: "PREPARING",
        orderCount: 0,
        quantity: 0,
      },
      {
        status: "READY",
        orderCount: 0,
        quantity: 0,
      },
    ];
  }

  if (row.status === "PREPARING") {
    return [
      {
        status: "CONFIRMED",
        orderCount: confirmedOrders,
        quantity: confirmedQuantity,
      },
      {
        status: "PREPARING",
        orderCount: Math.max(
          0,
          row.orderCount - confirmedOrders,
        ),
        quantity: Math.max(
          0,
          row.quantity - confirmedQuantity,
        ),
      },
      {
        status: "READY",
        orderCount: 0,
        quantity: 0,
      },
    ];
  }

  const readyOrders = Math.max(
    1,
    Math.floor(row.orderCount * 0.65),
  );
  const readyQuantity = Math.max(
    1,
    Math.floor(row.quantity * 0.65),
  );
  const preparingOrders = Math.max(
    0,
    row.orderCount - confirmedOrders - readyOrders,
  );
  const preparingQuantity = Math.max(
    0,
    row.quantity - confirmedQuantity - readyQuantity,
  );

  return [
    {
      status: "CONFIRMED",
      orderCount: confirmedOrders,
      quantity: confirmedQuantity,
    },
    {
      status: "PREPARING",
      orderCount: preparingOrders,
      quantity: preparingQuantity,
    },
    {
      status: "READY",
      orderCount: readyOrders,
      quantity: readyQuantity,
    },
  ];
}

function getMockStatus(
  index: number,
): AdminProductionStatus {
  if (index % 5 === 2) {
    return "READY";
  }

  if (index % 4 === 0) {
    return "CONFIRMED";
  }

  return "PREPARING";
}

function makeSlot(
  id: string,
  merchantId: string,
  startAt: string,
  endAt: string,
): AdminProductionPickupSlotOption {
  const merchant = MOCK_MERCHANTS.find(
    (item) => item.id === merchantId,
  );

  return {
    id,
    merchantId,
    merchantName: merchant?.name ?? "Kantin",
    startAt,
    endAt,
  };
}

function createFallbackSlot(
  merchant: AdminProductionMerchantOption,
  index: number,
): AdminProductionPickupSlotOption {
  const startHour = 9 + (index % 4);
  const endHour = startHour + 1;
  const format = (hour: number) =>
    `2026-08-17T${String(hour).padStart(2, "0")}:00:00+07:00`;

  return {
    id: `slot-${merchant.id}-${startHour}`,
    merchantId: merchant.id,
    merchantName: merchant.name,
    startAt: format(startHour),
    endAt: format(endHour),
  };
}
