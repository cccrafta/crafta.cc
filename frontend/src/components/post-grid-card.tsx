import Image from "next/image";
import Link from "next/link";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";

export default function PostGridCard({ post }: { post: PostCardType }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/journal/${post.slug}`} className="group flex flex-col">
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3", backgroundColor: "var(--color-bg-secondary)" }}
      >
        {post.featuredImageUrl ? (
          <Image
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover transition-opacity group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: "var(--color-border)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col" style={{ gap: "var(--space-xs)", marginTop: "var(--space-sm)" }}>
        {post.categories.length > 0 && (
          <span className="type-label" style={{ color: "var(--color-fg-secondary)" }}>
            {post.categories[0]}
          </span>
        )}
        <h3 className="type-title-sm line-clamp-2">{post.title}</h3>
        <time dateTime={post.date} className="type-meta">{formattedDate}</time>
      </div>
    </Link>
  );
}
