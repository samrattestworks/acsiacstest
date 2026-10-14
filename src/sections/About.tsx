import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20 sm:scroll-mt-24 select-none"
      aria-label="About the chapter"
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        {/* Header Block */}
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              // Chapter Overview // IACS Kolkata
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-tight">
            {siteConfig.about.title}
          </h2>

          <p className="text-sm sm:text-base font-body text-muted leading-relaxed max-w-3xl">
            {siteConfig.about.subtitle}
          </p>
        </div>

        {/* Real Single Text Block (Rendering ACS_ABOUT_TEXT Constant) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface/80 border border-border shadow-xs backdrop-blur-md">
          <p className="text-base sm:text-lg text-foreground font-body leading-relaxed whitespace-pre-line">
            {siteConfig.about.text}
          </p>
        </div>

        {/* Chapter Elemental Signature · I · Ac · C · S */}
        <div className="pt-2 sm:pt-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/60 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Chapter Elemental Signature // I · Ac · C · S
            </span>
            <span className="font-mono text-[11px] text-muted">
              Periodic Identity · Standard IUPAC Coordinates
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {siteConfig.about.periodicElements.map((elem, i) => (
              <motion.div
                key={elem.symbol}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col p-4 rounded-xl bg-surface/90 border border-border hover:border-accent/60 hover:shadow-[0_6px_24px_rgba(180,83,9,0.12)] transition-all shadow-xs group relative overflow-hidden"
              >
                {/* Top row: atomic number & atomic mass */}
                <div className="flex items-center justify-between text-muted font-mono text-[10px] sm:text-[11px]">
                  <span className="font-bold text-accent text-xs">{elem.number}</span>
                  <span className="text-muted/80">{elem.mass} u</span>
                </div>

                {/* Big chemical symbol */}
                <span className="font-display font-black text-3xl sm:text-4xl text-foreground group-hover:text-accent transition-colors my-2">
                  {elem.symbol}
                </span>

                {/* Element name & physical state */}
                <div className="flex flex-col gap-2 pt-2 border-t border-border/60 text-[11px] font-mono">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-foreground truncate">{elem.name}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-accent/10 border border-accent/25 text-accent shrink-0">
                      State: {elem.state}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-[10px] text-muted">
                    <span className="truncate text-foreground/80 font-medium">{elem.category}</span>
                    {elem.electronConfig && (
                      <span className="truncate text-[9px] text-muted/70">
                        {elem.electronConfig}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
