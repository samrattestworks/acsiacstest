import React from 'react';
import { FileText, CalendarCheck, Share2, ArrowUpRight, Lock } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { SocialLink } from '@/components/ui/SocialLink';

export const Action: React.FC = () => {
  const isRegistrationOpen = siteConfig.registration.open;

  return (
    <section
      className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
      aria-label="Action panel"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1: Chapter Membership (Always Available & Encouraged) */}
        <Card
          spotlight={true}
          className="flex flex-col justify-between p-5 sm:p-7 gap-5 sm:gap-6 border-accent/20"
        >
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <Pill variant="success">Always Open</Pill>
                <Pill variant="accent">2026</Pill>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                Chapter Membership
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                Chapter membership is always available and warmly encouraged for all students,
                researchers, and fellows. Anyone can apply to join our roster anytime.
              </p>
            </div>
          </div>

          <Button
            href={siteConfig.links.application}
            variant="primary"
            className="w-full min-h-[46px]"
            iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
          >
            Apply for Chapter Membership
          </Button>
        </Card>

        {/* Card 2: Event Registration (Controlled by siteConfig.registration.open boolean) */}
        <Card
          spotlight={true}
          className={`flex flex-col justify-between p-5 sm:p-7 gap-5 sm:gap-6 border ${
            isRegistrationOpen ? 'border-emerald-500/30' : 'border-border'
          }`}
        >
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center ${
                  isRegistrationOpen
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-surface border-border text-muted'
                }`}
              >
                {isRegistrationOpen ? (
                  <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <Pill variant="default">Events</Pill>
                <Pill variant={isRegistrationOpen ? 'success' : 'closed'}>
                  {isRegistrationOpen
                    ? siteConfig.registration.statusPillOpen
                    : siteConfig.registration.statusPillClosed}
                </Pill>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                Event Registration
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                Registration for specific chapter symposia and delegate presentations. (Note:
                Chapter membership is always available and encouraged above).
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {isRegistrationOpen ? (
              <Button
                href={siteConfig.links.registration}
                variant="primary"
                className="w-full min-h-[46px] bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 animate-pulse"
                iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
              >
                Complete Registration
              </Button>
            ) : (
              <Button variant="secondary" disabled className="w-full min-h-[46px]">
                Registrations Closed
              </Button>
            )}

            {!isRegistrationOpen && (
              <a
                href={siteConfig.links.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-center text-accent hover:underline mt-1 py-1"
              >
                Follow us for upcoming announcements →
              </a>
            )}
          </div>
        </Card>

        {/* Card 3: Connect */}
        <Card spotlight={true} className="flex flex-col justify-between p-5 sm:p-7 gap-5 sm:gap-6">
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center text-amber">
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <Pill variant="default">All Feeds</Pill>
            </div>

            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">Connect</h2>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                Reach the chapter team directly across all official scientific networks and
                channels.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-2">
            <SocialLink platform="instagram" href={siteConfig.links.social.instagram} />
            <SocialLink platform="linkedin" href={siteConfig.links.social.linkedin} />
            <SocialLink platform="x" href={siteConfig.links.social.x} />
            <SocialLink platform="youtube" href={siteConfig.links.social.youtube} />
            <SocialLink platform="github" href={siteConfig.links.social.github} />
            <SocialLink platform="email" href={siteConfig.links.social.email} />
          </div>
        </Card>
      </div>
    </section>
  );
};
