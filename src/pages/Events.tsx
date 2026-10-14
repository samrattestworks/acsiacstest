import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Tag, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { updatePageSeo } from '@/lib/seo';
import { siteConfig, ACS_EVENTS_PLACEHOLDER } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ChapterEvent {
  id: string;
  number: string;
  title: string;
  series: string;
  category: 'colloquia' | 'workshops' | 'outreach' | 'flash-talks';
}

const CHAPTER_EVENTS: ChapterEvent[] = [
  {
    id: 'colloquium-ultrafast',
    number: '01',
    title: 'Ultrafast Spectroscopy of Photoredox Catalysts',
    series: 'Distinguished Colloquium Series',
    category: 'colloquia',
  },
  {
    id: 'workshop-orca',
    number: '02',
    title: 'Quantum Chemistry in Practice: ORCA & PySCF Bootcamp',
    series: 'Hands-on Workshop',
    category: 'workshops',
  },
  {
    id: 'outreach-molecules',
    number: '03',
    title: 'Molecules to Materials: Science Outreach Day',
    series: 'Secondary School Outreach',
    category: 'outreach',
  },
  {
    id: 'colloquium-flash',
    number: '04',
    title: "Young Chemists' Research Colloquium: 3-Minute Thesis",
    series: 'Doctoral Flash Talks',
    category: 'flash-talks',
  },
];

export const Events: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'colloquia' | 'workshops' | 'outreach' | 'flash-talks'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    updatePageSeo({
      title: 'Events & Symposia | ACS IACS Student Chapter',
      description:
        'Official academic events, distinguished colloquia, hands-on workshops, and outreach programs organized by the ACS IACS Student Chapter.',
      canonical: `${siteConfig.meta.seo.canonical}events`,
    });
  }, []);

  const filteredEvents = CHAPTER_EVENTS.filter((event) => {
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.series.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* 1. Page Hero Banner */}
      <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center gap-4">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-mono text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Chapter Scientific Gatherings & Colloquia</span>
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight max-w-3xl leading-tight"
        >
          Academic Events & Symposia
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base sm:text-lg text-muted max-w-2xl font-body leading-relaxed"
        >
          Distinguished colloquia, computational bootcamps, secondary school outreach, and doctoral
          research symposia at the Indian Association for the Cultivation of Science, Kolkata.
        </motion.p>
      </section>

      {/* 2. Distinction & Quick Navigation Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-surface/85 border border-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
                Chapter Academic Program & Archives
              </h2>
              <p className="text-xs sm:text-sm text-muted font-body leading-relaxed">
                Event delegate registrations are cycle-based (currently closed). General chapter
                membership is always available and encouraged!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <Button
              to="/register"
              variant="outline"
              size="sm"
              className="w-full md:w-auto text-xs py-2 px-3"
            >
              Event Registration
            </Button>
            <Button
              to="/join"
              variant="primary"
              size="sm"
              className="w-full md:w-auto text-xs py-2 px-3"
            >
              Join Chapter
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Controls & Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-8">
        <div className="p-3 sm:p-4 rounded-2xl bg-surface/80 border border-border flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {(
              [
                { id: 'all', label: 'All 4 Events' },
                { id: 'colloquia', label: 'Colloquia' },
                { id: 'workshops', label: 'Workshops' },
                { id: 'outreach', label: 'Outreach' },
                { id: 'flash-talks', label: 'Flash Talks' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-accent text-accent-foreground shadow-xs font-semibold'
                    : 'text-muted hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event title or track..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/60 focus:outline-accent"
            />
          </div>
        </div>
      </section>

      {/* 4. Events Roster Grid — Solid Black Placeholders with Bracket Constant */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center p-8 rounded-2xl bg-surface/50 border border-border">
            <Tag className="w-8 h-8 text-muted mb-2" />
            <p className="font-mono text-sm text-foreground font-semibold">
              No scheduled events match your filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg text-xs font-mono text-accent bg-accent/10 border border-accent/20 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="rounded-2xl bg-surface/90 border border-border hover:border-accent/40 shadow-xs hover:shadow-card transition-all flex flex-col justify-between p-6 sm:p-7 gap-5 group"
                >
                  {/* Card Header */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-accent px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25">
                        {event.number} // {event.series}
                      </span>
                      <span className="font-mono text-[11px] text-muted font-medium">
                        ACS IACS Chapter
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight mt-1 leading-snug group-hover:text-accent transition-colors">
                      {event.title}
                    </h2>
                  </div>

                  {/* Black Placeholder Container with Bracketed Constant Text */}
                  <div className="w-full bg-black rounded-xl border border-neutral-800 p-6 sm:p-8 min-h-[190px] sm:min-h-[210px] flex items-center justify-center text-center shadow-inner">
                    <p className="font-mono text-xs sm:text-sm text-neutral-300 font-semibold tracking-wider select-text">
                      {ACS_EVENTS_PLACEHOLDER}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
                    <span className="truncate pr-2">{event.series}</span>
                    <Button
                      to="/register"
                      variant="outline"
                      size="sm"
                      className="shrink-0 text-xs py-1 px-3 flex items-center gap-1"
                      iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
                    >
                      Registration
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;
