"use client";

import type { Section, TypographyOverride } from "@/types/content";
import { FONT_OPTIONS } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { RangeField, SectionCard, SelectField, ToggleField } from "@/dashboard/editors/fields";

function OverridableRange({
  label,
  value,
  fallback,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number | null;
  fallback: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number | null) => void;
}) {
  const overridden = value !== null;
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={overridden}
        onChange={(e) => onChange(e.target.checked ? fallback : null)}
        className="mt-5 h-3.5 w-3.5 accent-emerald-500"
      />
      <div className="flex-1 opacity-100 [&:has(input:disabled)]:opacity-40">
        <RangeField label={label} value={value ?? fallback} min={min} max={max} step={step} onChange={onChange} />
      </div>
    </div>
  );
}

export function TypographyEditor({ page, section }: { page: { id: string }; section: Section }) {
  const { updateSection } = useDashboardStore();
  const typography = section.typography;

  function patch(next: Partial<TypographyOverride>) {
    updateSection(page.id, section.id, { typography: { ...typography, ...next } });
  }

  return (
    <SectionCard title="Typography overrides">
      <SelectField
        label="Font family"
        value={typography.fontFamily ?? ""}
        onChange={(v) => patch({ fontFamily: v || null })}
        options={[{ value: "", label: "Inherit theme" }, ...FONT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))]}
      />
      <OverridableRange label="Heading size (rem)" value={typography.headingSize} fallback={4.5} min={1.5} max={9} step={0.1} onChange={(v) => patch({ headingSize: v })} />
      <OverridableRange label="Paragraph size (rem)" value={typography.paragraphSize} fallback={1.125} min={0.75} max={2} step={0.05} onChange={(v) => patch({ paragraphSize: v })} />
      <OverridableRange label="Letter spacing (em)" value={typography.letterSpacing} fallback={0} min={-0.05} max={0.3} step={0.01} onChange={(v) => patch({ letterSpacing: v })} />
      <OverridableRange label="Line height" value={typography.lineHeight} fallback={1.5} min={0.9} max={2.2} step={0.05} onChange={(v) => patch({ lineHeight: v })} />
      <OverridableRange label="Weight" value={typography.weight} fallback={500} min={300} max={900} step={100} onChange={(v) => patch({ weight: v })} />
      <ToggleField label="Uppercase" value={typography.uppercase} onChange={(v) => patch({ uppercase: v })} />
      <ToggleField label="Bold" value={typography.bold} onChange={(v) => patch({ bold: v })} />
    </SectionCard>
  );
}
