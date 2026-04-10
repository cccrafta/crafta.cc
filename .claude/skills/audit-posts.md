---
name: audit-posts
description: Audit existing Crafta journal posts for quality, consistency, and completeness. Use when the user wants to review content quality, find weak posts, or improve existing content. Triggers on /audit-posts or requests like "review my posts", "which posts need improvement", "check post quality".
user_invocable: true
---

# Audit Posts — Crafta Journal

You review posts for quality, consistency, completeness, and source integrity. **Read from both `bank/Posts/` (vault drafts) and WordPress (published posts).**

## Workflow

### Step 1: Fetch Posts

**From vault** (drafts and published records):
```bash
ls bank/Posts/
```

**From WordPress** (live published):
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/posts/&per_page=100&_embed=true" 2>/dev/null
```

### Step 2: Audit Each Post

**Content Quality**
- [ ] **Length** — flag under 200 words as "too short", over 800 as "could be tighter"
- [ ] **Opening** — leads with something interesting, not a definition?
- [ ] **Closing** — ends with insight, not trailing off?
- [ ] **Specificity** — contains dates, measurements, places, names?
- [ ] **Tone** — matches Crafta voice (authoritative, specific, no hype)?

**Source Integrity**
- [ ] **Sources referenced** — does `bank/Posts/<Title>.md` have a `## Sources Referenced` section?
- [ ] **Source notes exist** — do the linked `[[Sources/References/...]]` notes exist in the vault?
- [ ] **Claims verified** — are factual claims supported by at least one source?
- [ ] **Single-source claims** — flag any claim supported by only one source

**Metadata Quality**
- [ ] **Excerpt** — present, compelling, different from first line?
- [ ] **Category** — appropriate?
- [ ] **Tags** — 3-7 relevant tags present?
- [ ] **Title** — specific and interesting?

**Vault Integrity**
- [ ] **Vault note exists** — does `bank/Posts/<Title>.md` exist for this published post?
- [ ] **Status correct** — does frontmatter status match reality (draft/published)?
- [ ] **wp_id present** — is the WordPress post ID recorded?

### Step 3: Present Report

**Overall Score**
- Posts audited: X
- Passing: X | Needs attention: X | Needs rewrite: X

**By Priority:**

Critical — missing sources, very short, broken metadata
Improvement — weak opening/closing, vague content, missing tags
Polish — excerpt could be better, title could be sharper

**Per-post:** title, ID, issues found, specific suggestion

### Step 4: Offer Fixes

After presenting the report, offer to:
1. Rewrite weak posts (save to `bank/Posts/` for review)
2. Generate missing excerpts
3. Add source tracking to posts that lack it
4. Create missing vault notes for published posts
5. Fix tags

Only make changes after user approval.

## Scopes

- `/audit-posts` — audit all posts
- `/audit-posts recent` — last 10 only
- `/audit-posts category Materials` — specific category
- `/audit-posts sources` — only check source integrity
- `/audit-posts vault` — only check vault sync (do all published posts have vault notes?)

## Usage Examples

```
/audit-posts
/audit-posts recent
/audit-posts sources
/audit-posts vault
Review my posts for quality
Which posts need improvement?
```
