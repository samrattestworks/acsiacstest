import React from 'react';
import { Orbit, Layers, Dna, Sun, LucideIcon } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Card } from '@/components/ui/Card';

const FOCUS_ICON_MAP: Record<string, LucideIcon> = {
  Orbit,
  Layers,
  Dna,
  Sun,
};

export const Focus: React.FC = () => {
  return (
    <section
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
      aria-label="What we work on"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16 gap-2 sm:gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // Research Frontiers
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-foreground tracking-tight">
          What We Work On
        </h2>
        <p className="text-xs sm:text-sm font-mono text-muted px-2">
          Core thematic domains advanced across department research teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {siteConfig.focusAreas.map((area) => {
          const Icon = FOCUS_ICON_MAP[area.icon] || Orbit;

          return (
            <Card
              key={area.id}
              spotlight={true}
              glow={true}
              className="flex flex-col justify-between p-5 sm:p-6 min-h-[190px] sm:min-h-[220px]"
            >
              <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted px-2 py-0.5 rounded bg-surface border border-border">
                  {area.tag}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-snug">
                  {area.title}
                </h3>
                <p className="text-xs text-muted font-body leading-relaxed">{area.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
