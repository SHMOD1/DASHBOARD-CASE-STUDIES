"use client";

import type { ColorOverride, Section, Theme } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { SectionCard } from "@/dashboard/editors/fields";

const FIELDS: { key: keyof ColorOverride; label: string; themeKey: keyof Theme["colors"] }[] = [
  { key: "primary", label: "Primary", themeKey: "primary" },
  { key: "secondary", label: "Secondary", themeKey: "secondary" },
  { key: "background", label: "Background", themeKey: "background" },
  { key: "text", label: "Text", themeKey: "text" },
  { key: "accent", label: "Accent", themeKey: "accent" },
];

export function ColorEditor({ page, section, theme }: { page: { id: string }; section: Section; theme: Theme }) {
  const { updateSection } = useDashboardStore();
  const color = section.color;

  function patch(next: Partial<ColorOverride>) {
    updateSection(page.id, section.id, { color: { ...color, ...next } });
  }

  return (
    <SectionCard title="Color overrides">
      <p className="text-xs text-neutral-500">Leave a swatch off to inherit the global theme color for this section.</p>
      {FIELDS.map(({ key, label, themeKey }) => {
        const overridden = color[key] !== null;
        const value = color[key] ?? theme.colors[themeKey];
        return (
          <div key={key} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={overridden}
              onChange={(e) => patch({ [key]: e.target.checked ? theme.colors[themeKey] : null } as Partial<ColorOverride>)}
              className="h-3.5 w-3.5 accent-emerald-500"
            />
            <input
              type="color"
              value={value}
              disabled={!overridden}
              onChange={(e) => patch({ [key]: e.target.value } as Partial<ColorOverride>)}
              className="h-8 w-9 rounded border border-neutral-700 bg-neutral-900 disabled:opacity-30"
            />
            <span className="text-xs text-neutral-300">{label}</span>
          </div>
        );
      })}
    </SectionCard>
  );
}
