import type { CSSProperties } from "react";
import type { ColorOverride, Theme, TypographyOverride } from "@/types/content";

export function themeToCssVars(theme: Theme): CSSProperties {
  return {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-background": theme.colors.background,
    "--color-text": theme.colors.text,
    "--color-accent": theme.colors.accent,
    "--font-heading": theme.typography.fontHeading,
    "--font-body": theme.typography.fontBody,
    "--heading-size": `${theme.typography.headingSize}rem`,
    "--paragraph-size": `${theme.typography.paragraphSize}rem`,
    "--letter-spacing": `${theme.typography.letterSpacing}em`,
    "--line-height": theme.typography.lineHeight,
    "--font-weight-heading": theme.typography.weight,
  } as CSSProperties;
}

export function colorOverrideVars(color: ColorOverride): CSSProperties {
  const style: Record<string, string> = {};
  if (color.primary) style["--color-primary"] = color.primary;
  if (color.secondary) style["--color-secondary"] = color.secondary;
  if (color.background) style["--color-background"] = color.background;
  if (color.text) style["--color-text"] = color.text;
  if (color.accent) style["--color-accent"] = color.accent;
  return style as CSSProperties;
}

export function typographyOverrideVars(typography: TypographyOverride): CSSProperties {
  const style: Record<string, string | number> = {};
  if (typography.fontFamily) style["--font-heading"] = typography.fontFamily;
  if (typography.headingSize) style["--heading-size"] = `${typography.headingSize}rem`;
  if (typography.paragraphSize) style["--paragraph-size"] = `${typography.paragraphSize}rem`;
  if (typography.letterSpacing !== null) style["--letter-spacing"] = `${typography.letterSpacing}em`;
  if (typography.lineHeight) style["--line-height"] = typography.lineHeight;
  if (typography.weight) style["--font-weight-heading"] = typography.weight;
  return style as CSSProperties;
}

export function typographyClassNames(typography: TypographyOverride): string {
  const classes: string[] = [];
  if (typography.uppercase) classes.push("uppercase");
  if (typography.bold) classes.push("font-bold");
  return classes.join(" ");
}
