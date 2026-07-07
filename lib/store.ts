"use client";

import { create } from "zustand";
import type {
  MediaAsset,
  Page,
  Section,
  SectionType,
  SiteContent,
  Theme,
} from "@/types/content";
import { genId } from "@/lib/id";
import { createSection } from "@/lib/sectionDefaults";

interface DashboardState {
  content: SiteContent | null;
  loaded: boolean;
  dirty: boolean;
  saving: boolean;
  lastSavedAt: string | null;
  selectedPageId: string | null;
  selectedSectionId: string | null;

  hydrate: (content: SiteContent) => void;
  save: () => Promise<void>;
  markClean: () => void;

  selectPage: (pageId: string | null) => void;
  selectSection: (sectionId: string | null) => void;

  addPage: () => string;
  duplicatePage: (pageId: string) => string;
  deletePage: (pageId: string) => void;
  updatePage: (pageId: string, patch: Partial<Page>) => void;
  togglePublish: (pageId: string) => void;

  addSection: (pageId: string, type: SectionType) => string;
  removeSection: (pageId: string, sectionId: string) => void;
  duplicateSection: (pageId: string, sectionId: string) => void;
  toggleSectionVisibility: (pageId: string, sectionId: string) => void;
  reorderSections: (pageId: string, sectionIds: string[]) => void;
  updateSection: (pageId: string, sectionId: string, patch: Partial<Section>) => void;

  updateTheme: (patch: Partial<Theme>) => void;

  addMedia: (asset: MediaAsset) => void;
  removeMedia: (id: string) => void;
  updateMedia: (id: string, patch: Partial<MediaAsset>) => void;
}

function touch(content: SiteContent, pageId: string): SiteContent {
  return {
    ...content,
    pages: content.pages.map((p) =>
      p.id === pageId ? { ...p, updatedAt: new Date().toISOString() } : p
    ),
  };
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  content: null,
  loaded: false,
  dirty: false,
  saving: false,
  lastSavedAt: null,
  selectedPageId: null,
  selectedSectionId: null,

  hydrate: (content) =>
    set({
      content,
      loaded: true,
      dirty: false,
      selectedPageId: content.pages[0]?.id ?? null,
    }),

  markClean: () => set({ dirty: false }),

  save: async () => {
    const { content } = get();
    if (!content) return;
    set({ saving: true });
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Failed to save");
      set({ saving: false, dirty: false, lastSavedAt: new Date().toISOString() });
    } catch (err) {
      console.error(err);
      set({ saving: false });
    }
  },

  selectPage: (pageId) => set({ selectedPageId: pageId, selectedSectionId: null }),
  selectSection: (sectionId) => set({ selectedSectionId: sectionId }),

  addPage: () => {
    const id = genId("page");
    set((state) => {
      if (!state.content) return state;
      const newPage: Page = {
        id,
        title: "Untitled Page",
        slug: `untitled-${id.slice(-5)}`,
        published: false,
        updatedAt: new Date().toISOString(),
        sections: [],
        seo: {
          title: "Untitled Page",
          description: "",
          ogImageId: null,
          slug: `untitled-${id.slice(-5)}`,
          metaTags: [],
          schemaType: "Article",
        },
      };
      return {
        content: { ...state.content, pages: [...state.content.pages, newPage] },
        dirty: true,
        selectedPageId: id,
      };
    });
    return id;
  },

  duplicatePage: (pageId) => {
    const newId = genId("page");
    set((state) => {
      if (!state.content) return state;
      const source = state.content.pages.find((p) => p.id === pageId);
      if (!source) return state;
      const clone: Page = {
        ...source,
        id: newId,
        title: `${source.title} (Copy)`,
        slug: `${source.slug}-copy-${newId.slice(-4)}`,
        published: false,
        updatedAt: new Date().toISOString(),
        sections: source.sections.map((s) => ({ ...s, id: genId("sec") })),
        seo: { ...source.seo, slug: `${source.slug}-copy-${newId.slice(-4)}` },
      };
      return {
        content: { ...state.content, pages: [...state.content.pages, clone] },
        dirty: true,
        selectedPageId: newId,
      };
    });
    return newId;
  },

  deletePage: (pageId) =>
    set((state) => {
      if (!state.content) return state;
      const pages = state.content.pages.filter((p) => p.id !== pageId);
      return {
        content: { ...state.content, pages },
        dirty: true,
        selectedPageId: state.selectedPageId === pageId ? pages[0]?.id ?? null : state.selectedPageId,
      };
    }),

  updatePage: (pageId, patch) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) => (p.id === pageId ? { ...p, ...patch } : p)),
      };
      return { content: touch(content, pageId), dirty: true };
    }),

  togglePublish: (pageId) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) =>
          p.id === pageId ? { ...p, published: !p.published } : p
        ),
      };
      return { content: touch(content, pageId), dirty: true };
    }),

  addSection: (pageId, type) => {
    const section = createSection(type);
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) =>
          p.id === pageId ? { ...p, sections: [...p.sections, section] } : p
        ),
      };
      return { content: touch(content, pageId), dirty: true, selectedSectionId: section.id };
    });
    return section.id;
  },

  removeSection: (pageId, sectionId) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) =>
          p.id === pageId ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) } : p
        ),
      };
      return {
        content: touch(content, pageId),
        dirty: true,
        selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
      };
    }),

  duplicateSection: (pageId, sectionId) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) => {
          if (p.id !== pageId) return p;
          const idx = p.sections.findIndex((s) => s.id === sectionId);
          if (idx === -1) return p;
          const clone: Section = { ...p.sections[idx], id: genId("sec"), name: `${p.sections[idx].name} (Copy)` };
          const sections = [...p.sections];
          sections.splice(idx + 1, 0, clone);
          return { ...p, sections };
        }),
      };
      return { content: touch(content, pageId), dirty: true };
    }),

  toggleSectionVisibility: (pageId, sectionId) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                sections: p.sections.map((s) =>
                  s.id === sectionId ? { ...s, visible: !s.visible } : s
                ),
              }
            : p
        ),
      };
      return { content: touch(content, pageId), dirty: true };
    }),

  reorderSections: (pageId, sectionIds) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) => {
          if (p.id !== pageId) return p;
          const map = new Map(p.sections.map((s) => [s.id, s]));
          const sections = sectionIds.map((id) => map.get(id)).filter(Boolean) as Section[];
          return { ...p, sections };
        }),
      };
      return { content: touch(content, pageId), dirty: true };
    }),

  updateSection: (pageId, sectionId, patch) =>
    set((state) => {
      if (!state.content) return state;
      const content = {
        ...state.content,
        pages: state.content.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                sections: p.sections.map((s) =>
                  s.id === sectionId ? { ...s, ...patch } : s
                ),
              }
            : p
        ),
      };
      return { content: touch(content, pageId), dirty: true };
    }),

  updateTheme: (patch) =>
    set((state) => {
      if (!state.content) return state;
      return {
        content: { ...state.content, theme: { ...state.content.theme, ...patch } },
        dirty: true,
      };
    }),

  addMedia: (asset) =>
    set((state) => {
      if (!state.content) return state;
      return { content: { ...state.content, media: [...state.content.media, asset] }, dirty: true };
    }),

  removeMedia: (id) =>
    set((state) => {
      if (!state.content) return state;
      return {
        content: { ...state.content, media: state.content.media.filter((m) => m.id !== id) },
        dirty: true,
      };
    }),

  updateMedia: (id, patch) =>
    set((state) => {
      if (!state.content) return state;
      return {
        content: {
          ...state.content,
          media: state.content.media.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        },
        dirty: true,
      };
    }),
}));
