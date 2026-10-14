import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { About as AboutSection } from '@/sections/About';
import { Focus } from '@/sections/Focus';
import { Marquee } from '@/components/ui/Marquee';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';
import { ArrowUpRight, Award, Compass, BookOpen, Users } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    updatePageSeo({
      title: 'About the Chapter | ACS IACS Student Chapter',
      description:
        'Explore the charter, scientific mission, and research frontiers of the American Chemical Society student chapter at the Indian Association for the Cultivation of Science (IACS), Kolkata.',
      canonical: `${siteConfig.meta.seo.canonical}about`,
    });
  }, []);

  const milestones = [
    {
      year: '1876',
      title: 'Historic Inception',
      description:
        'Dr. Mahendralal Sircar establishes IACS, inaugurating modern scientific investigation and physical research in India.',
      icon: BookOpen,
    },
    {
      year: '1930',
      title: 'Nobel Triumph',
      description:
        'Sir C.V. Raman receives the Nobel Prize in Physics for the discovery of the Raman Effect, accomplished entirely at IACS Kolkata.',
      icon: Award,
    },
    {
      year: '2024',
      title: 'ACS Chartering',
      description:
        'Official chartering of the ACS Student Chapter at IACS to bridge fundamental chemistry with global ACS networks.',
      icon: Compass,
    },
    {
      year: '2026',
      title: 'Molecular Horizon',
      description:
        'Leading high-impact symposia, machine learning surrogate modeling in solvation, and state-wide chemistry outreach.',
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Dedicated About Hero Banner */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-5 select-none">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/90 border border-border shadow-xs max-w-[95vw]"
        >
          <div className="flex items-center -space-x-1.5 shrink-0">
            <div
              className="w-7 h-7 rounded-lg bg-white p-0.5 shadow-2xs border border-border/60 flex items-center justify-center"
              title="American Chemical Society"
            >
              <img
                src={getAssetUrl('images/logos/acs-logo.svg')}
                alt="ACS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className="w-7 h-7 rounded-lg bg-white p-0.5 shadow-2xs border border-border/60 flex items-center justify-center"
              title="IACS Kolkata"
            >
              <img
                src={getAssetUrl('images/logos/iacs-logo.png')}
                alt="IACS Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent truncate">
            Charter & Scientific Mission · ACS × IACS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0 hidden xs:inline-block" />
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight max-w-4xl leading-tight"
        >
          Precision in Discovery. <br className="hidden sm:inline" />
          <span className="text-accent">Bonds that Endure.</span>
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-muted max-w-2xl font-body leading-relaxed"
        >
          The official American Chemical Society (ACS) Student Chapter at the Indian Association for
          the Cultivation of Science (IACS), Kolkata — an international student platform providing
          opportunities for chemistry students to engage in seminars, workshops, networking events,
          and community outreach programs.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Button to="/team" variant="outline" size="md">
            Meet Chapter Leadership
          </Button>
          <Button
            to="/join"
            variant="primary"
            size="md"
            iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
          >
            Join Chapter Roster
          </Button>
        </div>
      </section>

      {/* 2. Core Chapter Overview Section */}
      <AboutSection />

      {/* 3. Historic Milestones Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            // Historic Trajectory
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Legacy of Scientific Inquiry
          </h2>
          <p className="text-sm font-mono text-muted max-w-lg">
            From the historic laboratory benches of Jadavpur to the international ACS frontier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors shadow-xs flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/20">
                    {m.year}
                  </span>
                  <div className="p-2 rounded-xl bg-surface-hover text-muted group-hover:text-accent transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{m.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Decorative Marquee */}
      <Marquee speedSeconds={42} className="my-6" />

      {/* 4. Research Focus Areas */}
      <Focus />
    </div>
  );
};

export default About;
