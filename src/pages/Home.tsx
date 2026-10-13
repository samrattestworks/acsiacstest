import React, { useEffect } from 'react';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { TeamPreview } from '@/sections/TeamPreview';
import { WhyJoin } from '@/sections/WhyJoin';
import { Marquee } from '@/components/ui/Marquee';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';

export const Home: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: siteConfig.meta.seo.title,
      description: siteConfig.meta.seo.description,
      canonical: siteConfig.meta.seo.canonical,
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero with Molecular Simulation & Split Headline */}
      <Hero />

      {/* 2. Decorative Element Marquee Strip */}
      <Marquee speedSeconds={40} />

      {/* 3. About Us with Real Text Block & Periodic Motif */}
      <About />

      {/* 4. Meet the Team Draggable Preview Carousel */}
      <TeamPreview />

      {/* 5. Why Join Us Bento Grid with Spotlight */}
      <WhyJoin />
    </div>
  );
};

export default Home;
