"use client";

import Image from "next/image";
import type { MediaAsset, Section } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { SectionCard, TextField } from "@/dashboard/editors/fields";

function collectSectionMediaIds(section: Section): string[] {
  const ids = new Set<string>();
  if (section.content.mediaId) ids.add(section.content.mediaId);
  if (section.content.secondaryMediaId) ids.add(section.content.secondaryMediaId);
  if (section.layout.backgroundImageId) ids.add(section.layout.backgroundImageId);
  if (section.content.video?.posterMediaId) ids.add(section.content.video.posterMediaId);
  section.content.gallery?.forEach((g) => g.mediaId && ids.add(g.mediaId));
  section.content.timeline?.forEach((t) => t.mediaId && ids.add(t.mediaId));
  return [...ids];
}

function AssetForm({ asset }: { asset: MediaAsset }) {
  const { updateMedia } = useDashboardStore();

  return (
    <div className="space-y-3 rounded-md border border-neutral-800 bg-neutral-900/60 p-3">
      <div className="relative h-32 w-full overflow-hidden rounded-md">
        <Image
          src={asset.url}
          alt={asset.alt}
          fill
          className="object-cover"
          style={{ objectPosition: `${asset.focalX ?? 50}% ${asset.focalY ?? 50}%` }}
        />
      </div>
      <TextField label="Alt text" value={asset.alt} onChange={(v) => updateMedia(asset.id, { alt: v })} />
      <TextField label="Caption" value={asset.caption} onChange={(v) => updateMedia(asset.id, { caption: v })} />
      <TextField label="Photographer credit" value={asset.credit} onChange={(v) => updateMedia(asset.id, { credit: v })} />
      <div>
        <p className="mb-1.5 text-xs text-neutral-400">Crop focal point</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="range"
            min={0}
            max={100}
            value={asset.focalX ?? 50}
            onChange={(e) => updateMedia(asset.id, { focalX: Number(e.target.value) })}
            className="accent-emerald-500"
          />
          <input
            type="range"
            min={0}
            max={100}
            value={asset.focalY ?? 50}
            onChange={(e) => updateMedia(asset.id, { focalY: Number(e.target.value) })}
            className="accent-emerald-500"
          />
        </div>
        <div className="mt-1 flex justify-between text-[0.65rem] text-neutral-500">
          <span>Horizontal</span>
          <span>Vertical</span>
        </div>
      </div>
    </div>
  );
}

export function MediaEditor({ section, media }: { section: Section; media: MediaAsset[] }) {
  const ids = collectSectionMediaIds(section);
  const assets = ids.map((id) => media.find((m) => m.id === id)).filter((m): m is MediaAsset => Boolean(m));

  if (assets.length === 0) {
    return (
      <SectionCard title="Media">
        <p className="text-xs text-neutral-500">
          This section has no images assigned yet. Add one from the Content tab, then come back here to edit alt
          text, captions, credit and crop framing.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Media">
      <p className="text-xs text-neutral-500">Editing metadata for every asset used by this section.</p>
      {assets.map((asset) => (
        <AssetForm key={asset.id} asset={asset} />
      ))}
    </SectionCard>
  );
}
