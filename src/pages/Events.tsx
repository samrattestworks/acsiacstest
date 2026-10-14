import React, { useEffect } from 'react';
import { updatePageSeo } from '@/lib/seo';
import { siteConfig, ACS_EVENTS_PLACEHOLDER } from '@/content/site';

export const Events: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Events | ACS IACS Student Chapter',
      description: 'Official events archive and announcements for the ACS IACS Student Chapter.',
      canonical: `${siteConfig.meta.seo.canonical}events`,
    });
  }, []);

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2 text-left sm:text-center items-start sm:items-center">
          <h1 className="font-display font-black text-3xl sm:text-5xl text-foreground tracking-tight">
            Events
          </h1>
          <p className="text-sm sm:text-base text-muted font-body">
            American Chemical Society Student Chapter · IACS Kolkata
          </p>
        </div>

        {/* Black Container with Mandated Placeholder */}
        <div className="w-full bg-black rounded-2xl p-10 sm:p-16 flex items-center justify-center text-center border border-neutral-800 shadow-inner mt-4">
          <p className="font-mono text-sm sm:text-base text-neutral-300 font-semibold tracking-wider select-text">
            {ACS_EVENTS_PLACEHOLDER}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Events;
