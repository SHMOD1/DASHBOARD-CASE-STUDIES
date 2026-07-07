import { ScrollFX } from '../ScrollFX';
import { EmptyMedia, SectionShell } from '../SectionShell';
import { bodyStyle, headingStyle, resolveColors } from '../styleHelpers';
import type { SectionProps } from './types';

export function HeroSection({ section, theme, media }: SectionProps<'hero'>) {
  const colors = resolveColors(section.style, theme);
  const asset = media.find((m) => m.id === section.mediaId);

  return (
    <SectionShell section={section} theme={theme} fullBleed className="flex items-end overflow-hidden">
      <div className="absolute inset-0">
        {asset ? (
          <ScrollFX anim={section.animation} fill>
            <img src={asset.url} alt="" className="h-full w-full object-cover" />
          </ScrollFX>
        ) : (
          <EmptyMedia label="Set a hero image" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${colors.background} 5%, transparent 65%)`,
            opacity: 0.55 + section.layout.overlayOpacity / 200,
          }}
        />
      </div>
      <div className="relative z-10 flex w-full flex-col gap-4 px-6 pb-20 md:px-16 md:pb-28">
        {section.eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: colors.accent }}>
            {section.eyebrow}
          </span>
        )}
        <h1 style={{ ...headingStyle({ ...section.style.typography, headingSize: '2xl' }), color: colors.text }}>
          {section.heading}
        </h1>
        <p
          style={{ ...bodyStyle(section.style.typography), color: colors.secondary }}
          className="max-w-2xl"
        >
          {section.subheading}
        </p>
      </div>
    </SectionShell>
  );
}
