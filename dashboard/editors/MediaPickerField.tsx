"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { MediaAsset } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { uploadFile } from "@/dashboard/uploadFile";

export function MediaPickerField({
  label,
  value,
  media,
  onChange,
}: {
  label: string;
  value: string | null | undefined;
  media: MediaAsset[];
  onChange: (mediaId: string | null) => void;
}) {
  const { addMedia } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const current = media.find((m) => m.id === value);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const asset = await uploadFile(file);
      addMedia(asset);
      onChange(asset.id);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-xs text-neutral-400">{label}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-700 bg-neutral-900 hover:border-neutral-500"
      >
        {current ? (
          <Image src={current.url} alt={current.alt} fill className="object-cover" />
        ) : (
          <span className="text-xs text-neutral-500">No image selected</span>
        )}
      </button>

      {open && (
        <div className="mt-2 rounded-md border border-neutral-700 bg-neutral-900 p-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Choose from library</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className="text-xs text-neutral-500 hover:text-red-400"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="text-xs text-neutral-300 hover:text-white"
              >
                {uploading ? "Uploading…" : "Upload new"}
              </button>
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <div className="grid max-h-56 grid-cols-4 gap-2 overflow-y-auto">
            {media.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  onChange(asset.id);
                  setOpen(false);
                }}
                className="relative aspect-square overflow-hidden rounded-md border border-neutral-800 hover:border-neutral-400"
              >
                <Image src={asset.url} alt={asset.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
