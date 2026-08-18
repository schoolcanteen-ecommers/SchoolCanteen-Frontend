export interface AdminReportPopularProduct {
  id: string;
  name: string;
  merchantName: string;
  soldQuantity: number;
  imageUrl?: string | null;
}

export const adminReportPopularProducts: AdminReportPopularProduct[] = [
  {
    id: "report-popular-1",
    name: "Mie Ayam Spesial",
    merchantName: "Kantin Ibu Ani",
    soldQuantity: 342,
    imageUrl: null,
  },
  {
    id: "report-popular-2",
    name: "Paket Ayam Geprek",
    merchantName: "Warung Nasi Uduk",
    soldQuantity: 289,
    imageUrl: null,
  },
  {
    id: "report-popular-3",
    name: "Buku Tulis A5",
    merchantName: "Koperasi Sekolah",
    soldQuantity: 180,
    imageUrl: null,
  },
  {
    id: "report-popular-4",
    name: "Pulpen Gel",
    merchantName: "Koperasi Sekolah",
    soldQuantity: 156,
    imageUrl: null,
  },
];
