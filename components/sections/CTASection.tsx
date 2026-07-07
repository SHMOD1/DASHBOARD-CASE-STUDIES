"use client";

import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { BackgroundMedia, Body, findMedia, Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";

export function CTASection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const reveal = useReveal(animation);
  const bgMedia = findMedia(layout.backgroundImageId, media);

  return (
    <SectionShell
      section={section}
      bgSlot={
        <BackgroundMedia
          media={bgMedia}
          overlayOpacity={layout.overlayOpacity}
          parallax={animation.parallax}
          parallaxStrength={animation.parallaxStrength}
        />
      }
    >
      <motion.div {...reveal}>
        <Heading scale={0.6}>{content.heading}</Heading>
        {content.body && <Body className="mx-auto mt-4 max-w-md" html={content.body} />}
        {content.ctaLabel && (
          <a
            href={content.ctaHref || "#"}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-text)]/30 px-8 py-3 text-sm uppercase tracking-[0.2em] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {content.ctaLabel}
          </a>
        )}
      </motion.div>
    </SectionShell>
  );
}
