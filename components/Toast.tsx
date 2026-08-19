"use client";

import { useEffect } from "react";
import type { Toast as ToastType } from "@/store/useToastStore";

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: number) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 2500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isError = toast.type === "error";

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg transition-all ${
        isError ? "bg-red-500" : "bg-[#4CAF50]"
      }`}
    >
      <span>{isError ? "⚠️" : "✅"}</span>
      <span>{toast.message}</span>
    </div>
  );
}
