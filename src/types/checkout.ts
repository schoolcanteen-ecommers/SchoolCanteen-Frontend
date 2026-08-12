import type { Product } from "@/types/product";

export interface PickupSlot {
  id: string;
  label: string;
  time: string;
}

export interface CheckoutItem {
  product: Product;
  quantity: number;
}

export interface CheckoutMerchantGroup {
  merchantId: string;
  merchantName: string;
  items: CheckoutItem[];
  subtotal: number;
}