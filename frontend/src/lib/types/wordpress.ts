export type WPRenderedField = {
  rendered: string;
};

export type WPMediaSize = {
  source_url: string;
  width: number;
  height: number;
  mime_type: string;
};

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    sizes: {
      thumbnail?: WPMediaSize;
      medium?: WPMediaSize;
      medium_large?: WPMediaSize;
      large?: WPMediaSize;
      full?: WPMediaSize;
    };
  };
};

export type WPUser = {
  id: number;
  name: string;
  slug: string;
  avatar_urls: Record<string, string>;
};

export type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
};

export type WPTag = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type WPComment = {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  author_avatar_urls: Record<string, string>;
  date: string;
  content: WPRenderedField;
};

export type WPPost = {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WPRenderedField;
  content: WPRenderedField;
  excerpt: WPRenderedField;
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  comment_status: string;
  meta?: {
    related_posts?: number[];
    references?: { title: string; url: string }[];
  };
  _embedded?: {
    author?: WPUser[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPCategory[][];
  };
};

export type WPPostsParams = {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number | string;
  tags?: number | string;
  slug?: string;
  _embed?: boolean;
  include?: string;
  exclude?: number;
};

export type WPCommentsParams = {
  post?: number;
  page?: number;
  per_page?: number;
};

export type WPPaginatedResponse<T> = {
  data: T[];
  total: number;
  totalPages: number;
};

// View types — used by components (no WP knowledge)

export type PostCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentParagraphs: string[];
  date: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  authorName: string;
  categories: string[];
  tags: string[];
};

export type Reference = {
  title: string;
  url: string;
};

export type PostDetail = {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  authorName: string;
  authorAvatar: string | null;
  tags: string[];
  references: Reference[];
  manualRelatedIds: number[];
  tagIds: number[];
};

export type CommentView = {
  id: number;
  authorName: string;
  authorAvatar: string | null;
  date: string;
  content: string;
  parentId: number;
};
