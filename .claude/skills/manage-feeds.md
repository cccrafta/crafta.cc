---
name: manage-feeds
description: Manage the RSS feed reference list for Crafta journal. Use when the user wants to add, remove, test, or list RSS feed sources. Triggers on /manage-feeds or requests like "add this feed", "list my feeds", "test this RSS", "remove heddels".
user_invocable: true
---

# Manage Feeds — Crafta Journal RSS Sources

You manage the curated list of RSS feeds at `.claude/feeds.md`. When adding feeds, also create a publication note in the Obsidian vault.

## Commands

### List (`/manage-feeds` or `/manage-feeds list`)
Read and display `.claude/feeds.md` in a clean table.

### Add (`/manage-feeds add <url>`)

1. **Test the feed** — fetch with WebFetch, verify valid RSS/Atom
2. **Classify** — which tier (Core, Editorial, Design, Japanese, or new)
3. **Check for duplicates** — overlap with existing feeds?
4. **Check for sitemap** — try:
   - `<domain>/sitemap_index.xml` (Yoast)
   - `<domain>/sitemap.xml`
   - `<domain>/wp-sitemap.xml` (WP core)
5. **Present findings** — feed status, content summary, tier, sitemap
6. **On approval:**
   - Update `.claude/feeds.md` with the new feed (Feed URL, Domain, Sitemap, Focus)
   - Create `bank/Sources/Publications/<Name>.md` using Source template with:
     - Publication name, URL, RSS feed URL, sitemap URL
     - Editorial focus and angle
     - How it relates to Crafta

If URL is not an RSS feed, try: `/feed/`, `/rss/`, `/feed/rss/`, `/feeds/posts/default?alt=rss`, `/blog.atom`

### Remove (`/manage-feeds remove <name>`)
1. Confirm with user
2. Remove from `.claude/feeds.md`
3. Note removal in `bank/Sources/Publications/<Name>.md` (don't delete — keep as reference)

### Test (`/manage-feeds test`)
Fetch each feed, report: Active / Error / Dead / Stale (last post > 3 months old).

### Suggest (`/manage-feeds suggest <topic>`)
Suggest feeds for a topic. Test each suggestion before recommending.

## Usage Examples

```
/manage-feeds
/manage-feeds add https://example.com/feed/
/manage-feeds remove heddels
/manage-feeds test
/manage-feeds suggest "Japanese streetwear"
```
