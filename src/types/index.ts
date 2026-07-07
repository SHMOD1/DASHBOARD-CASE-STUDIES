export type SectionType =
  | 'hero'
  | 'text'
  | 'image'
  | 'gallery'
  | 'video'
  | 'quote'
  | 'chapter';

export type AnimationType =
  | 'none'
  | 'fade'
  | 'slide'
  | 'scale'
  | 'reveal'
  | 'parallax'
  | 'pinned'
  | 'horizontal';

export type Easing =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circOut'
  | 'backOut';

export interface AnimationConfig {
  enabled: boolean;
  type: AnimationType;
  direction: 'up' | 'down' | 'left' | 'right';
  duration: number; // seconds
  delay: number; // seconds
  speed: number; // parallax intensity, 0-100
  scrub: number; // 0 = discrete trigger, 1 = fully scroll-linked
  easing: Easing;
}

export type HeightPreset = 'auto' | 'half' | 'full' | 'tall';
export type TextWidth = 'narrow' | 'medium' | 'wide' | 'full';
export type Alignment = 'left' | 'center' | 'right';
export type ImagePosition = 'left' | 'right' | 'background' | 'top';

export interface LayoutConfig {
  height: HeightPreset;
  paddingY: number; // px
  paddingX: number; // px
  marginY: number; // px
  align: Alignment;
  imagePosition: ImagePosition;
  textWidth: TextWidth;
  columns: 1 | 2 | 3;
  backgroundColor: string; // 'theme' or hex
  overlayOpacity: number; // 0-100
}

export interface TypographyConfig {
  font: 'sans' | 'serif' | 'mono' | 'display';
  headingSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  paragraphSize: 'sm' | 'md' | 'lg';
  letterSpacing: 'tight' | 'normal' | 'wide';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  uppercase: boolean;
  bold: boolean;
  weight: number; // 300-900
}

export interface StyleConfig {
  useThemeColors: boolean;
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
  accent?: string;
  typography: TypographyConfig;
}

export interface BaseSection {
  id: string;
  type: SectionType;
  visible: boolean;
  layout: LayoutConfig;
  style: StyleConfig;
  animation: AnimationConfig;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  eyebrow: string;
  heading: string;
  subheading: string;
  mediaId: string | null;
}

export interface TextSection extends BaseSection {
  type: 'text';
  heading: string;
  body: string;
  pullQuote: string;
  credit: string;
  footnote: string;
}

export interface ImageSectionData extends BaseSection {
  type: 'image';
  assetId: string | null;
  alt: string;
  caption: string;
  credit: string;
}

export interface GallerySectionData extends BaseSection {
  type: 'gallery';
  assetIds: string[];
  captions: Record<string, string>;
}

export interface VideoSectionData extends BaseSection {
  type: 'video';
  source: 'upload' | 'youtube' | 'vimeo';
  url: string;
  posterId: string | null;
  autoplay: boolean;
  loop: boolean;
  mute: boolean;
}

export interface QuoteSectionData extends BaseSection {
  type: 'quote';
  quote: string;
  credit: string;
}

export interface ChapterSectionData extends BaseSection {
  type: 'chapter';
  index: string;
  title: string;
  subtitle: string;
}

export type Section =
  | HeroSection
  | TextSection
  | ImageSectionData
  | GallerySectionData
  | VideoSectionData
  | QuoteSectionData
  | ChapterSectionData;

// Union of all per-type fields (each optional), so partial updates can set
// any type-specific field without narrowing the section first.
export type SectionPatch = Partial<HeroSection> &
  Partial<TextSection> &
  Partial<ImageSectionData> &
  Partial<GallerySectionData> &
  Partial<VideoSectionData> &
  Partial<QuoteSectionData> &
  Partial<ChapterSectionData>;

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  folder: string;
  tags: string[];
  createdAt: number;
}

export interface MetaTag {
  key: string;
  value: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  ogImageId: string | null;
  slug: string;
  metaTags: MetaTag[];
  schema: string;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  fontHeading: TypographyConfig['font'];
  fontBody: TypographyConfig['font'];
}

export interface PageDocument {
  id: string;
  title: string;
  theme: ThemeConfig;
  seo: SeoConfig;
  sections: Section[];
  media: MediaAsset[];
}

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';
