"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { Body, Eyebrow, findMedia, Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export function SplitImageTextSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const reveal = useReveal(animation);
  const img = findMedia(content.mediaId, media);
  const imageFirst = layout.imagePosition === "left" || layout.imagePosition === "top";
  const vertical = layout.imagePosition === "top" || layout.imagePosition === "bottom";

  return (
    <SectionShell section={section} contentClassName="w-full">
      <div
        className={cn(
          "grid w-full items-center gap-12",
          vertical ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}
      >
        <motion.div
          {...reveal}
          className={cn(imageFirst ? "order-1" : "order-2", "relative aspect-[4/5] w-full overflow-hidden rounded-sm")}
        >
          {img ? (
            <Image src={img.url} alt={img.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]" />
          )}
        </motion.div>

        <motion.div {...reveal} className={cn(imageFirst ? "order-2" : "order-1", "text-left")}>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading scale={0.5}>{content.heading}</Heading>
          {content.body && <Body className="mt-6" html={content.body} />}
        </motion.div>
      </div>
    </SectionShell>
  );
}
