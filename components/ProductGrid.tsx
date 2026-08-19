import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

/**
 * 原本用固定 repeat(4,1fr)，手機上會破版（問題3 / 問題4）。
 * 改用 auto-fill + minmax，格數會依容器寬度自動調整，不需要手動加一堆 breakpoint。
 */
export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-gray-400">找不到符合的商品</p>;
  }

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
