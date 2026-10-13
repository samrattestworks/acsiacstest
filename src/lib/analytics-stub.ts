export type AnalyticsEvent =
  | { name: 'cta_click'; label: string; href: string }
  | { name: 'theme_toggle'; theme: 'dark' | 'light' }
  | { name: 'filter_team'; group: string }
  | { name: 'nav_click'; target: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== 'production') {
    // Development diagnostics
    console.debug('[Analytics Stub]', event);
  }
}
