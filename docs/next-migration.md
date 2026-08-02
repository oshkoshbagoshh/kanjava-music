# Next.js migration (Vercel)

Kanjava Music is moving from **Express + static SPA** to **Next.js App Router** on Vercel. Work is split across releases so production can deploy without Postgres, Redis, or ffmpeg on serverless functions.

## Release 1 (current) — Vercel stub

**Location:** [`apps/web`](../apps/web)

**Purpose:** Deploy a small Next.js app that does not crash on Vercel (`FUNCTION_INVOCATION_FAILED` from running Express as a serverless function).

**Includes:**

- Marketing-style home, browse, and upload **stub pages**
- Stub Route Handlers (no Drizzle/Postgres imports)
- Optional `/migration` page summarizing this document

**Vercel settings:**

| Setting | Value |
|---------|--------|
| Root Directory | `apps/web` |
| Framework | Next.js |
| Build | `next build` (default) |

**Environment variables:** None required for the stub.

**Stub API behavior:**

| Route | Method | Response |
|-------|--------|----------|
| `/api/health` | GET | `{ ok: true, mode: "stub", release: "1" }` |
| `/api/resources` | GET | `{ results: [], count: 0, stub: true }` |
| `/api/genres` | GET | `{ genres: [], count: 0, stub: true }` |
| `/api/catalog/formats` | GET | `{ formats: [], count: 0, stub: true }` |
| `/api/bundles` | GET | `{ bundles: [], count: 0, stub: true }` |
| `/api/auth/register`, `/login`, `/logout` | POST | `501` + stub message |
| `/api/resources` | POST | `501` + stub message |
| `/api/auth/me` | GET | `401` (not signed in) |

**Full marketplace (unchanged):** use Docker or local Node + Postgres + Redis — see [README](../README.md).

```bash
docker compose up --build
```

---

## Release 2 (deferred) — full Next stack

### Express → Next Route Handlers

| Express ([`src/routes/`](../src/routes/)) | Next (planned) |
|-------------------------------------------|----------------|
| `auth.routes.ts` | `app/api/auth/*/route.ts` (real JWT cookies) |
| `resources.routes.ts` | `app/api/resources/...` |
| `catalog.routes.ts` | `app/api/genres`, `app/api/catalog/formats` |
| `bundles.routes.ts` | `app/api/bundles` |
| `producers.routes.ts` | `app/api/producers/[username]` |
| `media.routes.ts` | Public Blob/CDN URLs or `app/media/[...path]` |

### Shared logic

Extract services from [`src/services/`](../src/services/) into something like `packages/marketplace-core` (or `lib/marketplace/`) shared by:

- Next Route Handlers
- Background worker (ffmpeg)

Keep Drizzle schema and migrations; point `DATABASE_URL` at **Neon** (or Vercel Postgres) in production.

### Uploads (required for Vercel)

Do **not** POST large files through Route Handlers.

1. Client uploads to **Vercel Blob** (or S3 presigned URL).
2. `POST /api/resources` accepts JSON metadata + blob pathname only.
3. Reuse validation from [`upload-validation.ts`](../src/services/upload-validation.ts).

### Media processing (required for previews)

Do **not** run ffmpeg inside default serverless functions.

Choose one:

- **Workflow SDK + Vercel Sandbox** (webhook resume when ffmpeg completes), or
- **External worker** (Railway/Fly) porting [`waveform.worker.ts`](../src/workers/waveform.worker.ts)

Replace or complement BullMQ enqueue from [`queue.ts`](../src/services/queue.ts).

### Vercel env (Release 2)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon / Postgres (SSL) |
| `JWT_SECRET` | Auth cookies |
| `BLOB_READ_WRITE_TOKEN` | Blob storage |
| `REDIS_URL` or Workflow | Jobs (if still using BullMQ) |
| Workflow / OIDC | Sandbox media jobs (if using Workflow) |
| `APP_URL` | Canonical site URL for CORS/cookies |

### UI

Port [`src/client/`](../src/client/) (player, browse grid, forms) to React client components under `apps/web`.

### Out of scope for Release 2 unless explicitly scheduled

- Phase 0 USB / SQLite local library CLI
- Deleting Express until parity is proven

---

## Local development commands

| Goal | Command |
|------|---------|
| Next stub only | `npm run dev:web` (from repo root) or `cd apps/web && npm run dev` |
| Full marketplace | `docker compose up` |
| Verify stub scaffold | `cd apps/web && npm run build` |

---

## Verification checklist (Release 1)

- [ ] `cd apps/web && npm run build` succeeds
- [ ] `GET /api/health` returns 200 without `.env`
- [ ] Vercel preview: `/`, `/browse` load without function crash
- [ ] Root `npm test` still passes (Express unchanged)
