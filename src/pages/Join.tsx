import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-4 select-none">
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

      {/* Distinction Callout Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface/80 border border-border/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-start sm:items-center gap-3">
            <span className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
              ✨
            </span>
            <p className="text-muted leading-relaxed font-body">
              <strong className="text-foreground font-semibold">Important Distinction:</strong>{' '}
              Chapter Membership is open year-round for all scholars. Looking for specific Symposium
              or Conference Registration? Event registrations open per event cycle and are currently
              closed.
            </p>
          </div>
          <Link
            to="/register"
            className="shrink-0 text-accent hover:underline font-mono text-xs font-semibold flex items-center gap-1 self-start sm:self-center"
          >
            View Event Registration →
          </Link>
        </div>
      </div>

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
