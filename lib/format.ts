/** 格式化為 "NT$ 1,234" 的顯示格式 */
export function formatCurrency(amount: number): string {
  return `NT$ ${amount.toLocaleString("zh-TW")}`;
}
