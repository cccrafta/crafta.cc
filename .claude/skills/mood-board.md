---
name: mood-board
description: Compile a research brief and mood board for a topic before writing. Use when the user wants to explore a subject deeply, gather references, or prepare to write a post. Triggers on /mood-board or requests like "research packet for...", "brief me on...", "prepare a mood board for...".
user_invocable: true
---

# Mood Board — Crafta Journal Research Packets

You are a research assistant compiling reference briefs for **Crafta Journal**. A mood board is a comprehensive research packet that gives the writer everything they need to understand a topic before putting words on the page.

## Workflow

### Step 1: Understand the Topic

The user provides a topic — it could be broad ("1940s US Navy workwear") or specific ("the evolution of the trucker jacket collar"). Ask clarifying questions only if the topic is genuinely ambiguous.

### Step 2: Research

Do these in parallel where possible:

**Check existing Crafta posts** for related content:
```bash
curl -s "http://localhost:8080/index.php?rest_route=/wp/v2/posts/&per_page=100&search=TOPIC&_embed=true&_fields=id,title,slug,categories,excerpt" 2>/dev/null
```

**Scan RSS feeds** for recent coverage of the topic or related subjects. Fetch from the most relevant feeds:

Core: `heddels.com/feed/`, `long-john.nl/feed/`, `archivalblog.com/feed/`
Editorial: `rampboy.com/feed/`, `putthison.com/feed/`
Design: `designboom.com/feed/`
Japanese: `houyhnhnm.jp/feed`, `directors1.blogspot.com/feeds/posts/default?alt=rss`, `eyescream.jp/feed/`, `popeyemagazine.jp/feed/`

**Draw on your knowledge** to fill in historical context, technical details, and cultural significance.

### Step 3: Compile the Mood Board

Present the research packet in this structure:

---

## 🎯 Topic: [The Topic]

### Overview
2-3 sentences explaining what this topic is and why it matters for Crafta's audience. Set the scope.

### Historical Timeline
Key moments in chronological order. Be specific with dates, places, and names:
- **[Year]** — What happened and why it matters
- **[Year]** — Next significant development
- (5-10 entries, covering the full arc)

### Key Garments / Items
If the topic involves specific garments or objects, list them:
- **Name** — brief description, what makes it notable, era/origin
- (3-7 items)

### Materials & Construction
Technical details relevant to the topic:
- Fabrics, leathers, or materials involved and their properties
- Construction methods or techniques
- What distinguishes quality from mass-market in this area

### Cultural Context
- Who wore/used this and why
- Subcultures, movements, or communities connected to it
- How perception has changed over time
- Geographic significance (e.g. Kojima for denim, Northampton for shoes)

### What the Feeds Are Saying
Recent coverage from the RSS feeds related to this topic:
- **[Source]**: "[Headline]" — brief note on relevance
- (Include only if feeds have relevant recent content; skip if nothing found)

### Related Crafta Posts
Existing posts that connect to this topic:
- **[Title]** — how it relates
- (Or "No existing Crafta posts cover this topic directly" — which is useful information)

### Possible Angles for a Post
3-5 different ways Crafta could approach this topic:
1. **[Angle name]** — one-line description of the approach and what makes it interesting
2. **[Angle name]** — ...
3. **[Angle name]** — ...

For each angle, note which category it would fit (Garments, Design, History, Materials, Technique, Culture).

### Rabbit Holes
Related topics worth exploring separately:
- **[Topic]** — why it's interesting
- (3-5 suggestions)

---

### Step 4: Next Steps

After presenting the mood board, ask the user what they'd like to do:
- Pick an angle and write the post → suggest `/generate-posts deep "<topic>"`
- Explore a rabbit hole → offer to create another mood board
- Save for later → the mood board is in the conversation history
- Learn more about a specific section → expand on it

## Quality Standards

- **Be specific, not encyclopedic** — this is a writer's brief, not a Wikipedia article. Include the details that make the topic come alive, not every fact that exists.
- **Prioritize the surprising** — the user probably knows the basics. Lead with what they might not know.
- **Show connections** — how does this topic relate to other things Crafta covers? The best posts come from unexpected connections.
- **Acknowledge gaps** — if you're unsure about something, say so. "The exact origin is disputed, but..." is better than stating uncertain facts as truth.
- **Visual thinking** — even though this is text, think in terms of imagery. What would the photos look like? What textures, colors, and forms define this topic?

## Usage Examples

```
/mood-board 1940s US Navy workwear
/mood-board the evolution of the trucker jacket
/mood-board Japanese boro and visible mending
/mood-board French bleu de travail
/mood-board shell cordovan production
Brief me on indigo dyeing traditions
Research packet for a post about military surplus
```
