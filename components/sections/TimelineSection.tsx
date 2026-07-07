"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { Eyebrow, findMedia, Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

export function TimelineSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation } = section;
  const reveal = useReveal(animation);
  const entries = content.timeline ?? [];
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(
    railRef,
    (gsap) => {
      if (!fillRef.current) return;
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    },
    [entries.length]
  );

  return (
    <SectionShell section={section} contentClassName="w-full">
      {(content.eyebrow || content.heading) && (
        <div className="mb-16 text-left">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          {content.heading && <Heading scale={0.5}>{content.heading}</Heading>}
        </div>
      )}
      <div ref={railRef} className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-[var(--color-text)]/15 md:left-1/2" />
        <div
          ref={fillRef}
          className="absolute left-3 top-0 h-full w-px origin-top bg-[var(--color-accent)] md:left-1/2"
        />
        <div className="flex flex-col gap-16">
          {entries.map((entry, i) => {
            const asset = findMedia(entry.mediaId, media);
            const onRight = i % 2 === 1;
            return (
              <motion.div
                key={entry.id}
                {...reveal}
                className={`relative flex flex-col gap-6 pl-12 md:w-1/2 md:pl-0 md:pr-12 ${
                  onRight ? "md:ml-auto md:items-start md:pl-12 md:pr-0" : "md:items-end md:text-right"
                }`}
              >
                <span className="absolute -left-[1px] top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-accent)] md:left-auto md:right-[-1px] md:translate-x-1/2" />
                <span className="font-mono text-sm tracking-[0.2em] opacity-60">{entry.year}</span>
                <h4 className="font-heading text-2xl">{entry.title}</h4>
                {entry.body && <p className="font-body max-w-md opacity-80">{entry.body}</p>}
                {asset && (
                  <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-sm">
                    <Image src={asset.url} alt={asset.alt} fill sizes="320px" className="object-cover" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
