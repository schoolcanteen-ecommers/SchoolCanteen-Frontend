export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  isHydrated: boolean;

  addItem: (
    productId: string,
    quantity?: number,
  ) => void;

  removeItem: (productId: string) => void;

  updateQuantity: (
    productId: string,
    quantity: number,
  ) => void;

  clearCart: () => void;

  getItemQuantity: (
    productId: string,
  ) => number;
}