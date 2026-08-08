export type PickupStatus =
  | "WAITING"
  | "VERIFIED";

export interface Pickup {
  id: string;

  orderId: string;

  pickupCode: string;
  qrToken: string;

  status: PickupStatus;

  pickedAt?: string | null;
}