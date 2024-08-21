import { useRef, useCallback } from "react";

export default function useDebounce(
  callback: (...args: number[]) => void,
  delay: number,
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: number[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
