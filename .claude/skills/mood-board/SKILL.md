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

Follow the research methodology in `.claude/research-protocol.md`: use all three tiers, go beyond known sources, grow the library. Every factual claim must be footnoted.

Do these in parallel where possible:

**Check existing vault content:**
- `bank/Research/Cache/` for existing findings on this topic
- `bank/Ideas/` for related ideas
- `bank/Research/` for prior research
- `bank/Posts/` for published content on related topics
- `bank/Sources/` for existing references

**Check WordPress** for published posts:
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/posts/&per_page=100&search=TOPIC&_embed=true&_fields=id,title,slug,categories,excerpt" 2>/dev/null
```

**Research across all sources** — RSS feeds, WebSearch `site:` queries, sitemaps, and general web search. Save sources to `bank/Sources/References/` following the source architecture in `.claude/research-protocol.md`.

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
- Add wiki links back to the research: `[[Research/<parent topic>]]`
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
