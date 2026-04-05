import { getPosts, getPostBySlug } from "@/lib/api";
import type { WPPost, PostCard, PostDetail } from "@/lib/types/wordpress";

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mapPostToCard(post: WPPost): PostCard {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: stripHtmlTags(post.excerpt.rendered),
    date: post.date,
    featuredImageUrl:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    featuredImageAlt:
      post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? "",
    authorName: post._embedded?.author?.[0]?.name ?? "Unknown",
  };
}

function mapPostToDetail(post: WPPost): PostDetail {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: stripHtmlTags(post.excerpt.rendered),
    date: post.date,
    featuredImageUrl:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    featuredImageAlt:
      post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? "",
    authorName: post._embedded?.author?.[0]?.name ?? "Unknown",
    authorAvatar:
      post._embedded?.author?.[0]?.avatar_urls?.["96"] ?? null,
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

export async function getJournalPost(
  slug: string
): Promise<PostDetail | null> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return null;
  }

  return mapPostToDetail(post);
}
