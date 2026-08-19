"use client";

import { useToastStore } from "@/store/useToastStore";
import { Toast } from "./Toast";

/** 掛在 root layout，統一顯示 add-to-cart / checkout 等通知（feature 2） */
export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[1200] flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
