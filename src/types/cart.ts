export interface CartModifierSelection {
  groupId: string;
  optionIds: string[];
}

export interface CartItemCustomization {
  selections?: CartModifierSelection[];
  note?: string;
}

export interface CartItem {
  /*
   * Identitas unik cart line.
   *
   * Product yang sama dapat memiliki
   * beberapa line jika customization
   * berbeda.
   */
  lineId: string;

  productId: string;
  quantity: number;

  selections: CartModifierSelection[];
  note: string;
}

export interface CartContextValue {
  items: CartItem[];

  totalItems: number;
  isHydrated: boolean;

  addItem: (
    productId: string,
    quantity?: number,
    customization?: CartItemCustomization,
  ) => void;

  /*
   * API Cart v2.
   */
  removeLine: (
    lineId: string,
  ) => void;

  updateLineQuantity: (
    lineId: string,
    quantity: number,
  ) => void;

  updateCustomization: (
    lineId: string,
    customization: CartItemCustomization,
  ) => void;

  getProductQuantity: (
    productId: string,
  ) => number;

  /*
   * Temporary compatibility API.
   *
   * Dipertahankan selama Cart Page,
   * Checkout, Product Detail, dan
   * Quick Add belum seluruhnya
   * dipindahkan ke line-based API.
   */
  removeItem: (
    productId: string,
  ) => void;

  updateQuantity: (
    productId: string,
    quantity: number,
  ) => void;

  getItemQuantity: (
    productId: string,
  ) => number;

  clearCart: () => void;
}
