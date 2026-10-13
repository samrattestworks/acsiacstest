import { useState, useEffect } from 'react';

export type ScrollDirection = 'up' | 'down';

export function useScrollDirection(threshold: number = 10): {
  direction: ScrollDirection;
  isAtTop: boolean;
} {
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      setIsAtTop(scrollY <= 16);

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setDirection(scrollY > lastScrollY && scrollY > 70 ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { direction, isAtTop };
}
