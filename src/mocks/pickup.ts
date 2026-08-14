import type { Pickup } from "@/types/pickup";

export const merchantPickups = [
  {
    id: "pickup-merchant-004",

    orderId: "merchant-order-004",

    pickupCode: "KTN098",
    qrToken: "preview-qr-merchant-order-004",

    status: "WAITING",

    pickedAt: null,
  },

  {
    id: "pickup-merchant-005",

    orderId: "merchant-order-005",

    pickupCode: "KTN097",
    qrToken: "preview-qr-merchant-order-005",

    status: "VERIFIED",

    pickedAt: "2026-08-11T09:32:00+07:00",
  },
] satisfies Pickup[];