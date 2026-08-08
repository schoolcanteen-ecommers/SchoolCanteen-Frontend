import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "category-makanan-berat",
    merchantId: "merchant-kantin-1",
    name: "Makanan Berat",
  },
  {
    id: "category-camilan",
    merchantId: "merchant-kantin-1",
    name: "Camilan",
  },
  {
    id: "category-minuman",
    merchantId: "merchant-kantin-1",
    name: "Minuman",
  },

  {
    id: "category-sarapan",
    merchantId: "merchant-kantin-2",
    name: "Sarapan",
  },
  {
    id: "category-minuman-kantin-2",
    merchantId: "merchant-kantin-2",
    name: "Minuman",
  },

  {
    id: "category-alat-tulis",
    merchantId: "merchant-koperasi-1",
    name: "Alat Tulis",
  },
  {
    id: "category-buku",
    merchantId: "merchant-koperasi-1",
    name: "Buku",
  },
  {
    id: "category-perlengkapan",
    merchantId: "merchant-koperasi-1",
    name: "Perlengkapan",
  },
];

export function getCategoryById(id: string) {
  return categories.find(
    (category) => category.id === id,
  );
}

export function getCategoriesByMerchantId(
  merchantId: string,
) {
  return categories.filter(
    (category) => category.merchantId === merchantId,
  );
}