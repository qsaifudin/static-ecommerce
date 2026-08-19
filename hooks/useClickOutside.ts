import { useEffect, type RefObject } from "react";

/**
 * 偵測「元素外部」的點擊，並在 unmount / deps 變化時正確移除監聽器。
 * 修正原本 index.html 在 document 上直接綁定 click，且從未清理的問題（問題16）。
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onOutsideClick, enabled]);
}
