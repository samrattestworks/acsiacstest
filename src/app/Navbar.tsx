import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { LogoPlaceholder } from '@/components/ui/LogoPlaceholder';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { scrollToElement } from '@/lib/navigation';
import { cn } from '@/lib/cn';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { direction, isAtTop } = useScrollDirection(10);
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

  // Determine whether navbar should be translated up (hidden)
  const isHidden = direction === 'down' && !isAtTop && !mobileMenuOpen;

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
          !isAtTop ? 'glass-nav shadow-md py-2.5 sm:py-3' : 'bg-transparent py-4 sm:py-5'
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
                  : isHome && location.hash === link.href.replace('/', '');

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

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-surface/90 border border-border text-foreground hover:bg-surface-hover active:scale-95 transition-all focus-visible:outline-accent"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-accent" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden transition-all duration-300 ease-spring flex flex-col justify-between p-6 pt-24 pb-8 overflow-y-auto',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col gap-2 mt-2">
          {siteConfig.navigation.links.map((link) => {
            const isHome = location.pathname === '/' || location.pathname === '';
            const isActive =
              link.href === '/'
                ? isHome && !location.hash
                : isHome && location.hash === link.href.replace('/', '');

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'text-2xl font-display font-semibold transition-colors py-3.5 px-3 rounded-xl border border-transparent flex items-center justify-between cursor-pointer select-none active:bg-surface/60',
                  isActive
                    ? 'text-accent bg-accent/10 border-accent/20'
                    : 'text-foreground hover:text-accent'
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/20 border border-accent/30 text-accent">
                    Current
                  </span>
                )}
              </a>
            );
          })}

          <Link
            to={siteConfig.navigation.cta.href}
            onClick={() => {
              setMobileMenuOpen(false);
              document.body.style.overflow = '';
            }}
            className="text-2xl font-display font-semibold text-accent py-3.5 px-3 rounded-xl border border-accent/20 bg-accent/5 flex items-center justify-between mt-2"
          >
            <span>{siteConfig.navigation.cta.label}</span>
            <ArrowUpRight className="w-6 h-6" />
          </Link>
        </nav>

        <div className="pt-6 border-t border-border flex flex-col gap-3 mt-6">
          <p className="text-xs font-mono text-muted text-center sm:text-left">
            {siteConfig.meta.institution}
          </p>
          <Button
            to={siteConfig.navigation.cta.href}
            variant="primary"
            size="lg"
            className="w-full min-h-[50px] text-base"
            onClick={() => {
              setMobileMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            {siteConfig.navigation.cta.label}
          </Button>
        </div>
      </div>
    </>
  );
};
