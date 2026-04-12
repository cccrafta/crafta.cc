import { getJournalFeed } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
  const perPage = Number(request.nextUrl.searchParams.get("per_page") ?? 10);

  const result = await getJournalFeed(page, perPage);
  return NextResponse.json(result);
}
