import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig, TeamMember } from '@/content/site';
import { TiltCard } from '@/components/ui/TiltCard';
import { AvatarPlaceholder } from '@/components/ui/AvatarPlaceholder';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const TeamGrid: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="team"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 select-none"
      aria-label="Full team directory"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            // Full Roster
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
            Meet the Team
          </h2>
          <p className="text-sm font-mono text-muted">
            The advisors, officers, and researchers shaping the chapter portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface border border-border text-xs font-mono text-muted">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>{siteConfig.team.length} Chapter Members</span>
        </div>
      </div>

      {/* Team Cards Grid with 3D Tilt and Glare */}
      <motion.div
        layout={!prefersReducedMotion}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {siteConfig.team.map((member: TeamMember) => (
          <motion.div
            key={member.id}
            layout={!prefersReducedMotion}
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="p-4 flex flex-col justify-between h-full gap-4 group">
              {/* Photo / Molecular Avatar Placeholder */}
              <div className="rounded-xl overflow-hidden aspect-square">
                <AvatarPlaceholder name={member.name} photo={member.photo} />
              </div>

              {/* Member Meta */}
              <div className="flex flex-col gap-1.5 pt-1">
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors truncate">
                  {member.name}
                </h3>
                <p className="font-mono text-xs text-muted truncate">{member.role}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
