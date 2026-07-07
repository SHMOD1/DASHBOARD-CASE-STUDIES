import { useDocStore } from '../../../store/useDocStore';
import type { Section, StyleConfig, TypographyConfig } from '../../../types';
import { ColorField, Field, PanelSection, SegmentedField, SliderField, ToggleField } from '../formControls';

export function StylePanel({ section }: { section: Section }) {
  const updateSection = useDocStore((s) => s.updateSection);
  const theme = useDocStore((s) => s.doc.theme);
  const style = section.style;

  function patchStyle(p: Partial<StyleConfig>) {
    updateSection(section.id, { style: { ...style, ...p } });
  }
  function patchTypo(p: Partial<TypographyConfig>) {
    patchStyle({ typography: { ...style.typography, ...p } });
  }

  const typo = style.typography;

  return (
    <>
      <PanelSection title="Colors">
        <ToggleField
          label="Use theme colors"
          value={style.useThemeColors}
          onChange={(v) => patchStyle({ useThemeColors: v })}
        />
        {!style.useThemeColors && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Primary">
              <ColorField value={style.primary ?? theme.primary} onChange={(v) => patchStyle({ primary: v })} />
            </Field>
            <Field label="Secondary">
              <ColorField value={style.secondary ?? theme.secondary} onChange={(v) => patchStyle({ secondary: v })} />
            </Field>
            <Field label="Background">
              <ColorField
                value={style.background ?? theme.background}
                onChange={(v) => patchStyle({ background: v })}
              />
            </Field>
            <Field label="Text">
              <ColorField value={style.text ?? theme.text} onChange={(v) => patchStyle({ text: v })} />
            </Field>
            <Field label="Accent">
              <ColorField value={style.accent ?? theme.accent} onChange={(v) => patchStyle({ accent: v })} />
            </Field>
          </div>
        )}
      </PanelSection>

      <PanelSection title="Typography">
        <Field label="Font">
          <SegmentedField
            value={typo.font}
            onChange={(v) => patchTypo({ font: v })}
            options={[
              { value: 'sans', label: 'Sans' },
              { value: 'serif', label: 'Serif' },
              { value: 'mono', label: 'Mono' },
              { value: 'display', label: 'Display' },
            ]}
          />
        </Field>
        <Field label="Heading size">
          <SegmentedField
            value={typo.headingSize}
            onChange={(v) => patchTypo({ headingSize: v })}
            options={[
              { value: 'sm', label: 'S' },
              { value: 'md', label: 'M' },
              { value: 'lg', label: 'L' },
              { value: 'xl', label: 'XL' },
              { value: '2xl', label: '2XL' },
            ]}
          />
        </Field>
        <Field label="Paragraph size">
          <SegmentedField
            value={typo.paragraphSize}
            onChange={(v) => patchTypo({ paragraphSize: v })}
            options={[
              { value: 'sm', label: 'S' },
              { value: 'md', label: 'M' },
              { value: 'lg', label: 'L' },
            ]}
          />
        </Field>
        <Field label="Letter spacing">
          <SegmentedField
            value={typo.letterSpacing}
            onChange={(v) => patchTypo({ letterSpacing: v })}
            options={[
              { value: 'tight', label: 'Tight' },
              { value: 'normal', label: 'Normal' },
              { value: 'wide', label: 'Wide' },
            ]}
          />
        </Field>
        <Field label="Line height">
          <SegmentedField
            value={typo.lineHeight}
            onChange={(v) => patchTypo({ lineHeight: v })}
            options={[
              { value: 'tight', label: 'Tight' },
              { value: 'normal', label: 'Normal' },
              { value: 'relaxed', label: 'Relaxed' },
            ]}
          />
        </Field>
        <Field label="Weight">
          <SliderField value={typo.weight} onChange={(v) => patchTypo({ weight: v })} min={300} max={900} step={100} />
        </Field>
        <ToggleField label="Uppercase" value={typo.uppercase} onChange={(v) => patchTypo({ uppercase: v })} />
        <ToggleField label="Bold" value={typo.bold} onChange={(v) => patchTypo({ bold: v })} />
      </PanelSection>
    </>
  );
}
