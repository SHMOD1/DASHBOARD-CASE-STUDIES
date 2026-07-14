# DASHBOARD-CASE-STUDIES

## Editable Storymap Dashboard

`index.html` is a self-contained, single-file, full-bleed storymap — every hero, chapter
cover, and entry is a true full-screen (100vh) slide with its background image/GIF/video
filling the entire viewport edge-to-edge at full opacity, arriving with a Google Earth-style
zoom as you scroll, not a static boxed layout. It ships with dummy sample content ("The Water
City" — urban water resilience case studies in four chapters: vanishing lakes, groundwater
depletion, rainwater harvesting, and community restoration) so you can reshape it for any
other chapter-based case-study or narrative content.

Open `index.html` directly in a browser — no build step or server required.

**Opening cover:** the hero is a distinct, centered "presented by" title page — a logo row
(add/remove/replace each logo image in Edit Mode), a "Presents" label, the big title and
subtitle, and a "Scroll down" prompt with a circular button, all on a solid brand-blue
(`#005BA6`) backdrop with white text. It ships with placeholder logo badges and an abstract
pale-line background graphic (both clearly marked as placeholders) so you can drop in your
own branding and cover image. This styling is scoped only to the opening hero — every
chapter cover and entry keeps its own full-bleed, bottom-left layout untouched.

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
  image/video, title, subtitle, accent color, and its own timeline of **entries** (pages),
  each a full-screen slide too.
- Every entry is one of **4 page types**, switchable any time from a dropdown in its
  toolbar, and picked up front via the 4 buttons ("+ Full Background", "+ Section Intro",
  "+ Grid", "+ Scroll Sequence") wherever you'd insert a new page:
  - **Full Background** — the classic entry: full-bleed image/GIF/video behind the text,
    with a mix of **text blocks** (Heading, Subheading, Body, Pull quote, Caption — pick
    font, size, alignment, color per block) and **inline media blocks** — additional
    images/GIFs/videos dropped into the same text flow as smaller inset cards (S/M/L/Full
    width, with their own caption). New blocks lay out left to right, side by side, wrapping
    to a new row only when they run out of horizontal space (a "Full width" media block
    always claims its own row) — not stacked one under another.
  - **Section Intro** — a simpler, centered divider page: full-bleed background plus just a
    heading and a line of text, no block grid — good for introducing a sub-section
    mid-chapter without the weight of a full entry.
  - **Grid** — the same full-bleed-background-plus-block-grid template as Full Background,
    just with a wider content column so a freeform grid of text/media boxes (added one at a
    time, same as above) has more room to spread across rows and columns.
  - **Scroll Sequence** — a stack of full-bleed image steps with an optional caption on each.
    Add images with **+ Add image**, give each one its own text, and reorder/remove them from
    each step's toolbar. On the published page, scrolling into a Scroll Sequence page steps
    through its images one at a time — the page holds in place and *won't* advance to the
    next chapter/entry until every image has been shown; scrolling back up steps back through
    them the same way. It's built on the same section-hold mechanism as background
    video/GIF (see below), just gated on "every image shown" instead of "media finished."
    This wheel-driven stepping only applies to mouse/trackpad scrolling — keyboard, scrollbar,
    and touch scrolling pass straight through to the next page instead of stepping.
- The timeline is a **thin strip** (~90px) that sits **in the normal page flow** next to the
  chapters/entries column and sticks to the top of the viewport as you scroll — it's part of
  the page, not a floating overlay, and releases/scrolls away naturally once you pass the
  last chapter. It shows just a thick, bold, flowing "water" line (animated, continuously
  drifting) connecting large water-droplet-shaped markers, on a solid dark-charcoal
  (`#413C3F`) backdrop with bright cyan (`#0DBFDB`) glow, independent of the light/dark theme
  toggle. Chapter/entry titles don't take up permanent space — hover any droplet to pop up
  its title next to it; click any droplet to jump the main scroll straight there. In Edit
  Mode, the rail is itself editable and reorderable: **drag** any droplet to reorder chapters
  (drag a chapter's head) or entries (drag an entry, including onto a *different* chapter to
  move it there), and **click** a droplet to rename its chapter/entry right from the sidebar,
  in the same popup that normally just shows the title on hover. Its content
  pans vertically in lockstep with the page's scroll position, so the timeline visibly scrolls
  together with the sections rather than sitting static. The active chapter's accent color
  washes across the progress fill and pull-quote borders as you scroll.
- A small "you are here" popup (bottom-left) pops up fresh with a droplet icon whenever the
  active chapter/entry changes as you scroll, then fades out after a couple of seconds of
  no further scrolling.
- The hero, every chapter cover, and every entry can carry an **optional popup box** hugging
  the left edge — a small round mascot tab that reveals a brand-blue (`#005BA6`) card with
  white text on hover (or tap/focus), for a free-form note plus an optional image/GIF,
  separate from the main text and inline media blocks. It's off by default; add one with
  **+ Add popup box**, edit its text and swap its image the same way as everywhere else, and
  remove it any time with the ✕.
- Every image/video/GIF — the hero, a chapter cover, an entry's full-bleed background, or an
  inline media block — can carry **draggable text-box annotations** pinned directly onto it,
  the way a scrollytelling infographic labels a photo. In Edit Mode, click **+ Text Box** to
  drop one on, drag it anywhere by its ⠿⠿ handle, and style it with its own toolbar (font,
  size, bold, italic, color) independent of every other text on the page.
- A chapter cover or entry with **no background image set** falls back to solid brand-blue
  (`#005BA6`) instead of a generic placeholder pattern, since it's a full-bleed section
  background.
- The **"CHAPTER 0X"** eyebrow label and each entry's year tag are brand-yellow (`#FBE847`).
- A small original brand mascot — a cyan/yellow water-drop blob character — appears in a few
  spots: bobbing in the hero's corner, as the popup box's hover tab, and in the footer.
- Sections don't scroll past each other — each full-bleed slide (hero, chapter cover, entry)
  pins in place at the top of the viewport, and the next one arrives zoomed way out (tiny
  and distant, like a location seen from orbit) and grows to fill the whole screen as you
  keep scrolling, zooming in on top of whichever slide is still pinned underneath it —
  a Google Earth-style dive into each section instead of a hard cut or a plain scroll past.
  Background media is never dimmed or faded during this — only scale changes, so a video or
  GIF background stays fully visible and readable throughout the whole arrival.
- **A section holds until its background media is done.** If a chapter cover or entry's
  full-bleed background is a video or GIF, scrolling forward into the *next* section is held
  back until that media finishes — an uploaded/linked video auto-detects its own length; a
  GIF or an embedded YouTube/Vimeo video (which can't report when they're "done") instead
  hold for a set number of seconds you choose in the Change Media modal (defaults to a few
  seconds, editable per media). Scrolling *back* up is always free, the very last section
  never holds, and jumping via the timeline rail always overrides the hold — so nothing is
  ever unreachable. Background video always autoplays muted so it can actually play.
- Within that, the section's content still has its own layered zoom: its content wrapper,
  title, each text block, and each inline media card all scale in at their own pace and
  transform-origin as they scroll into place, driven live by scroll position (not a one-time
  reveal) so it's fully smooth and reversible in both scroll directions. Text/UI chrome still
  fades in as it arrives; every media element (background or inline) stays at full opacity.
- Every media layer moves with scroll: the smaller inline media-overlay images/GIFs inside
  the text flow get their own independent, subtler scroll-linked drift on top of the
  section-level zoom.
- Scrolling with a mouse wheel/trackpad glides between sections with inertia — each tick eases
  the page toward its target position over several frames instead of jumping straight there.
  Keyboard, scrollbar, and touch scrolling stay native.
- The primary UI palette is the brand's exact hex values throughout: text and buttons in
  `#005BA6` (blue), interactive/live highlights in `#0DBFDB` (cyan), and secondary accents in
  `#413C3F` (charcoal) — including the per-chapter marker colors in the timeline, which cycle
  through just these three. The site is locked to this one dark theme.

**Editing (toggle "Edit Mode: On" in the top bar):**
- Click any text to edit it in place — chapter titles, entry years/titles/captions, and
  every text block.
- Each text block gets its own floating toolbar: style, font, size, alignment, bold, italic,
  and a color swatch for the text itself, plus reorder/delete. Use **+ Add text block** to add
  more, or **+ Add image / video / GIF** to drop in an inline media overlay (its toolbar
  controls size and alignment instead).
- Every chapter/page is fully reorderable — **↑/↓ Move** on a chapter or entry (or drag it
  in the timeline rail, see above), and the 4 "**+** *page type*" buttons between pages drop
  a new page of that type anywhere in the sequence — regardless of what mix of page types a
  chapter contains, so different page types can be freely rearranged together.
- Hover any image/video — the entry's full-bleed background, a chapter cover, the hero, or
  an inline media block — and click **Change Media** to set an Image, GIF, or Video — paste a
  URL (including YouTube/Vimeo links, which embed automatically) or upload a file, with
  loop/autoplay/muted options for an inline media block's video. A section *background*
  video always autoplays muted automatically (so it can hold the section, see above) — the
  modal shows a "Hold this section until media finishes" field instead for background GIFs
  and video, letting you set how many seconds to hold.
- **+ Add chapter at end**, **+ Insert entry here**, move-up/down, and delete controls (in
  the main content column) let you fully restructure the story.
- **Export JSON** downloads your content; **Import JSON** loads it back in (or share it with
  someone else). **Reset Demo** restores the sample content.
- Edits autosave to the browser's local storage, so a refresh won't lose your work.
  Uploaded files are stored as data URLs — large video uploads can hit the browser's
  storage limit, so linking to hosted video (or a YouTube/Vimeo URL) scales better than
  uploading.

**Note on video embeds:** YouTube/Vimeo iframes require a live internet connection in the
browser viewing the page — they won't load in network-sandboxed previews, only in a normal
browser.

**Note on the page-type system:** content saved before page types existed (and the shipped
demo content) loads in as **Full Background** pages automatically — nothing changes visually
until you deliberately switch a page's type or add a new one of a different type.
