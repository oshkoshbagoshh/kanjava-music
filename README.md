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
| `npm test` | Unit tests (Vitest) |

## Phase 1 scope

- Upload / browse / preview (Web Audio player)
- Fuzzy + faceted search (`pg_trgm` + FTS)
- Producer auth (JWT cookie)
- Free royalty-free downloads with `license_snapshot_json`
- Upload agreement acceptance (`docs/producer-agreement-v1.md`)

**Not in Phase 1:** badges, paid tiers, fingerprinting, embeds, recommendations.

## Secrets policy

Do not commit:

- `.env` (use `.env.example`)
- SSH private keys
- Credential notes or passwords

## License

See [LICENSE](LICENSE) for the project license (GPLv2). Product listings use royalty-free licensing terms defined in the producer agreement — that is separate from this repository’s source license.
