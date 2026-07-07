import { useDocStore } from '../../store/useDocStore';
import { AnimationPanel } from './panels/AnimationPanel';
import { ContentPanel } from './panels/ContentPanel';
import { LayoutPanel } from './panels/LayoutPanel';
import { StylePanel } from './panels/StylePanel';

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'style', label: 'Style' },
  { id: 'layout', label: 'Layout' },
  { id: 'animation', label: 'Animation' },
] as const;

export function PropertyPanel() {
  const doc = useDocStore((s) => s.doc);
  const selectedId = useDocStore((s) => s.selectedId);
  const activeTab = useDocStore((s) => s.activeTab);
  const setActiveTab = useDocStore((s) => s.setActiveTab);

  const section = doc.sections.find((s) => s.id === selectedId);

  if (!section) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-white/30">
        Select a section to edit its content, style, layout, and animation.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-white/5 px-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-violet-500" />
            )}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        {activeTab === 'content' && <ContentPanel section={section} />}
        {activeTab === 'style' && <StylePanel section={section} />}
        {activeTab === 'layout' && <LayoutPanel section={section} />}
        {activeTab === 'animation' && <AnimationPanel section={section} />}
      </div>
    </div>
  );
}
