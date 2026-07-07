"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { MediaAsset, Page } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { uploadFile } from "@/dashboard/uploadFile";
import { cn } from "@/lib/utils";

function usedMediaIds(pages: Page[]): Set<string> {
  const ids = new Set<string>();
  pages.forEach((page) => {
    if (page.seo.ogImageId) ids.add(page.seo.ogImageId);
    page.sections.forEach((section) => {
      if (section.content.mediaId) ids.add(section.content.mediaId);
      if (section.content.secondaryMediaId) ids.add(section.content.secondaryMediaId);
      if (section.layout.backgroundImageId) ids.add(section.layout.backgroundImageId);
      if (section.content.video?.posterMediaId) ids.add(section.content.video.posterMediaId);
      section.content.gallery?.forEach((g) => g.mediaId && ids.add(g.mediaId));
      section.content.timeline?.forEach((t) => t.mediaId && ids.add(t.mediaId));
    });
  });
  return ids;
}

export function MediaLibrary() {
  const { content, addMedia, removeMedia, updateMedia } = useDashboardStore();
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState<string>("all");
  const [onlyUnused, setOnlyUnused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!content) return null;

  const used = usedMediaIds(content.pages);
  const folders = ["all", ...new Set(content.media.map((m) => m.folder).filter(Boolean))];

  const filtered = content.media.filter((asset) => {
    if (folder !== "all" && asset.folder !== folder) return false;
    if (onlyUnused && used.has(asset.id)) return false;
    if (query && !`${asset.alt} ${asset.caption} ${asset.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    return true;
  });

  const activeAsset = content.media.find((m) => m.id === selected) ?? null;

  async function handleUpload(files: FileList) {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const asset = await uploadFile(file);
        addMedia(asset);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid h-full grid-cols-[1fr_20rem]">
      <div className="flex min-h-0 flex-col">
        <div className="flex flex-wrap items-center gap-3 border-b border-neutral-800 px-6 py-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by alt, caption or tag…"
            className="w-64 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm outline-none focus:border-neutral-500"
          />
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-sm"
          >
            {folders.map((f) => (
              <option key={f} value={f}>
                {f === "all" ? "All folders" : f}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-xs text-neutral-400">
            <input type="checkbox" checked={onlyUnused} onChange={(e) => setOnlyUnused(e.target.checked)} className="accent-emerald-500" />
            Unused only
          </label>
          <div className="ml-auto">
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto p-6 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <button
              key={asset.id}
              type="button"
              onClick={() => setSelected(asset.id)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-md border-2",
                selected === asset.id ? "border-emerald-500" : "border-transparent hover:border-neutral-700"
              )}
            >
              <Image src={asset.url} alt={asset.alt} fill className="object-cover" />
              {!used.has(asset.id) && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-neutral-950/80 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-neutral-300">
                  Unused
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-left text-[0.65rem] text-neutral-200 opacity-0 group-hover:opacity-100">
                {asset.alt || asset.url.split("/").pop()}
              </span>
            </button>
          ))}
          {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-neutral-500">No assets match.</p>}
        </div>
      </div>

      <div className="min-h-0 overflow-y-auto border-l border-neutral-800 p-5">
        {!activeAsset ? (
          <p className="text-sm text-neutral-500">Select an asset to edit its metadata.</p>
        ) : (
          <AssetDetail
            asset={activeAsset}
            onChange={(patch) => updateMedia(activeAsset.id, patch)}
            onDelete={() => {
              const inUse = used.has(activeAsset.id);
              const msg = inUse
                ? `"${activeAsset.alt || activeAsset.id}" is used on at least one page. Delete anyway?`
                : `Delete "${activeAsset.alt || activeAsset.id}"?`;
              if (confirm(msg)) {
                removeMedia(activeAsset.id);
                setSelected(null);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function AssetDetail({
  asset,
  onChange,
  onDelete,
}: {
  asset: MediaAsset;
  onChange: (patch: Partial<MediaAsset>) => void;
  onDelete: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={asset.url}
          alt={asset.alt}
          fill
          className="object-cover"
          style={{ objectPosition: `${asset.focalX ?? 50}% ${asset.focalY ?? 50}%` }}
        />
      </div>
      <Field label="Alt text" value={asset.alt} onChange={(v) => onChange({ alt: v })} />
      <Field label="Caption" value={asset.caption} onChange={(v) => onChange({ caption: v })} />
      <Field label="Photographer credit" value={asset.credit} onChange={(v) => onChange({ credit: v })} />
      <Field label="Folder" value={asset.folder} onChange={(v) => onChange({ folder: v })} />
      <Field
        label="Tags (comma separated)"
        value={asset.tags.join(", ")}
        onChange={(v) => onChange({ tags: v.split(",").map((t) => t.trim()).filter(Boolean) })}
      />
      <button
        type="button"
        onClick={onDelete}
        className="w-full rounded-md border border-red-900/50 py-1.5 text-xs text-red-400 hover:bg-red-950/40"
      >
        Delete asset
      </button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-neutral-400">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-sm text-white outline-none focus:border-neutral-500"
      />
    </label>
  );
}
