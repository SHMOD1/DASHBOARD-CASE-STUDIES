import type { ComponentType } from "react";
import type { MediaAsset, Section, SectionType } from "@/types/content";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { FullscreenImageSection } from "@/components/sections/FullscreenImageSection";
import { SplitImageTextSection } from "@/components/sections/SplitImageTextSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { VideoSection } from "@/components/sections/VideoSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { MapSection } from "@/components/sections/MapSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { EndingSection } from "@/components/sections/EndingSection";
import { CTASection } from "@/components/sections/CTASection";

export interface SectionComponentProps {
  section: Section;
  media: MediaAsset[];
}

export const SECTION_REGISTRY: Record<SectionType, ComponentType<SectionComponentProps>> = {
  hero: HeroSection,
  quote: QuoteSection,
  fullscreenImage: FullscreenImageSection,
  splitImageText: SplitImageTextSection,
  gallery: GallerySection,
  video: VideoSection,
  timeline: TimelineSection,
  map: MapSection,
  stats: StatsSection,
  ending: EndingSection,
  cta: CTASection,
};
