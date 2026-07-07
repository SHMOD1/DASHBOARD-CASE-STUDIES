import { useRef } from 'react';
import { PageRenderer } from '../render/PageRenderer';
import { ScrollContainerContext } from '../render/ScrollContainerContext';
import { useDocStore } from '../../store/useDocStore';
import type { DeviceMode } from '../../types';

const DEVICE_WIDTH: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '834px',
  mobile: '390px',
};

export function Canvas() {
  const doc = useDocStore((s) => s.doc);
  const device = useDocStore((s) => s.device);
  const selectedId = useDocStore((s) => s.selectedId);
  const selectSection = useDocStore((s) => s.selectSection);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full flex-1 justify-center overflow-y-auto bg-[#0a0a0d] p-6" ref={scrollRef}>
      <ScrollContainerContext.Provider value={scrollRef}>
        <div
          className="h-fit shrink-0 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-[width] duration-300"
          style={{ width: DEVICE_WIDTH[device], maxWidth: '100%' }}
        >
          <PageRenderer doc={doc} editing selectedId={selectedId} onSelect={selectSection} />
        </div>
      </ScrollContainerContext.Provider>
    </div>
  );
}
