import { NextRequest, NextResponse } from "next/server";

interface CacheEntry {
  data: ImageResult[];
  timestamp: number;
}

interface ImageResult {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  title: string;
  sourceUrl: string;
  sourceDomain: string;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 10 * 60 * 1000;

const BLOCKED_DOMAINS = new Set([
  "amazon.com",
  "walmart.com",
  "ebay.com",
  "aliexpress.com",
  "etsy.com",
  "temu.com",
  "shein.com",
  "wish.com",
  "target.com",
  "kohls.com",
  "dhgate.com",
  "alibaba.com",
]);

function isBlocked(source: string): boolean {
  return Array.from(BLOCKED_DOMAINS).some((d) => source.includes(d));
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const desired = Math.min(
    Number(request.nextUrl.searchParams.get("num") ?? 10),
    20
  );

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: "query parameter required" },
      { status: 400 }
    );
  }

  const cacheKey = `${query.toLowerCase().trim()}:${desired}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ images: cached.data });
  }

  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Search not configured" },
      { status: 500 }
    );
  }

  const fetchCount = Math.min(desired * 3, 60);

  const params = new URLSearchParams({
    q: query.trim(),
    count: String(fetchCount),
  });

  try {
    const res = await fetch(
      `https://api.search.brave.com/res/v1/images/search?${params}`,
      {
        headers: {
          Accept: "application/json",
          "X-Subscription-Token": apiKey,
        },
      }
    );

    if (res.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    if (!res.ok) {
      return NextResponse.json({ error: "Search failed" }, { status: 502 });
    }

    const data = await res.json();

    const images: ImageResult[] = (data.results ?? [])
      .filter(
        (item: Record<string, unknown>) => !isBlocked(item.source as string)
      )
      .slice(0, desired)
      .map((item: Record<string, unknown>, i: number) => {
        const thumbnail = item.thumbnail as
          | Record<string, unknown>
          | undefined;
        const properties = item.properties as
          | Record<string, unknown>
          | undefined;
        return {
          id: `${cacheKey}-${i}`,
          imageUrl: (properties?.url as string) ?? (item.url as string),
          thumbnailUrl: (thumbnail?.src as string) ?? (item.url as string),
          title: item.title as string,
          sourceUrl: item.url as string,
          sourceDomain: item.source as string,
        };
      });

    cache.set(cacheKey, { data: images, timestamp: Date.now() });

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: "Search unavailable" }, { status: 502 });
  }
}
