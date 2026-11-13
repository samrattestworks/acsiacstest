import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  GraduationCap,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const Register: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const symbiosis = siteConfig.symbiosis2026;

  useEffect(() => {
    updatePageSeo({
      title: 'Symbiosis 2026 Registration | ACS IACS Student Chapter',
      description:
        'Official registration portal for Symbiosis 2026: Convergent Frontiers in Materials Science & Chemical Biology for Sustainable Development. Register as IACS Student or External Delegate.',
      canonical: `${siteConfig.meta.seo.canonical}register`,
      image: getAssetUrl(symbiosis.poster.jpg),
    });
  }, [symbiosis.poster.jpg]);

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* 1. Page Header */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYMBIOSIS 2026 · REGISTRATIONS ACTIVELY OPEN</span>
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight max-w-4xl leading-tight"
        >
          Event Registration: <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-accent via-amber to-accent bg-clip-text text-transparent">
            Symbiosis 2026
          </span>
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base sm:text-lg text-muted max-w-2xl font-body leading-relaxed"
        >
          Official delegate and participant registration for <strong>Symbiosis 2026</strong>{' '}
          (Convergent Frontiers in Materials Science &amp; Chemical Biology for Sustainable
          Development) on <strong>15th December 2026</strong> at CV Raman Hall, IACS Kolkata &amp;
          Hybrid Mode.
        </motion.p>

        {/* Dedicated Page Callout Button */}
        <Link
          to="/symbiosis-2026"
          className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent/15 hover:bg-accent/25 border border-accent/40 text-accent font-display font-bold text-sm transition-all shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Open Full Dedicated Symbiosis 2026 Page &amp; Poster Showcase</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Prominent Chapter Membership Callout (Always Open Distinction) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
                Looking to Join the Chapter?
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-body max-w-xl">
                This page is specifically for <strong>Symbiosis 2026 Event Registration</strong>.{' '}
                <strong>Chapter Membership is ALWAYS open and warmly encouraged</strong> for all
                students, research scholars, and postdocs across IACS. Anyone can apply anytime!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <Button
              to="/join"
              variant="primary"
              size="sm"
              className="w-full sm:w-auto text-xs py-2.5 px-4 whitespace-nowrap shadow-md shadow-accent/20"
            >
              Apply for Chapter Membership →
            </Button>
          </div>
        </div>
      </section>

      {/* Live Countdown Timer */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-10">
        <div className="p-6 sm:p-8 rounded-3xl bg-surface/85 border border-border shadow-card backdrop-blur-md">
          <CountdownTimer targetDate={symbiosis.targetDate} />
        </div>
      </section>

      {/* 2. Official Registration Portals */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            Select Your Registration Portal
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground mt-1">
            Official Google Forms Registration
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-2 max-w-xl mx-auto">
            Choose the form that corresponds to your institution to ensure correct verification and
            credentialing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portal 1: For IACS Students */}
          <Card
            spotlight={true}
            className="p-6 sm:p-7 rounded-3xl border-2 border-primary/40 bg-surface/90 shadow-xl flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/15 text-primary border border-primary/25">
                  Internal (IACS)
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-xl text-foreground">
                  For IACS Students
                </h3>
                <p className="font-mono text-xs text-accent mt-0.5">
                  BS-MS · Int-PhD · PhD · Postdocs
                </p>
                <p className="font-body text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  For all registered scholars and students currently enrolled at the Indian
                  Association for the Cultivation of Science, Kolkata.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface/60 border border-border/60 text-xs font-mono text-muted flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-foreground font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Verified Delegate Pass</span>
                </div>
                <span>• In-person seating at CV Raman Hall</span>
                <span>• Complimentary symposium kit &amp; credentials</span>
              </div>
            </div>

            <a
              href={symbiosis.registration.iacsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] rounded-xl bg-primary hover:bg-primary-hover text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <span>Open IACS Registration Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Card>

          {/* Portal 2: For External Students */}
          <Card
            spotlight={true}
            className="p-6 sm:p-7 rounded-3xl border-2 border-accent/40 bg-surface/90 shadow-xl flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/25">
                  External Delegates
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-xl text-foreground">
                  For External Students
                </h3>
                <p className="font-mono text-xs text-accent mt-0.5">
                  Universities · Colleges · Institutes
                </p>
                <p className="font-body text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  For students and researchers from universities, colleges, IITs, IISERs, and other
                  national and international institutions.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface/60 border border-border/60 text-xs font-mono text-muted flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-foreground font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Hybrid Participation</span>
                </div>
                <span>• Physical attendance at CV Raman Hall</span>
                <span>• Live interactive virtual stream &amp; e-certificate</span>
              </div>
            </div>

            <a
              href={symbiosis.registration.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-accent to-amber hover:opacity-95 text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-accent/20 transition-all cursor-pointer"
            >
              <span>Open External Registration Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Card>
        </div>
      </section>

      {/* 3. Helpful Information */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-surface/80 border border-border flex flex-col gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-base text-foreground">Event Schedule</h4>
          <p className="text-xs font-mono text-muted leading-relaxed">
            Tuesday, 15th December 2026, starting at 10:30 AM IST. Inaugural address followed by
            keynote presentations and poster exhibition.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 border border-border flex flex-col gap-2">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-base text-foreground">Delegate Eligibility</h4>
          <p className="text-xs font-mono text-muted leading-relaxed">
            Open to registered undergraduate, postgraduate, doctoral, and postdoctoral scholars
            engaged in molecular, materials, and chemical biology research.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 border border-border flex flex-col gap-2">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-base text-foreground">Hybrid Access</h4>
          <p className="text-xs font-mono text-muted leading-relaxed">
            All registered external delegates receive authenticated credentials for the interactive
            live broadcast with real-time question submission.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
