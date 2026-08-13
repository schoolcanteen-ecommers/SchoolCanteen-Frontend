import type { Merchant } from "@/types/merchant";
import type {
  Category,
  Product,
} from "@/types/product";

import { apiRequest } from "@/lib/api/client";

/*
|--------------------------------------------------------------------------
| Backend DTO
|--------------------------------------------------------------------------
*/

interface ApiMerchant {
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

interface ApiProduct {
  id: string;

  name: string;
  slug: string;

  description: string | null;

  price: number;
  stock: number;

  image_url: string | null;

  is_active: boolean;

  merchant: ApiProductMerchant;

  category: ApiProductCategory | null;

  created_at: string | null;
}

/*
|--------------------------------------------------------------------------
| Adapters
|--------------------------------------------------------------------------
*/

function mapMerchant(
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

/*
|--------------------------------------------------------------------------
| Canteen Catalog
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Cooperative Catalog
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Product Detail
|--------------------------------------------------------------------------
*/

export async function getProductDetail(
  productId: string,
) {
  const apiProduct =
    await apiRequest<ApiProduct>(
      `/products/${encodeURIComponent(
        productId,
      )}`,
      {
        cache: "no-store",
      },
    );

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
      .filter(
        (item) =>
          item.id !== product.id,
      )
      .slice(0, 4);

  return {
    product,
    merchant,
    category,
    relatedProducts,
  };
}

/*
|--------------------------------------------------------------------------
| Cart Product Resolver
|--------------------------------------------------------------------------
*/

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
    },
  };
}