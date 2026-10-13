import React, { useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  maxTilt = 10,
  glare = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.18,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-2xl border border-border bg-surface/85 backdrop-blur-md transition-transform duration-200 ease-out will-change-transform overflow-hidden shadow-card',
        className
      )}
      style={{
        transform: prefersReducedMotion ? 'none' : transform,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* 3D Dynamic Glare Effect */}
      {glare && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
