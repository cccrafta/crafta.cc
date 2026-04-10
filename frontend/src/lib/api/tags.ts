import { get } from "@/lib/http-client";
import type { WPTag } from "@/lib/types/wordpress";

export async function getTags(): Promise<WPTag[]> {
  const { data } = await get<WPTag[]>("/wp/v2/tags/", { per_page: 50 });
  return data;
}
