# 精品商店 — Next.js 版購物車

這個專案是把原本 `reference/index.original.html`（單一 HTML + inline `<script>`/`<style>` 的購物車 demo）
重構成 **Next.js (App Router) + TypeScript + Tailwind CSS + Zustand** 架構。

## 開始使用

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 專案結構

```
app/            # 路由與頁面（page.tsx 負責把各元件組起來）
components/     # UI 元件（Header, ProductGrid, CartSidebar, ConfirmDialog, Toast...）
store/          # Zustand store（購物車、通知）
hooks/          # 自訂 hooks（useDebounce, useProducts, useClickOutside）
lib/            # 工具與模擬 API（api.ts, format.ts）
data/           # mock 商品資料
types/          # TypeScript 型別定義
reference/      # 保留原始 index.html 作為對照
```

## 新增的 5 個功能

1. **對話框（Dialog）**：結帳、移除購物車商品時，改用 `ConfirmDialog` 元件詢問使用者，取代原本的 `alert()`。
2. **加入購物車通知**：透過 `useToastStore` 顯示 Toast 提示訊息。
3. **購物車總數量**：`Header` 上的購物車 icon 會即時顯示總件數（`selectTotalQuantity`）。
4. **搜尋框**：`SearchBar` 搭配 `useDebounce`，輸入停止 300ms 後才過濾商品，避免每個按鍵都重新渲染整個列表。
5. **修正數量無法以倍數更新**：
   - 購物車數量的所有變更（`store/useCartStore.ts`）改用 functional update，避免快速連續點擊 +/- 時更新遺失。
   - `CartItem` 新增可直接輸入數字的欄位，讓使用者可以一次把數量改成任意倍數（例如直接輸入 `5`），不必一直按 +1。

## 修正的原始問題（對照 index.original.html 中的「問題1~16」註解）

| 原始問題 | 修正方式 |
|---|---|
| 問題1：`.container` 固定寬度 1200px | Tailwind `max-w-6xl`，隨螢幕縮放 |
| 問題2：購物車 icon 用 `float:right` | 改用 flexbox header |
| 問題3/4：商品格線在手機上破版、缺媒體查詢 | Tailwind 響應式 grid（`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`） |
| 問題5：CSS 選擇器過度巢狀 | 拆成每個元件各自的 utility class |
| 問題6：全域變數污染 | 用 Zustand store + ES module，沒有任何全域變數 |
| 問題7/15：API 呼叫、載入沒有錯誤處理 | `useProducts` hook 內建 try/catch + error 狀態 + 重試按鈕 |
| 問題8：手動操作 DOM、效率低 | React 宣告式渲染，交給虛擬 DOM diff |
| 問題9：搜尋沒有節流 | `useDebounce`（300ms） |
| 問題10：加入購物車沒有回饋 | Toast 通知 |
| 問題11：重複查詢 DOM | 全部改用 Zustand selector，沒有 `getElementById` |
| 問題12：結帳沒有 loading/error 狀態 | `ConfirmDialog` + 結帳中 disable 按鈕、失敗會跳錯誤 Toast |
| 問題13：沒有事件委託 | React synthetic event 已經是委託在 root，不需要額外處理 |
| 問題14：resize 監聽沒有防抖、且沒有實際用途 | 直接移除，響應式交給 Tailwind CSS 處理 |
| 問題16：事件監聽器沒有清理 | `useClickOutside` 搭配 `useEffect` cleanup |
