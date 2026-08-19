"use client";

import { useRef, useState } from "react";
import { selectTotalPrice, useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { useClickOutside } from "@/hooks/useClickOutside";
import { checkoutOrder } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { CartItem } from "./CartItem";
import { ConfirmDialog } from "./ConfirmDialog";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const pushToast = useToastStore((state) => state.pushToast);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [confirmingCheckout, setConfirmingCheckout] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useClickOutside(sidebarRef, onClose, open);

  function handleCheckoutClick() {
    if (items.length === 0) {
      pushToast("購物車是空的！", "error");
      return;
    }
    setConfirmingCheckout(true);
  }

  async function handleConfirmCheckout() {
    setIsCheckingOut(true);
    try {
      await checkoutOrder({
        items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
        total: totalPrice,
      });
      pushToast("結帳成功！感謝您的購買。");
      clearCart();
      setConfirmingCheckout(false);
      onClose();
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "結帳失敗，請稍後再試。", "error");
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-[1000] flex h-full w-full max-w-[400px] flex-col bg-white p-5 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold text-gray-800">購物車</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉購物車"
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="mt-12 text-center text-gray-400">購物車是空的</p>
          ) : (
            items.map((item) => <CartItem key={item.product.id} item={item} />)
          )}
        </div>

        <div className="mt-4 border-t-2 border-gray-200 pt-4">
          <p className="text-center text-xl font-bold text-gray-800">
            總計: {formatCurrency(totalPrice)}
          </p>
          <button
            type="button"
            onClick={handleCheckoutClick}
            className="mt-4 w-full rounded-md bg-[#ff6b6b] py-3.5 text-base font-bold text-white hover:bg-[#ff5252]"
          >
            結帳
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingCheckout}
        title="確認結帳"
        description={`共 ${items.reduce((s, i) => s + i.quantity, 0)} 件商品，總計 ${formatCurrency(
          totalPrice
        )}，確定要結帳嗎？`}
        confirmLabel="確認結帳"
        isConfirming={isCheckingOut}
        onConfirm={handleConfirmCheckout}
        onCancel={() => setConfirmingCheckout(false)}
      />
    </>
  );
}
