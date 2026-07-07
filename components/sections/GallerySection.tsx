"use client";

import Image from "next/image";
import { useRef } from "react";
import type { MediaAsset, Section } from "@/types/content";
import { findMedia, SectionShell } from "@/components/sections/shared";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

export function GallerySection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation } = section;
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const items = content.gallery ?? [];

  useScrollTrigger(
    wrapRef,
    (gsap) => {
      if (!animation.horizontal || !trackRef.current || !wrapRef.current) return;
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: animation.scrub || 1,
          pin: animation.pinned,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    [animation.horizontal, animation.pinned, animation.scrub, items.length]
  );

  return (
    <SectionShell section={section} className="!p-0" contentClassName="!max-w-none w-full h-full">
      <div ref={wrapRef} className="relative flex h-full min-h-screen w-full flex-col justify-center">
        {content.heading && (
          <h3 className="font-heading absolute left-6 top-10 z-20 text-xl uppercase tracking-[0.2em] md:left-12 md:top-16">
            {content.heading}
          </h3>
        )}
        <div ref={trackRef} className="flex w-max items-center gap-6 px-6 will-change-transform md:gap-10 md:px-12">
          {items.map((item) => {
            const asset = findMedia(item.mediaId, media);
            return (
              <figure
                key={item.id}
                className="group relative h-[60vh] w-[70vw] shrink-0 overflow-hidden rounded-sm md:h-[70vh] md:w-[46vw] lg:w-[36vw]"
              >
                {asset ? (
                  <Image
                    src={asset.url}
                    alt={asset.alt}
                    fill
                    sizes="60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)]" />
                )}
                {(item.caption || item.credit) && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    {item.caption && <p className="font-body text-sm">{item.caption}</p>}
                    {item.credit && (
                      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-60">
                        {item.credit}
                      </p>
                    )}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
