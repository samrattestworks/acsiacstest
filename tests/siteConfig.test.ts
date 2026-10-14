import { describe, it, expect } from 'vitest';
import { siteConfig, ACS_ABOUT_TEXT } from '@/content/site';

describe('site.ts content and structure integrity', () => {
  it('strictly adheres to the mandated ACS_ABOUT_TEXT constant', () => {
    expect(ACS_ABOUT_TEXT).toBe('[PASTE TEXT FROM ACS WEBSITE HERE]');
    expect(siteConfig.about.text).toBe(ACS_ABOUT_TEXT);
  });

  it('contains valid SEO and meta configurations', () => {
    expect(siteConfig.meta.chapterName).toBe('ACS IACS Student Chapter');
    expect(siteConfig.meta.institution).toBe('Indian Association for the Cultivation of Science');
    expect(siteConfig.meta.heroDescription.split('\n').length).toBeLessThanOrEqual(2);
  });

  it('configures registration switch and default closed state', () => {
    expect(typeof siteConfig.registration.open).toBe('boolean');
    expect(siteConfig.registration.open).toBe(false);
    expect(siteConfig.registration.statusPillClosed).toBeTruthy();
    expect(siteConfig.registration.statusPillOpen).toBeTruthy();
  });

  it('contains exactly 4 focus areas with required fields', () => {
    expect(siteConfig.focusAreas.length).toBe(4);
    siteConfig.focusAreas.forEach((area) => {
      expect(area.id).toBeTruthy();
      expect(area.title).toBeTruthy();
      expect(area.description).toBeTruthy();
      expect(area.tag).toBeTruthy();
    });
  });

  it('contains 6 why join cards with short punchy descriptions', () => {
    expect(siteConfig.whyJoin.length).toBe(6);
    siteConfig.whyJoin.forEach((card) => {
      expect(card.id).toBeTruthy();
      expect(card.title.split(' ').length).toBeLessThanOrEqual(4);
      expect(card.description).toBeTruthy();
    });
  });

  it('contains team members conforming to typed schema', () => {
    expect(siteConfig.team.length).toBeGreaterThanOrEqual(6);
    siteConfig.team.forEach((member) => {
      expect(member.id).toBeTruthy();
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(['Core', 'Leads', 'Members']).toContain(member.group);
    });
  });

  it('contains enduring footer copyright and creator attribution', () => {
    expect(siteConfig.footer.copyrightText).toBe(
      '© 2026 ACS IACS Student Chapter. All rights reserved.'
    );
    expect(siteConfig.footer.copyrightText).toContain('2026');
    expect(siteConfig.footer.copyrightText).not.toContain('2024');
    expect(siteConfig.footer.creatorText).toContain('madewithcaresamratchakraborty');
    expect(siteConfig.footer.subtext).toBeTruthy();
  });
});
