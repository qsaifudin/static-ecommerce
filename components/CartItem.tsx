"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/format";
import { ConfirmDialog } from "./ConfirmDialog";
import type { CartItem as CartItemType } from "@/types/product";

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [confirmingRemove, setConfirmingRemove] = useState(false);

  function handleQuantityInput(raw: string) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed) || parsed < 1) return;
    // 允許一次輸入任意倍數（例如直接改成 5），而不是只能一次 +1/-1
    setQuantity(item.product.id, parsed);
  }

  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
        圖片
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-800">{item.product.name}</p>
        <p className="text-sm font-bold text-[#ff6b6b]">{formatCurrency(item.product.price)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label="減少數量"
            disabled={item.quantity <= 1}
            onClick={() => updateQuantity(item.product.id, -1)}
            className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-sm hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => handleQuantityInput(e.target.value)}
            aria-label="商品數量"
            className="w-14 rounded border border-gray-200 px-1.5 py-0.5 text-center text-sm font-semibold"
          />
          <button
            type="button"
            aria-label="增加數量"
            onClick={() => updateQuantity(item.product.id, 1)}
            className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-sm hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setConfirmingRemove(true)}
        aria-label={`移除 ${item.product.name}`}
        className="shrink-0 rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
      >
        🗑️
      </button>

      <ConfirmDialog
        open={confirmingRemove}
        title="移除商品"
        description={`確定要將「${item.product.name}」從購物車移除嗎？`}
        confirmLabel="移除"
        onConfirm={() => {
          removeItem(item.product.id);
          setConfirmingRemove(false);
        }}
        onCancel={() => setConfirmingRemove(false)}
      />
    </div>
  );
}
