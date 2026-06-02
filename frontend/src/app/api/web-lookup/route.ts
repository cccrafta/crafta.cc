import { NextRequest, NextResponse } from "next/server";

interface CacheEntry {
  data: WebResult[];
  timestamp: number;
}

interface WebResult {
  id: string;
  title: string;
  url: string;
  domain: string;
  description: string;
  favicon: string;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 10 * 60 * 1000;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const count = Math.min(
    Number(request.nextUrl.searchParams.get("num") ?? 8),
    20
  );

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: "query parameter required" },
      { status: 400 }
    );
  }

  const cacheKey = `${query.toLowerCase().trim()}:${count}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ results: cached.data });
  }

  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Search not configured" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    q: query.trim(),
    count: String(count),
  });

  try {
    const res = await fetch(
      `https://api.search.brave.com/res/v1/web/search?${params}`,
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

    const results: WebResult[] = (data.web?.results ?? []).map(
      (item: Record<string, unknown>, i: number) => {
        const metaUrl = item.meta_url as Record<string, unknown> | undefined;
        return {
          id: `${cacheKey}-${i}`,
          title: item.title as string,
          url: item.url as string,
          domain: (metaUrl?.hostname as string) ?? "",
          description: item.description as string,
          favicon: (metaUrl?.favicon as string) ?? "",
        };
      }
    );

    cache.set(cacheKey, { data: results, timestamp: Date.now() });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Search unavailable" }, { status: 502 });
  }
}
