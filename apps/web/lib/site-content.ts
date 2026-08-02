/**
 * Marketing copy and external links — edit here for bio / Linktree parity.
 * @see https://linktr.ee/kanjavamusic
 */

export const site = {
  name: 'Kanjava Music',
  handle: '@kanjavamusic',
  mood: '¯\\_(ツ)_/¯',
  tagline: 'Production assets, original radio, and a slow-burn marketplace experiment.',
} as const;

export const person = {
  displayName: 'AJ Javadi',
  alsoKnownAs: 'Ashkan Javadi',
  shortBio:
    'VFX and interactive entertainment by day, music and builds by night. Kanjava Music is a passion project: see what sticks—marketplace, catalog, and mixes—without rushing the stack.',
  longBio: [
    'Kanjava Music is two threads woven together: a royalty-free production catalog for ghost producers and DJs, and a personal lane for original work under @kanjavamusic.',
    'This site is intentionally a slow burn—experiments, tooling, and releases shipped when they are ready, not on a hype cycle.',
    'When the marketplace is live, producers keep copyright; buyers get clear usage licenses. When Kanjava Radio is live, the mixes are a different promise: all originals, hosted here only.',
  ],
} as const;

/** Primary hub; individual links mirror Linktree sections. */
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
  /** Placeholder episodes — replace with real slugs, dates, and media URLs when ready. */
  upcomingMixes: [
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
      'Kanjava Music is not a launch-at-all-costs startup. It is a place to test what resonates: royalty-free assets for producers, build-in-public chapters, and original radio mixes.',
      'The marketplace side serves ghost producers and DJs who need portable, licensed material. The personal side is @kanjavamusic—my edits, experiments, and Kanjava Radio sessions.',
      'Kanjava Radio is a deliberate constraint: when mixes go live, they are all originals and they stream from this site only. That gives listeners a reason to bookmark Kanjava, and it keeps the project honest about where the art lives.',
      'If you are here early, thank you. Browse the stub catalog, read the build log in the repo docs, or grab the Linktree for everything else I am working on.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
