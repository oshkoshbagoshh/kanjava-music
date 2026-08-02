/**
 * Marketing copy, Ghost ecosystem philosophy, and external links.
 * Kanjava Music is the implementation site; Ghost is the long-term ecosystem brand.
 * @see https://linktr.ee/kanjavamusic
 */

export const site = {
  name: 'Kanjava Music',
  handle: '@kanjavamusic',
  mood: '¯\\_(ツ)_/¯',
  tagline: 'An open-source ecosystem for creative mastery—built in public, slow burn.',
  ecosystemLine:
    'Ghost Marketplace · Ghost Academy · Ghost Labs · Ghost OS · Ghost Network',
} as const;

export const ghostBrand = {
  headline: 'An open-source ecosystem for creative mastery',
  subhead:
    'Mastery over consumption. Collaboration over competition. Building over buying.',
  marketplaceName: 'Ghost Marketplace',
  marketplacePitch:
    'One person’s trash is another person’s treasure. Upload the half-finished ideas on your hard drives and USBs—audio and MIDI you actually own—and find a real human to collaborate with (agents can join the party in v3, lol).',
  uploadRules: [
    'Audio and MIDI only.',
    'Upload only what you own or have clear rights to license.',
    'Scratch-built, unfinished, and weird is welcome—mass-produced “instant hit” pack reselling is not the vibe.',
    'Producers keep copyright; collaborators get clear usage terms—not a free-for-all on someone else’s work.',
  ],
} as const;

export type PhilosophyBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const whatWereNotIntro = {
  title: 'What we’re not',
  lead:
    'There are already plenty of marketplaces selling millions of loops, presets, and “instant hit” templates. Ghost Marketplace isn’t trying to be another one.',
};

export const whatWereNotSections: PhilosophyBlock[] = [
  {
    id: 'shortcuts',
    title: 'We don’t believe in shortcuts',
    paragraphs: [
      'Technology is incredible. AI is incredible. Modern plugins are incredible. But none of them replace understanding.',
      'Use technology to amplify your creativity—not replace your ability to create. The goal isn’t the biggest plugin folder. The goal is becoming the kind of producer who can make incredible music with whatever tools are already in front of you.',
    ],
  },
  {
    id: 'gear',
    title: 'We don’t chase gear',
    paragraphs: [
      'Every year there’s another “must-have” synthesizer, another AI mastering tool, another plugin that promises radio-ready mixes in one click. We’re not interested in chasing shiny objects.',
    ],
    bullets: [
      'Learn your DAW.',
      'Master the stock plugins.',
      'Understand synthesis.',
      'Learn arrangement.',
      'Practice mixing.',
      'Develop your ears.',
      'Those skills never become obsolete.',
    ],
  },
  {
    id: 'consumption',
    title: 'We don’t reward consumption',
    paragraphs: [
      'Buying another plugin isn’t progress. Downloading another sample pack isn’t progress. Watching another tutorial isn’t progress.',
      'Progress happens when you open your DAW and actually make something. Ghost Marketplace exists to encourage creating, collaborating, finishing projects, and learning by doing.',
    ],
  },
  {
    id: 'perfect',
    title: 'We don’t want perfect',
    paragraphs: [
      'We’re looking for unfinished songs, half-built ideas, weird experiments, MIDI sketches, voice memos, broken concepts—projects sitting forgotten on hard drives.',
      'Because one person’s abandoned project could become someone else’s favorite record. One person’s trash is another person’s treasure.',
    ],
  },
  {
    id: 'badges',
    title: 'We believe in earning your badges',
    paragraphs: [
      'Learning shouldn’t stop after watching a video. Our community includes experienced creators who volunteer as optional Gym Leaders—complete their creative challenge, receive real feedback, earn your badge.',
      'No participation trophies. No fake internet points. Just demonstrated skills and a growing body of work. (Gym Leaders and badges are on the roadmap—Phase 3+.)',
    ],
  },
  {
    id: 'community',
    title: 'We believe communities build communities',
    paragraphs: [
      'Ghost Marketplace is more than a marketplace. It’s a place where people teach, mentor, collaborate, write articles, create tutorials, and share knowledge.',
      'If you’ve learned something, teach someone else. If you have experience, become a mentor. If you have an idea, build it. Help the next generation become better musicians than we were.',
    ],
  },
  {
    id: 'tools',
    title: 'We’re building our own tools',
    paragraphs: [
      'Long-term, we don’t just want a marketplace—we want the tools we’d actually use. We’re looking for DSP and modern C++ developers passionate about synthesizers, audio effects, and creative coding.',
      'The goal: original, community-driven instruments and effects released as open-source software. If you’ve wanted to help build the next generation of creative tools—not just use them—we’d love to hear from you.',
    ],
  },
  {
    id: 'disciplines',
    title: 'Creator. Teacher. Engineer. Collaborator.',
    paragraphs: [
      'Music has always been bigger than music—design, programming, electronics, live performance, visuals, education, business. Ghost brings disciplines together because the best ideas happen where worlds collide.',
      'If that sounds like your kind of community—welcome home.',
    ],
  },
];

export type EcosystemPillar = {
  id: string;
  name: string;
  role: string;
  status: 'live_stub' | 'building' | 'vision';
  description: string;
};

export const ecosystemPillars: EcosystemPillar[] = [
  {
    id: 'marketplace',
    name: 'Ghost Marketplace',
    role: 'Collaboration & asset exchange',
    status: 'building',
    description:
      'Unfinished audio and MIDI you own, shared to find collaborators—not another loop megastore. Kanjava Music is where this stack is being built first.',
  },
  {
    id: 'academy',
    name: 'Ghost Academy',
    role: 'Pass/fail courses, Gym Leaders, badges',
    status: 'vision',
    description:
      'Optional challenges, real feedback, earned badges—no participation trophies.',
  },
  {
    id: 'labs',
    name: 'Ghost Labs',
    role: 'Open-source DSP & creative tools',
    status: 'vision',
    description:
      'Community instruments and effects—Max for Live, TouchDesigner experiments, and C++ audio tools over time.',
  },
  {
    id: 'os',
    name: 'Ghost OS',
    role: 'Long-term performance environment',
    status: 'vision',
    description: 'The Conductor OS vision—performance and workflow tools that match how you actually play live and produce.',
  },
  {
    id: 'network',
    name: 'Ghost Network',
    role: 'People across disciplines',
    status: 'vision',
    description:
      'Musicians, programmers, visual artists, educators, and collaborators in one orbit.',
  },
];

export const person = {
  displayName: 'AJ Javadi',
  alsoKnownAs: 'Ashkan Javadi',
  shortBio:
    'VFX and interactive entertainment by day, music and ecosystem-building by night. Kanjava / Ghost is a passion project: see what sticks—marketplace, radio, academy, and open tools—without rushing the stack.',
  longBio: [
    'Kanjava Music hosts the build in public: Ghost Marketplace philosophy, Kanjava Radio originals, and the technical roadmap in the repo.',
    'This site is intentionally a slow burn—experiments shipped when they are ready, not on a hype cycle.',
    'Ghost is the ecosystem name; Kanjava is the studio handle and the code you can clone today.',
  ],
} as const;

export const persianHeritage = {
  title: 'Ancient Persia & heritage',
  intro:
    'Kanjava is built by an Iranian American creator. This is not a place for politics—it is a small invitation to celebrate one of the world’s oldest continuous cultures and to learn about its rich history.',
  body: [
    'Persia’s legacy spans poetry, mathematics, astronomy, architecture, and music that still echoes in modern production. Taking a few minutes to explore that history is one way we honor where we come from while we build something new.',
    'If you are curious, start with neutral, educational resources below—museums, UNESCO, and overview histories—not hot takes.',
  ],
  learnMoreLinks: [
    {
      label: 'History of Iran (overview)',
      href: 'https://en.wikipedia.org/wiki/History_of_Iran',
      description: 'Broad historical timeline',
    },
    {
      label: 'Persepolis (UNESCO)',
      href: 'https://whc.unesco.org/en/list/114/',
      description: 'World Heritage site — Achaemenid capital',
    },
    {
      label: 'The Met — Persian art',
      href: 'https://www.metmuseum.org/about-the-met/collection-areas/islamic-art',
      description: 'Islamic art collection including Persian works',
    },
    {
      label: 'British Museum — ancient Iran',
      href: 'https://www.britishmuseum.org/collection/galleries/ancient-iran',
      description: 'Gallery introduction and objects',
    },
  ],
  memorialNote:
    'An upcoming Kanjava Radio session will be dedicated—original music only, published here—to honoring those who have fallen during these hard times. Details when the mix is ready.',
} as const;

export const externalLinks = [
  {
    label: 'Linktree — everything in one place',
    href: 'https://linktr.ee/kanjavamusic',
    description: 'Official link hub',
  },
  {
    label: 'Writing & video (Medium)',
    href: 'https://medium.com/@ajjavadi',
    description: 'Essays, build logs, and video notes',
  },
  {
    label: "Ashkan's Edits (SoundCloud)",
    href: 'https://soundcloud.com',
    description: 'Production edits — update URL from your Linktree if different',
  },
  {
    label: 'Technology & consulting (GitHub)',
    href: 'https://github.com/oshkoshbagoshh',
    description: 'Open source and experiments',
  },
] as const;

export const kanjavaRadio = {
  title: 'Kanjava Radio',
  exclusivity:
    'Kanjava Radio mixes are 100% originals. When published, they live here only—not on SoundCloud, Spotify, YouTube, or anywhere else.',
  statusNote:
    'Mixes are rolling out as the player and hosting pipeline land (Release 2). Follow the blog or Linktree for the first drop.',
  upcomingMixes: [
    {
      id: 'kr-memorial',
      title: 'Kanjava Radio — In honor',
      subtitle:
        'Original session dedicated to honoring those who have fallen during these hard times. Site-exclusive when published.',
      status: 'coming_soon' as const,
      memorial: true as const,
    },
    {
      id: 'kr-001',
      title: 'Kanjava Radio 001',
      subtitle: 'Original session — forthcoming',
      status: 'coming_soon' as const,
    },
    {
      id: 'kr-002',
      title: 'Kanjava Radio 002',
      subtitle: 'Original session — forthcoming',
      status: 'coming_soon' as const,
    },
  ],
} as const;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'slow-burn-passion-project',
    title: 'Kanjava Music as a slow-burn passion project',
    date: '2026-08-02',
    excerpt:
      'Why this site balances a marketplace vision with personal originals—and why Kanjava Radio will be exclusive here.',
    body: [
      'Kanjava Music is not a launch-at-all-costs startup. It is a place to test what resonates: Ghost Marketplace ideas, build-in-public chapters, and original radio mixes.',
      'The marketplace side is for scratch-built audio and MIDI you own—unfinished ideas that might become someone else’s treasure. The personal side is @kanjavamusic—edits, experiments, and Kanjava Radio.',
      'Kanjava Radio is a deliberate constraint: when mixes go live, they are all originals and they stream from this site only.',
      'If you are here early, thank you. Read What We’re Not, skim the ecosystem map, or clone the repo and run Docker when you want the full stack.',
    ],
  },
  {
    slug: 'one-persons-trash',
    title: 'One person’s trash is another person’s treasure',
    date: '2026-08-02',
    excerpt:
      'The core Ghost Marketplace idea: upload unfinished work you own, meet real collaborators, skip the shortcut economy.',
    body: [
      'Ghost Marketplace starts from a simple observation: plenty of us have folders of half-finished songs, MIDI sketches, and weird experiments that will never see a streaming platform. That is not failure—it is inventory waiting for the right collaborator.',
      'This is not a race to upload the most loops. It is a place to connect with an actual human who might finish the idea with you. (In v3, agents might help too—we are not pretending otherwise.)',
      'Rules matter: audio and MIDI only, and only what you have rights to. We are not building a home for pack resellers or shortcut-first consumption.',
      'Kanjava Music is where the code and the slow burn live today. Welcome home if that matches your values.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
