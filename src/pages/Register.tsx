import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Bell,
  CheckCircle2,
  FileText,
  User,
  Mail,
  GraduationCap,
  Sparkles,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const Register: React.FC = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    updatePageSeo({
      title: 'Symbiosis 2026 Registration | ACS IACS Student Chapter',
      description:
        'Official event and symposium registration portal for the ACS IACS Student Chapter. Registration for Symbiosis 2026 will open soon. Chapter membership is always open.',
      canonical: `${siteConfig.meta.seo.canonical}register`,
    });
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim() && waitlistEmail.includes('@')) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* 1. Page Header */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber font-mono text-xs"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Status: Symbiosis 2026 Registration Opening Soon</span>
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight max-w-3xl leading-tight"
        >
          Symbiosis 2026 Registration
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base sm:text-lg text-muted max-w-2xl font-body leading-relaxed"
        >
          Official delegate and participant registration portal for Symbiosis 2026 at the Indian
          Association for the Cultivation of Science, Kolkata. Registration will open soon.
        </motion.p>
      </section>

      {/* Prominent Chapter Membership Callout (Always Open Distinction) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-6">
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
                This page is specifically for <strong>Symbiosis 2026 Event Registration</strong>{' '}
                (opening soon).{' '}
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

      {/* 2. Official Closure Announcement Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber shrink-0 mt-0.5">
              <Lock className="w-5 h-5 text-amber" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-display font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
                Symbiosis 2026 Registration
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber font-semibold uppercase">
                  Opening Soon
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl font-body">
                Registration for Symbiosis 2026 will open soon. Follow our official channels for
                announcements and intake deadlines.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto shrink-0">
            <Button
              href={siteConfig.links.registration}
              variant="primary"
              size="sm"
              className="w-full md:w-auto text-xs py-2 px-3.5"
              iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
            >
              Open Registration Form
            </Button>
            <Button
              to="/events"
              variant="outline"
              size="sm"
              className="w-full md:w-auto text-xs py-2 px-3"
            >
              Explore Events
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Waitlist Notification Signup */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-surface/80 border border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Bell className="w-5 h-5 text-accent shrink-0" />
            <div>
              <p className="font-display font-bold text-sm text-foreground">
                Get Notified When Intake Reopens
              </p>
              <p className="font-mono text-xs text-muted">
                Receive an immediate ping when the registration window unlocks.
              </p>
            </div>
          </div>

          {waitlistSubmitted ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs w-full md:w-auto justify-center">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You are on the priority notification roster!</span>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlistSubmit}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="your.email@iacs.res.in"
                className="px-3.5 py-2 text-xs font-mono rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/60 focus:outline-accent w-full md:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs shrink-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. Complete Placeholder Registration Form (Preview Mode) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="rounded-3xl bg-surface/90 border border-border shadow-card p-6 sm:p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden">
          {/* Top Form Status Plaque */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-5">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-accent" />
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">
                  Symbiosis 2026 Delegate Registration Form
                </h3>
                <span className="font-mono text-xs text-muted">
                  Official Registration Portal · IACS Kolkata
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border/80 text-muted font-mono text-xs">
              <Lock className="w-3.5 h-3.5 text-amber" />
              <span>Registration Opening Soon</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8 opacity-85">
            {/* Part 1: Delegate Identity */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                1. Delegate Identity & Affiliation
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">Full Name *</label>
                  <input
                    type="text"
                    disabled
                    placeholder="e.g. Scholar Sourav Bhattacharya"
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">
                    Institutional Email Address *
                  </label>
                  <input
                    type="email"
                    disabled
                    placeholder="e.g. yourname.chem@iacs.res.in"
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">Phone / WhatsApp Contact *</label>
                  <input
                    type="tel"
                    disabled
                    placeholder="e.g. +91 98310 XXXXX"
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">Institution / Campus *</label>
                  <input
                    type="text"
                    disabled
                    value="Indian Association for the Cultivation of Science"
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Part 2: Participation Track */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                2. Participation Track & Format
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">
                    Delegate Participation Format *
                  </label>
                  <select
                    disabled
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  >
                    <option>Oral Presentation Delegate (Abstract Required)</option>
                    <option>Poster Presentation Delegate (Abstract Required)</option>
                    <option>Attendee & Discussion Delegate</option>
                    <option>Hands-on Workshop Participant</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">Primary Subject Track *</label>
                  <input
                    type="text"
                    disabled
                    placeholder="e.g. Spectroscopy, Catalysis, Quantum Simulation"
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">ACS Membership Standing *</label>
                  <select
                    disabled
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  >
                    <option>ACS IACS Student Chapter Member</option>
                    <option>ACS International Member</option>
                    <option>Institutional Guest Scholar</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-muted">
                    ACS Member Number (Optional)
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="e.g. ACS-10294821 (if active member)"
                    className="px-3.5 py-2.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Part 3: Presentation Scope & Abstract */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                3. Proposed Abstract & Scientific Scope
              </span>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-muted">
                  Abstract Title & Summary (Max 250 words) *
                </label>
                <textarea
                  disabled
                  rows={4}
                  placeholder="Outline your research topic, primary experimental or computational methodology, key chemical observations, and relevance to the scheduled symposium..."
                  className="p-3.5 rounded-xl bg-surface/50 border border-border/80 text-foreground font-mono text-xs cursor-not-allowed resize-none"
                />
              </div>
            </div>

            {/* Part 4: Document Verification Dropzone Placeholder */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted">
                Abstract PDF Document Upload (Max 5MB)
              </label>
              <div className="p-6 rounded-2xl border-2 border-dashed border-border/80 bg-surface/40 flex flex-col items-center justify-center gap-2 text-center">
                <Lock className="w-6 h-6 text-muted/60" />
                <span className="font-mono text-xs text-foreground font-semibold">
                  Abstract Document Upload
                </span>
                <span className="font-mono text-[11px] text-muted">
                  Document submission activates when registration opens.
                </span>
              </div>
            </div>

            {/* Locked Submit Action */}
            <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Admissions & Credentials Committee · IACS Kolkata</span>
              </div>

              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-muted/20 border border-border text-muted font-display font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                <span>Registration Opening Soon</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 5. Helpful Information & Frequently Asked Questions */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-surface/80 border border-border flex flex-col gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-base text-foreground">Event Schedule</h4>
          <p className="text-xs font-mono text-muted leading-relaxed">
            Registration windows unlock 4–6 weeks prior to each scheduled symposium. Announcements
            are broadcasted across all official feeds.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 border border-border flex flex-col gap-2">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-base text-foreground">Delegate Eligibility</h4>
          <p className="text-xs font-mono text-muted leading-relaxed">
            Open to registered undergraduate, postgraduate, doctoral, and postdoctoral scholars
            engaged in molecular research across institutes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 border border-border flex flex-col gap-2">
          <Mail className="w-5 h-5 text-accent" />
          <h4 className="font-display font-bold text-base text-foreground">Chapter Membership</h4>
          <p className="text-xs font-mono text-muted leading-relaxed">
            Looking for regular chapter membership? Membership is always open and encouraged! Apply
            anytime at{' '}
            <a href="#/join" className="text-accent underline">
              Join Us
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
