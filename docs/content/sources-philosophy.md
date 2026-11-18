---
title: Sources Philosophy
type: synthesis
created: 2026-10-11
updated: 2026-10-11
last_verified: 2026-10-11
---

# Sources Philosophy

What Crafta values in evidence and why, drawn from the research protocol, the source notes and how recent posts actually handled their sources. The rules themselves live in `.claude/research-protocol.md` (tiers, triangulation, footnoting, cache, bidirectional chain) and `.claude/skills/source/SKILL.md` (source note format); this page does not restate them and loses any disagreement with them or with [[writing/editorial-framework]]. Related: [[about-crafta]], [[content/topics-and-categories]], [[writing/lessons]].

## Why sources matter here

A post is a learning note that later feeds design decisions ([[about-crafta]]). A wrong date or an invented construction detail would carry into that work, so the vault keeps the trail from every claim back to the document it came from. The protocol puts it as "Research without footnotes is assertions."

## The tier model in one paragraph

T1 is the maker, the archive or the first-person record (patents, trade catalogues, museum object records, maker histories). T2 is specialist publishing with editorial standards (Heddels, Permanent Style, Bryceland's, peer-reviewed papers). T3 is general fashion media; T4 is encyclopedias and forums, leads only. Research order runs T1 first. Full table and usage in `.claude/research-protocol.md`.

## How the tiers work in practice

- **Primary text beats everyone's account of it, including the maker's.** In the sweatshirt draft Champion's heritage page dates Reverse Weave "invented 1934, applied 1938, granted 1952"; the two patents show grants in 1938 and 1952, and the post follows the patents. A maker's corporate history is T1 for what the company says about itself, and is labelled a "maker claim" when it conflicts with a document (Russell's 1926 and 1930 dates against Heddels' 1920).
- **Patents and archive catalogues are the strongest evidence Crafta has used.** The bib overall rests on the 1873 rivet patent, Carhartt's 1915 patent and the 1929 Sears catalogue; the sweatshirt rests on two Champion patents and the 1901 Wright & Ditson and 1917 Spalding catalogues. They give the maker's own statement of the problem being solved, which is what the Crafta ending ("the garment as a record of problems solved") needs.
- **A patent proves a date and a construction, not a "first".** The Google Patents publication note says so, and the workwear research note shows why: Gramicci's gusset patent (1987) post-dates the brand's start and "cannot settle priority".
- **Museum records are T1 but thin.** V&A record text is brief and fields are often empty; note the accession number and say the detail is thin.
- **Academic papers are T2, and some are abstract-only stubs.** The workwear research leans on *Sport in History* and *Contemporary British History*; abstracts are flagged as such.

## Which publications are trusted for what

From the publication notes in `bank/Sources/Publications/` (73 notes; tiers recorded on the newer ones: 22 T1, 15 T2, 8 T3, 6 T4).

- **Heddels (T2):** the workhorse. Specifics on denim, workwear, fabric weights and brand histories. The publication note frames Crafta's opportunity as going deeper on cultural and historical context than Heddels' product focus. Corroborate its origin claims against T1.
- **Permanent Style (T2):** cloth and tailoring analysis, honest first-person assessment of makers; no RSS, so use `site:` search.
- **Bryceland's Journal (T2):** garment origin stories told by practitioners; tailoring and the space between tailoring and workwear.
- **Carryology:** bags, waxed canvas and patina; used for the canvas research.
- **Nepenthes LA:** recorded as T1 because it is the house behind Engineered Garments, so its "Deep Dive" pieces are maker-side accounts of EG garments. That standing applies to EG design intent, not to general garment history (inferred).
- **Google Patents, Internet Archive, V&A Collections (T1):** see above. Archive OCR is noisy; quote only text that reads cleanly.
- **Selvedge Magazine (T2):** textile arts and dyeing, global in scope. See the scope question in [[content/topics-and-categories]] before following its non-Western leads.
- **Wikipedia (T4):** leads only, never the sole source for an anchor claim. Note that the Cashmere draft lists a Wikipedia note among its sources.

## Japanese sources

Japanese makers and media are treated as first-rank sources, not exotica. Six Japanese-language or Japan-based feeds are tracked; the skills say to translate and adapt the concept, never reproduce. In practice they supply what Western press lacks: Houyhnhnm's report on Champion's Harajuku store is the only source for the reissue construction and price in the sweatshirt draft. Reproduction makers' own documentation (Buzz Rickson's product spec) is used for construction detail but flagged single-source when nothing else confirms it (the CPO's counter-rotated cuff was left out for that reason).

## What counts as weak

- **Retailer and vendor blogs** that restate brand lore ("Russell and Champion as workwear: vendor blogs only" is listed under Not Verified in the workwear research note).
- **Marketplace pages** (resale listings): used only as leads, not cited.
- **Undated or unbylined pages:** the Wear/Ware sweatshirt piece is kept as T3, "low" reliability, and used only for attributed dealer quotes.
- **Fetch summaries.** The fetch tool often returns a summary instead of page text. Claims read that way are second-hand: say so in the research note and the post's Notes ("Industrial washing machines is from a Heddels fetch summary, not verified").
- **OCR fragments** from patents and catalogues: paraphrase instead of quoting a truncated line.
- **Search-result snippets and inferred dates:** the Harajuku reissue year was inferred in the source note, so the post gives no year.

## Anchor claims, single sources and analysis

The triangulation rule (anchor claims need 2+ independent sources, at least one T1 or T2; otherwise mark `[single-source]` and soften) is in the protocol. Practices that recent posts added:

- **Verify the thesis, not only the facts.** The sweatshirt draft first claimed the 1952 patent "fixes the cost" of the 1938 one; reading the patents showed the narrower, supported claim (each answers the shrinkage the previous one left, first in length, then in width). A causal link between two documents is interpretation until the text supports it.
- **Label analysis as analysis.** Reading-across claims in the ending are listed under `## Notes` so they can be checked or cut. The sweatshirt Notes mark "age shows mostly in the dye" as "own inference ... not a sourced claim".
- **Keep both sides of an unresolved dispute.** Research notes carry a "Disputes and Unresolved Points" and a "Not Verified" section; posts attribute both dates rather than choose one.
- **Say when observation is thin.** Do not invent sensory detail to fill a patina paragraph ([[writing/lessons]]); ask the owner for first-hand observation.
- **Language softened to match the evidence:** the CPO post says melton "runs approximately 20-26oz" because no Navy document confirms the weight.

## The source chain

Post `## Sources Referenced` ↔ research note footnotes ↔ source note `used_in`. Defined in the protocol and the `generate-posts` skill. Each `Sources Referenced` line names the specific claim taken ("grant date 9 Aug 1938"), not just the title. The post's `references` frontmatter is what readers see on the site (see [[about-crafta]]), so it lists the strongest, readable URLs.

## A good source note

The `source` skill has the template. The best current examples are `bank/Sources/References/US2126186 Athletic Shirt and Method of Making the Same — Google Patents.md` and `History — Russell Athletic.md`: a summary that says what kind of evidence the page is, 5 to 10 claims with dates, names and quoted wording, and a final line recording conflicts with other sources. Of 157 notes, 9 are still stubs and 12 have empty `used_in`.

## Open questions for the owner

1. Should older publication notes without a `tier` field (Heddels, Carryology, Houyhnhnm) be given one, and is Nepenthes LA's T1 rating intended to cover anything beyond Engineered Garments?
2. Can Wikipedia-backed claims stay in the Cashmere draft if corroborated, or should that note be dropped from its sources?
