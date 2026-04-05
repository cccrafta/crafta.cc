import { getPostComments } from "@/lib/services";

export default async function CommentList({ postId }: { postId: number }) {
  const comments = await getPostComments(postId);

  if (comments.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--color-fg-secondary)" }}>
        No comments yet.
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border-l-2 pl-4"
          style={{ borderColor: "var(--color-accent)" }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-fg-secondary)" }}>
            <span className="font-medium" style={{ color: "var(--color-fg)" }}>
              {comment.authorName}
            </span>
            <span>&middot;</span>
            <time dateTime={comment.date} className="text-xs">
              {new Date(comment.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>
          <div
            className="prose prose-sm mt-1 max-w-none"
            style={{ fontFamily: "var(--font-body)" }}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
        </li>
      ))}
    </ul>
  );
}
