---
name: triage
description: Triage the post library into priority tiers for revision. Assesses posts across 7 dimensions (observation, transformation, stance, narrative, voice, humanization, sources) and scores 0-70. Identifies which posts need humanization, content revision, or metadata fixes. Triggers on /triage or requests like "which posts need work", "prioritize my revisions", "what should I fix first".
user_invocable: true
---

# Triage — Crafta Journal Library Assessment

You assess the entire post library and categorize posts into priority tiers based on the current editorial standards. This is not a per-post audit — it's a strategic overview of where editorial effort will have the most impact.

Posts are scored across 7 dimensions (0-70 total): Observation, Transformation, Stance, Narrative, Voice, Humanization, and Sources & Vault Integrity.

## Workflow

### Step 1: Fetch all posts

**From WordPress** (the source of truth for published content):
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/posts/&per_page=100&_embed=true" 2>/dev/null
```

**From vault** — check `bank/Posts/` for:
- Which posts have `sources: []` (no source tracking)
- Which posts have `related_posts: []` (no relations)
- Which posts have `references: []` (no references)
- Which posts have `research:` empty (no research note backing them)

### Step 2: Score each post

Evaluate every post against these criteria. Each dimension scores 0-10 for granularity.

**Observation (0-10):**
- Does it contain specific facts? (dates, measurements, places, names)
- Does it include sensory observation? (textures, behaviors, what you'd notice holding it)
- Is the detail balanced — facts and observations serving each other?
- 0 = vague, generic, no specifics
- 5 = has facts but no observation, or observation without facts
- 10 = rich in both, balanced, you feel like you understand the subject

**Transformation (0-10):**
- Does it place the subject in context? (then vs now, who values it, why)
- Does it reference cultural icons or movements when relevant?
- Does it show multiple perspectives?
- 0 = no context, exists in a vacuum
- 5 = some context but surface-level
- 10 = the subject is fully situated in time, culture, and relevance

**Stance (0-10):**
- Does it arrive at a recognition — not just describe but understand?
- Is the closing an insight rather than a summary?
- Does the stance emerge from the observation?
- 0 = no point of view, just information
- 5 = has an opinion but it feels imposed, not earned
- 10 = the stance feels inevitable — the evidence led here

**Narrative (0-10):**
- Does each paragraph earn the next?
- Does the title's promise get answered?
- Could you summarize the article's argument in one sentence?
- 0 = disconnected paragraphs, no throughline
- 5 = has structure but paragraphs could be reordered without loss
- 10 = tight, logical, every paragraph depends on the one before it

**Voice (0-10):**
- Is it truthful and measured, not robotic or passionate?
- Does it avoid unnecessary first person?
- Does it match Crafta editorial style — calm authority, observe don't declare?
- Does it reference Heddels/Monocle-style directness and rhythm?
- 0 = generic, could be from any publication
- 5 = competent but lacks Crafta editorial voice
- 10 = distinctly Crafta — calm authority, specific, honest

**Humanization (0-10):**
- Is it free of AI writing patterns? (checks against all 30 patterns from `/humanize` skill)
- Key patterns to scan for: choppy sentence sequences, filler phrases, em dash overuse, rule of three, negative parallelisms, AI vocabulary (delve, showcase, landscape), passive voice, elegant variation, inflated significance language
- Does the sentence rhythm vary naturally?
- Are there deliberate short sentences for punch vs. unvarying choppy sequences?
- 0 = heavy AI patterns throughout (choppy sequences, filler, AI vocab, negative parallelisms)
- 3 = multiple AI tells present (em dash overuse, rule of three, passive voice)
- 5 = some AI patterns slip through
- 7 = natural prose with 1-2 minor patterns
- 10 = clean, natural, human writing — no AI patterns detected

**Sources & Vault Integrity (0-10):**
- Are factual claims traceable to sources in `bank/Sources/References/`?
- Are references populated in the vault note and WordPress meta?
- Are related posts set?
- Does a vault note exist in `bank/Posts/` for the published post?
- Does `wp_id` match the WordPress post ID?
- Does the vault note `status` match reality (draft vs published)?
- Do the linked source notes in `bank/Sources/References/` actually exist?
- Is the excerpt present and distinct from the first line of content?
- Are there 3-7 tags?
- 0 = no source tracking, no vault note, no metadata
- 5 = some sources, vault note exists but incomplete
- 10 = fully sourced, references populated, vault note complete with wp_id, excerpt, tags

**Total score: 0-70**

### Step 3: Derive priority from score

The score determines the action needed:

| Score | Priority | Action |
|---|---|---|
| 0-25 | **Critical** — full revision | Rewrite using the editorial framework. Full research, draft in vault, user review, humanize. |
| 26-42 | **Improve** — content + metadata + humanize | Strengthen narrative and voice, run `/humanize`, add sources and references, set related posts. |
| 43-59 | **Polish** — metadata + humanize if needed | Add references, related posts. Run `/humanize` if Humanization < 7. Fix any obvious prose issues. |
| 60-70 | **Complete** — no action needed | Meets the current standard. |

These ranges are guidelines, not rigid rules. A post scoring 30 overall but 2/10 on Sources is more urgent on the source dimension than a post scoring 25 evenly.

### Step 4: Present the triage

**Library Summary**
- Total posts: X
- Average score: X/70
- Score distribution: Critical (0-25): X | Improve (26-42): X | Polish (43-59): X | Complete (60-70): X

**Scoreboard** (sorted lowest to highest)
| Post | Total | Obs | Trans | Stance | Narr | Voice | Human | Sources | Priority |
|---|---|---|---|---|---|---|---|---|---|
| Title | 20/70 | 4 | 3 | 2 | 3 | 4 | 2 | 2 | Critical |
| Title | 38/70 | 6 | 5 | 4 | 5 | 6 | 6 | 6 | Improve |
| Title | 56/70 | 8 | 8 | 7 | 8 | 9 | 8 | 8 | Polish |

**Dimension Averages** — where is the library weakest overall?
- Observation: X/10
- Transformation: X/10
- Stance: X/10
- Narrative: X/10
- Voice: X/10
- Humanization: X/10
- Sources: X/10

This shows systemic weaknesses. If Sources averages 1.5/10 across the library, that's the most impactful dimension to fix first.

### Step 5: Recommend action plan

Based on the triage, suggest:
1. Which Tier A posts to tackle first (highest-impact topics)
2. Whether to batch-process Tier B and C metadata (can be done by agents)
3. Estimated effort for each tier

### Step 6: Execute (after user approval)

**Score 51-60 (Complete):** No action. These meet the standard.

**Score 43-59 (Polish):**
- Bulk-add related posts via tag overlap
- Quick research per post to find 2-3 reference URLs
- Create source notes in vault, update WordPress meta
- Run `/humanize` if Humanization score < 7
- Minor prose fixes only if something obvious

**Score 26-42 (Improve):**
- Research the topic properly (feeds + web search)
- Strengthen narrative and voice — may involve rewriting 1-2 paragraphs
- Run `/humanize` to remove AI patterns
- Add full source tracking + references + related posts
- Can be done in batches with user spot-checking

**Score 0-25 (Critical):**
- Full rewrite using the writing pipeline: research → draft in vault → `/humanize` → user review → audit → publish update
- One post at a time, with user approval
- These are the highest-value investments — good topics that need the framework applied

## When to Run

- After establishing new editorial standards (like now)
- Monthly, to catch posts that have fallen behind as standards evolve
- After a batch of new posts, to ensure consistency across the library

## Scopes

- `/triage` — full assessment of all posts
- `/triage vault` — vault sync only (do published posts have vault notes with correct wp_id and status?)
- `/triage sources` — source integrity dimension only
- `/triage recent` — last 10 posts only

## Integration with Other Skills

- Feeds into `/editorial-calendar` — revisions count as content work
- Rewrites follow the `/generate-posts` writing pipeline
- Source research uses the same tools as `/discover` and `/mood-board`

## Usage Examples

```
/triage
/triage vault
/triage sources
/triage recent
Which posts need work?
Prioritize my revisions
Show me the weakest posts
Run a library assessment
```
