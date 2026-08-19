import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types/product";

/**
 * 模擬後端 API。原本 index.html 用 setTimeout 假裝呼叫 API，
 * 但完全沒有 try/catch、沒有錯誤路徑（問題7 / 問題15）。
 * 這裡改成回傳 Promise，並保留丟出錯誤的路徑，
 * 之後要換成真實 fetch('/api/products') 也只需要改這個檔案。
 */
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!PRODUCTS || PRODUCTS.length === 0) {
        reject(new Error("商品資料載入失敗，請稍後再試。"));
        return;
      }
      resolve(PRODUCTS);
    }, 1200);
  });
}

export interface CheckoutPayload {
  items: { productId: number; quantity: number }[];
  total: number;
}

/** 模擬結帳 API，回傳成功/失敗都有明確結果，讓 UI 可以做 loading / error 狀態 */
export function checkoutOrder(payload: CheckoutPayload): Promise<{ orderId: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.items.length === 0) {
        reject(new Error("購物車是空的，無法結帳。"));
        return;
      }
      resolve({ orderId: `ORD-${Date.now()}` });
    }, 1500);
  });
}
