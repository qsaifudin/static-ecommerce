"use client";

import { selectTotalQuantity, useCartStore } from "@/store/useCartStore";

interface HeaderProps {
  onCartClick: () => void;
}

/**
 * 原本 .cart-icon 用 float:right，小螢幕排版會壞掉（問題2）。
 * 這裡改用 flexbox，天生就是響應式的。
 */
export function Header({ onCartClick }: HeaderProps) {
  const totalQuantity = useCartStore(selectTotalQuantity);

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#333] px-5 py-5 text-white sm:mb-8">
      <h1 className="text-xl font-bold sm:text-2xl">精品商店</h1>
      <button
        type="button"
        onClick={onCartClick}
        className="relative flex items-center gap-2 rounded-md bg-[#ff6b6b] px-4 py-2.5 font-medium hover:bg-[#ff5252]"
        aria-label={`購物車，共 ${totalQuantity} 件商品`}
      >
        🛒 購物車
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#ff6b6b]">
          {totalQuantity}
        </span>
      </button>
    </header>
  );
}
