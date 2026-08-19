import type { Merchant } from "@/types/merchant";
import type {
  Category,
  Product,
} from "@/types/product";

import { apiRequest } from "@/lib/api/client";


export interface ApiMerchant {
  id: string;
  owner_user_id: string;

  name: string;

  type: "canteen" | "cooperative";

  description: string | null;
  logo_url: string | null;

  is_active: boolean;
  is_open: boolean;

  products_count: number;

  created_at: string | null;
}

interface ApiProductMerchant {
  id: string;
  name: string;

  type: "canteen" | "cooperative";

  is_open: boolean;
}

interface ApiProductCategory {
  id: string;
  name: string;
  slug: string;
}

interface ApiProductModifierOption {
  id: string;
  name: string;
  price_delta: number;
}

interface ApiProductModifierGroup {
  id: string;
  name: string;

  selection_type:
    "single" | "multiple";

  is_required: boolean;

  min_select: number;
  max_select: number;

  options: ApiProductModifierOption[];
}

interface ApiProduct {
  id: string;

  name: string;
  slug: string;

  description: string | null;

  price: number;
  stock: number;

  image_url: string | null;

  is_active: boolean;

  has_modifiers?: boolean;
  requires_customization?: boolean;

  /*
   * Product detail mengirim full groups.
   * Catalog/read-model boleh tidak mengirimnya.
   */
  modifier_groups?: ApiProductModifierGroup[];

  merchant: ApiProductMerchant;

  category: ApiProductCategory | null;

  created_at: string | null;

  /*
   * Hanya tersedia ketika detail dipanggil
   * dengan ?include_related=1.
   */
  related_products?: ApiProduct[];

}


export function mapMerchant(
  merchant: ApiMerchant,
): Merchant {
  return {
    id: merchant.id,

    ownerId:
      merchant.owner_user_id,

    name:
      merchant.name,

    type:
      merchant.type === "canteen"
        ? "CANTEEN"
        : "COOPERATIVE",

    description:
      merchant.description,

    imageUrl:
      merchant.logo_url,

    status:
      merchant.is_active
        ? "ACTIVE"
        : "INACTIVE",

    productsCount:
      merchant.products_count,
  };
}

function mapProduct(
  product: ApiProduct,
): Product {
  return {
    id:
      product.id,

    merchantId:
      product.merchant.id,

    categoryId:
      product.category?.id ?? "",

    name:
      product.name,

    description:
      product.description,

    price:
      product.price,

    stock:
      product.stock,

    imageUrl:
      product.image_url,

    isActive:
      product.is_active,
<<<<<<< HEAD
  };
}

function buildCategories(
  products: ApiProduct[],
): Category[] {
  const categoryMap =
    new Map<string, Category>();

  for (const product of products) {
    if (!product.category) {
      continue;
    }

    categoryMap.set(
      product.category.id,
      {
        id:
          product.category.id,

        merchantId:
          product.merchant.id,

        name:
          product.category.name,
      },
    );
  }

  return Array.from(
    categoryMap.values(),
  );
}

=======

    hasModifiers:
      product.has_modifiers ?? false,

    requiresCustomization:
      product.requires_customization ?? false,

    modifierGroups:
      (
        product.modifier_groups ??
        []
      ).map((group) => ({
        id:
          group.id,

        name:
          group.name,

        selectionType:
          group.selection_type,

        isRequired:
          group.is_required,

        minSelect:
          group.min_select,

        maxSelect:
          group.max_select,

        options:
          group.options.map(
            (option) => ({
              id:
                option.id,

              name:
                option.name,

              priceDelta:
                option.price_delta,
            }),
          ),
      })),
  };
}

function buildCategories(
  products: ApiProduct[],
): Category[] {
  const categoryMap =
    new Map<string, Category>();

  for (const product of products) {
    if (!product.category) {
      continue;
    }

    categoryMap.set(
      product.category.id,
      {
        id:
          product.category.id,

        merchantId:
          product.merchant.id,

        name:
          product.category.name,
      },
    );
  }

  return Array.from(
    categoryMap.values(),
  );
}


export type PublicCatalogType =
  | "canteen"
  | "cooperative";

interface ApiPublicHomeSection {
  products: ApiProduct[];
}

interface ApiPublicHomeResponse {
  canteen: ApiPublicHomeSection;
  cooperative: ApiPublicHomeSection;
}

interface ApiPublicCatalogResponse {
  merchants: ApiMerchant[];
  products: ApiProduct[];
  categories: unknown[];
}

function buildHomeMerchants(
  products: ApiProduct[],
): Merchant[] {
  const merchantMap =
    new Map<string, Merchant>();

  for (const product of products) {
    const current =
      merchantMap.get(
        product.merchant.id,
      );

    if (current) {
      merchantMap.set(
        product.merchant.id,
        {
          ...current,

          productsCount:
            (current.productsCount ?? 0)
            + 1,
        },
      );

      continue;
    }

    merchantMap.set(
      product.merchant.id,
      {
        id:
          product.merchant.id,

        ownerId:
          "",

        name:
          product.merchant.name,

        type:
          product.merchant.type ===
          "canteen"
            ? "CANTEEN"
            : "COOPERATIVE",

        description:
          null,

        imageUrl:
          null,

        status:
          "ACTIVE",

        productsCount:
          1,
      },
    );
  }

  return Array.from(
    merchantMap.values(),
  );
}

function mapPublicHomeSection(
  section: ApiPublicHomeSection,
) {
  return {
    merchants:
      buildHomeMerchants(
        section.products,
      ),

    products:
      section.products.map(
        mapProduct,
      ),

    categories:
      buildCategories(
        section.products,
      ),
  };
}

export async function getPublicHomeCatalog() {
  const response =
    await apiRequest<
      ApiPublicHomeResponse
    >(
      "/public/home",
      {
        cache: "no-store",
      },
    );

  return {
    canteen:
      mapPublicHomeSection(
        response.canteen,
      ),

    cooperative:
      mapPublicHomeSection(
        response.cooperative,
      ),
  };
}

export async function getPublicCatalog(
  type: PublicCatalogType,
) {
  const response =
    await apiRequest<
      ApiPublicCatalogResponse
    >(
      `/public/catalog?type=${encodeURIComponent(
        type,
      )}`,
      {
        cache: "no-store",
      },
    );

  return {
    merchants:
      response.merchants.map(
        mapMerchant,
      ),

    products:
      response.products.map(
        mapProduct,
      ),

    categories:
      buildCategories(
        response.products,
      ),
  };
}

>>>>>>> source/main

export async function getCanteenCatalog() {
  const [
    apiMerchants,
    apiProducts,
  ] = await Promise.all([
    apiRequest<ApiMerchant[]>(
      "/merchants?type=canteen",
      {
        cache: "no-store",
      },
    ),

    apiRequest<ApiProduct[]>(
      "/products?merchant_type=canteen",
      {
        cache: "no-store",
      },
    ),
  ]);

  return {
    merchants:
      apiMerchants.map(
        mapMerchant,
      ),

    products:
      apiProducts.map(
        mapProduct,
      ),

    categories:
      buildCategories(
        apiProducts,
      ),
  };
}


export async function getCooperativeCatalog() {
  const [
    apiMerchants,
    apiProducts,
  ] = await Promise.all([
    apiRequest<ApiMerchant[]>(
      "/merchants?type=cooperative",
      {
        cache: "no-store",
      },
    ),

    apiRequest<ApiProduct[]>(
      "/products?merchant_type=cooperative",
      {
        cache: "no-store",
      },
    ),
  ]);

  return {
    merchants:
      apiMerchants.map(
        mapMerchant,
      ),

    products:
      apiProducts.map(
        mapProduct,
      ),

    categories:
      buildCategories(
        apiProducts,
      ),
  };
}


<<<<<<< HEAD
export async function getProductDetail(
  productId: string,
) {
=======
export async function getProductCustomization(
  productId: string,
): Promise<Product> {
>>>>>>> source/main
  const apiProduct =
    await apiRequest<ApiProduct>(
      `/products/${encodeURIComponent(
        productId,
      )}`,
      {
        cache: "no-store",
      },
    );

<<<<<<< HEAD
=======
  return mapProduct(
    apiProduct,
  );
}


export async function getProductDetail(
  productId: string,
) {
  const apiProduct =
    await apiRequest<ApiProduct>(
      `/products/${encodeURIComponent(
        productId,
      )}?include_related=1`,
      {
        cache: "no-store",
      },
    );

>>>>>>> source/main
  const product =
    mapProduct(apiProduct);

  const merchant: Merchant = {
    id:
      apiProduct.merchant.id,

    ownerId:
      "",

    name:
      apiProduct.merchant.name,

    type:
      apiProduct.merchant.type ===
      "canteen"
        ? "CANTEEN"
        : "COOPERATIVE",

    description:
      null,

    imageUrl:
      null,

    status:
      "ACTIVE",
  };

  const category: Category | null =
    apiProduct.category
      ? {
          id:
            apiProduct.category.id,

          merchantId:
            apiProduct.merchant.id,

          name:
            apiProduct.category.name,
        }
      : null;

<<<<<<< HEAD
  const relatedApiProducts =
    await apiRequest<ApiProduct[]>(
      `/products?merchant_id=${encodeURIComponent(
        apiProduct.merchant.id,
      )}`,
      {
        cache: "no-store",
      },
    );

  const relatedProducts =
    relatedApiProducts
      .map(mapProduct)
=======
  const relatedProducts =
    (
      apiProduct.related_products ??
      []
    )
      .map(
        mapProduct,
      )
>>>>>>> source/main
      .filter(
        (item) =>
          item.id !== product.id,
      )
<<<<<<< HEAD
      .slice(0, 4);
=======
      .slice(
        0,
        4,
      );
>>>>>>> source/main

  return {
    product,
    merchant,
    category,
    relatedProducts,
  };
}


<<<<<<< HEAD
export async function getCartProduct(
  productId: string,
): Promise<{
  product: Product;
=======
interface ApiResolvedProductsResponse {
  products: ApiProduct[];
  unavailable_product_ids: string[];
}

export interface ResolvedCartProduct {
  product: Product;

>>>>>>> source/main
  merchant: Pick<
    Merchant,
    "id" | "name" | "type"
  >;
<<<<<<< HEAD
}> {
  const apiProduct =
    await apiRequest<ApiProduct>(
      `/products/${encodeURIComponent(
        productId,
      )}`,
      {
        cache: "no-store",
      },
    );

=======
}

export interface ResolveCartProductsResult {
  products: ResolvedCartProduct[];
  unavailableProductIds: string[];
}

function mapResolvedCartProduct(
  apiProduct: ApiProduct,
): ResolvedCartProduct {
>>>>>>> source/main
  const merchantType: Merchant["type"] =
    apiProduct.merchant.type ===
    "canteen"
      ? "CANTEEN"
      : "COOPERATIVE";

  return {
    product:
      mapProduct(apiProduct),

    merchant: {
      id:
        apiProduct.merchant.id,

      name:
        apiProduct.merchant.name,

      type:
        merchantType,
<<<<<<< HEAD
=======
    },
  };
}

async function requestCartProducts(
  productIds: string[],
): Promise<ResolveCartProductsResult> {
  const uniqueProductIds =
    Array.from(
      new Set(productIds),
    );

  if (uniqueProductIds.length === 0) {
    return {
      products: [],
      unavailableProductIds: [],
    };
  }

  const chunks: string[][] = [];

  for (
    let index = 0;
    index < uniqueProductIds.length;
    index += 50
  ) {
    chunks.push(
      uniqueProductIds.slice(
        index,
        index + 50,
      ),
    );
  }

  const responses =
    await Promise.all(
      chunks.map(
        (chunk) =>
          apiRequest<ApiResolvedProductsResponse>(
            "/products/resolve",
            {
              method: "POST",

              body: {
                product_ids:
                  chunk,
              },

              cache: "no-store",
            },
          ),
      ),
    );

  return {
    products:
      responses.flatMap(
        (response) =>
          response.products.map(
            mapResolvedCartProduct,
          ),
      ),

    unavailableProductIds:
      responses.flatMap(
        (response) =>
          response.unavailable_product_ids,
      ),
  };
}


const inFlightCartResolveRequests =
  new Map<
    string,
    Promise<ResolveCartProductsResult>
  >();

export function resolveCartProducts(
  productIds: string[],
): Promise<ResolveCartProductsResult> {
  const uniqueProductIds =
    Array.from(
      new Set(productIds),
    );

  const requestKey =
    JSON.stringify(
      uniqueProductIds,
    );

  const existingRequest =
    inFlightCartResolveRequests.get(
      requestKey,
    );

  if (existingRequest) {
    return existingRequest;
  }

  const request =
    requestCartProducts(
      uniqueProductIds,
    ).finally(() => {
      inFlightCartResolveRequests.delete(
        requestKey,
      );
    });

  inFlightCartResolveRequests.set(
    requestKey,
    request,
  );

  return request;
}


export async function getCartProduct(
  productId: string,
): Promise<{
  product: Product;
  merchant: Pick<
    Merchant,
    "id" | "name" | "type"
  >;
}> {
  const apiProduct =
    await apiRequest<ApiProduct>(
      `/products/${encodeURIComponent(
        productId,
      )}`,
      {
        cache: "no-store",
      },
    );

  const merchantType: Merchant["type"] =
    apiProduct.merchant.type ===
    "canteen"
      ? "CANTEEN"
      : "COOPERATIVE";

  return {
    product:
      mapProduct(apiProduct),

    merchant: {
      id:
        apiProduct.merchant.id,

      name:
        apiProduct.merchant.name,

      type:
        merchantType,
>>>>>>> source/main
    },
  };
}