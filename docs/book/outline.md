# Book outline

## Working title

**Building Kanjava Music: From USB Crates to a Royalty-Free Producer Marketplace**

## Audience

- DJs and producers organizing large libraries
- Indie hackers and marketplace founders
- TypeScript / Node.js developers building music-tech products

## Part I — Local-first foundation

### Chapter 00 — Preface: Why build this?

Explain the problem, product vision, and why the project starts offline.

### Chapter 01 — Phase 0: Local-first USB library

Define local/offline mode, SQLite on a portable drive, and separation from the marketplace stack.

### Chapter 02 — USB scaffold and producer card

Human-readable USB layout, changelog, contact files, and producer card as future platform identity.

### Chapter 03 — SQLite local catalog

`kanjava-library.sqlite`, assets, crates, tags, producer profile, library events, relative paths.

### Chapter 04 — Imports, hashing, and deduplication

Scanning folders, SHA-256, duplicate detection, import logs, copy vs reference modes.

### Chapter 05 — Crates, search, and metadata

DJ-style crates, ordering, BPM/key/genre/tag filters, offline search, export.

## Part II — Preparing for the marketplace

### Chapter 06 — Previews, waveforms, and cache

Originals vs previews, waveform cache, regenerable data, offline playback expectations.

### Chapter 07 — From local library to marketplace

Metadata and producer card handoff, sync/upload boundary, Phase 0 vs Phase 1.

## Part III — Marketplace core

### Chapter 08 — Producer accounts and auth

Accounts tied to producer identity, JWT sessions, ownership of uploads.

### Chapter 09 — Uploads, licensing, and storage

Upload lifecycle, royalty-free licensing, license snapshots, storage drivers.

### Chapter 10 — Catalog, discovery, and bundles

Product types, genres, DAW metadata, discovery UI, bundles, dual pricing display.

## Part IV — Productizing

### Chapter 11 — Deployment and operations

Docker dev stack, production concerns, env vars, backups, Phase 0 vs marketplace ops.

### Chapter 12 — Roadmap: Producer card to platform

Profiles, QR/business card pages, sync, badges, fingerprinting, deferred features.

## Bonus material (paid eBook)

See [ebook/bonus-material.md](ebook/bonus-material.md).
