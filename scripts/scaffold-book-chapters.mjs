#!/usr/bin/env node
/**
 * Generates chapter stubs and test files under docs/book/.
 * Idempotent: skips existing files unless BOOK_SCAFFOLD_FORCE=1.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'docs/book');
const force = process.env.BOOK_SCAFFOLD_FORCE === '1';

const chapters = [
  {
    num: '00',
    slug: '00-preface',
    title: 'Preface: Why Build This?',
    branch: 'book/chapter-00-preface',
    next: '01 — Phase 0: Local-First USB Library',
    outcomes: [
      'What Kanjava Music is and who it serves',
      'Why the project starts with Phase 0 local/USB mode',
      'How the free blog and paid eBook relate',
    ],
  },
  {
    num: '01',
    slug: '01-phase-0-local-first-usb-library',
    title: 'Phase 0: Local-First USB Library',
    branch: 'book/chapter-01-phase-0-local-first-usb-library',
    next: '02 — USB Scaffold and Producer Card',
    outcomes: [
      'Phase 0 as fully local/offline operation',
      'SQLite + filesystem on a USB or local folder',
      'Clear separation from Postgres/Redis marketplace stack',
    ],
  },
  {
    num: '02',
    slug: '02-usb-scaffold-producer-card',
    title: 'USB Scaffold and Producer Card',
    branch: 'book/chapter-02-usb-scaffold-producer-card',
    next: '03 — SQLite Local Catalog',
    outcomes: [
      'Top-level USB folder humans can read without the app',
      'CHANGELOG, contact, and producer card files',
      'Producer card as seed of the future platform profile',
    ],
  },
  {
    num: '03',
    slug: '03-sqlite-local-catalog',
    title: 'SQLite Local Catalog',
    branch: 'book/chapter-03-sqlite-local-catalog',
    next: '04 — Imports, Hashing, and Deduplication',
    outcomes: [
      'Role of kanjava-library.sqlite inside the library root',
      'Tables for assets, crates, tags, producer profile, events',
      'Relative paths for portability',
    ],
  },
  {
    num: '04',
    slug: '04-imports-hashing-deduplication',
    title: 'Imports, Hashing, and Deduplication',
    branch: 'book/chapter-04-imports-hashing-deduplication',
    next: '05 — Crates, Search, and Metadata',
    outcomes: [
      'Import modes: copy, move, reference',
      'SHA-256 deduplication with Node crypto',
      'Import logs and safe handling of originals',
    ],
  },
  {
    num: '05',
    slug: '05-crates-search-metadata',
    title: 'Crates, Search, and Metadata',
    branch: 'book/chapter-05-crates-search-metadata',
    next: '06 — Previews, Waveforms, and Cache',
    outcomes: [
      'DJ-style ordered crates',
      'Offline filter/search by BPM, key, genre, tags',
      'Export crates to folders or another device',
    ],
  },
  {
    num: '06',
    slug: '06-previews-waveforms-cache',
    title: 'Previews, Waveforms, and Cache',
    branch: 'book/chapter-06-previews-waveforms-cache',
    next: '07 — From Local Library to Marketplace',
    outcomes: [
      'Originals vs previews vs waveform cache',
      'Regenerable cache data',
      'Folder layout: previews/, waveforms/',
    ],
  },
  {
    num: '07',
    slug: '07-local-library-to-marketplace',
    title: 'From Local Library to Marketplace',
    branch: 'book/chapter-07-local-library-to-marketplace',
    next: '08 — Producer Accounts and Auth',
    outcomes: [
      'Mapping local metadata to marketplace listings',
      'Producer card → producer profile',
      'Explicit sync/upload boundary',
    ],
  },
  {
    num: '08',
    slug: '08-producer-accounts-auth',
    title: 'Producer Accounts and Auth',
    branch: 'book/chapter-08-producer-accounts-auth',
    next: '09 — Uploads, Licensing, and Storage',
    outcomes: [
      'Producer accounts and JWT session model',
      'Ownership of uploads and profile identity',
      'High-level security notes',
    ],
  },
  {
    num: '09',
    slug: '09-uploads-licensing-storage',
    title: 'Uploads, Licensing, and Storage',
    branch: 'book/chapter-09-uploads-licensing-storage',
    next: '10 — Catalog, Discovery, and Bundles',
    outcomes: [
      'Upload lifecycle in the marketplace repo',
      'Royalty-free licensing and license snapshots',
      'Local vs S3 storage drivers',
    ],
  },
  {
    num: '10',
    slug: '10-catalog-discovery-bundles',
    title: 'Catalog, Discovery, and Bundles',
    branch: 'book/chapter-10-catalog-discovery-bundles',
    next: '11 — Deployment and Operations',
    outcomes: [
      'Product types, genres, DAW metadata',
      'Discovery sections and bundles',
      'Dual pricing display concepts',
    ],
  },
  {
    num: '11',
    slug: '11-deployment-operations',
    title: 'Deployment and Operations',
    branch: 'book/chapter-11-deployment-operations',
    next: '12 — Roadmap: Producer Card to Platform',
    outcomes: [
      'Docker dev stack vs Phase 0 local mode',
      'Env vars, backups, secrets policy',
      'Production deployment considerations',
    ],
  },
  {
    num: '12',
    slug: '12-roadmap-producer-card-platform',
    title: 'Roadmap: Producer Card to Platform',
    branch: 'book/chapter-12-roadmap-producer-card-platform',
    next: '(end of series — eBook bonus material)',
    outcomes: [
      'Producer card → public profile and QR handoff',
      'Deferred: badges, sync, fingerprinting, embeds',
      'Digital products roadmap without over-promising',
    ],
  },
];

const mustPassFail = {
  '00': {
    pass: [
      'Explains what Kanjava Music is',
      'Explains why the project starts with Phase 0',
      'Bridge from local USB to marketplace',
      'Defines reader audience',
      'Mentions free blog + paid eBook ($50 / $25 first 100)',
    ],
    fail: [
      'Starts with implementation before mission',
      'Does not mention producers/DJs',
      'Does not explain local-first',
      'Generic SaaS tone',
    ],
  },
  '01': {
    pass: [
      'Defines Phase 0 as local/offline',
      'External USB drive use explained',
      'SQLite for portable metadata',
      'Local filesystem storage',
      'No Postgres, Redis, Docker, S3, auth, marketplace required',
      'Example library root shown',
    ],
    fail: [
      'Reader thinks cloud is required',
      'Marketplace backend required to start',
      'SQLite without portability story',
      'No concrete USB workflow',
    ],
  },
  '02': {
    pass: [
      'Complete top-level USB scaffold',
      'README.txt, CHANGELOG.txt, CONTACT.txt',
      'PRODUCER-CARD.txt and PRODUCER-CARD.vcf',
      'Producer card → future platform profile',
      'Lost USB / contact recovery',
      'Sample contents for each top-level file',
    ],
    fail: [
      'App-only folder layout',
      'Producer card optional trivia',
      'No offline contact file',
      'No changelog concept',
    ],
  },
  '03': {
    pass: [
      'kanjava-library.sqlite role explained',
      'Tables: assets, crates, crate_assets, tags, producer_profile, library_events',
      'Relative paths',
      'DB lives inside library root',
      'Example records',
    ],
    fail: [
      'Server-dependent design',
      'Absolute-only paths',
      'Producer profile disconnected from card',
      'No library events/changelog table',
    ],
  },
  '04': {
    pass: [
      'Import modes: copy, move, reference',
      'SHA-256 deduplication',
      'Safe handling of originals',
      'Import logs',
      'Unsupported file handling',
      'Pass/fail import examples',
    ],
    fail: [
      'Silent overwrites',
      'Unclear duplicate handling',
      'Hashing not explained',
      'Errors not documented',
    ],
  },
  '05': {
    pass: [
      'Crates as ordered collections',
      'Crate folder/export behavior',
      'Filter BPM, key, genre, tags, producer, type, license notes',
      'Offline search',
      'DJ use case',
      'Producer/sample-pack use case',
    ],
    fail: [
      'Crates are folders only',
      'Internet-dependent search',
      'No ordering',
      'DJ workflows ignored',
    ],
  },
  '06': {
    pass: [
      'Originals vs previews',
      'Cache separate from originals',
      'Waveform data regenerable',
      'previews/ and waveforms/ folders',
      'Offline playback expectations',
    ],
    fail: [
      'Originals mixed with cache',
      'Cache treated as irreplaceable',
      'No preview strategy',
    ],
  },
  '07': {
    pass: [
      'Local metadata → listings mapping',
      'Producer card → producer profile',
      'What syncs vs stays local',
      'Licensing metadata handoff',
      'Phase 0 vs Phase 1 boundary',
    ],
    fail: [
      'Local/marketplace blurred',
      'Upload without user intent',
      'Duplicated identity instead of evolution',
    ],
  },
  '08': {
    pass: [
      'Account creation explained',
      'Login/session concept',
      'Producer ownership of uploads',
      'Account ↔ producer profile',
      'Security notes',
    ],
    fail: [
      'Auth as checkbox only',
      'Identity not tied to uploads',
      'Security ignored',
    ],
  },
  '09': {
    pass: [
      'Upload lifecycle',
      'Royalty-free licensing correct',
      'Producer retains copyright',
      'Buyer usage license, no ongoing royalty',
      'Originals vs previews',
      'Local vs prod storage',
      'License snapshot',
    ],
    fail: [
      '"Copyright-free" misuse',
      'Copyright ownership unclear',
      'Originals exposed as previews',
      'Vague licensing',
    ],
  },
  '10': {
    pass: [
      'Product types: sample, loop, MIDI, preset, one-shot, template, stem, pack, vocal pack',
      'Genre taxonomy',
      'DAW metadata',
      'Regular vs exclusive pricing display',
      'Discovery sections',
      'Bundles',
    ],
    fail: [
      'Incomplete catalog types',
      'Discovery is search only',
      'Bundles unexplained',
      'Ambiguous pricing fields',
    ],
  },
  '11': {
    pass: [
      'Local development explained',
      'Production build concept',
      'Environment variables',
      'Backups',
      'Secrets policy',
      'Phase 0 vs marketplace ops',
    ],
    fail: [
      'Secrets committed',
      'No backup strategy',
      'Phase 0 confused with Docker stack',
    ],
  },
  '12': {
    pass: [
      'Producer card → platform profile',
      'Public business card page',
      'QR/contact use case',
      'Future sync described',
      'Badges/reputation deferred clearly',
      'Fingerprinting, embeds, recommendations as future',
    ],
    fail: [
      'Feature dump roadmap',
      'Missing producer card evolution',
      'Deferred features sound like promises',
    ],
  },
};

function chapterMd(c) {
  return `# Chapter ${c.num}: ${c.title}

## Status

Draft

## Matching GitHub branch

\`\`\`text
${c.branch}
\`\`\`

## Stable snapshot

\`\`\`text
book-chapter-${c.num}
\`\`\`

## Reader outcome

By the end of this chapter, you will understand:

${c.outcomes.map((o) => `- ${o}`).join('\n')}

## Problem

<!-- TODO: Describe the problem this chapter solves. -->

## Why this matters

<!-- TODO: Connect to DJs, producers, or builders. -->

## What we are building

- [ ] TODO: Deliverable 1
- [ ] TODO: Deliverable 2
- [ ] TODO: Deliverable 3

## Final result

<!-- TODO: Folder tree, schema, commands, or behavior. -->

\`\`\`text
TODO/
\`\`\`

## Walkthrough

### Step 1 — TODO

<!-- Explain. -->

### Step 2 — TODO

<!-- Explain. -->

### Step 3 — TODO

<!-- Explain. -->

## Pass/fail tests

See [tests/chapter-${c.num}-tests.md](../tests/chapter-${c.num}-tests.md).

## Common mistakes

- TODO

## Recap

In this chapter, we:

- TODO

## Next chapter

${c.next}

## Writing checklist

- [ ] Problem and outcomes filled in
- [ ] Walkthrough steps complete
- [ ] Branch link verified
- [ ] Tests file → Pass for blog readiness
`;
}

function testMd(c) {
  const pf = mustPassFail[c.num];
  const passBullets = pf.pass.map((p) => `- ${p}`).join('\n');
  const failBullets = pf.fail.map((f) => `- ${f}`).join('\n');

  return `# Chapter ${c.num} Tests: ${c.title}

## Chapter file

\`\`\`text
docs/book/chapters/${c.slug}.md
\`\`\`

## Branch

\`\`\`text
${c.branch}
\`\`\`

## Writing tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Title exists | One clear H1 title | Missing or duplicate H1 | Pending |
| Reader outcome exists | Reader knows what they will learn | No outcome section | Pending |
| Problem is explained | Problem is concrete | Problem is vague | Pending |
| Why it matters | Connects to product/user value | Technical notes only | Pending |
| Recap exists | Chapter ends with summary | No recap | Pending |

## Technical tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Paths are accurate | Referenced paths exist or are planned | Broken paths | Pending |
| Branch exists | GitHub branch matches branch-map.md | Missing branch | Pending |
| Commands work | Copy/paste friendly | Incomplete commands | Pending |
| Examples are realistic | Match Kanjava vision | Generic or misleading | Pending |

## Blog tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Blog intro | First sections work on the web | Starts too abruptly | Pending |
| Branch link | Matching GitHub branch linked | No branch link | Pending |
| CTA | Next chapter / eBook / signup | No next action | Pending |
| Previous/next | Navigation present | Dead-end article | Pending |

## eBook tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Exports cleanly | PDF layout acceptable | Broken layout | Pending |
| Book voice | Reads as part of a book | Overuses "blog post" | Pending |
| Bonus refs | Templates/checklists when relevant | Paid value unclear | Pending |

## Must pass

${passBullets}

## Must fail if

${failBullets}

## Final result

**Status:** Pending

**Reviewer notes:**

\`\`\`text

\`\`\`

## Ready to publish?

- [ ] Gates 1–4 in [quality-gates.md](../quality-gates.md) satisfied
- [ ] Status updated in [README.md](../README.md) chapter table

## Ready for PDF?

- [ ] Gate 5 satisfied
- [ ] [ebook-export-checklist.md](../templates/ebook-export-checklist.md) checked
`;
}

for (const c of chapters) {
  const chapterPath = path.join(root, 'chapters', `${c.slug}.md`);
  const testPath = path.join(root, 'tests', `chapter-${c.num}-tests.md`);

  if (force || !fs.existsSync(chapterPath)) {
    fs.writeFileSync(chapterPath, chapterMd(c));
  }
  if (force || !fs.existsSync(testPath)) {
    fs.writeFileSync(testPath, testMd(c));
  }
}

console.log('Book chapter/test scaffold complete.');
