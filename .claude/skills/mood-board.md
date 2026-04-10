---
name: mood-board
description: Compile a research brief and mood board for a topic before writing. Use when the user wants to explore a subject deeply, gather references, or prepare to write a post. Triggers on /mood-board or requests like "research packet for...", "brief me on...", "prepare a mood board for...".
user_invocable: true
---

# Mood Board — Crafta Journal Research Packets

You compile comprehensive research briefs that give the writer everything needed to understand a topic before writing. **All outputs are saved to the Obsidian vault.**

## Workflow

### Step 1: Understand the Topic
Ask clarifying questions only if genuinely ambiguous.

### Step 2: Research

Do these in parallel where possible:

**Check existing vault content:**
- `bank/Ideas/` for related ideas
- `bank/Research/` for prior research
- `bank/Posts/` for published content on related topics
- `bank/Sources/` for existing references

**Check WordPress** for published posts:
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/posts/&per_page=100&search=TOPIC&_embed=true&_fields=id,title,slug,categories,excerpt" 2>/dev/null
```

**Scan RSS feeds** — read `.claude/feeds.md` for URLs.

**Search publication archives** — WebSearch `site:<domain> "<topic>"` across ALL domains in `.claude/feeds.md`. Don't stop at 2-3 — check every domain.

**Search beyond known sources** — run general WebSearch queries (without `site:`) to find articles from publications we don't track yet. When new sources are found, create notes in `bank/Sources/References/` and `bank/Sources/Publications/`.

**Search sitemaps** — for sources with sitemap URLs, fetch and parse for comprehensive topic coverage.

**Check the idea bank** at `.claude/idea-bank.json` for previously saved ideas.

**Growing the source library is a goal** — every research session should add at least 1-2 new source notes to the vault.

### Step 3: Save Sources

For every article, publication, or reference found during research:
- Create a note in `bank/Sources/References/<title - publication>.md` using Source template
- Include: URL, publication, date accessed, key claims, reliability rating
- Link to the research note: `used_in: ["[[Research/<topic>]]"]`

### Step 4: Compile and Save the Mood Board

Save to `bank/Research/<topic>.md` using the Research template:

---

**Overview** — 2-3 sentences on what this is and why it matters

**Historical Timeline** — key moments, specific dates/places/names (5-10 entries)

**Key Garments / Items** — if applicable, 3-7 items with descriptions

**Materials & Construction** — technical details, what distinguishes quality

**Cultural Context** — who, why, subcultures, geography, perception over time

**What Publications Are Saying**
- Recent (from RSS): `[[Sources/References/Article Name]]` — angle they took
- Archive (from web search/sitemap): `[[Sources/References/Article Name]]`
- **Gaps**: what angle hasn't been covered that Crafta could own

**Related Crafta Posts** — link to `[[Posts/Title]]` or note "no existing coverage"

**Possible Angles** — 3-5 approaches with category assignment

**Sources Consulted** — full list linking to `bank/Sources/References/`

**Rabbit Holes** — 3-5 related topics worth exploring, each linking to `[[Ideas/<topic>]]`

---

### Step 5: Generate Ideas

For each rabbit hole and possible angle:
- Save as a note in `bank/Ideas/<topic>.md` using Idea template
- Add to `.claude/idea-bank.json`
- Wiki-link back to the research: `[[Research/<parent topic>]]`

### Step 6: Present to User

Present the mood board contents. Then offer:
- Pick an angle → `/generate-posts deep "<topic>"`
- Explore a rabbit hole → new mood board
- Save for later → already saved in vault

## Quality Standards

- **Be specific, not encyclopedic** — include details that make the topic come alive
- **Prioritize the surprising** — the user probably knows the basics
- **Show connections** — wiki-link everything related
- **Acknowledge gaps** — "the exact origin is disputed" > stating uncertain facts
- **Source everything** — every factual claim links to a source note

## Usage Examples

```
/mood-board 1940s US Navy workwear
/mood-board the evolution of the trucker jacket
/mood-board Japanese boro and visible mending
Brief me on indigo dyeing traditions
```
