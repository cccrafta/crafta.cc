import { getCommentsByPost } from "@/lib/api";
import type { WPComment, CommentView } from "@/lib/types/wordpress";

function mapCommentToView(comment: WPComment): CommentView {
  return {
    id: comment.id,
    authorName: comment.author_name,
    authorAvatar: comment.author_avatar_urls?.["48"] ?? null,
    date: comment.date,
    content: comment.content.rendered,
    parentId: comment.parent,
  };
}

export async function getPostComments(
  postId: number
): Promise<CommentView[]> {
  const response = await getCommentsByPost(postId);

  return response.data.map(mapCommentToView);
}
