import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";
import {
  apiRequest,
} from "@/lib/api/client";

export type AdminCanteenAvailability =
  | ""
  | "in_stock"
  | "out_of_stock";

interface ApiAdminMerchant {
  id: string;
  name: string;
  type: "canteen" | "cooperative";
  is_active: boolean;
  products_count: number;
}

interface ApiPublicProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  is_active: boolean;
  merchant: {
    id: string;
    name: string;
    type: "canteen" | "cooperative";
    is_open: boolean;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  created_at: string | null;
}

export interface AdminCanteenProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  merchant: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  } | null;
}

export interface AdminCanteenMerchantOption {
  id: string;
  name: string;
  isActive: boolean;
  productsCount: number;
}

export interface AdminCanteenCategoryOption {
  id: string;
  name: string;
}

export interface AdminCanteenMenuFilters {
  page?: number;
  search?: string;
  merchantId?: string;
  categoryId?: string;
  availability?: AdminCanteenAvailability;
}

export interface AdminCanteenMenuStats {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
}

export interface AdminCanteenProductPageData {
  products: AdminCanteenProduct[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminCanteenMenuData {
  stats: AdminCanteenMenuStats;
  merchants: AdminCanteenMerchantOption[];
  categories: AdminCanteenCategoryOption[];
  productPage: AdminCanteenProductPageData;
}

export const CANTEEN_PRODUCT_PAGE_SIZE = 12;
const ADMIN_MERCHANT_PAGE_SIZE = 20;

function mapPublicProduct(
  product: ApiPublicProduct,
): AdminCanteenProduct {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.image_url,
    merchant: {
      id: product.merchant.id,
      name: product.merchant.name,
    },
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
        }
      : null,
  };
}

function buildPublicProductQuery(
  filters: Omit<AdminCanteenMenuFilters, "availability">,
  page: number,
): string {
  const params = new URLSearchParams();

  params.set("merchant_type", "canteen");
  params.set("page", String(Math.max(1, page)));

  if (filters.search?.trim()) {
    params.set("search", filters.search.trim());
  }

  if (filters.merchantId?.trim()) {
    params.set(
      "merchant_id",
      filters.merchantId.trim(),
    );
  }

  if (filters.categoryId?.trim()) {
    params.set(
      "category_id",
      filters.categoryId.trim(),
    );
  }

  return params.toString();
}

async function getPublicProductApiPage(
  filters: Omit<AdminCanteenMenuFilters, "availability">,
  page: number,
): Promise<AdminCanteenProduct[]> {
  const query = buildPublicProductQuery(
    filters,
    page,
  );

  const products = await apiRequest<
    ApiPublicProduct[]
  >(`/products?${query}`, {
    cache: "no-store",
  });

  return products.map(mapPublicProduct);
}

async function getAllPublicProducts(
  filters: Omit<AdminCanteenMenuFilters, "page" | "availability"> = {},
): Promise<AdminCanteenProduct[]> {
  const products: AdminCanteenProduct[] = [];

  for (let page = 1; ; page += 1) {
    const currentPage =
      await getPublicProductApiPage(
        filters,
        page,
      );

    products.push(...currentPage);

    if (
      currentPage.length <
      CANTEEN_PRODUCT_PAGE_SIZE
    ) {
      break;
    }
  }

  return products;
}

async function getAllAdminCanteenMerchants(): Promise<
  AdminCanteenMerchantOption[]
> {
  const merchants: AdminCanteenMerchantOption[] = [];

  for (let page = 1; ; page += 1) {
    const currentPage =
      await authenticatedServerApiRequest<
        ApiAdminMerchant[]
      >(
        `/admin/merchants?type=canteen&page=${page}`,
      );

    merchants.push(
      ...currentPage.map((merchant) => ({
        id: merchant.id,
        name: merchant.name,
        isActive: merchant.is_active,
        productsCount: merchant.products_count,
      })),
    );

    if (
      currentPage.length <
      ADMIN_MERCHANT_PAGE_SIZE
    ) {
      break;
    }
  }

  return merchants.sort((a, b) =>
    a.name.localeCompare(b.name, "id"),
  );
}

function filterAvailability(
  products: AdminCanteenProduct[],
  availability: AdminCanteenAvailability,
): AdminCanteenProduct[] {
  if (availability === "in_stock") {
    return products.filter(
      (product) => product.stock > 0,
    );
  }

  if (availability === "out_of_stock") {
    return products.filter(
      (product) => product.stock <= 0,
    );
  }

  return products;
}

function buildCategories(
  products: AdminCanteenProduct[],
): AdminCanteenCategoryOption[] {
  const categoryMap = new Map<
    string,
    AdminCanteenCategoryOption
  >();

  for (const product of products) {
    if (!product.category) {
      continue;
    }

    categoryMap.set(
      product.category.id,
      product.category,
    );
  }

  return Array.from(categoryMap.values()).sort(
    (a, b) =>
      a.name.localeCompare(b.name, "id"),
  );
}

function paginateProducts(
  products: AdminCanteenProduct[],
  page: number,
): AdminCanteenProductPageData {
  const normalizedPage = Math.max(1, page);
  const total = products.length;
  const totalPages = Math.max(
    1,
    Math.ceil(
      total / CANTEEN_PRODUCT_PAGE_SIZE,
    ),
  );
  const safePage = Math.min(
    normalizedPage,
    totalPages,
  );
  const start =
    (safePage - 1) *
    CANTEEN_PRODUCT_PAGE_SIZE;
  const pageProducts = products.slice(
    start,
    start + CANTEEN_PRODUCT_PAGE_SIZE,
  );
  const from = total === 0 ? 0 : start + 1;
  const to =
    total === 0
      ? 0
      : start + pageProducts.length;

  return {
    products: pageProducts,
    page: safePage,
    pageSize: CANTEEN_PRODUCT_PAGE_SIZE,
    total,
    totalPages,
    from,
    to,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };
}

export async function getAdminCanteenMenuData(
  filters: AdminCanteenMenuFilters = {},
): Promise<AdminCanteenMenuData> {
  const normalizedPage = Math.max(
    1,
    filters.page ?? 1,
  );
  const availability =
    filters.availability ?? "";

  const catalogProductsPromise =
    getAllPublicProducts();
  const merchantsPromise =
    getAllAdminCanteenMerchants();

  const hasScopedCatalogFilters = Boolean(
    filters.search?.trim() ||
      filters.merchantId?.trim() ||
      filters.categoryId?.trim(),
  );

  const filteredProductsPromise =
    hasScopedCatalogFilters
      ? getAllPublicProducts({
          search: filters.search,
          merchantId: filters.merchantId,
          categoryId: filters.categoryId,
        })
      : catalogProductsPromise;

  const [
    catalogProducts,
    merchants,
    filteredProducts,
  ] = await Promise.all([
    catalogProductsPromise,
    merchantsPromise,
    filteredProductsPromise,
  ]);

  const visibleProducts = filterAvailability(
    filteredProducts,
    availability,
  );

  return {
    stats: {
      totalProducts: merchants.reduce(
        (total, merchant) =>
          total + merchant.productsCount,
        0,
      ),
      activeProducts: catalogProducts.length,
      outOfStockProducts:
        catalogProducts.filter(
          (product) => product.stock <= 0,
        ).length,
    },
    merchants,
    categories: buildCategories(
      catalogProducts,
    ),
    productPage: paginateProducts(
      visibleProducts,
      normalizedPage,
    ),
  };
}
