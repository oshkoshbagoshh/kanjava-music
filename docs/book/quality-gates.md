# Quality gates

A chapter is not **done** until it passes all five gates. Use the matching [tests/chapter-NN-tests.md](tests/) file to record Pass/Fail.

## Gate 1 — Writing quality

**Pass if:**

- Clear H1 title
- Concrete problem statement
- “Why this matters” for producers, DJs, or builders
- Practical walkthrough with steps
- Recap and link to next chapter

**Fail if:**

- Notes-only draft
- No reader outcome
- No structure or missing “why”

## Gate 2 — Technical completeness

**Pass if:**

- Files and commands on the matching branch exist as described
- Commands are copy/paste friendly
- Paths match the repo or documented Phase 0 layout
- Licensing/security notes when relevant

**Fail if:**

- Describes missing files
- Broken or incomplete commands
- Incorrect royalty-free language

## Gate 3 — Branch completeness

**Pass if:**

- Branch name matches [branch-map.md](branch-map.md)
- Branch contains chapter Markdown plus chapter-scoped code/docs
- Safe to link from a public blog post

**Fail if:**

- Missing branch or unrelated work on branch
- Name drift vs branch map

## Gate 4 — Blog readiness

**Pass if:**

- Opening works as a standalone web intro
- GitHub branch (and optional tag) links present
- CTA: next chapter, email signup, or eBook
- Previous/next navigation

**Fail if:**

- Depends on unexplained prior context
- No branch link or reader action

## Gate 5 — eBook readiness

**Pass if:**

- Reads well in sequence (minimal “this blog post” phrasing)
- Tables and code blocks export cleanly to PDF
- Bonus templates/diagrams referenced where useful

**Fail if:**

- Blog-only voice throughout
- Broken formatting in PDF export

## Aggregate chapter status

| Gate | Blog publish requires | eBook compile requires |
|------|----------------------|------------------------|
| 1–3 | Yes | Yes |
| 4 | Yes | — |
| 5 | — | Yes |

Use [templates/release-checklist.md](templates/release-checklist.md) and [templates/ebook-export-checklist.md](templates/ebook-export-checklist.md) before shipping.
