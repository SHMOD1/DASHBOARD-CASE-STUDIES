import type { VideoSectionData } from '../../types';

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{6,})/);
  return match ? match[1] : url;
}

function extractVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  return match ? match[1] : url;
}

export function toEmbedUrl(section: VideoSectionData): string {
  if (section.source === 'youtube') {
    const id = extractYouTubeId(section.url);
    const params = new URLSearchParams({
      autoplay: section.autoplay ? '1' : '0',
      mute: section.mute ? '1' : '0',
      loop: section.loop ? '1' : '0',
      playsinline: '1',
    });
    if (section.loop) params.set('playlist', id);
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }
  if (section.source === 'vimeo') {
    const id = extractVimeoId(section.url);
    const params = new URLSearchParams({
      autoplay: section.autoplay ? '1' : '0',
      muted: section.mute ? '1' : '0',
      loop: section.loop ? '1' : '0',
    });
    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
  }
  return section.url;
}
