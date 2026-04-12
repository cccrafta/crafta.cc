"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";
import CategoryCircle from "@/components/category-circle";
import { useState } from "react";

// Width factor based on excerpt length
function getWidthFromExcerpt(excerpt: string): number {
  const len = excerpt.length;
  // Short excerpt (<80 chars) = narrow, long (>200) = wide
  if (len < 80) return 0.8;
  if (len < 120) return 1.0;
  if (len < 160) return 1.2;
  if (len < 200) return 1.4;
  return 1.6;
}

const ROW_HEIGHT = 280;

export default function PostGridCard({ post }: { post: PostCardType }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!post.featuredImageUrl;
  const showDetails = hovered || !hasImage;

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const category = post.categories[0] ?? "Journal";
  const widthFactor = getWidthFromExcerpt(post.excerpt);
  const cardWidth = Math.round(ROW_HEIGHT * widthFactor);

  return (
    <Link
      href={`/journal/${post.slug}`}
      className="block relative overflow-hidden"
      style={{
        height: ROW_HEIGHT,
        width: cardWidth,
        minWidth: 350,
        flex: "0 1 auto",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail background */}
      {hasImage && (
        <Image
          src={post.featuredImageUrl!}
          alt={post.featuredImageAlt || post.title}
          fill
          className="object-cover"
          sizes="400px"
          style={{
            transition: "opacity 0.3s ease",
            opacity: hovered ? 0.1 : 1,
          }}
        />
      )}

      {/* Details overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-between"
        style={{
          padding: "var(--space-lg)",
          opacity: showDetails ? 1 : 0,
          transition: "opacity 0.3s ease",
          backgroundColor: hasImage
            ? "rgba(252, 251, 246, 0.9)"
            : "transparent",
        }}
      >
        {/* Body */}
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0, overflow: "hidden", gap: "var(--space-sm)" }}>
          {/* Row: circle + title */}
          <div className="flex items-center" style={{ gap: "var(--space-sm)" }}>
            <div className="shrink-0">
              <CategoryCircle text={category + "·"} size={32} fontSize={6}>
                <span
                  style={{
                    fontFamily: "var(--font-nav)",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--color-fg)",
                  }}
                >
                  {category[0]}
                </span>
              </CategoryCircle>
            </div>
            <h3 className="type-title-sm line-clamp-2 flex-1" style={{ textAlign: "justify" }}>{post.title}</h3>
          </div>

          {/* Full width: excerpt */}
          <p className="type-body-sm" style={{ flex: 1, minHeight: 0, textAlign: "justify" }}>
            {post.excerpt}
          </p>

          {/* Full width: tags */}
          <div className="flex flex-wrap" style={{ gap: "var(--space-sm)" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            paddingTop: "var(--space-xs)",
            borderTop: "1px solid var(--color-border-light)",
            marginTop: "var(--space-xs)",
          }}
        >
          <span className="type-label" style={{ fontSize: "0.6rem" }}>
            {category}
          </span>
          <time
            dateTime={post.date}
            className="type-meta"
            style={{ fontSize: "0.6rem" }}
          >
            {formattedDate}
          </time>
        </div>
      </div>
    </Link>
  );
}
