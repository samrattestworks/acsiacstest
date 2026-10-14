import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { LogoPlaceholder } from '@/components/ui/LogoPlaceholder';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SocialLink } from '@/components/ui/SocialLink';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { scrollToElement } from '@/lib/navigation';
import { cn } from '@/lib/cn';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { direction, isAtTop } = useScrollDirection(10);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Trap focus / lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          document.body.style.overflow = '';
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = '';

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

  // On desktop: hides on scroll down and reappears on scroll up.
  // On mobile: always stays accessible so user never loses the hamburger menu.
  const isHidden = isDesktop && direction === 'down' && !isAtTop && !mobileMenuOpen;

  return (
    <>
      {/* Skip to Content for WCAG 2.2 AA Compliance */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-accent"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-spring',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          !isAtTop
            ? 'glass-nav shadow-md py-2.5 sm:py-3'
            : 'bg-background/40 backdrop-blur-md md:bg-transparent py-3 sm:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <LogoPlaceholder />

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {siteConfig.navigation.links.map((link) => {
              const isHome = location.pathname === '/' || location.pathname === '';
              const isActive =
                link.href === '/'
                  ? isHome && !location.hash
                  : link.href.startsWith('/#')
                    ? isHome && location.hash === link.href.replace('/', '')
                    : location.pathname === link.href || location.pathname === `${link.href}/`;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-accent cursor-pointer select-none',
                    isActive
                      ? 'text-accent bg-accent/10 border border-accent/20'
                      : 'text-muted hover:text-foreground hover:bg-surface/50 border border-transparent'
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              to={siteConfig.navigation.cta.href}
              variant="primary"
              size="sm"
              iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
            >
              {siteConfig.navigation.cta.label}
            </Button>
          </div>

          {/* Mobile Action Controls with Bespoke Animated Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            {/* Bespoke Animated 3-Bar Mechanical Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'relative w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-all focus-visible:outline-accent z-50 cursor-pointer shadow-xs border',
                mobileMenuOpen
                  ? 'bg-accent/20 border-accent/50 text-accent shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                  : 'bg-surface/90 border-border text-foreground hover:border-accent/40'
              )}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span
                className={cn(
                  'w-5 h-0.5 rounded-full transition-all duration-300 ease-spring origin-center',
                  mobileMenuOpen ? 'rotate-45 translate-y-2 bg-accent' : 'bg-foreground'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 rounded-full transition-all duration-200',
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'bg-foreground opacity-100'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 rounded-full transition-all duration-300 ease-spring origin-center',
                  mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-accent' : 'bg-foreground'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl md:hidden transition-all duration-300 ease-spring flex flex-col justify-between p-6 pt-24 pb-8 overflow-y-auto',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-5 mt-1">
          {/* Menu Header Status Bar */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Chapter Directory // 2026
            </span>
            <span className="font-mono text-[11px] text-muted font-medium">IACS KOLKATA</span>
          </div>

          {/* Numbered Editorial Nav Links */}
          <nav className="flex flex-col gap-2.5">
            {siteConfig.navigation.links.map((link, idx) => {
              const isHome = location.pathname === '/' || location.pathname === '';
              const isActive =
                link.href === '/'
                  ? isHome && !location.hash
                  : link.href.startsWith('/#')
                    ? isHome && location.hash === link.href.replace('/', '')
                    : location.pathname === link.href || location.pathname === `${link.href}/`;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'group py-3.5 px-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer select-none',
                    isActive
                      ? 'bg-accent/15 border-accent/40 text-accent font-bold'
                      : 'bg-surface/50 border-border/50 text-foreground hover:border-accent/40 hover:bg-surface/90'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted/60 group-hover:text-accent">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight">
                      {link.label}
                    </span>
                  </div>
                  {isActive ? (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent text-accent-foreground font-semibold uppercase">
                      Current
                    </span>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-muted/40 group-hover:text-accent transition-colors" />
                  )}
                </a>
              );
            })}

            {/* Primary Action Button in Menu */}
            <Link
              to={siteConfig.navigation.cta.href}
              onClick={() => {
                setMobileMenuOpen(false);
                document.body.style.overflow = '';
              }}
              className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold text-lg flex items-center justify-between shadow-lg shadow-primary/20 active:scale-[0.98] transition-all mt-2"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs opacity-75">05</span>
                <span>{siteConfig.navigation.cta.label}</span>
              </div>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </nav>
        </div>

        {/* Bottom Verification & Social Footprint */}
        <div className="pt-6 border-t border-border/60 flex flex-col gap-3.5 mt-6">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Connect Official Channels:</span>
            <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">
              6 Networks
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SocialLink platform="instagram" href={siteConfig.links.social.instagram} />
            <SocialLink platform="linkedin" href={siteConfig.links.social.linkedin} />
            <SocialLink platform="x" href={siteConfig.links.social.x} />
            <SocialLink platform="youtube" href={siteConfig.links.social.youtube} />
            <SocialLink platform="github" href={siteConfig.links.social.github} />
            <SocialLink platform="email" href={siteConfig.links.social.email} />
          </div>

          <p className="text-[11px] font-mono text-muted/70 text-center pt-1">
            {siteConfig.meta.institution} · Est. 1876
          </p>
        </div>
      </div>
    </>
  );
};
