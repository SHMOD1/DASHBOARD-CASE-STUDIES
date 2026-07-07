import type { MediaAsset } from '../../../types';
import { ScrollFX } from '../ScrollFX';
import { EmptyMedia, SectionShell } from '../SectionShell';
import type { SectionProps } from './types';

export function GallerySection({ section, theme, media }: SectionProps<'gallery'>) {
  const assets = section.assetIds
    .map((id) => media.find((m) => m.id === id))
    .filter((m): m is MediaAsset => Boolean(m));

  return (
    <SectionShell section={section} theme={theme} fullBleed>
      {assets.length === 0 ? (
        <div className="flex h-full items-center justify-center p-12">
          <EmptyMedia label="Add images to this gallery" />
        </div>
      ) : (
        <ScrollFX anim={section.animation} className="flex gap-6 overflow-x-auto px-6 no-scrollbar md:px-16">
          {assets.map((asset) => (
            <figure key={asset.id} className="h-[65vh] w-[70vw] shrink-0 overflow-hidden rounded-2xl md:w-[38vw]">
              <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
              {section.captions[asset.id] && (
                <figcaption className="mt-2 text-sm opacity-70">{section.captions[asset.id]}</figcaption>
              )}
            </figure>
          ))}
        </ScrollFX>
      )}
    </SectionShell>
  );
}
