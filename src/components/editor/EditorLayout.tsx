import { Canvas } from './Canvas';
import { MediaLibraryModal } from './MediaLibraryModal';
import { PropertyPanel } from './PropertyPanel';
import { SectionList } from './SectionList';
import { SeoModal } from './SeoModal';
import { Topbar } from './Topbar';

export function EditorLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0a0d] text-white">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 border-r border-white/10 bg-[#121116]">
          <SectionList />
        </aside>
        <main className="flex-1 overflow-hidden">
          <Canvas />
        </main>
        <aside className="w-80 shrink-0 border-l border-white/10 bg-[#121116]">
          <PropertyPanel />
        </aside>
      </div>
      <SeoModal />
      <MediaLibraryModal />
    </div>
  );
}
