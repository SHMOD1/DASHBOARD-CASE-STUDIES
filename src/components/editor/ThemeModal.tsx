import { useDocStore } from '../../store/useDocStore';
import { CloseIcon } from '../icons';
import { ColorField, Field, PanelSection, SegmentedField } from './formControls';
import { ModalBackdrop } from './Modal';

export function ThemeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useDocStore((s) => s.doc.theme);
  const updateTheme = useDocStore((s) => s.updateTheme);

  if (!open) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-[#121116] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Theme</h3>
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5">
          <PanelSection title="Colors">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Primary">
                <ColorField value={theme.primary} onChange={(v) => updateTheme({ primary: v })} />
              </Field>
              <Field label="Secondary">
                <ColorField value={theme.secondary} onChange={(v) => updateTheme({ secondary: v })} />
              </Field>
              <Field label="Background">
                <ColorField value={theme.background} onChange={(v) => updateTheme({ background: v })} />
              </Field>
              <Field label="Text">
                <ColorField value={theme.text} onChange={(v) => updateTheme({ text: v })} />
              </Field>
              <Field label="Accent">
                <ColorField value={theme.accent} onChange={(v) => updateTheme({ accent: v })} />
              </Field>
            </div>
          </PanelSection>
          <PanelSection title="Typography">
            <Field label="Heading font">
              <SegmentedField
                value={theme.fontHeading}
                onChange={(v) => updateTheme({ fontHeading: v })}
                options={[
                  { value: 'sans', label: 'Sans' },
                  { value: 'serif', label: 'Serif' },
                  { value: 'mono', label: 'Mono' },
                  { value: 'display', label: 'Display' },
                ]}
              />
            </Field>
            <Field label="Body font">
              <SegmentedField
                value={theme.fontBody}
                onChange={(v) => updateTheme({ fontBody: v })}
                options={[
                  { value: 'sans', label: 'Sans' },
                  { value: 'serif', label: 'Serif' },
                  { value: 'mono', label: 'Mono' },
                  { value: 'display', label: 'Display' },
                ]}
              />
            </Field>
          </PanelSection>
        </div>
      </div>
    </ModalBackdrop>
  );
}
