import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Globe,
  Share2,
  Copy,
  Check,
  Download,
  Maximize2,
  X,
  ExternalLink,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building2,
  Award,
  Layers,
  Dna,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/content/site';
import { updatePageSeo } from '@/lib/seo';
import { Card } from '@/components/ui/Card';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

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

export const Symbiosis2026: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedIacs, setCopiedIacs] = useState(false);
  const [copiedExternal, setCopiedExternal] = useState(false);
  const [isPosterLightboxOpen, setIsPosterLightboxOpen] = useState(false);

  const symbiosis = siteConfig.symbiosis2026;

  useEffect(() => {
    updatePageSeo({
      title: 'Symbiosis 2026 | ACS IACS Student Chapter Flagship Symposium',
      description:
        'Official Symposium Portal for Symbiosis 2026: Convergent Frontiers in Materials Science & Chemical Biology for Sustainable Development. 15th December 2026 at CV Raman Hall, IACS Kolkata & Hybrid.',
      canonical: `${siteConfig.meta.seo.canonical}symbiosis-2026`,
      image: getAssetUrl(symbiosis.poster.jpg),
    });
  }, [symbiosis.poster.jpg]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPosterLightboxOpen) {
        setIsPosterLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPosterLightboxOpen]);

  const handleCopyPageUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleCopyFormUrl = async (
    url: string,
    setCopiedState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2200);
    } catch {
      // Fallback
    }
  };

  const shareText = `🔬 Symbiosis 2026: Convergent Frontiers in Materials Science & Chemical Biology for Sustainable Development\n📅 Date: 15th December 2026, 10:30 AM IST Onwards\n📍 Venue: CV Raman Hall, IACS Kolkata (Hybrid Mode)\n\nRegister now:\n• IACS Students: ${symbiosis.registration.iacsUrl}\n• External Students: ${symbiosis.registration.externalUrl}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\nOfficial Portal: ${typeof window !== 'undefined' ? window.location.href : 'https://samrattestworks.github.io/acsiacstest/symbiosis-2026'}`
  )}`;

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* 1. Header & Breadcrumb Bar */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono text-muted py-2"
        >
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/events" className="hover:text-accent transition-colors">
            Events
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-foreground font-semibold">Symbiosis 2026</span>
        </nav>
      </div>

      {/* 2. Hero Section */}
      <section className="pt-6 sm:pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Theme, Quick Meta, Action */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {/* Live Registration Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Registrations Officially Open</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 border border-border/80 font-mono text-xs text-muted">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Flagship Annual Symposium</span>
              </span>
            </div>

            {/* Presenter Label */}
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted/90 font-medium">
              ACS IACS Student Chapter Presents
            </p>

            {/* Main Title */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[1.08]">
              SYMBIOSIS{' '}
              <span className="bg-gradient-to-r from-accent via-amber to-accent bg-clip-text text-transparent">
                2026
              </span>
            </h1>

            {/* Theme Subtitle */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface/90 border border-border shadow-xs backdrop-blur-xs">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-accent font-bold block mb-1">
                Official Theme
              </span>
              <p className="font-display font-bold text-lg sm:text-2xl text-foreground leading-snug">
                Convergent Frontiers in Materials Science &amp; Chemical Biology for Sustainable
                Development
              </p>
            </div>

            {/* Meta Cards: Date, Venue, Format */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-surface/60 border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-muted font-medium">
                    Date &amp; Time
                  </span>
                  <span className="font-display font-bold text-sm text-foreground">
                    15th Dec 2026
                  </span>
                  <span className="font-mono text-[11px] text-muted">10:30 AM IST Onwards</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/60 border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-muted font-medium">
                    Venue
                  </span>
                  <span className="font-display font-bold text-sm text-foreground">
                    CV Raman Hall
                  </span>
                  <span className="font-mono text-[11px] text-muted">IACS, Kolkata</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/60 border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-muted font-medium">
                    Mode
                  </span>
                  <span className="font-display font-bold text-sm text-foreground">
                    Hybrid Format
                  </span>
                  <span className="font-mono text-[11px] text-muted">In-Person &amp; Virtual</span>
                </div>
              </div>
            </div>

            {/* Quick Action CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#register-portals"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-display font-bold text-sm shadow-md shadow-primary/20 flex items-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsPosterLightboxOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-surface/90 hover:bg-surface-hover border border-border font-display font-semibold text-sm text-foreground flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-accent" />
                <span>View Official Poster</span>
              </button>

              <button
                type="button"
                onClick={handleCopyPageUrl}
                className="px-4 py-3.5 rounded-xl bg-surface/80 hover:bg-surface-hover border border-border font-mono text-xs text-foreground flex items-center gap-2 transition-colors cursor-pointer"
                title="Copy shareable link to this page"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-muted" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 font-mono text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2 transition-colors cursor-pointer"
                title="Share directly on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Poster Card with Lightbox Trigger */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md group rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-surface">
              {/* Poster Image */}
              <div
                className="relative cursor-pointer overflow-hidden aspect-[1024/685]"
                onClick={() => setIsPosterLightboxOpen(true)}
              >
                <img
                  src={getAssetUrl(symbiosis.poster.webp)}
                  alt={symbiosis.poster.alt}
                  width={1024}
                  height={685}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-display font-semibold text-sm backdrop-blur-2xs">
                  <Maximize2 className="w-5 h-5 text-accent" />
                  <span>Click to Expand Poster</span>
                </div>
              </div>

              {/* Poster Footer Bar with Action Buttons */}
              <div className="p-4 bg-surface/95 border-t border-border flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase text-muted">
                    Official Announcement Poster
                  </span>
                  <span className="font-display font-bold text-xs text-foreground truncate max-w-[200px]">
                    Symbiosis 2026 · IACS
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPosterLightboxOpen(true)}
                    className="p-2 rounded-lg bg-surface hover:bg-surface-hover border border-border text-foreground transition-colors cursor-pointer"
                    title="Expand Poster"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <a
                    href={getAssetUrl(symbiosis.poster.jpg)}
                    download="Symbiosis-2026-Official-Poster.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/30 text-accent font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Download High-Resolution Poster"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Real-Time Countdown Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="p-6 sm:p-10 rounded-3xl bg-surface/70 border border-border/80 shadow-lg backdrop-blur-md flex flex-col items-center">
          <CountdownTimer targetDate={symbiosis.targetDate} />
        </div>
      </section>

      {/* 4. Dual Registration Portals Section (Anchor: #register-portals) */}
      <section
        id="register-portals"
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            Official Registration Portals
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Choose Your Registration Category
          </h2>
          <p className="font-body text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            To ensure streamlined credentialing, registrations are bifurcated into dedicated tracks
            for internal IACS scholars and external university/institute delegates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Card 1: For IACS Students */}
          <Card
            spotlight={true}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl border-2 border-primary/40 bg-surface/90 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/20">
                    Internal Track
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl text-foreground">
                  For IACS Students
                </h3>
                <p className="font-mono text-xs text-accent mt-0.5">
                  Indian Association for the Cultivation of Science
                </p>
                <p className="font-body text-xs sm:text-sm text-muted mt-3 leading-relaxed">
                  Dedicated registration portal for all registered <strong>BS-MS students</strong>,{' '}
                  <strong>Integrated PhD</strong>, <strong>PhD research scholars</strong>,{' '}
                  <strong>postdoctoral fellows</strong>, and project fellows affiliated with IACS
                  Kolkata.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/60 border border-border/60 text-xs font-mono text-muted/90 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Required Verification:</span>
                </div>
                <span>• IACS Institutional Roll Number / Scholar ID</span>
                <span>• Official IACS Email / Departmental affiliation</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-border/70">
              <a
                href={symbiosis.registration.iacsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] rounded-xl bg-primary hover:bg-primary-hover text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/25 transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>Register as IACS Student</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyFormUrl(symbiosis.registration.iacsUrl, setCopiedIacs)}
                  className="w-full py-2 px-3 rounded-lg bg-surface/80 hover:bg-surface-hover border border-border font-mono text-xs text-muted hover:text-foreground flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedIacs ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">IACS Form Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy IACS Form Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>

          {/* Card 2: For External Students */}
          <Card
            spotlight={true}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl border-2 border-accent/40 bg-surface/90 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/20">
                    External Track
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl text-foreground">
                  For External Students
                </h3>
                <p className="font-mono text-xs text-accent mt-0.5">
                  All Universities, Colleges &amp; Institutes
                </p>
                <p className="font-body text-xs sm:text-sm text-muted mt-3 leading-relaxed">
                  Open to all undergraduate, postgraduate, doctoral, and postdoctoral delegates from
                  universities, colleges, IITs, IISERs, and research institutions across India and
                  globally.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/60 border border-border/60 text-xs font-mono text-muted/90 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Participation Options:</span>
                </div>
                <span>• In-person delegate at CV Raman Hall, Kolkata</span>
                <span>• Virtual hybrid delegate with live streaming &amp; Q&amp;A</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-border/70">
              <a
                href={symbiosis.registration.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] rounded-xl bg-gradient-to-r from-accent to-amber hover:opacity-95 text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-accent/25 transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>Register as External Student</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleCopyFormUrl(symbiosis.registration.externalUrl, setCopiedExternal)
                  }
                  className="w-full py-2 px-3 rounded-lg bg-surface/80 hover:bg-surface-hover border border-border font-mono text-xs text-muted hover:text-foreground flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedExternal ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">
                        External Form Link Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy External Form Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. Symposium Core Focus Areas & Scientific Pillars */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            Scientific Scope
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground tracking-tight">
            Key Focus Areas
          </h2>
          <p className="font-body text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            Explore how modern chemical research converges at the intersection of material
            engineering and biological mechanisms for a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {symbiosis.highlights.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-surface/80 border border-border hover:border-accent/40 shadow-card flex flex-col justify-between gap-4 transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {idx === 0 ? (
                      <Layers className="w-5 h-5" />
                    ) : idx === 1 ? (
                      <Dna className="w-5 h-5" />
                    ) : idx === 2 ? (
                      <Sparkles className="w-5 h-5" />
                    ) : (
                      <Award className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Venue & Event Schedule Overview */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-surface/85 border border-border shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-accent/10 text-accent shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">
                Hybrid Symposium Schedule &amp; Format
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-body max-w-xl">
                Sessions begin promptly at <strong>10:30 AM IST on 15th December 2026</strong>.
                Includes Keynote Lectures by eminent scientists, student oral presentations, a
                dedicated poster evaluation session, and live interactive hybrid Q&amp;A.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="#register-portals"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-display font-semibold text-xs text-center transition-colors shadow-sm"
            >
              Register Now
            </a>
            <Link
              to="/join"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface hover:bg-surface-hover border border-border text-foreground font-display font-semibold text-xs text-center transition-colors"
            >
              Join ACS Chapter
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Poster Lightbox Modal */}
      <AnimatePresence>
        {isPosterLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={() => setIsPosterLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsPosterLightboxOpen(false)}
                className="absolute -top-12 right-0 sm:right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Poster Image */}
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                <img
                  src={getAssetUrl(symbiosis.poster.jpg)}
                  alt={symbiosis.poster.alt}
                  className="max-h-[80vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Lightbox Footer Actions */}
              <div className="mt-4 flex items-center justify-between gap-4 w-full px-2 text-white/90 text-xs font-mono">
                <span>Symbiosis 2026 · 15th December 2026 · IACS Kolkata</span>
                <div className="flex items-center gap-3">
                  <a
                    href={getAssetUrl(symbiosis.poster.jpg)}
                    download="Symbiosis-2026-Official-Poster.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-accent text-white font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full HD Poster</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Symbiosis2026;
