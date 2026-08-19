export function Loading() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#ff6b6b]" />
      <p>載入中...</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-gray-500">
      <p>😢 {message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-[#ff6b6b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff5252]"
      >
        重新載入
      </button>
    </div>
  );
}
