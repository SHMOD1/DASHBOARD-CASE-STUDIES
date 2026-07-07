import { useDocStore } from '../../../store/useDocStore';
import type { LayoutConfig, Section } from '../../../types';
import { ColorField, Field, PanelSection, SegmentedField, SliderField } from '../formControls';

export function LayoutPanel({ section }: { section: Section }) {
  const updateSection = useDocStore((s) => s.updateSection);
  const layout = section.layout;

  function patch(p: Partial<LayoutConfig>) {
    updateSection(section.id, { layout: { ...layout, ...p } });
  }

  const showImagePosition = section.type === 'image' || section.type === 'hero';
  const showColumns = section.type === 'gallery';

  return (
    <PanelSection title="Layout">
      <Field label="Section height">
        <SegmentedField
          value={layout.height}
          onChange={(v) => patch({ height: v })}
          options={[
            { value: 'auto', label: 'Auto' },
            { value: 'half', label: 'Half' },
            { value: 'tall', label: 'Tall' },
            { value: 'full', label: 'Full' },
          ]}
        />
      </Field>
      <Field label="Alignment">
        <SegmentedField
          value={layout.align}
          onChange={(v) => patch({ align: v })}
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
        />
      </Field>
      <Field label="Text width">
        <SegmentedField
          value={layout.textWidth}
          onChange={(v) => patch({ textWidth: v })}
          options={[
            { value: 'narrow', label: 'Narrow' },
            { value: 'medium', label: 'Medium' },
            { value: 'wide', label: 'Wide' },
            { value: 'full', label: 'Full' },
          ]}
        />
      </Field>
      {showImagePosition && (
        <Field label="Image position">
          <SegmentedField
            value={layout.imagePosition}
            onChange={(v) => patch({ imagePosition: v })}
            options={[
              { value: 'background', label: 'Background' },
              { value: 'top', label: 'Top' },
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
            ]}
          />
        </Field>
      )}
      {showColumns && (
        <Field label="Columns">
          <SegmentedField
            value={String(layout.columns) as '1' | '2' | '3'}
            onChange={(v) => patch({ columns: Number(v) as 1 | 2 | 3 })}
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
            ]}
          />
        </Field>
      )}
      <Field label="Padding (vertical)">
        <SliderField value={layout.paddingY} onChange={(v) => patch({ paddingY: v })} min={0} max={200} suffix="px" />
      </Field>
      <Field label="Padding (horizontal)">
        <SliderField value={layout.paddingX} onChange={(v) => patch({ paddingX: v })} min={0} max={160} suffix="px" />
      </Field>
      <Field label="Margin (vertical)">
        <SliderField value={layout.marginY} onChange={(v) => patch({ marginY: v })} min={0} max={160} suffix="px" />
      </Field>
      <Field label="Background color">
        <ColorField
          value={layout.backgroundColor === 'theme' ? '#000000' : layout.backgroundColor}
          onChange={(v) => patch({ backgroundColor: v })}
        />
        <button
          type="button"
          onClick={() => patch({ backgroundColor: 'theme' })}
          className="mt-1 text-[11px] text-violet-300/80 hover:text-violet-200"
        >
          Reset to theme background
        </button>
      </Field>
      <Field label="Overlay opacity">
        <SliderField value={layout.overlayOpacity} onChange={(v) => patch({ overlayOpacity: v })} min={0} max={100} suffix="%" />
      </Field>
    </PanelSection>
  );
}
