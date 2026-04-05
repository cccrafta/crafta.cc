import { get } from "@/lib/http-client";
import type { WPMedia } from "@/lib/types/wordpress";

export async function getMediaById(id: number): Promise<WPMedia> {
  const { data } = await get<WPMedia>(`/wp/v2/media/${id}`);
  return data;
}
