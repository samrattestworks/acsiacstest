import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Image as ImageIcon,
  ArrowUpRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { updatePageSeo } from '@/lib/seo';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/Button';

interface EventPhoto {
  id: string;
  src: string;
  thumb: string;
  fallbackJpg: string;
  alt: string;
  caption: string;
  tag: string;
}

const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const SCIVISION_2025_PHOTOS: EventPhoto[] = [
  {
    id: 'group',
    src: 'images/events/scivision2025/scivision-2025-1.webp',
    thumb: 'images/events/scivision2025/scivision-2025-1-thumb.webp',
    fallbackJpg: 'images/events/scivision2025/scivision-2025-1.jpg',
    alt: 'ACS IACS Chapter members, faculty, and delegates group photo on the IACS lawn',
    caption: 'Official Chapter Group Photograph with ACS Banner · Campus Lawn, IACS Kolkata',
    tag: 'Chapter Roster & Delegates',
  },
  {
    id: 'chairs',
    src: 'images/events/scivision2025/scivision-2025-2.webp',
    thumb: 'images/events/scivision2025/scivision-2025-2-thumb.webp',
    fallbackJpg: 'images/events/scivision2025/scivision-2025-2.jpg',
    alt: 'Chapter officers and organizers on stage with session chair',
    caption: 'Chapter Leadership & Organizing Delegates with Inaugural Session Chair',
    tag: 'Leadership & Faculty',
  },
  {
    id: 'lecture',
    src: 'images/events/scivision2025/scivision-2025-3.webp',
    thumb: 'images/events/scivision2025/scivision-2025-3-thumb.webp',
    fallbackJpg: 'images/events/scivision2025/scivision-2025-3.jpg',
    alt: 'Prof. Rahul Banerjee delivering keynote lecture on Reticular Chemistry',
    caption:
      'Keynote Lecture: Reticular Chemistry & Covalent Organic Frameworks (Prof. Rahul Banerjee, IISER Kolkata)',
    tag: 'Invited Keynote Address',
  },
  {
    id: 'audience',
    src: 'images/events/scivision2025/scivision-2025-4.webp',
    thumb: 'images/events/scivision2025/scivision-2025-4-thumb.webp',
    fallbackJpg: 'images/events/scivision2025/scivision-2025-4.jpg',
    alt: 'Auditorium delegates and students in active discussion during technical presentation',
    caption: 'Delegates, Faculty Members, and Research Scholars in Active Academic Discussion',
    tag: 'Auditorium Session',
  },
  {
    id: 'committee',
    src: 'images/events/scivision2025/scivision-2025-5.webp',
    thumb: 'images/events/scivision2025/scivision-2025-5-thumb.webp',
    fallbackJpg: 'images/events/scivision2025/scivision-2025-5.jpg',
    alt: 'ACS IACS organizing committee and student coordinators on stage',
    caption: 'Organizing Committee & Student Coordinators at the Symposium Concluding Session',
    tag: 'Organizing Team',
  },
];

interface ChapterEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  status: 'Done' | 'Registration Opening Soon';
  isUpcoming?: boolean;
  description: string;
  hasGallery?: boolean;
  driveLink?: string;
}

const EVENTS_LIST: ChapterEvent[] = [
  {
    id: 'symbiosis-2025',
    year: '2025',
    title: 'Symbiosis 2025',
    subtitle: 'Annual Chemistry Symposium & Research Exchange',
    status: 'Done',
    description:
      'The premier annual chemistry symposium organized by the ACS IACS Student Chapter. Brought together faculty members, graduate scholars, and undergraduate researchers for oral presentations, technical discussions, and academic exchange.',
    driveLink:
      'https://drive.google.com/drive/folders/1PeoiNEeJPVzEz5CaDxzQfqz9GqG9CQzL?usp=sharing',
  },
  {
    id: 'scivision-2025',
    year: '2025',
    title: 'SciVation 2025',
    subtitle: 'Flagship Scientific Conference & Research Exhibition',
    status: 'Done',
    hasGallery: true,
    description:
      'Flagship annual scientific conference held on 15 February 2025 at IACS Kolkata. Featured distinguished keynote lectures—including reticular chemistry and porous covalent organic frameworks (COFs) by Prof. Rahul Banerjee (IISER Kolkata)—technical poster sessions, and vibrant inter-institutional student participation.',
    driveLink:
      'https://drive.google.com/drive/folders/1PeoiNEeJPVzEz5CaDxzQfqz9GqG9CQzL?usp=sharing',
  },
  {
    id: 'symbiosis-2026',
    year: '2026',
    title: 'Symbiosis 2026',
    subtitle: 'Flagship Annual Chemistry Symposium & Student Meet',
    status: 'Registration Opening Soon',
    isUpcoming: true,
    description:
      'The upcoming flagship 2026 edition of Symbiosis is scheduled at IACS Kolkata. Featuring invited international and national keynote speakers, student oral research talks, competitive poster sessions, and chemistry outreach workshops. Delegate registrations will unlock soon.',
  },
];

export const Events: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    updatePageSeo({
      title: 'Events & Symposia | ACS IACS Student Chapter',
      description:
        'Official symposia, conferences, and scientific gatherings of the American Chemical Society Student Chapter at IACS Kolkata, including Symbiosis and SciVation.',
      canonical: `${siteConfig.meta.seo.canonical}events`,
    });
  }, []);

  // Lock body scroll and handle keyboard navigation when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : SCIVISION_2025_PHOTOS.length - 1) : null
        );
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev < SCIVISION_2025_PHOTOS.length - 1 ? prev + 1 : 0) : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex]);

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-3 text-left sm:text-center items-start sm:items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter Symposia & Conferences</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
            Events & Symposia
          </h1>
          <p className="text-sm sm:text-base text-muted font-body max-w-2xl leading-relaxed">
            Annual scientific conferences, invited keynote colloquia, and student research
            exhibitions organized by the ACS Student Chapter at the Indian Association for the
            Cultivation of Science, Kolkata.
          </p>
        </div>

        {/* Events Timeline List */}
        <div className="flex flex-col gap-8 w-full mt-2">
          {EVENTS_LIST.map((event) => (
            <div
              key={event.id}
              className={`p-6 sm:p-8 rounded-2xl bg-surface/85 border flex flex-col gap-6 backdrop-blur-md transition-all ${
                event.isUpcoming
                  ? 'border-accent/40 shadow-card bg-surface/95'
                  : 'border-border shadow-xs'
              }`}
            >
              {/* Event Header & Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                      event.isUpcoming
                        ? 'bg-accent/15 border-accent/30 text-accent'
                        : 'bg-surface border-border text-muted'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground tracking-tight">
                        {event.title}
                      </h2>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-surface border border-border text-muted">
                        {event.year}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted">{event.subtitle}</span>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold self-start sm:self-auto ${
                    event.isUpcoming
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber'
                      : 'bg-surface border border-border text-muted'
                  }`}
                >
                  {event.isUpcoming && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                  <span>{event.status}</span>
                </div>
              </div>

              {/* Event Summary Description */}
              <p className="text-sm sm:text-base text-muted font-body leading-relaxed">
                {event.description}
              </p>

              {/* Event Body Content */}
              {event.isUpcoming ? (
                /* Symbiosis 2026: Registration Opening Soon */
                <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                  <div className="flex flex-col gap-1.5">
                    <p className="font-display font-bold text-lg text-foreground flex items-center justify-center sm:justify-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Registration Opening Soon
                    </p>
                    <p className="font-body text-xs sm:text-sm text-muted max-w-xl leading-relaxed">
                      Registration for Symbiosis 2026 will unlock soon. Follow our announcements or
                      join the chapter notification waitlist to be notified first.
                    </p>
                  </div>
                  <Button
                    to="/register"
                    variant="primary"
                    size="md"
                    className="shrink-0 text-xs py-2.5 px-5 shadow-sm"
                    iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
                  >
                    Registration Details
                  </Button>
                </div>
              ) : event.hasGallery ? (
                /* SciVation 2025: Interactive Photo Gallery */
                <div className="flex flex-col gap-4 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-accent" />
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                        Symposium Visual Archive ({SCIVISION_2025_PHOTOS.length} Photographs)
                      </span>
                    </div>
                    {event.driveLink && (
                      <a
                        href={event.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
                      >
                        <span>Open Drive Folder</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Responsive Grid with Featured Lead Shot */}
                  {(() => {
                    const leadPhoto = SCIVISION_2025_PHOTOS[0];
                    if (!leadPhoto) return null;
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Primary Highlight Card: Group Shot (Spans 2 columns & 2 rows on large screens) */}
                        <button
                          type="button"
                          onClick={() => setActiveLightboxIndex(0)}
                          className="group relative md:col-span-2 lg:col-span-2 rounded-2xl overflow-hidden border border-border bg-black/60 shadow-md aspect-[16/10] text-left cursor-pointer focus-visible:outline-accent"
                        >
                          <picture>
                            <source srcSet={getAssetUrl(leadPhoto.thumb)} type="image/webp" />
                            <img
                              src={getAssetUrl(leadPhoto.fallbackJpg)}
                              alt={leadPhoto.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </picture>

                          {/* Gradient Overlay and Caption Bar */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-4 sm:p-5">
                            <span className="self-start font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent/90 text-white font-semibold backdrop-blur-sm">
                              {leadPhoto.tag}
                            </span>

                            <div className="flex items-end justify-between gap-2">
                              <p className="text-xs sm:text-sm font-body text-white font-medium line-clamp-2 drop-shadow">
                                {leadPhoto.caption}
                              </p>
                              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <Maximize2 className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Remaining 4 Photos Grid */}
                        {SCIVISION_2025_PHOTOS.slice(1).map((photo, index) => {
                          const actualIndex = index + 1;
                          return (
                            <button
                              key={photo.id}
                              type="button"
                              onClick={() => setActiveLightboxIndex(actualIndex)}
                              className="group relative rounded-2xl overflow-hidden border border-border bg-black/60 shadow-xs aspect-[4/3] text-left cursor-pointer focus-visible:outline-accent"
                            >
                              <picture>
                                <source srcSet={getAssetUrl(photo.thumb)} type="image/webp" />
                                <img
                                  src={getAssetUrl(photo.fallbackJpg)}
                                  alt={photo.alt}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </picture>

                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-between p-3">
                                <span className="self-start font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-accent font-semibold backdrop-blur-xs border border-accent/20">
                                  {photo.tag}
                                </span>

                                <div className="flex items-end justify-between gap-1.5">
                                  <p className="text-[11px] font-body text-neutral-200 line-clamp-2">
                                    {photo.caption}
                                  </p>
                                  <div className="p-1.5 rounded bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                /* Symbiosis 2025: Concluded Event with Drive Archive Callout */
                <div className="p-6 rounded-xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-lg bg-surface-hover text-accent shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <p className="font-display font-bold text-sm sm:text-base text-foreground">
                        Symbiosis 2025 Archive
                      </p>
                      <p className="text-xs text-muted">
                        Symposium session records and photographs are hosted on the chapter Google
                        Drive repository.
                      </p>
                    </div>
                  </div>

                  {event.driveLink && (
                    <a
                      href={event.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-surface-hover border border-border text-foreground hover:border-accent hover:text-accent font-mono text-xs transition-colors shrink-0"
                    >
                      <span>Access Drive Folder</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal */}
      {(() => {
        if (activeLightboxIndex === null) return null;
        const activePhoto = SCIVISION_2025_PHOTOS[activeLightboxIndex];
        if (!activePhoto) return null;

        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox Viewer"
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 transition-all duration-300"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Top Bar with Counter and Close Button */}
            <div
              className="flex items-center justify-between w-full max-w-6xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold px-2.5 py-1 rounded-md bg-accent/15 border border-accent/30">
                  SciVation 2025 Archive
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {activeLightboxIndex + 1} of {SCIVISION_2025_PHOTOS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.links.symbiosisDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 hover:text-white hover:border-neutral-500 transition-colors"
                >
                  <span>Full Drive Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Image Container with Navigation Arrows */}
            <div
              className="relative flex items-center justify-center flex-1 my-3 max-w-6xl mx-auto w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev > 0 ? prev - 1 : SCIVISION_2025_PHOTOS.length - 1) : 0
                  )
                }
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image */}
              <picture className="max-h-[75vh] max-w-full flex items-center justify-center">
                <source srcSet={getAssetUrl(activePhoto.src)} type="image/webp" />
                <img
                  src={getAssetUrl(activePhoto.fallbackJpg)}
                  alt={activePhoto.alt}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </picture>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev < SCIVISION_2025_PHOTOS.length - 1 ? prev + 1 : 0) : 0
                  )
                }
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="w-full max-w-4xl mx-auto text-center flex flex-col gap-1 items-center pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm sm:text-base font-body text-white font-medium">
                {activePhoto.caption}
              </p>
              <span className="text-xs font-mono text-neutral-400">
                15 February 2025 · Indian Association for the Cultivation of Science, Kolkata
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Events;
