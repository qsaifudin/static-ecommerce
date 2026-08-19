"use client";

import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.pushToast);

  function handleAddToCart() {
    addItem(product);
    pushToast(`已將「${product.name}」加入購物車`); // feature 2：加入購物車通知
  }

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-2.5 flex h-[180px] items-center justify-center rounded bg-gray-100 text-sm text-gray-400">
        圖片
      </div>
      <h3 className="mb-2 line-clamp-2 font-bold text-gray-800">{product.name}</h3>
      <p className="mb-4 text-lg font-bold text-[#ff6b6b]">{formatCurrency(product.price)}</p>
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-auto w-full rounded-md bg-[#4CAF50] py-2.5 text-sm font-medium text-white hover:bg-[#45a049]"
      >
        加入購物車
      </button>
    </div>
  );
}
