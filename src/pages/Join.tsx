import React, { useEffect } from 'react';
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
