import { authenticatedServerApiRequest } from "@/lib/api/authenticated-server";

import { mapMerchant, type ApiMerchant } from "@/lib/api/catalog";

import type { Merchant } from "@/types/merchant";

interface ApiAdminMerchant {
  id: string;

  name: string;
  type: "canteen" | "cooperative";

  description: string | null;
  logo_url: string | null;

  is_active: boolean;
  is_open: boolean;

  owner: {
    id: string;
    name: string;
    phone: string | null;
  };

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

function mapAdminMerchant(merchant: ApiAdminMerchant): Merchant {
  const normalizedMerchant: ApiMerchant = {
    id: merchant.id,

    owner_user_id: merchant.owner.id,

    name: merchant.name,

    type: merchant.type,

    description: merchant.description,

    logo_url: merchant.logo_url,

    is_active: merchant.is_active,

    is_open: merchant.is_open,

    products_count: merchant.products_count,

    created_at: merchant.created_at,
  };

  return mapMerchant(normalizedMerchant);
}

export async function getAdminMerchants(): Promise<Merchant[]> {
  const merchants: Merchant[] = [];

  const pageSize = 20;

  for (let page = 1; ; page += 1) {
    const apiMerchants = await authenticatedServerApiRequest<
      ApiAdminMerchant[]
    >(`/admin/merchants?page=${page}`);

    merchants.push(...apiMerchants.map(mapAdminMerchant));

    if (apiMerchants.length < pageSize) {
      break;
    }
  }

  return merchants;
}
