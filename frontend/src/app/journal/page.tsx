import { getJournalFeed } from "@/lib/services";
import PostCard from "@/components/post-card";

export const metadata = {
  title: "Journal — crafta.cc",
  description: "Read the latest journal entries.",
};

export default async function JournalPage() {
  const { posts } = await getJournalFeed();

  if (posts.length === 0) {
    return (
      <div
        className="py-16 text-center"
        style={{ color: "var(--color-fg-secondary)" }}
      >
        <p>No journal entries yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full" style={{ maxWidth: "500px" }}>
      <div className="flex flex-col" style={{ gap: "var(--space-3xl)" }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
