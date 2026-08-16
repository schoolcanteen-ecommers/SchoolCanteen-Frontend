import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

export interface MerchantProductInput {
  name: string;

  categoryId:
    | string
    | null;

  description:
    | string
    | null;

  price: number;
  stock: number;

  isActive: boolean;

  image?:
    | File
    | null;
}

export async function createMerchantProduct(
  input: MerchantProductInput,
) {
  const formData =
    new FormData();

  formData.append(
    "name",
    input.name,
  );

  formData.append(
    "price",
    String(input.price),
  );

  formData.append(
    "stock",
    String(input.stock),
  );

  formData.append(
    "is_active",
    String(input.isActive),
  );

  if (input.categoryId) {
    formData.append(
      "category_id",
      input.categoryId,
    );
  }

  if (
    input.description?.trim()
  ) {
    formData.append(
      "description",
      input.description.trim(),
    );
  }

  if (input.image) {
    formData.append(
      "image",
      input.image,
    );
  }

  return authenticatedApiRequest<unknown>(
    "/merchant/products",
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function updateMerchantProduct(
  productId: string,
  input: MerchantProductInput,
) {
  
  if (input.image) {
    const formData =
      new FormData();

    formData.append(
      "_method",
      "PATCH",
    );

    formData.append(
      "name",
      input.name,
    );

    formData.append(
      "price",
      String(input.price),
    );

    formData.append(
      "stock",
      String(input.stock),
    );

    formData.append(
      "is_active",
      String(input.isActive),
    );

    
    formData.append(
      "category_id",
      input.categoryId ??
        "",
    );

    formData.append(
      "description",
      input.description?.trim() ??
        "",
    );

    formData.append(
      "image",
      input.image,
    );

    return authenticatedApiRequest<unknown>(
      `/merchant/products/${encodeURIComponent(
        productId,
      )}`,
      {
        method: "POST",
        body: formData,
      },
    );
  }

  
  return authenticatedApiRequest<unknown>(
    `/merchant/products/${encodeURIComponent(
      productId,
    )}`,
    {
      method: "PATCH",

      body: {
        name:
          input.name,

        category_id:
          input.categoryId,

        description:
          input.description?.trim() ||
          null,

        price:
          input.price,

        stock:
          input.stock,

        is_active:
          input.isActive,
      },
    },
  );
}

export async function updateMerchantProductStatus(
  productId: string,
  isActive: boolean,
) {
  return authenticatedApiRequest<unknown>(
    `/merchant/products/${encodeURIComponent(
      productId,
    )}`,
    {
      method: "PATCH",

      body: {
        is_active:
          isActive,
      },
    },
  );
}

export async function updateMerchantProductStock(
  productId: string,
  stock: number,
) {
  return authenticatedApiRequest<unknown>(
    `/merchant/products/${encodeURIComponent(
      productId,
    )}`,
    {
      method: "PATCH",

      body: {
        stock,
      },
    },
  );
}

export async function deleteMerchantProduct(
  productId: string,
) {
  return authenticatedApiRequest<unknown>(
    `/merchant/products/${encodeURIComponent(
      productId,
    )}`,
    {
      method: "DELETE",
    },
  );
}