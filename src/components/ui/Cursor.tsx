import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const Cursor: React.FC = () => {
  // Only activate on true desktop mouse environments (hover + fine pointer)
  const isDesktopPointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useReducedMotion();
  const [cursorType, setCursorType] = useState<'default' | 'interactive' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position references for smooth interpolation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Strictly disable on touchscreens or when reduced motion is preferred
    if (!isDesktopPointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check what is under the cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="drag"]')) {
        setCursorType('drag');
      } else if (
        target.closest(
          'a, button, [role="button"], input, select, textarea, [data-cursor="interactive"]'
        )
      ) {
        setCursorType('interactive');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    const render = () => {
      // Immediate dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth trailing ring interpolation (lerp factor 0.18)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktopPointer, prefersReducedMotion, isVisible]);

  if (!isDesktopPointer || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent transition-opacity duration-150 will-change-transform"
        style={{
          opacity: cursorType === 'drag' ? 0 : 0.9,
        }}
      />

      {/* Trailing Physics Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center -ml-5 -mt-5 rounded-full border transition-all duration-200 ease-out will-change-transform"
        style={{
          width: cursorType === 'drag' ? '64px' : cursorType === 'interactive' ? '44px' : '36px',
          height: cursorType === 'drag' ? '64px' : cursorType === 'interactive' ? '44px' : '36px',
          marginLeft:
            cursorType === 'drag' ? '-32px' : cursorType === 'interactive' ? '-22px' : '-18px',
          marginTop:
            cursorType === 'drag' ? '-32px' : cursorType === 'interactive' ? '-22px' : '-18px',
          borderColor: cursorType === 'drag' ? 'var(--color-amber)' : 'var(--color-accent)',
          backgroundColor:
            cursorType === 'drag'
              ? 'rgba(245, 158, 11, 0.15)'
              : cursorType === 'interactive'
                ? 'rgba(0, 210, 255, 0.08)'
                : 'transparent',
          backdropFilter: cursorType === 'drag' ? 'blur(2px)' : 'none',
        }}
      >
        {cursorType === 'drag' && (
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber">
            Drag
          </span>
        )}
      </div>
    </div>
  );
};
