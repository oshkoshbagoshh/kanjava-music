# Phase 2 Catalog Expansion

Overview of Phase 2 features: WMDM-style catalog expansion for Kanjava Music.

## Goals

Expand the marketplace from samples, loops, and MIDI to a full production-asset catalog with structured metadata, homepage discovery, and bundle listings — while deferring payment checkout to a later phase.

## New resource types

Phase 1 supported: sample, loop, MIDI, preset, one-shot.

Phase 2 adds:

| Type | Description |
|------|-------------|
| `daw_template` | Production-ready DAW project files (zip) |
| `stem` | Individual track layers for remixing |
| `sample_pack` | Curated collections of samples/loops (zip) |
| `vocal_pack` | Vocal loops, chops, and ad-libs |

All types share the same upload, preview, search, and download pipeline.

## Genre taxonomy

- **20 seeded genres** — House, Deep House, Tech House, Techno, Trance, and more (see [API genre list](api.md#genre-slugs))
- **Structured assignment** — Resources link to genres via `resource_genres` join table
- **Required at upload** — At least one genre per resource
- **Search integration** — Genre names are weighted in full-text search (`search_vector` triggers)
- **Discovery UI** — Homepage genre chips filter browse results

Style tags remain separate freeform metadata for finer-grained filtering.

## DAW metadata

- **DAW enum** on every resource (`daw_type` in PostgreSQL)
- Default: `not_applicable` for non-template uploads
- **Required for DAW templates** — Ableton Live, Logic Pro, FL Studio, Cubase, Studio One, Bitwig, Multi-DAW
- **Display** — Template cards show "{DAW} Template"; other types show a DAW badge when applicable
- **Search filter** — `daw` query param on `GET /api/resources`

## Dual pricing

Resources store two optional price fields:

| Field | Purpose |
|-------|---------|
| `regularPriceCents` | Standard license price |
| `exclusivePriceCents` | Exclusive rights price |

Prices display on resource cards and bundle listings. **Checkout is not implemented** — download of priced resources returns `402 Paid downloads are not available yet.`

Legacy `price_cents` was migrated to `regular_price_cents` in migration `0003`.

## Homepage discovery

New sections on the browse page (`src/client/browse/discovery.ts`):

### Browse by Genre

Horizontal chips for genres with at least one approved resource. Clicking a chip applies a genre filter and scrolls to results.

### Production Assets

Format category cards mapped to resource type groups:

| Format ID | Title | Types |
|-----------|-------|-------|
| `templates` | DAW Templates | `daw_template` |
| `stems` | Audio Stems | `stem` |
| `midi` | MIDI Files | `midi` |
| `packs` | Sample Packs | `sample_pack`, `sample`, `loop`, `one_shot` |
| `vocals` | Vocal Packs | `vocal_pack` |
| `presets` | Synth Presets | `preset` |

### Bundles

Horizontal strip of active bundles with title, description, item count, and pricing (including compare-at / savings display).

Discovery is hidden on `/artist/:username` profile pages.

## Bundles

Database tables: `bundles`, `bundle_items`.

| Field | Description |
|-------|-------------|
| `slug` | URL-safe identifier |
| `title`, `description` | Display copy |
| `regularPriceCents` | Bundle price |
| `compareAtPriceCents` | Optional strikethrough price |
| `status` | `draft`, `active`, or `archived` |
| `coverImageUrl` | Optional cover art |

API:

- `GET /api/bundles` — list active bundles
- `GET /api/bundles/:slug` — bundle detail with nested resources

Seed sample bundles: `npm run db:seed` (requires approved resources).

## Zip uploads

- **Max size:** 500 MB (`MAX_UPLOAD_BYTES`)
- **Required for:** DAW templates, sample packs
- **Companion preview audio:** Required for zip uploads of template/pack types
- Worker uses preview audio to generate MP3 and waveform when the main file is not directly playable

## Unified account

UI copy updated from "Producer account" to **Account** — one login for browsing, buying (future), and selling. Upload section appears when signed in.

## New APIs

| Endpoint | Purpose |
|----------|---------|
| `GET /api/genres` | Genre taxonomy with resource counts |
| `GET /api/catalog/formats` | Homepage format categories |
| `GET /api/bundles` | Active bundle listings |
| `GET /api/bundles/:slug` | Bundle detail |

Search endpoint extended with `genre`, `genres`, `daw`, and `format` query params.

## Database migration

All Phase 2 schema changes are in `src/db/migrations/0003_catalog_expansion.sql`:

- New `resource_type` enum values
- `daw_type` enum and `resources.daw` column
- `regular_price_cents`, `exclusive_price_cents` columns
- `genres` and `resource_genres` tables (with seed data)
- `bundles` and `bundle_items` tables
- Updated FTS triggers to include genre names

## In scope vs deferred

### In Phase 2

- New resource types and metadata
- Genre taxonomy and DAW fields
- Dual pricing display
- Homepage discovery UI
- Bundle listings (display only)
- Zip uploads with preview audio
- Extended search filters

### Not in Phase 2

- Stripe checkout
- Shopping cart
- Play queue
- Admin moderation UI
- Producer earnings dashboard

### Phase 3+ (deferred)

- Badges and reputation
- Audio fingerprinting / duplicate detection
- Embeddable players
- Recommendations engine
- Courses, ebooks, plugins

## Related docs

- [API Reference](api.md)
- [Producer Upload Guide](producer-upload-guide.md)
- [Developer Guide](developer-guide.md)
- [Project README — Phase scope](../README.md#phase-2-scope-catalog-expansion)
