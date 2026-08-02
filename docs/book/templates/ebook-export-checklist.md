# eBook export checklist

Run before compiling the paid PDF.

## Manuscript

- [ ] Chapters 00–12 complete per [quality-gates.md](../quality-gates.md) Gate 5
- [ ] Chapter numbers and headings consistent
- [ ] Blog-only phrasing edited for book voice
- [ ] [ebook/frontmatter.md](../ebook/frontmatter.md) and [ebook/introduction.md](../ebook/introduction.md) included
- [ ] [ebook/bonus-material.md](../ebook/bonus-material.md) appended or linked

## Formatting

- [ ] Markdown preview renders cleanly (WebStorm / VS Code / Pandoc)
- [ ] Tables fit reasonably in PDF
- [ ] Code blocks readable (language labels)
- [ ] Images have captions under `docs/book/assets/`
- [ ] Cover art in `docs/book/assets/cover/`
- [ ] Sales/pricing pages not accidentally merged into manuscript body

## Product

- [ ] Regular price **$50** on sales copy
- [ ] First **100** downloads at **$25**
- [ ] Bonus templates packaged (USB samples + checklists)
- [ ] PDF filename versioned (e.g. `building-kanjava-music-v1.0.pdf`)
- [ ] eBook [changelog](../changelog.md) updated

## Export status

**Result:** Pass / Fail

**Notes:**

```text

```

## Suggested export flow

1. Merge chapters in order into a single Markdown file or use Pandoc glob.
2. Export from preview or: `pandoc manuscript.md -o building-kanjava-music.pdf`
3. Spot-check code blocks and tables on pages with long listings.
