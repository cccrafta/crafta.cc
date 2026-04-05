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
      <div className="py-16 text-center" style={{ color: "var(--color-fg-secondary)" }}>
        <p>No journal entries yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1
        className="mb-8 font-normal tracking-widest uppercase"
        style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-secondary)", letterSpacing: "0.2em" }}
      >
        Feed <span style={{ color: "var(--color-accent)" }}>[{String(posts.length).padStart(2, "0")}]</span>
      </h1>
      <div
        className="grid"
        style={{
          gap: "var(--grid-gap)",
          gridTemplateColumns: `repeat(var(--grid-cols-mobile), 1fr)`,
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
