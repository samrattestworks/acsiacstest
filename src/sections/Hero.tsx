import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { StaticMoleculeFallback } from '@/three/StaticMoleculeFallback';
import { useDeviceTier } from '@/three/useDeviceTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToElement } from '@/lib/navigation';

// Lazy-load the Three.js 3D scene to keep initial bundle ultra-lean (<150KB gzip)
const MoleculeScene = lazy(() => import('@/three/MoleculeScene'));

export const Hero: React.FC = () => {
  const { supportsWebGL, tier } = useDeviceTier();
  const prefersReducedMotion = useReducedMotion();

  // Staggered headline animation variants (under 1.8s, skippable with reduced-motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 select-none"
      aria-label="Hero section"
    >
      {/* Interactive 3D Molecular Simulation / Static Fallback */}
      {supportsWebGL && tier !== 'none' && !prefersReducedMotion ? (
        <Suspense fallback={<StaticMoleculeFallback />}>
          <MoleculeScene />
        </Suspense>
      ) : (
        <StaticMoleculeFallback />
      )}

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center w-full">
        <motion.div
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          className="flex flex-col items-center gap-4 sm:gap-6 w-full"
        >
          {/* Institution Badge with Molecular Dot */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-surface/80 border border-border/80 backdrop-blur-md shadow-xs max-w-[92vw]"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-muted truncate">
              {siteConfig.meta.institution}
            </span>
          </motion.div>

          {/* Main Headline Split by Lines - Fluid on Mobile */}
          <motion.h1
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="font-display font-extrabold tracking-tight text-foreground text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] sm:leading-[1.08] px-2 text-balance"
          >
            American Chemical Society <br />
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              IACS Student Chapter
            </span>
          </motion.h1>

          {/* Short Basic Description (2 Lines Max as required) */}
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted max-w-2xl font-body leading-relaxed text-balance px-2"
          >
            {siteConfig.meta.heroDescription}
          </motion.p>

          {/* 2 CTAs: Join Us & Learn More */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Button
              to="/join"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
              iconRight={<ArrowUpRight className="w-5 h-5 ml-1" />}
            >
              Join Us
            </Button>
            <Button
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement('about');
              }}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-muted/80 pointer-events-none"
        >
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Explore
          </span>
          <ArrowDown className="w-4 h-4 text-accent" />
        </motion.div>
      </div>
    </section>
  );
};
