import { getTags } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await getTags();
    return NextResponse.json(tags);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
