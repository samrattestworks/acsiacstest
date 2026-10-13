import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, TeamMember } from '@/content/site';
import { TiltCard } from '@/components/ui/TiltCard';
import { AvatarPlaceholder } from '@/components/ui/AvatarPlaceholder';
import { SocialLink } from '@/components/ui/SocialLink';
import { trackEvent } from '@/lib/analytics-stub';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type FilterGroup = 'All' | 'Core' | 'Leads' | 'Members';

const GROUPS: FilterGroup[] = ['All', 'Core', 'Leads', 'Members'];

export const TeamGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterGroup>('All');
  const prefersReducedMotion = useReducedMotion();

  const handleFilterChange = (group: FilterGroup) => {
    setActiveFilter(group);
    trackEvent({ name: 'filter_team', group });
  };

  const filteredMembers = siteConfig.team.filter((member) => {
    if (activeFilter === 'All') return true;
    return member.group === activeFilter;
  });

  return (
    <section
      id="team"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 select-none"
      aria-label="Full team directory"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            // Full Roster
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Meet the Team
          </h2>
          <p className="text-sm font-mono text-muted">
            The advisors, leads, and researchers shaping the chapter portfolio.
          </p>
        </div>

        {/* Filter Chips with Animated Layout Indicator */}
        <div
          role="tablist"
          aria-label="Filter team by role group"
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-border shadow-xs"
        >
          {GROUPS.map((group) => {
            const isActive = activeFilter === group;
            return (
              <button
                key={group}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(group)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer select-none focus-visible:outline-accent ${
                  isActive ? 'text-accent-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{group}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Cards Grid with 3D Tilt and Glare */}
      <motion.div
        layout={!prefersReducedMotion}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredMembers.map((member: TeamMember) => (
            <motion.div
              key={member.id}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="p-4 flex flex-col justify-between h-full gap-4 group">
                {/* Photo / Generated Molecular Avatar Placeholder */}
                <div className="rounded-xl overflow-hidden aspect-square">
                  <AvatarPlaceholder name={member.name} photo={member.photo} />
                </div>

                {/* Member Meta */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                      {member.group}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors truncate">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-muted truncate">{member.role}</p>

                  {/* Social Channels */}
                  {member.links && (
                    <div className="flex items-center gap-1.5 pt-2 mt-auto border-t border-border/40">
                      {member.links.linkedin && (
                        <SocialLink
                          platform="linkedin"
                          href={member.links.linkedin}
                          magnetic={false}
                          className="w-7 h-7 rounded-lg"
                          iconClassName="w-3.5 h-3.5"
                        />
                      )}
                      {member.links.instagram && (
                        <SocialLink
                          platform="instagram"
                          href={member.links.instagram}
                          magnetic={false}
                          className="w-7 h-7 rounded-lg"
                          iconClassName="w-3.5 h-3.5"
                        />
                      )}
                      {member.links.github && (
                        <SocialLink
                          platform="github"
                          href={member.links.github}
                          magnetic={false}
                          className="w-7 h-7 rounded-lg"
                          iconClassName="w-3.5 h-3.5"
                        />
                      )}
                      {member.links.email && (
                        <SocialLink
                          platform="email"
                          href={member.links.email}
                          magnetic={false}
                          className="w-7 h-7 rounded-lg"
                          iconClassName="w-3.5 h-3.5"
                        />
                      )}
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
