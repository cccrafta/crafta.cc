import Image from "next/image";
import type { PostDetail } from "@/lib/types/wordpress";
import CategoryCircle from "@/components/category-circle";

export default function PostContent({ post }: { post: PostDetail }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const category = post.categories[0] ?? "Journal";

  return (
    <article>
      {/* Category circle + title + date */}
      <div
        className="flex flex-col items-center"
        style={{ gap: "var(--space-md)", marginBottom: "var(--space-xl)" }}
      >
        <CategoryCircle text={category + "·"} size={72} fontSize={10}>
          <span
            style={{
              fontFamily: "var(--font-nav)",
              fontSize: 18,
              fontWeight: 600,
              color: "var(--color-fg)",
            }}
          >
            {category[0]}
          </span>
        </CategoryCircle>

        <h1 className="type-title-lg" style={{ textAlign: "center" }}>
          {post.title}
        </h1>

        <time dateTime={post.date} className="type-meta">
          {formattedDate}
        </time>
      </div>

      {post.featuredImageUrl && (
        <div
          className="relative aspect-video overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            marginBottom: "var(--space-xl)",
          }}
        >
          <Image
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      <div
        className="prose type-body max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags.length > 0 && (
        <div
          className="flex flex-wrap"
          style={{ gap: "var(--space-sm)", marginTop: "var(--space-xl)" }}
        >
          {post.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
}
