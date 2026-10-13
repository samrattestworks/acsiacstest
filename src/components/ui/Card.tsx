import React, { useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  spotlightColor?: string;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      spotlight = false,
      spotlightColor = 'rgba(0, 210, 255, 0.12)',
      glow = false,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (spotlight) {
        const rect = (
          ref && 'current' in ref && ref.current ? ref.current : cardRef.current
        )?.getBoundingClientRect();
        if (rect) {
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
        setIsHovered(true);
      }
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (spotlight) {
        setIsHovered(false);
      }
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative rounded-2xl border border-border bg-surface/80 backdrop-blur-md p-6 text-foreground overflow-hidden transition-all duration-300',
          glow && 'hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5',
          className
        )}
        {...props}
      >
        {/* Dynamic Spotlight Radial Layer */}
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
