"use client";

import type {
  GalleryImageRef,
  MapPin,
  MediaAsset,
  Section,
  SectionContent,
  StatEntry,
  TimelineEntry,
} from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { genId } from "@/lib/id";
import { MediaPickerField } from "@/dashboard/editors/MediaPickerField";
import { RichTextField } from "@/dashboard/editors/RichTextField";
import { NumberField, SectionCard, SelectField, TextAreaField, TextField, ToggleField } from "@/dashboard/editors/fields";

interface Props {
  page: { id: string };
  section: Section;
  media: MediaAsset[];
}

function ListRow({ children, onRemove, onMoveUp, onMoveDown }: { children: React.ReactNode; onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void }) {
  return (
    <div className="space-y-2 rounded-md border border-neutral-800 bg-neutral-900/60 p-3">
      {children}
      <div className="flex justify-end gap-3 text-xs text-neutral-500">
        <button type="button" onClick={onMoveUp} className="hover:text-white">↑ Up</button>
        <button type="button" onClick={onMoveDown} className="hover:text-white">↓ Down</button>
        <button type="button" onClick={onRemove} className="hover:text-red-400">Remove</button>
      </div>
    </div>
  );
}

function move<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const next = [...list];
  const target = index + dir;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function ContentEditor({ page, section, media }: Props) {
  const { updateSection } = useDashboardStore();
  const content = section.content;

  function patch(next: Partial<SectionContent>) {
    updateSection(page.id, section.id, { content: { ...content, ...next } });
  }

  switch (section.type) {
    case "hero":
      return (
        <SectionCard title="Content">
          <TextField label="Chapter number" value={content.chapterNumber ?? ""} onChange={(v) => patch({ chapterNumber: v })} />
          <TextField label="Eyebrow" value={content.eyebrow ?? ""} onChange={(v) => patch({ eyebrow: v })} />
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <TextAreaField label="Subheading" value={content.subheading ?? ""} onChange={(v) => patch({ subheading: v })} />
          <MediaPickerField label="Background image" value={content.mediaId} media={media} onChange={(id) => patch({ mediaId: id })} />
        </SectionCard>
      );

    case "quote":
      return (
        <SectionCard title="Content">
          <TextAreaField label="Quote" value={content.quote ?? ""} onChange={(v) => patch({ quote: v })} rows={4} />
          <TextField label="Attribution" value={content.attribution ?? ""} onChange={(v) => patch({ attribution: v })} />
        </SectionCard>
      );

    case "fullscreenImage":
      return (
        <SectionCard title="Content">
          <MediaPickerField label="Image" value={content.mediaId} media={media} onChange={(id) => patch({ mediaId: id })} />
          <TextField label="Caption" value={content.caption ?? ""} onChange={(v) => patch({ caption: v })} />
          <TextField label="Credits" value={content.credits ?? ""} onChange={(v) => patch({ credits: v })} />
        </SectionCard>
      );

    case "splitImageText":
      return (
        <SectionCard title="Content">
          <TextField label="Eyebrow" value={content.eyebrow ?? ""} onChange={(v) => patch({ eyebrow: v })} />
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <RichTextField label="Body" value={content.body ?? ""} onChange={(v) => patch({ body: v })} />
          <MediaPickerField label="Image" value={content.mediaId} media={media} onChange={(id) => patch({ mediaId: id })} />
        </SectionCard>
      );

    case "gallery": {
      const items = content.gallery ?? [];
      return (
        <SectionCard title="Gallery">
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <div className="space-y-3">
            {items.map((item, i) => (
              <ListRow
                key={item.id}
                onRemove={() => patch({ gallery: items.filter((_, idx) => idx !== i) })}
                onMoveUp={() => patch({ gallery: move(items, i, -1) })}
                onMoveDown={() => patch({ gallery: move(items, i, 1) })}
              >
                <MediaPickerField
                  label={`Image ${i + 1}`}
                  value={item.mediaId}
                  media={media}
                  onChange={(id) =>
                    patch({ gallery: items.map((it, idx) => (idx === i ? { ...it, mediaId: id } : it)) })
                  }
                />
                <TextField
                  label="Caption"
                  value={item.caption}
                  onChange={(v) => patch({ gallery: items.map((it, idx) => (idx === i ? { ...it, caption: v } : it)) })}
                />
                <TextField
                  label="Photographer credit"
                  value={item.credit}
                  onChange={(v) => patch({ gallery: items.map((it, idx) => (idx === i ? { ...it, credit: v } : it)) })}
                />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              patch({
                gallery: [...items, { id: genId("gi"), mediaId: null, caption: "", credit: "" } satisfies GalleryImageRef],
              })
            }
            className="w-full rounded-md border border-dashed border-neutral-700 py-2 text-xs text-neutral-400 hover:border-neutral-500 hover:text-white"
          >
            + Add image
          </button>
        </SectionCard>
      );
    }

    case "video": {
      const video = content.video ?? { source: "mp4" as const, url: "", posterMediaId: null, autoplay: false, loop: false, muted: true, controls: true };
      return (
        <SectionCard title="Video">
          <TextField label="Eyebrow" value={content.eyebrow ?? ""} onChange={(v) => patch({ eyebrow: v })} />
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <SelectField
            label="Source"
            value={video.source}
            onChange={(source) => patch({ video: { ...video, source } })}
            options={[
              { value: "mp4", label: "MP4 file" },
              { value: "youtube", label: "YouTube" },
              { value: "vimeo", label: "Vimeo" },
            ]}
          />
          <TextField label="Video URL" value={video.url} onChange={(url) => patch({ video: { ...video, url } })} placeholder="https://..." />
          <MediaPickerField
            label="Poster image"
            value={video.posterMediaId}
            media={media}
            onChange={(id) => patch({ video: { ...video, posterMediaId: id } })}
          />
          <ToggleField label="Autoplay" value={video.autoplay} onChange={(v) => patch({ video: { ...video, autoplay: v } })} />
          <ToggleField label="Loop" value={video.loop} onChange={(v) => patch({ video: { ...video, loop: v } })} />
          <ToggleField label="Muted" value={video.muted} onChange={(v) => patch({ video: { ...video, muted: v } })} />
          <ToggleField label="Show controls" value={video.controls} onChange={(v) => patch({ video: { ...video, controls: v } })} />
        </SectionCard>
      );
    }

    case "timeline": {
      const entries = content.timeline ?? [];
      return (
        <SectionCard title="Timeline">
          <TextField label="Eyebrow" value={content.eyebrow ?? ""} onChange={(v) => patch({ eyebrow: v })} />
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <ListRow
                key={entry.id}
                onRemove={() => patch({ timeline: entries.filter((_, idx) => idx !== i) })}
                onMoveUp={() => patch({ timeline: move(entries, i, -1) })}
                onMoveDown={() => patch({ timeline: move(entries, i, 1) })}
              >
                <TextField label="Year" value={entry.year} onChange={(v) => patch({ timeline: entries.map((e, idx) => (idx === i ? { ...e, year: v } : e)) })} />
                <TextField label="Title" value={entry.title} onChange={(v) => patch({ timeline: entries.map((e, idx) => (idx === i ? { ...e, title: v } : e)) })} />
                <TextAreaField label="Body" value={entry.body} onChange={(v) => patch({ timeline: entries.map((e, idx) => (idx === i ? { ...e, body: v } : e)) })} />
                <MediaPickerField
                  label="Image"
                  value={entry.mediaId}
                  media={media}
                  onChange={(id) => patch({ timeline: entries.map((e, idx) => (idx === i ? { ...e, mediaId: id } : e)) })}
                />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              patch({
                timeline: [...entries, { id: genId("tl"), year: "", title: "", body: "", mediaId: null } satisfies TimelineEntry],
              })
            }
            className="w-full rounded-md border border-dashed border-neutral-700 py-2 text-xs text-neutral-400 hover:border-neutral-500 hover:text-white"
          >
            + Add entry
          </button>
        </SectionCard>
      );
    }

    case "map": {
      const pins = content.mapPins ?? [];
      return (
        <SectionCard title="Map">
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <div className="space-y-3">
            {pins.map((pin, i) => (
              <ListRow
                key={pin.id}
                onRemove={() => patch({ mapPins: pins.filter((_, idx) => idx !== i) })}
                onMoveUp={() => patch({ mapPins: move(pins, i, -1) })}
                onMoveDown={() => patch({ mapPins: move(pins, i, 1) })}
              >
                <TextField label="Label" value={pin.label} onChange={(v) => patch({ mapPins: pins.map((p, idx) => (idx === i ? { ...p, label: v } : p)) })} />
                <TextAreaField label="Description" value={pin.description} onChange={(v) => patch({ mapPins: pins.map((p, idx) => (idx === i ? { ...p, description: v } : p)) })} />
                <div className="grid grid-cols-2 gap-2">
                  <NumberField label="X (%)" value={pin.x} min={0} max={100} onChange={(v) => patch({ mapPins: pins.map((p, idx) => (idx === i ? { ...p, x: v } : p)) })} />
                  <NumberField label="Y (%)" value={pin.y} min={0} max={100} onChange={(v) => patch({ mapPins: pins.map((p, idx) => (idx === i ? { ...p, y: v } : p)) })} />
                </div>
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            onClick={() => patch({ mapPins: [...pins, { id: genId("mp"), x: 50, y: 50, label: "", description: "" } satisfies MapPin] })}
            className="w-full rounded-md border border-dashed border-neutral-700 py-2 text-xs text-neutral-400 hover:border-neutral-500 hover:text-white"
          >
            + Add pin
          </button>
        </SectionCard>
      );
    }

    case "stats": {
      const stats = content.stats ?? [];
      return (
        <SectionCard title="Stats">
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <div className="space-y-3">
            {stats.map((stat, i) => (
              <ListRow
                key={stat.id}
                onRemove={() => patch({ stats: stats.filter((_, idx) => idx !== i) })}
                onMoveUp={() => patch({ stats: move(stats, i, -1) })}
                onMoveDown={() => patch({ stats: move(stats, i, 1) })}
              >
                <NumberField label="Value" value={stat.value} onChange={(v) => patch({ stats: stats.map((s, idx) => (idx === i ? { ...s, value: v } : s)) })} />
                <TextField label="Suffix" value={stat.suffix} onChange={(v) => patch({ stats: stats.map((s, idx) => (idx === i ? { ...s, suffix: v } : s)) })} />
                <TextField label="Label" value={stat.label} onChange={(v) => patch({ stats: stats.map((s, idx) => (idx === i ? { ...s, label: v } : s)) })} />
              </ListRow>
            ))}
          </div>
          <button
            type="button"
            onClick={() => patch({ stats: [...stats, { id: genId("st"), value: 0, suffix: "", label: "" } satisfies StatEntry] })}
            className="w-full rounded-md border border-dashed border-neutral-700 py-2 text-xs text-neutral-400 hover:border-neutral-500 hover:text-white"
          >
            + Add stat
          </button>
        </SectionCard>
      );
    }

    case "ending":
      return (
        <SectionCard title="Content">
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <RichTextField label="Body" value={content.body ?? ""} onChange={(v) => patch({ body: v })} />
          <TextField label="Credits" value={content.credits ?? ""} onChange={(v) => patch({ credits: v })} />
        </SectionCard>
      );

    case "cta":
      return (
        <SectionCard title="Content">
          <TextField label="Heading" value={content.heading ?? ""} onChange={(v) => patch({ heading: v })} />
          <RichTextField label="Body" value={content.body ?? ""} onChange={(v) => patch({ body: v })} />
          <TextField label="Button label" value={content.ctaLabel ?? ""} onChange={(v) => patch({ ctaLabel: v })} />
          <TextField label="Button link" value={content.ctaHref ?? ""} onChange={(v) => patch({ ctaHref: v })} />
        </SectionCard>
      );

    default:
      return null;
  }
}
