import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      to,
      href,
      target,
      rel,
      children,
      icon,
      iconRight,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover shadow-md hover:shadow-primary/25 border border-primary/30',
      secondary:
        'bg-surface hover:bg-surface-hover text-foreground border border-border shadow-sm hover:border-accent/30',
      outline:
        'bg-transparent text-foreground border border-border hover:border-accent hover:text-accent hover:bg-accent/5',
      ghost: 'bg-transparent text-muted hover:text-foreground hover:bg-surface-hover',
      amber: 'bg-amber text-black hover:bg-amber/90 shadow-md hover:shadow-amber/25 font-semibold',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 font-mono',
      md: 'text-sm px-4.5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5 font-medium',
    };

    const content = (
      <>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </>
    );

    const mergedClass = cn(baseStyles, variants[variant], sizes[size], className);

    if (to) {
      return (
        <Link to={to} className={mergedClass}>
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={mergedClass}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={mergedClass} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
