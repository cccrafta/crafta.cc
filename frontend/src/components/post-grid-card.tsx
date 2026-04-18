"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostCard as PostCardType } from "@/lib/types/wordpress";
import CategoryCircle from "@/components/category-circle";
import { useState } from "react";

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

  return (
    <Link
      href={`/journal/${post.slug}`}
      className="block relative overflow-hidden"
      style={{
        width: "100%",
        aspectRatio: "210 / 265",
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
        className="absolute inset-0 flex flex-col"
        style={{
          padding: "var(--space-lg)",
          opacity: showDetails ? 1 : 0,
          transition: "opacity 0.3s ease",
          backgroundColor: hasImage
            ? "rgba(252, 251, 246, 0.9)"
            : "transparent",
        }}
      >
        {/* 1. Top: category + date */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            paddingBottom: "var(--space-xs)",
            marginBottom: 0,
          }}
        >
          <span className="type-meta" style={{ fontSize: "0.6rem" }}>
            {category}
          </span>
          <time dateTime={post.date} className="type-meta" style={{ fontSize: "0.6rem" }}>
            {formattedDate}
          </time>
        </div>

        {/* 2. Center: category circle */}
        <div className="flex justify-center shrink-0" style={{ marginBottom: "var(--space-lg)" }}>
          <CategoryCircle text={category + "·"} size={52} fontSize={8}>
            <span
              style={{
                fontFamily: "var(--font-nav)",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-fg)",
              }}
            >
              {category[0]}
            </span>
          </CategoryCircle>
        </div>

        {/* 3. Title centered */}
        <h3
          className="type-title shrink-0"
          style={{
            fontSize: "var(--text-xl)",
            textAlign: "center",
            marginBottom: "var(--space-xl)",
          }}
        >
          {post.title}
        </h3>

        {/* 4. Content paragraphs — fades out */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        >
          {post.contentParagraphs.map((para, i) => (
            <p
              key={i}
              className="type-body-sm"
              style={{
                textAlign: "justify",
                marginBottom: "var(--space-sm)",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* 5. Tags */}
        <div className="flex flex-wrap shrink-0" style={{ gap: "var(--space-sm)", paddingTop: "var(--space-xs)" }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
