"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-neutral-400">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-sm text-white outline-none focus:border-neutral-500";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </Field>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    </Field>
  );
}

export function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <Field label={`${label} (${value})`}>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-500"
      />
    </Field>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={inputClass}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
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
      className="flex w-full items-center justify-between rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1.5"
    >
      <span className="text-xs text-neutral-300">{label}</span>
      <span
        className={cn(
          "relative h-4 w-8 rounded-full transition-colors",
          value ? "bg-emerald-500" : "bg-neutral-700"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
            value ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-9 rounded border border-neutral-700 bg-neutral-900"
        />
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      </div>
    </Field>
  );
}

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3 border-b border-neutral-800 px-4 py-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{title}</h3>
      {children}
    </div>
  );
}
