---
name: source
description: Create and enrich source notes for Crafta journal. Use when the user wants to save a reference, extract claims from a URL, or fix stub source notes. Triggers on /source or requests like "save this source", "enrich sources", "extract claims from this article".
user_invocable: true
---

# Source — Crafta Journal Source Management

You create and maintain source notes in `bank/Sources/References/`. Every source note must contain extracted claims — not placeholders.

## Modes

### Mode 1: Create (`/source <url>`)

Create a properly enriched source note from a URL.

1. Fetch the URL via WebFetch
2. Extract from the article:
   - **Title** and publication name
   - **Summary** — 2-3 sentences on what the article covers and why it matters
   - **Key Claims** — 5-10 specific, factual claims with dates, numbers, names, measurements
   - **Type** — article, product, encyclopedia, primary-source, blog
   - **Reliability** — high (established publication, primary source), medium (specialist blog, well-sourced), low (unsourced opinion, single mention)
3. Save to `bank/Sources/References/<Title> — <Publication>.md`
4. If the publication is new (not in `bank/Sources/Publications/`), create a publication note and suggest adding it to feeds.md
5. Report what was saved

**Key Claims guidelines:**
- Each claim must be a specific, extractable fact — not a summary
- Include dates, numbers, places, names whenever the article provides them
- If the article is thin (product page, short blog post), 3 claims is acceptable
- Never write "See source URL for details"

### Mode 2: Enrich (`/source enrich`)

Find and fix stub source notes.

1. Glob `bank/Sources/References/*.md`
2. Read each note's frontmatter and content
3. Identify stubs: notes where Key Claims contains "See source URL" or has fewer than 3 claims, or where Summary says "Reference source for Crafta Journal post"
4. Present a list of stubs with their URLs
5. For each stub (after user approval):
   - Fetch the URL via WebFetch
   - Extract claims and summary
   - Update the note in place
   - Set `status: complete` in frontmatter
6. Report: how many enriched, how many failed (dead URLs, paywalls)

### Mode 3: Check (`/source check`)

Audit source note quality without fixing.

1. Glob `bank/Sources/References/*.md`
2. Categorize each note:
   - **Complete** — has summary + 3+ key claims
   - **Stub** — placeholder content, needs enrichment
   - **Orphan** — not referenced by any research note or post (`used_in: []`)
3. Present summary: total, complete, stubs, orphans
4. Suggest: enrich stubs, link orphans to research notes

## What a Good Source Note Looks Like

```markdown
---
title: "Barbour — History, Philosophy, and Key Products"
type: article
url: https://www.heddels.com/2017/09/barbour-brand-profile/
publication: "[[Sources/Publications/Heddels]]"
date_accessed: 2026-04-13
reliability: high
status: complete
used_in: ["[[Research/Canvas]]"]
---

## Summary
Comprehensive brand profile covering Barbour's 1894 founding, paraffin wax innovation, motorcycle heritage, Dame Margaret's 1980 designs, and factory production details.

## Key Claims
- Founded 1894 by John Barbour in South Shields as oilcloth importer
- Perfected paraffin wax process — previous linseed oil cracked at low temperatures
- 1936: International motorcycle suit for Six Day Trials
- Steve McQueen wore the International
- 160 parts per Bedale jacket, 36 people to make one, ~3,000/week
- Three Royal Warrants: Duke of Edinburgh (1974), Queen Elizabeth II (1982), Prince of Wales (1987)
- 13,000 jackets re-waxed annually at South Shields factory
- Queen Elizabeth kept her Beaufort for 25 years, refusing replacements
```

## Usage Examples

```
/source https://www.heddels.com/2018/03/kaptain-sunshine-belted-safari-light-jacket/
/source enrich
/source check
Save this article as a source
```
