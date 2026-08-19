"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSidebar } from "@/components/CartSidebar";
import { Loading, ErrorState } from "@/components/Loading";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
  const { products, isLoading, error, reload } = useProducts();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((product) => product.name.toLowerCase().includes(keyword));
  }, [products, debouncedSearch]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <Header onCartClick={() => setIsCartOpen(true)} />

      {!isLoading && !error && <SearchBar value={search} onChange={setSearch} />}

      {isLoading && <Loading />}
      {!isLoading && error && <ErrorState message={error} onRetry={reload} />}
      {!isLoading && !error && <ProductGrid products={filteredProducts} />}

      {isCartOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/30"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
