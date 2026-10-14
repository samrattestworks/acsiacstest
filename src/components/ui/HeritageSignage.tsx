import React, { useRef, useState } from 'react';
import { Shield, Sparkles, MapPin, Compass } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const HeritageSignage: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-lg mx-auto select-none group"
      aria-label="ACS Student Chapter IACS Kolkata architectural signage plaque"
    >
      {/* Ambient Signage Backlight Glow */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent/20 via-primary/30 to-amber/20 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 -z-10"
        style={{
          backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
        }}
      />

      {/* Main Architectural Plaque Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900 via-[#070D1F] to-[#040814] border-2 border-slate-700/80 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
        {/* Dynamic Specular Light Glint on Glass Surface */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 210, 255, 0.12), transparent 80%)`,
            }}
          />
        )}

        {/* 4 Precision Machined Torx Corner Mounting Bolts */}
        <div className="absolute top-3.5 left-3.5 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800 border border-slate-400/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-900/90 rounded-full" />
        </div>
        <div className="absolute top-3.5 right-3.5 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800 border border-slate-400/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-900/90 rounded-full rotate-45" />
        </div>
        <div className="absolute bottom-3.5 left-3.5 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800 border border-slate-400/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-900/90 rounded-full -rotate-45" />
        </div>
        <div className="absolute bottom-3.5 right-3.5 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800 border border-slate-400/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-900/90 rounded-full" />
        </div>

        {/* Laser-Etched Inner Border with Bevel */}
        <div className="relative rounded-xl sm:rounded-2xl border border-accent/25 bg-surface/50 backdrop-blur-sm p-4 sm:p-6 flex flex-col gap-5 sm:gap-6 overflow-hidden">
          {/* Subtle Heritage Watermark Pattern in Plate */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full fill-none stroke-current text-accent"
            >
              <circle cx="200" cy="200" r="160" strokeWidth="1" strokeDasharray="6 4" />
              <polygon points="200,60 320,130 320,270 200,340 80,270 80,130" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="80" strokeWidth="1" />
              <line x1="200" y1="40" x2="200" y2="360" strokeWidth="0.8" />
              <line x1="40" y1="200" x2="360" y2="200" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Top Heritage Emblem & Archival Benchmark */}
          <div className="flex items-center justify-between border-b border-border/70 pb-3 text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-accent font-semibold">
                ESTD. 1876 · NATIONAL LANDMARK
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                ACTIVE LAB
              </span>
            </div>
          </div>

          {/* Institutional Crest & Signage Typography */}
          <div className="flex flex-col gap-2 relative z-10 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-mono text-[11px] sm:text-xs text-amber font-medium uppercase tracking-widest">
                Indian Association for the Cultivation of Science
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-foreground leading-snug text-balance">
              ACS Student Chapter <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent via-sky-300 to-amber bg-clip-text text-transparent">
                IACS Kolkata
              </span>
            </h3>

            <p className="font-mono text-xs sm:text-sm text-muted/90 flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>IACS Kolkata · Jadavpur Research Campus</span>
            </p>
          </div>

          {/* Precision Scientific Coordinates & Division Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 relative z-10 font-mono text-[11px]">
            <div className="p-2.5 rounded-lg bg-surface/90 border border-border/80 flex items-center gap-2 text-muted">
              <Compass className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate">22.4988° N, 88.3683° E</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface/90 border border-border/80 flex items-center gap-2 text-muted">
              <Sparkles className="w-3.5 h-3.5 text-amber shrink-0" />
              <span className="truncate">Chapter Labs · Wing A</span>
            </div>
          </div>

          {/* Authentic Plaque Registry Bar */}
          <div className="pt-3 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-muted/70 relative z-10">
            <span className="uppercase tracking-wider">
              Registry:{' '}
              <strong className="text-foreground/90 font-semibold">ACS-IACS/ESTD-2024</strong>
            </span>
            <span className="text-accent/90 font-medium">ACS Student Chapter Archive</span>
          </div>
        </div>
      </div>
    </div>
  );
};
