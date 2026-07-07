import type { MediaAsset, Section, ThemeConfig } from '../../../types';

export interface SectionProps<T extends Section['type']> {
  section: Extract<Section, { type: T }>;
  theme: ThemeConfig;
  media: MediaAsset[];
}
