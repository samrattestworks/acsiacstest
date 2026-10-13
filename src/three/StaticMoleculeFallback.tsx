import React from 'react';
import { cn } from '@/lib/cn';

export interface StaticMoleculeFallbackProps {
  className?: string;
}

export const StaticMoleculeFallback: React.FC<StaticMoleculeFallbackProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none flex items-center justify-center',
        className
      )}
      aria-hidden="true"
    >
      {/* Ambient Radial Chemistry Glow */}
      <div className="absolute inset-0 bg-radial from-accent/15 via-primary/10 to-transparent opacity-80" />

      {/* Elegant SVG Molecular Bond Diagram Fallback */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full object-cover opacity-40 text-accent/70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Dynamic Lattice Network */}
        <g stroke="url(#bondGrad)" strokeWidth="1.5" strokeDasharray="4 4">
          <line x1="200" y1="180" x2="350" y2="280" />
          <line x1="350" y1="280" x2="520" y2="220" />
          <line x1="520" y1="220" x2="680" y2="340" />
          <line x1="680" y1="340" x2="820" y2="200" />
          <line x1="350" y1="280" x2="420" y2="440" />
          <line x1="520" y1="220" x2="580" y2="120" />
          <line x1="420" y1="440" x2="680" y2="340" />
        </g>

        {/* Oxygen Atoms */}
        <circle cx="200" cy="180" r="14" fill="#00D2FF" fillOpacity="0.85" />
        <circle cx="350" cy="280" r="16" fill="#2563EB" fillOpacity="0.9" />
        <circle cx="520" cy="220" r="18" fill="#00D2FF" fillOpacity="0.95" />
        <circle cx="680" cy="340" r="15" fill="#2563EB" fillOpacity="0.85" />
        <circle cx="820" cy="200" r="14" fill="#00D2FF" fillOpacity="0.8" />
        <circle cx="420" cy="440" r="14" fill="#2563EB" fillOpacity="0.8" />
        <circle cx="580" cy="120" r="13" fill="#00D2FF" fillOpacity="0.85" />

        {/* Bonded Hydrogen Atoms */}
        <circle cx="180" cy="150" r="7" fill="#F1F5F9" />
        <circle cx="230" cy="195" r="7" fill="#F1F5F9" />
        <circle cx="330" cy="310" r="8" fill="#F1F5F9" />
        <circle cx="380" cy="260" r="8" fill="#F1F5F9" />
        <circle cx="500" cy="185" r="8" fill="#F1F5F9" />
        <circle cx="555" cy="245" r="8" fill="#F1F5F9" />
        <circle cx="660" cy="370" r="7" fill="#F1F5F9" />
        <circle cx="710" cy="320" r="7" fill="#F1F5F9" />
      </svg>
    </div>
  );
};
