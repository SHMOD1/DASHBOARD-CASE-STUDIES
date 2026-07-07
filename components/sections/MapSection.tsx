"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { BackgroundMedia, findMedia, Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";
import { staggerContainer } from "@/animations/variants";

export function MapSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const reveal = useReveal(animation);
  const bgMedia = findMedia(layout.backgroundImageId, media);
  const pins = content.mapPins ?? [];
  const [activePin, setActivePin] = useState<string | null>(null);

  return (
    <SectionShell
      section={section}
      contentClassName="!max-w-none w-full h-full"
      bgSlot={
        <BackgroundMedia
          media={bgMedia}
          overlayOpacity={layout.overlayOpacity}
          parallax={animation.parallax}
          parallaxStrength={animation.parallaxStrength}
        />
      }
    >
      <div className="relative h-full min-h-[inherit] w-full">
        {content.heading && (
          <Heading scale={0.5} className="absolute left-6 top-10 z-20 md:left-12">
            {content.heading}
          </Heading>
        )}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="absolute inset-0"
        >
          {pins.map((pin) => (
            <motion.button
              key={pin.id}
              type="button"
              variants={reveal.variants}
              onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              {activePin === pin.id && (
                <div className="absolute left-1/2 top-6 w-56 -translate-x-1/2 rounded-sm bg-[var(--color-background)]/95 p-4 text-left shadow-xl backdrop-blur">
                  <p className="font-heading text-base">{pin.label}</p>
                  <p className="font-body mt-1 text-xs opacity-70">{pin.description}</p>
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
