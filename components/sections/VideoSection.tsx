"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MediaAsset, Section } from "@/types/content";
import { Eyebrow, findMedia, Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] ?? null;
}

export function VideoSection({ section, media }: { section: Section; media: MediaAsset[] }) {
  const { content, animation } = section;
  const reveal = useReveal(animation);
  const video = content.video;
  const poster = findMedia(video?.posterMediaId, media);
  const [playing, setPlaying] = useState(Boolean(video?.autoplay));

  return (
    <SectionShell section={section} contentClassName="w-full">
      {(content.eyebrow || content.heading) && (
        <div className="mb-8 text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          {content.heading && <Heading scale={0.55}>{content.heading}</Heading>}
        </div>
      )}
      <motion.div {...reveal} className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-sm bg-black">
        {!video || !video.url ? (
          <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-widest opacity-50">
            No video set
          </div>
        ) : !playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative h-full w-full"
            aria-label="Play video"
          >
            {poster ? (
              <Image src={poster.url} alt={poster.alt} fill className="object-cover opacity-90" />
            ) : (
              <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/90 text-[var(--color-background)] transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        ) : video.source === "mp4" ? (
          <video
            src={video.url}
            poster={poster?.url}
            autoPlay
            loop={video.loop}
            muted={video.muted}
            controls={video.controls}
            playsInline
            className="h-full w-full object-cover"
          />
        ) : video.source === "youtube" ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(video.url)}?autoplay=1&mute=${video.muted ? 1 : 0}&loop=${video.loop ? 1 : 0}&controls=${video.controls ? 1 : 0}`}
            title={content.heading ?? "Video"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <iframe
            className="h-full w-full"
            src={`https://player.vimeo.com/video/${getVimeoId(video.url)}?autoplay=1&muted=${video.muted ? 1 : 0}&loop=${video.loop ? 1 : 0}`}
            title={content.heading ?? "Video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </motion.div>
    </SectionShell>
  );
}
