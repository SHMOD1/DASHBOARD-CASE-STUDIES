# DASHBOARD-CASE-STUDIES

## Editable Storymap Dashboard

`index.html` is a self-contained, single-file, full-bleed storymap — every hero, chapter
cover, and entry is a true full-screen (100vh) slide with its background image/GIF/video
filling the entire viewport edge-to-edge, continuously zooming and panning as you scroll
(plus a subtle cursor-tilt effect and a soft cross-fade at the seam between slides), not a
static boxed layout. It ships with dummy sample content ("The Water City" — urban water
resilience case studies in four chapters: vanishing lakes, groundwater depletion, rainwater
harvesting, and community restoration) so you can reshape it for any other chapter-based
case-study or narrative content. The color palette (indigo blue, bright yellow, teal, green)
is pulled from a civic/workshop brand reference the user provided — swap the CSS variables
and the `ACCENTS`/`PALETTES` arrays in the `<script>` to reskin it for a different brand.

Open `index.html` directly in a browser — no build step or server required.

**Structure:**
- A full-screen hero, then any number of **chapters** — each with its own full-bleed cover
  image/video, title, subtitle, accent color, and its own timeline of **entries**, each a
  full-screen slide too.
- Each entry's media (image / GIF / video) fills the whole screen behind the text, with one
  or more **text blocks** overlaid — pick a style (Heading, Subheading, Body, Pull quote,
  Caption), font, size, and alignment per block.
- The timeline lives in a floating glass panel pinned to the right edge of the screen at all
  times (not a layout column) — chapters as collapsible groups, each with its own progress
  line that fills as you scroll through it. The active chapter's accent color washes across
  the panel, the top progress bar, and pull-quote borders as you scroll.

**Editing (toggle "Edit Mode: On" in the top bar):**
- Click any text to edit it in place — chapter titles, entry years/titles/captions, and
  every text block.
- Each text block gets its own floating toolbar: style, font, size, alignment, bold/italic,
  reorder, delete. Use **+ Add text block** to add more.
- Hover any image/video and click **Change Media** to set an Image, GIF, or Video — paste a
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
