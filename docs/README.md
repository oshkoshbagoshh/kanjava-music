# Kanjava Music Documentation

Royalty-free production asset marketplace for ghost producers. Producers retain copyright; buyers receive a usage license with no ongoing royalty obligation.

## Documentation index

| Document | Description |
|----------|-------------|
| [API Reference](api.md) | REST endpoints, request/response shapes, taxonomies, search filters |
| [Developer Guide](developer-guide.md) | Architecture, local setup, migrations, workers, testing |
| [Producer Upload Guide](producer-upload-guide.md) | How to upload each resource type and avoid common errors |
| [Phase 2 Catalog](phase2-catalog.md) | Catalog expansion features, discovery UI, and scope boundaries |
| [Next.js / Vercel migration](next-migration.md) | Release 1 stub (`apps/web`) and Release 2 full port plan |
| [Building Kanjava Music (book)](book/README.md) | Blog/eBook chapter series, branch map, pass/fail chapter tests |

## Related documents

| Document | Description |
|----------|-------------|
| [Producer Agreement v1](producer-agreement-v1.md) | Legal terms accepted at upload |
| [Project README](../README.md) | Quick start, scripts, Phase 0/1/2 scope summary |

## Product phases

**Phase 0** — Fully local/offline crate mode using SQLite and local filesystem storage. Designed for DJs, producers, external USB drives, and portable libraries. Scaffolds a readable USB/library structure with `README.txt`, `CHANGELOG.txt`, `CONTACT.txt`, `PRODUCER-CARD.txt`, and `PRODUCER-CARD.vcf`. The local producer card becomes the foundation for the later platform producer profile. No Postgres, Redis, Docker, S3, auth, cloud jobs, or marketplace dependencies required. See [Developer Guide — Phase 0](developer-guide.md#phase-0--local-only-crate-mode) and [book chapters 01–05](book/README.md).

**Phase 1** — Upload, browse, preview, search, producer auth, free downloads with license snapshots.

**Phase 2** — WMDM-style catalog expansion: DAW templates, stems, sample packs, vocal packs, genre taxonomy, DAW metadata, dual pricing display, homepage discovery, bundles. See [Phase 2 Catalog](phase2-catalog.md) for details.

**Phase 3+ (deferred)** — Badges, fingerprinting, embeds, recommendations, courses/ebooks/plugins.
