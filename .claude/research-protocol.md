# Crafta Research Protocol

Shared research methodology for all Crafta skills. Skills reference this document instead of duplicating research instructions.

## Research Tools

Three tiers of depth — use the appropriate one for the task:

1. **RSS feeds** (via WebFetch) — latest 10-15 articles. "What's new right now."
2. **Web search** (via WebSearch `site:<domain>`) — Google-indexed articles. "What's been written about X."
3. **Sitemaps** (via WebFetch on sitemap XMLs) — complete article directory. "Everything they've ever published about X."

Read `.claude/feeds.md` for feed URLs, domains, and sitemap URLs.

### How to use sitemaps
1. Fetch sitemap index XML → find post sitemap URLs
2. Fetch individual post sitemaps → extract `<loc>` URLs
3. Extract topics from URL slugs
4. Count, compare, analyze

## Source Tiers

Not all sources carry equal weight. The tier determines how much trust a claim from that source can bear on its own.

| Tier | What it is | Examples | Trust level |
|---|---|---|---|
| **T1 — Primary** | The maker, the archive, the first-person account | Westley Richards blog (they made the jacket), V&A collection records, patent filings, maker interviews | Can anchor a claim alone |
| **T2 — Specialist** | Deep-knowledge publication with editorial standards | Permanent Style, Heddels, The Rake, Clutch/Lightning Magazine | Reliable, but verify origin claims against T1 |
| **T3 — General** | Fashion/lifestyle media | GQ, Gentleman's Gazette, FashionBeans | Fine for cultural context, not for technical or historical claims |
| **T4 — Aggregated** | Community knowledge, encyclopedias | Wikipedia, Styleforum, Reddit | Useful for leads, never cite as sole source for a claim |

**Research order matters.** When researching a subject, check T1 sources (maker websites, museum databases, trade publications) *before* T2/T3 publications. The maker knows more about their product than the writer about the maker.

## Research Depth

- **Start with primary sources** — check maker/brand websites and archives first, then specialist publications, then general media.
- **Use ALL sources in feeds.md** — don't stop at 2-3 feeds. Check every domain.
- **Go beyond feeds.md** — run general WebSearch queries (without `site:`) to discover articles from publications we don't track yet.
- **When a new source is found** — create a note in `bank/Sources/References/` and if the publication is new, create a note in `bank/Sources/Publications/` and suggest adding it to feeds.md.
- **Growing the source library is a goal** — every research session should add at least 1-2 new source notes to the vault.

## Research Cache

Before starting research on a topic, check `bank/Research/Cache/` for existing findings. If a cache note exists for the topic or a related topic, read it first — it lists articles already discovered and which have been read.

After scanning feeds and searches, save the raw findings to `bank/Research/Cache/YYYY-MM-DD <topic>.md`:
- Group articles by source domain
- Each entry: linked title, URL, one-line summary of the angle
- Mark which articles were read in full (`✓`) vs just found (`✗`)
- Log which feeds were checked and which searches were run in the frontmatter

If a cache note already exists for the topic, **update it** rather than creating a duplicate — append new findings and update the read status.

Cache notes are **not** research notes. Cache = raw article inventory. Research = synthesis and analysis.

## Compounding

Research should accumulate, not restart. When researching a topic that already has a research note in `bank/Research/`, **update the existing note** — add new findings, new sources, new angles. Don't create a parallel investigation.

The research note is a living document. Each session should leave it richer than before: new footnotes, new sources in the timeline, updated "What Publications Are Saying" section, new rabbit holes discovered. The cache tracks what you found; the research note tracks what you know.

## Triangulation

Not every claim needs multiple sources. But **anchor claims** do — the facts that carry a post's argument:

- **Origin claims** — who made it first, when, where, for whom
- **Attribution claims** — who wore it, who designed it, who commissioned it
- **Material/technical claims** — specific weights, weave types, construction methods
- **"Never" / "first" / "only" claims** — absolute statements need strong backing

These claims need **2+ independent sources, with at least one T1 or T2**. If only one source supports an anchor claim, flag it in the research note as `[single-source]` so the writer knows to either find corroboration or soften the language.

Background context (general cultural observations, widely-known facts) can be single-sourced with attribution.

## Footnoting

Every factual claim in research outputs must have a footnote linking to its source. The footnote should point to a **specific claim** in the source note, not just the source note itself:

```
The Prince of Wales championed midnight blue over black [^1]

[^1]: [[Sources/References/The Dinner Suit — Henry Poole]] — Edward VII's preference for midnight blue
```

This is non-negotiable. Research without footnotes is assertions. The research note is a reference document — if someone reads a claim, they must be able to trace it to where it came from. If a claim comes from general knowledge and cannot be sourced, mark it as `[unsourced]` so it can be verified later. If an anchor claim has only one source, mark it as `[single-source]`.

## Source Architecture (Bidirectional Chain)

The source trail must be bidirectional:

- **Post** → `## Sources Referenced` lists every source used, with what specific claim was drawn from it
- **Research note** → footnotes link to `bank/Sources/References/` notes
- **Source note** → `used_in` field links back to the research notes and posts that cite it

The chain: **Source note ↔ Research note (footnoted) ↔ Post (sources referenced)**

When saving sources to `bank/Sources/References/`:
- Note the publication and URL
- Rate reliability: primary source > established publication > blog > single mention
- **Extract at least 3 key claims** — specific facts with dates, numbers, names. "See source URL for details" is not acceptable
- If you can't extract claims right now, set `status: stub` in frontmatter so the note can be enriched later via `/source enrich`
- Link to the research notes that use them: `used_in: ["[[Research/Topic]]"]`
- Use `/source <url>` to create properly enriched source notes
