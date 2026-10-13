import React from 'react';
import { cn } from '@/lib/cn';

const DEFAULT_ELEMENTS = [
  { symbol: 'H', number: 1, name: 'Hydrogen' },
  { symbol: 'He', number: 2, name: 'Helium' },
  { symbol: 'C', number: 6, name: 'Carbon' },
  { symbol: 'N', number: 7, name: 'Nitrogen' },
  { symbol: 'O', number: 8, name: 'Oxygen' },
  { symbol: 'Na', number: 11, name: 'Sodium' },
  { symbol: 'Si', number: 14, name: 'Silicon' },
  { symbol: 'P', number: 15, name: 'Phosphorus' },
  { symbol: 'S', number: 16, name: 'Sulfur' },
  { symbol: 'Fe', number: 26, name: 'Iron' },
  { symbol: 'Cu', number: 29, name: 'Copper' },
  { symbol: 'Ru', number: 44, name: 'Ruthenium' },
  { symbol: 'Pt', number: 78, name: 'Platinum' },
  { symbol: 'Au', number: 79, name: 'Gold' },
];

export interface MarqueeProps {
  className?: string;
  speedSeconds?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ className, speedSeconds = 35 }) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden border-y border-border/60 bg-surface/40 backdrop-blur-xs py-3 select-none',
        className
      )}
      role="region"
      aria-label="Periodic elements marquee banner"
    >
      {/* Left/Right Fade Mask */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speedSeconds}s linear infinite`,
        }}
      >
        {[...DEFAULT_ELEMENTS, ...DEFAULT_ELEMENTS].map((el, idx) => (
          <div
            key={`${el.symbol}-${idx}`}
            className="flex items-center gap-3 px-3 py-1 rounded-lg bg-surface/50 border border-border/40 hover:border-accent/40 transition-colors"
          >
            <span className="font-mono text-[10px] text-muted">{el.number}</span>
            <span className="font-display font-bold text-sm text-foreground tracking-wide">
              {el.symbol}
            </span>
            <span className="text-xs font-mono text-muted/80">{el.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
