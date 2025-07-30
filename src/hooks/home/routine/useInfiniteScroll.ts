import { useEffect, useRef } from 'react';

export function useInfiniteScroll(callback: () => void, canFetch: boolean) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !canFetch) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [callback, canFetch]);

  return bottomRef;
}
