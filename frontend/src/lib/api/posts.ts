import { get } from "@/lib/http-client";
import type {
  WPPost,
  WPPostsParams,
  WPPaginatedResponse,
} from "@/lib/types/wordpress";

export async function getPosts(
  params?: WPPostsParams
): Promise<WPPaginatedResponse<WPPost>> {
  const { data, headers } = await get<WPPost[]>("/wp/v2/posts/", {
    _embed: true,
    ...params,
  });

  return {
    data,
    total: Number(headers.get("X-WP-Total") ?? 0),
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 0),
  };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const { data } = await get<WPPost[]>("/wp/v2/posts/", {
    slug,
    _embed: true,
  });

  return data[0] ?? null;
}
