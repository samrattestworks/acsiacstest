import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Action } from '@/sections/Action';
import { Focus } from '@/sections/Focus';
import { TeamGrid } from '@/sections/TeamGrid';
import { Marquee } from '@/components/ui/Marquee';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';

export const Join: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Join the Chapter (Always Open 2026) | ACS IACS Student Chapter',
      description:
        'Chapter membership is always available and encouraged for all students and researchers at IACS. Apply to join our 2026 roster anytime.',
      canonical: `${siteConfig.meta.seo.canonical}join`,
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Compact Hero */}
      <section className="pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-4 select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Chapter Membership Always Open // 2026 Roster</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
          Join the Chapter
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-2xl font-body leading-relaxed">
          Chapter membership is always available and warmly encouraged for all students, doctoral
          scholars, postdoctoral researchers, and fellows across IACS. Anyone can apply to join our
          active roster anytime.
        </p>
      </section>

      {/* Symbiosis 2026 Featured Invitation Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-accent/15 via-primary/10 to-amber/15 border border-accent/40 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0 shadow-inner">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold bg-accent/20 text-accent border border-accent/30">
                  Flagship Symposium
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Registrations Live
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-foreground tracking-tight">
                Symbiosis 2026 is Here!
              </h2>
              <p className="font-body text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
                15th December 2026 · CV Raman Hall, IACS Kolkata (Hybrid Mode). Convergent Frontiers
                in Materials Science &amp; Chemical Biology for Sustainable Development.
              </p>
            </div>
          </div>

          <Link
            to="/symbiosis-2026"
            className="w-full md:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-accent to-amber hover:opacity-95 text-white font-display font-bold text-sm shadow-lg shadow-accent/25 flex items-center justify-center gap-2 shrink-0 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Click to open Simbiosis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Action Panel (Application, Registration open/closed state, Connect) */}
      <Action />

      {/* Decorative Marquee Break */}
      <Marquee speedSeconds={48} className="my-10" />

      {/* 3. What We Work On (4 Focus Areas) */}
      <Focus />

      {/* 4. Meet the Team (Full Roster with 3D Tilt & Glare) */}
      <TeamGrid />
    </div>
  );
};

export default Join;
