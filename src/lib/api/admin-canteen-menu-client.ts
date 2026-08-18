"use client";

import {
  apiRequest,
} from "@/lib/api/client";
import type {
  AdminCanteenAvailability,
  AdminCanteenProduct,
} from "@/lib/api/admin-canteen-menu";

const CANTEEN_PRODUCT_PAGE_SIZE = 12;

interface ApiPublicProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  merchant: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  } | null;
}

export interface AdminCanteenClientFilters {
  search?: string;
  merchantId?: string;
  categoryId?: string;
  availability?: AdminCanteenAvailability;
}

function mapProduct(
  product: ApiPublicProduct,
): AdminCanteenProduct {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.image_url,
    merchant: product.merchant,
    category: product.category,
  };
}

function buildQuery(
  filters: AdminCanteenClientFilters,
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

async function getApiPage(
  filters: AdminCanteenClientFilters,
  page: number,
): Promise<AdminCanteenProduct[]> {
  const products = await apiRequest<
    ApiPublicProduct[]
  >(
    `/products?${buildQuery(filters, page)}`,
    {
      cache: "no-store",
    },
  );

  return products.map(mapProduct);
}

function applyAvailability(
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

export async function getCanteenMenuClientPage(
  filters: AdminCanteenClientFilters,
  page: number,
): Promise<{
  products: AdminCanteenProduct[];
  hasNextPage: boolean;
}> {
  const availability =
    filters.availability ?? "";

  if (!availability) {
    const products = await getApiPage(
      filters,
      page,
    );

    return {
      products,
      hasNextPage:
        products.length ===
        CANTEEN_PRODUCT_PAGE_SIZE,
    };
  }

  const allProducts: AdminCanteenProduct[] = [];

  for (
    let sourcePage = 1;
    ;
    sourcePage += 1
  ) {
    const currentPage = await getApiPage(
      filters,
      sourcePage,
    );

    allProducts.push(...currentPage);

    if (
      currentPage.length <
      CANTEEN_PRODUCT_PAGE_SIZE
    ) {
      break;
    }
  }

  const filteredProducts = applyAvailability(
    allProducts,
    availability,
  );
  const start =
    (Math.max(1, page) - 1) *
    CANTEEN_PRODUCT_PAGE_SIZE;
  const products = filteredProducts.slice(
    start,
    start + CANTEEN_PRODUCT_PAGE_SIZE,
  );

  return {
    products,
    hasNextPage:
      start + products.length <
      filteredProducts.length,
  };
}
