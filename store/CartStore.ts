import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      ADD_CART: (item: CartItemsType) => set({ cartItems: [...get().cartItems, item] }),
      UPDATE_CART: (cartItems: CartItemsType[]) => set({ cartItems }),
      CLEAR_CART: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-data",
    }
  )
);

export interface CartItemsType {
  id: number;
  quantity: number;
}
