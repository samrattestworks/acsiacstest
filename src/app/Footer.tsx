import React from 'react';
import { siteConfig } from '@/content/site';
import { LogoPlaceholder } from '@/components/ui/LogoPlaceholder';
import { SocialLink } from '@/components/ui/SocialLink';

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      className="relative z-10 border-t border-border bg-surface/40 backdrop-blur-md pt-16 pb-12 mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-border/60">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <LogoPlaceholder />
            <p className="text-sm text-muted max-w-sm mt-2 leading-relaxed">
              {siteConfig.meta.heroDescription.split('\n')[0]}
            </p>
            <span className="font-mono text-xs text-muted/70">{siteConfig.meta.heroSubtitle}</span>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted">
              {siteConfig.navigation.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/join"
                  className="hover:text-accent transition-colors font-medium text-foreground focus-visible:outline-accent"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect With The Chapter
            </h3>
            <p className="text-xs text-muted">
              Follow our official feeds for seminar schedules, outreach dates, and research calls.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <SocialLink platform="instagram" href={siteConfig.links.social.instagram} />
              <SocialLink platform="linkedin" href={siteConfig.links.social.linkedin} />
              <SocialLink platform="x" href={siteConfig.links.social.x} />
              <SocialLink platform="youtube" href={siteConfig.links.social.youtube} />
              <SocialLink platform="github" href={siteConfig.links.social.github} />
              <SocialLink platform="email" href={siteConfig.links.social.email} />
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted/80">
          <p>{siteConfig.footer.copyrightText}</p>
          <p className="text-center sm:text-right">{siteConfig.footer.subtext}</p>
        </div>
      </div>
    </footer>
  );
};
