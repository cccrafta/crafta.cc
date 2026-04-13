import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getJournalPost } from "@/lib/services";
import PostContent from "@/components/post-content";
import CommentList from "@/components/comment-list";
import { ConnectionError } from "@/lib/http-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await getJournalPost(slug);
    if (!post) {
      return { title: "Not Found" };
    }
    return {
      title: `${post.title} — crafta.cc`,
      description: post.excerpt,
    };
  } catch {
    return { title: "crafta.cc" };
  }
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getJournalPost(slug);
  } catch (error) {
    const message =
      error instanceof ConnectionError
        ? "Unable to connect to the content server."
        : "Something went wrong loading this post.";

    return (
      <div
        className="py-16 text-center"
        style={{ color: "var(--color-fg-secondary)" }}
      >
        <p className="type-title-sm">{message}</p>
        <p className="type-body-sm" style={{ marginTop: "var(--space-sm)" }}>
          Please try again later.
        </p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PostContent post={post} />

      <section
        className="mt-12 pt-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <h2
          className="type-section mb-6"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          Comments
        </h2>
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2 border-l-2 pl-4"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="h-4 w-32 animate-pulse rounded"
                    style={{ backgroundColor: "var(--color-bg-secondary)" }}
                  />
                  <div
                    className="h-3 w-full animate-pulse rounded"
                    style={{ backgroundColor: "var(--color-bg-secondary)" }}
                  />
                </div>
              ))}
            </div>
          }
        >
          <CommentList postId={post.id} />
        </Suspense>
      </section>
    </div>
  );
}
