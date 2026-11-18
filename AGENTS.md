---
title: Working on Crafta — Agent Guide
updated: 2026-10-11
last_verified: 2026-10-11
---

# Working on Crafta — Agent Guide

How to work with the owner of this repo. `CLAUDE.md` covers *what* the system is (stack, vault layout, skills, publish commands). This file covers *how* to work in it. If they disagree on facts, check the code or vault. If they disagree on rules, the more specific file wins: `docs/writing/editorial-framework.md` for prose, `.claude/research-protocol.md` for research, each skill for its own steps.

Subagents do **not** load memory. Every rule a research or writing agent needs must be in a repo file or in the brief you give it. Durable rules belong here or in `docs/`, never only in memory.

## What this repo is for

Crafta is a study practice that also publishes. The owner researches garments, materials and craft to **learn**. The vault (`bank/`) is the main product; WordPress is where some of it ends up. Three outputs are fed by the same research:

1. **Articles**: editorial posts, drafted in `bank/Posts/`, published to WordPress only after explicit approval.
2. **Knowledge**: research notes, source notes, ideas. Worth building even when no post comes out of it.
3. **A collection philosophy**: the owner is developing workwear-inspired activewear (climbing, the body under load) out of this research. Keep design hypotheses in `bank/Research/` or `bank/Ideas/`, tag them `untested`, and never present them as facts in a post.

When a request is ambiguous between these, recommend one and ask once. Do not stall on it.

## Scope and taste

- **In scope:** Japanese, Southeast Asian, British, French, Italian, Irish, American, West African, other European and East Asian traditions.
- **Out of scope:** Indian subcontinent and Middle Eastern topics, makers and sources. Skip them in feed scans, briefings, ideas and research. Do not suggest them.
- **Valued:** makers with real production lineage (Barbour, Filson, Carhartt, Saint James), Japanese craft makers (UES, Kaptain Sunshine, Studio D'Artisan), small-batch material makers (Halley Stevensons, British Millerain), tailoring houses (Henry Poole, Anderson & Sheppard).
- **Not valued:** luxury labels used for cachet, fast fashion, "heritage" branding without production history, brand story louder than construction.
- **Current interests:** construction logic of workwear, denim and mills, fabric as engineering, repair and maintenance, military-to-civilian lineage, and the newest thread: function-driven garments across work and sport.

## Modes of work

Identify the mode first. Each has a different "done".

| Mode | Typical ask | Done when |
|---|---|---|
| **Learn** | "I want to learn something new", "tell me about X", "deepen your research" | Research note in `bank/Research/` with footnotes, source notes saved, cache note updated, rabbit holes saved as Ideas, short summary in chat |
| **Brainstorm** | "what should I write about", feed scan, weekly briefing | Briefing in `bank/Feeds/`, ideas in `bank/Ideas/` with full frontmatter, 3-5 ranked picks in chat |
| **Write** | "write a post about X", "rewrite this" | Pitch approved, draft shown in chat, saved to `bank/Posts/`, owner approves in Obsidian |
| **Publish** | "publish it" | Only on explicit instruction. Run the skill's Step 8 and the verify curl, then update the vault note |
| **Maintain** | "check my posts", "did you save everything", "make the repo remember X" | Vault consistent, rule written to the right repo file |

Skills: Learn uses `/mood-board` or `/discover learn`. Brainstorm uses `/discover`, `/idea-bank` or `/editorial-calendar`. Write uses `/generate-posts` then `/humanize`. Maintain uses `/triage` or `/source`.

## Writing: gates that have caused rework

1. **Read `docs/writing/editorial-framework.md` and `docs/writing/lessons.md` in full before drafting any prose**, including rewrites and single paragraphs. Do this every time. A draft written without them was rejected and had to be rewritten from scratch.
2. **Pitch before drafting.** Give angle, one-paragraph summary of what the piece will say, category and key sources. Wait for approval. Lead with a recommendation.
3. **Model split.** Sonnet researches, gathers and diagnoses structure. Opus writes the final prose. Never hand the final draft to a smaller model.
4. **Show the draft in chat first**, then write it to `bank/Posts/`.
5. **Run `/humanize` exhaustively** before the owner sees anything. Check every pattern and report what was found.
6. **Quality bar:** `bank/Posts/The Patent That Fixed the Sweatshirt.md`. It opens on a concrete failure with a small thesis. It anchors claims in primary sources and attributes maker claims as the maker's. It ends on where the subject stands now, what the design reveals, and what transfers to clothing today, looping back to the opener. Its Notes section is honest about thin evidence.
7. **Never invent texture.** If no source describes how something feels, looks or ages, say so in Notes and ask the owner for first-hand observation.

The owner says "observation, transformation, embodiment". **Embodiment** means the framework's **Stance** lens.

## Research: the paper trail is the deliverable

Under-delivery on the vault is the failure the owner keeps catching. Do not scope it down to save effort.

- Every source note links a Publication note that **exists**. Create it if missing, including in subagent briefs.
- Every source note has 3+ extracted claims, or `status: stub`.
- `used_in` is updated on every source note a research note or post cites.
- Every rejected angle and rabbit hole becomes an Idea note.
- Anchor claims follow triangulation in `.claude/research-protocol.md`. Mark your own inference as inference.

**End every research or writing burst with an integrity report, unprompted:** notes created/updated by type, `[[links]]` that do not resolve, Publication notes missing, stubs left, ideas saved. The owner otherwise asks "did you save everything?" three times.

## Delegating to subagents

Research fans out well to parallel Sonnet agents. Every brief must contain:

- The topic, the angle, and what is already in the vault (paths)
- The scope filter above, verbatim
- The source-note and Publication-note requirements above
- `.claude/research-protocol.md` as required reading
- Exactly what to write to the vault, and what to return: counts, paths and gaps, never the working notes

## Making the repo get better

When the owner corrects something, it is a rule. Before the turn ends, write it to the right place and say where:

- **Prose pattern or drafting habit** → `docs/writing/lessons.md` (add the source post and date)
- **Settled principle** → `docs/writing/editorial-framework.md` (only with owner agreement)
- **Research method** → `.claude/research-protocol.md`
- **A skill step that was wrong or missing** → that `SKILL.md`
- **How to work with the owner** → this file

Memory is for pointers and personal facts only. Do not keep a second copy of a rule there.

## Working with the owner

- The owner types fast. ALL CAPS is emphasis, not anger. Read typos for intent ("merfe" means merge). When unclear, ask one short question.
- The owner watches token spend. Read each vault file whole, once. Batch shell calls. At stage boundaries (research saved, about to draft), suggest `/clear` and leave a short handoff note so the next session reads one file, not ten.
- Prefer a recommendation over a list of options.
- **Never** commit, push, publish to WordPress, or create test files without an explicit instruction in the current conversation.
