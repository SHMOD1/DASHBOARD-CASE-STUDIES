import type { MediaAsset, Section } from "@/types/content";
import { SECTION_REGISTRY } from "@/components/sections";

export function SectionRenderer({ sections, media }: { sections: Section[]; media: MediaAsset[] }) {
  return (
    <>
      {sections
        .filter((section) => section.visible)
        .map((section) => {
          const Component = SECTION_REGISTRY[section.type];
          if (!Component) return null;
          return <Component key={section.id} section={section} media={media} />;
        })}
    </>
  );
}
