"use client";

import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { BackgroundMedia, findMedia, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";

export function FullscreenImageSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const bgMedia = findMedia(content.mediaId, media);
  const reveal = useReveal(animation);

  return (
    <SectionShell
      section={section}
      contentClassName="h-full flex flex-col justify-end"
      bgSlot={
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal.variants}
          className="absolute inset-0 origin-bottom"
        >
          <BackgroundMedia
            media={bgMedia}
            overlayOpacity={layout.overlayOpacity}
            parallax={animation.parallax}
            parallaxStrength={animation.parallaxStrength}
          />
        </motion.div>
      }
    >
      {(content.caption || content.credits) && (
        <div className="mb-10 flex flex-col gap-1">
          {content.caption && (
            <p className="font-heading text-2xl" style={{ letterSpacing: "var(--letter-spacing)" }}>
              {content.caption}
            </p>
          )}
          {content.credits && (
            <p className="font-mono text-xs uppercase tracking-[0.25em] opacity-60">{content.credits}</p>
          )}
        </div>
      )}
    </SectionShell>
  );
}
