# Chapter 03 Tests: SQLite Local Catalog

## Chapter file

```text
docs/book/chapters/03-sqlite-local-catalog.md
```

## Branch

```text
book/chapter-03-sqlite-local-catalog
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

- kanjava-library.sqlite role explained
- Tables: assets, crates, crate_assets, tags, producer_profile, library_events
- Relative paths
- DB lives inside library root
- Example records

## Must fail if

- Server-dependent design
- Absolute-only paths
- Producer profile disconnected from card
- No library events/changelog table

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
