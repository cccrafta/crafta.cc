import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getJournalPost } from "@/lib/services";
import PostContent from "@/components/post-content";
import CommentList from "@/components/comment-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} — crafta.cc`,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PostContent post={post} />

      <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Comments
        </h2>
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2 border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
                  <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
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
