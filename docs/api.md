# API Reference

Base URL: `http://localhost:3000` (development)

All JSON error responses follow:

```json
{ "error": "<message>" }
```

## Authentication

Protected endpoints accept JWT via either:

- `Authorization: Bearer <token>` header, or
- httpOnly `token` cookie (set on register/login)

| Middleware | Behavior |
|------------|----------|
| `requireAuth` | Returns `401` if token is missing or invalid |
| `optionalAuth` | Attaches `producerId` when valid; silently ignores invalid tokens |

Register and login set a `token` cookie (7-day max age, `sameSite: lax`, `secure` in production).

---

## Health

### `GET /api/health`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ ok: true, env: "development" \| "production" \| "test" }` |

---

## Auth — `/api/auth`

### `POST /api/auth/register`

| | |
|---|---|
| **Auth** | None (sets `token` cookie on success) |
| **Content-Type** | `application/json` |

**Body:**

| Field | Type | Constraints |
|-------|------|-------------|
| `username` | string | 3–32 chars; service enforces `^[a-z0-9_]{3,32}$` |
| `displayName` | string | 1–128 chars |
| `email` | string | Valid email |
| `password` | string | Min 8 chars |

**Response (201):**

```json
{
  "producer": {
    "id": "uuid",
    "username": "string",
    "displayName": "string",
    "bio": null,
    "avatarUrl": null,
    "createdAt": "ISO8601"
  },
  "token": "jwt-string"
}
```

**Errors:** `400` validation, `409` username/email taken, `500` registration failed

### `POST /api/auth/login`

| | |
|---|---|
| **Auth** | None (sets `token` cookie) |
| **Content-Type** | `application/json` |

**Body:** `{ email, password }` (password min 1 char)

**Response (200):** Same shape as register.

**Errors:** `400` validation, `401` invalid credentials, `500` login failed

### `POST /api/auth/logout`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ ok: true }` (clears `token` cookie) |

### `GET /api/auth/me`

| | |
|---|---|
| **Auth** | Required |
| **Response (200)** | `{ producer: PublicProducer }` |
| **Errors** | `401` missing/invalid token or producer not found |

---

## Genres — `/api/genres`

### `GET /api/genres/`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ genres: Genre[] }` |

Each `Genre`:

```json
{
  "slug": "house",
  "name": "House",
  "sortOrder": 10,
  "resourceCount": 42
}
```

Only approved resources are counted. **Errors:** `500` failed to load genres.

---

## Catalog — `/api/catalog`

### `GET /api/catalog/formats`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ formats: CatalogFormat[] }` |

Each `CatalogFormat`:

```json
{
  "id": "templates",
  "title": "DAW Templates",
  "description": "Production-ready project files...",
  "types": ["daw_template"]
}
```

---

## Bundles — `/api/bundles`

### `GET /api/bundles/`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ bundles: BundleSummary[] }` |

Each `BundleSummary`:

```json
{
  "id": "uuid",
  "slug": "starter-pack",
  "title": "Starter Pack",
  "description": "string | null",
  "regularPriceCents": 1999,
  "compareAtPriceCents": 2999,
  "coverImageUrl": "string | null",
  "itemCount": 5
}
```

Only `active` bundles are returned. **Errors:** `500` failed to load bundles.

### `GET /api/bundles/:slug`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ bundle: BundleDetail }` |

`BundleDetail` includes all summary fields plus:

```json
{
  "items": [
    {
      "sortOrder": 0,
      "resource": { "...": "full resource fields" }
    }
  ]
}
```

**Errors:** `404` bundle not found, `500` failed to load bundle.

---

## Resources — `/api/resources`

### `GET /api/resources/`

Search and browse approved resources.

| | |
|---|---|
| **Auth** | None |
| **Query params** | See [Search query parameters](#search-query-parameters) |
| **Response (200)** | `{ results: SearchResult[], count: number }` |

Each `SearchResult`:

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string | null",
  "type": "sample",
  "daw": "not_applicable",
  "previewUrl": "/media/previews/...",
  "waveformJsonUrl": "/media/waveforms/...",
  "durationMs": 3200,
  "bpm": 128,
  "musicalKey": "8A",
  "licenseType": "royalty_free_standard",
  "priceCents": null,
  "regularPriceCents": 499,
  "exclusivePriceCents": 1999,
  "downloadCount": 10,
  "playCount": 50,
  "createdAt": "ISO8601",
  "producer": { "id": "uuid", "username": "string", "displayName": "string" },
  "tags": ["acid", "analog"],
  "genres": ["techno", "melodic_techno"],
  "rank": 0.95
}
```

**Errors:** `500` search failed

### `GET /api/resources/:id`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ resource: PublicResource }` (same fields as search result, minus `rank`) |
| **Errors** | `404` not found, `500` failed to load |

### `GET /api/resources/:id/preview`

| | |
|---|---|
| **Auth** | None |
| **Response** | Binary audio stream (`Content-Type: audio/mpeg`, `Cache-Control: public, max-age=3600`) |
| **Errors** | `404` preview not available, `500` preview failed |

### `POST /api/resources/:id/play`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ ok: true }` (increments play count) |
| **Errors** | `500` failed to record play |

### `POST /api/resources/:id/download`

| | |
|---|---|
| **Auth** | Optional (records `downloaderId` when authenticated) |
| **Response** | Binary stream with headers: |
| | `Content-Type: application/octet-stream` |
| | `Content-Disposition: attachment; filename="..."` |
| | `X-License-Snapshot-Id: <downloadId>` |
| **Errors** | `402` paid downloads not available yet, `404` not found, `500` download failed |

### `POST /api/resources/`

Upload a new resource.

| | |
|---|---|
| **Auth** | Required |
| **Content-Type** | `multipart/form-data` |
| **Max file size** | `MAX_UPLOAD_BYTES` env (default 500 MB) |

**Files:**

| Field | Required | Max count |
|-------|----------|-----------|
| `file` | Yes | 1 |
| `previewFile` | Conditional | 1 |

**Form fields:**

| Field | Required | Constraints |
|-------|----------|-------------|
| `title` | Yes | string, 1–255 |
| `description` | No | string, max 5000 |
| `type` | Yes | See [Resource types](#resource-types) |
| `licenseType` | No | See [License types](#license-types); default `royalty_free_standard` |
| `daw` | No | See [DAW types](#daw-types); required for `daw_template` |
| `bpm` | No | int 1–400 |
| `musicalKey` | No | string, max 8 (e.g. `8A`) |
| `tags` | No | Comma-separated string |
| `genres` | Yes | Comma-separated genre slugs; min 1 |
| `regularPriceCents` | No | int ≥ 0 |
| `exclusivePriceCents` | No | int ≥ 0 |
| `agreementAccepted` | Yes | `true`, `1`, or boolean `true` |

**Response (202):**

```json
{
  "resource": {
    "id": "uuid",
    "status": "pending",
    "title": "string",
    "type": "sample",
    "daw": "not_applicable",
    "licenseType": "royalty_free_standard",
    "genres": ["house"]
  }
}
```

**Errors:**

| Code | Cause |
|------|-------|
| `400` | Zod validation, missing file, upload validation errors |
| `409` | Duplicate content hash |
| `500` | Upload failed |

See [Producer Upload Guide](producer-upload-guide.md) for per-type file rules.

---

## Producers — `/api/producers`

### `GET /api/producers/:username`

| | |
|---|---|
| **Auth** | None |
| **Response (200)** | `{ producer: PublicProducer, resources: ResourceSummary[] }` |
| **Resources** | Up to 50 approved resources for the producer |
| **Errors** | `404` producer not found, `500` failed to load profile |

---

## Media — `/media/*`

### `GET /media/<storage-key>`

Serve stored preview and waveform files.

| | |
|---|---|
| **Auth** | None |
| **Path** | Storage key (e.g. `previews/abc.mp3`, `waveforms/abc.json`) |
| **Response** | Binary stream; `.mp3` → `audio/mpeg`, `.json` → `application/json` |
| **Cache** | `public, max-age=3600` |
| **Errors** | `400` invalid path, `403` originals blocked, `404` not found, `500` serve failed |

Original files (`originals/*`) are blocked. Use the download endpoint instead.

---

## Search query parameters

Used by `GET /api/resources/`. Parsed by `parseSearchQuery()` in `src/services/catalog-filters.ts`.

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Full-text search (title, tags, genres, description) |
| `type` | string | Exact resource type filter (ignored when `format` is set) |
| `format` | string | Catalog format ID; expands to multiple types |
| `genre` | string | Comma-separated genre slugs (AND logic) |
| `genres` | string | Alias for `genre` |
| `daw` | string | DAW type filter |
| `tags` | string | Comma-separated style tags (AND logic) |
| `key` | string | Exact Camelot key match |
| `bpm_min` | string | Minimum BPM (int) |
| `bpm_max` | string | Maximum BPM (int) |
| `license_type` | string | License type filter |
| `limit` | number | Results limit (default 50, max 100) |
| `offset` | number | Pagination offset (default 0) |

Invalid `type`, `daw`, `license_type`, or `format` values are silently ignored. Only `approved` resources are returned.

When `q` is provided, FTS runs first; if fewer than 5 results, trigram matches on title, tags, and genre names are merged.

---

## Taxonomies

### Resource types

| Value | Label |
|-------|-------|
| `sample` | Sample |
| `loop` | Loop |
| `midi` | MIDI |
| `preset` | Preset |
| `one_shot` | One-shot |
| `daw_template` | DAW Template |
| `stem` | Stem |
| `sample_pack` | Sample Pack |
| `vocal_pack` | Vocal Pack |

### DAW types

| Value | Label |
|-------|-------|
| `ableton_live` | Ableton Live |
| `logic_pro` | Logic Pro |
| `fl_studio` | FL Studio |
| `cubase` | Cubase |
| `studio_one` | Studio One |
| `bitwig` | Bitwig |
| `multi_daw` | Multi-DAW |
| `not_applicable` | Default for non-template uploads |

### License types

| Value | Summary |
|-------|---------|
| `royalty_free_standard` | Non-exclusive commercial use; producer retains copyright |
| `royalty_free_exclusive` | Sole commercial rights for buyer; producer retains copyright |
| `cc0` | Public-domain dedication |
| `cc_by` | Free use with mandatory attribution |

### Catalog format IDs

Used by `format` search param and `GET /api/catalog/formats`.

| ID | Resource types |
|----|----------------|
| `templates` | `daw_template` |
| `stems` | `stem` |
| `midi` | `midi` |
| `packs` | `sample_pack`, `sample`, `loop`, `one_shot` |
| `vocals` | `vocal_pack` |
| `presets` | `preset` |

### Genre slugs

Seeded in migration `0003_catalog_expansion.sql`. Uploads must use slugs that exist in this table.

| Slug | Name |
|------|------|
| `house` | House |
| `deep_house` | Deep House |
| `tech_house` | Tech House |
| `progressive_house` | Progressive House |
| `melodic_techno` | Melodic Techno |
| `techno` | Techno |
| `trance` | Trance |
| `progressive_trance` | Progressive Trance |
| `dub_techno` | Dub Techno |
| `afro_house` | Afro House |
| `organic_house` | Organic House |
| `electro_house` | Electro House |
| `big_room` | Big Room |
| `drum_and_bass` | Drum & Bass |
| `hip_hop` | Hip Hop |
| `pop` | Pop |
| `cinematic` | Cinematic |
| `ambient` | Ambient |
| `breaks` | Breaks |
| `garage` | Garage |
