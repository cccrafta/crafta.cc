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
        <div className="flex justify-between w-full">
          <span className="type-body">{category}</span>
          <time dateTime={post.date} className="type-body">
            {formattedDate}
          </time>
        </div>
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
        <>
          <p className="type-body" style={{ marginBottom: "var(--space-sm)" }}>
            Keywords
          </p>
          <div className="flex flex-wrap" style={{ gap: "var(--space-sm)" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </>
      )}

      {post.references.length > 0 && (
        <div style={{ marginTop: "var(--space-xl)" }}>
          <p className="type-body" style={{ marginBottom: "var(--space-sm)" }}>
            References
          </p>
          <ol style={{ paddingLeft: "1.25em", margin: 0 }}>
            {post.references.map((ref, i) => (
              <li
                key={i}
                className="type-meta"
                style={{ marginBottom: "var(--space-xs)" }}
              >
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--color-accent)",
                    textDecoration: "underline",
                    fontStyle: "italic",
                  }}
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}
