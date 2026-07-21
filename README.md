# DASHBOARD-CASE-STUDIES

## Editable Storymap Dashboard

`index.html` is a full-bleed storymap — every hero, chapter cover, and entry is a true
full-screen (100vh) slide with its background image/GIF/video filling the entire viewport
edge-to-edge, each one rising cleanly into full view as you scroll — no fade, so the
incoming slide is never blended with whatever's still visible underneath it — not a static
boxed layout. It ships with a real
case study, "How Does Water Move Through the City?", tracing Los Angeles's Tujunga Wash
watershed across four chapters — the historical setting, a century of urban lake loss,
citizen-led rainwater harvesting and groundwater recharge, and neighborhoods restoring lakes
and wetlands today — so you can see the template in use, and you can reshape it for any other
chapter-based case-study or narrative content.

Open `index.html` directly in a browser — no build step or server required. The photos and
video used by the shipped case study are hosted externally (currently on Cloudflare R2, via
the "Push to GitHub" media-hosting option below) rather than embedded inline or shipped in
this repo's own `assets/` folder, so `index.html` itself stays small and fast to load —
everything you upload yourself in Edit Mode still saves as an inline data URL locally as you
work (see "Editing" below) until it's pushed.

**Opening cover:** the hero is a distinct, centered "presented by" title page — a logo row
(add/remove/replace each logo image in Edit Mode), a "Presents" label, the big title and
subtitle, a "Scroll down" prompt, and a **"Dive In" button** (green pill, blue text/border)
that smooth-scrolls straight to the first chapter — all on a solid brand-blue (`#005BA6`)
backdrop with white text. It ships with placeholder logo badges and an abstract pale-line
background graphic (both clearly marked as placeholders) so you can drop in your own
branding and cover image. This styling — and the Dive In button — is scoped only to the
opening hero; every chapter cover and entry keeps its own full-bleed, bottom-left layout
untouched, and Section Intro pages carry just their optional hint line, no button.

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

**Text styling — highlighter-marker look:** chapter titles, entry titles, and Heading text
blocks are the only text carrying the blue (`#005BA6`) highlight — chapter/entry titles and
Heading render as tight, per-line highlight bars behind white text (using
`box-decoration-break`, so each wrapped line gets its own tightly-fit rectangle rather than
one big box); the hero's own title skips this since the hero page is already a solid blue
backdrop. Every other text block type — Subheading, Body, Pull quote, and Caption — shares
one plain cream (`#F8F3EF`) card look with dark text, so a page's text reads as a stack of
plain white cards under its blue heading, not a wall of color. Pull quotes keep a large
decorative opening quotation mark; captions/citations stay italic. Draggable text-box
annotations use brand-blue (`#005BA6`) text, tightly padded, on a solid yellow (`#FFDE17`)
highlight — the same blue used everywhere else, kept readable against that yellow. Newly-added
annotations default to that blue (as does the "Stat Chip" preset's green pill); you can still
pick any color per annotation from its toolbar's color swatch.

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
    images/GIFs/videos dropped into the same text flow, with their own caption. Blocks stack
    in a single narrow column pinned to the left edge (each one already reads as its own
    card), leaving most of the screen clear for the image/video behind them, rather than text
    spreading across most of the frame — the title above the blocks keeps its own wider width.
  - **Section Intro** — a simpler, centered divider page: full-bleed background plus a
    heading and a line of text, no block grid — good for introducing a sub-section
    mid-chapter without the weight of a full entry. It also carries an optional short **hint**
    line (e.g. "Click and hold to enlarge any image") in a small green pill — the "Dive In"
    button lives only on the opening hero (see "Opening cover" above), not on every intro page.
  - **Grid** — every block on the page, text or media alike, snaps into an even N-per-row
    grid instead of the freeform flow the other types use — pick 2, 3, or 4 columns per row
    from a control in the page's toolbar. A media block set to "Full width" still breaks out
    to span the entire row (handy for a table or a wide photo among a grid of smaller ones).
  - **Scroll Sequence** — a stack of image steps, each shown centered and at its own natural
    size/shape (never cropped) on a plain solid brand-blue field, rather than a busy full-bleed
    photo — so the picture stays a clear focal point and any annotation text on it stays
    easy to read. Add images with **+ Add image**, give each one its own text, and
    reorder/remove them from each step's toolbar. On the published page, scrolling into a
    Scroll Sequence page steps through its images one at a time, each one instantly and
    completely replacing the last — no fade or overlap between them — while the page holds
    in place and *won't* advance to the next chapter/entry until every image has been shown;
    scrolling back up steps back through them the same way. It's built on the same
    section-hold mechanism as background video/GIF (see below), just gated on "every image
    shown" instead of "media finished."
    This wheel-driven stepping only applies to mouse/trackpad scrolling — keyboard, scrollbar,
    and touch scrolling pass straight through to the next page instead of stepping. Each step
    can also carry its own **draggable text-box annotations** (**+ Text Box**), the same
    movable, styleable labels available everywhere else — pinned to that one step, so a label
    only shows up while its image is the one on screen.
    In Edit Mode, every step in a Scroll Sequence page is shown stacked, one below another —
    that's deliberate, so you can see and edit each one at once; it's only on the published
    page that each new image replaces the last instead of scrolling past it.
- The timeline is a **thin strip** (~90px) that sits **in the normal page flow** next to the
  chapters/entries column and sticks to the top of the viewport as you scroll — it's part of
  the page, not a floating overlay, and releases/scrolls away naturally once you pass the
  last chapter. It shows just a thick, bold, flowing "water" line (animated, continuously
  drifting) connecting large water-droplet-shaped markers, on a solid dark-charcoal
  (`#413C3F`) backdrop — recolored to a green/blue combination at the client's request: the
  riverbed line and idle droplets are brand-blue (`#306EF8`), while the flowing "water" fill
  and the active droplet are mint-green (`#7AF9B4`) with a blue glow, independent of the
  light/dark theme toggle. (Each chapter still keeps its own identity color — cycling through
  the brand's cyan/blue/charcoal accents — on its chapter-head marker specifically.)
  Chapter/entry titles don't take up permanent space — a popup automatically shows
  the title of whichever chapter/entry is currently active as you scroll, right next to its
  droplet, no hovering needed; hover a different droplet to preview its title instead, and
  moving away goes back to showing the current section. The popup itself uses the same
  green/blue "sticker" treatment as the rest of the dashboard's green UI (see below). Click
  any droplet to jump the main scroll straight there. In Edit Mode, the rail is itself
  editable and reorderable: **drag** any droplet to reorder chapters (drag a chapter's head)
  or entries (drag an entry, including onto a *different* chapter to move it there), and
  **click** a droplet to rename its chapter/entry right from the sidebar, in that same popup.
  Its content pans vertically in lockstep with the page's scroll position, so the timeline
  visibly scrolls together with the sections rather than sitting static.
- A small "you are here" chip (bottom-left) pops up fresh with a droplet icon whenever the
  active chapter/entry changes as you scroll, then fades out after a couple of seconds of
  no further scrolling — styled as a mint-green (`#7AF9B4`) button with bold blue (`#005BA6`)
  border/text and a hard, offset dark-navy (`#134370`) drop shadow. This same green/blue-
  border/blue-shadow "sticker" treatment is shared by every green UI element in the
  dashboard — this chip, the hero's "Dive In" button, a Section Intro page's hint pill, the
  annotation toolbar's "Stat Chip" style, and the rail sidebar's title popup — using
  `#7AF9B4` rather than the brand deck's documented `#53B94E` green (see "Brand system"
  above) at the client's request. Anywhere a background image hasn't been set yet (a chapter
  cover or entry background), the empty-media fallback is `#306EF8` rather than the brand
  deck's plain `#005BA6` blue, for the same reason.
- The hero, every chapter cover, and every entry can carry an **optional popup box** hugging
  the top-left edge — a small round mascot tab that reveals a brand-blue (`#005BA6`) card with
  white text, for a free-form note plus an optional image/GIF, separate from the main text and
  inline media blocks. It opens on hover (or tap/focus) same as before, and now also **opens
  itself automatically** a couple of seconds after its slide becomes the active one — so a
  visitor who never hovers still sees it — while leaving alone any box a visitor has already
  opened or closed by hand. It's off by default; add one with **+ Add popup box**, edit its
  text and swap its image the same way as everywhere else, and remove it any time with the ✕.
- Every image/video/GIF — the hero, a chapter cover, an entry's full-bleed background, or an
  inline media block — can carry **draggable text-box annotations** pinned directly onto it,
  the way a scrollytelling infographic labels a photo. In Edit Mode, click **+ Text Box** to
  drop one on, drag it anywhere by its ⠿⠿ handle, and style it with its own toolbar (font,
  size, bold, italic, color) independent of every other text on the page. Its toolbar also has
  a **Highlight / Stat Chip** style switch — Highlight is the default tight yellow marker-style
  box; Stat Chip is a small rounded green pill (with matching blue text) for a short number or
  label overlaid on the media, like a "YEAR: 1854" callout on a map.
- A chapter cover or entry with **no background image set** falls back to solid brand-blue
  (`#005BA6`) instead of a generic placeholder pattern, since it's a full-bleed section
  background.
- The **"CHAPTER 0X"** eyebrow label and each entry's year tag are brand-yellow (`#FBE847`).
- A small brand mascot appears in a few spots: bobbing in the hero's corner, as the popup
  box's hover tab, and in the footer. By default it's a hand-drawn cyan water-drop blob with
  a yellow rim highlight, cropped to just the head/face (no arms or legs) so it reads cleanly
  as a small icon without ever looking stretched or skewed — but in Edit Mode, the **"Change
  Mascot Image"** button under the footer lets you upload your own mascot image (same
  uploader as any other media in the dashboard), which then replaces it in all three spots
  at once.
- Sections don't scroll past each other — each full-bleed slide (hero, chapter cover, entry)
  pins in place at the top of the viewport, and the next one rises up and covers it cleanly
  as you keep scrolling, always at full opacity — no fade, so the incoming section is never
  blended or ghosted with whatever's still visible underneath it. Everything inside a slide —
  title, text, media — arrives together as one unit; nothing scales, zooms, or fades
  independently.
- **A section holds until its background media is done.** If a chapter cover or entry's
  full-bleed background is a video or GIF, scrolling forward into the *next* section is held
  back until that media finishes — an uploaded/linked video auto-detects its own length; a
  GIF or an embedded YouTube/Vimeo video (which can't report when they're "done") instead
  hold for a set number of seconds you choose in the Change Media modal (defaults to a few
  seconds, editable per media). Scrolling *back* up is always free, the very last section
  never holds, and jumping via the timeline rail always overrides the hold — so nothing is
  ever unreachable. Background video always autoplays muted so it can actually play.
- This reveal is driven live by scroll position (not a one-time animation), so it's fully
  reversible — scrolling back up uncovers the previous section exactly the way it came, the
  same way scrolling back up through a Scroll Sequence steps back through its images (which
  swap instantly too, same as this — nothing in the dashboard fades/blends between two
  sections or images anymore, at any point).
- Inline media-overlay images/GIFs inside the text flow still get their own small, independent
  scroll-linked drift (a subtle pan/scale as you read past them).
- Scrolling with a mouse wheel/trackpad glides between sections with inertia — each tick eases
  the page toward its target position over several frames instead of jumping straight there.
  Keyboard, scrollbar, and touch scrolling stay native.
- The primary UI palette is the brand's exact hex values throughout: text and buttons in
  `#005BA6` (blue), interactive/live highlights in `#0DBFDB` (cyan), and secondary accents in
  `#413C3F` (charcoal) — including the per-chapter marker colors in the timeline, which cycle
  through just these three. The site is locked to this one dark theme. (The rail's flowing
  line, idle droplets, and title popup use the newer `#306EF8`/`#7AF9B4` green-blue combo
  described above instead of the cyan.)

**On a phone or tablet:** the page doesn't reflow into a narrow single-column layout — the
viewport is pinned at a fixed desktop-scale width (1500px), so the whole design (including
freely-placed annotation labels, which can't sensibly reflow) renders exactly as designed and
is simply scaled down to fit the screen initially. Visitors pinch-zoom and pan to read details,
the way a non-mobile-optimized site works, rather than everything being pre-shrunk to fit. The
editor toolbar (Edit Mode, Export/Import JSON, Reset Demo, Push to GitHub) is hidden on any
touchscreen device — phones are for reading the published story, not editing it — and the
timeline rail reclaims the full screen height it leaves behind; Edit Mode also can't be
switched on by any means on a touch device, even if it was left on at a wider width beforehand.
Desktop/laptop viewing (mouse or trackpad) is completely unaffected either way.

**Editing (toggle "Edit Mode: On" in the top bar):**
- Click any text to edit it in place — chapter titles, entry years/titles/captions, and
  every text block.
- Each text block gets its own floating toolbar: style, font, size, alignment, bold, italic,
  and a color swatch for the text itself, plus reorder/delete. Use **+ Add text block** to add
  more, or **+ Add image / video / GIF** to drop in an inline media overlay (its toolbar
  controls size and alignment instead).
- Chapter/entry titles, text blocks, and annotations all carry a highlight/box background
  behind their text — but only when there's actually text in them. Clear all the text out of
  one and its highlight disappears on the published page, so a reader never sees an empty
  colored box; in Edit Mode the box stays put so you can always find it and type into it again.
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
- An inline media block always takes the true shape of whatever you upload — portrait, square,
  panoramic, anything — instead of being cropped into one fixed box shape; only a YouTube/
  Vimeo embed keeps the standard 16:9 video shape, since an embed has no size of its own to
  take. Its S/M/L/Full setting still controls how wide it sits in the flow (or, on a Grid
  page, "Full" spans the entire row instead of one column).
- A **"+ Add chapter here"** row appears after every chapter (the last one reads "+ Add
  chapter at end"), so a new chapter can be inserted between any two existing ones just as
  easily as tacked onto the end.
- Every **"+ Insert entry here"** row (which already appears before every single page, and
  once more at the end of each chapter) also carries a **"+ Add Chapter"** option alongside
  the page-type buttons — click it and everything from that page onward moves out of the
  current chapter into a brand-new one right after it, splitting the chapter at exactly that
  point. Nothing is lost or reordered, it's just re-homed into the new chapter; used at the
  very end of a chapter's pages (nothing left to move), it behaves the same as the
  chapter-level "+ Add chapter here" row above.
- That, plus move-up/down and delete controls (in the main content column), let you fully
  restructure the story.
- **Export JSON** downloads your content; **Import JSON** loads it back in (or share it with
  someone else). **Reset Demo** restores the sample content.
- Edits autosave to the browser's IndexedDB storage, so a refresh won't lose your work.
  (Earlier versions used `localStorage`, which caps out around 5-10MB — easy to blow through
  once a few uploaded images/video are involved. IndexedDB scales into the hundreds of MB, so
  heavy media-rich editing works entirely in the browser now. Anyone with edits saved under
  the old `localStorage` key gets migrated over automatically, once, the first time they load
  this version — nothing is lost.) Uploaded files are still stored as data URLs either way —
  a *lot* of large video uploads can still make the page itself heavy to export/import, so
  linking to hosted video (or a YouTube/Vimeo URL) scales better than uploading when you're
  adding a lot of it.
- **Push to GitHub** (top bar) is the alternative to Export/Import for getting a heavily
  edited version out of the browser and into the actual repo, without ever moving one giant
  file: it uploads every embedded image/video in your current content to `assets/` as its own
  small file (skipping the tiny procedurally-generated placeholder graphics, which aren't real
  content), rewrites your content to point at those files instead of inline data URLs, and
  commits that as this file's new default — all directly from your browser to GitHub's API.
  It needs a GitHub [Personal Access
  Token](https://github.com/settings/personal-access-tokens/new) with write access to the
  target repo, plus the repo owner/name/branch; all four are kept only in that browser tab's
  `sessionStorage` (gone once the tab closes) and sent nowhere but `api.github.com` directly.
  The commit lands on whatever branch you point it at — review it (or open a PR) same as any
  other change before merging.
  Each media file's .src is swapped to its new short path the moment its upload succeeds —
  permanently, directly on your live content, not on a copy — because holding on to every
  original in case of a later rollback is itself enough memory pressure to crash the tab once
  total embedded media reaches into the hundreds of MB. A push that fails partway through
  just leaves whatever succeeded already swapped over and the rest still embedded; clicking
  Push again picks up exactly where it left off, since already-migrated files no longer look
  like unpushed media. One side effect: right after a push, your own local images may show
  broken here unless this page happens to be served from somewhere that also serves
  `assets/` (the repo itself, or a hosted copy) — the content itself is safe on GitHub either
  way, and a normal page load afterward (e.g. from the pushed copy) shows everything intact.
  A "Where should images/video be uploaded?" dropdown in that same modal lets you send media
  to **Cloudflare R2** instead of this repo's `assets/` folder — a better fit once total
  media size climbs into the hundreds of MB, since GitHub's Contents API isn't really built
  for large binary files and starts failing unpredictably around there, while R2 handles it
  natively. This needs a small one-time setup (a Cloudflare R2 bucket plus a Worker that
  accepts authenticated uploads and writes them into it) that a human has to do once in the
  Cloudflare dashboard — ask for the Worker script and setup steps. Once configured, media
  lands as public URLs instead of relative repo paths, your content still commits to GitHub
  as usual either way, and switching to Cloudflare on a dashboard that already pushed some
  media to GitHub in an earlier run pulls those files back and re-uploads them to Cloudflare
  too, so everything ends up in one place instead of split across two hosts.

**Note on video embeds:** YouTube/Vimeo iframes require a live internet connection in the
browser viewing the page — they won't load in network-sandboxed previews, only in a normal
browser.

**Note on the page-type system:** content saved before page types existed (and the shipped
demo content) loads in as **Full Background** pages automatically — nothing changes visually
until you deliberately switch a page's type or add a new one of a different type.
