import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { AvatarPlaceholder } from '@/components/ui/AvatarPlaceholder';
import { Button } from '@/components/ui/Button';

export const TeamPreview: React.FC = () => {
  const previewMembers = siteConfig.team.slice(0, 6);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="team"
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 select-none"
      aria-label="Meet the Team preview"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            // Chapter Leadership
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Meet the Team
          </h2>
          <p className="text-sm font-mono text-muted">
            Faculty mentorship and student researchers driving the chapter initiative.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Accessible Carousel Navigation Controls */}
          <div className="flex items-center gap-2 mr-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer focus-visible:outline-accent"
              aria-label="Previous team members"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer focus-visible:outline-accent"
              aria-label="Next team members"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <Button
            to="/join#team"
            variant="outline"
            iconRight={<ArrowUpRight className="w-4 h-4 ml-0.5" />}
          >
            See full team
          </Button>
        </div>
      </div>

      {/* Horizontal Draggable Carousel Container */}
      <div
        ref={carouselRef}
        data-cursor="drag"
        tabIndex={0}
        role="region"
        aria-label="Team members carousel"
        className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar focus-visible:outline-accent"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {previewMembers.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[280px] sm:w-[310px] shrink-0 rounded-2xl border border-border bg-surface/85 backdrop-blur-md p-4 flex flex-col gap-4 shadow-card hover:border-accent/40 transition-colors"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="rounded-xl overflow-hidden aspect-square">
              <AvatarPlaceholder name={member.name} photo={member.photo} />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                  {member.group}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mt-1 truncate">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-muted truncate">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
