#!/usr/bin/env node
/**
 * Verifies docs/book scaffold (Phases A–C). Exit 0 if all checks pass.
 */
import fs from 'node:fs';
import path from 'node:path';

const bookRoot = path.join(process.cwd(), 'docs/book');

const requiredInfra = [
  'README.md',
  'outline.md',
  'publishing-plan.md',
  'branch-map.md',
  'pricing.md',
  'quality-gates.md',
  'changelog.md',
  'templates/chapter-template.md',
  'templates/chapter-test-template.md',
  'templates/blog-post-template.md',
  'templates/release-checklist.md',
  'templates/ebook-export-checklist.md',
];

const chapterSlugs = [
  '00-preface',
  '01-phase-0-local-first-usb-library',
  '02-usb-scaffold-producer-card',
  '03-sqlite-local-catalog',
  '04-imports-hashing-deduplication',
  '05-crates-search-metadata',
  '06-previews-waveforms-cache',
  '07-local-library-to-marketplace',
  '08-producer-accounts-auth',
  '09-uploads-licensing-storage',
  '10-catalog-discovery-bundles',
  '11-deployment-operations',
  '12-roadmap-producer-card-platform',
];

const failures = [];

function check(rel) {
  const full = path.join(bookRoot, rel);
  if (!fs.existsSync(full)) {
    failures.push(`Missing: docs/book/${rel}`);
  }
}

for (const rel of requiredInfra) {
  check(rel);
}

for (const slug of chapterSlugs) {
  check(`chapters/${slug}.md`);
  const num = slug.slice(0, 2);
  check(`tests/chapter-${num}-tests.md`);
}

for (const sample of [
  'README.txt',
  'CHANGELOG.txt',
  'CONTACT.txt',
  'PRODUCER-CARD.txt',
  'PRODUCER-CARD.vcf',
]) {
  check(`samples/${sample}`);
}

for (const rel of [
  'ebook/frontmatter.md',
  'ebook/introduction.md',
  'ebook/bonus-material.md',
  'ebook/sales-page-copy.md',
  'ebook/first-100-downloads-offer.md',
]) {
  check(rel);
}

if (failures.length > 0) {
  console.error('Book scaffold verification FAILED:\n');
  for (const f of failures) {
    console.error(`  - ${f}`);
  }
  process.exit(1);
}

console.log('Book scaffold verification PASSED (Phases A–C infrastructure).');
console.log(`  Chapters: ${chapterSlugs.length}`);
console.log(`  Test files: ${chapterSlugs.length}`);
console.log('Next: draft chapters and mark tests Pass in docs/book/tests/*.md');
