import { useDocStore } from '../../store/useDocStore';
import { CloseIcon, PlusIcon, TrashIcon } from '../icons';
import { Field, PanelSection, TextArea, TextInput } from './formControls';
import { MediaSelect } from './MediaSelect';
import { ModalBackdrop } from './Modal';

export function SeoModal() {
  const open = useDocStore((s) => s.seoOpen);
  const setOpen = useDocStore((s) => s.setSeoOpen);
  const seo = useDocStore((s) => s.doc.seo);
  const updateSeo = useDocStore((s) => s.updateSeo);

  if (!open) return null;

  return (
    <ModalBackdrop onClose={() => setOpen(false)}>
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121116] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h3 className="text-sm font-semibold text-white">SEO settings</h3>
          <button type="button" onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          <PanelSection title="Basics">
            <Field label="Title">
              <TextInput value={seo.title} onChange={(e) => updateSeo({ title: e.target.value })} />
            </Field>
            <Field label="Description">
              <TextArea rows={3} value={seo.description} onChange={(e) => updateSeo({ description: e.target.value })} />
            </Field>
            <Field label="Slug">
              <TextInput value={seo.slug} onChange={(e) => updateSeo({ slug: e.target.value })} />
            </Field>
            <Field label="OG image">
              <MediaSelect value={seo.ogImageId} onChange={(id) => updateSeo({ ogImageId: id })} />
            </Field>
          </PanelSection>

          <PanelSection title="Meta tags">
            {seo.metaTags.map((tag, i) => (
              <div key={i} className="flex items-center gap-2">
                <TextInput
                  placeholder="key"
                  value={tag.key}
                  onChange={(e) => {
                    const next = [...seo.metaTags];
                    next[i] = { ...next[i], key: e.target.value };
                    updateSeo({ metaTags: next });
                  }}
                />
                <TextInput
                  placeholder="value"
                  value={tag.value}
                  onChange={(e) => {
                    const next = [...seo.metaTags];
                    next[i] = { ...next[i], value: e.target.value };
                    updateSeo({ metaTags: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() => updateSeo({ metaTags: seo.metaTags.filter((_, idx) => idx !== i) })}
                  className="shrink-0 rounded p-1.5 text-white/40 hover:bg-red-500/20 hover:text-red-300"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => updateSeo({ metaTags: [...seo.metaTags, { key: '', value: '' }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-white/15 py-1.5 text-xs text-white/60 hover:border-violet-400/50 hover:text-violet-300"
            >
              <PlusIcon className="h-3.5 w-3.5" /> Add meta tag
            </button>
          </PanelSection>

          <PanelSection title="Schema (JSON-LD)">
            <TextArea
              rows={5}
              value={seo.schema}
              onChange={(e) => updateSeo({ schema: e.target.value })}
              className="font-mono text-xs"
            />
          </PanelSection>
        </div>
      </div>
    </ModalBackdrop>
  );
}
