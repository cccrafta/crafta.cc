---
name: manage-feeds
description: Manage the RSS feed reference list for Crafta journal. Use when the user wants to add, remove, test, or list RSS feed sources. Triggers on /manage-feeds or requests like "add this feed", "list my feeds", "test this RSS", "remove heddels".
user_invocable: true
---

# Manage Feeds — Crafta Journal RSS Sources

You manage the curated list of RSS feeds used by all content skills (generate-posts, discover, mood-board). The feed list lives at:

```
.claude/feeds.md
```

## Commands

### List feeds (`/manage-feeds` or `/manage-feeds list`)

Read and display the current feed list from the reference file in a clean table format.

### Add a feed (`/manage-feeds add <url>`)

1. **Test the feed** — fetch the URL with WebFetch to verify:
   - Is it a valid RSS/Atom feed?
   - What content does it cover?
   - What are the 3 most recent article titles?
2. **Classify it** — determine which tier it belongs to:
   - Core (workwear, denim, craft)
   - Editorial (opinion, culture)
   - Design & Art
   - Japanese Sources
   - Or suggest a new tier if none fit
3. **Check for duplicates** — does it overlap significantly with existing feeds?
4. **Present findings** to the user:
   - Feed status (valid/invalid)
   - Content summary
   - Recommended tier
   - Any concerns (low quality, irrelevant, dead feed)
5. **On approval** — update the reference file by editing it with the Edit tool. Add the new feed to the appropriate tier table.

If the URL is not an RSS feed, try common feed paths:
- `<url>/feed/`
- `<url>/rss/`
- `<url>/feed/rss/`
- `<url>/feeds/posts/default?alt=rss` (Blogger)
- `<url>/blog.atom` (Shopify)

### Remove a feed (`/manage-feeds remove <name>`)

1. Find the feed in the reference file by name
2. Confirm with the user
3. Remove it from the reference file using the Edit tool

### Test all feeds (`/manage-feeds test`)

1. Read the reference file to get all feed URLs
2. Fetch each feed with WebFetch (in parallel where possible)
3. Report status for each:
   - Active — responding with valid content
   - Error — HTTP error (show status code)
   - Dead — domain unreachable
   - Stale — last post is older than 3 months
4. Recommend removing dead/stale feeds

### Suggest feeds (`/manage-feeds suggest <topic>`)

Based on the topic, suggest RSS feeds to add. Use WebSearch if available, or suggest well-known publications in the space. Then test each suggestion.

## Feed Reference File Format

The reference file uses this structure — maintain it when editing:

```markdown
---
name: RSS Feed Sources
description: Curated RSS feeds for fashion/design/craft editorial inspiration for Crafta journal
type: reference
---

## Tier Name
| Source | Feed URL | Focus |
|---|---|---|
| Name | https://example.com/feed/ | Short description |
```

## Important

- Always test a feed before adding it — never add unverified URLs
- The reference file is the single source of truth — all content skills read from it
- Keep descriptions concise — one line per feed
- Japanese feeds should note "(JP)" in the focus column
