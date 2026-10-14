import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '@/content/site';
import { HeritageSignage } from '@/components/ui/HeritageSignage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24"
      aria-label="About the chapter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Text Content & Periodic Element Motif */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              // Chapter Overview
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-tight">
            {siteConfig.about.title}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-muted/90 leading-relaxed">
            {siteConfig.about.subtitle}
          </p>

          {/* Real Single Text Block (Rendering ACS_ABOUT_TEXT Constant) */}
          <div className="p-4 sm:p-6 rounded-2xl bg-surface/70 border border-border/80 backdrop-blur-md shadow-xs">
            <p className="text-sm sm:text-base md:text-lg text-foreground font-body leading-relaxed whitespace-pre-line">
              {siteConfig.about.text}
            </p>
          </div>

          {/* Chapter Elemental Signature · I · Ac · C · S */}
          <div className="pt-2 sm:pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                // Chapter Elemental Signature · I · Ac · C · S
              </span>
              <span className="font-mono text-[10px] text-muted hidden sm:inline">
                Periodic Identity
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
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
                  className="flex flex-col p-3.5 rounded-xl bg-surface/90 border border-border/80 hover:border-accent/60 hover:shadow-[0_4px_20px_rgba(180,83,9,0.12)] transition-all shadow-xs group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-muted font-mono text-[9px] sm:text-[10px]">
                    <span className="font-bold text-accent">{elem.number}</span>
                    <span className="text-muted/80">{elem.mass}</span>
                  </div>
                  <span className="font-display font-black text-2xl sm:text-3xl text-foreground group-hover:text-accent transition-colors my-1">
                    {elem.symbol}
                  </span>
                  <div className="flex flex-col gap-1.5 pt-1.5 border-t border-border/50 text-[10px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground/90 truncate">{elem.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-accent/10 border border-accent/20 text-accent">
                        State: {elem.state}
                      </span>
                    </div>
                    <span className="text-[9px] text-muted truncate">{elem.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Laboratory Heritage Signage Plaque */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
          <motion.div
            style={{ y: prefersReducedMotion || !isDesktop ? 0 : parallaxY }}
            className="w-full"
          >
            <HeritageSignage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
