"use client";

import { useEffect, useRef } from "react";

const COMMANDS: { label: string; command: string; arg?: string }[] = [
  { label: "B", command: "bold" },
  { label: "I", command: "italic" },
  { label: "U", command: "underline" },
];

export function RichTextField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (html: string) => void;
  rows?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Sync external value changes (e.g. switching sections) without clobbering
  // the caret while the user is actively typing in this same instance.
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  function exec(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
  }

  return (
    <div>
      <p className="mb-1.5 text-xs text-neutral-400">{label}</p>
      <div className="rounded-md border border-neutral-700 bg-neutral-900">
        <div className="flex gap-1 border-b border-neutral-800 p-1">
          {COMMANDS.map((c) => (
            <button
              key={c.command}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec(c.command)}
              className="h-6 w-6 rounded text-xs font-semibold text-neutral-300 hover:bg-neutral-800"
            >
              {c.label}
            </button>
          ))}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = prompt("Link URL");
              if (url) exec("createLink", url);
            }}
            className="h-6 rounded px-2 text-xs text-neutral-300 hover:bg-neutral-800"
          >
            Link
          </button>
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          style={{ minHeight: `${rows * 1.5}rem` }}
          className="px-3 py-2 text-sm text-white outline-none [&_a]:underline [&_a]:text-emerald-400"
        />
      </div>
    </div>
  );
}
