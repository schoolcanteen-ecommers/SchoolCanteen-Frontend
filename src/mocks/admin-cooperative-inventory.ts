import type {
  Product,
} from "@/types/product";

export type AdminInventoryHistoryType =
  | "IN"
  | "OUT";

export interface AdminInventoryHistoryEntry {
  type: AdminInventoryHistoryType;
  quantity: number;
  date: string;
}

export interface AdminCooperativeInventoryMetadata {
  lastUpdated: string;
  storageLocation: string;
  history: AdminInventoryHistoryEntry[];
}

export const ADMIN_COOPERATIVE_INVENTORY_WEEKLY_CHANGE =
  12;

const NAMED_METADATA: Record<
  string,
  AdminCooperativeInventoryMetadata
> = {
  "buku tulis a5": {
    lastUpdated:
      "12 Aug 2026, 14:30",
    storageLocation:
      "Rak A-12",
    history: [
      {
        type: "IN",
        quantity: 50,
        date: "12 Aug",
      },
      {
        type: "OUT",
        quantity: 10,
        date: "10 Aug",
      },
      {
        type: "IN",
        quantity: 100,
        date: "05 Aug",
      },
    ],
  },
  "pulpen gel": {
    lastUpdated:
      "11 Aug 2026, 10:15",
    storageLocation:
      "Rak A-08",
    history: [
      {
        type: "OUT",
        quantity: 12,
        date: "11 Aug",
      },
      {
        type: "IN",
        quantity: 20,
        date: "08 Aug",
      },
      {
        type: "OUT",
        quantity: 6,
        date: "06 Aug",
      },
    ],
  },
  "map folder": {
    lastUpdated:
      "08 Aug 2026, 09:40",
    storageLocation:
      "Rak B-02",
    history: [
      {
        type: "OUT",
        quantity: 8,
        date: "08 Aug",
      },
      {
        type: "OUT",
        quantity: 10,
        date: "07 Aug",
      },
      {
        type: "IN",
        quantity: 18,
        date: "04 Aug",
      },
    ],
  },
};

const LAST_UPDATED_OPTIONS = [
  "12 Aug 2026, 14:30",
  "12 Aug 2026, 11:20",
  "11 Aug 2026, 15:45",
  "10 Aug 2026, 09:10",
];

const STORAGE_LOCATION_OPTIONS = [
  "Rak A-12",
  "Rak A-08",
  "Rak B-04",
  "Rak C-07",
];

export function getAdminCooperativeInventoryMetadata(
  product: Product,
): AdminCooperativeInventoryMetadata {
  const named =
    NAMED_METADATA[
      product.name.trim().toLowerCase()
    ];

  if (named) {
    return named;
  }

  const variant =
    stableVariant(product.id);

  const stockIn =
    30 + variant * 10;
  const stockOut =
    5 + variant * 2;

  return {
    lastUpdated:
      LAST_UPDATED_OPTIONS[
        variant %
          LAST_UPDATED_OPTIONS.length
      ],
    storageLocation:
      STORAGE_LOCATION_OPTIONS[
        variant %
          STORAGE_LOCATION_OPTIONS.length
      ],
    history: [
      {
        type: "IN",
        quantity: stockIn,
        date: "12 Aug",
      },
      {
        type: "OUT",
        quantity: stockOut,
        date: "09 Aug",
      },
      {
        type: "IN",
        quantity: stockIn + 20,
        date: "05 Aug",
      },
    ],
  };
}

function stableVariant(
  value: string,
) {
  let total = 0;

  for (const character of value) {
    total += character.charCodeAt(0);
  }

  return total % 4;
}
