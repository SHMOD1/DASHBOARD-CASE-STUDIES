import type { ReactNode } from 'react';

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-white/40">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-white/30">{hint}</span>}
    </label>
  );
}

const inputBase =
  'w-full rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-sm text-white/90 outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/40';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputBase} resize-none ${props.className ?? ''}`} />;
}

export function SelectField<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`${inputBase} cursor-pointer`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#17161d]">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function SliderField({
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-500"
      />
      <span className="w-14 shrink-0 text-right text-xs tabular-nums text-white/60">
        {value}
        {suffix}
      </span>
    </div>
  );
}

export function ColorField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={/^#/.test(value) ? value : '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-9 cursor-pointer rounded border border-white/10 bg-transparent p-0"
      />
      <TextInput value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-sm"
    >
      <span className="text-white/80">{label}</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${value ? 'bg-violet-500' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`}
        />
      </span>
    </button>
  );
}

export function SegmentedField<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex overflow-hidden rounded-md border border-white/10">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 px-2 py-1.5 text-xs font-medium transition-colors ${
            value === o.value ? 'bg-violet-500 text-white' : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.08]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function PanelSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/5 py-4 first:pt-0 last:border-b-0">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">{title}</h4>
      {children}
    </div>
  );
}
