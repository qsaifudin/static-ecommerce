"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 通用確認對話框，取代原本 index.html 直接用 alert()/confirm() 的做法。
 * 用於「移除購物車商品」與「結帳」兩個場景（feature 1）。
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "確認",
  cancelLabel = "取消",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h3 id="confirm-dialog-title" className="mb-2 text-lg font-bold text-gray-800">
          {title}
        </h3>
        {description && <p className="mb-6 text-sm text-gray-600">{description}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isConfirming}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="rounded-md bg-[#ff6b6b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff5252] disabled:opacity-60"
          >
            {isConfirming ? "處理中..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
