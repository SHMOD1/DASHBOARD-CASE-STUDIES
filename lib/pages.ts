import "server-only";
import { readContent } from "@/lib/content";
import type { Page, SiteContent } from "@/types/content";

export interface ResolvedPage {
  page: Page;
  media: SiteContent["media"];
  theme: SiteContent["theme"];
  siteName: string;
}

export async function getPageBySlug(slug: string): Promise<ResolvedPage | null> {
  const content = await readContent();
  const page = content.pages.find((p) => p.slug === slug);
  if (!page) return null;
  return { page, media: content.media, theme: content.theme, siteName: content.siteName };
}

export async function getHomePage(): Promise<ResolvedPage | null> {
  const content = await readContent();
  const page =
    content.pages.find((p) => p.slug === "home" && p.published) ??
    content.pages.find((p) => p.published) ??
    content.pages[0] ??
    null;
  if (!page) return null;
  return { page, media: content.media, theme: content.theme, siteName: content.siteName };
}
