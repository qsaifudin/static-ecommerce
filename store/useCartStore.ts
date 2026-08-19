import { create } from "zustand";
import type { CartItem, Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  /** 用相對變化量調整數量 (e.g. +1 / -1)，用於購物車的 +/- 按鈕 */
  updateQuantity: (productId: number, delta: number) => void;
  /** 直接把數量設成指定值，用於手動輸入的數量欄位，可一次跳多個 (fix: qty couldn't update by multiples) */
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product) =>
    // 用 functional update（依賴最新的 state，而不是外部變數），
    // 避免原本 vanilla JS 版本在快速連續操作時可能發生的更新遺失問題。
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, delta) =>
    set((state) => {
      const next = state.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { items: next };
    }),

  setQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.product.id !== productId) };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }),

  clearCart: () => set({ items: [] }),
}));

// Selector: total 數量（購物車 icon 上的 badge）
export const selectTotalQuantity = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

// Selector: 總金額
export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
