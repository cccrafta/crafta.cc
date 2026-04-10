import Image from "next/image";
import Link from "next/link";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";

export default function PostCard({ post }: { post: PostCardType }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="flex flex-col" style={{ gap: "var(--space-sm)" }}>
      {/* Category + Date */}
      <div
        className="flex items-baseline justify-between"
        style={{ color: "var(--color-fg-secondary)" }}
      >
        {post.categories.length > 0 && (
          <div className="type-label">
            {post.categories.map((cat, i) => (
              <span key={cat}>
                {i > 0 && <span style={{ margin: "0 var(--space-xs)" }}>/</span>}
                {cat}
              </span>
            ))}
          </div>
        )}
        <time dateTime={post.date} className="type-label shrink-0">
          {formattedDate}
        </time>
      </div>

      {/* Image */}
      <Link href={`/journal/${post.slug}`}>
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "4 / 5",
            backgroundColor: "var(--color-bg-secondary)",
          }}
        >
          {post.featuredImageUrl ? (
            <Image
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover transition-opacity hover:opacity-80"
              sizes="500px"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: "var(--color-border)" }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Title */}
      <Link href={`/journal/${post.slug}`}>
        <h2 className="type-title">{post.title}</h2>
      </Link>

      {/* Description */}
      <p className="type-body-sm line-clamp-3">{post.excerpt}</p>

      {/* Read more */}
      <Link
        href={`/journal/${post.slug}`}
        className="type-label self-start transition-opacity hover:opacity-60"
      >
        Read more &rarr;
      </Link>
    </article>
  );
}
