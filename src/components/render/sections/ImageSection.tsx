import { ScrollFX } from '../ScrollFX';
import { EmptyMedia, SectionShell } from '../SectionShell';
import { textWidthClass } from '../styleHelpers';
import type { SectionProps } from './types';

export function ImageSection({ section, theme, media }: SectionProps<'image'>) {
  const asset = media.find((m) => m.id === section.assetId);
  const isBg = section.layout.imagePosition === 'background';

  if (isBg) {
    return (
      <SectionShell section={section} theme={theme} fullBleed className="overflow-hidden">
        <div className="absolute inset-0">
          {asset ? (
            <ScrollFX anim={section.animation} fill>
              <img src={asset.url} alt={section.alt} className="h-full w-full object-cover" />
            </ScrollFX>
          ) : (
            <EmptyMedia label="Set an image" />
          )}
          <div className="absolute inset-0 bg-black" style={{ opacity: section.layout.overlayOpacity / 100 }} />
        </div>
        {(section.caption || section.credit) && (
          <div className="absolute bottom-6 left-6 right-6 z-10 text-sm">
            {section.caption && <p>{section.caption}</p>}
            {section.credit && <p className="opacity-60">{section.credit}</p>}
          </div>
        )}
      </SectionShell>
    );
  }

  return (
    <SectionShell section={section} theme={theme}>
      <ScrollFX anim={section.animation} className={`mx-auto ${textWidthClass(section.layout.textWidth)}`}>
        <div className="overflow-hidden rounded-2xl">
          {asset ? (
            <img src={asset.url} alt={section.alt} className="w-full object-cover" />
          ) : (
            <EmptyMedia label="Set an image" />
          )}
        </div>
        {section.caption && <p className="mt-3 text-sm opacity-70">{section.caption}</p>}
        {section.credit && <p className="text-xs opacity-50">{section.credit}</p>}
      </ScrollFX>
    </SectionShell>
  );
}
