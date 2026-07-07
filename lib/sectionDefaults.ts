import type {
  AnimationConfig,
  ColorOverride,
  LayoutConfig,
  Section,
  SectionType,
  TypographyOverride,
} from "@/types/content";
import { SECTION_LABELS } from "@/types/content";
import { genId } from "@/lib/id";

export function defaultAnimation(overrides: Partial<AnimationConfig> = {}): AnimationConfig {
  return {
    enabled: true,
    reveal: "fade",
    slideDirection: "up",
    pinned: false,
    horizontal: false,
    parallax: false,
    parallaxStrength: 20,
    duration: 1.1,
    delay: 0,
    speed: 1,
    scrub: 0,
    easing: "power3.out",
    ...overrides,
  };
}

export function defaultLayout(overrides: Partial<LayoutConfig> = {}): LayoutConfig {
  return {
    height: "screen",
    paddingY: 6,
    paddingX: 6,
    marginY: 0,
    align: "center",
    imagePosition: "background",
    textWidth: 60,
    columns: 1,
    backgroundColor: null,
    backgroundImageId: null,
    overlayOpacity: 0.35,
    ...overrides,
  };
}

export function defaultTypography(overrides: Partial<TypographyOverride> = {}): TypographyOverride {
  return {
    fontFamily: null,
    headingSize: null,
    paragraphSize: null,
    letterSpacing: null,
    lineHeight: null,
    uppercase: false,
    bold: false,
    weight: null,
    ...overrides,
  };
}

export function defaultColor(overrides: Partial<ColorOverride> = {}): ColorOverride {
  return {
    primary: null,
    secondary: null,
    background: null,
    text: null,
    accent: null,
    ...overrides,
  };
}

const TYPE_PRESETS: Partial<Record<SectionType, {
  animation?: Partial<AnimationConfig>;
  layout?: Partial<LayoutConfig>;
}>> = {
  hero: {
    animation: defaultAnimation({ reveal: "fade", parallax: true, parallaxStrength: 35, duration: 1.6 }),
    layout: defaultLayout({ height: "screen", imagePosition: "background", overlayOpacity: 0.45 }),
  },
  quote: {
    animation: defaultAnimation({ reveal: "fade", pinned: true, scrub: 1, duration: 1 }),
    layout: defaultLayout({ height: "tall", imagePosition: "background", textWidth: 55, overlayOpacity: 0.55 }),
  },
  fullscreenImage: {
    animation: defaultAnimation({ reveal: "mask", parallax: true, parallaxStrength: 25 }),
    layout: defaultLayout({ height: "screen", imagePosition: "background", overlayOpacity: 0.25 }),
  },
  splitImageText: {
    animation: defaultAnimation({ reveal: "slide", slideDirection: "up" }),
    layout: defaultLayout({ height: "auto", imagePosition: "right", columns: 2, textWidth: 44, paddingY: 8 }),
  },
  gallery: {
    animation: defaultAnimation({ reveal: "slide", pinned: true, horizontal: true, scrub: 1, duration: 1 }),
    layout: defaultLayout({ height: "screen", imagePosition: "background" }),
  },
  video: {
    animation: defaultAnimation({ reveal: "fade" }),
    layout: defaultLayout({ height: "screen", overlayOpacity: 0.2 }),
  },
  timeline: {
    animation: defaultAnimation({ reveal: "slide", slideDirection: "left" }),
    layout: defaultLayout({ height: "auto", paddingY: 10 }),
  },
  map: {
    animation: defaultAnimation({ reveal: "scale" }),
    layout: defaultLayout({ height: "tall" }),
  },
  stats: {
    animation: defaultAnimation({ reveal: "slide", slideDirection: "up" }),
    layout: defaultLayout({ height: "auto", columns: 3, paddingY: 10 }),
  },
  ending: {
    animation: defaultAnimation({ reveal: "fade", parallax: true, parallaxStrength: 30, duration: 1.8 }),
    layout: defaultLayout({ height: "screen", overlayOpacity: 0.5 }),
  },
  cta: {
    animation: defaultAnimation({ reveal: "fade" }),
    layout: defaultLayout({ height: "half", overlayOpacity: 0.3 }),
  },
};

export function createSection(type: SectionType): Section {
  const preset = TYPE_PRESETS[type] ?? {};
  return {
    id: genId("sec"),
    type,
    name: SECTION_LABELS[type],
    visible: true,
    content: defaultContentFor(type),
    animation: defaultAnimation(preset.animation),
    layout: defaultLayout(preset.layout),
    typography: defaultTypography(),
    color: defaultColor(),
  };
}

function defaultContentFor(type: SectionType): Section["content"] {
  switch (type) {
    case "hero":
      return { chapterNumber: "01", eyebrow: "A new chapter", heading: "Untitled Story", subheading: "Add a subheading to set the scene.", mediaId: null };
    case "quote":
      return { quote: "Replace this with a pull quote.", attribution: "Attribution" };
    case "fullscreenImage":
      return { caption: "Image caption", credits: "Photo credit", mediaId: null };
    case "splitImageText":
      return { eyebrow: "Chapter", heading: "New section heading", body: "Write the body copy for this section.", mediaId: null };
    case "gallery":
      return { heading: "Gallery", gallery: [] };
    case "video":
      return { heading: "Video", video: { source: "mp4", url: "", posterMediaId: null, autoplay: false, loop: false, muted: true, controls: true } };
    case "timeline":
      return { heading: "Timeline", timeline: [] };
    case "map":
      return { heading: "Map", mapPins: [] };
    case "stats":
      return { heading: "By the numbers", stats: [] };
    case "ending":
      return { heading: "The End", body: "Closing words for this story.", credits: "" };
    case "cta":
      return { heading: "Explore more", ctaLabel: "Learn more", ctaHref: "#" };
    default:
      return {};
  }
}
