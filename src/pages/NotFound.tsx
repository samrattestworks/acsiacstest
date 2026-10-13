import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { updatePageSeo } from '@/lib/seo';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: '404 - Orbital Not Found | ACS IACS Student Chapter',
      description: 'The requested page or orbital coordinate does not exist.',
    });
  }, []);

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center select-none py-20">
      <div className="relative max-w-lg p-10 rounded-3xl border border-border bg-surface/70 backdrop-blur-xl shadow-card flex flex-col items-center gap-6">
        {/* Decorative Atomic Element Tag */}
        <div className="w-24 h-24 rounded-2xl bg-surface border border-border/80 flex flex-col items-center justify-center p-3 shadow-inner">
          <span className="font-mono text-xs text-muted">404</span>
          <span className="font-display font-extrabold text-3xl text-accent">Nf</span>
          <span className="font-mono text-[10px] text-muted/70 uppercase">NotFound</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Orbital Not Found
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            The pathway you were attempting to resolve does not exist in the current electronic
            configuration or has undergone dissociation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Button to="/" variant="primary" icon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous State
          </Button>
        </div>
      </div>
    </section>
  );
};
