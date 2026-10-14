import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics-stub';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('acs_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('acs_theme', 'light');
    }

    trackEvent({ name: 'theme_toggle', theme: nextTheme });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'w-9 h-9 rounded-xl bg-surface/80 border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 hover:bg-surface-hover transition-colors duration-200 cursor-pointer focus-visible:outline-accent select-none',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-primary transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
