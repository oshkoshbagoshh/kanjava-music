# Building Kanjava Music

A chapter-by-chapter build log for creating a local-first music library and royalty-free producer marketplace.

The free blog series follows Kanjava Music from an offline USB crate system into a producer marketplace. Each chapter has a matching GitHub branch so readers can inspect the project at that point in the build.

## What readers will learn

- How to design a local-first music library
- How to scaffold an offline USB drive for DJs and producers
- How a producer card becomes the foundation for a platform profile
- How to organize crates, metadata, files, and exports
- How to bridge local libraries into marketplace uploads
- How to build a royalty-free music asset catalog

## Book infrastructure

| Document | Description |
|----------|-------------|
| [outline.md](outline.md) | Full chapter outline by part |
| [publishing-plan.md](publishing-plan.md) | Phased build plan (A–F) with deliverables |
| [branch-map.md](branch-map.md) | Chapter → GitHub branch → stable tag |
| [pricing.md](pricing.md) | eBook pricing and launch offer |
| [quality-gates.md](quality-gates.md) | Definition of done for each chapter |
| [changelog.md](changelog.md) | Book project changelog |

## Free chapter series

| Chapter | Title | Branch | Status |
|--------:|-------|--------|--------|
| 00 | [Preface: Why Build This?](chapters/00-preface.md) | `book/chapter-00-preface` | Draft |
| 01 | [Phase 0: Local-First USB Library](chapters/01-phase-0-local-first-usb-library.md) | `book/chapter-01-phase-0-local-first-usb-library` | Draft |
| 02 | [USB Scaffold and Producer Card](chapters/02-usb-scaffold-producer-card.md) | `book/chapter-02-usb-scaffold-producer-card` | Draft |
| 03 | [SQLite Local Catalog](chapters/03-sqlite-local-catalog.md) | `book/chapter-03-sqlite-local-catalog` | Draft |
| 04 | [Imports, Hashing, and Deduplication](chapters/04-imports-hashing-deduplication.md) | `book/chapter-04-imports-hashing-deduplication` | Draft |
| 05 | [Crates, Search, and Metadata](chapters/05-crates-search-metadata.md) | `book/chapter-05-crates-search-metadata` | Draft |
| 06 | [Previews, Waveforms, and Cache](chapters/06-previews-waveforms-cache.md) | `book/chapter-06-previews-waveforms-cache` | Draft |
| 07 | [From Local Library to Marketplace](chapters/07-local-library-to-marketplace.md) | `book/chapter-07-local-library-to-marketplace` | Draft |
| 08 | [Producer Accounts and Auth](chapters/08-producer-accounts-auth.md) | `book/chapter-08-producer-accounts-auth` | Draft |
| 09 | [Uploads, Licensing, and Storage](chapters/09-uploads-licensing-storage.md) | `book/chapter-09-uploads-licensing-storage` | Draft |
| 10 | [Catalog, Discovery, and Bundles](chapters/10-catalog-discovery-bundles.md) | `book/chapter-10-catalog-discovery-bundles` | Draft |
| 11 | [Deployment and Operations](chapters/11-deployment-operations.md) | `book/chapter-11-deployment-operations` | Draft |
| 12 | [Roadmap: Producer Card to Platform](chapters/12-roadmap-producer-card-platform.md) | `book/chapter-12-roadmap-producer-card-platform` | Draft |

## Chapter completion tests

Each chapter has a pass/fail checklist in [tests/](tests/):

| Chapter | Test file |
|--------:|-----------|
| 00 | [chapter-00-tests.md](tests/chapter-00-tests.md) |
| 01 | [chapter-01-tests.md](tests/chapter-01-tests.md) |
| 02 | [chapter-02-tests.md](tests/chapter-02-tests.md) |
| 03 | [chapter-03-tests.md](tests/chapter-03-tests.md) |
| 04 | [chapter-04-tests.md](tests/chapter-04-tests.md) |
| 05 | [chapter-05-tests.md](tests/chapter-05-tests.md) |
| 06 | [chapter-06-tests.md](tests/chapter-06-tests.md) |
| 07 | [chapter-07-tests.md](tests/chapter-07-tests.md) |
| 08 | [chapter-08-tests.md](tests/chapter-08-tests.md) |
| 09 | [chapter-09-tests.md](tests/chapter-09-tests.md) |
| 10 | [chapter-10-tests.md](tests/chapter-10-tests.md) |
| 11 | [chapter-11-tests.md](tests/chapter-11-tests.md) |
| 12 | [chapter-12-tests.md](tests/chapter-12-tests.md) |

## Status labels

Use these in the table above as chapters progress:

```text
Planned → Drafting → Draft complete → Needs tests → Tests passing → Blog ready → Published → eBook ready
```

A chapter is **Published** only when: prose is written, the matching branch exists, tests pass, the blog post is live, and the post links to the branch.

A chapter is **eBook ready** when: it reads well in sequence, exports cleanly to PDF, and includes or references bonus material beyond the public blog draft.

## Paid eBook / PDF

The complete eBook/PDF includes the polished chapter series plus bonus templates, diagrams, checklists, and implementation notes. See [pricing.md](pricing.md) and [ebook/](ebook/).

Regular price: **$50**

Launch offer: **$25 for the first 100 downloads**

## Templates and samples

| Path | Purpose |
|------|---------|
| [templates/](templates/) | Chapter, blog, USB, and checklist templates |
| [samples/](samples/) | Starter USB identity files for copy/paste |
| [assets/](assets/) | Diagrams, screenshots, cover art (add as you publish) |

## Engineering docs (separate from the book)

Project API and architecture docs remain in the parent [docs/](../README.md) folder (`api.md`, `developer-guide.md`, etc.). The book narrates the build; those files reference running code.
