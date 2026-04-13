# RSS Feed Sources

Curated RSS feeds for fashion/design/craft editorial inspiration for Crafta journal.

## Core — Workwear, Denim, Craft
| Source | Feed URL | Domain | Sitemap | Focus |
|---|---|---|---|---|
| Heddels | https://www.heddels.com/feed/ | heddels.com | https://www.heddels.com/sitemap_index.xml | Denim, workwear, heritage brands |
| Long John | https://long-john.nl/feed/ | long-john.nl | https://long-john.nl/sitemap_index.xml | Denim culture, authentic products |
| Archival Clothing | https://archivalblog.com/feed/ | archivalblog.com | https://archivalblog.com/sitemap.xml | Heritage workwear, Japanese craft |
| Denimhunters | https://denimhunters.com/feed/ | denimhunters.com | https://denimhunters.com/sitemap_index.xml | Denim buying guides, shrink-to-fit, selvedge |

## Editorial — Opinion, Culture
| Source | Feed URL | Domain | Sitemap | Focus |
|---|---|---|---|---|
| Rampboy | https://rampboy.com/feed/ | rampboy.com | https://rampboy.com/sitemap.xml | Menswear opinion, indie brands, street style |
| Put This On | https://putthison.com/feed/ | putthison.com | https://putthison.com/sitemap_index.xml | Classic menswear |
| The Gentleman's Journal | — | thegentlemansjournal.com | https://www.thegentlemansjournal.com/sitemap.xml | Luxury menswear, watches, lifestyle |
| Stridewise | https://stridewise.com/feed/ | stridewise.com | https://stridewise.com/post-sitemap.xml | Boots, leather, footwear reviews |
| Carryology | — | carryology.com | | Bags, carry goods, waxed canvas, heritage materials |

## Design & Art
| Source | Feed URL | Domain | Sitemap | Focus |
|---|---|---|---|---|
| Designboom | https://www.designboom.com/feed/ | designboom.com | | Design, art, architecture |

## Japanese Sources
| Source | Feed URL | Domain | Sitemap | Focus |
|---|---|---|---|---|
| Houyhnhnm (フイナム) | https://www.houyhnhnm.jp/feed | houyhnhnm.jp | | Fashion, lifestyle, vintage, heritage (JP) |
| Directors (FUJITO旗艦店) | https://directors1.blogspot.com/feeds/posts/default?alt=rss | directors1.blogspot.com | | Japanese fashion, FUJITO brand (JP) |
| EYESCREAM | https://www.eyescream.jp/feed/ | eyescream.jp | | Japanese subculture, fashion, music (JP) |
| Popeye Magazine | https://popeyemagazine.jp/feed/ | popeyemagazine.jp | | City boy lifestyle, small brands, culture (JP) |

## Research Depth Levels

Each source can be researched at three levels of depth:

1. **RSS feed** (fastest) — latest 10-15 articles. Use for "what's new right now."
2. **Web search** `site:<domain>` (medium) — Google-indexed articles. Use for "what have they written about X."
3. **Sitemap** (deepest) — complete article directory. Use for comprehensive gap analysis, topic counting, and exhaustive research. Parse the sitemap index to find post sitemaps, then extract all article URLs and titles.

## Sitemap Usage

When a sitemap URL is available:
- Fetch the sitemap index XML to find post sitemap URLs (e.g. `post-sitemap.xml` through `post-sitemap11.xml`)
- Fetch individual post sitemaps to extract all `<loc>` URLs
- Extract article titles from URLs (slug → title: `/the-history-of-seersucker/` → "The History of Seersucker")
- Use for: topic gap analysis, counting coverage by keyword, finding every article on a subject

**Note:** Sitemaps give URLs and dates, not full content. To read an article, fetch the URL separately.

## How to Find Sitemaps

Most WordPress sites have sitemaps at:
- `/sitemap_index.xml` (Yoast SEO)
- `/sitemap.xml`
- `/wp-sitemap.xml` (WordPress core)

When adding a new feed via `/manage-feeds add`, also check for a sitemap and add it to the Sitemap column.

Managed via `/manage-feeds` skill.
