"use client";

import { useRef } from "react";

export default function PostBody({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={contentRef}
      className="prose type-body max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
