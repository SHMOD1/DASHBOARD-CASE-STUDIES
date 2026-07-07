"use client";

import type { AnimationConfig, Section } from "@/types/content";
import { EASING_OPTIONS } from "@/types/content";
import { useDashboardStore } from "@/lib/store";
import { NumberField, RangeField, SectionCard, SelectField, ToggleField } from "@/dashboard/editors/fields";

export function AnimationEditor({ page, section }: { page: { id: string }; section: Section }) {
  const { updateSection } = useDashboardStore();
  const animation = section.animation;

  function patch(next: Partial<AnimationConfig>) {
    updateSection(page.id, section.id, { animation: { ...animation, ...next } });
  }

  return (
    <SectionCard title="Animation">
      <ToggleField label="Enable animation" value={animation.enabled} onChange={(v) => patch({ enabled: v })} />
      <SelectField
        label="Reveal style"
        value={animation.reveal}
        onChange={(v) => patch({ reveal: v })}
        options={[
          { value: "fade", label: "Fade" },
          { value: "slide", label: "Slide" },
          { value: "scale", label: "Scale" },
          { value: "mask", label: "Reveal mask" },
          { value: "parallax", label: "Parallax" },
          { value: "none", label: "None" },
        ]}
      />
      {animation.reveal === "slide" && (
        <SelectField
          label="Slide direction"
          value={animation.slideDirection}
          onChange={(v) => patch({ slideDirection: v })}
          options={[
            { value: "up", label: "Up" },
            { value: "down", label: "Down" },
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
        />
      )}
      <ToggleField label="Pinned while scrolling" value={animation.pinned} onChange={(v) => patch({ pinned: v })} />
      <ToggleField label="Horizontal scroll" value={animation.horizontal} onChange={(v) => patch({ horizontal: v })} />
      <ToggleField label="Parallax background" value={animation.parallax} onChange={(v) => patch({ parallax: v })} />
      {animation.parallax && (
        <RangeField label="Parallax strength" value={animation.parallaxStrength} min={0} max={100} onChange={(v) => patch({ parallaxStrength: v })} />
      )}
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Duration (s)" value={animation.duration} min={0} max={4} step={0.1} onChange={(v) => patch({ duration: v })} />
        <NumberField label="Delay (s)" value={animation.delay} min={0} max={3} step={0.1} onChange={(v) => patch({ delay: v })} />
        <NumberField label="Speed" value={animation.speed} min={0.1} max={3} step={0.1} onChange={(v) => patch({ speed: v })} />
        <NumberField label="Scrub" value={animation.scrub} min={0} max={3} step={0.1} onChange={(v) => patch({ scrub: v })} />
      </div>
      <SelectField
        label="Easing"
        value={animation.easing}
        onChange={(v) => patch({ easing: v })}
        options={EASING_OPTIONS.map((e) => ({ value: e, label: e }))}
      />
    </SectionCard>
  );
}
