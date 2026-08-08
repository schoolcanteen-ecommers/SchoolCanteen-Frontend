import type { Merchant } from "@/types/merchant";

export const merchants: Merchant[] = [
  {
    id: "merchant-kantin-1",
    ownerId: "user-merchant-1",
    name: "Kantin Bu Ani",
    type: "CANTEEN",
    description:
      "Aneka makanan berat, camilan, dan minuman untuk siswa.",
    imageUrl: null,
    status: "ACTIVE",
  },
  {
    id: "merchant-kantin-2",
    ownerId: "user-merchant-2",
    name: "Kantin Pak Budi",
    type: "CANTEEN",
    description:
      "Menu sarapan, makanan rumahan, dan minuman segar.",
    imageUrl: null,
    status: "ACTIVE",
  },
  {
    id: "merchant-koperasi-1",
    ownerId: "user-merchant-3",
    name: "Koperasi Siswa",
    type: "COOPERATIVE",
    description:
      "Perlengkapan belajar dan kebutuhan sekolah.",
    imageUrl: null,
    status: "ACTIVE",
  },
];

export function getMerchantById(id: string) {
  return merchants.find((merchant) => merchant.id === id);
}

export function getCanteenMerchants() {
  return merchants.filter(
    (merchant) =>
      merchant.type === "CANTEEN" &&
      merchant.status === "ACTIVE",
  );
}

export function getCooperativeMerchants() {
  return merchants.filter(
    (merchant) =>
      merchant.type === "COOPERATIVE" &&
      merchant.status === "ACTIVE",
  );
}