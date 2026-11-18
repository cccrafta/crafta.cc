---
title: Brand Tiers — How Crafta Scores a Brand
type: rubric
created: 2026-11-17
updated: 2026-11-17
---

## What this is

One note per brand lives in `bank/Brands/`. Each note scores the brand on ten dimensions: four from Observation in the editorial framework (`docs/writing/editorial-framework.md`), three from Transformation (living function, depth, relevance), one from Stance, one for fit with Crafta's threads, and one for the design itself, judged on taste. Nine dimensions read the evidence in the vault; Design is the one taste score, and the owner's call overrides it. The rubric is on this page; if a brand note disagrees with it, this page wins. The index of all brands, sorted by score, is [[Brands/_Index]].

Taste behind the rubric (from `AGENTS.md`): valued are makers with real production lineage, Japanese craft makers, small-batch material makers and tailoring houses. Not valued are luxury labels used for cachet, fast fashion, "heritage" branding without production history, and brand story louder than construction. Indian-subcontinent and Middle Eastern brands are out of scope and get no note.

## The ten dimensions (0-5 each, total 50)

| Dimension | Lens | 0 | 3 | 5 |
|---|---|---|---|---|
| **Lineage** | Observation: history, origin | No production history; story bought or invented | Real history, but the current company is a licence or a revival with a gap | Has made the thing continuously, for a real use, from a documented origin |
| **Making** | Observation: tectonics, craft context | Unknown factories, no construction detail | Named production country or partner; some construction stated | Owns or names its workshops; construction is specified and visible (in-house sewing, hand work, bespoke) |
| **Material** | Observation: materiality, material criticality | Cloth is generic or unstated | Named fabrics, some weights or mills | Cloth chosen for function and documented (named mills, weights, own finishes or own cloth); material is not interchangeable |
| **Patina** | Observation: patina | Designed to look the same until it fails | Ages acceptably; no care or repair offer | Built to age and to be maintained: rewaxing, reproofing, repair, resoling, re-cutting |
| **Living function** | Transformation | Costume or logo product; the original use is gone | Reinterprets old patterns, mostly as style | Still serves its original use, or reinterprets with a stated design reason |
| **Design** | Taste | Dull, logo-led, or trend-chasing; nothing the owner would wear or study | Good-looking versions of known pieces; safe | The pieces look right and feel distinct: a clear eye, proportions and details the owner wants to wear and take apart (Engineered Garments, Kapital, Kaptain Sunshine level) |
| **Depth** | Transformation: then vs now | Nothing to study beyond the product page | Some history or a few documented techniques | A deep well: long archive, documented techniques or cloths, a maker's knowledge worth a research note on its own |
| **Relevance** | Transformation: multiple perspectives | Invisible to trusted sources, or talked about only through hype | Covered by one or two trusted sources, or relevant to a niche | Matters now: covered repeatedly by trusted sources, worn and argued over, shaping what other makers do; critical verdicts lower the score |
| **Integrity** | Stance | Story louder than construction, cachet pricing, fast fashion, greenwashing | Mixed: good core line with licensing or collab churn around it | Form follows purpose; claims match the product |
| **Thread** | Crafta fit | Unrelated to Crafta's subjects | Touches one thread | Central to two or more threads: workwear construction, denim and mills, fabric as engineering, repair and maintenance, military-to-civilian lineage, function-driven garments for work and sport (the body under load) |

## Tiers

| Tier | Score | Meaning |
|---|---|---|
| **1 — Reference** | 41-50 | Study and cite as a model. A post can lean on this brand's own record. |
| **2 — Respected** | 31-40 | Good making with a real reason behind it; worth covering, check claims. |
| **3 — Watch** | 21-30 | Good pieces, but thin evidence, partial integrity, or style over use. |
| **4 — Context** | 0-20 | Covered in the vault for context only. Not valued; never held up as a model. |

Gates (apply after the sum):
- **Integrity 0-1 caps the brand at Tier 3**, whatever the total.
- **`evidence: provisional` caps the brand at Tier 2.** A brand reaches Tier 1 only when its score rests on vault sources (`sourced` or `partial`).
- Materials suppliers and mills (`kind: mill` or `material`) score Living function on whether the cloth still serves its use, and Patina on how the cloth ages.

## Design is a taste score

Design is scored against the owner's taste as recorded in `AGENTS.md` (Japanese craft makers, workwear construction, function-driven garments, small-batch makers; not luxury cachet or brand story). It is the only dimension not settled by sources. A Claude score sets `design_by: claude`; when the owner gives a score, set `design_by: owner` and never change it without the owner.

## Trusted sources (for Relevance)

Relevance counts only the verdicts of sources Crafta trusts: the publications in `.claude/feeds.md` (Heddels, Long John, Archival Clothing, Denimhunters, Rampboy, Put This On, Stridewise, Carryology, Permanent Style, Bryceland's Journal, The Vintage Showroom, Nepenthes, the Japanese feeds) plus T1 archives (V&A, IWM, museums) and T2 specialists in `.claude/research-protocol.md` (The Rake, Standard & Strange, Selvedge Magazine, peer-reviewed papers). Hypebeast, Highsnobiety, GQ and retailer copy are T3: they show that a brand is talked about, not that it is good, and they never lift Relevance above 2 on their own. A brand's own claims are T1 for what it makes, never for how good it is. Each brand note summarises the verdicts under `## What Trusted Sources Say`, one line per source, footnoted, with the source's position (praise, mixed, critical) and what it praised or criticised.

## Evidence levels

- **sourced**: most dimension reasons footnote notes in `bank/Sources/References/`.
- **partial**: some reasons are sourced, others marked `[unsourced]`.
- **provisional**: scored from general knowledge only; every reason is `[unsourced]`. Raise to partial or sourced with `/source` before citing the brand in a post.

## Calibration anchors

- **Barbour** (anchor for Tier 1): lineage 5 (South Shields, 1894; motorcycle and submarine suits), making 4 (South Shields factory for core waxed jackets; much of the rest made in Portugal, Turkey, Bulgaria), material 5 (own waxed cotton; the cloth is the reason the jacket works), patina 5 (rewaxing and repair service at South Shields), living 4 (still worn for field and weather; Heritage+ reissues), design 4 (Bedale and Beaufort look right and are widely copied; much of the wider range is safe), depth 5 (130-year archive, motorcycle and submarine suits, own wax), relevance 5 (Heddels brand profile, Put This On, Gear Patrol, Permanent Style; A.P.C. and Levi's collaborations), integrity 4 (collaboration churn around a sound core), thread 5. Total 46.
- **A licence-era heritage label** (anchor for Tier 4): old name, production outsourced and undisclosed, logo-led product, story louder than construction. Lineage 2, making 1, material 1, patina 1, living 1, design 1, depth 1, relevance 2, integrity 1, thread 1. Total 12.

## Re-scoring

Re-score a brand when new source notes change a dimension. Change the frontmatter `scores`, `score`, `tier` and `updated`, and add one line under `## Score history` in the brand note saying what changed and why.
