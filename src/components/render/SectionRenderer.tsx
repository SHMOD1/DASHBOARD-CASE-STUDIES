import type { MediaAsset, Section, ThemeConfig } from '../../types';
import { ChapterSection } from './sections/ChapterSection';
import { GallerySection } from './sections/GallerySection';
import { HeroSection } from './sections/HeroSection';
import { ImageSection } from './sections/ImageSection';
import { QuoteSection } from './sections/QuoteSection';
import { TextSection } from './sections/TextSection';
import { VideoSection } from './sections/VideoSection';

interface Props {
  section: Section;
  theme: ThemeConfig;
  media: MediaAsset[];
  editing?: boolean;
}

function renderInner(section: Section, theme: ThemeConfig, media: MediaAsset[]) {
  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} theme={theme} media={media} />;
    case 'text':
      return <TextSection section={section} theme={theme} media={media} />;
    case 'image':
      return <ImageSection section={section} theme={theme} media={media} />;
    case 'gallery':
      return <GallerySection section={section} theme={theme} media={media} />;
    case 'video':
      return <VideoSection section={section} theme={theme} media={media} />;
    case 'quote':
      return <QuoteSection section={section} theme={theme} media={media} />;
    case 'chapter':
      return <ChapterSection section={section} theme={theme} media={media} />;
  }
}

export function SectionRenderer({ section, theme, media, editing }: Props) {
  if (!section.visible && !editing) return null;

  const inner = renderInner(section, theme, media);

  if (!section.visible && editing) {
    return (
      <div className="relative opacity-40 grayscale">
        <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          Hidden
        </div>
        {inner}
      </div>
    );
  }

  return inner;
}
