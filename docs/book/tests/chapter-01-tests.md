# Chapter 01 Tests: Phase 0: Local-First USB Library

## Chapter file

```text
docs/book/chapters/01-phase-0-local-first-usb-library.md
```

## Branch

```text
book/chapter-01-phase-0-local-first-usb-library
```

## Writing tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Title exists | One clear H1 title | Missing or duplicate H1 | Pending |
| Reader outcome exists | Reader knows what they will learn | No outcome section | Pending |
| Problem is explained | Problem is concrete | Problem is vague | Pending |
| Why it matters | Connects to product/user value | Technical notes only | Pending |
| Recap exists | Chapter ends with summary | No recap | Pending |

## Technical tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Paths are accurate | Referenced paths exist or are planned | Broken paths | Pending |
| Branch exists | GitHub branch matches branch-map.md | Missing branch | Pending |
| Commands work | Copy/paste friendly | Incomplete commands | Pending |
| Examples are realistic | Match Kanjava vision | Generic or misleading | Pending |

## Blog tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Blog intro | First sections work on the web | Starts too abruptly | Pending |
| Branch link | Matching GitHub branch linked | No branch link | Pending |
| CTA | Next chapter / eBook / signup | No next action | Pending |
| Previous/next | Navigation present | Dead-end article | Pending |

## eBook tests

| Test | Pass criteria | Fail criteria | Status |
|------|---------------|---------------|--------|
| Exports cleanly | PDF layout acceptable | Broken layout | Pending |
| Book voice | Reads as part of a book | Overuses "blog post" | Pending |
| Bonus refs | Templates/checklists when relevant | Paid value unclear | Pending |

## Must pass

- Defines Phase 0 as local/offline
- External USB drive use explained
- SQLite for portable metadata
- Local filesystem storage
- No Postgres, Redis, Docker, S3, auth, marketplace required
- Example library root shown

## Must fail if

- Reader thinks cloud is required
- Marketplace backend required to start
- SQLite without portability story
- No concrete USB workflow

## Final result

**Status:** Pending

**Reviewer notes:**

```text

```

## Ready to publish?

- [ ] Gates 1–4 in [quality-gates.md](../quality-gates.md) satisfied
- [ ] Status updated in [README.md](../README.md) chapter table

## Ready for PDF?

- [ ] Gate 5 satisfied
- [ ] [ebook-export-checklist.md](../templates/ebook-export-checklist.md) checked
