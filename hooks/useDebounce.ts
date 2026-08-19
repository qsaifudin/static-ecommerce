import { useEffect, useState } from "react";

/**
 * 延遲回傳一個值，直到它停止變化達到 delay 毫秒。
 * 用於搜尋框，修正原本 index.html 的 searchProducts() 每打一個字就重新渲染整個列表的效能問題（問題9）。
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
