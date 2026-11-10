import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((c) => c.id === item.id);
      if (exists) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
  clearCart: () => set({ cart: [] }),
}));