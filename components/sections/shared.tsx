"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import type { LayoutConfig, MediaAsset, Section } from "@/types/content";
import { cn } from "@/lib/utils";
import { colorOverrideVars, typographyClassNames, typographyOverrideVars } from "@/lib/theme";
import { useParallax } from "@/hooks/useParallax";

export function findMedia(mediaId: string | null | undefined, media: MediaAsset[]): MediaAsset | undefined {
  if (!mediaId) return undefined;
  return media.find((m) => m.id === mediaId);
}

const HEIGHT_CLASS: Record<LayoutConfig["height"], string> = {
  auto: "min-h-0 py-24",
  half: "min-h-[60vh]",
  screen: "min-h-screen",
  tall: "min-h-[140vh]",
};

const ALIGN_CLASS: Record<LayoutConfig["align"], string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

interface SectionShellProps {
  section: Section;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  bgSlot?: ReactNode;
}

/** Applies a section's layout + typography + color overrides around its content. */
export function SectionShell({ section, children, className, contentClassName, bgSlot }: SectionShellProps) {
  const { layout, typography, color } = section;
  const style: CSSProperties = {
    ...colorOverrideVars(color),
    ...typographyOverrideVars(typography),
    paddingTop: `${layout.paddingY}rem`,
    paddingBottom: `${layout.paddingY}rem`,
    paddingLeft: `${layout.paddingX}rem`,
    paddingRight: `${layout.paddingX}rem`,
    marginTop: `${layout.marginY}rem`,
    marginBottom: `${layout.marginY}rem`,
    backgroundColor: layout.backgroundColor ?? undefined,
  };

  return (
    <section
      id={section.id}
      data-section-id={section.id}
      className={cn(
        "relative flex w-full flex-col justify-center overflow-hidden",
        HEIGHT_CLASS[layout.height],
        ALIGN_CLASS[layout.align],
        "text-[var(--color-text)]",
        className
      )}
      style={style}
    >
      {bgSlot}
      <div
        className={cn(
          "relative z-10 mx-auto w-full",
          typographyClassNames(typography),
          contentClassName
        )}
        style={{ maxWidth: `${layout.textWidth}%` }}
      >
        {children}
      </div>
    </section>
  );
}

interface BackgroundMediaProps {
  media?: MediaAsset;
  overlayOpacity: number;
  parallax: boolean;
  parallaxStrength: number;
  priority?: boolean;
}

export function BackgroundMedia({ media, overlayOpacity, parallax, parallaxStrength, priority }: BackgroundMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useParallax(containerRef, layerRef, parallaxStrength, parallax);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <div ref={layerRef} className="absolute inset-[-10%]">
        {media ? (
          <Image
            src={media.url}
            alt={media.alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: `${media.focalX ?? 50}% ${media.focalY ?? 50}%` }}
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,var(--color-background),var(--color-secondary))] opacity-60" />
        )}
      </div>
      <div
        className="absolute inset-0 bg-[var(--color-background)]"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p className="mb-4 font-body text-[0.8rem] uppercase tracking-[0.3em] text-[var(--color-accent)]">
      {children}
    </p>
  );
}

export function Heading({
  children,
  className,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  /** Multiplier applied to the theme's --heading-size, so sections can be smaller than the hero without losing theme control. */
  scale?: number;
}) {
  return (
    <h2
      className={cn("font-heading", className)}
      style={{
        fontSize: `calc(var(--heading-size) * ${scale})`,
        lineHeight: "var(--line-height)",
        letterSpacing: "var(--letter-spacing)",
        fontWeight: "var(--font-weight-heading, 500)",
      }}
    >
      {children}
    </h2>
  );
}

/** Renders `html` produced by the dashboard's rich text editor (bold/italic/links). */
export function Body({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("font-body opacity-90 [&_a]:underline", className)}
      style={{ fontSize: "var(--paragraph-size)", lineHeight: "var(--line-height)" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ChapterNumber({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <span className="mb-6 block font-mono text-sm tracking-[0.4em] text-[var(--color-accent)]">
      {children}
    </span>
  );
}
