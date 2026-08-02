# Samples

Starter files for a Phase 0 USB library. Copy into your library root and edit.

Same content as [templates/](../templates/) USB files; kept here for eBook packaging and quick copy.

| File | Description |
|------|-------------|
| [README.txt](README.txt) | Offline explanation of the drive |
| [CHANGELOG.txt](CHANGELOG.txt) | Human-readable update log |
| [CONTACT.txt](CONTACT.txt) | Return / contact info |
| [PRODUCER-CARD.txt](PRODUCER-CARD.txt) | Plain-text producer identity |
| [PRODUCER-CARD.vcf](PRODUCER-CARD.vcf) | Virtual business card |

Example minimal `library.json`:

```json
{
  "schema_version": 1,
  "library_name": "My Kanjava Library",
  "created_at": "2026-08-02T00:00:00.000Z",
  "sqlite_file": "kanjava-library.sqlite"
}
```
