import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { genId } from "@/lib/id";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".mp4", ".webm"]);

function sanitizeExt(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return ALLOWED_EXT.has(ext) ? ext : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = sanitizeExt(file.name);
  if (!ext) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const id = genId("media");
  const filename = `${id}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const type = file.type.startsWith("video") ? "video" : "image";

  return NextResponse.json({
    id,
    url: `/uploads/${filename}`,
    type,
    name: file.name,
  });
}
