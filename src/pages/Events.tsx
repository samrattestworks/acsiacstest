import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Tag, ArrowUpRight, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { updatePageSeo } from '@/lib/seo';
import { siteConfig } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface EventItem {
  id: string;
  title: string;
  category: 'symposia' | 'seminars' | 'workshops' | 'outreach';
  categoryLabel: string;
  badge: string;
  badgeVariant?: 'accent' | 'amber' | 'primary' | 'muted';
  date: string;
  time: string;
  venue: string;
  speakers: string;
  abstractPlaceholder: string;
  imageAlt: string;
  imageAccentColor: string;
  featured?: boolean;
}

const CHAPTER_EVENTS: EventItem[] = [
  {
    id: 'symposium-2026',
    title: 'National Molecular Sciences & Catalysis Symposium 2026',
    category: 'symposia',
    categoryLabel: 'Annual Flagship Symposium',
    badge: 'Upcoming Flagship',
    badgeVariant: 'accent',
    date: 'November 18–20, 2026',
    time: '09:30 – 18:00 IST',
    venue: 'Centenary Auditorium, Main Campus, IACS Kolkata',
    speakers: 'Keynote: Distinguished Fellows of the ACS & National Science Academies',
    abstractPlaceholder:
      'The flagship multi-day academic symposium of the ACS IACS Student Chapter convening theoretical physicists, synthetic organic chemists, and ultrafast spectroscopists. Features 32 invited oral technical presentations, computational chemistry poster sessions, and delegate networking forums. Authors of accepted contributions present investigations in solvation kinetics, photoredox cycles, and quantum mechanical simulations.',
    imageAlt: 'Symposium Molecular Lattice and Catalytic Reaction Visual Placeholder',
    imageAccentColor: '#b45309',
    featured: true,
  },
  {
    id: 'colloquium-ultrafast',
    title: 'Ultrafast Spectroscopy of Photoredox Catalysts',
    category: 'seminars',
    categoryLabel: 'Distinguished Colloquium',
    badge: 'Lecture Series',
    badgeVariant: 'primary',
    date: 'November 05, 2026',
    time: '16:00 – 17:30 IST',
    venue: 'Father Lafont Hall & Hybrid Virtual Stream',
    speakers: 'Visiting Scholar Lecture Series · ACS International Exchange',
    abstractPlaceholder:
      'Investigation of excited-state electron transfer mechanisms and reactive radical intermediates using femtosecond transient absorption spectroscopy. The lecture discusses physical synthetic principles for visible-light photoredox catalysts in sustainable cross-coupling reactions.',
    imageAlt: 'Ultrafast Laser Pulse and Photoredox Intermediate Visual Placeholder',
    imageAccentColor: '#0f3b66',
  },
  {
    id: 'workshop-orca',
    title: 'Quantum Chemistry in Practice: ORCA & PySCF Bootcamp',
    category: 'workshops',
    categoryLabel: 'Hands-on Workshop',
    badge: 'Hands-on Lab',
    badgeVariant: 'amber',
    date: 'December 12, 2026',
    time: '10:00 – 16:30 IST',
    venue: 'Computational Simulation Lab & Hybrid Terminal',
    speakers: 'Chapter Computational Chemistry Division Mentors',
    abstractPlaceholder:
      'An intensive hands-on bootcamp exploring density functional theory (DFT) geometry optimizations, transition state locating, frequency calculations, and excited-state absorption spectra modeling using open-source quantum chemistry suites.',
    imageAlt: 'Molecular Orbital Density and DFT Grid Matrix Placeholder',
    imageAccentColor: '#15803d',
  },
  {
    id: 'outreach-molecules',
    title: 'Molecules to Materials: Science Outreach Day',
    category: 'outreach',
    categoryLabel: 'Community Outreach',
    badge: 'Outreach Initiative',
    badgeVariant: 'accent',
    date: 'January 15, 2027',
    time: '11:00 – 15:00 IST',
    venue: 'IACS Demonstration Hall & Campus Lawns',
    speakers: 'Student Chapter Volunteers & Faculty Advisors',
    abstractPlaceholder:
      'Interactive chemical demonstrations, crystal nucleation experiments, and molecular symmetry workshops organized by chapter delegates for visiting secondary school scholars across Kolkata to ignite scientific curiosity.',
    imageAlt: 'Chemical Glassware and Crystal Growth Illustration Placeholder',
    imageAccentColor: '#b45309',
  },
  {
    id: 'colloquium-flash',
    title: 'Young Chemists’ Research Colloquium: 3-Minute Thesis',
    category: 'seminars',
    categoryLabel: 'Doctoral Flash Talks',
    badge: 'Competition',
    badgeVariant: 'primary',
    date: 'February 24, 2027',
    time: '14:00 – 17:00 IST',
    venue: 'Meghnad Saha Seminar Hall',
    speakers: 'Peer Review Jury & Doctoral Candidates',
    abstractPlaceholder:
      'A dynamic research symposium where doctoral scholars present the essence of their doctoral dissertations in 180 seconds with a single static slide. Evaluated by an interdisciplinary panel with chapter certificates and travel grants.',
    imageAlt: 'Research Presentation Podium and Academic Jury Graphic Placeholder',
    imageAccentColor: '#0f3b66',
  },
];

export const Events: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'symposia' | 'seminars' | 'workshops' | 'outreach'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    updatePageSeo({
      title: 'Events & Symposia | ACS IACS Student Chapter',
      description:
        'Explore upcoming conferences, research colloquia, workshops, and science outreach organized by the American Chemical Society student chapter at IACS Kolkata.',
      canonical: `${siteConfig.meta.seo.canonical}events`,
    });
  }, []);

  const filteredEvents = CHAPTER_EVENTS.filter((event) => {
    const matchesFilter = activeFilter === 'all' || event.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.abstractPlaceholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredEvent = CHAPTER_EVENTS.find((e) => e.featured) || CHAPTER_EVENTS[0]!;

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* 1. Page Hero Banner */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center gap-4">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-mono text-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Chapter Scientific Gatherings // 2026–2027</span>
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
          Pioneering international discourse, molecular research seminars, technical workshops, and
          student symposia at the Indian Association for the Cultivation of Science, Kolkata.
        </motion.p>
      </section>

      {/* 2. Spotlight Featured Symposium */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-14">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Spotlight Gathering // Call for Abstracts
          </span>
        </div>

        <div className="rounded-3xl bg-surface/90 border border-border/90 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 transition-all hover:border-accent/40">
          {/* Featured Visual Image Placeholder */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-primary/10 via-accent/5 to-amber/10 min-h-[260px] sm:min-h-[320px] flex flex-col items-center justify-center p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border/80 overflow-hidden group">
            {/* Geometric Chemical Crystal Graphic SVG Placeholder */}
            <svg
              className="w-48 h-48 sm:w-56 sm:h-56 text-accent/30 group-hover:scale-105 transition-transform duration-700"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-label={featuredEvent.imageAlt}
            >
              <polygon points="100,20 180,65 180,145 100,190 20,145 20,65" strokeDasharray="4 3" />
              <circle cx="100" cy="105" r="50" strokeWidth="1.5" />
              <polygon points="100,45 155,75 155,135 100,165 45,135 45,75" stroke="currentColor" />
              <line x1="100" y1="20" x2="100" y2="45" strokeWidth="1.5" />
              <line x1="180" y1="65" x2="155" y2="75" strokeWidth="1.5" />
              <line x1="180" y1="145" x2="155" y2="135" strokeWidth="1.5" />
              <line x1="100" y1="190" x2="100" y2="165" strokeWidth="1.5" />
              <line x1="20" y1="145" x2="45" y2="135" strokeWidth="1.5" />
              <line x1="20" y1="65" x2="45" y2="75" strokeWidth="1.5" />
              <circle cx="100" cy="105" r="4" fill="currentColor" />
            </svg>

            {/* Corner Framing Brackets */}
            <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-accent/40" />
            <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-accent/40" />

            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-mono text-[10px] text-muted tracking-wider uppercase bg-surface/80 px-2 py-1 rounded border border-border">
                [Event Visual Archive // Placeholder Ref: IACS-SYM-2026]
              </span>
            </div>
          </div>

          {/* Featured Content & Text Placeholder */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/15 text-accent border border-accent/30">
                  {featuredEvent.badge}
                </span>
                <span className="font-mono text-xs text-muted">{featuredEvent.categoryLabel}</span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight leading-snug">
                {featuredEvent.title}
              </h2>

              {/* Event Metadata Pill Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-muted/90 pt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>{featuredEvent.venue}</span>
                </div>
              </div>

              {/* Abstract & Text Placeholder Block */}
              <div className="p-4 rounded-xl bg-surface-hover/70 border border-border/80 text-sm font-body text-foreground leading-relaxed">
                <p>{featuredEvent.abstractPlaceholder}</p>
              </div>

              <p className="font-mono text-xs text-muted">
                <strong className="text-foreground">Dignitaries:</strong> {featuredEvent.speakers}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60">
              <Button
                to="/register"
                variant="primary"
                size="md"
                iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
              >
                Registration Status
              </Button>
              <Button to="/#about" variant="outline" size="md">
                Chapter Mission
              </Button>
            </div>
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
                { id: 'all', label: 'All Gatherings' },
                { id: 'symposia', label: 'Symposia' },
                { id: 'seminars', label: 'Colloquia & Lectures' },
                { id: 'workshops', label: 'Workshops' },
                { id: 'outreach', label: 'Outreach' },
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
              placeholder="Filter topics or venue..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/60 focus:outline-accent"
            />
          </div>
        </div>
      </section>

      {/* 4. Events Roster Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center p-8 rounded-2xl bg-surface/50 border border-border">
            <Tag className="w-8 h-8 text-muted mb-2" />
            <p className="font-mono text-sm text-foreground font-semibold">
              No scheduled events match your filter.
            </p>
            <p className="font-mono text-xs text-muted mt-1">
              Try resetting the category filter or search query.
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
                  className="rounded-2xl bg-surface/85 border border-border hover:border-accent/40 shadow-xs hover:shadow-card transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Event Thumbnail Graphic Placeholder */}
                  <div className="relative h-44 sm:h-48 bg-gradient-to-br from-surface via-surface-hover to-accent/5 border-b border-border/80 flex items-center justify-center p-4 overflow-hidden">
                    {/* SVG Graphic Motif Placeholder */}
                    <svg
                      className="w-32 h-32 text-accent/25 group-hover:scale-110 transition-transform duration-500"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-label={event.imageAlt}
                    >
                      <circle cx="50" cy="50" r="36" strokeDasharray="3 2" />
                      <circle cx="50" cy="50" r="22" />
                      <circle cx="50" cy="14" r="5" fill="currentColor" fillOpacity="0.4" />
                      <circle cx="82" cy="50" r="5" fill="currentColor" fillOpacity="0.4" />
                      <circle cx="50" cy="86" r="5" fill="currentColor" fillOpacity="0.4" />
                      <circle cx="18" cy="50" r="5" fill="currentColor" fillOpacity="0.4" />
                      <line x1="50" y1="19" x2="50" y2="28" stroke="currentColor" />
                      <line x1="77" y1="50" x2="72" y2="50" stroke="currentColor" />
                      <line x1="50" y1="81" x2="50" y2="72" stroke="currentColor" />
                      <line x1="23" y1="50" x2="28" y2="50" stroke="currentColor" />
                    </svg>

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-surface border border-border text-accent">
                        {event.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-3">
                      <span className="font-mono text-[9px] text-muted/70 bg-surface/90 px-1.5 py-0.5 rounded border border-border/60">
                        Visual Placeholder
                      </span>
                    </div>
                  </div>

                  {/* Event Content & Text Placeholders */}
                  <div className="p-5 sm:p-6 flex flex-col gap-4 flex-grow justify-between">
                    <div className="flex flex-col gap-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {event.categoryLabel}
                      </span>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight group-hover:text-accent transition-colors leading-snug">
                        {event.title}
                      </h3>

                      <div className="flex flex-col gap-1.5 text-xs font-mono text-muted/80 pt-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>
                            {event.date} · {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>

                      {/* Text Abstract Placeholder */}
                      <p className="text-xs sm:text-sm text-foreground/80 font-body leading-relaxed pt-2 line-clamp-3">
                        {event.abstractPlaceholder}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
                      <span className="truncate pr-2">{event.speakers}</span>
                      <Button
                        to="/register"
                        variant="outline"
                        size="sm"
                        className="shrink-0 text-xs py-1 px-2.5"
                      >
                        Details
                      </Button>
                    </div>
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
