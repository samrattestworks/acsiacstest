import React, { useEffect } from 'react';
import { Calendar, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import { updatePageSeo } from '@/lib/seo';
import { siteConfig, ACS_EVENTS_PLACEHOLDER } from '@/content/site';
import { Button } from '@/components/ui/Button';

interface ScivisionEvent {
  year: string;
  title: string;
  status: 'Done' | 'Registration Open Soon';
  isUpcoming?: boolean;
}

const EVENTS_LIST: ScivisionEvent[] = [
  {
    year: '2024',
    title: 'Scivision 2024',
    status: 'Done',
  },
  {
    year: '2025',
    title: 'Scivision 2025',
    status: 'Done',
  },
  {
    year: '2026',
    title: 'Scivision 2026',
    status: 'Registration Open Soon',
    isUpcoming: true,
  },
];

export const Events: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: 'Events (Scivision) | ACS IACS Student Chapter',
      description:
        'Official Scivision events of the American Chemical Society Student Chapter at IACS Kolkata.',
      canonical: `${siteConfig.meta.seo.canonical}events`,
    });
  }, []);

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2 text-left sm:text-center items-start sm:items-center">
          <h1 className="font-display font-black text-3xl sm:text-5xl text-foreground tracking-tight">
            Events
          </h1>
          <p className="text-sm sm:text-base text-muted font-body">
            American Chemical Society Student Chapter · IACS Kolkata
          </p>
        </div>

        {/* 3 Events: Scivision 2024, 2025, 2026 */}
        <div className="flex flex-col gap-8 w-full mt-2">
          {EVENTS_LIST.map((event) => (
            <div
              key={event.year}
              className={`p-6 sm:p-8 rounded-2xl bg-surface/80 border flex flex-col gap-5 ${
                event.isUpcoming
                  ? 'border-accent/40 shadow-card bg-surface/95'
                  : 'border-border shadow-xs'
              }`}
            >
              {/* Event Title & Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                      event.isUpcoming
                        ? 'bg-accent/10 border-accent/20 text-accent'
                        : 'bg-surface border-border text-muted'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground tracking-tight">
                      {event.title}
                    </h2>
                    <span className="font-mono text-xs text-muted">
                      ACS IACS Chapter Event · {event.year}
                    </span>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-semibold ${
                    event.isUpcoming
                      ? 'bg-accent/15 border border-accent/30 text-accent'
                      : 'bg-surface border border-border text-muted'
                  }`}
                >
                  {event.isUpcoming && (
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  )}
                  <span>{event.status}</span>
                </div>
              </div>

              {/* Event Body */}
              {event.isUpcoming ? (
                /* Scivision 2026: Registration Open Soon */
                <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex flex-col gap-1">
                    <p className="font-display font-bold text-lg text-foreground">
                      Registration Open Soon
                    </p>
                    <p className="font-body text-xs sm:text-sm text-muted">
                      Registration for Scivision 2026 will unlock soon. Follow our announcements or
                      join the chapter notification waitlist.
                    </p>
                  </div>
                  <Button
                    to="/register"
                    variant="primary"
                    size="sm"
                    className="shrink-0 text-xs py-2.5 px-4"
                    iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
                  >
                    Registration Details
                  </Button>
                </div>
              ) : (
                /* Scivision 2024 & 2025: Done with Place for Images */
                <div className="w-full bg-black rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center text-center border border-neutral-800 shadow-inner gap-3">
                  <ImageIcon className="w-6 h-6 text-neutral-500" />
                  <p className="font-mono text-xs sm:text-sm text-neutral-300 font-semibold tracking-wider select-text">
                    {ACS_EVENTS_PLACEHOLDER}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
