// src/store.ts  (ajuste o caminho se necessário)
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/app/types/ProductType";

type CartItem = ProductType & { quantity: number };

type CartState = {
  cart: CartItem[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  removeById: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addProduct: (item) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === item.id);
          if (existing) {
            const updated = state.cart.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
            );
            return { cart: updated };
          }
          // garante quantity inicial
          return { cart: [...state.cart, { ...(item as ProductType), quantity: item.quantity ?? 1 }] };
        }),

      removeProduct: (item) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === item.id);
          if (existing && existing.quantity > 1) {
            const updated = state.cart.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
            );
            return { cart: updated };
          }
          const filtered = state.cart.filter((p) => p.id !== item.id);
          return { cart: filtered };
        }),

      // remover por id
      removeById: (id) =>
        set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((p) => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
            .filter((p) => p.quantity > 0),
        })),

      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: "cart",
      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      paymentIntent: "",
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
    }),
    { name: "cart-storage" }
  )
);