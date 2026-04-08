# Crafta Journal

WordPress backend + Next.js 16 frontend. Editorial journal about garments, materials, craft techniques, and fashion culture.

## Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, TypeScript — in `frontend/`
- **Backend:** WordPress (PHP built-in server) — in `backend/`
- **Database:** MySQL (via Homebrew)
- **Deployment:** Cloudflare Pages

## Architecture

```
Page → Service → API → HTTP Client → WordPress REST API
```

- `lib/http-client.ts` — base fetch wrapper, uses `index.php?rest_route=` for PHP built-in server compatibility
- `lib/api/` — thin 1:1 endpoint wrappers
- `lib/services/` — business logic, transforms WP data to view types
- `lib/hooks/` — client-side React hooks (placeholder)
- `lib/types/wordpress.ts` — all WP + view types

## Design Tokens

All styling flows through CSS custom properties in `globals.css`. Key tokens:
- `--color-fg`, `--color-accent` — text colors (`#CA0F0F`)
- `--font-body`, `--font-heading`, `--font-nav` — typography
- `--content-max-width` — page width constraint
- `--grid-cols-*` — responsive grid columns

## Running Locally

```bash
./setup.sh   # first time: downloads WordPress, creates DB, installs deps
./start.sh   # starts MySQL, WordPress (:8080), Next.js (:3000)
```

## Publishing Posts

```bash
php backend/publish-post.php --title "..." --content "..." --excerpt "..." --category "..."
```

## Content Workflow — How to Handle Content Requests

When the user asks you to write posts, find topics, or do anything content-related, follow this playbook. **Do not skip steps.** The quality of the output depends on doing the research first.

### Writing a post (any request to write/create/generate content)

```
Step 1: RESEARCH — What exists and what's trending
├── Check existing posts: curl WordPress API to avoid duplicates
├── Scan RSS feeds via /discover for current trends related to the topic
└── Output: list of what's already covered + what's trending

Step 2: PLAN — Deep dive on the topic
├── Run /mood-board on the topic (or mentally do the research)
├── Identify the best angle — what hasn't been said, what's surprising
├── Check /editorial-calendar for category balance
└── Output: 2-3 proposed topics with angles, recommend one

Step 3: APPROVE — Present to user
├── Show proposed topics with title, category, angle, reasoning
├── Wait for user to pick/modify/approve
└── Never skip this step

Step 4: WRITE — Generate the post
├── Use /generate-posts standards (voice, tone, structure)
├── 4-5 paragraphs, original content, specific details
├── Lead with the interesting fact, end with insight
└── Output: full post ready for review

Step 5: PUBLISH — After user approval
├── php backend/publish-post.php
└── Report: post ID, title, category
```

### Finding topics / "what should I write about?"

```
Step 1: Scan ALL feeds via /discover (trending mode)
Step 2: Check /editorial-calendar for gaps
Step 3: Cross-reference: trending topics that fill category gaps = best suggestions
Step 4: Present 3-5 ranked suggestions with reasoning
```

### Learning / "tell me about X"

```
Step 1: Run /mood-board on the topic
Step 2: Present the research packet
Step 3: Suggest rabbit holes for further exploration
Step 4: If user wants to write about it → transition to the writing workflow
```

### Quality review / "check my posts"

```
Step 1: Run /audit-posts
Step 2: Present findings ranked by priority
Step 3: Offer to fix issues after approval
```

### Key principle

**Research before writing. Always.** The difference between a mediocre post and a great one is the depth of understanding behind it. Even if the user says "just write something quick," at minimum check existing posts and scan 2-3 feeds. Spending 30 seconds on research produces dramatically better content.

## RSS Feeds

The curated feed list lives in the repo and is the single source of truth for all content skills:

@.claude/feeds.md

## Categories

- **Garments** — specific garment types, construction, significance
- **Design** — philosophy, manufacturing, brand approaches
- **History** — historical context, evolution of traditions
- **Materials** — fabrics, leathers, textiles, raw materials
- **Technique** — craft methods, construction, repair
- **Culture** — movements, subcultures, philosophy of dress

## Skills

@.claude/skills/generate-posts.md
@.claude/skills/discover.md
@.claude/skills/editorial-calendar.md
@.claude/skills/audit-posts.md
@.claude/skills/mood-board.md
@.claude/skills/manage-feeds.md
