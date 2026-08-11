export interface Product {
  id: string;
  merchantId: string;
  categoryId: string;

  name: string;
  description?: string | null;

  price: number;
  stock: number;

  imageUrl?: string | null;

  isActive: boolean;
}

export interface Category {
  id: string;
  merchantId: string;
  name: string;
}