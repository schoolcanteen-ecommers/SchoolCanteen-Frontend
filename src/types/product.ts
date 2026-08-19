export type ProductModifierSelectionType =
  | "single"
  | "multiple";

export interface ProductModifierOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductModifierGroup {
  id: string;
  name: string;

  selectionType:
    ProductModifierSelectionType;

  isRequired: boolean;

  minSelect: number;
  maxSelect: number;

  options: ProductModifierOption[];
}

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

  hasModifiers?: boolean;
  requiresCustomization?: boolean;

  /*
   * Full modifier detail hanya tersedia
   * pada endpoint product detail.
   *
   * Catalog/resolve cukup menggunakan
   * hasModifiers + requiresCustomization.
   */
  modifierGroups?: ProductModifierGroup[];
}

export interface Category {
  id: string;
  merchantId: string;
  name: string;
}