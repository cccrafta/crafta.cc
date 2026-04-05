import { get } from "@/lib/http-client";
import type { WPCategory } from "@/lib/types/wordpress";

export async function getCategories(): Promise<WPCategory[]> {
  const { data } = await get<WPCategory[]>("/wp/v2/categories/");
  return data;
}

export async function getCategoryById(id: number): Promise<WPCategory> {
  const { data } = await get<WPCategory>(`/wp/v2/categories/${id}`);
  return data;
}
