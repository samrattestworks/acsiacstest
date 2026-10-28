import React from 'react';
import { Img } from './Img';
import { cn } from '@/lib/cn';
import { getAssetUrl } from '@/lib/navigation';

export interface AvatarPlaceholderProps {
  name: string;
  photo: string | null;
  className?: string;
  size?: number;
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  name,
  photo,
  className,
  size = 400,
}) => {
  if (photo) {
    return (
      <Img
        src={getAssetUrl(photo)}
        alt={`Photo of ${name}`}
        width={size}
        height={size}
        className={cn('w-full h-full object-cover', className)}
      />
    );
  }

  // Generate initials (e.g., "Faculty Advisor" -> "FA", "Chapter President" -> "CP")
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');

  return (
    <div
      className={cn(
        'relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c1836] via-[#10224d] to-[#081126] select-none text-foreground border border-border/50',
        className
      )}
      style={{ aspectRatio: '1 / 1' }}
      role="img"
      aria-label={`Avatar placeholder for ${name}`}
    >
      {/* Subtle Chemical Ring / Molecular Lattice SVG Pattern Background */}
      <svg
        viewBox="0 0 160 160"
        className="absolute inset-0 w-full h-full opacity-25 text-accent pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="80"
          cy="80"
          r="54"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx="80" cy="80" r="32" stroke="currentColor" strokeWidth="1" />
        <polygon
          points="80,36 118,58 118,102 80,124 42,102 42,58"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-40"
        />
        <circle cx="80" cy="36" r="3" fill="var(--color-amber)" />
        <circle cx="118" cy="58" r="3" fill="currentColor" />
        <circle cx="118" cy="102" r="3" fill="currentColor" />
        <circle cx="80" cy="124" r="3" fill="var(--color-amber)" />
        <circle cx="42" cy="102" r="3" fill="currentColor" />
        <circle cx="42" cy="58" r="3" fill="currentColor" />
      </svg>

      {/* Atmospheric center radial glow */}
      <div className="absolute inset-0 bg-radial from-accent/15 via-transparent to-transparent pointer-events-none" />

      {/* Initials & Chemical Tag */}
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <span className="font-display font-extrabold text-3xl sm:text-4xl tracking-wider text-accent drop-shadow-md">
          {initials || 'ACS'}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/70 px-2 py-0.5 rounded-full bg-surface/60 border border-border/40">
          IACS · MOLECULE
        </span>
      </div>
    </div>
  );
};
