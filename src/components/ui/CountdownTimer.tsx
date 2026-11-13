import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Clock, Sparkles } from 'lucide-react';

export interface CountdownTimerProps {
  /**
   * Target ISO date string, e.g. '2026-12-15T10:30:00+05:30'
   */
  targetDate?: string;
  className?: string;
  compact?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

const DEFAULT_TARGET = '2026-12-15T10:30:00+05:30';

function calculateTimeRemaining(targetIso: string): TimeRemaining {
  const targetMs = Date.parse(targetIso);
  const nowMs = Date.now();
  const diffMs = targetMs - nowMs;

  if (diffMs <= 0 || isNaN(diffMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
  }

  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isCompleted: false };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = DEFAULT_TARGET,
  className,
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeRemaining(targetDate));

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(targetDate));

    const interval = setInterval(() => {
      const updated = calculateTimeRemaining(targetDate);
      setTimeLeft(updated);
      if (updated.isCompleted) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (timeLeft.isCompleted) {
    return (
      <div
        className={cn(
          'p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-accent/20 to-emerald-500/20 border border-emerald-500/40 text-center flex flex-col items-center justify-center gap-2 select-none shadow-lg',
          className
        )}
      >
        <div className="inline-flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest font-bold">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Symposium In Session</span>
        </div>
        <p className="font-display font-black text-xl sm:text-2xl text-foreground">
          Symbiosis 2026 is Happening Now!
        </p>
        <p className="text-xs sm:text-sm text-muted font-body">
          CV Raman Hall, IACS Kolkata & Hybrid Virtual Broadcast
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: pad(timeLeft.days), sub: 'd' },
    { label: 'Hours', value: pad(timeLeft.hours), sub: 'h' },
    { label: 'Minutes', value: pad(timeLeft.minutes), sub: 'm' },
    { label: 'Seconds', value: pad(timeLeft.seconds), sub: 's' },
  ];

  if (compact) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-accent/30 font-mono text-xs shadow-xs',
          className
        )}
        role="timer"
        aria-live="polite"
      >
        <Clock className="w-3.5 h-3.5 text-accent animate-pulse" />
        <span className="font-semibold text-foreground">Starts In:</span>
        <span className="text-accent font-bold">
          {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn('w-full flex flex-col items-center gap-3 select-none', className)}
      role="timer"
      aria-label={`Symposium countdown: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds remaining`}
      aria-live="polite"
    >
      {/* Live Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-[11px] sm:text-xs font-semibold tracking-wider">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span>LIVE COUNTDOWN TO SYMPOSIUM INAUGURATION</span>
      </div>

      {/* Grid of Digits */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-xl">
        {units.map((unit, idx) => (
          <div
            key={unit.label}
            className="group relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-surface/85 backdrop-blur-md border border-border/80 shadow-card hover:border-accent/40 transition-all"
          >
            {/* Ambient subtle back-glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent pointer-events-none group-hover:from-accent/15 transition-all" />

            {/* Digits */}
            <div className="relative font-mono font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground group-hover:text-accent transition-colors">
              {unit.value}
            </div>

            {/* Label */}
            <div className="relative mt-1 sm:mt-1.5 flex items-center gap-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted font-medium">
              <span>{unit.label}</span>
            </div>

            {/* Subtle chemical indicator dot */}
            <div
              className={cn(
                'absolute top-2 right-2 w-1.5 h-1.5 rounded-full',
                idx === 3 ? 'bg-amber animate-pulse' : 'bg-muted/30'
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-muted/80 mt-1">
        <Clock className="w-3.5 h-3.5 text-accent" />
        <span>Tuesday, 15th December 2026 · 10:30 AM IST</span>
      </div>
    </div>
  );
};
