import { ScrollFX } from '../ScrollFX';
import { SectionShell } from '../SectionShell';
import { alignClass, headingStyle, resolveColors, textWidthClass } from '../styleHelpers';
import type { SectionProps } from './types';

export function QuoteSection({ section, theme }: SectionProps<'quote'>) {
  const colors = resolveColors(section.style, theme);
  return (
    <SectionShell section={section} theme={theme}>
      <ScrollFX
        anim={section.animation}
        className={`mx-auto flex flex-col gap-6 ${textWidthClass(section.layout.textWidth)} ${alignClass(section.layout.align)}`}
      >
        <p style={{ ...headingStyle({ ...section.style.typography, headingSize: 'md' }), color: colors.accent }}>
          "{section.quote}"
        </p>
        {section.credit && <span className="text-sm opacity-70">{section.credit}</span>}
      </ScrollFX>
    </SectionShell>
  );
}
