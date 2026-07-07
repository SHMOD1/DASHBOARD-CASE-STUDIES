import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "@/types/content";

const CONTENT_PATH = path.join(process.cwd(), "content", "site.json");

export async function readContent(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  const serialized = JSON.stringify(content, null, 2);
  await fs.writeFile(CONTENT_PATH, `${serialized}\n`, "utf-8");
}
