export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: 'Core' | 'Leads' | 'Members';
  photo: string | null;
  links?: {
    linkedin?: string;
    instagram?: string;
    email?: string;
    github?: string;
  };
}

export interface FocusArea {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export interface WhyJoinCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  x: string;
  youtube: string;
  github: string;
  email: string;
}

export interface SiteConfig {
  meta: {
    chapterName: string;
    institution: string;
    tagline: string;
    heroDescription: string;
    heroSubtitle: string;
    seo: {
      title: string;
      description: string;
      keywords: string[];
      canonical: string;
      ogImage: string;
    };
  };
  navigation: {
    links: NavLink[];
    cta: {
      label: string;
      href: string;
    };
  };
  links: {
    application: string;
    registration: string;
    social: SocialLinks;
  };
  registration: {
    /**
     * Toggling this single boolean activates or closes registration globally across the site.
     * When false: shows high-polish "Registrations Closed" state with status badge and social follow prompt.
     * When true: shows active glowing animated CTA linking to config.links.registration.
     */
    open: boolean;
    closedMessage: string;
    openMessage: string;
    statusPillClosed: string;
    statusPillOpen: string;
  };
  about: {
    title: string;
    subtitle: string;
    text: string;
    periodicElements: Array<{
      symbol: string;
      number: number;
      name: string;
      mass: string;
      state: 'Solid' | 'Liquid' | 'Gas' | 'Synthetic';
      category: string;
      electronConfig?: string;
    }>;
  };
  whyJoin: WhyJoinCard[];
  focusAreas: FocusArea[];
  team: TeamMember[];
  footer: {
    copyrightText: string;
    creatorText?: string;
    subtext: string;
  };
}

/**
 * Exact single real text constant as mandated by the brief.
 * Kept exactly as specified: "[PASTE TEXT FROM ACS WEBSITE HERE]"
 */
export const ACS_ABOUT_TEXT = '[PASTE TEXT FROM ACS WEBSITE HERE]';

export const siteConfig: SiteConfig = {
  meta: {
    chapterName: 'ACS IACS Student Chapter',
    institution: 'Indian Association for the Cultivation of Science',
    tagline: 'Precision in Discovery. Bonds that Endure.',
    heroDescription:
      'Official American Chemical Society student chapter at IACS, Kolkata.\nPioneering molecular research, collaborative discourse, and scientific outreach.',
    heroSubtitle: 'Chapter Est. 2024 · IACS Kolkata',
    seo: {
      title: 'ACS IACS Student Chapter | Excellence in Molecular Sciences',
      description:
        'Official student chapter of the American Chemical Society at the Indian Association for the Cultivation of Science (IACS), Kolkata.',
      keywords: [
        'ACS',
        'IACS',
        'American Chemical Society',
        'Chemistry',
        'Research',
        'Kolkata',
        'Molecular Sciences',
      ],
      canonical: 'https://samrattestworks.github.io/acsiacstest/',
      ogImage: '/favicon.svg',
    },
  },

  navigation: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Events', href: '/events' },
      { label: 'Register', href: '/register' },
      { label: 'Team', href: '/#team' },
      { label: 'Why Join', href: '/#why-join' },
    ],
    cta: {
      label: 'Register (Closed)',
      href: '/register',
    },
  },

  links: {
    application: 'https://forms.gle/placeholder-application',
    registration: 'https://forms.gle/placeholder-registration',
    social: {
      instagram: 'https://instagram.com/placeholder_acsiacs',
      linkedin: 'https://linkedin.com/company/placeholder-acsiacs',
      x: 'https://x.com/placeholder_acsiacs',
      youtube: 'https://youtube.com/@placeholder_acsiacs',
      github: 'https://github.com/placeholder-acsiacs',
      email: 'mailto:contact@placeholder-acsiacs.res.in',
    },
  },

  registration: {
    open: false, // Set to true to open registrations with one boolean toggle
    closedMessage:
      'Chapter membership and delegate registration for the current cycle are presently closed.',
    openMessage: 'Registrations are officially open. Submit your details for chapter credentials.',
    statusPillClosed: 'Registrations Closed',
    statusPillOpen: 'Registrations Open',
  },

  about: {
    title: 'About the Chapter',
    subtitle: 'Bridging fundamental chemistry with transformative collaborative research',
    text: ACS_ABOUT_TEXT,
    periodicElements: [
      {
        symbol: 'I',
        number: 53,
        name: 'Iodine',
        mass: '126.904',
        state: 'Solid',
        category: 'Halogen',
        electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵',
      },
      {
        symbol: 'Ac',
        number: 89,
        name: 'Actinium',
        mass: '227.028',
        state: 'Solid',
        category: 'Actinide',
        electronConfig: '[Rn] 6d¹ 7s²',
      },
      {
        symbol: 'C',
        number: 6,
        name: 'Carbon',
        mass: '12.011',
        state: 'Solid',
        category: 'Reactive Nonmetal',
        electronConfig: '[He] 2s² 2p²',
      },
      {
        symbol: 'S',
        number: 16,
        name: 'Sulfur',
        mass: '32.065',
        state: 'Solid',
        category: 'Chalcogen',
        electronConfig: '[Ne] 3s² 3p⁴',
      },
    ],
  },

  whyJoin: [
    {
      id: 'why-1',
      icon: 'Atom',
      title: 'Global ACS Network',
      description: 'Direct affiliation with the international American Chemical Society network.',
    },
    {
      id: 'why-2',
      icon: 'FlaskConical',
      title: 'Research Symposia',
      description: 'Present investigations and engage with world-renowned chemistry laureates.',
    },
    {
      id: 'why-3',
      icon: 'Sparkles',
      title: 'Travel & Grants',
      description: 'Exclusive eligibility for ACS travel fellowships and international funding.',
    },
    {
      id: 'why-4',
      icon: 'Users',
      title: 'Mentorship Circles',
      description: 'One-on-one academic guidance from senior postdoctoral and doctoral scholars.',
    },
    {
      id: 'why-5',
      icon: 'Compass',
      title: 'Industrial Pathways',
      description:
        'Bespoke seminars connecting molecular theory with pharmaceutical industry leadership.',
    },
    {
      id: 'why-6',
      icon: 'Share2',
      title: 'Science Outreach',
      description: 'Conduct engaging chemistry experiments and outreach in regional academies.',
    },
  ],

  focusAreas: [
    {
      id: 'focus-1',
      icon: 'Orbit',
      title: 'Molecular Dynamics & Quantum Chemistry',
      description:
        'Computational modeling of electronic structures and bond dissociation pathways.',
      tag: 'Theoretical',
    },
    {
      id: 'focus-2',
      icon: 'Layers',
      title: 'Catalysis & Functional Materials',
      description:
        'Synthesizing porous coordination frameworks and heterogeneous catalytic complexes.',
      tag: 'Materials',
    },
    {
      id: 'focus-3',
      icon: 'Dna',
      title: 'Chemical Biology & Therapeutics',
      description:
        'Investigating macromolecular interactions and targeted biochemical delivery vectors.',
      tag: 'Bio-Organic',
    },
    {
      id: 'focus-4',
      icon: 'Sun',
      title: 'Photochemistry & Renewable Energy',
      description:
        'Harvesting light to drive sustainable multi-electron catalytic transformations.',
      tag: 'Energy',
    },
  ],

  team: [
    {
      id: 'member-1',
      name: 'Faculty Advisor',
      role: 'Faculty Advisor & Patron',
      group: 'Core',
      photo: null, // Resolves to generated placeholder until public/team/ image is provided
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:advisor@iacs.res.in',
      },
    },
    {
      id: 'member-2',
      name: 'Chapter President',
      role: 'President',
      group: 'Core',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:president@iacs.res.in',
      },
    },
    {
      id: 'member-3',
      name: 'Vice President',
      role: 'Vice President',
      group: 'Core',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:vp@iacs.res.in',
      },
    },
    {
      id: 'member-4',
      name: 'Secretary',
      role: 'General Secretary',
      group: 'Core',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:secretary@iacs.res.in',
      },
    },
    {
      id: 'member-5',
      name: 'Treasurer',
      role: 'Treasurer & Finance Lead',
      group: 'Core',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:treasurer@iacs.res.in',
      },
    },
    {
      id: 'member-6',
      name: 'Events Lead',
      role: 'Symposia & Events Coordinator',
      group: 'Leads',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 'member-7',
      name: 'Outreach Lead',
      role: 'Scientific Outreach Coordinator',
      group: 'Leads',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      id: 'member-8',
      name: 'Media & Design Lead',
      role: 'Communications & Visual Designer',
      group: 'Leads',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 'member-9',
      name: 'Graduate Member 01',
      role: 'Research Associate',
      group: 'Members',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-10',
      name: 'Graduate Member 02',
      role: 'Student Representative',
      group: 'Members',
      photo: null,
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
  ],

  footer: {
    copyrightText: `© 2024–${new Date().getFullYear()} ACS IACS Student Chapter. All rights reserved.`,
    creatorText: 'Made with care by @madewithcaresamratchakraborty',
    subtext:
      'Affiliated with the American Chemical Society and Indian Association for the Cultivation of Science.',
  },
};
