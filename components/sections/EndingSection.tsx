"use client";

import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { BackgroundMedia, Body, findMedia, Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";
import { staggerContainer } from "@/animations/variants";

export function EndingSection({ section, media }: { section: Section; media: MediaAsset[] }) {
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer(0.15)}
      >
        <motion.div variants={reveal.variants}>
          <Heading>{content.heading}</Heading>
        </motion.div>
        {content.body && (
          <motion.div variants={reveal.variants}>
            <Body className="mx-auto mt-6 max-w-lg" html={content.body ?? ""} />
          </motion.div>
        )}
        {content.credits && (
          <motion.p
            variants={reveal.variants}
            className="font-mono mt-10 text-xs uppercase tracking-[0.3em] opacity-50"
          >
            {content.credits}
          </motion.p>
        )}
      </motion.div>
    </SectionShell>
  );
}
