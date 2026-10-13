import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface LogoPlaceholderProps {
  className?: string;
  showSubtitle?: boolean;
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({
  className,
  showSubtitle = true,
}) => {
  return (
    <Link
      to="/"
      className={cn(
        'group flex items-center gap-3 select-none transition-opacity hover:opacity-95 focus-visible:outline-accent',
        className
      )}
      aria-label="ACS IACS Student Chapter Home"
    >
      {/* Geometric Molecular Hexagon Icon Placeholder */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 border border-border flex items-center justify-center p-1.5 shadow-sm overflow-hidden group-hover:border-accent/40 transition-colors">
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full text-accent transition-transform duration-500 group-hover:rotate-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Lattice */}
          <polygon
            points="20,4 34,12 34,28 20,36 6,28 6,12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="opacity-70"
          />
          {/* Internal Nodes & Bonds */}
          <line
            x1="20"
            y1="4"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <line x1="6" y1="28" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="34" y1="28" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="3.5" fill="var(--color-amber)" />
          <circle cx="20" cy="4" r="2.5" fill="currentColor" />
          <circle cx="34" cy="28" r="2.5" fill="currentColor" />
          <circle cx="6" cy="28" r="2.5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold tracking-tight text-base sm:text-lg text-foreground">
            ACS <span className="text-accent font-extrabold">IACS</span>
          </span>
          <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-primary/15 text-primary border border-primary/20">
            CHAPTER
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-mono text-muted tracking-tight truncate">
            Student Chapter · Kolkata
          </span>
        )}
      </div>
    </Link>
  );
};
