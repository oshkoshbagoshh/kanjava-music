## Learned User Preferences

- Use "royalty-free," never "copyright-free," in product copy and legal docs: the producer retains copyright; buyers get a usage license with no ongoing royalty obligation.
- Do not commit secrets or env files (`.env`, credentials); keep them out of git, especially default/main branches used for deploy.
- Prefer Docker Compose for local development; Hostinger production deploy is deferred and DNS may move to DigitalOcean later.
- When implementing an attached plan, do not edit the plan file; use existing todos and mark them in progress rather than recreating them.
- On the default branch, create a `cursor/`-prefixed feature branch, commit only related work, push, and open a draft PR rather than committing or pushing to main.
- Keep real auth/admin roles named normally (e.g. admin/superadmin); Pokemon/Giovanni names are badge lore only, not RBAC.

## Learned Workspace Facts

- kanjava-music is a royalty-free sample/MIDI marketplace for ghost producers (wemakedancemusic-style), with producer identity, previews, and shareable profiles as product pillars.
- Phase 1 stack is Node.js 20 + Express + TypeScript, PostgreSQL 16 + Drizzle ORM, Redis + BullMQ, and vanilla TS Web Audio for preview playback; the prior PHP/MySQL LAMP stack was fully replaced.
- Local run path is `docker compose up --build` with app on port 3000; storage is local in dev with an S3-compatible adapter for DigitalOcean Spaces later.
- Core Phase 1 domain includes producers, resources, resource_tags, downloads, and upload_agreements; search uses tsvector FTS with pg_trgm fallback and facet filters (BPM, key, type, license).
- Upload pipeline uses SHA-256 dedup, producer agreement acceptance, pending→approved flow, and a BullMQ worker (ffmpeg) for 128kbps previews and waveform peaks JSON.
- Preview playback must stay preview-only (never expose full-quality URLs until licensed download); use a single global AudioContext and precomputed waveform JSON.
- Planned later phases: Pokemon Gym Leader badge/XP (BadgeService, Game Boy monochrome palette #9BBC0F family), paid licensing, fingerprint/moderation, and recommendations/radio mode.
- PHP algorithm exercises under `exercises/` and notes under `notes/` are learning material, not the marketplace runtime.
