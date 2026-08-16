import { authenticatedServerApiRequest } from "@/lib/api/authenticated-server";

import { getMerchantWallet } from "@/lib/api/merchant-finance";

import type { Category, Product } from "@/types/product";

interface ApiMerchantCategory {
  id: string;
  name: string;
  slug: string;
}

interface ApiMerchantProduct {
  id: string;

  category: {
    id: string;
    name: string;
    slug: string;
  } | null;

  name: string;
  slug: string;

  description: string | null;

  price: number;
  stock: number;

  image_url: string | null;

  is_active: boolean;

  created_at: string | null;

  updated_at: string | null;
}

function mapMerchantCategory(
  category: ApiMerchantCategory,
  merchantId: string,
): Category {
  return {
    id: category.id,

    merchantId,

    name: category.name,
  };
}

function mapMerchantProduct(
  product: ApiMerchantProduct,
  merchantId: string,
): Product {
  return {
    id: product.id,

    merchantId,

    categoryId: product.category?.id ?? "",

    name: product.name,

    description: product.description,

    price: product.price,

    stock: product.stock,

    imageUrl: product.image_url,

    isActive: product.is_active,
  };
}

export async function getMerchantProducts(
  merchantId: string,
): Promise<Product[]> {
  const products: Product[] = [];

  const pageSize = 20;

  for (let page = 1; ; page += 1) {
    const apiProducts = await authenticatedServerApiRequest<
      ApiMerchantProduct[]
    >(`/merchant/products?page=${page}`);

    products.push(
      ...apiProducts.map((product) => mapMerchantProduct(product, merchantId)),
    );

    if (apiProducts.length < pageSize) {
      break;
    }
  }

  return products;
}

export async function getMerchantCategories(
  merchantId: string,
): Promise<Category[]> {
  const categories = await authenticatedServerApiRequest<ApiMerchantCategory[]>(
    "/merchant/categories",
  );

  return categories.map((category) =>
    mapMerchantCategory(category, merchantId),
  );
}

export async function getMerchantProductManagementData() {
  const wallet = await getMerchantWallet();

  const [products, categories] = await Promise.all([
    getMerchantProducts(wallet.merchantId),

    getMerchantCategories(wallet.merchantId),
  ]);

  return {
    merchant: {
      id: wallet.merchantId,

      name: wallet.merchantName,
    },

    products,
    categories,
  };
}
