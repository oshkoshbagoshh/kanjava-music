# Publishing plan — phased buildout

This plan turns `docs/book/` into a blog series, chapter-per-branch codebase snapshots, and a paid eBook/PDF. Each phase has deliverables and pass/fail gates.

## Phase A — Book infrastructure

**Goal:** Repeatable writing system before filling every chapter.

### Deliverables

```text
docs/book/README.md
docs/book/outline.md
docs/book/publishing-plan.md
docs/book/branch-map.md
docs/book/pricing.md
docs/book/quality-gates.md
docs/book/changelog.md
docs/book/templates/chapter-template.md
docs/book/templates/chapter-test-template.md
docs/book/templates/blog-post-template.md
docs/book/templates/release-checklist.md
```

### Pass/fail tests

| Test | Pass | Fail |
|------|------|------|
| Book index exists | `README.md` explains the project and links outline, branches, pricing, chapters | Missing index or unclear purpose |
| Outline exists | `outline.md` lists all chapters in order | Chapters missing or unordered |
| Branch map exists | Every chapter maps to a GitHub branch name | Any chapter without a branch |
| Pricing exists | `$50` regular and `$25` first 100 downloads stated consistently | Offer missing or inconsistent |
| Quality gates exist | `quality-gates.md` defines completion standards | No objective done criteria |
| Templates exist | Chapter and test templates ready to copy | Writing starts without structure |

**Phase A status:** Complete when all deliverables exist and the pass column is true for every row.

---

## Phase B — Chapter scaffold

**Goal:** Every chapter file exists with required headings and placeholders.

### Deliverables

```text
docs/book/chapters/00-preface.md
docs/book/chapters/01-phase-0-local-first-usb-library.md
… through …
docs/book/chapters/12-roadmap-producer-card-platform.md
```

### Pass/fail tests

| Test | Pass | Fail |
|------|------|------|
| Every chapter file exists | Chapters 00–12 present | Any file missing |
| Required headings | Title, goal/outcome, branch, walkthrough, tests link, next chapter | Inconsistent format |
| Numbered filenames | Files sort in reading order | Random names |
| No empty shells | Each file has title, summary, and TODO checklist | Blank placeholders only |
| Branch placeholder | Every chapter names its branch | Blog readers cannot find code |

**Phase B status:** Complete when structure is filled; prose may still be draft.

---

## Phase C — Test scaffold

**Goal:** Measurable completion criteria per chapter.

### Deliverables

```text
docs/book/tests/chapter-00-tests.md … chapter-12-tests.md
docs/book/templates/chapter-test-template.md
```

### Pass/fail tests

| Test | Pass | Fail |
|------|------|------|
| Every chapter has a test file | `chapter-NN-tests.md` for each chapter | Missing test file |
| Pass/fail scenarios | Acceptance and rejection cases documented | Vague TODOs only |
| Writing + code + branch | Tests cover prose, branch, and implementation | Prose-only checks |
| Blog readiness gate | “Ready to publish?” section per chapter | Internally done but not publishable |
| eBook readiness gate | “Ready for PDF?” section per chapter | Blog and book quality not separated |

**Phase C status:** Complete when all test files exist with tables populated (status may stay Pending until you write).

---

## Phase D — Phase 0 content (local USB library)

**Goal:** First real narrative + optional code on branches 01–05.

### Chapters

- 01 — Phase 0 local-first USB library
- 02 — USB scaffold and producer card
- 03 — SQLite local catalog
- 04 — Imports, hashing, deduplication
- 05 — Crates, search, metadata

### Pass/fail tests

| Test | Pass | Fail |
|------|------|------|
| Local-first goal is clear | Reader knows the app works offline | Reader thinks cloud is required |
| USB use case is clear | External drive workflow explained | USB only implied |
| Folder scaffold is shown | Top-level USB structure documented | No concrete tree |
| Producer card explained | Links identity, contact, future profile | Card feels unrelated |
| SQLite role explained | Portable metadata on the drive | Database choice vague |
| No marketplace dependency | Phase 0 avoids auth, Postgres, Redis, S3 | Mixed with Phase 1 stack |

**Phase D status:** Complete when chapters 01–05 pass their individual test files and matching branches exist (as you implement).

---

## Phase E — Marketplace content

**Goal:** Bridge local library to the existing marketplace codebase narrative.

### Chapters

- 07 — Local library to marketplace
- 08 — Producer accounts and auth
- 09 — Uploads, licensing, storage
- 10 — Catalog, discovery, bundles

### Pass/fail tests

| Test | Pass | Fail |
|------|------|------|
| Local-to-cloud bridge | USB metadata → listings explained | Abrupt transition |
| Producer account purpose | Identity, uploads, licensing linked | Generic login only |
| Upload lifecycle | pending → processing → preview → listing | Lifecycle missing |
| Royalty-free language | Producer retains copyright; buyer gets usage license | “Copyright-free” misuse |
| Catalog expansion | Genres, formats, bundles, DAW types | Incomplete catalog story |

**Phase E status:** Complete when chapters 07–10 pass tests and branches align with repo features.

---

## Phase F — eBook packaging

**Goal:** Paid product with bonuses beyond the blog.

### Deliverables

```text
docs/book/ebook/frontmatter.md
docs/book/ebook/introduction.md
docs/book/ebook/bonus-material.md
docs/book/ebook/sales-page-copy.md
docs/book/ebook/first-100-downloads-offer.md
docs/book/templates/ebook-export-checklist.md
```

### Pass/fail tests

| Test | Pass | Fail |
|------|------|------|
| Paid value is clear | Bonuses beyond free posts | PDF is blog paste only |
| Pricing consistent | $50 / $25 first 100 everywhere | Conflicting prices |
| Sales page exists | Product, audience, contents, CTA | No conversion copy |
| Bonus material listed | Templates, checklists, diagrams | No reason to buy |
| Export path documented | Markdown → PDF workflow described | Ad hoc export |

**Phase F status:** Complete when manuscript gates pass [quality-gates.md](quality-gates.md) Gate 5 for all chapters.

---

## Suggested writing order

1. **First three blog posts:** 00, 01, 02 (vision + USB identity)
2. **Local implementation narrative:** 03, 04, 05
3. **Marketplace bridge:** 07, 09, 10
4. **Platform support:** 06, 08, 11, 12

## Per-chapter Git workflow

```bash
git checkout -b book/chapter-03-sqlite-local-catalog
# Write docs/book/chapters/03-sqlite-local-catalog.md + code for the chapter
git add .
git commit -m "Book chapter 03: SQLite local catalog"
git push -u origin book/chapter-03-sqlite-local-catalog
git tag book-chapter-03
git push origin book-chapter-03
```

Blog post footer:

```markdown
GitHub branch: https://github.com/YOUR_ORG/kanjava-music/tree/book/chapter-03-sqlite-local-catalog
Stable snapshot: https://github.com/YOUR_ORG/kanjava-music/releases/tag/book-chapter-03
```

Replace `YOUR_ORG` with your GitHub org or username when publishing.
