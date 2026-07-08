# DASHBOARD-CASE-STUDIES

## Editable Chapters & Timeline Dashboard

`index.html` is a self-contained, single-file recreation of an animated "scrollytelling"
story page — a hero cover, chapters (each with its own mini timeline and accent color), and
scroll-triggered reveal, parallax, and cursor-tilt animations. It ships with dummy sample
content ("Beyond Borders", a fictional migration story in four chapters) so you can reshape
it for histories, product journeys, brand timelines, ambassador/employee profiles, or any
other chapter-based narrative.

Open `index.html` directly in a browser — no build step or server required.

**Structure:**
- A hero cover, then any number of **chapters** — each with its own cover image/video,
  title, subtitle, accent color, and its own mini timeline of **entries**.
- Each entry has media (image / GIF / video) plus one or more **text blocks** — pick a
  style (Heading, Subheading, Body, Pull quote, Caption), font, size, and alignment per
  block.
- The left rail shows every chapter as a collapsible group with its own progress line that
  fills as you scroll through that chapter; the active chapter's accent color washes across
  the rail, progress bar, and pull-quote borders as you scroll.

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
