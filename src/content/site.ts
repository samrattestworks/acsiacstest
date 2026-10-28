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
 * Official chapter general description provided by leadership.
 */
export const ACS_ABOUT_TEXT =
  'American Chemical Society (ACS) Student Chapter at Indian Association for the Cultivation for the Science (IACS) is an International Student organization for college/university students who are interested in chemistry and related fields. It provides a platform for students to engage in scientific and educational activities, including seminars, workshops, networking events and participate in community outreach programs.';

/**
 * Mandated events visual and text placeholder constant.
 * Kept exactly as specified: "[PASTE TEXT FOR LAST TWO YEARS WITH IMAGE HERE]"
 */
export const ACS_EVENTS_PLACEHOLDER = '[PASTE TEXT FOR LAST TWO YEARS WITH IMAGE HERE]';

export const siteConfig: SiteConfig = {
  meta: {
    chapterName: 'ACS IACS Student Chapter',
    institution: 'Indian Association for the Cultivation of Science',
    tagline: 'Precision in Discovery. Bonds that Endure.',
    heroDescription:
      'Official American Chemical Society (ACS) Student Chapter at IACS, Kolkata.\nAn international student platform for chemistry, seminars, workshops, and community outreach.',
    heroSubtitle: 'ACS Student Chapter · IACS Kolkata',
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
      { label: 'About', href: '/about' },
      { label: 'Events', href: '/events' },
      { label: 'Event Registration', href: '/register' },
      { label: 'Team', href: '/team' },
      { label: 'Why Join', href: '/#why-join' },
    ],
    cta: {
      label: 'Join Chapter',
      href: '/join',
    },
  },

  links: {
    application: 'https://forms.gle/GwNzN3wYe1bhPccEA',
    registration: 'https://forms.gle/GwNzN3wYe1bhPccEA',
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
      'Symposium and event delegate registrations are presently closed between cycles. Chapter membership is always open and encouraged.',
    openMessage:
      'Event registrations are officially open. Submit your details for delegate credentials.',
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
      id: 'member-ayan-datta',
      name: 'Prof. Ayan Datta',
      role: 'Faculty Advisor & Patron',
      group: 'Core',
      photo: 'team/ayan-datta.webp',
      links: {
        email: 'mailto:spad@iacs.res.in',
      },
    },
    {
      id: 'member-shreya-mukherjee',
      name: 'Shreya Mukherjee',
      role: 'Chapter President',
      group: 'Core',
      photo: 'team/shreya-mukherjee.webp',
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:president@iacs.res.in',
      },
    },
    {
      id: 'member-maria-mukherjee',
      name: 'Maria Mukherjee',
      role: 'Vice President',
      group: 'Core',
      photo: 'team/maria-mukherjee.webp',
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:vp@iacs.res.in',
      },
    },
    {
      id: 'member-koushik-saha',
      name: 'Koushik Saha',
      role: 'General Secretary',
      group: 'Core',
      photo: 'team/koushik-saha.webp',
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:secretary@iacs.res.in',
      },
    },
    {
      id: 'member-bikram-das',
      name: 'Bikram Das',
      role: 'Treasurer & Finance Lead',
      group: 'Core',
      photo: 'team/bikram-das.webp',
      links: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:treasurer@iacs.res.in',
      },
    },
    {
      id: 'member-sanjukta-chatterjee',
      name: 'Sanjukta Chatterjee',
      role: 'Outreach Coordinator',
      group: 'Leads',
      photo: 'team/sanjukta-chatterjee.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-pallabi-pradhan',
      name: 'Pallabi Pradhan',
      role: 'Communications Chair',
      group: 'Leads',
      photo: 'team/pallabi-pradhan.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-abhishek-anand',
      name: 'Abhishek Anand',
      role: 'Logistics Officer',
      group: 'Leads',
      photo: 'team/abhishek-anand.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-avani-jain',
      name: 'Avani Jain',
      role: 'Logistics Officer',
      group: 'Leads',
      photo: 'team/avani-jain.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-bachchu-mondal',
      name: 'Bachchu Mondal',
      role: 'Research Officer',
      group: 'Members',
      photo: 'team/bachchu-mondal.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-shouvik-maiti',
      name: 'Shouvik Maiti',
      role: 'Research Officer',
      group: 'Members',
      photo: 'team/shouvik-maiti.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-sujan-paul',
      name: 'Sujan Paul',
      role: 'Research Officer',
      group: 'Members',
      photo: 'team/sujan-paul.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 'member-samrat-chakraborty',
      name: 'Samrat Chakraborty',
      role: 'Class Representative',
      group: 'Members',
      photo: 'team/samrat-chakraborty.webp',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
  ],

  footer: {
    copyrightText: '© 2026 ACS IACS Student Chapter. All rights reserved.',
    creatorText: 'Made with care by @madewithcaresamratchakraborty',
    subtext:
      'Affiliated with the American Chemical Society and Indian Association for the Cultivation of Science.',
  },
};
