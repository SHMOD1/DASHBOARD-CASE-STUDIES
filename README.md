# Dashboard Case Studies — Page Builder

A drag-and-drop page builder for building editorial case-study pages, with a
premium scroll-driven "published" experience (parallax, pinned sections,
horizontal galleries, chapter reveals) built on React, Vite, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The editor loads at `/`; click **Preview** in the
top bar to open the published scroll experience at `/present` in a new tab.

## What's here

- **Editor** (`/`) — a section list (add / remove / duplicate / reorder /
  show-hide, via drag-and-drop), a property panel with Content / Style /
  Layout / Animation tabs per section, a Media Library, SEO settings, a theme
  editor, and a live canvas with desktop/tablet/mobile preview.
- **Published view** (`/present`) — renders the same document full-screen
  with real scroll-linked animation: parallax, pinned sections, horizontal
  scroll galleries, chapter title cards, and mask-reveal transitions.
- State is held in a Zustand store persisted to `localStorage` — there's no
  backend; this is a self-contained front-end prototype seeded with a sample
  case study.

## Stack

Vite, React, TypeScript, Tailwind CSS v4, Zustand, Framer Motion, dnd-kit.
