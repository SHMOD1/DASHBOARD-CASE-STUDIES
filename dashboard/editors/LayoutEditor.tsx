"use client";

import type { LayoutConfig, MediaAsset, Section } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { MediaPickerField } from "@/dashboard/editors/MediaPickerField";
import { NumberField, RangeField, SectionCard, SelectField } from "@/dashboard/editors/fields";

export function LayoutEditor({ page, section, media }: { page: { id: string }; section: Section; media: MediaAsset[] }) {
  const { updateSection } = useDashboardStore();
  const layout = section.layout;

  function patch(next: Partial<LayoutConfig>) {
    updateSection(page.id, section.id, { layout: { ...layout, ...next } });
  }

  return (
    <SectionCard title="Layout">
      <SelectField
        label="Section height"
        value={layout.height}
        onChange={(v) => patch({ height: v })}
        options={[
          { value: "auto", label: "Auto" },
          { value: "half", label: "Half screen" },
          { value: "screen", label: "Full screen" },
          { value: "tall", label: "Tall (scroll room)" },
        ]}
      />
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Padding Y (rem)" value={layout.paddingY} min={0} max={20} step={0.5} onChange={(v) => patch({ paddingY: v })} />
        <NumberField label="Padding X (rem)" value={layout.paddingX} min={0} max={20} step={0.5} onChange={(v) => patch({ paddingX: v })} />
        <NumberField label="Margin Y (rem)" value={layout.marginY} min={0} max={20} step={0.5} onChange={(v) => patch({ marginY: v })} />
        <SelectField
          label="Columns"
          value={String(layout.columns) as "1" | "2" | "3"}
          onChange={(v) => patch({ columns: Number(v) as 1 | 2 | 3 })}
          options={[{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }]}
        />
      </div>
      <SelectField
        label="Alignment"
        value={layout.align}
        onChange={(v) => patch({ align: v })}
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ]}
      />
      <SelectField
        label="Image position"
        value={layout.imagePosition}
        onChange={(v) => patch({ imagePosition: v })}
        options={[
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
          { value: "background", label: "Background" },
          { value: "top", label: "Top" },
          { value: "bottom", label: "Bottom" },
        ]}
      />
      <RangeField label="Text width (%)" value={layout.textWidth} min={20} max={100} onChange={(v) => patch({ textWidth: v })} />
      <RangeField label="Overlay opacity" value={layout.overlayOpacity} min={0} max={1} step={0.05} onChange={(v) => patch({ overlayOpacity: v })} />
      <div>
        <p className="mb-1.5 text-xs text-neutral-400">Background color (overrides theme)</p>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={layout.backgroundColor ?? "#0b1220"}
            onChange={(e) => patch({ backgroundColor: e.target.value })}
            className="h-8 w-9 rounded border border-neutral-700 bg-neutral-900"
          />
          <button
            type="button"
            onClick={() => patch({ backgroundColor: null })}
            className="text-xs text-neutral-500 hover:text-white"
          >
            Clear
          </button>
        </div>
      </div>
      <MediaPickerField
        label="Background image"
        value={layout.backgroundImageId}
        media={media}
        onChange={(id) => patch({ backgroundImageId: id })}
      />
    </SectionCard>
  );
}
