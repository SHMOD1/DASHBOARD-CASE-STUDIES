import { NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/content";
import { validateSiteContent } from "@/cms/validateContent";

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (!validateSiteContent(body)) {
    return NextResponse.json({ error: "Invalid site content payload" }, { status: 400 });
  }

  await writeContent(body);
  return NextResponse.json({ ok: true });
}
