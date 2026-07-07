import { ScrollFX } from '../ScrollFX';
import { EmptyMedia, SectionShell } from '../SectionShell';
import { toEmbedUrl } from '../videoEmbed';
import type { SectionProps } from './types';

export function VideoSection({ section, theme, media }: SectionProps<'video'>) {
  const poster = media.find((m) => m.id === section.posterId)?.url;

  return (
    <SectionShell section={section} theme={theme} fullBleed>
      <ScrollFX anim={section.animation} fill>
        {!section.url ? (
          <div className="flex h-full items-center justify-center p-12">
            <EmptyMedia label="Add a video source" />
          </div>
        ) : section.source === 'upload' ? (
          <video
            src={section.url}
            poster={poster}
            className="h-full w-full object-cover"
            autoPlay={section.autoplay}
            loop={section.loop}
            muted={section.mute}
            controls={!section.autoplay}
            playsInline
          />
        ) : (
          <iframe
            className="h-full w-full"
            src={toEmbedUrl(section)}
            title="Embedded video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </ScrollFX>
    </SectionShell>
  );
}
