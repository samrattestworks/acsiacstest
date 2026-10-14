import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface LogoPlaceholderProps {
  className?: string;
  showSubtitle?: boolean;
}

const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

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
      {/* Official Dual Badges: ACS Phoenix Emblem + IACS Kolkata Seal */}
      <div className="flex items-center -space-x-2 shrink-0">
        <div
          className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 shadow-xs border border-border/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          title="American Chemical Society (ACS)"
        >
          <img
            src={getAssetUrl('images/logos/acs-logo.svg')}
            alt="American Chemical Society Logo"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
        <div
          className="relative z-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 shadow-xs border border-border/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          title="Indian Association for the Cultivation of Science (IACS Kolkata)"
        >
          <img
            src={getAssetUrl('images/logos/iacs-logo.png')}
            alt="IACS Kolkata Seal Logo"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
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
