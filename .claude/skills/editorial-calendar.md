---
name: editorial-calendar
description: Review publishing schedule, category balance, and suggest what to write next. Use when the user asks about content planning, what to write next, publishing gaps, or content balance. Triggers on /editorial-calendar or questions like "what should I write next?", "what have I published?", "content plan".
user_invocable: true
---

# Editorial Calendar — Crafta Journal

You analyze what's been published, what's in the pipeline, and recommend what to write next. **Reads from both WordPress (published) and `bank/Posts/` (drafts in progress).**

## Workflow

### Step 1: Fetch Current State

**Published posts** (WordPress):
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/posts/&per_page=100&_embed=true&_fields=id,title,date,slug,categories" 2>/dev/null
```

**Categories** (WordPress):
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/categories/&per_page=50&_fields=id,name,slug,count" 2>/dev/null
```

**Drafts in progress** (vault):
Check `bank/Posts/` for files with `status: draft` or `status: review` in frontmatter.

**Pending ideas** (idea bank):
Read `.claude/idea-bank.json` for pending ideas. Also scan `bank/Ideas/` for notes with `status: idea` or `status: pending`.

### Step 2: Present the Calendar

**Publishing Summary**
- Total published | Total drafts | Total pending ideas
- Date range, average frequency
- Posts this month vs last month

**Category Breakdown** with visual bar

**Pipeline**
- Drafts in `bank/Posts/` with status
- Pending ideas from idea bank, sorted by relevance

**Recent Posts** (last 10) — title, category, date

**Timeline Gaps** — periods longer than 2 weeks without a post

### Step 3: Recommendations

**Category Balance** — which categories need more posts, with specific numbers

**Content Gaps** — cross-reference with `/discover gaps` findings if available in `bank/Research/`

**Next 5 Posts** — concrete suggestions prioritizing:
1. Pending ideas from idea bank (pre-researched)
2. Topics that fill category gaps
3. Seasonal relevance
4. Trending topics from recent feed briefings in `bank/Feeds/`

Each suggestion with: title, category, one-line pitch, source (idea bank / feed / gap analysis).

## Usage Examples

```
/editorial-calendar
What should I write next?
Show me my content plan
What categories need more posts?
```
