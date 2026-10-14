import React, { useEffect } from 'react';
import { updatePageSeo } from '@/lib/seo';
import { siteConfig, ACS_EVENTS_PLACEHOLDER } from '@/content/site';

const EVENTS_LIST = [
  {
    number: '1',
    title: 'Ultrafast Spectroscopy of Photoredox Catalysts',
    series: 'Distinguished Colloquium Series',
  },
  {
    number: '2',
    title: 'Quantum Chemistry in Practice: ORCA & PySCF Bootcamp',
    series: 'Hands-on Workshop',
  },
  {
    number: '3',
    title: 'Molecules to Materials: Science Outreach Day',
    series: 'Secondary School Outreach',
  },
  {
    number: '4',
    title: "Young Chemists' Research Colloquium: 3-Minute Thesis",
    series: 'Doctoral Flash Talks',
  },
];

export const Events: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Events | ACS IACS Student Chapter',
      description:
        'Official academic events organized by the American Chemical Society Student Chapter at IACS Kolkata.',
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

        {/* The 4 Events with Solid Black Bracket Placeholder */}
        <div className="flex flex-col gap-6 w-full mt-2">
          {EVENTS_LIST.map((event) => (
            <div
              key={event.number}
              className="p-6 sm:p-8 rounded-2xl bg-surface/70 border border-border flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                  {event.number}. {event.title}
                </h2>
                <span className="font-mono text-xs text-accent font-medium">({event.series})</span>
              </div>

              {/* Solid Black Placeholder Box */}
              <div className="w-full bg-black rounded-xl p-8 sm:p-12 flex items-center justify-center text-center border border-neutral-800">
                <p className="font-mono text-xs sm:text-sm text-neutral-300 font-semibold tracking-wider select-text">
                  {ACS_EVENTS_PLACEHOLDER}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
