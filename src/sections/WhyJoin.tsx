import React from 'react';
import { Atom, FlaskConical, Sparkles, Users, Compass, Share2, LucideIcon } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Card } from '@/components/ui/Card';

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  FlaskConical,
  Sparkles,
  Users,
  Compass,
  Share2,
};

export const WhyJoin: React.FC = () => {
  return (
    <section
      id="why-join"
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24 select-none"
      aria-label="Why join the chapter"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16 gap-2 sm:gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // Member Advantages
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
          Why Join Us
        </h2>
        <p className="text-xs sm:text-sm font-mono text-muted px-2">
          Cultivating molecular scientists through international community and fellowship.
        </p>
      </div>

      {/* Responsive Bento Grid (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {siteConfig.whyJoin.map((card, idx) => {
          const Icon = ICON_MAP[card.icon] || Atom;
          const isSpan = idx === 0 || idx === 5;

          return (
            <Card
              key={card.id}
              spotlight={true}
              glow={true}
              className={`flex flex-col justify-between min-h-[190px] sm:min-h-[220px] p-5 sm:p-7 ${
                isSpan ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="font-mono text-xs text-muted/60">0{idx + 1}</span>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted font-body leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
