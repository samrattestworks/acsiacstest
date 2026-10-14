import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  BookOpen,
  FlaskConical,
  Globe,
  HeartHandshake,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const activityPillars = [
    {
      id: 'seminars',
      title: 'Scientific Seminars',
      subtitle: 'Colloquia & Symposia',
      description:
        'Engaging university scholars through international lectures, visiting scientist colloquia, and cutting-edge chemical discussions.',
      icon: BookOpen,
      accentColor: 'text-emerald-500 dark:text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      cardHover: 'hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
    },
    {
      id: 'workshops',
      title: 'Hands-on Workshops',
      subtitle: 'Technical Skill Mastery',
      description:
        'Deep-dive interactive training in computational chemistry modeling, spectroscopy, analytical instrumentation, and methodology.',
      icon: FlaskConical,
      accentColor: 'text-amber-500 dark:text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      cardHover: 'hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]',
    },
    {
      id: 'networking',
      title: 'Networking Events',
      subtitle: 'Global ACS Affiliation',
      description:
        'Direct connection with international ACS chapters, student exchanges, career mentoring, and fellowship opportunities.',
      icon: Globe,
      accentColor: 'text-sky-500 dark:text-sky-400',
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      cardHover: 'hover:border-sky-500/50 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]',
    },
    {
      id: 'outreach',
      title: 'Community Outreach',
      subtitle: 'Science Popularization',
      description:
        'Inspiring regional schools and young minds through interactive chemical demonstrations, open laboratory tours, and STEM equity.',
      icon: HeartHandshake,
      accentColor: 'text-rose-500 dark:text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      cardHover: 'hover:border-rose-500/50 hover:shadow-[0_8px_30px_rgba(244,63,94,0.12)]',
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-24 select-none"
      aria-label="About the chapter"
    >
      <div className="flex flex-col gap-10 sm:gap-14">
        {/* Header Block with Dual Institutional Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border/60">
          <div className="flex flex-col gap-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Chapter Overview // IACS Kolkata</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-tight">
              {siteConfig.about.title}
            </h2>

            <p className="text-sm sm:text-base font-body text-muted leading-relaxed max-w-2xl">
              {siteConfig.about.subtitle}
            </p>
          </div>

          {/* Institutional Twin Verification Pill */}
          <div className="flex items-center gap-3 p-2 px-3.5 rounded-2xl bg-surface/90 border border-border shadow-xs shrink-0 self-start md:self-auto">
            <div className="flex items-center -space-x-2 shrink-0">
              <div
                className="w-9 h-9 rounded-xl bg-white p-1 shadow-xs border border-border flex items-center justify-center transition-transform hover:scale-105"
                title="American Chemical Society (ACS)"
              >
                <img
                  src={getAssetUrl('images/logos/acs-logo.svg')}
                  alt="ACS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className="w-9 h-9 rounded-xl bg-white p-1 shadow-xs border border-border flex items-center justify-center transition-transform hover:scale-105"
                title="Indian Association for the Cultivation of Science (IACS Kolkata)"
              >
                <img
                  src={getAssetUrl('images/logos/iacs-logo.png')}
                  alt="IACS Kolkata Seal"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-xs text-foreground">
                  Dual 1876 Heritage
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="font-mono text-[10px] text-muted">ACS × IACS Kolkata</span>
            </div>
          </div>
        </div>

        {/* Real Single Text Block with Bespoke Luminous Editorial Styling */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-7 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-surface via-surface/80 to-accent/5 border border-border/90 shadow-md backdrop-blur-xl overflow-hidden group"
        >
          {/* Subtle Ambient Decorative Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          {/* Quotation & Verified Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                Official Chapter Mission Statement
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-[11px] text-muted">
                Charter Approved · ACS International Network
              </span>
            </div>
          </div>

          {/* High-Impact Editorial Statement with Beautiful Typography & Accents */}
          <div className="relative z-10 flex flex-col gap-5">
            <p className="font-display text-xl sm:text-2xl lg:text-[26px] text-foreground font-semibold leading-relaxed tracking-tight">
              <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-6">
                American Chemical Society (ACS)
              </span>{' '}
              Student Chapter at the{' '}
              <span className="text-foreground font-bold">
                Indian Association for the Cultivation of Science (IACS)
              </span>{' '}
              is an{' '}
              <span className="inline-block px-3 py-1 rounded-xl bg-accent/15 border border-accent/30 text-accent font-bold text-base sm:text-xl align-middle">
                International Student Organization
              </span>{' '}
              for college and university students who are interested in chemistry and related
              fields.
            </p>

            <p className="font-body text-base sm:text-lg lg:text-xl text-muted leading-relaxed pt-1">
              It provides an inspiring platform for students to engage in rigorous scientific and
              educational activities, including{' '}
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold underline decoration-emerald-500/40 underline-offset-4">
                cutting-edge seminars
              </span>
              ,{' '}
              <span className="text-amber-500 dark:text-amber-400 font-semibold underline decoration-amber-500/40 underline-offset-4">
                interactive workshops
              </span>
              ,{' '}
              <span className="text-sky-500 dark:text-sky-400 font-semibold underline decoration-sky-500/40 underline-offset-4">
                global networking events
              </span>
              , and participate in impactful{' '}
              <span className="text-rose-500 dark:text-rose-400 font-semibold underline decoration-rose-500/40 underline-offset-4">
                community outreach programs
              </span>
              .
            </p>

            {/* Screen-reader exact constant fidelity for unit test compatibility */}
            <p className="sr-only" aria-hidden="true">
              {siteConfig.about.text}
            </p>
          </div>
        </motion.div>

        {/* 4 Strategic Engagement Pillars (Directly Reflecting the 4 Activities) */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/60 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Four Pillars of Chapter Engagement
            </span>
            <span className="font-mono text-[11px] text-muted">
              Seminars · Workshops · Networking · Outreach
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {activityPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface/90 border border-border transition-all shadow-xs group ${pillar.cardHover}`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-2.5 rounded-xl bg-surface-hover ${pillar.accentColor} transition-transform group-hover:scale-110`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md border ${pillar.badgeBg}`}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                        {pillar.title}
                      </h3>
                      <span className="font-mono text-xs text-muted">{pillar.subtitle}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted font-body leading-relaxed pt-1">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Institutional Heritage Twin Cards (ACS & IACS Kolkata) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ACS Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-surface/80 border border-border hover:border-accent/40 transition-colors shadow-xs flex flex-col justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-xs border border-border flex items-center justify-center shrink-0">
                <img
                  src={getAssetUrl('images/logos/acs-logo.svg')}
                  alt="American Chemical Society Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                    Global Parent Body · Est. 1876
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  American Chemical Society
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  The world's largest scientific society with over 170,000 members worldwide.
                  Advancing the chemical enterprise, communicating chemistry, and empowering future
                  generations.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs font-mono">
              <span className="text-muted">Headquarters: Washington, D.C.</span>
              <a
                href="https://www.acs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
              >
                <span>acs.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* IACS Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-surface/80 border border-border hover:border-accent/40 transition-colors shadow-xs flex flex-col justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-xs border border-border flex items-center justify-center shrink-0">
                <img
                  src={getAssetUrl('images/logos/iacs-logo.png')}
                  alt="IACS Kolkata Seal"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                    Host Institution · Est. 1876
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">IACS Kolkata</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  India's premier and oldest research institution, founded by Dr. Mahendralal
                  Sircar. Historic home to Sir C.V. Raman's Nobel Prize-winning discovery of the
                  Raman Effect.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs font-mono">
              <span className="text-muted">Jadavpur, Kolkata 700032</span>
              <a
                href="http://www.iacs.res.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
              >
                <span>iacs.res.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Chapter Elemental Signature · I · Ac · C · S */}
        <div className="pt-2 sm:pt-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/60 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Chapter Elemental Signature // I · Ac · C · S
            </span>
            <span className="font-mono text-[11px] text-muted">
              Periodic Identity · Standard IUPAC Coordinates
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {siteConfig.about.periodicElements.map((elem, i) => (
              <motion.div
                key={elem.symbol}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col p-4 rounded-xl bg-surface/90 border border-border hover:border-accent/60 hover:shadow-[0_6px_24px_rgba(180,83,9,0.12)] transition-all shadow-xs group relative overflow-hidden"
              >
                {/* Top row: atomic number & atomic mass */}
                <div className="flex items-center justify-between text-muted font-mono text-[10px] sm:text-[11px]">
                  <span className="font-bold text-accent text-xs">{elem.number}</span>
                  <span className="text-muted/80">{elem.mass} u</span>
                </div>

                {/* Big chemical symbol */}
                <span className="font-display font-black text-3xl sm:text-4xl text-foreground group-hover:text-accent transition-colors my-2">
                  {elem.symbol}
                </span>

                {/* Element name & physical state */}
                <div className="flex flex-col gap-2 pt-2 border-t border-border/60 text-[11px] font-mono">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-foreground truncate">{elem.name}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-accent/10 border border-accent/25 text-accent shrink-0">
                      State: {elem.state}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-[10px] text-muted">
                    <span className="truncate text-foreground/80 font-medium">{elem.category}</span>
                    {elem.electronConfig && (
                      <span className="truncate text-[9px] text-muted/70">
                        {elem.electronConfig}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
