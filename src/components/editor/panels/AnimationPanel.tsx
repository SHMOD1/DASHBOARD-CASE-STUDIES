import { useDocStore } from '../../../store/useDocStore';
import type { AnimationConfig, Section } from '../../../types';
import { Field, PanelSection, SegmentedField, SliderField, ToggleField } from '../formControls';

const ANIMATION_OPTIONS: { value: AnimationConfig['type']; label: string; hint: string }[] = [
  { value: 'none', label: 'None', hint: 'No motion' },
  { value: 'fade', label: 'Fade', hint: 'Opacity in on scroll' },
  { value: 'slide', label: 'Slide', hint: 'Slides in from a direction' },
  { value: 'scale', label: 'Scale', hint: 'Grows into place' },
  { value: 'reveal', label: 'Reveal', hint: 'Mask wipe reveal' },
  { value: 'parallax', label: 'Parallax', hint: 'Moves at a different speed than scroll' },
  { value: 'pinned', label: 'Pinned', hint: 'Sticks in place while scrolling past' },
  { value: 'horizontal', label: 'Horizontal', hint: 'Scrolls sideways while pinned' },
];

export function AnimationPanel({ section }: { section: Section }) {
  const updateSection = useDocStore((s) => s.updateSection);
  const anim = section.animation;

  function patch(p: Partial<AnimationConfig>) {
    updateSection(section.id, { animation: { ...anim, ...p } });
  }

  const current = ANIMATION_OPTIONS.find((o) => o.value === anim.type);

  return (
    <PanelSection title="Animation">
      <ToggleField label="Enable animation" value={anim.enabled} onChange={(v) => patch({ enabled: v })} />

      <Field label="Type" hint={current?.hint}>
        <select
          value={anim.type}
          onChange={(e) => patch({ type: e.target.value as AnimationConfig['type'] })}
          className="w-full cursor-pointer rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-sm text-white/90 outline-none focus:border-violet-400/60"
        >
          {ANIMATION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#17161d]">
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      {anim.type === 'slide' && (
        <Field label="Direction">
          <SegmentedField
            value={anim.direction}
            onChange={(v) => patch({ direction: v })}
            options={[
              { value: 'up', label: '↑ Up' },
              { value: 'down', label: '↓ Down' },
              { value: 'left', label: '← Left' },
              { value: 'right', label: '→ Right' },
            ]}
          />
        </Field>
      )}

      {['fade', 'slide', 'scale', 'reveal'].includes(anim.type) && (
        <>
          <Field label="Duration">
            <SliderField value={anim.duration} onChange={(v) => patch({ duration: v })} min={0.2} max={2.5} step={0.1} suffix="s" />
          </Field>
          <Field label="Delay">
            <SliderField value={anim.delay} onChange={(v) => patch({ delay: v })} min={0} max={1.5} step={0.05} suffix="s" />
          </Field>
          <Field label="Easing">
            <SegmentedField
              value={anim.easing}
              onChange={(v) => patch({ easing: v })}
              options={[
                { value: 'linear', label: 'Linear' },
                { value: 'easeIn', label: 'In' },
                { value: 'easeOut', label: 'Out' },
                { value: 'easeInOut', label: 'In-Out' },
              ]}
            />
          </Field>
          <Field label="More easing">
            <SegmentedField
              value={anim.easing}
              onChange={(v) => patch({ easing: v })}
              options={[
                { value: 'circOut', label: 'Circ Out' },
                { value: 'backOut', label: 'Back Out' },
              ]}
            />
          </Field>
        </>
      )}

      {['parallax', 'pinned', 'horizontal'].includes(anim.type) && (
        <>
          <Field label="Speed" hint="Parallax / pin intensity">
            <SliderField value={anim.speed} onChange={(v) => patch({ speed: v })} min={0} max={100} suffix="" />
          </Field>
          <Field label="Scrub amount" hint="0 = springy catch-up, 1 = locked to scroll">
            <SliderField value={anim.scrub} onChange={(v) => patch({ scrub: v })} min={0} max={1} step={0.05} />
          </Field>
        </>
      )}
    </PanelSection>
  );
}
