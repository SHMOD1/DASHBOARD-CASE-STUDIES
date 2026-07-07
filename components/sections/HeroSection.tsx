"use client";

import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { BackgroundMedia, ChapterNumber, Eyebrow, findMedia, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";
import { staggerContainer } from "@/animations/variants";

export function HeroSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const reveal = useReveal(animation);
  const bgMedia = findMedia(content.mediaId, media);

  return (
    <SectionShell
      section={section}
      bgSlot={
        <BackgroundMedia
          media={bgMedia}
          overlayOpacity={layout.overlayOpacity}
          parallax={animation.parallax}
          parallaxStrength={animation.parallaxStrength}
          priority
        />
      }
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer(0.12)}
      >
        <motion.div variants={reveal.variants}>
          <ChapterNumber>{content.chapterNumber}</ChapterNumber>
        </motion.div>
        <motion.div variants={reveal.variants}>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          variants={reveal.variants}
          className="font-heading"
          style={{
            fontSize: "var(--heading-size)",
            lineHeight: "var(--line-height)",
            letterSpacing: "var(--letter-spacing)",
            fontWeight: "var(--font-weight-heading, 600)",
          }}
        >
          {content.heading}
        </motion.h1>
        {content.subheading && (
          <motion.p
            variants={reveal.variants}
            className="font-body mx-auto mt-6 max-w-xl text-balance opacity-80"
            style={{ fontSize: "var(--paragraph-size)" }}
          >
            {content.subheading}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.8 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
      >
        <span>Scroll</span>
        <span className="h-8 w-px bg-current" />
      </motion.div>
    </SectionShell>
  );
}
