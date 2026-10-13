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
      title: 'Join the Chapter | ACS IACS Student Chapter',
      description:
        'Submit applications, register for credentials, connect across networks, and explore research focus domains at ACS IACS.',
      canonical: `${siteConfig.meta.seo.canonical}join`,
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Compact Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-4 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Membership & Governance</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
          Join the Chapter
        </h1>

        <p className="text-base sm:text-lg text-muted max-w-xl font-body leading-relaxed">
          Shape the future of chemical sciences and molecular discovery at the Indian Association
          for the Cultivation of Science.
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
