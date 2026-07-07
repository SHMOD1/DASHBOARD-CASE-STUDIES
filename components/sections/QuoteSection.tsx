"use client";

import { useRef } from "react";
import type { MediaAsset, Section } from "@/types/content";
import { BackgroundMedia, findMedia, SectionShell } from "@/components/sections/shared";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

export function QuoteSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const bgMedia = findMedia(layout.backgroundImageId, media);
  const quoteRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(
    pinRef,
    (gsap) => {
      const pinEl = pinRef.current;
      if (!animation.pinned || !quoteRef.current || !pinEl) return;
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0.15, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          ease: animation.easing,
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: "bottom bottom",
            scrub: animation.scrub || 1,
            pin: pinEl.querySelector("[data-pin-inner]"),
            pinSpacing: false,
          },
        }
      );
    },
    [animation.pinned, animation.scrub, animation.easing]
  );

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
      <div ref={pinRef} className="flex min-h-[inherit] w-full flex-col justify-center">
        <div data-pin-inner className="flex flex-col items-center justify-center px-6">
          <div ref={quoteRef}>
            <blockquote
              className="font-heading text-balance"
              style={{
                fontSize: "var(--heading-size)",
                lineHeight: 1.25,
                letterSpacing: "var(--letter-spacing)",
              }}
            >
              &ldquo;{content.quote}&rdquo;
            </blockquote>
            {content.attribution && (
              <p className="font-body mt-8 text-sm uppercase tracking-[0.3em] opacity-70">
                {content.attribution}
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
