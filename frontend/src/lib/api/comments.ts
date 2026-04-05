import { get } from "@/lib/http-client";
import type {
  WPComment,
  WPCommentsParams,
  WPPaginatedResponse,
} from "@/lib/types/wordpress";

export async function getCommentsByPost(
  postId: number,
  params?: Omit<WPCommentsParams, "post">
): Promise<WPPaginatedResponse<WPComment>> {
  const { data, headers } = await get<WPComment[]>("/wp/v2/comments/", {
    post: postId,
    ...params,
  });

  return {
    data,
    total: Number(headers.get("X-WP-Total") ?? 0),
    totalPages: Number(headers.get("X-WP-TotalPages") ?? 0),
  };
}
