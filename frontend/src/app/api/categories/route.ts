import { getCategories } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
