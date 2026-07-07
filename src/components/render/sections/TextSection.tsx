import { ScrollFX } from '../ScrollFX';
import { SectionShell } from '../SectionShell';
import { alignClass, bodyStyle, headingStyle, resolveColors, textWidthClass } from '../styleHelpers';
import type { SectionProps } from './types';

export function TextSection({ section, theme }: SectionProps<'text'>) {
  const colors = resolveColors(section.style, theme);
  return (
    <SectionShell section={section} theme={theme}>
      <ScrollFX
        anim={section.animation}
        className={`flex flex-col gap-6 ${textWidthClass(section.layout.textWidth)} ${alignClass(section.layout.align)}`}
      >
        {section.heading && (
          <h2 style={{ ...headingStyle(section.style.typography), color: colors.text }}>{section.heading}</h2>
        )}
        {section.body && (
          <p style={{ ...bodyStyle(section.style.typography), color: colors.secondary }}>{section.body}</p>
        )}
        {section.pullQuote && (
          <blockquote
            className="border-l-2 pl-6 text-xl italic"
            style={{ borderColor: colors.accent, color: colors.text }}
          >
            "{section.pullQuote}"
            {section.credit && <footer className="mt-2 text-sm not-italic opacity-70">{section.credit}</footer>}
          </blockquote>
        )}
        {section.footnote && <p className="text-sm opacity-60">{section.footnote}</p>}
      </ScrollFX>
    </SectionShell>
  );
}
