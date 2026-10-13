import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { siteConfig } from '@/content/site';
import { LogoPlaceholder } from '@/components/ui/LogoPlaceholder';
import { SocialLink } from '@/components/ui/SocialLink';
import { scrollToElement } from '@/lib/navigation';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const isHomePage = location.pathname === '/' || location.pathname === '';

    if (href === '/') {
      if (isHomePage) {
        scrollToElement('top');
      } else {
        navigate('/');
      }
      return;
    }

    if (href === '/#team' || href === '#team') {
      scrollToElement('team');
      return;
    }

    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      if (isHomePage) {
        scrollToElement(sectionId);
      } else {
        navigate(`/#${sectionId}`);
      }
      return;
    }

    navigate(href);
  };

  return (
    <footer
      role="contentinfo"
      className="relative z-10 border-t border-border bg-surface/40 backdrop-blur-md pt-12 sm:pt-16 pb-10 sm:pb-12 mt-16 sm:mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-10 sm:pb-12 border-b border-border/60">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <LogoPlaceholder />
            <p className="text-sm text-muted max-w-sm mt-1 sm:mt-2 leading-relaxed">
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
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-accent transition-colors focus-visible:outline-accent cursor-pointer py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/join"
                  className="hover:text-accent transition-colors font-medium text-foreground focus-visible:outline-accent py-1 inline-block"
                >
                  Join Us
                </Link>
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

        {/* Copyright & Attribution Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-muted/80 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5">
            <p>{siteConfig.footer.copyrightText}</p>
            {siteConfig.footer.creatorText && (
              <>
                <span className="hidden sm:inline text-border">•</span>
                <p className="text-accent/90 font-medium">{siteConfig.footer.creatorText}</p>
              </>
            )}
          </div>
          <p className="md:text-right text-muted/70">{siteConfig.footer.subtext}</p>
        </div>
      </div>
    </footer>
  );
};
