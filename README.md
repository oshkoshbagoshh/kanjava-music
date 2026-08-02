# Kanjava Music

Royalty-free sample / MIDI marketplace for ghost producers.

Producers retain copyright; buyers get a usage license with no ongoing royalty obligation.

## Phase 0 scope — fully local crate mode

Phase 0 is a dependency-light, local-first mode for DJs, producers, and collectors who want to organize music assets on one machine or an external USB drive.

- SQLite metadata file inside the library folder (portable drives; implementation may use a small npm SQLite binding—no Postgres/Redis/Docker/S3)
- Local filesystem for originals, previews, waveforms, crates, and exports
- Human-readable top-level files: `README.txt`, `CHANGELOG.txt`, `CONTACT.txt`, `PRODUCER-CARD.txt`, `PRODUCER-CARD.vcf`
- Node.js core APIs where possible: `os`, `process`, `path`, `fs`, `crypto`
- DJ-style crate organization without marketplace auth or cloud jobs

Phase 0 stays separate from the Phase 1+ marketplace backend. See [docs/developer-guide.md](docs/developer-guide.md#phase-0--local-only-crate-mode) and the chapter series in [docs/book/README.md](docs/book/README.md).

## Stack

| Layer | Choice |
|-------|--------|
| API | Node.js 20 + Express + TypeScript |
| DB / ORM | PostgreSQL 16 + Drizzle |
| Search | `pg_trgm` + `tsvector` / `tsquery` |
| Jobs | BullMQ + Redis |
| Storage | Local filesystem (dev) or S3-compatible (prod) |
| Player | Vanilla TS + Web Audio API |

## Local development (Docker)

**Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Start the stack (API, worker, Postgres, Redis):

```bash
docker compose up --build
```

3. Open the marketplace:

| Service | URL |
|---------|-----|
| App | http://localhost:3000 |
| Health | http://localhost:3000/api/health |

Source is bind-mounted. The app container runs migrations, builds the client bundle, and starts the API. The worker processes preview encodes and waveform peaks.

Stop:

```bash
docker compose down
```

Reset database volume:

```bash
docker compose down -v
```

## Local development (without Docker)

Requirements: Node 20+, PostgreSQL 16 (with `pg_trgm`), Redis, ffmpeg.

```bash
cp .env.example .env
# Set DATABASE_URL and REDIS_URL for your local services

npm install
npm run db:migrate
npm run build:client
npm run dev          # API on :3000
npm run dev:worker   # waveform / preview worker (separate terminal)
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | API with hot reload |
| `npm run dev:worker` | BullMQ waveform worker |
| `npm run build:client` | Bundle browser player/browse UI |
| `npm run db:migrate` | Apply SQL migrations |
| `npm run db:seed` | Seed sample bundles (requires approved resources) |
| `npm test` | Unit tests (Vitest) |
| `npm run dev:web` | Next.js Vercel stub (`apps/web`, port 3001) |

## Vercel (Release 1 stub)

Production on Vercel uses the **Next.js stub** in [`apps/web`](apps/web), not the Express server.

| Setting | Value |
|---------|--------|
| **Root Directory** | `apps/web` (required — set in Vercel → Project → Settings → General) |
| **Framework** | Next.js |
| **Build Command** | `npm run build` (default inside `apps/web`) or root `npm run build:web` if Root Directory is repo root |
| **Env vars** | None required for stub |

If you see `FUNCTION_INVOCATION_FAILED`, the project is almost certainly building the **Express** app at repo root. Set **Root Directory** to `apps/web`, redeploy, and confirm `GET /api/health` returns `{"ok":true,"mode":"stub"}`.

Root [`vercel.json`](vercel.json) and `vercel-build` script support building from the monorepo when Root Directory is `.`.

The stub serves home/browse/upload placeholders and empty stub APIs. **Auth, search, uploads, and previews** still require the full stack via Docker locally. See [docs/next-migration.md](docs/next-migration.md) for Release 2 (Neon, Blob, Workflow/worker).

```bash
npm install
npm run dev:web
# http://localhost:3001 — stub health at /api/health
```

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/README.md](docs/README.md) | Documentation index |
| [docs/api.md](docs/api.md) | REST API reference |
| [docs/developer-guide.md](docs/developer-guide.md) | Architecture and local development |
| [docs/producer-upload-guide.md](docs/producer-upload-guide.md) | Uploading resources |
| [docs/phase2-catalog.md](docs/phase2-catalog.md) | Phase 2 catalog expansion |
| [docs/next-migration.md](docs/next-migration.md) | Next.js on Vercel (Release 1 stub → Release 2 plan) |
| [docs/book/README.md](docs/book/README.md) | Building Kanjava Music — blog/eBook chapters and completion tests |

## Phase 1 scope

- Upload / browse / preview (Web Audio player)
- Fuzzy + faceted search (`pg_trgm` + FTS)
- Producer auth (JWT cookie)
- Free royalty-free downloads with `license_snapshot_json`
- Upload agreement acceptance (`docs/producer-agreement-v1.md`)

## Phase 2 scope (catalog expansion)

- WMDM-style product types: DAW templates, stems, sample packs, vocal packs
- Structured genre taxonomy + DAW metadata on resources
- Dual pricing fields (regular + exclusive) on listings and cards
- Homepage discovery: browse by genre, production asset categories, bundles
- Zip uploads with companion preview audio for templates/packs
- Unified account copy (browse, buy, and sell on one login)
- APIs: `GET /api/genres`, `GET /api/catalog/formats`, `GET /api/bundles`

**Not in Phase 2:** Stripe checkout, cart, play queue, admin moderation UI, producer earnings dashboard.

**Deferred (Phase 3+):** badges, fingerprinting, embeds, recommendations, courses/ebooks/plugins.

## Secrets policy

Do not commit:

- `.env` (use `.env.example`)
- SSH private keys
- Credential notes or passwords

## License

See [LICENSE](LICENSE) for the project license (GPLv2). Product listings use royalty-free licensing terms defined in the producer agreement — that is separate from this repository’s source license.
