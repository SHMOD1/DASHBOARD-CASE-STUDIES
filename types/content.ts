// Core content model for the storytelling exhibition builder.
// The entire frontend renders from this shape — nothing is hardcoded.

export type SectionType =
  | "hero"
  | "quote"
  | "fullscreenImage"
  | "splitImageText"
  | "gallery"
  | "video"
  | "timeline"
  | "map"
  | "stats"
  | "ending"
  | "cta";

export type RevealStyle =
  | "fade"
  | "slide"
  | "scale"
  | "mask"
  | "parallax"
  | "none";

export type SlideDirection = "up" | "down" | "left" | "right";

export interface AnimationConfig {
  enabled: boolean;
  reveal: RevealStyle;
  slideDirection: SlideDirection;
  pinned: boolean;
  horizontal: boolean;
  parallax: boolean;
  parallaxStrength: number; // 0-100
  duration: number; // seconds
  delay: number; // seconds
  speed: number; // scroll-linked speed multiplier
  scrub: number; // 0 = instant, >0 = seconds of lag, "true" scrub uses 1
  easing: string; // e.g. "power3.out", "expo.out"
}

export type Alignment = "left" | "center" | "right";
export type ImagePosition = "left" | "right" | "background" | "top" | "bottom";
export type SectionHeight = "auto" | "half" | "screen" | "tall";

export interface LayoutConfig {
  height: SectionHeight;
  paddingY: number; // rem
  paddingX: number; // rem
  marginY: number; // rem
  align: Alignment;
  imagePosition: ImagePosition;
  textWidth: number; // percentage 20-100
  columns: 1 | 2 | 3;
  backgroundColor: string | null; // overrides theme
  backgroundImageId: string | null;
  overlayOpacity: number; // 0-1
}

export interface TypographyOverride {
  fontFamily: string | null;
  headingSize: number | null; // rem
  paragraphSize: number | null; // rem
  letterSpacing: number | null; // em
  lineHeight: number | null;
  uppercase: boolean;
  bold: boolean;
  weight: number | null;
}

export interface ColorOverride {
  primary: string | null;
  secondary: string | null;
  background: string | null;
  text: string | null;
  accent: string | null;
}

export interface SEOConfig {
  title: string;
  description: string;
  ogImageId: string | null;
  slug: string;
  metaTags: { name: string; content: string }[];
  schemaType: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  type: "image" | "video";
  alt: string;
  caption: string;
  credit: string;
  folder: string;
  tags: string[];
  width?: number;
  height?: number;
  /** Focal point (0-100) used as CSS object-position when the asset is displayed with object-cover — a lightweight stand-in for cropping. */
  focalX?: number;
  focalY?: number;
  createdAt: string;
}

export interface GalleryImageRef {
  id: string;
  mediaId: string | null;
  caption: string;
  credit: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  body: string;
  mediaId: string | null;
}

export interface StatEntry {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface MapPin {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  description: string;
}

export interface VideoContent {
  source: "mp4" | "youtube" | "vimeo";
  url: string;
  posterMediaId: string | null;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
}

/** Free-form content bag; each section type reads the keys it needs. */
export interface SectionContent {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  caption?: string;
  quote?: string;
  attribution?: string;
  credits?: string;
  footnote?: string;
  ctaLabel?: string;
  ctaHref?: string;
  mediaId?: string | null;
  secondaryMediaId?: string | null;
  gallery?: GalleryImageRef[];
  timeline?: TimelineEntry[];
  stats?: StatEntry[];
  mapPins?: MapPin[];
  video?: VideoContent;
  chapterNumber?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  name: string;
  visible: boolean;
  content: SectionContent;
  animation: AnimationConfig;
  layout: LayoutConfig;
  typography: TypographyOverride;
  color: ColorOverride;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updatedAt: string;
  sections: Section[];
  seo: SEOConfig;
}

export interface ThemeTypography {
  fontHeading: string;
  fontBody: string;
  headingSize: number;
  paragraphSize: number;
  letterSpacing: number;
  lineHeight: number;
  uppercaseHeadings: boolean;
  boldHeadings: boolean;
  weight: number;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: ThemeTypography;
}

export interface SiteContent {
  siteName: string;
  theme: Theme;
  pages: Page[];
  media: MediaAsset[];
}

export const FONT_OPTIONS = [
  { label: "Serif Editorial", value: "var(--font-serif)" },
  { label: "Grotesk Sans", value: "var(--font-sans)" },
  { label: "Monospace Caption", value: "var(--font-mono)" },
] as const;

export const EASING_OPTIONS = [
  "power1.out",
  "power2.out",
  "power3.out",
  "power4.out",
  "expo.out",
  "circ.out",
  "sine.inOut",
] as const;

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  quote: "Quote",
  fullscreenImage: "Fullscreen Image",
  splitImageText: "Split Image + Text",
  gallery: "Gallery",
  video: "Video",
  timeline: "Timeline",
  map: "Map",
  stats: "Stats",
  ending: "Ending",
  cta: "Call to Action",
};
