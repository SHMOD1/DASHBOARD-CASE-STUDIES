import type { Section, SectionType } from '../types';

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: 'Hero',
  text: 'Text',
  image: 'Image',
  gallery: 'Gallery',
  video: 'Video',
  quote: 'Pull Quote',
  chapter: 'Chapter',
};

export const SECTION_TYPES: SectionType[] = ['hero', 'chapter', 'text', 'image', 'gallery', 'video', 'quote'];

export function sectionSummary(section: Section): string {
  switch (section.type) {
    case 'hero':
      return section.heading || 'Untitled hero';
    case 'text':
      return section.heading || section.body.slice(0, 40) || 'Untitled text';
    case 'image':
      return section.caption || section.alt || 'Untitled image';
    case 'gallery':
      return `${section.assetIds.length} image${section.assetIds.length === 1 ? '' : 's'}`;
    case 'video':
      return section.url ? section.source : 'No source';
    case 'quote':
      return section.quote.slice(0, 40) || 'Untitled quote';
    case 'chapter':
      return section.title || 'Untitled chapter';
  }
}
