import { nanoid } from 'nanoid';
import type {
  AnimationConfig,
  LayoutConfig,
  Section,
  SectionType,
  StyleConfig,
  TypographyConfig,
} from '../types';

export function defaultTypography(): TypographyConfig {
  return {
    font: 'sans',
    headingSize: 'lg',
    paragraphSize: 'md',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    uppercase: false,
    bold: false,
    weight: 500,
  };
}

export function defaultStyle(): StyleConfig {
  return {
    useThemeColors: true,
    typography: defaultTypography(),
  };
}

export function defaultLayout(overrides: Partial<LayoutConfig> = {}): LayoutConfig {
  return {
    height: 'auto',
    paddingY: 96,
    paddingX: 24,
    marginY: 0,
    align: 'center',
    imagePosition: 'background',
    textWidth: 'medium',
    columns: 1,
    backgroundColor: 'theme',
    overlayOpacity: 30,
    ...overrides,
  };
}

export function defaultAnimation(
  type: AnimationConfig['type'] = 'fade',
  overrides: Partial<AnimationConfig> = {},
): AnimationConfig {
  return {
    enabled: true,
    type,
    direction: 'up',
    duration: 0.9,
    delay: 0,
    speed: 40,
    scrub: 0,
    easing: 'easeOut',
    ...overrides,
  };
}

export function createSection(type: SectionType): Section {
  const id = nanoid(8);
  const base = {
    id,
    type,
    visible: true,
    style: defaultStyle(),
  };

  switch (type) {
    case 'hero':
      return {
        ...base,
        type: 'hero',
        eyebrow: 'Case Study',
        heading: 'A new chapter begins',
        subheading: 'Write a cinematic opening line that pulls the reader in.',
        mediaId: null,
        layout: defaultLayout({ height: 'full', imagePosition: 'background', overlayOpacity: 45 }),
        animation: defaultAnimation('parallax', { speed: 30, scrub: 0.6 }),
      };
    case 'text':
      return {
        ...base,
        type: 'text',
        heading: 'Section heading',
        body: 'Tell the story here. This is body copy that supports rich formatting and long-form narrative.',
        pullQuote: '',
        credit: '',
        footnote: '',
        layout: defaultLayout({ height: 'auto', textWidth: 'narrow' }),
        animation: defaultAnimation('reveal'),
      };
    case 'image':
      return {
        ...base,
        type: 'image',
        assetId: null,
        alt: '',
        caption: 'Image caption goes here',
        credit: '',
        layout: defaultLayout({ height: 'tall', imagePosition: 'top' }),
        animation: defaultAnimation('parallax', { speed: 25, scrub: 0.5 }),
      };
    case 'gallery':
      return {
        ...base,
        type: 'gallery',
        assetIds: [],
        captions: {},
        layout: defaultLayout({ height: 'full', columns: 3 }),
        animation: defaultAnimation('horizontal', { scrub: 1, duration: 1.2 }),
      };
    case 'video':
      return {
        ...base,
        type: 'video',
        source: 'upload',
        url: '',
        posterId: null,
        autoplay: false,
        loop: false,
        mute: true,
        layout: defaultLayout({ height: 'full' }),
        animation: defaultAnimation('fade'),
      };
    case 'quote':
      return {
        ...base,
        type: 'quote',
        quote: 'Design is not just what it looks like. Design is how it works.',
        credit: '— Attribution',
        layout: defaultLayout({ height: 'half', textWidth: 'medium' }),
        animation: defaultAnimation('scale', { scrub: 0.4 }),
      };
    case 'chapter':
      return {
        ...base,
        type: 'chapter',
        index: '01',
        title: 'Chapter title',
        subtitle: 'A short introduction to what follows.',
        layout: defaultLayout({ height: 'full' }),
        animation: defaultAnimation('pinned', { scrub: 1, duration: 1 }),
      };
  }
}
