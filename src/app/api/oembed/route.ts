import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ title: null }, { status: 400 });

  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      { next: { revalidate: 3600 } }, // cache for 1h
    );
    if (!res.ok) return NextResponse.json({ title: id });
    const data = await res.json();
    return NextResponse.json({ title: data.title ?? id });
  } catch {
    return NextResponse.json({ title: id });
  }
}