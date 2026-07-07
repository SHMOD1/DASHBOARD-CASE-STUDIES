"use client";

import { useDashboardStore } from "@/lib/store";
import { FONT_OPTIONS } from "@/types/content";
import { ColorField, NumberField, RangeField, SectionCard, SelectField, ToggleField } from "@/dashboard/editors/fields";

export function ThemeEditor() {
  const { content, updateTheme } = useDashboardStore();
  if (!content) return null;
  const { theme } = content;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-1 text-xl font-semibold">Theme</h1>
      <p className="mb-8 text-sm text-neutral-500">
        Global colors and typography. Any section can override these individually.
      </p>

      <div className="overflow-hidden rounded-lg border border-neutral-800">
        <SectionCard title="Colors">
          <div className="grid grid-cols-2 gap-4">
            <ColorField label="Primary" value={theme.colors.primary} onChange={(v) => updateTheme({ colors: { ...theme.colors, primary: v } })} />
            <ColorField label="Secondary" value={theme.colors.secondary} onChange={(v) => updateTheme({ colors: { ...theme.colors, secondary: v } })} />
            <ColorField label="Background" value={theme.colors.background} onChange={(v) => updateTheme({ colors: { ...theme.colors, background: v } })} />
            <ColorField label="Text" value={theme.colors.text} onChange={(v) => updateTheme({ colors: { ...theme.colors, text: v } })} />
            <ColorField label="Accent" value={theme.colors.accent} onChange={(v) => updateTheme({ colors: { ...theme.colors, accent: v } })} />
          </div>
        </SectionCard>

        <SectionCard title="Typography">
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Heading font"
              value={theme.typography.fontHeading}
              onChange={(v) => updateTheme({ typography: { ...theme.typography, fontHeading: v } })}
              options={FONT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))}
            />
            <SelectField
              label="Body font"
              value={theme.typography.fontBody}
              onChange={(v) => updateTheme({ typography: { ...theme.typography, fontBody: v } })}
              options={FONT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))}
            />
            <NumberField label="Heading size (rem)" value={theme.typography.headingSize} min={2} max={9} step={0.1} onChange={(v) => updateTheme({ typography: { ...theme.typography, headingSize: v } })} />
            <NumberField label="Paragraph size (rem)" value={theme.typography.paragraphSize} min={0.8} max={2} step={0.05} onChange={(v) => updateTheme({ typography: { ...theme.typography, paragraphSize: v } })} />
            <RangeField label="Letter spacing (em)" value={theme.typography.letterSpacing} min={-0.05} max={0.3} step={0.01} onChange={(v) => updateTheme({ typography: { ...theme.typography, letterSpacing: v } })} />
            <RangeField label="Line height" value={theme.typography.lineHeight} min={0.9} max={2.2} step={0.05} onChange={(v) => updateTheme({ typography: { ...theme.typography, lineHeight: v } })} />
            <RangeField label="Weight" value={theme.typography.weight} min={300} max={900} step={100} onChange={(v) => updateTheme({ typography: { ...theme.typography, weight: v } })} />
          </div>
          <ToggleField
            label="Uppercase headings"
            value={theme.typography.uppercaseHeadings}
            onChange={(v) => updateTheme({ typography: { ...theme.typography, uppercaseHeadings: v } })}
          />
          <ToggleField
            label="Bold headings"
            value={theme.typography.boldHeadings}
            onChange={(v) => updateTheme({ typography: { ...theme.typography, boldHeadings: v } })}
          />
        </SectionCard>
      </div>
    </div>
  );
}
