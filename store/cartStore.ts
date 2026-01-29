import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number | string;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  totalPrice: number; // Alias for subtotal for consistency

  // Actions
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;

  // Computed values
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      totalPrice: 0,

      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // If exists, increase quantity
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // If doesn't exist, add new item
          const newItem: CartItem = {
            id: product.id,
            model: product.model,
            brand: product.brand,
            price: product.price,
            promotionalPrice: product.promotionalPrice,
            image: product.image,
            quantity: 1,
          };

          set({
            items: [...items, newItem],
          });
        }

        get().calculateTotals();
      },

      removeItem: (id) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.id !== id),
        });
        get().calculateTotals();
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
          totalPrice: 0,
        });
      },

      calculateTotals: () => {
        const { items } = get();
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => {
          const price = item.promotionalPrice || item.price;
          return acc + price * item.quantity;
        }, 0);

        set({ totalItems, subtotal, totalPrice: subtotal });
      },
    }),
    {
      name: "otica-cart-storage", // localStorage key name
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        totalPrice: state.totalPrice,
      }),
    },
  ),
);
