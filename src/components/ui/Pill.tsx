import React from 'react';
import { cn } from '@/lib/cn';

export interface PillProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'closed' | 'accent';
  dot?: boolean;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({
  children,
  variant = 'default',
  dot = true,
  className,
}) => {
  const variants = {
    default: 'bg-surface text-muted border-border',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    closed: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
    accent: 'bg-accent/10 text-accent border-accent/25',
  };

  const dotColors = {
    default: 'bg-muted',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    closed: 'bg-rose-400',
    accent: 'bg-accent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border shadow-xs select-none',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
