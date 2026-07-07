import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSection } from '../data/defaults';
import { buildSeedDocument } from '../data/seed';
import type {
  DeviceMode,
  MediaAsset,
  PageDocument,
  Section,
  SectionPatch,
  SectionType,
  SeoConfig,
  ThemeConfig,
} from '../types';

interface DocState {
  doc: PageDocument;
  selectedId: string | null;
  device: DeviceMode;
  activeTab: 'content' | 'style' | 'layout' | 'animation';
  seoOpen: boolean;
  mediaOpen: boolean;

  selectSection: (id: string | null) => void;
  setDevice: (d: DeviceMode) => void;
  setActiveTab: (t: DocState['activeTab']) => void;
  setSeoOpen: (v: boolean) => void;
  setMediaOpen: (v: boolean) => void;

  addSection: (type: SectionType, afterId?: string) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  toggleVisible: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  updateSection: (id: string, patch: SectionPatch) => void;

  updateTheme: (patch: Partial<ThemeConfig>) => void;
  updateSeo: (patch: Partial<SeoConfig>) => void;
  updateTitle: (title: string) => void;

  addMediaAsset: (asset: MediaAsset) => void;
  removeMediaAsset: (id: string) => void;

  resetDocument: () => void;
}

function withDoc(fn: (doc: PageDocument) => PageDocument) {
  return (state: DocState) => ({ doc: fn(state.doc) });
}

export const useDocStore = create<DocState>()(
  persist(
    (set, get) => ({
      doc: buildSeedDocument(),
      selectedId: null,
      device: 'desktop',
      activeTab: 'content',
      seoOpen: false,
      mediaOpen: false,

      selectSection: (id) => set({ selectedId: id, activeTab: 'content' }),
      setDevice: (d) => set({ device: d }),
      setActiveTab: (t) => set({ activeTab: t }),
      setSeoOpen: (v) => set({ seoOpen: v }),
      setMediaOpen: (v) => set({ mediaOpen: v }),

      addSection: (type, afterId) =>
        set(
          withDoc((doc) => {
            const section = createSection(type);
            const sections = [...doc.sections];
            const idx = afterId ? sections.findIndex((s) => s.id === afterId) : sections.length - 1;
            sections.splice(idx + 1, 0, section);
            queueMicrotask(() => get().selectSection(section.id));
            return { ...doc, sections };
          }),
        ),

      removeSection: (id) =>
        set((state) => ({
          doc: { ...state.doc, sections: state.doc.sections.filter((s) => s.id !== id) },
          selectedId: state.selectedId === id ? null : state.selectedId,
        })),

      duplicateSection: (id) =>
        set(
          withDoc((doc) => {
            const idx = doc.sections.findIndex((s) => s.id === id);
            if (idx === -1) return doc;
            const clone: Section = { ...doc.sections[idx], id: nanoid(8) };
            const sections = [...doc.sections];
            sections.splice(idx + 1, 0, clone);
            return { ...doc, sections };
          }),
        ),

      toggleVisible: (id) =>
        set(
          withDoc((doc) => ({
            ...doc,
            sections: doc.sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
          })),
        ),

      reorderSections: (activeId, overId) =>
        set(
          withDoc((doc) => {
            const sections = [...doc.sections];
            const from = sections.findIndex((s) => s.id === activeId);
            const to = sections.findIndex((s) => s.id === overId);
            if (from === -1 || to === -1) return doc;
            const [moved] = sections.splice(from, 1);
            sections.splice(to, 0, moved);
            return { ...doc, sections };
          }),
        ),

      updateSection: (id, patch) =>
        set(
          withDoc((doc) => ({
            ...doc,
            sections: doc.sections.map((s) => (s.id === id ? ({ ...s, ...patch } as Section) : s)),
          })),
        ),

      updateTheme: (patch) =>
        set(withDoc((doc) => ({ ...doc, theme: { ...doc.theme, ...patch } }))),

      updateSeo: (patch) => set(withDoc((doc) => ({ ...doc, seo: { ...doc.seo, ...patch } }))),

      updateTitle: (title) => set(withDoc((doc) => ({ ...doc, title }))),

      addMediaAsset: (asset) =>
        set(withDoc((doc) => ({ ...doc, media: [asset, ...doc.media] }))),

      removeMediaAsset: (id) =>
        set(withDoc((doc) => ({ ...doc, media: doc.media.filter((m) => m.id !== id) }))),

      resetDocument: () => set({ doc: buildSeedDocument(), selectedId: null }),
    }),
    { name: 'case-study-page-builder' },
  ),
);
