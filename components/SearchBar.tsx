"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/** 商品搜尋框（feature 4），實際 debounce 邏輯在 page.tsx 透過 useDebounce 處理 */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜尋商品名稱..."
        aria-label="搜尋商品"
        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30"
      />
    </div>
  );
}
