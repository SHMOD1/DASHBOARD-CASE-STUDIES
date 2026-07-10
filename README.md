# DASHBOARD-CASE-STUDIES

## Editable Storymap Dashboard

`index.html` is a self-contained, single-file, full-bleed storymap — every hero, chapter
cover, and entry is a true full-screen (100vh) slide with its background image/GIF/video
filling the entire viewport edge-to-edge, continuously zooming and panning as you scroll
(plus a subtle cursor-tilt effect and a soft cross-fade at the seam between slides), not a
static boxed layout. It ships with dummy sample content ("The Water City" — urban water
resilience case studies in four chapters: vanishing lakes, groundwater depletion, rainwater
harvesting, and community restoration) so you can reshape it for any other chapter-based
case-study or narrative content.

Open `index.html` directly in a browser — no build step or server required.

**Opening cover:** the hero is a distinct, centered "presented by" title page — a logo row
(add/remove/replace each logo image in Edit Mode), a "Presents" label, the big title and
subtitle, and a "Scroll down" prompt with a circular button, all on a light cream backdrop.
It ships with placeholder logo badges and an abstract pale background graphic (both clearly
marked as placeholders) so you can drop in your own branding and cover image. This styling is
scoped only to the opening hero — every chapter cover and entry keeps its own full-bleed,
bottom-left layout untouched.

**Brand system (from the client's "Campaign Branding Guidelines" deck):**
- Colors are the exact documented hex values — Primary: `#0DBFDB` (cyan), `#005BA6` (blue),
  `#413C3F` (charcoal). Secondary: `#134370` (navy), `#61C9E1` (sky), `#FFDE17` (yellow),
  `#8B5E3C` (brown), `#53B94E` (green). Tertiary neutrals: `#D5CEC6`, `#807973`, `#F0E7DD`,
  `#F8F3EF`, `#F5F0E8`. All wired into the CSS `:root` variables, the `ACCENTS` array
  (chapter colors), and the `PALETTES` array (placeholder-image gradients) in the `<script>`.
- Fonts: **Intercom** for headings/sub-headings/quotes, **Open Sans** for body/captions, per
  the deck's type-hierarchy spec. Open Sans is loaded from Google Fonts automatically. Intercom
  has no public CDN release, so it's declared first in `--font-main` for anyone with it
  installed/licensed locally, falling back to Poppins (closest free match to its bold
  grotesque weight) — swap in a hosted `@font-face` for Intercom if you have the license files.
  Both fonts are also the top two choices in every text block's font dropdown in Edit Mode.

**Structure:**
- A full-screen hero, then any number of **chapters** — each with its own full-bleed cover
  image/video, title, subtitle, accent color, and its own timeline of **entries**, each a
  full-screen slide too.
- Each entry's media (image / GIF / video) fills the whole screen behind the text, with a
  mix of **text blocks** (Heading, Subheading, Body, Pull quote, Caption — pick font, size,
  alignment per block) and **inline media blocks** — additional images/GIFs/videos dropped
  into the same text flow as smaller inset cards (S/M/L/Full width, left/center/right
  aligned, with their own caption), distinct from the entry's full-bleed background.
- The timeline is a bold, wide (420px) cream/beige glass panel that sits **in the normal page
  flow** next to the chapters/entries column and sticks to the top of the viewport as you
  scroll — it's part of the page, not a floating overlay, and releases/scrolls away naturally
  once you pass the last chapter. It's styled like a river drawn on paper — a wavy, gently
  flowing line (animated, continuously drifting) connects water-droplet-shaped markers instead
  of a straight rail, with much bigger, heavier chapter/year typography for a stronger visual
  presence. Its content pans vertically in lockstep with the page's scroll position, so the
  timeline visibly scrolls together with the sections rather than sitting static; clicking any
  chapter/entry still jumps the main scroll straight to it. The active chapter's accent color
  washes across the panel, the top progress bar, and pull-quote borders as you scroll.
- A small "you are here" popup (bottom-left) pops up fresh with a droplet icon whenever the
  active chapter/entry changes as you scroll, then fades out after a couple of seconds of
  no further scrolling.
- Sections don't just fade in once — every chapter cover and entry continuously zooms in and
  out as it moves through the viewport, driven live by scroll position (not a one-time
  reveal), so the effect is fully smooth and reversible in both scroll directions. The zoom
  is layered across multiple elements independently — the section's content wrapper, its
  title, each text block, and each inline media card all scale/fade at their own pace and
  transform-origin — so the whole section feels like it's continuously breathing in and out
  of focus as you scroll, rather than static boxed content.
- Every media layer moves with scroll: the full-bleed background of each slide continuously
  zooms/pans (plus a cursor-tilt effect), and the smaller inline media-overlay images/GIFs
  inside the text flow get their own independent, subtler scroll-linked drift on top of the
  new zoom-in/out motion.
- The overall UI chrome (top bar, timeline panel, position popup) uses a cream/beige palette;
  the brand's navy is kept for the dark theme toggle instead.

**Editing (toggle "Edit Mode: On" in the top bar):**
- Click any text to edit it in place — chapter titles, entry years/titles/captions, and
  every text block.
- Each text block gets its own floating toolbar: style, font, size, alignment, bold/italic,
  reorder, delete. Use **+ Add text block** to add more, or **+ Add image / video / GIF** to
  drop in an inline media overlay (its toolbar controls size and alignment instead).
- Hover any image/video — the entry's full-bleed background, a chapter cover, the hero, or
  an inline media block — and click **Change Media** to set an Image, GIF, or Video — paste a
  URL (including YouTube/Vimeo links, which embed automatically) or upload a file, with
  autoplay/loop/muted options for video.
- **+ Add chapter**, **+ Add entry**, **+ Insert entry here**, move-up/down, and delete
  controls let you fully restructure the story.
- **Export JSON** downloads your content; **Import JSON** loads it back in (or share it with
  someone else). **Reset Demo** restores the sample content.
- Edits autosave to the browser's local storage, so a refresh won't lose your work.
  Uploaded files are stored as data URLs — large video uploads can hit the browser's
  storage limit, so linking to hosted video (or a YouTube/Vimeo URL) scales better than
  uploading.
- **Toggle Theme** switches between light and dark palettes.

**Note on video embeds:** YouTube/Vimeo iframes require a live internet connection in the
browser viewing the page — they won't load in network-sandboxed previews, only in a normal
browser.
