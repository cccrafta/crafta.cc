import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getJournalPost } from "@/lib/services";
import PostContent from "@/components/post-content";
// import PostSearchLayout from "@/components/post-search-layout";
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

  // const searchContext = post.searchContext || post.categories[0] || "fashion";

  return (
    <div className="post-layout">
      <PostContent post={post} />
    </div>
  );
}
