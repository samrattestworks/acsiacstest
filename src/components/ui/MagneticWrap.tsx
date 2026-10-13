import React, { useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export interface MagneticWrapProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticWrap: React.FC<MagneticWrapProps> = ({
  children,
  strength = 0.28,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block transition-transform duration-300 ease-out', className)}
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
};
