import { ScrollFX } from '../ScrollFX';
import { SectionShell } from '../SectionShell';
import { bodyStyle, headingStyle, resolveColors } from '../styleHelpers';
import type { SectionProps } from './types';

export function ChapterSection({ section, theme }: SectionProps<'chapter'>) {
  const colors = resolveColors(section.style, theme);
  return (
    <SectionShell section={section} theme={theme} fullBleed>
      <ScrollFX
        anim={section.animation}
        className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center"
      >
        <span className="text-sm tracking-[0.35em] opacity-50">{section.index}</span>
        <h2 style={{ ...headingStyle({ ...section.style.typography, headingSize: '2xl' }), color: colors.text }}>
          {section.title}
        </h2>
        <p style={{ ...bodyStyle(section.style.typography), color: colors.secondary }} className="max-w-xl">
          {section.subtitle}
        </p>
      </ScrollFX>
    </SectionShell>
  );
}
