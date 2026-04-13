const WP_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8080";

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: string
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = "HttpError";
  }
}

export class ConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConnectionError";
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildUrl(endpoint: string, params?: QueryParams): string {
  const url = new URL(`${WP_BASE}/index.php`);
  url.searchParams.set("rest_route", endpoint);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function get<T>(
  endpoint: string,
  params?: QueryParams
): Promise<{ data: T; headers: Headers }> {
  const url = buildUrl(endpoint, params);

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw new ConnectionError(
      `Could not connect to WordPress at ${WP_BASE}. Is the backend running?`
    );
  }

  if (!res.ok) {
    const body = await res.text();
    throw new HttpError(res.status, res.statusText, body);
  }

  const data: T = await res.json();
  return { data, headers: res.headers };
}
