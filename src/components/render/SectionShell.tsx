import type { BaseSection, ThemeConfig } from '../../types';
import { HEIGHT_CLASS, resolveColors } from './styleHelpers';

interface Props {
  section: BaseSection;
  theme: ThemeConfig;
  className?: string;
  fullBleed?: boolean;
  children: React.ReactNode;
}

export function SectionShell({ section, theme, className, fullBleed, children }: Props) {
  const colors = resolveColors(section.style, theme);
  const bg = section.layout.backgroundColor === 'theme' ? colors.background : section.layout.backgroundColor;
  return (
    <section
      id={section.id}
      className={`relative ${HEIGHT_CLASS[section.layout.height]} ${className ?? ''}`}
      style={{
        background: bg,
        color: colors.text,
        containerType: 'inline-size',
        paddingTop: fullBleed ? 0 : section.layout.paddingY,
        paddingBottom: fullBleed ? 0 : section.layout.paddingY,
        paddingLeft: fullBleed ? 0 : section.layout.paddingX,
        paddingRight: fullBleed ? 0 : section.layout.paddingX,
        marginTop: section.layout.marginY,
        marginBottom: section.layout.marginY,
      }}
    >
      {children}
    </section>
  );
}

export function EmptyMedia({ label = 'No media selected' }: { label?: string }) {
  return (
    <div className="flex h-full min-h-[220px] w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-4 text-center text-sm text-white/40">
      {label}
    </div>
  );
}
