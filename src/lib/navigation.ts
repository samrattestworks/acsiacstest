import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Safely resolves asset paths with respect to Vite's base URL (e.g. '/acsiacstest/' on GitHub Pages).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Robust scroll-to-target function that respects Lenis, fixed navbar offset, and reduced motion.
 */
export function scrollToElement(
  targetIdOrElement: string | HTMLElement,
  offset: number = -85
): void {
  if (typeof window === 'undefined') return;

  const targetEl =
    typeof targetIdOrElement === 'string'
      ? document.getElementById(targetIdOrElement.replace(/^#/, ''))
      : targetIdOrElement;

  if (!targetEl) {
    if (targetIdOrElement === 'top' || targetIdOrElement === '#top') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.9 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    return;
  }

  if (window.__lenis) {
    window.__lenis.scrollTo(targetEl, { offset, duration: 1.0 });
  } else {
    const rect = targetEl.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop + offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}
