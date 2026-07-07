import type { SiteContent } from "@/types/content";

/** Minimal structural check run before persisting content from the dashboard. */
export function validateSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<SiteContent>;
  if (typeof v.siteName !== "string") return false;
  if (!v.theme || typeof v.theme !== "object") return false;
  if (!Array.isArray(v.pages)) return false;
  if (!Array.isArray(v.media)) return false;
  return v.pages.every(
    (page) =>
      typeof page.id === "string" &&
      typeof page.slug === "string" &&
      Array.isArray(page.sections)
  );
}
