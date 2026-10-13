import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TeamGrid } from '@/sections/TeamGrid';
import { Marquee } from '@/components/ui/Marquee';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';
import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const Team: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    updatePageSeo({
      title: 'Chapter Leadership & Team | ACS IACS Student Chapter',
      description:
        'Meet the faculty advisors, executive officers, functional leads, and research scholars guiding the ACS Student Chapter at IACS Kolkata.',
      canonical: `${siteConfig.meta.seo.canonical}team`,
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Dedicated Team Hero Banner */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-5 select-none">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Governance & Executive Officers</span>
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight max-w-4xl leading-tight"
        >
          Leadership Driving <br className="hidden sm:inline" />
          <span className="text-accent">Molecular Innovation</span>
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-muted max-w-2xl font-body leading-relaxed"
        >
          Meet the distinguished faculty patrons, elected chapter officers, committee leads, and
          active research associates steering academic symposia and research collaborations at IACS.
        </motion.p>

        {/* Governance Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-mono text-muted">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>Official ACS Charter Verification</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-mono text-muted">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Democratic Annual Elections</span>
          </div>
        </div>
      </section>

      {/* 2. Full Interactive Team Roster (with Group Filtering & 3D Tilt Cards) */}
      <TeamGrid />

      {/* Decorative Marquee */}
      <Marquee speedSeconds={45} className="my-10" />

      {/* 3. Join Executive Committee Callout Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full select-none">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-surface via-surface-hover to-primary/10 border border-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-card">
          <div className="flex flex-col gap-3 text-center md:text-left max-w-md">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              // Chapter Governance
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Interested in Serving on the Committee?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Applications for junior coordinator appointments, event management leads, and student
              delegates open each semester.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Button
              to="/join"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
