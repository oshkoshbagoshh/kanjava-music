# Producer Upload Guide

How to upload royalty-free production assets to Kanjava Music.

## Before you upload

1. **Create an account** — Register with username, display name, email, and password.
2. **Sign in** — The upload form appears after authentication.
3. **Accept the producer agreement** — You must check the agreement checkbox on every upload. See [Producer Agreement v1](producer-agreement-v1.md).

You warrant that you hold the rights to license the work you upload.

## Required fields

| Field | Requirement |
|-------|-------------|
| Title | 1–255 characters |
| Type | One of nine resource types (see matrix below) |
| Genres | At least one genre from the taxonomy |
| File | Main upload file (format depends on type) |
| Agreement | Checkbox must be checked |

## Optional fields

| Field | Notes |
|-------|-------|
| Description | Up to 5000 characters |
| License | Default: Royalty-Free Standard |
| Regular price (¢) | Display only in Phase 2; paid checkout not yet available |
| Exclusive price (¢) | Display only in Phase 2 |
| BPM | 1–400 |
| Camelot key | e.g. `8A` |
| Style tags | Comma-separated freeform tags (e.g. `acid, analog`) |

## Resource type matrix

| Type | Main file | DAW required? | Preview audio? |
|------|-----------|---------------|----------------|
| Sample | Audio or MIDI | No | No |
| Loop | Audio | No | No |
| MIDI | `.mid` / `.midi` | No | No |
| Preset | As accepted by form | No | No |
| One-shot | Audio | No | No |
| Stem | Audio | No | No |
| Vocal Pack | Audio or zip | No | No* |
| DAW Template | `.zip` | **Yes** | **Yes** |
| Sample Pack | `.zip` | No | **Yes** |

\* Vocal packs follow general audio rules unless uploaded as zip.

### Accepted file extensions (main file)

Audio: `.wav`, `.mp3`, `.aiff`, `.flac` and other `audio/*` MIME types.

MIDI: `.mid`, `.midi`

Archives: `.zip` (required for DAW templates and sample packs)

Maximum file size: **500 MB** (configurable via `MAX_UPLOAD_BYTES`).

## DAW field

The DAW selector appears **only** when type is **DAW Template**.

| DAW value | Label |
|-----------|-------|
| `ableton_live` | Ableton Live |
| `logic_pro` | Logic Pro |
| `fl_studio` | FL Studio |
| `cubase` | Cubase |
| `studio_one` | Studio One |
| `bitwig` | Bitwig |
| `multi_daw` | Multi-DAW |

You must select a DAW for template uploads. If you submit a template without a DAW, the form shows: *"Select a DAW for template uploads."*

For all other resource types, the DAW field is hidden and not sent to the server.

## Genres

Select at least one genre from the checkbox list. Genres are a structured taxonomy (House, Techno, Trance, etc.) — not the same as style tags.

Genre names are indexed for search. Use slugs that match the [genre list in the API reference](api.md#genre-slugs).

## Preview audio

Required when:

- Type is **DAW Template** or **Sample Pack**, or
- Main file is a `.zip`

Preview must be an audio file: `.mp3`, `.wav`, `.aiff`, `.flac`, `.m4a`, or `audio/*` MIME type.

The preview is what buyers hear in the browse player. The zip contains the full deliverable.

## Pricing fields

Regular and exclusive prices are stored and displayed on resource cards. **Paid downloads are not available yet** — attempting to download a priced resource returns `402 Paid downloads are not available yet.`

## What happens after upload

1. Form submits to `POST /api/resources` (multipart).
2. Server returns **202 Accepted** with `status: pending`.
3. A background worker:
   - Transcodes an MP3 preview (for audio files)
   - Generates waveform data for the player
   - Sets `status: approved`
4. The resource appears in browse/search after processing (usually within seconds).

Refresh the browse page if your upload does not appear immediately.

## Common errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid enum value` (DAW) | Empty `daw` sent for non-template type | Select a type other than template, or pick a DAW for templates |
| `At least one genre is required.` | No genres selected | Check at least one genre |
| `DAW is required for DAW template uploads.` | Template without DAW | Select a DAW |
| `daw_template uploads must be a .zip file.` | Wrong file format | Upload a zip archive |
| `sample_pack uploads must be a .zip file.` | Wrong file format | Upload a zip archive |
| `Preview audio is required for zip uploads...` | Missing preview for zip type | Attach preview audio |
| `Preview file must be an audio file.` | Invalid preview format | Use MP3, WAV, AIFF, or FLAC |
| `Unknown genre(s): ...` | Invalid genre slug | Use genres from the taxonomy |
| `This file has already been uploaded (duplicate content hash).` | Same file uploaded before | Upload different content |
| `You must accept the producer agreement.` | Checkbox unchecked | Accept the agreement |
| `Sign in to upload.` | Not authenticated | Register or log in |
| `Paid downloads are not available yet.` | Resource has a price set | Expected in Phase 2; downloads are free for unpriced resources |

## API upload (programmatic)

See [API Reference — POST /api/resources](api.md#post-apiresources) for the full multipart schema.

Minimum example fields:

```
title: My Kick Loop
type: loop
genres: techno,tech_house
agreementAccepted: true
file: <binary>
```

For DAW templates add:

```
type: daw_template
daw: ableton_live
file: <zip binary>
previewFile: <audio binary>
```

## Related docs

- [API Reference](api.md)
- [Producer Agreement v1](producer-agreement-v1.md)
- [Phase 2 Catalog](phase2-catalog.md)
