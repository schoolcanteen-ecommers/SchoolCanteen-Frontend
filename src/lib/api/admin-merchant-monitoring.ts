import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import type {
  MerchantStatus,
  MerchantType,
} from "@/types/merchant";

type AdminMerchantApiType =
  | "canteen"
  | "cooperative";

type AdminMerchantApiStatus =
  | "active"
  | "inactive";

interface ApiAdminMerchant {
  id: string;
  name: string;
  type: AdminMerchantApiType;
  description: string | null;
  logo_url: string | null;
  is_active: boolean;
  is_open: boolean;
  owner: {
    id: string;
    name: string;
    phone: string | null;
  } | null;
  wallet: {
    pending_balance: number;
    available_balance: number;
    total_balance: number;
    is_active: boolean;
  } | null;
  orders_count: number;
  products_count: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface AdminMerchantData {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  type: MerchantType;
  status: MerchantStatus;
  isOpen: boolean;
  owner: {
    id: string;
    name: string;
    phone: string | null;
  } | null;
  productsCount: number;
  ordersCount: number;
  createdAt: string | null;
}

export interface AdminMerchantFilters {
  page?: number;
  search?: string;
  type?: AdminMerchantApiType | "";
  status?: AdminMerchantApiStatus | "";
}

export interface AdminMerchantMonitoringStats {
  totalMerchants: number;
  activeMerchants: number;
  canteenMerchants: number;
  cooperativeMerchants: number;
}

export interface AdminMerchantsPageData {
  merchants: AdminMerchantData[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminMerchantManagementData {
  stats: AdminMerchantMonitoringStats;
  merchantPage: AdminMerchantsPageData;
}

const ADMIN_MERCHANT_PAGE_SIZE = 20;

function mapAdminMerchant(
  merchant: ApiAdminMerchant,
): AdminMerchantData {
  return {
    id: merchant.id,
    name: merchant.name,
    description: merchant.description,
    logoUrl: merchant.logo_url,
    type:
      merchant.type === "canteen"
        ? "CANTEEN"
        : "COOPERATIVE",
    status:
      merchant.is_active
        ? "ACTIVE"
        : "INACTIVE",
    isOpen: merchant.is_open,
    owner: merchant.owner,
    productsCount:
      merchant.products_count,
    ordersCount:
      merchant.orders_count,
    createdAt:
      merchant.created_at,
  };
}

function buildAdminMerchantQuery({
  page = 1,
  search,
  type,
  status,
}: AdminMerchantFilters): string {
  const params =
    new URLSearchParams();

  params.set(
    "page",
    String(Math.max(1, page)),
  );

  if (search?.trim()) {
    params.set(
      "search",
      search.trim(),
    );
  }

  if (type) {
    params.set("type", type);
  }

  if (status) {
    params.set(
      "status",
      status,
    );
  }

  return params.toString();
}

async function getAdminMerchantApiPage(
  filters: AdminMerchantFilters,
): Promise<AdminMerchantData[]> {
  const query =
    buildAdminMerchantQuery(
      filters,
    );

  const merchants =
    await authenticatedServerApiRequest<
      ApiAdminMerchant[]
    >(
      `/admin/merchants?${query}`,
    );

  return merchants.map(
    mapAdminMerchant,
  );
}

async function getAllAdminMerchants(
  filters: Omit<
    AdminMerchantFilters,
    "page"
  > = {},
): Promise<AdminMerchantData[]> {
  const merchants: AdminMerchantData[] =
    [];

  for (
    let page = 1;
    ;
    page += 1
  ) {
    const currentPage =
      await getAdminMerchantApiPage({
        ...filters,
        page,
      });

    merchants.push(...currentPage);

    if (
      currentPage.length <
      ADMIN_MERCHANT_PAGE_SIZE
    ) {
      break;
    }
  }

  return merchants;
}

export async function getAdminMerchantManagementData(
  filters: AdminMerchantFilters = {},
): Promise<AdminMerchantManagementData> {
  const normalizedPage =
    Math.max(1, filters.page ?? 1);

  const unfilteredMerchantsPromise =
    getAllAdminMerchants();

  const currentPagePromise =
    getAdminMerchantApiPage({
      ...filters,
      page: normalizedPage,
    });

  const hasScopedFilters = Boolean(
    filters.search?.trim() ||
      filters.type ||
      filters.status,
  );

  const filteredMerchantsPromise =
    hasScopedFilters
      ? getAllAdminMerchants({
          search: filters.search,
          type: filters.type,
          status: filters.status,
        })
      : unfilteredMerchantsPromise;

  const [
    unfilteredMerchants,
    currentPageMerchants,
    filteredMerchants,
  ] = await Promise.all([
    unfilteredMerchantsPromise,
    currentPagePromise,
    filteredMerchantsPromise,
  ]);

  const total =
    filteredMerchants.length;
  const totalPages = Math.max(
    1,
    Math.ceil(
      total /
        ADMIN_MERCHANT_PAGE_SIZE,
    ),
  );

  const from =
    total === 0
      ? 0
      : (normalizedPage - 1) *
          ADMIN_MERCHANT_PAGE_SIZE +
        1;
  const to =
    total === 0
      ? 0
      : Math.min(
          from +
            currentPageMerchants.length -
            1,
          total,
        );

  return {
    stats: {
      totalMerchants:
        unfilteredMerchants.length,
      activeMerchants:
        unfilteredMerchants.filter(
          (merchant) =>
            merchant.status ===
            "ACTIVE",
        ).length,
      canteenMerchants:
        unfilteredMerchants.filter(
          (merchant) =>
            merchant.type ===
            "CANTEEN",
        ).length,
      cooperativeMerchants:
        unfilteredMerchants.filter(
          (merchant) =>
            merchant.type ===
            "COOPERATIVE",
        ).length,
    },
    merchantPage: {
      merchants:
        currentPageMerchants,
      page: normalizedPage,
      pageSize:
        ADMIN_MERCHANT_PAGE_SIZE,
      total,
      totalPages,
      from,
      to,
      hasPreviousPage:
        normalizedPage > 1,
      hasNextPage:
        normalizedPage < totalPages,
    },
  };
}
