import { nanoid } from 'nanoid';
import { useMemo, useRef, useState } from 'react';
import { useDocStore } from '../../store/useDocStore';
import type { Section } from '../../types';
import { CloseIcon, SearchIcon, TrashIcon, UploadIcon } from '../icons';
import { TextInput } from './formControls';
import { ModalBackdrop } from './Modal';

function usedAssetIds(sections: Section[]): Set<string> {
  const ids = new Set<string>();
  for (const s of sections) {
    if (s.type === 'hero' && s.mediaId) ids.add(s.mediaId);
    if (s.type === 'image' && s.assetId) ids.add(s.assetId);
    if (s.type === 'gallery') s.assetIds.forEach((id) => ids.add(id));
    if (s.type === 'video' && s.posterId) ids.add(s.posterId);
  }
  return ids;
}

export function MediaLibraryModal() {
  const open = useDocStore((s) => s.mediaOpen);
  const setOpen = useDocStore((s) => s.setMediaOpen);
  const media = useDocStore((s) => s.doc.media);
  const sections = useDocStore((s) => s.doc.sections);
  const addMediaAsset = useDocStore((s) => s.addMediaAsset);
  const removeMediaAsset = useDocStore((s) => s.removeMediaAsset);

  const [query, setQuery] = useState('');
  const [folder, setFolder] = useState('all');
  const [showUnusedOnly, setShowUnusedOnly] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const used = useMemo(() => usedAssetIds(sections), [sections]);
  const folders = useMemo(() => ['all', ...new Set(media.map((m) => m.folder))], [media]);

  const filtered = media.filter((m) => {
    if (folder !== 'all' && m.folder !== folder) return false;
    if (showUnusedOnly && used.has(m.id)) return false;
    if (query && !m.name.toLowerCase().includes(query.toLowerCase()) && !m.tags.some((t) => t.includes(query.toLowerCase())))
      return false;
    return true;
  });

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const type = file.type.startsWith('video') ? 'video' : 'image';
      reader.onload = () => {
        addMediaAsset({
          id: nanoid(8),
          name: file.name,
          url: String(reader.result),
          type,
          folder: 'Uploads',
          tags: [],
          createdAt: Date.now(),
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  }

  if (!open) return null;

  return (
    <ModalBackdrop onClose={() => setOpen(false)}>
      <div className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121116] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Media library</h3>
          <button type="button" onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-5 py-3">
          <div className="relative flex-1 min-w-[160px]">
            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
            <TextInput
              placeholder="Search by name or tag"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-7"
            />
          </div>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="cursor-pointer rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-sm text-white/80"
          >
            {folders.map((f) => (
              <option key={f} value={f} className="bg-[#17161d]">
                {f === 'all' ? 'All folders' : f}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowUnusedOnly((v) => !v)}
            className={`rounded-md border px-2.5 py-1.5 text-xs ${
              showUnusedOnly
                ? 'border-violet-400/60 bg-violet-500/20 text-violet-200'
                : 'border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            Unused only
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500"
          >
            <UploadIcon className="h-3.5 w-3.5" /> Upload
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} />
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-white/30">No assets match.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((m) => (
                <div key={m.id} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                  <div className="aspect-square overflow-hidden bg-black/30">
                    {m.type === 'image' ? (
                      <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      <video src={m.url} className="h-full w-full object-cover" muted />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="truncate text-xs text-white/80">{m.name}</p>
                    <p className="truncate text-[10px] text-white/40">{m.folder}</p>
                  </div>
                  {!used.has(m.id) && (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white/70">
                      Unused
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeMediaAsset(m.id)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-black/70 p-1.5 text-white/70 opacity-0 transition-opacity hover:bg-red-500/80 hover:text-white group-hover:opacity-100"
                    title="Delete asset"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
}
