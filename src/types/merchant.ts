export type MerchantType =
  | "CANTEEN"
  | "COOPERATIVE";

export type MerchantStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface Merchant {
  id: string;
  ownerId: string;
  name: string;
  type: MerchantType;
  description?: string | null;
  imageUrl?: string | null;
  status: MerchantStatus;
}