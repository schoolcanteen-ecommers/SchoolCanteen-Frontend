import type { Product } from "@/types/product";

export const products: Product[] = [
  // =====================================================
  // KANTIN BU ANI
  // =====================================================
  {
    id: "product-nasi-ayam",
    merchantId: "merchant-kantin-1",
    categoryId: "category-makanan-berat",
    name: "Nasi Ayam Crispy",
    description:
      "Nasi hangat dengan ayam crispy dan sambal pilihan.",
    price: 15000,
    stock: 30,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-nasi-goreng",
    merchantId: "merchant-kantin-1",
    categoryId: "category-makanan-berat",
    name: "Nasi Goreng",
    description:
      "Nasi goreng dengan telur, sayuran, dan kerupuk.",
    price: 13000,
    stock: 25,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-risol-mayo",
    merchantId: "merchant-kantin-1",
    categoryId: "category-camilan",
    name: "Risol Mayo",
    description:
      "Risol renyah dengan isian smoked beef dan mayonnaise.",
    price: 5000,
    stock: 40,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-es-teh",
    merchantId: "merchant-kantin-1",
    categoryId: "category-minuman",
    name: "Es Teh",
    description:
      "Es teh manis segar untuk menemani waktu istirahat.",
    price: 4000,
    stock: 50,
    imageUrl: null,
    isActive: true,
  },

  // =====================================================
  // KANTIN PAK BUDI
  // =====================================================
  {
    id: "product-bubur-ayam",
    merchantId: "merchant-kantin-2",
    categoryId: "category-sarapan",
    name: "Bubur Ayam",
    description:
      "Bubur ayam hangat dengan suwiran ayam dan kerupuk.",
    price: 10000,
    stock: 20,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-roti-bakar",
    merchantId: "merchant-kantin-2",
    categoryId: "category-sarapan",
    name: "Roti Bakar Cokelat",
    description:
      "Roti bakar dengan isian cokelat dan margarin.",
    price: 8000,
    stock: 18,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-es-jeruk",
    merchantId: "merchant-kantin-2",
    categoryId: "category-minuman-kantin-2",
    name: "Es Jeruk",
    description:
      "Minuman jeruk dingin dengan rasa segar.",
    price: 6000,
    stock: 30,
    imageUrl: null,
    isActive: true,
  },

  // =====================================================
  // KOPERASI
  // =====================================================
  {
    id: "product-buku-tulis",
    merchantId: "merchant-koperasi-1",
    categoryId: "category-buku",
    name: "Buku Tulis 38 Lembar",
    description:
      "Buku tulis untuk kebutuhan belajar sehari-hari.",
    price: 5000,
    stock: 100,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-pulpen",
    merchantId: "merchant-koperasi-1",
    categoryId: "category-alat-tulis",
    name: "Pulpen Hitam",
    description:
      "Pulpen tinta hitam dengan hasil tulisan halus.",
    price: 3000,
    stock: 80,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-pensil",
    merchantId: "merchant-koperasi-1",
    categoryId: "category-alat-tulis",
    name: "Pensil 2B",
    description:
      "Pensil 2B untuk menulis, menggambar, dan ujian.",
    price: 2500,
    stock: 75,
    imageUrl: null,
    isActive: true,
  },
  {
    id: "product-penggaris",
    merchantId: "merchant-koperasi-1",
    categoryId: "category-perlengkapan",
    name: "Penggaris 30 cm",
    description:
      "Penggaris transparan untuk kebutuhan sekolah.",
    price: 4000,
    stock: 50,
    imageUrl: null,
    isActive: true,
  },
];

export function getProductById(id: string) {
  return products.find(
    (product) =>
      product.id === id &&
      product.isActive,
  );
}

export function getProductsByMerchantId(
  merchantId: string,
) {
  return products.filter(
    (product) =>
      product.merchantId === merchantId &&
      product.isActive,
  );
}

export function getProductsByCategoryId(
  categoryId: string,
) {
  return products.filter(
    (product) =>
      product.categoryId === categoryId &&
      product.isActive,
  );
}