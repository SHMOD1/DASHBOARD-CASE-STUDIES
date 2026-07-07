import { nanoid } from 'nanoid';
import { useDocStore } from '../../../store/useDocStore';
import type { Section, SectionPatch } from '../../../types';
import { Field, PanelSection, SegmentedField, TextArea, TextInput, ToggleField } from '../formControls';
import { MediaSelect } from '../MediaSelect';

export function ContentPanel({ section }: { section: Section }) {
  const updateSection = useDocStore((s) => s.updateSection);
  const media = useDocStore((s) => s.doc.media);
  const addMediaAsset = useDocStore((s) => s.addMediaAsset);

  function patch(p: SectionPatch) {
    updateSection(section.id, p);
  }

  switch (section.type) {
    case 'hero':
      return (
        <PanelSection title="Hero content">
          <Field label="Eyebrow">
            <TextInput value={section.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          </Field>
          <Field label="Heading">
            <TextInput value={section.heading} onChange={(e) => patch({ heading: e.target.value })} />
          </Field>
          <Field label="Subheading">
            <TextArea rows={3} value={section.subheading} onChange={(e) => patch({ subheading: e.target.value })} />
          </Field>
          <Field label="Background image">
            <MediaSelect value={section.mediaId} onChange={(id) => patch({ mediaId: id })} />
          </Field>
        </PanelSection>
      );

    case 'text':
      return (
        <PanelSection title="Text content">
          <Field label="Heading">
            <TextInput value={section.heading} onChange={(e) => patch({ heading: e.target.value })} />
          </Field>
          <Field label="Body">
            <TextArea rows={5} value={section.body} onChange={(e) => patch({ body: e.target.value })} />
          </Field>
          <Field label="Pull quote">
            <TextArea rows={2} value={section.pullQuote} onChange={(e) => patch({ pullQuote: e.target.value })} />
          </Field>
          <Field label="Credit">
            <TextInput value={section.credit} onChange={(e) => patch({ credit: e.target.value })} />
          </Field>
          <Field label="Footnote">
            <TextInput value={section.footnote} onChange={(e) => patch({ footnote: e.target.value })} />
          </Field>
        </PanelSection>
      );

    case 'image':
      return (
        <PanelSection title="Image content">
          <Field label="Image">
            <MediaSelect value={section.assetId} onChange={(id) => patch({ assetId: id })} />
          </Field>
          <Field label="Alt text">
            <TextInput value={section.alt} onChange={(e) => patch({ alt: e.target.value })} />
          </Field>
          <Field label="Caption">
            <TextInput value={section.caption} onChange={(e) => patch({ caption: e.target.value })} />
          </Field>
          <Field label="Photographer credit">
            <TextInput value={section.credit} onChange={(e) => patch({ credit: e.target.value })} />
          </Field>
        </PanelSection>
      );

    case 'gallery': {
      const images = media.filter((m) => m.type === 'image');
      return (
        <PanelSection title="Gallery content">
          <Field label="Images" hint="Click to toggle inclusion in this gallery">
            <div className="grid grid-cols-3 gap-1.5">
              {images.map((m) => {
                const active = section.assetIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() =>
                      patch({
                        assetIds: active
                          ? section.assetIds.filter((id) => id !== m.id)
                          : [...section.assetIds, m.id],
                      })
                    }
                    className={`aspect-square overflow-hidden rounded border-2 ${
                      active ? 'border-violet-400' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Upload new image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const id = nanoid(8);
                  addMediaAsset({
                    id,
                    name: file.name,
                    url: String(reader.result),
                    type: 'image',
                    folder: 'Uploads',
                    tags: [],
                    createdAt: Date.now(),
                  });
                  patch({ assetIds: [...section.assetIds, id] });
                };
                reader.readAsDataURL(file);
                e.target.value = '';
              }}
              className="block w-full text-xs text-white/50 file:mr-2 file:rounded-md file:border-0 file:bg-white/10 file:px-2 file:py-1 file:text-xs file:text-white"
            />
          </Field>
          {section.assetIds.map((id) => {
            const m = media.find((mm) => mm.id === id);
            if (!m) return null;
            return (
              <Field key={id} label={`Caption — ${m.name}`}>
                <TextInput
                  value={section.captions[id] ?? ''}
                  onChange={(e) => patch({ captions: { ...section.captions, [id]: e.target.value } })}
                />
              </Field>
            );
          })}
        </PanelSection>
      );
    }

    case 'video':
      return (
        <PanelSection title="Video content">
          <Field label="Source">
            <SegmentedField
              value={section.source}
              onChange={(v) => patch({ source: v })}
              options={[
                { value: 'upload', label: 'MP4' },
                { value: 'youtube', label: 'YouTube' },
                { value: 'vimeo', label: 'Vimeo' },
              ]}
            />
          </Field>
          {section.source === 'upload' ? (
            <Field label="Video file">
              <MediaSelect
                value={null}
                accept="video/*"
                kind="video"
                onChange={(id) => {
                  const asset = media.find((m) => m.id === id);
                  patch({ url: asset?.url ?? '' });
                }}
              />
              {section.url && <p className="truncate text-xs text-white/40">Current file set</p>}
            </Field>
          ) : (
            <Field label={`${section.source === 'youtube' ? 'YouTube' : 'Vimeo'} URL`}>
              <TextInput value={section.url} onChange={(e) => patch({ url: e.target.value })} />
            </Field>
          )}
          <Field label="Poster image">
            <MediaSelect value={section.posterId} onChange={(id) => patch({ posterId: id })} />
          </Field>
          <ToggleField label="Autoplay" value={section.autoplay} onChange={(v) => patch({ autoplay: v })} />
          <ToggleField label="Loop" value={section.loop} onChange={(v) => patch({ loop: v })} />
          <ToggleField label="Mute" value={section.mute} onChange={(v) => patch({ mute: v })} />
        </PanelSection>
      );

    case 'quote':
      return (
        <PanelSection title="Quote content">
          <Field label="Quote">
            <TextArea rows={4} value={section.quote} onChange={(e) => patch({ quote: e.target.value })} />
          </Field>
          <Field label="Credit">
            <TextInput value={section.credit} onChange={(e) => patch({ credit: e.target.value })} />
          </Field>
        </PanelSection>
      );

    case 'chapter':
      return (
        <PanelSection title="Chapter content">
          <Field label="Index">
            <TextInput value={section.index} onChange={(e) => patch({ index: e.target.value })} />
          </Field>
          <Field label="Title">
            <TextInput value={section.title} onChange={(e) => patch({ title: e.target.value })} />
          </Field>
          <Field label="Subtitle">
            <TextArea rows={2} value={section.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} />
          </Field>
        </PanelSection>
      );
  }
}
