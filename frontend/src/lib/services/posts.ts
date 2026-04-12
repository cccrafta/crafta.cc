import { getPosts, getPostBySlug, getPostsByIds, getPostsByTags } from "@/lib/api";
import type { WPPost, PostCard, PostDetail } from "@/lib/types/wordpress";

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
  };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&(?:amp|lt|gt|quot|#039|apos);/g, (match) => entities[match]);
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mapPostToCard(post: WPPost): PostCard {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    excerpt: decodeHtmlEntities(stripHtmlTags(post.excerpt.rendered)),
    date: post.date,
    featuredImageUrl:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    featuredImageAlt:
      post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? "",
    authorName: post._embedded?.author?.[0]?.name ?? "Unknown",
    categories:
      post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) ?? [],
    tags:
      post._embedded?.["wp:term"]?.[1]?.map((t) => t.name) ?? [],
  };
}

function mapPostToDetail(post: WPPost): PostDetail {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    content: post.content.rendered,
    excerpt: decodeHtmlEntities(stripHtmlTags(post.excerpt.rendered)),
    date: post.date,
    featuredImageUrl:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    featuredImageAlt:
      post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? "",
    authorName: post._embedded?.author?.[0]?.name ?? "Unknown",
    authorAvatar:
      post._embedded?.author?.[0]?.avatar_urls?.["96"] ?? null,
    tags:
      post._embedded?.["wp:term"]?.[1]?.map((t) => t.name) ?? [],
    references: post.meta?.references ?? [],
    manualRelatedIds: post.meta?.related_posts ?? [],
    tagIds: post.tags ?? [],
  };
}

export async function getJournalFeed(
  page?: number,
  perPage?: number
): Promise<{
  posts: PostCard[];
  totalPages: number;
  currentPage: number;
}> {
  const response = await getPosts({ page, per_page: perPage });

  return {
    posts: response.data.map(mapPostToCard),
    totalPages: response.totalPages,
    currentPage: page ?? 1,
  };
}

export async function searchJournal(
  query?: string,
  categoryId?: number,
  page?: number,
  perPage?: number
): Promise<{
  posts: PostCard[];
  totalPages: number;
  currentPage: number;
}> {
  const response = await getPosts({
    search: query || undefined,
    categories: categoryId || undefined,
    page,
    per_page: perPage,
  });

  return {
    posts: response.data.map(mapPostToCard),
    totalPages: response.totalPages,
    currentPage: page ?? 1,
  };
}

export async function getJournalPost(
  slug: string
): Promise<PostDetail | null> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return null;
  }

  return mapPostToDetail(post);
}

export async function getRelatedPosts(
  postId: number,
  manualRelatedIds: number[],
  tagIds: number[],
  limit: number = 3
): Promise<PostCard[]> {
  const results: PostCard[] = [];

  // Manual relations first
  if (manualRelatedIds.length > 0) {
    const manualPosts = await getPostsByIds(manualRelatedIds);
    results.push(...manualPosts.map(mapPostToCard));
    if (results.length >= limit) {
      return results.slice(0, limit);
    }
  }

  // Tag-based fallback
  if (tagIds.length > 0) {
    const remaining = limit - results.length;
    const excludeIds = [postId, ...manualRelatedIds];
    const candidates = await getPostsByTags(tagIds, postId, remaining * 2);

    // Rank by tag overlap
    const currentTagSet = new Set(tagIds);
    const ranked = candidates
      .filter((p) => !excludeIds.includes(p.id))
      .map((p) => ({
        post: p,
        overlap: p.tags.filter((t) => currentTagSet.has(t)).length,
      }))
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, remaining)
      .map((r) => mapPostToCard(r.post));

    results.push(...ranked);
  }

  return results.slice(0, limit);
}

export async function getJournalPostWithRelated(
  slug: string
): Promise<{ post: PostDetail; relatedPosts: PostCard[] } | null> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const detail = mapPostToDetail(post);
  const relatedPosts = await getRelatedPosts(
    post.id,
    detail.manualRelatedIds,
    detail.tagIds
  );

  return { post: detail, relatedPosts };
}
