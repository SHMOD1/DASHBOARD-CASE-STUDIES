import type { HeightPreset, StyleConfig, ThemeConfig, TypographyConfig } from '../../types';

export const FONT_STACKS: Record<TypographyConfig['font'], string> = {
  sans: 'system-ui, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, "Iowan Old Style", "Times New Roman", serif',
  mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  display: '"Helvetica Neue", Arial, sans-serif',
};

// Sized with container-query units (cqi) so headings scale down inside the
// narrower device-preview frames instead of overflowing them.
const HEADING_SIZE_REM: Record<TypographyConfig['headingSize'], string> = {
  sm: 'clamp(1.15rem, 4.5cqi, 1.5rem)',
  md: 'clamp(1.4rem, 6.5cqi, 2.25rem)',
  lg: 'clamp(1.6rem, 8.5cqi, 3rem)',
  xl: 'clamp(1.8rem, 10.5cqi, 4rem)',
  '2xl': 'clamp(2rem, 13.5cqi, 5.5rem)',
};

const PARAGRAPH_SIZE_REM: Record<TypographyConfig['paragraphSize'], string> = {
  sm: 'clamp(0.85rem, 2.6cqi, 0.95rem)',
  md: 'clamp(0.95rem, 3cqi, 1.15rem)',
  lg: 'clamp(1rem, 3.4cqi, 1.35rem)',
};

const LETTER_SPACING: Record<TypographyConfig['letterSpacing'], string> = {
  tight: '-0.02em',
  normal: 'normal',
  wide: '0.08em',
};

const LINE_HEIGHT: Record<TypographyConfig['lineHeight'], string> = {
  tight: '1.1',
  normal: '1.45',
  relaxed: '1.8',
};

export const HEIGHT_CLASS: Record<HeightPreset, string> = {
  auto: '',
  half: 'min-h-[50vh]',
  full: 'min-h-screen',
  tall: 'min-h-[85vh]',
};

export function headingStyle(typo: TypographyConfig): React.CSSProperties {
  return {
    fontFamily: FONT_STACKS[typo.font],
    fontSize: HEADING_SIZE_REM[typo.headingSize],
    letterSpacing: LETTER_SPACING[typo.letterSpacing],
    lineHeight: LINE_HEIGHT[typo.lineHeight],
    textTransform: typo.uppercase ? 'uppercase' : 'none',
    fontWeight: typo.bold ? 800 : typo.weight,
  };
}

export function bodyStyle(typo: TypographyConfig): React.CSSProperties {
  return {
    fontFamily: FONT_STACKS[typo.font],
    fontSize: PARAGRAPH_SIZE_REM[typo.paragraphSize],
    letterSpacing: LETTER_SPACING[typo.letterSpacing],
    lineHeight: LINE_HEIGHT[typo.lineHeight],
    textTransform: typo.uppercase ? 'uppercase' : 'none',
    fontWeight: typo.bold ? 700 : Math.min(typo.weight, 500),
  };
}

export function resolveColors(style: StyleConfig, theme: ThemeConfig) {
  if (style.useThemeColors) {
    return {
      primary: theme.primary,
      secondary: theme.secondary,
      background: theme.background,
      text: theme.text,
      accent: theme.accent,
    };
  }
  return {
    primary: style.primary || theme.primary,
    secondary: style.secondary || theme.secondary,
    background: style.background || theme.background,
    text: style.text || theme.text,
    accent: style.accent || theme.accent,
  };
}

export function textWidthClass(width: string): string {
  switch (width) {
    case 'narrow':
      return 'max-w-xl';
    case 'medium':
      return 'max-w-3xl';
    case 'wide':
      return 'max-w-5xl';
    default:
      return 'max-w-none';
  }
}

export function alignClass(align: string): string {
  switch (align) {
    case 'left':
      return 'items-start text-left mr-auto';
    case 'right':
      return 'items-end text-right ml-auto';
    default:
      return 'items-center text-center mx-auto';
  }
}
