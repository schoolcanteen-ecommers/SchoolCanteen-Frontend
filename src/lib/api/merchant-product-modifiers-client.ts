"use client";

import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

export type MerchantModifierSelectionType =
  | "single"
  | "multiple";

interface ApiMerchantModifierOption {
  id: string;
  name: string;

  price_delta: number;

  sort_order?: number;
  is_active?: boolean;
}

interface ApiMerchantModifierGroup {
  id: string;
  name: string;

  selection_type:
    MerchantModifierSelectionType;

  is_required: boolean;

  min_select: number;
  max_select: number;

  sort_order?: number;
  is_active?: boolean;

  options?: ApiMerchantModifierOption[];
}

export interface MerchantModifierOption {
  id: string;
  name: string;

  priceDelta: number;

  sortOrder: number;
  isActive: boolean;
}

export interface MerchantModifierGroup {
  id: string;
  name: string;

  selectionType:
    MerchantModifierSelectionType;

  isRequired: boolean;

  minSelect: number;
  maxSelect: number;

  sortOrder: number;
  isActive: boolean;

  options: MerchantModifierOption[];
}

export interface MerchantModifierGroupPayload {
  name: string;

  selectionType:
    MerchantModifierSelectionType;

  isRequired: boolean;

  minSelect?: number | null;
  maxSelect?: number | null;

  sortOrder?: number;
  isActive?: boolean;
}

export interface MerchantModifierOptionPayload {
  name: string;

  priceDelta: number;

  sortOrder?: number;
  isActive?: boolean;
}

function mapOption(
  option: ApiMerchantModifierOption,
): MerchantModifierOption {
  return {
    id:
      option.id,

    name:
      option.name,

    priceDelta:
      Number(
        option.price_delta ?? 0,
      ),

    sortOrder:
      Number(
        option.sort_order ?? 0,
      ),

    isActive:
      option.is_active ?? true,
  };
}

function mapGroup(
  group: ApiMerchantModifierGroup,
): MerchantModifierGroup {
  return {
    id:
      group.id,

    name:
      group.name,

    selectionType:
      group.selection_type,

    isRequired:
      Boolean(
        group.is_required,
      ),

    minSelect:
      Number(
        group.min_select ?? 0,
      ),

    maxSelect:
      Number(
        group.max_select ?? 1,
      ),

    sortOrder:
      Number(
        group.sort_order ?? 0,
      ),

    isActive:
      group.is_active ?? true,

    options:
      (group.options ?? [])
        .map(
          mapOption,
        )
        .sort(
          (a, b) =>
            a.sortOrder -
            b.sortOrder,
        ),
  };
}

function groupBody(
  payload: MerchantModifierGroupPayload,
) {
  return {
    name:
      payload.name,

    selection_type:
      payload.selectionType,

    is_required:
      payload.isRequired,

    min_select:
      payload.minSelect ??
      null,

    max_select:
      payload.maxSelect ??
      null,

    sort_order:
      payload.sortOrder ?? 0,

    is_active:
      payload.isActive ?? true,
  };
}

function optionBody(
  payload: MerchantModifierOptionPayload,
) {
  return {
    name:
      payload.name,

    price_delta:
      payload.priceDelta,

    sort_order:
      payload.sortOrder ?? 0,

    is_active:
      payload.isActive ?? true,
  };
}

function productPath(
  productId: string,
) {
  return `/merchant/products/${encodeURIComponent(
    productId,
  )}/modifiers`;
}

export async function getMerchantProductModifiers(
  productId: string,
): Promise<MerchantModifierGroup[]> {
  const groups =
    await authenticatedApiRequest<
      ApiMerchantModifierGroup[]
    >(
      productPath(
        productId,
      ),
      {
        cache:
          "no-store",
      },
    );

  return groups
    .map(
      mapGroup,
    )
    .sort(
      (a, b) =>
        a.sortOrder -
        b.sortOrder,
    );
}

export async function createMerchantModifierGroup(
  productId: string,
  payload: MerchantModifierGroupPayload,
) {
  return authenticatedApiRequest<
    ApiMerchantModifierGroup
  >(
    productPath(
      productId,
    ),
    {
      method:
        "POST",

      body:
        groupBody(
          payload,
        ),
    },
  );
}

export async function updateMerchantModifierGroup(
  productId: string,
  modifierId: string,
  payload: MerchantModifierGroupPayload,
) {
  return authenticatedApiRequest<
    ApiMerchantModifierGroup
  >(
    `${productPath(
      productId,
    )}/${encodeURIComponent(
      modifierId,
    )}`,
    {
      method:
        "PATCH",

      body:
        groupBody(
          payload,
        ),
    },
  );
}

export async function updateMerchantModifierGroupStatus(
  productId: string,
  modifierId: string,
  isActive: boolean,
) {
  return authenticatedApiRequest<
    ApiMerchantModifierGroup
  >(
    `${productPath(
      productId,
    )}/${encodeURIComponent(
      modifierId,
    )}`,
    {
      method:
        "PATCH",

      body: {
        is_active:
          isActive,
      },
    },
  );
}

export async function deleteMerchantModifierGroup(
  productId: string,
  modifierId: string,
) {
  return authenticatedApiRequest<unknown>(
    `${productPath(
      productId,
    )}/${encodeURIComponent(
      modifierId,
    )}`,
    {
      method:
        "DELETE",
    },
  );
}

function optionPath(
  productId: string,
  modifierId: string,
) {
  return `${productPath(
    productId,
  )}/${encodeURIComponent(
    modifierId,
  )}/options`;
}

export async function createMerchantModifierOption(
  productId: string,
  modifierId: string,
  payload: MerchantModifierOptionPayload,
) {
  return authenticatedApiRequest<
    ApiMerchantModifierOption
  >(
    optionPath(
      productId,
      modifierId,
    ),
    {
      method:
        "POST",

      body:
        optionBody(
          payload,
        ),
    },
  );
}

export async function updateMerchantModifierOption(
  productId: string,
  modifierId: string,
  optionId: string,
  payload: MerchantModifierOptionPayload,
) {
  return authenticatedApiRequest<
    ApiMerchantModifierOption
  >(
    `${optionPath(
      productId,
      modifierId,
    )}/${encodeURIComponent(
      optionId,
    )}`,
    {
      method:
        "PATCH",

      body:
        optionBody(
          payload,
        ),
    },
  );
}

export async function updateMerchantModifierOptionStatus(
  productId: string,
  modifierId: string,
  optionId: string,
  isActive: boolean,
) {
  return authenticatedApiRequest<
    ApiMerchantModifierOption
  >(
    `${optionPath(
      productId,
      modifierId,
    )}/${encodeURIComponent(
      optionId,
    )}`,
    {
      method:
        "PATCH",

      body: {
        is_active:
          isActive,
      },
    },
  );
}

export async function deleteMerchantModifierOption(
  productId: string,
  modifierId: string,
  optionId: string,
) {
  return authenticatedApiRequest<unknown>(
    `${optionPath(
      productId,
      modifierId,
    )}/${encodeURIComponent(
      optionId,
    )}`,
    {
      method:
        "DELETE",
    },
  );
}
