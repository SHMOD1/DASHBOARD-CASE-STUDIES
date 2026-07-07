# Original Exhibition Co. — Editable Storytelling Site

A premium, long-form scrolling story experience (fullscreen hero, pinned quotes,
horizontal galleries, parallax, timelines, stats, maps, video) built entirely
in original code and fully editable from a built-in dashboard. Nothing on the
public page is hardcoded — nav copy, images, videos, colors, typography,
layout and every animation parameter all come from one JSON file that the
dashboard reads and writes.

This project recreates the **interaction model** of cinematic, chapter-based
storytelling sites — pinned scroll, horizontal reveals, parallax, cross-fades,
scroll-scrubbed animation — using entirely original code, copy, and
procedurally generated placeholder art. No text, images, or assets from any
reference site are included.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** for layout/utility styling
- **Framer Motion** for declarative reveal animations (fade / slide / scale / mask)
- **GSAP + ScrollTrigger** for scroll-scrubbed effects: pinned quotes, the
  horizontal gallery, parallax backgrounds, the timeline's animated rail
- **Lenis** for inertial smooth-scroll, wired into GSAP's ticker so both stay
  in sync
- **Zustand** for the dashboard's client-side editing state
- **@dnd-kit** for drag-and-drop section reordering

## Getting started

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

```bash
npm run build && npm run start   # production build
npm run lint                     # eslint
```

No environment variables or external services are required — content and
uploaded media are stored on the local filesystem (see below).

## How content flows

```
content/site.json  <-->  lib/content.ts (fs read/write)  <-->  /api/content
        ^                                                          |
        | GET on dashboard load                                   | PUT on save
        |                                                          v
   Server Components                                    lib/store.ts (Zustand)
   (app/page.tsx, app/[slug]/page.tsx)                  used by every dashboard
   read content.pages[...] directly                     screen under /dashboard
   from disk on each request                            and app/dashboard/**
        |
        v
components/PageExperience.tsx
  -> components/SectionRenderer.tsx
     -> components/sections/{Hero,Quote,...}Section.tsx
```

- **Public pages are server components.** `app/page.tsx` and
  `app/[slug]/page.tsx` read `content/site.json` straight off disk on every
  request via `lib/pages.ts`, so a saved edit is live immediately — no
  rebuild.
- **The dashboard is a client app.** `dashboard/DashboardShell.tsx` fetches
  `/api/content` once, hydrates a Zustand store (`lib/store.ts`), and every
  editor screen mutates that store. Edits **auto-save** to disk ~900ms after
  you stop typing (and there's a manual **Save** button in the top bar), so
  the live preview and the public site reflect your latest change quickly
  without a full "publish" round trip.
- **Publishing** is a boolean per page (`page.published`). An unpublished
  page 404s at its public URL but is still visible in the dashboard's preview
  frame (which passes `?preview=1`).

### Simplifications worth knowing about

This is a single-file JSON "database" for portability — there's no separate
draft/live content copy per page. Saving writes directly to
`content/site.json`, and `published` only gates whether the page is visible
at its public URL. If you need real draft/live separation or multi-user
editing, swap `lib/content.ts` for a real datastore (Postgres, a headless
CMS, etc.) — every other layer only depends on the `SiteContent` shape in
`types/content.ts`, not on how it's persisted.

## Folder structure

```
app/                  Next.js routes (App Router)
  page.tsx             public "home" page (server component)
  [slug]/page.tsx       public page by slug, supports ?preview=1
  api/content/         GET/PUT the whole site JSON
  api/upload/          multipart upload -> public/uploads
  dashboard/           dashboard routes (pages list, page editor, media, theme)
components/           Public-site rendering
  sections/            the 11 section components + shared layout primitives
  SectionRenderer.tsx  maps Section -> component by type
  PageExperience.tsx   wires theme vars + Lenis + progress bar + chapter nav
dashboard/             Dashboard UI (not routes — imported by app/dashboard/**)
  editors/              per-tab editors: Content, Media, Animation, Layout, Typography, Colors
hooks/                 useLenis, useScrollTrigger, useParallax, useCounter, useReveal
animations/            Framer Motion variant builders + easing curve map
lib/                   content persistence, Zustand store, theme CSS-var helpers, ids
cms/                   content validation used by the API routes
types/content.ts       the single source of truth for the content schema
content/site.json      the JSON "database" (theme, media library, pages, sections)
public/placeholders/   original, procedurally generated SVG placeholder art
public/uploads/        user-uploaded media (gitignored)
styles/tokens.css      documents the CSS custom-property contract
```

## The content schema (`types/content.ts`)

- **`SiteContent`** — `siteName`, `theme`, `pages[]`, `media[]`
- **`Page`** — `title`, `slug`, `published`, `seo`, `sections[]`
- **`Section`** — `type` (one of 11 kinds), `visible`, plus four independent
  config objects every section carries:
  - `content` — headings/body/quote/gallery items/timeline entries/stats/map
    pins/video config — whatever the section type needs
  - `animation` — `reveal` (fade/slide/scale/mask/parallax/none), direction,
    `pinned`, `horizontal`, `parallax` + strength, `duration`, `delay`,
    `speed`, `scrub`, `easing`
  - `layout` — height, padding, margin, alignment, image position, text
    width, columns, background color/image, overlay opacity
  - `typography` / `color` — optional per-section overrides; `null` means
    "inherit the global theme"
- **`Theme`** — global colors + typography, edited on `/dashboard/theme`
- **`MediaAsset`** — url, alt, caption, credit, folder, tags, and a
  `focalX`/`focalY` focal point (a lightweight stand-in for cropping — an
  object-position offset applied wherever the asset is shown with
  object-cover)

Section components never hardcode colors or fonts: `lib/theme.ts` turns
`Theme` + per-section overrides into CSS custom properties
(`--color-accent`, `--heading-size`, ...), and every section reads them via
`var(--token)`. See `styles/tokens.css` for the full variable contract.

## The 11 section types

`Hero`, `Quote`, `FullscreenImage`, `SplitImageText`, `Gallery` (horizontal,
pinned scroll), `Video` (MP4 / YouTube / Vimeo), `Timeline`, `Map`, `Stats`
(count-up), `Ending`, `CTA` — each is a standalone component in
`components/sections/`, registered in `components/sections/index.ts`. Adding
a 12th type means: add it to `SectionType` in `types/content.ts`, add a
default in `lib/sectionDefaults.ts`, write the component, add a case to
`dashboard/editors/ContentEditor.tsx`, and register it in the section index —
nothing else needs to change.

## The dashboard

- **`/dashboard`** — pages list: create, duplicate, delete, publish/unpublish
- **`/dashboard/pages/[pageId]`** — the page editor:
  - left: drag-and-drop section list (reorder, hide/show, duplicate, delete,
    add any of the 11 types)
  - center: live preview in an iframe of the real page route, with a
    Desktop/Tablet/Mobile width switcher, refreshed automatically after
    autosave
  - right: the selected section's editor, tabbed into **Content / Media /
    Animation / Layout / Typography / Colors**
  - top bar: page title/slug, publish toggle, SEO fields (meta title/
    description/slug/schema type — OG image is set from the section's Media
    tab)
- **`/dashboard/media`** — the media library: search, folder filter,
  "unused only" filter (cross-references every page's sections), multi-file
  upload, per-asset alt/caption/credit/folder/tags + focal-point cropping
- **`/dashboard/theme`** — global colors, fonts, heading/paragraph size,
  letter spacing, line height, weight, uppercase/bold toggles

Rich text (the `body` field on Split/Ending/CTA sections) uses a small
contentEditable editor with bold/italic/underline/link — stored as sanitized
HTML and rendered with the same tags on the public page.

## Adding your own content

1. Open `/dashboard`, click **+ New page** (or edit the seeded "The Last
   Lighthouse Keepers" page).
2. Add/reorder/remove sections from the left panel.
3. Fill in each section's Content tab, upload images/video in Media, tune
   Animation/Layout/Typography/Colors to taste.
4. Toggle **Published**, hit **Save** (or just wait — it autosaves), then
   **View site**.

Everything renders from `content/site.json` — there is nothing to redeploy
or rebuild for a content change in dev or in `next start` production mode.
