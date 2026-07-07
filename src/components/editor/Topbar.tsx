import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocStore } from '../../store/useDocStore';
import { DesktopIcon, MobileIcon, TabletIcon } from '../icons';
import { TextInput } from './formControls';
import { ThemeModal } from './ThemeModal';
import { useThemeModal } from './useThemeModal';

export function Topbar() {
  const title = useDocStore((s) => s.doc.title);
  const updateTitle = useDocStore((s) => s.updateTitle);
  const device = useDocStore((s) => s.device);
  const setDevice = useDocStore((s) => s.setDevice);
  const setSeoOpen = useDocStore((s) => s.setSeoOpen);
  const setMediaOpen = useDocStore((s) => s.setMediaOpen);
  const resetDocument = useDocStore((s) => s.resetDocument);
  const themeModal = useThemeModal();
  const [published, setPublished] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-[#121116] px-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
        <span className="rounded bg-violet-600 px-1.5 py-0.5 text-xs">CS</span>
        Page Builder
      </div>

      <TextInput
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
        className="max-w-xs flex-1"
        placeholder="Untitled case study"
      />

      <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
        {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
          <button
            key={d}
            type="button"
            title={d}
            onClick={() => setDevice(d)}
            className={`rounded-md p-1.5 transition-colors ${
              device === d ? 'bg-violet-600 text-white' : 'text-white/40 hover:bg-white/10 hover:text-white'
            }`}
          >
            {d === 'desktop' && <DesktopIcon className="h-4 w-4" />}
            {d === 'tablet' && <TabletIcon className="h-4 w-4" />}
            {d === 'mobile' && <MobileIcon className="h-4 w-4" />}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={themeModal.show}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
        >
          Theme
        </button>
        <button
          type="button"
          onClick={() => setMediaOpen(true)}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
        >
          Media Library
        </button>
        <button
          type="button"
          onClick={() => setSeoOpen(true)}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
        >
          SEO
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm('Reset to the sample case study? This discards your edits.')) resetDocument();
          }}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/50 hover:bg-white/5"
        >
          Reset
        </button>
        <Link
          to="/present"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
        >
          Preview
        </Link>
        <button
          type="button"
          onClick={() => {
            setPublished(true);
            setTimeout(() => setPublished(false), 2000);
          }}
          className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500"
        >
          {published ? 'Published ✓' : 'Publish'}
        </button>
      </div>

      <ThemeModal open={themeModal.open} onClose={themeModal.hide} />
    </header>
  );
}
