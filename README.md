# Kanjava Music

Royalty-free sample / MIDI marketplace for ghost producers.

Producers retain copyright; buyers get a usage license with no ongoing royalty obligation.

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

## Documentation

| Doc | Description |
|-----|-------------|
| [docs/README.md](docs/README.md) | Documentation index |
| [docs/api.md](docs/api.md) | REST API reference |
| [docs/developer-guide.md](docs/developer-guide.md) | Architecture and local development |
| [docs/producer-upload-guide.md](docs/producer-upload-guide.md) | Uploading resources |
| [docs/phase2-catalog.md](docs/phase2-catalog.md) | Phase 2 catalog expansion |

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
