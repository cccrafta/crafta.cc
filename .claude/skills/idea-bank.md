---
name: idea-bank
description: Manage the idea bank for Crafta journal. Use when the user wants to list, add, update, or clean up post ideas. Triggers on /idea-bank or requests like "show my ideas", "add this idea", "what ideas do I have", "idea bank".
user_invocable: true
---

# Idea Bank — Crafta Journal

You manage a dual-storage idea system:
- **`.claude/idea-bank.json`** — machine-readable, for querying and stats
- **`bank/Ideas/`** — Obsidian notes with wiki links, for browsing and connecting

**Both must stay in sync.** When adding or updating ideas, write to both.

## Schema (JSON)

```json
{
  "id": 1,
  "date": "2026-04-10",
  "idea": "The M43 Overshirt Silhouette",
  "pitch": "Deep dive on how a WWII field shirt became the default spring layer",
  "sources": ["heddels.com", "archivalblog.com"],
  "category": "Garments",
  "tags": ["outerwear", "military", "heritage"],
  "status": "pending"
}
```

## Obsidian Note (bank/Ideas/)

Each idea also exists as `bank/Ideas/<Idea Title>.md`:

```markdown
---
title: The M43 Overshirt Silhouette
category: Garments
tags: [outerwear, military, heritage]
status: pending
sources: [heddels.com, archivalblog.com]
created: 2026-04-10
pitch: Deep dive on how a WWII field shirt became the default spring layer
---

## Angle
How a WWII field shirt became the default spring layer.

## Related
- [[Research/Summer Materials 2026]]
- [[Ideas/The Chore Coat]]
- [[Sources/Publications/Heddels]]
```

## Commands

### List (`/idea-bank` or `/idea-bank list`)
Read JSON, display pending ideas in a table. Show count by status.

### Add (`/idea-bank add "topic"`)
1. Create the idea object with auto-incrementing id, today's date, status `pending`
2. Write to `.claude/idea-bank.json`
3. Create `bank/Ideas/<Topic>.md` using Idea template with wiki links to related content
4. Report what was added

### Update status (`/idea-bank status <id> <status>`)
Update in both JSON and the Obsidian note frontmatter.

### Cleanup (`/idea-bank cleanup`)
Flag ideas older than 90 days with status `pending`. Present for review.

### Stats (`/idea-bank stats`)
Count by status and category from JSON.

### Search (`/idea-bank search <query>`)
Search JSON fields: idea, pitch, tags, category.

### Sync (`/idea-bank sync`)
Compare JSON entries with `bank/Ideas/` files. Report any that are out of sync and fix them.

## Usage Examples

```
/idea-bank
/idea-bank add "French moleskin trousers"
/idea-bank status 3 in_progress
/idea-bank cleanup
/idea-bank stats
/idea-bank search "japanese"
/idea-bank sync
```
