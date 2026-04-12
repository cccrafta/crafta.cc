# Crafta Journal

WordPress backend + Next.js 16 frontend + Obsidian vault. Editorial journal about garments, materials, craft techniques, and fashion culture.

## Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, TypeScript — in `frontend/`
- **Backend:** WordPress (PHP built-in server) — in `backend/`
- **Database:** MySQL (via Homebrew)
- **Knowledge Base:** Obsidian vault — in `bank/`
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
- `--font-body`, `--font-heading`, `--font-title`, `--font-nav` — typography
- `--content-max-width` — page width constraint
- Typography classes: `.type-title`, `.type-section`, `.type-nav`, `.type-body`, `.type-meta`, etc.

## Running Locally

```bash
./setup.sh   # first time: downloads WordPress, creates DB, installs deps
./start.sh   # starts MySQL, WordPress (:8080), Next.js (:3000)
```

## Publishing Posts

```bash
php backend/publish-post.php --title "..." --content "..." --excerpt "..." --category "..." --tags "tag1, tag2, tag3"
```

## Obsidian Vault — `bank/`

The vault is the workspace for all content operations. Everything flows through here.

```
bank/
├── Ideas/          # One note per idea, wiki-linked
├── Research/       # Mood boards, deep dives, gap analyses
├── Posts/          # All post stages: draft → review → published
├── Feeds/          # Feed briefings (daily/weekly/on-demand)
├── Sources/
│   ├── Publications/  # Notes on each feed source
│   ├── People/        # Artisans, designers, experts
│   └── References/    # Specific articles/resources we cite
└── _templates/     # Obsidian templates for each note type
```

**Key principles:**
- One file per post in `Posts/` — status tracked in frontmatter, git handles versioning
- Every factual claim in a post must link to a source note in `Sources/References/`
- Wiki links connect everything: ideas → research → posts → sources
- The JSON idea bank (`.claude/idea-bank.json`) stays in sync with `bank/Ideas/` notes

## Content Workflow — How to Handle Content Requests

When the user asks you to write posts, find topics, or do anything content-related, follow this playbook. **Do not skip steps.** Quality depends on research depth and source integrity.

### Writing a post (any request to write/create/generate content)

```
Step 1: RESEARCH — What exists, what's saved, and what's trending
├── Check bank/Ideas/ and .claude/idea-bank.json for pending ideas
├── Check bank/Posts/ and WordPress API for existing posts (avoid duplicates)
├── Check bank/Research/ for prior research on this topic
├── Scan RSS feeds + WebSearch + sitemaps for coverage
├── Save research to bank/Research/<topic>.md
├── Save every source found to bank/Sources/References/
└── Output: research note with sourced findings

Step 2: PLAN — Choose the angle
├── Identify what hasn't been said, what's surprising
├── Check /editorial-calendar for category balance
├── Propose 2-3 topics with angles and reasoning
└── Output: recommendations with source backing

Step 3: APPROVE — Present to user
├── Show proposed topics with title, category, angle, sources
├── Wait for user to pick/modify/approve
├── Save rejected topics to bank/Ideas/ and idea bank JSON
└── Never skip this step

Step 4: DRAFT — Write and save to vault
├── Write the post following editorial standards
├── Save to bank/Posts/<Title>.md with status: draft
├── Include ## Sources Referenced linking to bank/Sources/References/
├── Tell user: "Draft saved — review in Obsidian"
└── Wait for user feedback

Step 5: REFINE — Iterate with user
├── Read any edits user made in Obsidian
├── Apply verbal feedback if given
├── Update bank/Posts/<Title>.md
└── Repeat until user approves

Step 6: AUDIT — Quality check before publishing
├── Verify: length, opening, closing, specificity, tone
├── Verify: every claim has a source, no single-source claims unmarked
├── Verify: excerpt, tags (3-7), category, no duplicates
├── Present audit results to user
└── Fix any issues before proceeding

Step 7: PUBLISH — To WordPress after user approval
├── php backend/publish-post.php with title, content, excerpt, category, tags
├── Update bank/Posts/<Title>.md: status → published, add wp_id
├── Update .claude/idea-bank.json status if applicable
└── Report: post ID, title, category, tags
```

### Finding topics / "what should I write about?"

```
Step 1: Check bank/Ideas/ for pending ideas (pre-researched = faster)
Step 2: Check bank/Feeds/ for recent briefings
Step 3: Scan feeds + WebSearch + sitemaps via /discover
Step 4: Check /editorial-calendar for category gaps
Step 5: Cross-reference: pending ideas + trending topics + gaps = best suggestions
Step 6: Present 3-5 ranked suggestions with reasoning and sources
```

### Learning / "tell me about X"

```
Step 1: Run /mood-board (saves to bank/Research/ with sourced findings)
Step 2: Present the research packet
Step 3: Suggest rabbit holes (saved to bank/Ideas/)
Step 4: If user wants to write → transition to writing workflow
```

### Quality review / "check my posts"

```
Step 1: Run /audit-posts (checks both vault and WordPress)
Step 2: Present findings — prioritize source integrity issues
Step 3: Offer fixes after approval
```

### Library revision / "which posts need work?"

```
Step 1: Run /triage — score all posts, assign to Tier A/B/C
Step 2: Tier C → bulk metadata update (related posts via tag overlap, empty references)
Step 3: Tier B → quick research per post, add references + minor polish
Step 4: Tier A → full rewrite using writing pipeline (one at a time, with user review)
```

### Key principles

**Research before writing. Always.** The research step with proper source tracking is what makes Crafta's content authoritative rather than generic.

**Source everything.** Every factual claim in a post must be traceable to a note in `bank/Sources/References/`. If only one source supports a claim, flag it.

**Draft in the vault, publish to WordPress.** The vault is the workspace. WordPress is the publication. The user reviews and refines in Obsidian before publishing.

## Idea Bank

Dual storage:
- `.claude/idea-bank.json` — machine-readable, for querying and stats
- `bank/Ideas/` — Obsidian notes with wiki links, for browsing and connecting

Both must stay in sync. Managed via `/idea-bank` skill.

## RSS Feeds

The curated feed list with RSS URLs, domains, and sitemap URLs:

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
@.claude/skills/idea-bank.md
@.claude/skills/triage.md
