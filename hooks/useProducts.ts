import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/product";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * 負責載入商品清單，含 loading / error 狀態。
 * 修正原本 index.html 的 loadProducts()：沒有 try/catch、失敗時整頁沒有任何提示（問題7 / 問題15）。
 */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "發生未知錯誤");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { products, isLoading, error, reload };
}
