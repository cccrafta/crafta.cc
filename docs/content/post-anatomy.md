---
title: Post Anatomy
type: synthesis
created: 2026-10-11
updated: 2026-10-11
last_verified: 2026-10-11
---

# Post Anatomy

What Crafta posts actually look like, and which ones to model on. The rules for writing are in [[writing/editorial-framework]] (it wins any disagreement) and the corrections behind them in [[writing/lessons]]; the vault note template and audit checklist are in `.claude/skills/generate-posts/SKILL.md`. Related: [[about-crafta]], [[content/topics-and-categories]], [[content/sources-philosophy]].

## Three generations of posts

Word counts are of the `## Content` section, counted 2026-10-11.

1. **Pre-vault shorts** (25 posts, dated July 2025 to March 2026, about 175 to 250 words). Migrated from WordPress with `sources: []`, no research note, generic excerpts ("How a rural Japanese reinforcement technique became a global movement"). They predate the framework and are the main target of `/triage`.
2. **The April 2026 batch** (6 posts dated 2026-04-09/10, 420 to 490 words: chambray, ramie, seersucker, summer weight, tropical wool, overshirt vs chore coat). Longer, still unsourced.
3. **Researched long-form** (12 posts, about 770 to 1,480 words). Each has a research note, source notes, `references`, `related_posts` and often a `## Notes` section on evidence quality. Some carry old `created` dates because they are rewrites of earlier posts (canvas, CPO, Breton stripe, safari jacket, tuxedo).

The framework sets 500 to 700 words standard and 1,000 to 2,000 for a deep dive. Most researched posts are deep dives; the sweatshirt draft (about 660 words) is the first researched post written to the standard length.

## Exemplars and why they work

- **`bank/Posts/The Patent That Fixed the Sweatshirt.md`** (draft, Garments, standard length). The framework names its last two paragraphs as the reference ending: where the garment stands now (offshore blends, Tokyo reissues, the gusset moving into tailoring), then what the design is ("a reissue of a repair"). The body is built on two patents read directly, and its Notes list every weak point (single-source dates, a fetch-summary claim, thin patina). Note that its opening paragraph still ends with "This piece follows those two fixes", the announcing pattern that [[writing/lessons]] warns against; check the current draft before copying the opener.
- **`bank/Posts/The CPO Shirt - When a Shirt Becomes a Jacket.md`** (Garments, rewritten 2026-06-02). Opens on a tactile observation (the weight does not match the silhouette), builds a material-criticality argument from fabric weights (below 18oz it is an overshirt, above 28oz a coat), gives patina its own paragraph even though melton barely changes visibly, and uses contemporary makers as evidence of how far the name has travelled from the spec.
- **`bank/Posts/The Bib Overall - Engineering a Garment from First Principles.md`** (Garments, deep dive). Shows the "accumulated repairs" argument run through T1 documents (1873, 1890, 1896, 1915 patents; the 1929 Sears catalogue), with a patina paragraph that reads the wear pattern as engineering.

## Older posts are not style models

Several researched posts were written before later rules were added and break them. Use them for structure and research depth, not sentence habits:

- Moleskin opens and closes on negative parallelism ("No blend, no coating, no synthetic treatment"; "No synthetic coating, no lamination, no blended fiber. Just...") and ends on a general claim about craft, which the stance rules now forbid.
- The Bib Overall's last paragraph is a recap of the sequence the body told, which [[writing/lessons]] now rules out, and it uses "is not irony, it's a continuation".
- Em-dash density is high in the April 2026 posts compared with the October draft.

## Recurring shape of a long post

Observed across the researched posts (inferred pattern, not a rule):

1. A concrete opener: an object in the hand (CPO weight, Harrington tartan lining, the rule pocket on an overall) or a failure (the sweatshirt shrinking).
2. Origin, with dates and named people from the strongest source available.
3. Construction and material criticality: why this fabric, this weight, this seam.
4. Adoption and meaning: who wore it and why, with icons only when the reason is known (Pacino's costume designer chose the CPO because the character had come back from sea).
5. Patina, as its own paragraph or folded into construction.
6. Contemporary makers, usually including Japanese reproduction houses, as evidence the design still works.
7. The ending: where it stands now, then what the design records (see the framework).

## Vault note conventions seen in practice

- `## Notes` at the end of a post note records evidence status, single-source claims, deliberate omissions and links to ideas spun off. This is where analysis is labelled as analysis ([[content/sources-philosophy]]).
- Moleskin's note also carries a `triage:` block of scores from 2026-04-11; no other post has one.
- Titles in the vault filename and in `title:` frontmatter can differ (CPO: "When a Shirt Becomes a Jacket" in the filename, "The Gap Between Shirt and Jacket" in the title). WordPress slugs follow the original title, and some carry a `-2` suffix from republishing, so look up slugs in WordPress before filling `related_posts`.
