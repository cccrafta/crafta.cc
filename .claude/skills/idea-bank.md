---
name: idea-bank
description: Manage the idea bank for Crafta journal. Use when the user wants to list, add, update, or clean up post ideas. Triggers on /idea-bank or requests like "show my ideas", "add this idea", "what ideas do I have", "idea bank".
user_invocable: true
---

# Idea Bank — Crafta Journal

You manage a persistent JSON file of post ideas at `.claude/idea-bank.json`. Ideas are collected during research (discover, mood-board, generate-posts) and stored here for future use.

## Schema

Each idea is an object in the JSON array:

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

**Status values:** `pending` | `in_progress` | `published` | `archived`

## Commands

### List ideas (`/idea-bank` or `/idea-bank list`)

Read `.claude/idea-bank.json` and display pending ideas in a readable table:

```
ID | Date       | Idea                          | Category  | Tags              | Sources
1  | 2026-04-10 | The M43 Overshirt Silhouette   | Garments  | outerwear, mil... | heddels.com
```

If no filter specified, show `pending` ideas only. Show count by status at the bottom.

### Add idea (`/idea-bank add "topic"`)

1. Ask the user for details or infer from context:
   - `idea` — the topic/title (required)
   - `pitch` — one-line angle (generate if not provided)
   - `sources` — where the idea came from (if known)
   - `category` — best-fit Crafta category
   - `tags` — relevant tags
2. Auto-assign:
   - `id` — next integer (max existing id + 1, or 1 if empty)
   - `date` — today's date
   - `status` — `pending`
3. Read the JSON file, append the new idea, write back

### Update status (`/idea-bank status <id> <status>`)

Read the JSON, find the idea by id, update its status, write back.

When setting status to `published`, also ask for the post ID if available.

### Archive (`/idea-bank archive <id>`)

Shortcut for `/idea-bank status <id> archived`.

### Cleanup (`/idea-bank cleanup`)

1. Read all ideas
2. Flag ideas older than 90 days with status `pending`
3. Present them to the user
4. On approval, set their status to `archived`

### Stats (`/idea-bank stats`)

Count ideas by status and category:

```
Status:     pending: 12 | in_progress: 2 | published: 8 | archived: 5
Category:   Garments: 9 | Design: 5 | History: 3 | Materials: 4 | ...
```

### Search (`/idea-bank search <query>`)

Search ideas by keyword in the `idea`, `pitch`, `tags`, or `category` fields.

## Integration with other skills

**When other skills generate topic proposals:**
- After the user picks topics from a proposed list, rejected topics should be saved to the idea bank automatically
- Use this pattern in generate-posts, discover, and mood-board skills:
  1. Read `.claude/idea-bank.json`
  2. Append rejected ideas with status `pending`
  3. Write back
  4. Inform the user: "Saved X ideas to the idea bank"

**When the user asks "what should I write?":**
- Check the idea bank FIRST for pending ideas before scanning feeds
- Pending ideas are pre-researched — they're faster to act on than fresh feed scanning

## File operations

Always use Read to load the JSON, modify in memory, then Write the full file back. Never use Edit for JSON — it's error-prone with structured data.

```
Read .claude/idea-bank.json → parse → modify → Write .claude/idea-bank.json
```

## Usage examples

```
/idea-bank
/idea-bank list
/idea-bank add "French moleskin trousers"
/idea-bank status 3 in_progress
/idea-bank archive 5
/idea-bank cleanup
/idea-bank stats
/idea-bank search "japanese"
Show my ideas
What ideas do I have?
```
