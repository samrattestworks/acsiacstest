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

          {/* Decorative Periodic Table Tile Motif Animating In */}
          <div className="pt-2 sm:pt-4 flex flex-col gap-3">
            <span className="font-mono text-[11px] sm:text-xs uppercase text-muted tracking-wider">
              Fundamental Elements
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
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
                  className="flex flex-col p-2.5 sm:p-3 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors shadow-xs group"
                >
                  <div className="flex items-center justify-between text-muted font-mono text-[9px] sm:text-[10px]">
                    <span>{elem.number}</span>
                    <span>{elem.mass}</span>
                  </div>
                  <span className="font-display font-black text-xl sm:text-2xl text-accent group-hover:text-amber transition-colors mt-0.5 sm:mt-1">
                    {elem.symbol}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-foreground/80 mt-0.5">
                    {elem.name}
                  </span>
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
