import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import { useDocStore } from '../../store/useDocStore';
import { CloseIcon, UploadIcon } from '../icons';

export function MediaSelect({
  value,
  onChange,
  accept = 'image/*',
  kind = 'image',
}: {
  value: string | null;
  onChange: (id: string | null) => void;
  accept?: string;
  kind?: 'image' | 'video';
}) {
  const media = useDocStore((s) => s.doc.media);
  const addMediaAsset = useDocStore((s) => s.addMediaAsset);
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const selected = media.find((m) => m.id === value);
  const filtered = media.filter((m) => m.type === kind);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const id = nanoid(8);
      addMediaAsset({
        id,
        name: file.name,
        url: String(reader.result),
        type: kind,
        folder: 'Uploads',
        tags: [],
        createdAt: Date.now(),
      });
      onChange(id);
      setOpen(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-24 w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-white/15 bg-white/[0.03] hover:border-violet-400/50"
      >
        {selected ? (
          kind === 'image' ? (
            <img src={selected.url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-white/60">{selected.name}</span>
          )
        ) : (
          <span className="text-xs text-white/40">Choose {kind}</span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-40 mt-2 max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-[#17161d] p-2 shadow-2xl">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-xs text-white/50">Select {kind}</span>
              <button type="button" onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-white/10 py-2 text-xs text-white/70 hover:border-violet-400/50 hover:text-violet-300"
            >
              <UploadIcon className="h-3.5 w-3.5" />
              Upload new {kind}
            </button>
            <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={handleUpload} />
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className="mb-2 w-full rounded-md border border-white/10 py-1.5 text-xs text-red-300/80 hover:bg-red-500/10"
              >
                Remove
              </button>
            )}
            <div className="grid grid-cols-3 gap-1.5">
              {filtered.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    onChange(m.id);
                    setOpen(false);
                  }}
                  className={`aspect-square overflow-hidden rounded border ${
                    value === m.id ? 'border-violet-400' : 'border-white/10'
                  }`}
                >
                  {m.type === 'image' ? (
                    <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5 text-[10px] text-white/50">
                      {m.name}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
