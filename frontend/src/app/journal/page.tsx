import { getJournalFeed } from "@/lib/services";
import JournalFeed from "@/components/journal-feed";
import { ConnectionError } from "@/lib/http-client";

export const metadata = {
  title: "Journal — crafta.cc",
  description: "Read the latest journal entries.",
};

export default async function JournalPage() {
  try {
    const { posts, totalPages } = await getJournalFeed();

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

    return <JournalFeed posts={posts} totalPages={totalPages} />;
  } catch (error) {
    const message =
      error instanceof ConnectionError
        ? "Unable to connect to the content server."
        : "Something went wrong loading the journal.";

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
}
