---
name: idea-bank
description: Manage the idea bank for Crafta journal. Use when the user wants to list, add, update, or clean up post ideas. Triggers on /idea-bank or requests like "show my ideas", "add this idea", "what ideas do I have", "idea bank".
user_invocable: true
---

# Idea Bank — Crafta Journal

Ideas are stored as Obsidian notes in `bank/Ideas/`. One note per idea, with YAML frontmatter for structured fields and wiki links for connections.

## Frontmatter Schema

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

**Status values:** `pending` (new idea), `in_progress` (being written), `published` (post exists), `rejected` (not pursuing)

## Commands

### List (`/idea-bank` or `/idea-bank list`)
Glob `bank/Ideas/*.md`, read frontmatter from each, display pending ideas in a table. Show count by status.

### Add (`/idea-bank add "topic"`)
1. Create `bank/Ideas/<Topic>.md` using the Idea template
2. Populate frontmatter: title, category, tags, status `pending`, sources, today's date, pitch
3. Add wiki links to related content in `## Related`
4. Report what was added

### Update status (`/idea-bank status <title> <status>`)
Find the matching note in `bank/Ideas/`, update the `status` field in frontmatter.

### Cleanup (`/idea-bank cleanup`)
Glob `bank/Ideas/*.md`, flag ideas older than 90 days with status `pending`. Present for review.

### Stats (`/idea-bank stats`)
Glob `bank/Ideas/*.md`, parse frontmatter, count by status and category.

### Search (`/idea-bank search <query>`)
Glob `bank/Ideas/*.md`, search frontmatter fields: title, pitch, tags, category.

## Usage Examples

```
/idea-bank
/idea-bank add "French moleskin trousers"
/idea-bank status "French moleskin trousers" in_progress
/idea-bank cleanup
/idea-bank stats
/idea-bank search "japanese"
```
