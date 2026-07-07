import { nanoid } from 'nanoid';
import type { MediaAsset, PageDocument, Section } from '../types';
import { createSection, defaultAnimation, defaultLayout, defaultStyle } from './defaults';
import { placeholderImage } from './placeholder';

function asset(seed: number, name: string, label: string): MediaAsset {
  return {
    id: nanoid(8),
    name,
    url: placeholderImage(seed, label),
    type: 'image',
    folder: 'Case Study',
    tags: ['placeholder'],
    createdAt: Date.now() - seed * 100000,
  };
}

export function buildSeedDocument(): PageDocument {
  const heroAsset = asset(1, 'hero-cover.jpg', 'Hero');
  const chapterAsset = asset(2, 'chapter-01.jpg', 'Chapter I');
  const galleryAssets = [
    asset(3, 'gallery-01.jpg', 'Detail 01'),
    asset(4, 'gallery-02.jpg', 'Detail 02'),
    asset(5, 'gallery-03.jpg', 'Detail 03'),
    asset(6, 'gallery-04.jpg', 'Detail 04'),
  ];
  const featureAsset = asset(7, 'feature.jpg', 'Feature');

  const media: MediaAsset[] = [heroAsset, chapterAsset, ...galleryAssets, featureAsset];

  const sections: Section[] = [
    {
      ...(createSection('hero') as Extract<Section, { type: 'hero' }>),
      eyebrow: 'Case Study — 2026',
      heading: 'Redesigning the way people see their data',
      subheading:
        'A dashboard product overhaul told through motion, light, and craft.',
      mediaId: heroAsset.id,
    },
    {
      ...(createSection('text') as Extract<Section, { type: 'text' }>),
      heading: 'The challenge',
      body: 'Our client’s legacy dashboard buried critical insights under dense tables and modal dialogs. We were asked to rebuild the experience from first principles — fast, legible, and calm under pressure.',
      pullQuote: 'Clarity is a design decision, not an afterthought.',
      credit: 'Lead Designer',
    },
    {
      ...(createSection('chapter') as Extract<Section, { type: 'chapter' }>),
      index: '01',
      title: 'Discovery',
      subtitle: 'Six weeks of interviews, shadowing, and data mapping.',
      layout: defaultLayout({ height: 'full', backgroundColor: '#101014', overlayOpacity: 55 }),
    },
    {
      id: nanoid(8),
      type: 'image',
      visible: true,
      assetId: chapterAsset.id,
      alt: 'Research wall covered in sticky notes',
      caption: 'Synthesizing forty hours of user interviews into a single wall of patterns.',
      credit: 'Photo: research studio',
      layout: defaultLayout({ height: 'tall', imagePosition: 'top' }),
      style: defaultStyle(),
      animation: defaultAnimation('parallax', { speed: 35, scrub: 0.6 }),
    },
    {
      ...(createSection('quote') as Extract<Section, { type: 'quote' }>),
      quote: 'The first prototype made our internal team stop mid-meeting and just start clicking around.',
      credit: '— VP of Product',
    },
    {
      ...(createSection('gallery') as Extract<Section, { type: 'gallery' }>),
      assetIds: galleryAssets.map((a) => a.id),
      captions: Object.fromEntries(galleryAssets.map((a, i) => [a.id, `Exploration ${i + 1}`])),
    },
    {
      ...(createSection('chapter') as Extract<Section, { type: 'chapter' }>),
      index: '02',
      title: 'The system',
      subtitle: 'A component language built to scale across twelve product teams.',
      layout: defaultLayout({ height: 'full', backgroundColor: '#141018', overlayOpacity: 55 }),
    },
    {
      id: nanoid(8),
      type: 'text',
      visible: true,
      heading: 'Built for density and calm',
      body: 'Every chart, table, and card shares a single spacing and type scale. Motion is used sparingly — to orient, never to decorate.',
      pullQuote: '',
      credit: '',
      footnote: 'Design system shipped as a versioned package consumed by 12 teams.',
      layout: defaultLayout({ textWidth: 'narrow' }),
      style: defaultStyle(),
      animation: defaultAnimation('reveal'),
    },
    {
      id: nanoid(8),
      type: 'image',
      visible: true,
      assetId: featureAsset.id,
      alt: 'Final dashboard screen',
      caption: 'The shipped dashboard — 40% faster time-to-insight in usability testing.',
      credit: '',
      layout: defaultLayout({ height: 'full', imagePosition: 'background', overlayOpacity: 20 }),
      style: defaultStyle(),
      animation: defaultAnimation('pinned', { scrub: 1 }),
    },
    {
      ...(createSection('text') as Extract<Section, { type: 'text' }>),
      heading: 'Results',
      body: 'Within a quarter of launch, support tickets related to data confusion dropped by 61%, and daily active usage of the dashboard nearly doubled.',
      pullQuote: '',
    },
  ];

  return {
    id: nanoid(8),
    title: 'Redesigning the way people see their data',
    theme: {
      primary: '#e9e8ee',
      secondary: '#9a97a6',
      background: '#0b0b0e',
      text: '#e9e8ee',
      accent: '#7c5cff',
      fontHeading: 'display',
      fontBody: 'sans',
    },
    seo: {
      title: 'Redesigning the way people see their data — Case Study',
      description:
        'How we rebuilt a legacy analytics dashboard into a fast, calm, and legible product experience.',
      ogImageId: heroAsset.id,
      slug: 'redesigning-the-dashboard',
      metaTags: [{ key: 'author', value: 'Studio Name' }],
      schema: '{\n  "@type": "CreativeWork"\n}',
    },
    sections,
    media,
  };
}
