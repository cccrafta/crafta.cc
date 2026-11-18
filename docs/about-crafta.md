---
title: About Crafta
type: overview
created: 2026-10-11
updated: 2026-10-11
last_verified: 2026-10-11
---

# About Crafta

Synthesis page: what Crafta is, why it is written, and where it stands. Rules live elsewhere: writing in [[writing/editorial-framework]] (wins any disagreement), research in `.claude/research-protocol.md`, workflow in the project `CLAUDE.md` and `.claude/skills/`. Related: [[content/topics-and-categories]], [[content/sources-philosophy]], [[content/post-anatomy]].

## What it is

Crafta Journal is an editorial journal about garments, materials, craft techniques and the culture of dress. Posts are researched in an Obsidian vault (`bank/`), drafted there, reviewed by the owner in Obsidian, then published to a WordPress backend and read through a Next.js frontend.

The framework defines a post as a **learning note**: the record of studying a subject closely enough to make something from it. Posts are meant to accumulate into the project's reference library, "the foundation for design decisions, material choices, and creative direction" (framework, opening section). They are not product reviews, buying guides or trend reports, though the oldest posts sometimes read like guides (see [[content/post-anatomy]]).

## The owner's relationship to the work

- The owner writes to learn, and the learning feeds design. This is stated in the framework and visible in the research notes, which often end in "Possible Angles" and design-relevant findings rather than only article plans.
- **Active design brief.** `bank/Research/Workwear and Sportswear - Function and Ontology.md`, Part 2 (added 2026-10-10), is design research "for a design brief: workwear-inspired activewear, climbing first". Its cornerstone question is "which workwear elements coincide with sportswear?". The note's own finding is that the documented overlap is narrow (reinforcement vocabulary, the action back, the gusset reached separately, borrowed garments), and it proposes, for the owner to accept or reject, a framing in problem logic: reinforce where the body wears, release where it moves, make it repairable. Hypotheses there are explicitly untested with climbers. The idea note `bank/Ideas/Reinforce Where the Body Wears, Release Where It Moves.md` carries it forward.
- The owner reviews every draft and corrects prose closely. Those corrections are logged in [[writing/lessons]] and have repeatedly been promoted into the framework (stance style, patina, negative parallelism, endings).
- The owner's taste in makers is recorded in saved memory and summarised in [[content/topics-and-categories]].

## How a reader meets a post

Brief, for context only; not a dev guide.

- `/journal` is a grid feed with infinite scroll and debounced search. Cards reveal the excerpt on hover.
- A post page shows the category (drawn as radial text in a circle), title, date, the prose, tags as chips, and a **References** list built from the `references` post meta. This is why every post needs `references` filled with `{title, url}` pairs: readers see them.
- **Visual Lookup:** a reader selects text in a post and gets image and web results. The post's `search_context` meta (3 to 6 broad words such as "garments fashion workwear heritage") is appended to every query to keep results in the fashion and craft world. Rules for the field are in `.claude/skills/generate-posts/SKILL.md`. The Brave Search variant was noted as "parked" in commit 9ade48f.
- `related_posts` (slugs) are stored as WordPress meta and fetched by the frontend service layer. Whether they are rendered on the post page was not confirmed in this scan.

## Current state (counted 2026-10-11)

- `bank/Posts/` holds 45 notes: 43 published, 2 drafts ("Cashmere - What One Goat Produces in a Year", "The Patent That Fixed the Sweatshirt").
- Published by category: Garments 16, Materials 10, Culture 5, Technique 4, Design 4, History 4.
- **Two Harrington posts are both published**: the short 2025 piece (wp_id 30) and the 2026-04-23 rewrite (wp_id 99). The rewrite was presumably meant to replace the old one (inferred).
- **Source coverage is the main debt.** 31 of 43 published posts have `sources: []` and no research note. 25 of them are short pieces of roughly 175 to 250 words that predate the vault (the vault and framework were added in the commit of 2026-04-10, so posts dated earlier were migrated from WordPress). Six more are 420 to 490 word posts from the 2026-04-10 batch, also unsourced.
- 12 posts are researched long-form (about 770 to 1,480 words) with a research note in `bank/Research/` and source notes.
- `bank/Ideas/` holds 73 notes: 66 pending, 7 marked published, none rejected. Some statuses are stale (see [[content/topics-and-categories]]).
- `bank/Sources/References/` holds 157 notes (114 complete, 9 stubs, 12 with empty `used_in`); `bank/Sources/Publications/` holds 73.
- Cadence: a burst of rewrites and new posts in April 2026, the Bib Overall (29 May) and Cotton Voile (1 June), then nothing until the sweatshirt draft on 11 October. Feed briefings show the same gap (4 June, then 10 October).

## Notable gaps

- No sportswear post yet, despite the largest research note in the vault (the workwear and sportswear note) being about it. The sweatshirt draft is the first.
- Technique, Design and History are thin compared with Garments and Materials, while the idea bank holds 15 Technique ideas.
- No post on footwear since the short pre-vault pieces (Goodyear welt, hand-welting, shell cordovan), and none on bags, though Carryology is a tracked source.
- Duplicate topics risk: the idea bank has pairs on broken twill, HBT and kakishibu.

## Open questions for the owner

1. Who is the intended reader beyond the owner: makers and designers, enthusiasts, or a general menswear audience? Nothing in the repo states it.
2. Is there a publishing cadence goal, and is the June to October pause intentional?
3. Should the old Harrington post (wp_id 30) be unpublished or redirected to the rewrite?
4. Is the climbing activewear brief a private design project, a future Crafta product line, or both, and should posts written from it say so?
5. Should the 25 short pre-vault posts be rewritten, merged or retired? `/triage` defines the process but no decision is recorded.
